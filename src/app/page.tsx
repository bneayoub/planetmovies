import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Landing/Hero';
import About from '@/components/Landing/About';
import Services from '@/components/Landing/Services';
import Contact from '@/components/Landing/Contact';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Cinevault</Link>
          <div className="space-x-4">
            <Link href="#about">About Us</Link>
            <Link href="#services">Our Services</Link>
            <Link href="#contact">Contact</Link>
          </div>
          <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
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