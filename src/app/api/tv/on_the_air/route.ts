import { NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET() {
  try {
    const data = await fetchFromTMDB({
      path: '/tv/on_the_air',
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching on_the_air tvs:', error);
    return NextResponse.json({ error: 'Failed to fetch on_the_air tvs' }, { status: 500 });
  }
}