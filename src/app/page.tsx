import { fetchFromTMDB } from '@/utils/tmdb';
import MovieList from '@/components/MovieList';

export default async function Home() {
  const data = await fetchFromTMDB({ path: '/movie/popular' });
  const movies = data.results;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
      <MovieList movies={movies} />
    </main>
  );
}