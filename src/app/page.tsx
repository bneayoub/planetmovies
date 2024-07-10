import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Landing/Hero';
import About from '@/components/Landing/About';
import Services from '@/components/Landing/Services';
import Contact from '@/components/Landing/Contact';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="absolute w-full text-white p-4 bg-transparent z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Cinevault</Link>
          <div className="space-x-4">
            <Link href="#about" className="hover:underline">About Us</Link>
            <Link href="#services" className="hover:underline">Our Services</Link>
            <Link href="#contact" className="hover:underline">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <SignedOut>
            <div className="bg-purple-500 px-4 py-2 rounded-full text-white hover:bg-purple-600">
              <SignInButton />
            </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <Contact />
      </footer>
    </div>
  );
};

export default LandingPage;
