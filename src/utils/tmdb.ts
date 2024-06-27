const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

type TMDBOptions = {
  path: string;
  params?: Record<string, string>;
};

export async function fetchFromTMDB({ path, params = {} }: TMDBOptions) {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.append('api_key', TMDB_API_KEY!);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}