import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Watchlist from '@/models/Watchlist';
import MovieCard from '@/components/Shared/MovieCard';
import TVShowCard from '@/components/Shared/TVShowCard';

async function getWatchlistItems(userId: string) {
  await dbConnect();
  const user = await User.findOne({ clerkId: userId });
  if (!user) return [];
  return Watchlist.find({ user: user._id });
}

export default async function WatchlistPage() {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const watchlistItems = await getWatchlistItems(userId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watchlistItems.map((item) => (
          item.contentType === 'movie' ? (
            <MovieCard
              key={item._id.toString()}
              movie={{
                id: item.contentId,
                title: item.title || '',
                poster_path: item.posterPath || '',
              }}
              isInWatchlist={true}
            />
          ) : (
            <TVShowCard
              key={item._id.toString()}
              show={{
                id: item.contentId,
                name: item.title || '',
                poster_path: item.posterPath || '',
              }}
              isInWatchlist={true}
            />
          )
        ))}
      </div>
    </div>
  );
}