import { NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET() {
  try {
    const data = await fetchFromTMDB({
      path: '/tv/now_playing',
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching now playing tvs:', error);
    return NextResponse.json({ error: 'Failed to fetch now playing tvs' }, { status: 500 });
  }
}