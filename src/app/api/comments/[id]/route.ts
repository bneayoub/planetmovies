import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Comment from '@/models/Comment';
import mongoose from 'mongoose';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const comment = await Comment.findOne({ _id: params.id, user: user._id });
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found or not authorized to delete' }, { status: 404 });
    }

    await comment.deleteOne();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action } = await req.json();
    await dbConnect();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const comment = await Comment.findById(params.id);
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    if (action === 'upvote') {
      const userIdObject = user._id;
      const upvoteIndex = comment.upvotes.findIndex((id: mongoose.Types.ObjectId) => id.equals(userIdObject));
      if (upvoteIndex > -1) {
        comment.upvotes.splice(upvoteIndex, 1);
      } else {
        comment.upvotes.push(userIdObject);
        comment.downvotes = comment.downvotes.filter((id: mongoose.Types.ObjectId) => !id.equals(userIdObject));
      }
    } else if (action === 'downvote') {
      const userIdObject = user._id;
      const downvoteIndex = comment.downvotes.findIndex((id: mongoose.Types.ObjectId) => id.equals(userIdObject));
      if (downvoteIndex > -1) {
        comment.downvotes.splice(downvoteIndex, 1);
      } else {
        comment.downvotes.push(userIdObject);
        comment.upvotes = comment.upvotes.filter((id: mongoose.Types.ObjectId) => !id.equals(userIdObject));
      }
    }

    await comment.save();
    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error('Error updating comment vote:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}