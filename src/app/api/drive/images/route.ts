import { NextResponse } from 'next/server';
import { listDriveImages } from '@/lib/google-drive';

export const dynamic = 'force-dynamic'; // Disable caching at the route level
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const images = await listDriveImages();

    return NextResponse.json(
      {
        success: true,
        images,
        count: images.length,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Drive API Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch images from Google Drive',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
