import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
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

    let clerkUser;
    try {
      clerkUser = await clerkClient.users.getUser(userId);
    } catch (error) {
      console.error('Error fetching user from Clerk:', error);
      return NextResponse.json({ error: 'Error fetching user details' }, { status: 500 });
    }

    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      try {
        user = await User.create({
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || 'No email provided',
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
        });
      } catch (error) {
        console.error('Error creating user in database:', error);
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
      }
    }

    let watchlistItem;
    try {
      watchlistItem = await Watchlist.findOneAndUpdate(
        { user: user._id, contentType, contentId },
        { user: user._id, contentType, contentId, title, posterPath },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error('Error updating watchlist:', error);
      return NextResponse.json({ error: 'Error updating watchlist' }, { status: 500 });
    }

    return NextResponse.json({ success: true, watchlistItem });
  } catch (error) {
    console.error('Unexpected error in watchlist add route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}