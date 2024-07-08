import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WatchlistButton from './WatchlistButton';
import RatingComponent from './RatingComponent';

interface TVShowCardProps {
  show: {
    id: number;
    name: string;
    poster_path: string;
  };
  isInWatchlist?: boolean;
}

const TVShowCard: React.FC<TVShowCardProps> = ({ show, isInWatchlist = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/browse/tv/${show.id}`}>
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
      </Link>
      <div className="p-4 flex justify-between items-center">
        <WatchlistButton
          contentType="tvshow"
          contentId={show.id}
          isInWatchlist={isInWatchlist}
          title={show.name}
          posterPath={show.poster_path}
        />
        <RatingComponent contentType="tvshow" contentId={show.id} title={show.name} />
      </div>
    </div>
  );
};

export default TVShowCard;