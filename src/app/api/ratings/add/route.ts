import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Rating from '@/models/Rating';

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { contentType, contentId, rating } = await request.json();

    if (!contentType || !contentId || rating === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const ratingItem = await Rating.findOneAndUpdate(
      { user: user._id, contentType, contentId },
      { user: user._id, contentType, contentId, rating },
      { upsert: true, new: true }
    );

    return NextResponse.json(ratingItem);
  } catch (error) {
    console.error('Error adding/updating rating:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}