'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Calendar, List, X } from 'lucide-react';
import WatchlistButton from '@/components/Shared/WatchlistButton';
import RatingComponent from '@/components/Shared/RatingComponent';
import SimilarContent from '@/components/Shared/SimilarContent';
import CommentSection from '@/components/Shared/CommentSection';
import SideNavigation from '@/components/Shared/SideNavigation';
interface TVShowDetailsProps {
  tvShow: {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    vote_average: number;
    number_of_seasons: number;
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
    seasons: {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
    }[];
    similarTVShows: Array<{
      id: number;
      name: string;
      poster_path: string;
    }>;
  };
}

const TVShowDetailsComponent: React.FC<TVShowDetailsProps> = ({ tvShow }) => {
  const [showAllCast, setShowAllCast] = useState(false);
  const trailers = tvShow.videos.results.filter(video => video.type === "Trailer");

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'cast', label: 'Cast' },
    { id: 'seasons', label: 'Seasons' },
    { id: 'trailers', label: 'Trailers' },
    { id: 'similar', label: 'Similar TV Shows' },
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
                  src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                  alt={tvShow.name}
                  width={500}
                  height={750}
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="lg:w-2/3">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{tvShow.name}</h1>
                <div className="flex items-center mb-4 text-gray-600 dark:text-gray-300">
                  <Star className="text-yellow-400 mr-1" />
                  <span className="mr-4">{tvShow.vote_average.toFixed(1)}</span>
                  <Calendar className="mr-1" />
                  <span className="mr-4">{new Date(tvShow.first_air_date).getFullYear()}</span>
                  <List className="mr-1" />
                  <span>{tvShow.number_of_seasons} {tvShow.number_of_seasons === 1 ? 'Season' : 'Seasons'}</span>
                </div>
                <div className="mb-4">
                  {tvShow.genres.map((genre) => (
                    <span key={genre.id} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">
                      {genre.name}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{tvShow.overview}</p>
                <div className="flex mb-6 gap-4">
                  <WatchlistButton
                    contentType="tvshow"
                    contentId={tvShow.id}
                    title={tvShow.name}
                    posterPath={tvShow.poster_path}
                  />
                  <RatingComponent contentType="tvshow" contentId={tvShow.id} title={tvShow.name} />
                </div>
              </div>
            </div>
          </section>

          <section id="cast" className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {tvShow.credits.cast.slice(0, 8).map((actor) => (
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
            {tvShow.credits.cast.length > 8 && (
              <button
                onClick={() => setShowAllCast(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Show All Cast
              </button>
            )}
          </section>

          <section id="seasons" className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Seasons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tvShow.seasons.map((season) => (
                <div key={season.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-4 transition-transform hover:scale-105">
                  <Image
                    src={season.poster_path ? `https://image.tmdb.org/t/p/w200${season.poster_path}` : '/placeholder.png'}
                    alt={season.name}
                    width={200}
                    height={300}
                    className="rounded-lg mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{season.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{season.episode_count} episodes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Air date: {season.air_date}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{season.overview ? season.overview.slice(0, 100) + '...' : 'No overview available.'}</p>
                </div>
              ))}
            </div>
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

          {tvShow.similarTVShows && tvShow.similarTVShows.length > 0 && (
            <section id="similar" className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <SimilarContent
                items={tvShow.similarTVShows}
                contentType="tv"
                title="Similar TV Shows"
              />
            </section>
          )}

          <section id="comments" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <CommentSection contentType="tvshow" contentId={tvShow.id} />
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
              {tvShow.credits.cast.map((actor) => (
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

export default TVShowDetailsComponent;