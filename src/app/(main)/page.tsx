import React from 'react';
import Hero from '@/components/Landing/Hero';
import About from '@/components/Landing/About';
import Services from '@/components/Landing/Services';
import Contact from '@/components/Landing/Contact';


const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
      </main>

<footer className="bg-gray-800 text-white p-4">
        <Contact />
      </footer>
    </div>
  );
};

export default LandingPage;