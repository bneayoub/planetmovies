'use client';

import React, { useEffect, useState } from 'react';
import MovingGrid from '@/components/Browse/MovingGrid';
import HorizontalScroll from '@/components/Browse/HorizontalScroll';
import GenreFilter from '@/components/Browse/GenreFilter';
import SearchBox from '@/components/Browse/SearchBox';
import { WatchlistProvider } from '@/contexts/WatchlistContext';


interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
}

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, nowPlaying, upcoming, topRated, popular] = await Promise.all([
          fetch('/api/movie/trending').then(res => res.json()),
          fetch('/api/movie/now-playing').then(res => res.json()),
          fetch('/api/movie/upcoming').then(res => res.json()),
          fetch('/api/movie/top-rated').then(res => res.json()),
          fetch('/api/movie/popular').then(res => res.json()),
        ]);

        const allMovies = [
          ...trending.results,
          ...nowPlaying.results,
          ...upcoming.results,
          ...topRated.results,
          ...popular.results
        ];

        setMovies(allMovies);
        setFilteredMovies(allMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (!isSearching) {
      let result = movies;

      if (selectedGenre) {
        result = result.filter(movie => movie.genre_ids.includes(selectedGenre));
      }

      setFilteredMovies(result);
    }
  }, [movies, selectedGenre, isSearching]);

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setIsSearching(false);
  };

  const handleSearch = (searchResults: Movie[]) => {
    if (searchResults.length > 0) {
      setIsSearching(true);
      setFilteredMovies(searchResults);
    } else {
      setIsSearching(false);
      setFilteredMovies(selectedGenre
        ? movies.filter(movie => movie.genre_ids.includes(selectedGenre))
        : movies
      );
    }
  };

  return (
    <WatchlistProvider>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <GenreFilter onGenreChange={handleGenreChange} type="movie" />
          <SearchBox onSearch={handleSearch} type="movie" />
        </div>
        {isSearching ? (
          <MovingGrid items={filteredMovies} title="Search Results" type="movie" />
        ) : (
          <>
            <MovingGrid items={filteredMovies.slice(0, 10)} title="Trending Movies" type="movie" />
            <HorizontalScroll items={filteredMovies.slice(10, 20)} title="Now Playing" type="movie" />
            <HorizontalScroll items={filteredMovies.slice(20, 30)} title="Upcoming" type="movie" />
            <HorizontalScroll items={filteredMovies.slice(30, 40)} title="Top Rated" type="movie" />
            <HorizontalScroll items={filteredMovies.slice(40, 50)} title="Popular" type="movie" />
          </>
        )}
      </div>
    </div>
    </WatchlistProvider>
  );
};

export default MoviesPage;