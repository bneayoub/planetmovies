import React from 'react';
import MovieCard from '@/components/Shared/MovieCard';
import TVShowCard from '@/components/Shared/TVShowCard';

interface HorizontalScrollProps {
  items: any[];
  title: string;
  type: 'movie' | 'tv';
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ items, title, type }) => {
  const Card = type === 'movie' ? MovieCard : TVShowCard;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-48">
            <Card movie={item} show={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;