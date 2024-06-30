import React from 'react';
import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";
import { Search } from 'lucide-react';

const BrowseNavbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/browse/movie" className="hover:text-gray-300">Movies</Link>
          <Link href="/browse/tv" className="hover:text-gray-300">TV Shows</Link>
          <Link href="/watchlist" className="hover:text-gray-300">Watchlist</Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};

export default BrowseNavbar;