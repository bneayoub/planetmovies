import React from 'react';
import Image from 'next/image';

interface Content {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
}

interface SearchResultsProps {
  results: Content[];
  onSelectContent: (content: Content) => void;
  contentType: 'movie' | 'tv';
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelectContent, contentType }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
      {results.map((content) => (
        <div
          key={content.id}
          className="bg-skin-fill rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
          onClick={() => onSelectContent(content)}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
            alt={content.title || content.name || 'Poster'}
            width={500}
            height={750}
            className="w-full h-auto"
          />
          <div className="p-2">
            <h3 className="text-sm font-semibold truncate">{content.title || content.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;