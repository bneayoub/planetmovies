import { NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET() {
  try {
    const data = await fetchFromTMDB({
      path: '/tv/airing_today',
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching airing_today tvs:', error);
    return NextResponse.json({ error: 'Failed to fetch airing_today tvs' }, { status: 500 });
  }
}