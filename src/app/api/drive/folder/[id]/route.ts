import { NextResponse } from 'next/server';
import { getFolderImages, getSubfolders } from '@/lib/google-drive';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch images and subfolders in parallel
    const [images, subfolders] = await Promise.all([
      getFolderImages(id),
      getSubfolders(id),
    ]);

    return NextResponse.json(
      {
        success: true,
        images,
        subfolders,
        imageCount: images.length,
        subfolderCount: subfolders.length,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Drive Folder API Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch folder contents from Google Drive',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
