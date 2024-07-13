'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MovingGrid from '@/components/Browse/MovingGrid';
import HorizontalScroll from '@/components/Browse/HorizontalScroll';
import GenreFilter from '@/components/Browse/GenreFilter';
import SearchBox from '@/components/Browse/SearchBox';
import { WatchlistProvider } from '@/contexts/WatchlistContext';

interface TVShow {
  id: number;
  name: string;
  genre_ids: number[];
  backdrop_path: string;
}

const TVShowsPage: React.FC = () => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [filteredTVShows, setFilteredTVShows] = useState<TVShow[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const [trending, airingToday, onTheAir, topRated, popular] = await Promise.all([
          fetch('/api/tv/trending').then(res => res.json()),
          fetch('/api/tv/airing_today').then(res => res.json()),
          fetch('/api/tv/on_the_air').then(res => res.json()),
          fetch('/api/tv/top-rated').then(res => res.json()),
          fetch('/api/tv/popular').then(res => res.json()),
        ]);

        const allTVShows = [
          ...trending.results,
          ...airingToday.results,
          ...onTheAir.results,
          ...topRated.results,
          ...popular.results
        ];

        setTVShows(allTVShows);
        setFilteredTVShows(allTVShows);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    fetchTVShows();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackdropIndex((prevIndex) =>
        (prevIndex + 1) % filteredTVShows.slice(0, 10).length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredTVShows]);

  useEffect(() => {
    if (!isSearching) {
      let result = tvShows;

      if (selectedGenre) {
        result = result.filter(show => show.genre_ids.includes(selectedGenre));
      }

      setFilteredTVShows(result);
    }
  }, [tvShows, selectedGenre, isSearching]);

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setIsSearching(false);
  };

  const handleSearch = (searchResults: TVShow[]) => {
    if (searchResults.length > 0) {
      setIsSearching(true);
      setFilteredTVShows(searchResults);
    } else {
      setIsSearching(false);
      setFilteredTVShows(selectedGenre
        ? tvShows.filter(show => show.genre_ids.includes(selectedGenre))
        : tvShows
      );
    }
  };

  return (
    <WatchlistProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Hero section with moving background */}
        <section className="relative w-full" style={{ height: '800px', minHeight: '500px', maxHeight: '2000px' }}>
          <div className="absolute inset-0">
            {filteredTVShows[currentBackdropIndex]?.backdrop_path && (
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${filteredTVShows[currentBackdropIndex].backdrop_path})`,
                  opacity: 0.6
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/50 to-gray-900 dark:from-black/30 dark:via-black/50 dark:to-gray-900" />
          </div>

          {/* Hero content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {filteredTVShows[currentBackdropIndex]?.name || "Trending TV Shows"}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">Discover the best in television</p>
              {filteredTVShows[currentBackdropIndex] && (
                <Link href={`/browse/tv/${filteredTVShows[currentBackdropIndex].id}`} passHref>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
                    Check details
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Main content */}
        <main className="bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-12">
            {/* Filter and Search */}
            <div className="mb-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <GenreFilter onGenreChange={handleGenreChange} type="tv" />
              <SearchBox onSearch={handleSearch} type="tv" />
            </div>

            {/* TV Show grids */}
            <div className="space-y-16">
              {isSearching ? (
                <MovingGrid items={filteredTVShows} title="Search Results" type="tv" />
              ) : (
                <>
                  <HorizontalScroll items={filteredTVShows.slice(0, 10)} title="Trending" type="tv" />
                  <HorizontalScroll items={filteredTVShows.slice(10, 20)} title="Airing Today" type="tv" />
                  <HorizontalScroll items={filteredTVShows.slice(20, 30)} title="On The Air" type="tv" />
                  <HorizontalScroll items={filteredTVShows.slice(30, 40)} title="Top Rated" type="tv" />
                  <HorizontalScroll items={filteredTVShows.slice(40, 50)} title="Popular" type="tv" />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </WatchlistProvider>
  );
};

export default TVShowsPage;