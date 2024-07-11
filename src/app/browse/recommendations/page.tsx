'use client';

import React, { useState } from 'react';
import SearchBar from '@/components/Recommandations/SearchBar';
import SearchResults from '@/components/Recommandations/SearchResults';
import SelectedContent from '@/components/Recommandations/SelectedContent';

interface Content {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
}

type ContentType = 'movie' | 'tv';

const RecommendationsPage: React.FC = () => {
  const [contentType, setContentType] = useState<ContentType>('movie');
  const [searchResults, setSearchResults] = useState<Content[]>([]);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setSelectedContent(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setClearSearch(false);
    try {
      const response = await fetch(`/api/${contentType}/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error(`Error searching ${contentType}:`, error);
      setSearchResults([]);
    }
  };

  const handleSelectContent = (content: Content) => {
    setSelectedContent(content);
    setSearchResults([]);
    setIsSearching(false);
    setClearSearch(true);
  };

  const handleContentTypeChange = (type: ContentType) => {
    setContentType(type);
    setSearchResults([]);
    setSelectedContent(null);
    setClearSearch(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recommendations</h1>
      <div className="mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded ${contentType === 'movie' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleContentTypeChange('movie')}
        >
          Movies
        </button>
        <button
          className={`px-4 py-2 rounded ${contentType === 'tv' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleContentTypeChange('tv')}
        >
          TV Shows
        </button>
      </div>
      <SearchBar onSearch={handleSearch} clearSearch={clearSearch} />
      {selectedContent && !isSearching && (
        <div className="mt-4">
          <SelectedContent content={selectedContent} contentType={contentType} />
        </div>
      )}
      {isSearching && searchResults.length > 0 && (
        <div className="mt-4">
          <SearchResults results={searchResults} onSelectContent={handleSelectContent} contentType={contentType} />
        </div>
      )}
    </div>
  );
};

export default RecommendationsPage;