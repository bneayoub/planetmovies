import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SimilarContent from '@/components/Shared/SimilarContent';

interface Content {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
}

interface SelectedContentProps {
  content: Content;
  contentType: 'movie' | 'tv';
}

const SelectedContent: React.FC<SelectedContentProps> = ({ content, contentType }) => {
  const [similarContent, setSimilarContent] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/${contentType}/${content.id}/similar`);
        if (!response.ok) {
          throw new Error(`Failed to fetch similar ${contentType}`);
        }
        const data = await response.json();
        setSimilarContent(data.results || []);
      } catch (error) {
        setError(`Failed to load similar ${contentType}. Please try again later.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarContent();
  }, [content.id, contentType]);

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row mb-6">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
            alt={content.title || content.name || ''}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="md:w-2/3 md:pl-6">
          <h2 className="text-2xl font-bold mb-2">{content.title || content.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{content.overview}</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </div>
      </div>
      {isLoading ? (
        <div>Loading similar {contentType}...</div>
      ) : similarContent.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Similar {contentType === 'movie' ? 'Movies' : 'TV Shows'}</h2>
          <SimilarContent items={similarContent} contentType={contentType} />
        </div>
      ) : (
        <p>No similar {contentType === 'movie' ? 'movies' : 'TV shows'} found.</p>
      )}
    </div>
  );
};

export default SelectedContent;