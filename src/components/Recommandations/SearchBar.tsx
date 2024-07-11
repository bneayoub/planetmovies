import React, { useState, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { debounce } from 'lodash';

interface SearchBarProps {
  onSearch: (query: string) => void;
  clearSearch: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, clearSearch }) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery);
    }, 300),
    [onSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  useEffect(() => {
    if (clearSearch) {
      setQuery('');
    }
  }, [clearSearch]);

  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a movie..."
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

export default SearchBar;