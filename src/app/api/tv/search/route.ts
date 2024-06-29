import { NextRequest, NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const data = await fetchFromTMDB({
      path: '/search/tv',
      params: { query },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error searching tvs:', error);
    return NextResponse.json({ error: 'Failed to search tvs' }, { status: 500 });
  }
}