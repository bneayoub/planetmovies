import { NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET() {
  try {
    const data = await fetchFromTMDB({
      path: '/tv/upcoming',
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching upcoming tvs:', error);
    return NextResponse.json({ error: 'Failed to fetch upcoming tvs' }, { status: 500 });
  }
}