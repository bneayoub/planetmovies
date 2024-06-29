import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{backgroundImage: "url('/images/hero-background.jpg')"}}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="z-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Cinevault</h1>
        <p className="text-xl mb-8">Discover your next favorite movie or TV show</p>
        <Link
          href="/browse"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Browse Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;