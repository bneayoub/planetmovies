import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link href={`/browse/movies/${movie.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
      </div>
    </Link>
  );
};

export default MovieCard;