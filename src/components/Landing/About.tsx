import React from 'react';
import { Film, Users, Star, Lightbulb, LucideIcon } from 'lucide-react';
import ScrollAnimation from '../ScrollAnimation';

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description }) => (
  <div className="flex items-start mb-6">
    <div className="flex-shrink-0 mr-4">
      <div className="bg-red-600 p-3 rounded-full">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </div>
);
const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
            About <span className="text-red-600">PlanetMovies</span>
          </h2>
        </ScrollAnimation>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <ScrollAnimation>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                At PlanetMovies, we're passionate about connecting people with great entertainment.
                Our mission is to help you discover new movies and TV shows that you'll love,
                based on your personal preferences and viewing history.
              </p>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <blockquote className="italic text-gray-800 dark:text-white">
                  "We believe in the power of storytelling to inspire, entertain, and bring people together."
                </blockquote>
              </div>
            </ScrollAnimation>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-8">
            <ScrollAnimation>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">What We Offer</h3>
              <FeatureItem
                icon={Film}
                title="Vast Content Library"
                description="Access to thousands of movies and TV shows across multiple genres and languages."
              />
              <FeatureItem
                icon={Users}
                title="Personalized Recommendations"
                description="AI-powered suggestions based on your viewing history and preferences."
              />
              <FeatureItem
                icon={Star}
                title="User Ratings and Reviews"
                description="Make informed decisions with insights from our community of movie enthusiasts."
              />
              <FeatureItem
                icon={Lightbulb}
                title="Curated Collections"
                description="Discover themed collections and hidden gems curated by film experts."
              />
            </ScrollAnimation>
          </div>
        </div>

        <ScrollAnimation>
          <div className="mt-12 text-center">
            <a href="#" className="inline-block bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300">
              Learn More About Us
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default About;