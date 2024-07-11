import { NextRequest, NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const data = await fetchFromTMDB({
      path: `/movie/${id}/similar`,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch similar movies' }, { status: 500 });
  }
}