import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Comment from '@/models/Comment';

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { contentType, contentId, text } = await req.json();
    await dbConnect();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const comment = await Comment.create({
      user: user._id,
      contentType,
      contentId,
      text,
    });

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const contentType = searchParams.get('contentType');
  const contentId = searchParams.get('contentId');

  if (!contentType || !contentId) {
    return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
  }

  try {
    await dbConnect();
    const comments = await Comment.find({ contentType, contentId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}