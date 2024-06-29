import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p>
              At Cinevault, we're passionate about connecting people with great entertainment.
              Our mission is to help you discover new movies and TV shows that you'll love,
              based on your personal preferences and viewing history.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-8">
            <h3 className="text-xl font-semibold mb-4">What We Offer</h3>
            <ul className="list-disc list-inside">
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