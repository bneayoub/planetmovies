import React, { useEffect, useState } from 'react';

interface Genre {
  id: number;
  name: string;
}

interface GenreFilterProps {
  onGenreChange: (genreId: number | null) => void;
  type: 'movies' | 'tv';
}

const GenreFilter: React.FC<GenreFilterProps> = ({ onGenreChange, type }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/${type}/genre`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error(`Error fetching ${type} genres:`, error);
        setError(`Failed to fetch genres. Please try again later.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, [type]);

  if (isLoading) {
    return <div>Loading genres...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mb-4">
      <select
        className="bg-skin-fill border border-skin-muted rounded-md px-4 py-2"
        onChange={(e) => onGenreChange(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;