'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useRating } from '@/contexts/RatingContext';
import RatingModal from './RatingModal';
import SignInModal from './SignInModal';

interface RatingComponentProps {
  contentType: 'movie' | 'tvshow';
  contentId: number;
  title: string;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ contentType, contentId, title }) => {
  const { userId } = useAuth();
  const { getRating, isLoading } = useRating();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const rating = getRating(contentType, contentId);

  const handleRatingClick = () => {
    if (!userId) {
      setIsSignInModalOpen(true);
    } else {
      setIsRatingModalOpen(true);
    }
  };

  if (isLoading) {
    return <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>;
  }

  return (
    <>
      <button onClick={handleRatingClick} className="flex items-center">
        <Star
          size={20}
          fill={rating ? 'gold' : 'none'}
          stroke={rating ? 'gold' : 'currentColor'}
        />
        {rating && <span className="ml-1">{rating}/10</span>}
      </button>
      {isRatingModalOpen && (
        <RatingModal
          contentType={contentType}
          contentId={contentId}
          title={title}
          onClose={() => setIsRatingModalOpen(false)}
        />
      )}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </>
  );
};

export default RatingComponent;