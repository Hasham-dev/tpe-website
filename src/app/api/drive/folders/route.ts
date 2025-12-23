import { NextResponse } from 'next/server';
import { getTopLevelFolders } from '@/lib/google-drive';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const folders = await getTopLevelFolders();

    return NextResponse.json(
      {
        success: true,
        folders,
        count: folders.length,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Drive Folders API Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch folders from Google Drive',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
