import React from 'react';
import MovieCard from '@/components/Shared/MovieCard';

interface MovingGridProps {
  items: any[];
  title: string;
}

const MovingGrid: React.FC<MovingGridProps> = ({ items, title }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
};

export default MovingGrid;