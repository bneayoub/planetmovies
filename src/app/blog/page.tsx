import React from 'react';
import Link from 'next/link';
import Contact from '@/components/Landing/Contact';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';

const blogPosts = [
  {
    id: 1,
    title: 'Our Journey in Building CineVault',
    summary: 'Discover the story behind CineVault and how we brought our vision to life.',
    date: 'June 28, 2024',
  },
  {
    id: 2,
    title: 'The Technology Behind CineVault',
    summary: 'Learn about the technologies and tools we used to build CineVault.',
    date: 'July 1, 2024',
  },
  // Add more blog posts here
];

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img
              src="/logos/logo.png"
              alt="Cinevault Logo"
              className="max-h-40 max-w-40 mr-2"
              style={{ height: 'auto', width: 'auto' }}
            />
          </Link>
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
        {/* Blog Section */}
        <section className="bg-gray-100 p-4" id="blog">
          <h2 className="text-4xl font-bold mb-6">CineVault Blog</h2>
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.date}</p>
                <p className="text-gray-800 mb-4">{post.summary}</p>
                <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
                  Read more
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <Contact />
      </footer>
    </div>
  );
};

export default BlogPage;
