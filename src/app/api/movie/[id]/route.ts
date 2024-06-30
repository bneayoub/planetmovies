import { NextRequest, NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const data = await fetchFromTMDB({
      path: `/movie/${id}`,
      params: { append_to_response: 'videos,credits' },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching movie details for id ${id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch movie details' }, { status: 500 });
  }
}