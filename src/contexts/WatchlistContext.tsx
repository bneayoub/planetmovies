'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

interface WatchlistItem {
  contentType: 'movie' | 'tvshow';
  contentId: number;
  title: string;
  posterPath: string;
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  isLoading: boolean;
  addToWatchlist: (item: WatchlistItem) => Promise<void>;
  removeFromWatchlist: (item: Pick<WatchlistItem, 'contentType' | 'contentId'>) => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/watchlist');
        if (response.ok) {
          const data = await response.json();
          setWatchlist(data.watchlist.map((item: any) => ({
            contentType: item.contentType,
            contentId: item.contentId,
            title: item.title,
            posterPath: item.posterPath
          })));
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, [userId]);

  const addToWatchlist = async (item: WatchlistItem) => {
    try {
      const response = await fetch('/api/watchlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        setWatchlist(prev => [...prev, item]);
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const removeFromWatchlist = async (item: Pick<WatchlistItem, 'contentType' | 'contentId'>) => {
    try {
      const response = await fetch('/api/watchlist/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        setWatchlist(prev => prev.filter(
          i => !(i.contentType === item.contentType && i.contentId === item.contentId)
        ));
      }
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, isLoading, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};