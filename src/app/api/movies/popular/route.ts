import { NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET(request: Request) {
  try {
    const data = await fetchFromTMDB({ path: '/movie/popular' });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return NextResponse.json({ error: 'Failed to fetch popular movies' }, { status: 500 });
  }
}