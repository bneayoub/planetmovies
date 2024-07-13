import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const BrowseNavbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/logo.svg"
            alt="PlanetMovies Logo"
            width={140}
            height={140}
            className="mr-2"
          />
        </Link>
        <div className="flex space-x-4">
          <Link href="/browse/movie" className="hover:text-gray-300">
            Movies
          </Link>
          <Link href="/browse/tv" className="hover:text-gray-300">
            TV Shows
          </Link>
          <Link href="/browse/watchlist" className="hover:text-gray-300">
            Watchlist
          </Link>
          <Link href="/browse/recommendations" className="hover:text-gray-300">
            Recommendations
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};

export default BrowseNavbar;
