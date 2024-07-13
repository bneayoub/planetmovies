import React from 'react';
import { Film, Tv, List, Star } from 'lucide-react';
import ScrollAnimation from '../ScrollAnimation';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description }) => (
  <ScrollAnimation>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="p-6">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
        <a href="/blog" className="text-red-600 dark:text-red-400 font-medium hover:underline">Learn more &rarr;</a>
      </div>
    </div>
  </ScrollAnimation>
);

const Services: React.FC = () => {
  const services: ServiceCardProps[] = [
    {
      icon: Film,
      title: "Movie Recommendations",
      description: "Get personalized movie suggestions based on your preferences and viewing history. Our AI-powered system learns from your choices to provide increasingly accurate recommendations."
    },
    {
      icon: Tv,
      title: "TV Show Discovery",
      description: "Explore a vast collection of TV shows and find your next binge-worthy series. From classic sitcoms to the latest dramas, we've got something for everyone."
    },
    {
      icon: List,
      title: "Watchlist",
      description: "Keep track of movies and shows you want to watch with our convenient watchlist feature. Organize your entertainment queue and never miss a must-see title again."
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      description: "Rate and review your favorite content, and see what others think about it. Contribute to our community of movie enthusiasts and help others discover great content."
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
            Our <span className="text-red-600">Services</span>
          </h2>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        <ScrollAnimation>
          <div className="mt-12 text-center">
            <a href="/blog" className="inline-block bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300">
              Explore All Features
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Services;