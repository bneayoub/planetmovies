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
}

const TVShowCard: React.FC<TVShowCardProps> = ({ show }) => {
  return (
    <div className="bg-skin-fill rounded-lg shadow-md overflow-hidden flex flex-col">
      <Link href={`/browse/tv/${show.id}`} className="flex-grow">
        <div className="relative aspect-[2/3]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{show.name}</h3>
        </div>
      </Link>
      <div className="p-4 mt-auto">
        <WatchlistButton
          contentType="tvshow"
          contentId={show.id}
          title={show.name}
          posterPath={show.poster_path}
        />
        <div className="mt-2 flex justify-center">
          <RatingComponent contentType="tvshow" contentId={show.id} title={show.name} />
        </div>
      </div>
    </div>
  );
};

export default TVShowCard;