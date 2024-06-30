import { NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET() {
  try {
    const data = await fetchFromTMDB({
      path: '/genre/movie/list',
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return NextResponse.json({ error: 'Failed to fetch movie genres' }, { status: 500 });
  }
}

