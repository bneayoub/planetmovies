'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-auto z-0"
        style={{backgroundImage: "url('/images/hero-background.jpg')"}}
      ></div>

      <div className="absolute inset-0 bg-black opacity-90 z-10"></div>

      <motion.div
        className="z-20 text-center px-4 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Welcome to PlanetMovies
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Discover your next favorite movie or TV show
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            href="/browse/movie"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
          >
            Browse Now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;