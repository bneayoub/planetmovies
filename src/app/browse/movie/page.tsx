// app/movie/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import MovingGrid from '@/components/Browse/MovingGrid';
import HorizontalScroll from '@/components/Browse/HorizontalScroll';
import GenreFilter from '@/components/Browse/GenreFilter';
import SearchBox from '@/components/Browse/SearchBox';

interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  // Add other relevant fields
}

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

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

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenre(genreId);
    if (genreId) {
      setFilteredMovies(movies.filter(movie => movie.genre_ids.includes(genreId)));
    } else {
      setFilteredMovies(movies);
    }
  };

  const handleSearch = (searchResults: Movie[]) => {
    setFilteredMovies(searchResults);
  };

  return (
    <div>
      <div className="mb-8">
        <GenreFilter onGenreChange={handleGenreChange} type="movie" />
        <SearchBox onSearch={handleSearch} type="movie" />
      </div>
      <MovingGrid items={filteredMovies.slice(0, 10)} title="Trending Movies" type="movie" />
      <HorizontalScroll items={filteredMovies.slice(10, 20)} title="Now Playing" type="movie" />
      <HorizontalScroll items={filteredMovies.slice(20, 30)} title="Upcoming" type="movie" />
      <HorizontalScroll items={filteredMovies.slice(30, 40)} title="Top Rated" type="movie" />
      <HorizontalScroll items={filteredMovies.slice(40, 50)} title="Popular" type="movie" />
    </div>
  );
};

export default MoviesPage;