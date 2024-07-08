import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroBackground from '/public/hero.png';
import sunImage from '/public/sun.png';
import lightImage from '/public/light.png';

const Hero = () => {
  return (
    <div className="relative h-screen bg-black text-white grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-8 z-20 relative">
        <div className="text-left max-w-lg">
          <div className="relative h-32 w-32 mb-4">
            <Image src={lightImage} alt="Light" layout="fill" objectFit="contain" />
            <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
              <Image src={sunImage} alt="Sun" width={80} height={80} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold">Welcome to Cinevault</h1>
          <p className="text-xl md:text-2xl mb-8">Discover your next favorite movie or TV show</p>
          <Link
            href="/browse"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Browse Now
          </Link>
        </div>
      </div>
      <div className="relative">
        <Image
          src={HeroBackground}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          objectPosition="right"
          quality={100}
          className="z-10"
        />
      </div>
    </div>
  );
};

export default Hero;
