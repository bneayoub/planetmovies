import BrowseNavbar from '@/components/Browse/NavBar';
import React from 'react';


export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowseNavbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}