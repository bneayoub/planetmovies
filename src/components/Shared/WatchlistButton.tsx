'use client';

import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

interface WatchlistButtonProps {
  contentType: 'movie' | 'tvshow';
  contentId: number;
  isInWatchlist: boolean;
  title: string;
  posterPath: string;
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({ contentType, contentId, isInWatchlist, title, posterPath }) => {
  const { userId } = useAuth();
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);

  const handleWatchlistToggle = async () => {
    if (!userId) {
      console.log("Not Authorized");
      return;
    }

    const endpoint = inWatchlist ? '/api/watchlist/remove' : '/api/watchlist/add';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentType, contentId, title, posterPath }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setInWatchlist(!inWatchlist);
        } else {
          console.error('Failed to update watchlist:', result.error);
        }
      } else {
        console.error('Failed to update watchlist');
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  return (
    <button
      onClick={handleWatchlistToggle}
      className={`px-4 py-2 rounded ${
        inWatchlist ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
      } text-white`}
    >
      {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  );
};

export default WatchlistButton;