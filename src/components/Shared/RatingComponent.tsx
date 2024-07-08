import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface RatingComponentProps {
  contentType: 'movie' | 'tvshow';
  contentId: number;
  initialRating?: number;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ contentType, contentId, initialRating = 0 }) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

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

  const handleRating = async (newRating: number) => {
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
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          fill={star <= (hoveredRating || rating) ? 'gold' : 'none'}
          stroke={star <= (hoveredRating || rating) ? 'gold' : 'currentColor'}
          className="cursor-pointer"
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => handleRating(star)}
        />
      ))}
    </div>
  );
};

export default RatingComponent;