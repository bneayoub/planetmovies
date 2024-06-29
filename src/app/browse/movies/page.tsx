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
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, nowPlaying, upcoming, topRated, popular] = await Promise.all([
          fetch('/api/movies/trending').then(res => res.json()),
          fetch('/api/movies/now-playing').then(res => res.json()),
          fetch('/api/movies/upcoming').then(res => res.json()),
          fetch('/api/movies/top-rated').then(res => res.json()),
          fetch('/api/movies/popular').then(res => res.json()),
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
    let result = movies;

    if (selectedGenre) {
      result = result.filter(movie => movie.genre_ids.includes(selectedGenre));
    }

    if (searchQuery) {
      result = result.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMovies(result);
  }, [movies, selectedGenre, searchQuery]);

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenre(genreId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <div className="mb-8">
        <GenreFilter onGenreChange={handleGenreChange} />
        <SearchBox onSearch={handleSearch} />
      </div>
      <MovingGrid items={filteredMovies.slice(0, 10)} title="Trending Movies" />
      <HorizontalScroll items={filteredMovies.slice(10, 20)} title="Now Playing" />
      <HorizontalScroll items={filteredMovies.slice(20, 30)} title="Upcoming" />
      <HorizontalScroll items={filteredMovies.slice(30, 40)} title="Top Rated" />
      <HorizontalScroll items={filteredMovies.slice(40, 50)} title="Popular" />
    </div>
  );
};

export default MoviesPage;