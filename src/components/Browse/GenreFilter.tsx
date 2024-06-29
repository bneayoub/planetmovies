import React, { useEffect, useState } from 'react';

interface Genre {
  id: number;
  name: string;
}

interface GenreFilterProps {
  onGenreChange: (genreId: number | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ onGenreChange }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/movies/genres');
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (isLoading) {
    return <div>Loading genres...</div>;
  }

  return (
    <div className="mb-4">
      <select
        className="bg-white border border-gray-300 rounded-md px-4 py-2"
        onChange={(e) => onGenreChange(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">All Genres</option>
        {genres.length > 0 && genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;