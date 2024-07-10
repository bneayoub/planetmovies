'use client';

import React from 'react';
import { Plus, Check } from 'lucide-react';
import { useWatchlist } from '@/contexts/WatchlistContext';

interface WatchlistButtonProps {
  contentType: 'movie' | 'tvshow';
  contentId: number;
  title: string;
  posterPath: string;
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({ contentType, contentId, title, posterPath }) => {
  const { watchlist, isLoading, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const inWatchlist = watchlist.some(
    item => item.contentType === contentType && item.contentId === contentId
  );

  const handleWatchlistToggle = async () => {
    if (inWatchlist) {
      await removeFromWatchlist({ contentType, contentId });
    } else {
      await addToWatchlist({ contentType, contentId, title, posterPath });
    }
  };

  if (isLoading) {
    return <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>;
  }

  return (
    <button
      onClick={handleWatchlistToggle}
      className={`
        flex items-center justify-center
        w-full h-10 px-3 py-2
        rounded-md text-sm font-medium
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${inWatchlist
          ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white'
          : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white'
        }
      `}
    >
      {inWatchlist ? (
        <>
          <Check size={18} className="mr-1" />
          <span>In Watchlist</span>
        </>
      ) : (
        <>
          <Plus size={18} className="mr-1" />
          <span>Add to Watchlist</span>
        </>
      )}
    </button>
  );
};

export default WatchlistButton;