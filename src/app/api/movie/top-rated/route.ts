import { NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET() {
  try {
    const data = await fetchFromTMDB({
      path: '/movie/top_rated',
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return NextResponse.json({ error: 'Failed to fetch top rated movies' }, { status: 500 });
  }
}