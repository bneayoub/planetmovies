import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
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

    if (rating < 1 || rating > 10) {
      return NextResponse.json({ error: 'Rating must be between 1 and 10' }, { status: 400 });
    }

    await dbConnect();

    const clerkUser = await clerkClient.users.getUser(userId);

    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      user = await User.create({
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || 'No email provided',
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
      });
    }

    const ratingItem = await Rating.findOneAndUpdate(
      { user: user._id, contentType, contentId },
      { user: user._id, contentType, contentId, rating },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, rating: ratingItem });
  } catch (error) {
    console.error('Error adding/updating rating:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}