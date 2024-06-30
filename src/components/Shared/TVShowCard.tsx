import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TVShowCardProps {
  show: {
    id: number;
    name: string;
    poster_path: string;
  };
}

const TVShowCard: React.FC<TVShowCardProps> = ({ show }) => {
  return (
    <Link href={`/browse/tv/${show.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={show.name}
          width={500}
          height={750}
          className="w-full h-auto"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{show.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default TVShowCard;