import React from 'react';
import { Film, Tv, List, Star, LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-gray-100 hover:scale-110">
    <Icon className="w-12 h-12 text-red-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Services: React.FC = () => {
  const services: ServiceCardProps[] = [
    {
      icon: Film,
      title: "Movie Recommendations",
      description: "Get personalized movie suggestions based on your preferences and viewing history."
    },
    {
      icon: Tv,
      title: "TV Show Discovery",
      description: "Explore a vast collection of TV shows and find your next binge-worthy series."
    },
    {
      icon: List,
      title: "Watchlist",
      description: "Keep track of movies and shows you want to watch with our convenient watchlist feature."
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      description: "Rate and review your favorite content, and see what others think about it."
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
