import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Initialize Google Drive API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

// In-memory cache for images
const imageCache = new Map<string, { data: Buffer; mimeType: string; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const MAX_CACHE_SIZE = 100; // Max cached images

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

      if (errorCode === 429 || errorMessage.includes('429') || errorMessage.includes('Rate Limit')) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Image proxy rate limited, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }

  throw lastError;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cacheKey = id;

    // Check cache first
    const cached = imageCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return new NextResponse(new Uint8Array(cached.data), {
        headers: {
          'Content-Type': cached.mimeType,
          'Cache-Control': 'public, max-age=86400, s-maxage=604800',
          'Content-Length': cached.data.length.toString(),
          'X-Cache': 'HIT',
        },
      });
    }

    // Download the file content directly (skip separate metadata call)
    const response = await withRetry(() =>
      drive.files.get(
        {
          fileId: id,
          alt: 'media',
        },
        {
          responseType: 'arraybuffer',
        }
      )
    );

    const buffer = Buffer.from(response.data as ArrayBuffer);

    // Detect mime type from buffer magic bytes
    let mimeType = 'image/jpeg';
    if (buffer[0] === 0x89 && buffer[1] === 0x50) {
      mimeType = 'image/png';
    } else if (buffer[0] === 0x47 && buffer[1] === 0x49) {
      mimeType = 'image/gif';
    } else if (buffer[0] === 0x52 && buffer[1] === 0x49) {
      mimeType = 'image/webp';
    }

    // Cache the image (with size limit)
    if (imageCache.size >= MAX_CACHE_SIZE) {
      // Remove oldest entry
      const oldestKey = imageCache.keys().next().value;
      if (oldestKey) imageCache.delete(oldestKey);
    }
    imageCache.set(cacheKey, { data: buffer, mimeType, timestamp: Date.now() });

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=86400, s-maxage=604800',
        'Content-Length': buffer.length.toString(),
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Error fetching image from Drive:', error);

    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}
