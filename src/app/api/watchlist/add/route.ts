import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Watchlist from '@/models/Watchlist';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { contentType, contentId, title, posterPath } = await req.json();

    if (!contentType || !contentId || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      user = await User.create({
        clerkId: userId,
        email: 'user@example.com',
        name: 'User',
      });
    }

    const watchlistItem = await Watchlist.findOneAndUpdate(
      { user: user._id, contentType, contentId },
      { user: user._id, contentType, contentId, title, posterPath },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, watchlistItem });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}