import React from 'react';
import { notFound } from 'next/navigation';
import MovieDetailsComponent from '@/components/Details/MovieDetailsComponent';
import { WatchlistProvider } from '@/contexts/WatchlistContext';

async function getMovieDetails(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/movie/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movieDetails = await getMovieDetails(params.id);

  if (!movieDetails) {
    notFound();
  }

  return (
    <WatchlistProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <MovieDetailsComponent movie={movieDetails} />
      </div>
    </WatchlistProvider>
  );
}