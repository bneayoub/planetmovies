import React from 'react';
import aboutImage from '/public/about.jpeg';
import Image from 'next/image';

const About = () => {
  return (
    <section
      id="about"
      className="py-32 bg-gray-100 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${aboutImage.src})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-12 text-white">About Us</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-white">Our Mission</h3>
            <p className="text-white text-lg">
              At Cinevault, we're passionate about connecting people with great entertainment.
              Our mission is to help you discover new movies and TV shows that you'll love,
              based on your personal preferences and viewing history.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-white">What We Offer</h3>
            <ul className="list-disc list-inside text-white text-lg">
              <li>Personalized recommendations</li>
              <li>Comprehensive movie and TV show database</li>
              <li>User ratings and reviews</li>
              <li>Watchlist feature to keep track of what you want to watch</li>
              <li>Latest news and updates from the entertainment world</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
