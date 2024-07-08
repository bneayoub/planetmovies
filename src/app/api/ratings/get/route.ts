import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Rating from '@/models/Rating';

export async function GET(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const contentType = searchParams.get('contentType');
  const contentId = searchParams.get('contentId');

  if (!contentType || !contentId) {
    return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
  }

  try {
    await dbConnect();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const rating = await Rating.findOne({ user: user._id, contentType, contentId });

    if (!rating) {
      return NextResponse.json({ error: 'Rating not found' }, { status: 404 });
    }

    return NextResponse.json(rating);
  } catch (error) {
    console.error('Error fetching rating:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}