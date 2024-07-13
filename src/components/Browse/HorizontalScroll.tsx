import React, { useRef, useState } from 'react';
import MovieCard from '@/components/Shared/MovieCard';
import TVShowCard from '@/components/Shared/TVShowCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollProps {
  items: any[];
  title: string;
  type: 'movie' | 'tv';
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ items, title, type }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const Card = type === 'movie' ? MovieCard : TVShowCard;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth * 0.8; // Scroll 80% of the visible width
      const newPosition = direction === 'left'
        ? Math.max(scrollPosition - scrollAmount, 0)
        : Math.min(scrollPosition + scrollAmount, current.scrollWidth - current.clientWidth);

      current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="mb-12 relative">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-48 transition-transform duration-300 ease-in-out transform hover:scale-105">
              <Card movie={item} show={item} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 focus:outline-none z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 focus:outline-none z-10"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default HorizontalScroll;