import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Content {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
}

interface SimilarContentProps {
  items: Content[];
  contentType: 'movie' | 'tv';
  title?: string;
}

const SimilarContent: React.FC<SimilarContentProps> = ({ items, contentType, title }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.slice(0, 10).map((item) => (
          <Link href={`/browse/${contentType}/${item.id}`} key={item.id}>
            <div className="bg-skin-fill rounded-lg shadow-md overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name || 'Poster'}
                width={500}
                height={750}
                className="w-full h-auto"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{item.title || item.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarContent;