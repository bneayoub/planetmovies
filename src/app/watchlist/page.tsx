'use client';

import React from 'react';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import MovieCard from '@/components/Shared/MovieCard';
import TVShowCard from '@/components/Shared/TVShowCard';
import { WatchlistProvider, useWatchlist } from '@/contexts/WatchlistContext';

const WatchlistContent = () => {
  const { watchlist, isLoading } = useWatchlist();
  const { userId } = useAuth();

  if (!userId) {
    redirect('/sign-in');
  }

  if (isLoading) {
    return <div>Loading watchlist...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((item) => (
            item.contentType === 'movie' ? (
              <MovieCard
                key={`${item.contentType}-${item.contentId}`}
                movie={{
                  id: item.contentId,
                  title: item.title,
                  poster_path: item.posterPath,
                }}
              />
            ) : (
              <TVShowCard
                key={`${item.contentType}-${item.contentId}`}
                show={{
                  id: item.contentId,
                  name: item.title,
                  poster_path: item.posterPath,
                }}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
};

const WatchlistPage = () => {
  return (
    <WatchlistProvider>
      <WatchlistContent />
    </WatchlistProvider>
  );
};

export default WatchlistPage;