import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { useRating } from '@/contexts/RatingContext';

interface RatingModalProps {
  contentType: 'movie' | 'tvshow';
  contentId: number;
  title: string;
  onClose: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ contentType, contentId, title, onClose }) => {
  const { addOrUpdateRating, getRating } = useRating();
  const [rating, setRating] = useState<number>(getRating(contentType, contentId) || 5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addOrUpdateRating({ contentType, contentId, rating });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-skin-fill bg-opacity-90 p-6 rounded-lg shadow-lg max-w-sm w-full m-4 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-skin-base">Rate this {contentType}</h2>
          <button onClick={onClose} className="text-skin-muted hover:text-skin-base transition-colors">
            <X size={24} />
          </button>
        </div>
        <p className="mb-4 text-skin-muted font-medium">{title}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <Star
                  key={value}
                  size={24}
                  fill={value <= rating ? 'gold' : 'none'}
                  stroke={value <= rating ? 'gold' : 'currentColor'}
                  className="cursor-pointer transition-colors"
                  onClick={() => setRating(value)}
                />
              ))}
            </div>
            <div className="text-center mt-2">
              <span className="font-bold text-2xl text-skin-base">{rating}</span>
              <span className="text-skin-muted"> / 10</span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-skin-button-accent text-skin-inverted py-2 px-4 rounded-lg hover:bg-skin-button-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-skin-button-accent focus:ring-opacity-50"
          >
            Submit Rating
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;