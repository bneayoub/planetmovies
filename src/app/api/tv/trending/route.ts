import { NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET() {
  try {
    const data = await fetchFromTMDB({
      path: '/trending/tv/week',
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching trending TV shows:', error);
    return NextResponse.json({ error: 'Failed to fetch trending TV shows' }, { status: 500 });
  }
}