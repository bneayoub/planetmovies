import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WatchlistButton from './WatchlistButton';
import RatingComponent from './RatingComponent';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="bg-skin-fill rounded-lg shadow-md overflow-hidden flex flex-col">
      <Link href={`/browse/movie/${movie.id}`} className="flex-grow">
        <div className="relative aspect-[2/3]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
        </div>
      </Link>
      <div className="p-4 mt-auto">
        <WatchlistButton
          contentType="movie"
          contentId={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
        />
        <div className="mt-2 flex justify-center">
          <RatingComponent contentType="movie" contentId={movie.id} title={movie.title} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;