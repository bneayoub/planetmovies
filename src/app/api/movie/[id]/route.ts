import { NextRequest, NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const [movieDetails, similarMovies] = await Promise.all([
      fetchFromTMDB({
        path: `/movie/${id}`,
        params: { append_to_response: 'videos,credits' },
      }),
      fetchFromTMDB({
        path: `/movie/${id}/similar`,
      }),
    ]);
    return NextResponse.json({ ...movieDetails, similarMovies: similarMovies.results });
  } catch (error) {
    console.error(`Error fetching movie details for id ${id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch movie details' }, { status: 500 });
  }
}