import { NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET() {
  try {
    const data = await fetchFromTMDB({
      path: '/tv/popular',
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching popular tvs:', error);
    return NextResponse.json({ error: 'Failed to fetch popular tvs' }, { status: 500 });
  }
}