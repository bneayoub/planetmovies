import { NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET() {
  try {
    const data = await fetchFromTMDB({
      path: '/genre/tv/list',
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching TV genres:', error);
    return NextResponse.json({ error: 'Failed to fetch TV genres' }, { status: 500 });
  }
}