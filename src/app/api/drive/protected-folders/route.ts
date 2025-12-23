import { NextResponse } from 'next/server'
import { google } from 'googleapis'

// Initialize Google Drive API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
})

const drive = google.drive({ version: 'v3', auth })

// Cache for folders
let cachedFolders: Array<{ id: string; name: string; coverUrl: string | null }> | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

// Generate image URL using our proxy
function generateImageUrl(fileId: string, size: number = 800): string {
  return `/api/drive/image/${fileId}?size=${size}`
}

// Retry helper for rate-limited requests
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error: unknown) {
      lastError = error as Error
      const errorMessage = (error as { message?: string })?.message || ''
      const errorCode = (error as { code?: number })?.code

      if (errorCode === 429 || errorMessage.includes('429') || errorMessage.includes('Rate Limit')) {
        const delay = baseDelay * Math.pow(2, attempt)
        console.log(`Rate limited, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      } else {
        throw error
      }
    }
  }

  throw lastError
}

export async function GET() {
  try {
    const lawFolderId = process.env.LAW_GALLERY_FOLDER_ID

    if (!lawFolderId) {
      return NextResponse.json(
        { error: 'LAW_GALLERY_FOLDER_ID is not configured' },
        { status: 500 }
      )
    }

    // Check cache
    if (cachedFolders && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json({
        folders: cachedFolders,
        cached: true,
      })
    }

    // Fetch subfolders from the law gallery folder
    const foldersResponse = await withRetry(() =>
      drive.files.list({
        q: `'${lawFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name)',
        orderBy: 'name',
        pageSize: 100,
      })
    )

    const subfolders = foldersResponse.data.files || []

    // For each folder, try to get a cover image
    const foldersWithCovers = await Promise.all(
      subfolders.map(async (folder) => {
        try {
          // Get first image in the folder for cover
          const imagesResponse = await withRetry(() =>
            drive.files.list({
              q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`,
              fields: 'files(id)',
              orderBy: 'name',
              pageSize: 1,
            })
          )

          const coverImage = imagesResponse.data.files?.[0]

          return {
            id: folder.id!,
            name: folder.name!,
            coverUrl: coverImage ? generateImageUrl(coverImage.id!, 800) : null,
          }
        } catch (error) {
          console.error(`Error getting cover for folder ${folder.name}:`, error)
          return {
            id: folder.id!,
            name: folder.name!,
            coverUrl: null,
          }
        }
      })
    )

    // Update cache
    cachedFolders = foldersWithCovers
    cacheTimestamp = Date.now()

    return NextResponse.json({
      folders: foldersWithCovers,
      cached: false,
    })

  } catch (error) {
    console.error('Error fetching protected folders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch folders' },
      { status: 500 }
    )
  }
}
