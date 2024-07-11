import { NextRequest, NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/utils/tmdb';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const data = await fetchFromTMDB({
      path: `/tv/${id}/similar`,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching similar TV shows for id ${id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch similar TV shows' }, { status: 500 });
  }
}