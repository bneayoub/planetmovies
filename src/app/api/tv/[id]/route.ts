import { NextRequest, NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const [tvShowDetails, similarTVShows] = await Promise.all([
      fetchFromTMDB({
        path: `/tv/${id}`,
        params: { append_to_response: 'videos,credits' },
      }),
      fetchFromTMDB({
        path: `/tv/${id}/similar`,
      }),
    ]);
    return NextResponse.json({ ...tvShowDetails, similarTVShows: similarTVShows.results });
  } catch (error) {
    console.error(`Error fetching tv details for id ${id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch tv details' }, { status: 500 });
  }
}