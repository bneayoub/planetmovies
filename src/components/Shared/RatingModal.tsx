import React, { useState } from 'react';
import { X } from 'lucide-react';

interface RatingModalProps {
  contentType: 'movie' | 'tvshow';
  contentId: number;
  title: string;
  onClose: () => void;
  onRatingSubmit: (rating: number) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ contentType, contentId, title, onClose, onRatingSubmit }) => {
  const [rating, setRating] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRatingSubmit(rating);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Rate this {contentType}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="mb-4">{title}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">
              <span className="font-bold text-lg">{rating}</span> / 10
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Rating
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;