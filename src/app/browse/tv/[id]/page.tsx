import React from 'react';
import { notFound } from 'next/navigation';
import TVShowDetailsComponent from '@/components/Details/TVShowDetailsComponent';

async function getTVShowDetails(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tv/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export default async function TVShowDetailsPage({ params }: { params: { id: string } }) {
  const tvShowDetails = await getTVShowDetails(params.id);

  if (!tvShowDetails) {
    notFound();
  }

  return <TVShowDetailsComponent tvShow={tvShowDetails} />;
}