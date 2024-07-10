import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (results: any[]) => void;
  type: 'movie' | 'tv';
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, type }) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.trim()) {
        try {
          const response = await fetch(`/api/${type}/search?query=${encodeURIComponent(searchQuery)}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          onSearch(data.results);
        } catch (error) {
          console.error(`Error searching ${type}:`, error);
        }
      } else {
        onSearch([]);
      }
    }, 300),
    [type, onSearch]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search ${type === 'movie' ? 'movies' : 'TV shows'}...`}
        className="w-full bg-skin-fill border border-skin-muted rounded-md px-4 py-2 pl-10 pr-10"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default SearchBox;