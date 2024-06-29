import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 pl-10"
      />
      <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search />
      </button>
    </form>
  );
};

export default SearchBox;