'use client';

import React, { useEffect, useState } from 'react';
import MovingGrid from '@/components/Browse/MovingGrid';
import HorizontalScroll from '@/components/Browse/HorizontalScroll';
import GenreFilter from '@/components/Browse/GenreFilter';
import SearchBox from '@/components/Browse/SearchBox';

interface TVShow {
  id: number;
  name: string;
  genre_ids: number[];
}

const TVShowsPage: React.FC = () => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [filteredTVShows, setFilteredTVShows] = useState<TVShow[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);

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

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    if (query.trim()) {
      try {
        const response = await fetch(`/api/tv/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFilteredTVShows(data.results);
      } catch (error) {
        console.error('Error searching TV shows:', error);
        setFilteredTVShows([]);
      }
    } else {
      setIsSearching(false);
      setFilteredTVShows(tvShows);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <GenreFilter onGenreChange={handleGenreChange} type="tv" />
        <SearchBox onSearch={handleSearch} type="tv" />
      </div>
      {isSearching ? (
        <MovingGrid items={filteredTVShows} title="Search Results" type="tv" />
      ) : (
        <>
          <MovingGrid items={filteredTVShows.slice(0, 10)} title="Trending TV Shows" type="tv" />
          <HorizontalScroll items={filteredTVShows.slice(10, 20)} title="Airing Today" type="tv" />
          <HorizontalScroll items={filteredTVShows.slice(20, 30)} title="On The Air" type="tv" />
          <HorizontalScroll items={filteredTVShows.slice(30, 40)} title="Top Rated" type="tv" />
          <HorizontalScroll items={filteredTVShows.slice(40, 50)} title="Popular" type="tv" />
        </>
      )}
    </div>
  );
};

export default TVShowsPage;