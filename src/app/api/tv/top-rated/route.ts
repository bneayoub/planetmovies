import { NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET() {
  try {
    const data = await fetchFromTMDB({
      path: '/tv/top_rated',
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching top rated tvs:', error);
    return NextResponse.json({ error: 'Failed to fetch top rated tvs' }, { status: 500 });
  }
}