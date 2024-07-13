import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';
import ScrollAnimation from '../ScrollAnimation';

const Contact: React.FC = () => {
  return (
    <ScrollAnimation>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Connect with Us</h2>
          <p className="text-gray-300 mb-8">Stay updated with the latest movie and TV show recommendations.</p>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
            <a
              href="https://github.com/bneayoub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              <Github className="w-5 h-5 mr-2" />
              Follow us on GitHub
            </a>

            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Check our blog
            </Link>
          </div>

          <div className="mt-12">
            <p className="text-gray-400">&copy; 2024 PlanetMovies. All rights reserved.</p>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default Contact;