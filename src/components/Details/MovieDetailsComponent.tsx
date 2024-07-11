'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Clock, Calendar, X } from 'lucide-react';
import WatchlistButton from '@/components/Shared/WatchlistButton';
import RatingComponent from '@/components/Shared/RatingComponent';
import SimilarContent from '@/components/Shared/SimilarContent';
import CommentSection from '@/components/Shared/CommentSection';
import SideNavigation from '@/components/Shared/SideNavigation';

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

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'cast', label: 'Cast' },
    { id: 'trailers', label: 'Trailers' },
    { id: 'similar', label: 'Similar Movies' },
    { id: 'comments', label: 'Comments' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <SideNavigation items={navItems} />
        </aside>
        <div className="lg:w-3/4">
          <section id="overview" className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="lg:w-2/3">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{movie.title}</h1>
                <div className="flex items-center mb-4 text-gray-600 dark:text-gray-300">
                  <Star className="text-yellow-400 mr-1" />
                  <span className="mr-4">{movie.vote_average.toFixed(1)}</span>
                  <Clock className="mr-1" />
                  <span className="mr-4">{movie.runtime} min</span>
                  <Calendar className="mr-1" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="mb-4">
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">
                      {genre.name}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{movie.overview}</p>
                <div className="flex mb-6 gap-4">
                  <WatchlistButton
                    contentType="movie"
                    contentId={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                  />
                  <RatingComponent contentType="movie" contentId={movie.id} title={movie.title} />
                </div>
              </div>
            </div>
          </section>

          <section id="cast" className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {movie.credits.cast.slice(0, 8).map((actor) => (
                <div key={actor.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-2 transition-transform hover:scale-105">
                  <Image
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : '/placeholder.png'}
                    alt={actor.name}
                    width={100}
                    height={150}
                    className="rounded-lg mx-auto mb-2"
                  />
                  <p className="font-semibold text-sm text-center text-gray-900 dark:text-white">{actor.name}</p>
                  <p className="text-xs text-center text-gray-600 dark:text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
            {movie.credits.cast.length > 8 && (
              <button
                onClick={() => setShowAllCast(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Show All Cast
              </button>
            )}
          </section>

          {trailers.length > 0 && (
            <section id="trailers" className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Trailers</h2>
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
            </section>
          )}

          {movie.similarMovies && movie.similarMovies.length > 0 && (
            <section id="similar" className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <SimilarContent
                items={movie.similarMovies}
                contentType="movie"
                title="Similar Movies"
              />
            </section>
          )}

          <section id="comments" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <CommentSection contentType="movie" contentId={movie.id} />
          </section>
        </div>
      </div>

      {showAllCast && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Full Cast</h2>
              <button onClick={() => setShowAllCast(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movie.credits.cast.map((actor) => (
                <div key={actor.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-2 transition-transform hover:scale-105">
                  <Image
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : '/placeholder.png'}
                    alt={actor.name}
                    width={100}
                    height={150}
                    className="rounded-lg mx-auto mb-2"
                  />
                  <p className="font-semibold text-sm text-center text-gray-900 dark:text-white">{actor.name}</p>
                  <p className="text-xs text-center text-gray-600 dark:text-gray-400">{actor.character}</p>
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