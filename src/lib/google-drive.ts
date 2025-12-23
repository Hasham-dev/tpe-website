import { google } from 'googleapis';

// Initialize the Google Drive API client
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

export interface DriveImage {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  fallbackUrl: string; // Backup URL if thumbnailUrl fails
  mimeType: string;
  size?: string;
  folder?: string; // Parent folder name (for categorization)
}

/**
 * Generate reliable image URLs for a Drive file
 * Uses our proxy API for authenticated access
 */
function generateImageUrls(fileId: string, _thumbnailLink: string | null | undefined, size: number = 1600) {
  // Primary: Use our proxy API (handles authentication)
  const primaryUrl = `/api/drive/image/${fileId}?size=${size}`;

  // Fallback: Also use proxy (same endpoint, different size)
  const fallbackUrl = `/api/drive/image/${fileId}?size=${Math.min(size, 800)}`;

  // Direct URL (for reference, may not work without auth)
  const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

  return {
    thumbnailUrl: primaryUrl,
    fallbackUrl: fallbackUrl,
    url: directUrl,
  };
}

export interface DriveFolder {
  id: string;
  name: string;
  images: DriveImage[];
  subfolders: DriveFolder[];
}

// Cache
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  return null;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// Rate limiting helper - process in batches with delay
async function processBatched<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  batchSize: number = 5,
  delayMs: number = 100
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);

    // Add delay between batches to avoid rate limiting
    if (i + batchSize < items.length) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

// Retry helper for rate-limited requests
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: unknown) {
      lastError = error as Error;
      const errorMessage = (error as { message?: string })?.message || '';
      const errorCode = (error as { code?: number })?.code;

      // Check if it's a rate limit error
      if (errorCode === 429 || errorMessage.includes('429') || errorMessage.includes('Rate Limit')) {
        const delay = baseDelay * Math.pow(2, attempt); // Exponential backoff
        console.log(`Rate limited, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error; // Not a rate limit error, rethrow
      }
    }
  }

  throw lastError;
}

/**
 * Get top-level folders with their cover image (first image found)
 * This is FAST - only fetches folder list + one image per folder
 * Uses batching to avoid rate limiting
 */
export async function getTopLevelFolders(): Promise<DriveFolder[]> {
  const cacheKey = 'top-level-folders';
  const cached = getCached<DriveFolder[]>(cacheKey);
  if (cached) return cached;

  const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootFolderId) throw new Error('GOOGLE_DRIVE_FOLDER_ID is not configured');

  // Get all subfolders with retry
  const foldersResponse = await withRetry(() =>
    drive.files.list({
      q: `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
      orderBy: 'name',
      pageSize: 100,
    })
  );

  const subfolders = foldersResponse.data.files || [];

  // Fetch cover image for each folder using batching to avoid rate limits
  const folders = await processBatched(
    subfolders,
    async (folder) => {
      const imagesResponse = await withRetry(() =>
        drive.files.list({
          q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`,
          fields: 'files(id, name, mimeType, thumbnailLink)',
          orderBy: 'name',
          pageSize: 1, // Only need one for cover
        })
      );

      const coverFile = imagesResponse.data.files?.[0];
      const coverImage: DriveImage | undefined = coverFile
        ? {
            id: coverFile.id!,
            name: coverFile.name!,
            mimeType: coverFile.mimeType!,
            ...generateImageUrls(coverFile.id!, coverFile.thumbnailLink, 800),
          }
        : undefined;

      return {
        id: folder.id!,
        name: folder.name!,
        images: coverImage ? [coverImage] : [],
        subfolders: [],
      };
    },
    3, // Process 3 folders at a time
    200 // 200ms delay between batches
  );

  setCache(cacheKey, folders);
  return folders;
}

/**
 * Get all images in a specific folder (including subfolders)
 * Called when user clicks on a folder
 * Uses batching and retry to avoid rate limiting
 */
export async function getFolderImages(folderId: string): Promise<DriveImage[]> {
  const cacheKey = `folder-images-${folderId}`;
  const cached = getCached<DriveImage[]>(cacheKey);
  if (cached) return cached;

  const allImages: DriveImage[] = [];

  // Get images in this folder with retry
  const imagesResponse = await withRetry(() =>
    drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, mimeType, size, thumbnailLink)',
      orderBy: 'name',
      pageSize: 1000,
    })
  );

  const files = imagesResponse.data.files || [];
  for (const file of files) {
    allImages.push({
      id: file.id!,
      name: file.name!,
      mimeType: file.mimeType!,
      size: file.size || undefined,
      ...generateImageUrls(file.id!, file.thumbnailLink, 1600),
    });
  }

  // Get subfolders with retry
  const subfoldersResponse = await withRetry(() =>
    drive.files.list({
      q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
      orderBy: 'name',
      pageSize: 100,
    })
  );

  const subfolders = subfoldersResponse.data.files || [];

  // Fetch subfolder images using batching to avoid rate limits
  const subfolderImages = await processBatched(
    subfolders,
    (sf) => getFolderImages(sf.id!),
    2, // Process 2 subfolders at a time (recursive calls can multiply)
    300 // 300ms delay between batches
  );

  for (const images of subfolderImages) {
    allImages.push(...images);
  }

  setCache(cacheKey, allImages);
  return allImages;
}

/**
 * Get subfolders of a folder (for nested navigation)
 * Uses batching and retry to avoid rate limiting
 */
export async function getSubfolders(folderId: string): Promise<DriveFolder[]> {
  const cacheKey = `subfolders-${folderId}`;
  const cached = getCached<DriveFolder[]>(cacheKey);
  if (cached) return cached;

  const response = await withRetry(() =>
    drive.files.list({
      q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
      orderBy: 'name',
      pageSize: 100,
    })
  );

  const subfolders = response.data.files || [];

  // Get cover image for each subfolder using batching
  const folders = await processBatched(
    subfolders,
    async (folder) => {
      const imagesResponse = await withRetry(() =>
        drive.files.list({
          q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`,
          fields: 'files(id, name, mimeType, thumbnailLink)',
          orderBy: 'name',
          pageSize: 1,
        })
      );

      const coverFile = imagesResponse.data.files?.[0];
      const coverImage: DriveImage | undefined = coverFile
        ? {
            id: coverFile.id!,
            name: coverFile.name!,
            mimeType: coverFile.mimeType!,
            ...generateImageUrls(coverFile.id!, coverFile.thumbnailLink, 800),
          }
        : undefined;

      return {
        id: folder.id!,
        name: folder.name!,
        images: coverImage ? [coverImage] : [],
        subfolders: [],
      };
    },
    3, // Process 3 folders at a time
    200 // 200ms delay between batches
  );

  setCache(cacheKey, folders);
  return folders;
}

/**
 * Get a single image by ID
 * Uses retry to handle rate limiting
 */
export async function getDriveImage(fileId: string): Promise<DriveImage | null> {
  try {
    const response = await withRetry(() =>
      drive.files.get({
        fileId,
        fields: 'id, name, mimeType, size, thumbnailLink, webContentLink',
      })
    );

    const file = response.data;

    return {
      id: file.id!,
      name: file.name!,
      mimeType: file.mimeType!,
      size: file.size || undefined,
      ...generateImageUrls(file.id!, file.thumbnailLink, 1600),
    };
  } catch (error) {
    console.error('Error fetching image from Google Drive:', error);
    return null;
  }
}

/**
 * Clear all caches (useful for forcing refresh)
 */
export function clearDriveCache(): void {
  cache.clear();
}

/**
 * List all images from the root Drive folder
 * Returns a flat list of images for the gallery
 */
export async function listDriveImages(): Promise<DriveImage[]> {
  const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootFolderId) throw new Error('GOOGLE_DRIVE_FOLDER_ID is not configured');

  return getFolderImages(rootFolderId);
}
