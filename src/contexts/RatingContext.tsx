'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

interface RatingItem {
  contentType: 'movie' | 'tvshow';
  contentId: number;
  rating: number;
}

interface RatingContextType {
  ratings: RatingItem[];
  isLoading: boolean;
  addOrUpdateRating: (item: RatingItem) => Promise<void>;
  getRating: (contentType: 'movie' | 'tvshow', contentId: number) => number | null;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export const RatingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ratings, setRatings] = useState<RatingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchRatings = async () => {
      if (!userId) {
        setRatings([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/ratings');
        if (response.ok) {
          const data = await response.json();
          setRatings(data);
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatings();
  }, [userId]);

  const addOrUpdateRating = async (item: RatingItem) => {
    if (!userId) return;

    try {
      const response = await fetch('/api/ratings/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        setRatings(prev => {
          const index = prev.findIndex(r => r.contentType === item.contentType && r.contentId === item.contentId);
          if (index !== -1) {
            return [...prev.slice(0, index), item, ...prev.slice(index + 1)];
          } else {
            return [...prev, item];
          }
        });
      }
    } catch (error) {
      console.error('Error adding/updating rating:', error);
    }
  };

  const getRating = (contentType: 'movie' | 'tvshow', contentId: number): number | null => {
    const rating = ratings.find(r => r.contentType === contentType && r.contentId === contentId);
    return rating ? rating.rating : null;
  };

  return (
    <RatingContext.Provider value={{ ratings, isLoading, addOrUpdateRating, getRating }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => {
  const context = useContext(RatingContext);
  if (context === undefined) {
    throw new Error('useRating must be used within a RatingProvider');
  }
  return context;
};