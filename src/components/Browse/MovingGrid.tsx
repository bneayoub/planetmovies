import React from 'react';
import MovieCard from '@/components/Shared/MovieCard';
import TVShowCard from '@/components/Shared/TVShowCard';

interface MovingGridProps {
  items: any[];
  title: string;
  type: 'movie' | 'tv';
}

const MovingGrid: React.FC<MovingGridProps> = ({ items, title, type }) => {
  const Card = type === 'movie' ? MovieCard : TVShowCard;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <Card key={item.id} movie={item} show={item} />
        ))}
      </div>
    </div>
  );
};

export default MovingGrid;