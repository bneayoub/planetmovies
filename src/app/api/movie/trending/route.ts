import { NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET() {
  try {
    const data = await fetchFromTMDB({
      path: '/trending/movie/week',
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return NextResponse.json({ error: 'Failed to fetch trending movies' }, { status: 500 });
  }
}