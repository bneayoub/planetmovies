import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import RatingModal from './RatingModal';

interface RatingComponentProps {
  contentType: 'movie' | 'tvshow';
  contentId: number;
  title: string;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ contentType, contentId, title }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await fetch(`/api/ratings/get?contentType=${contentType}&contentId=${contentId}`);
        if (response.ok) {
          const data = await response.json();
          setRating(data.rating);
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchRating();
  }, [contentType, contentId]);

  const handleRatingSubmit = async (newRating: number) => {
    try {
      const response = await fetch('/api/ratings/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentType, contentId, rating: newRating }),
      });

      if (response.ok) {
        setRating(newRating);
      } else {
        console.error('Failed to update rating');
      }
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="flex items-center">
        <Star
          size={20}
          fill={rating ? 'gold' : 'none'}
          stroke={rating ? 'gold' : 'currentColor'}
        />
        {rating && <span className="ml-1">{rating}/10</span>}
      </button>
      {isModalOpen && (
        <RatingModal
          contentType={contentType}
          contentId={contentId}
          title={title}
          onClose={() => setIsModalOpen(false)}
          onRatingSubmit={handleRatingSubmit}
        />
      )}
    </>
  );
};

export default RatingComponent;