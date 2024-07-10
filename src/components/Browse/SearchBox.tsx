import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (results: any[]) => void;
  type: 'movie' | 'tv';
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, type }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      try {
        const response = await fetch(`/api/${type}/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        onSearch(data.results);
      } catch (error) {
        console.error(`Error searching ${type}:`, error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search ${type === 'movie' ? 'movies' : 'TV shows'}...`}
        className="w-full bg-skin-fill border border-skin-muted rounded-md px-4 py-2 pl-10"
      />
      <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search />
      </button>
    </form>
  );
};

export default SearchBox;