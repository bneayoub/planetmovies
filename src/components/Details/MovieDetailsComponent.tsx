'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Clock, Calendar, X } from 'lucide-react';
import WatchlistButton from '@/components/Shared/WatchlistButton';
import RatingComponent from '@/components/Shared/RatingComponent';
import SimilarContent from '@/components/Shared/SimilarContent';

interface MovieDetailsProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    genres: { id: number; name: string }[];
    credits: {
      cast: { id: number; name: string; character: string; profile_path: string | null }[];
    };
    videos: {
      results: {
        key: string;
        name: string;
        type: string;
      }[];
    };
    similarMovies: Array<{
      id: number;
      title: string;
      poster_path: string;
    }>;
  };
}

const MovieDetailsComponent: React.FC<MovieDetailsProps> = ({ movie }) => {
  const [showAllCast, setShowAllCast] = useState(false);
  const trailers = movie.videos.results.filter(video => video.type === "Trailer");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 mb-8 lg:mb-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="lg:w-2/3 lg:pl-8">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-1" />
            <span className="mr-4">{movie.vote_average.toFixed(1)}</span>
            <Clock className="mr-1" />
            <span className="mr-4">{movie.runtime} min</span>
            <Calendar className="mr-1" />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          <div className="mb-4">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {genre.name}
              </span>
            ))}
          </div>
          <p className="text-gray-700 mb-6">{movie.overview}</p>
          <div className="flex mb-6">
            <WatchlistButton
              contentType="movie"
              contentId={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
            />
            <div className="ml-4">
              <RatingComponent contentType="movie" contentId={movie.id} title={movie.title} />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {movie.credits.cast.slice(0, 4).map((actor) => (
              <div key={actor.id} className="bg-white rounded-lg shadow-md p-2">
                <Image
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : '/placeholder.png'}
                  alt={actor.name}
                  width={100}
                  height={150}
                  className="rounded-lg mx-auto mb-2"
                />
                <p className="font-semibold text-sm text-center">{actor.name}</p>
                <p className="text-xs text-gray-600 text-center">{actor.character}</p>
              </div>
            ))}
          </div>
          {movie.credits.cast.length > 4 && (
            <button
              onClick={() => setShowAllCast(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Show All Cast
            </button>
          )}
        </div>
      </div>

      {trailers.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Trailers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trailers.map((trailer) => (
              <div key={trailer.key} className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      )}

      {movie.similarMovies && movie.similarMovies.length > 0 && (
        <SimilarContent items={movie.similarMovies} contentType="movie" />
      )}

      {showAllCast && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Full Cast</h2>
              <button onClick={() => setShowAllCast(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movie.credits.cast.map((actor) => (
                <div key={actor.id} className="bg-white rounded-lg shadow-md p-2">
                  <Image
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : '/placeholder.png'}
                    alt={actor.name}
                    width={100}
                    height={150}
                    className="rounded-lg mx-auto mb-2"
                  />
                  <p className="font-semibold text-sm text-center">{actor.name}</p>
                  <p className="text-xs text-gray-600 text-center">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsComponent;