import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WatchlistButton from './WatchlistButton';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
  isInWatchlist?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isInWatchlist = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/browse/movies/${movie.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="w-full h-auto"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
        </div>
      </Link>
      <div className="p-4">
        <WatchlistButton
          contentType="movie"
          contentId={movie.id}
          isInWatchlist={isInWatchlist}
          title={movie.title}
          posterPath={movie.poster_path}
        />
      </div>
    </div>
  );
};

export default MovieCard;