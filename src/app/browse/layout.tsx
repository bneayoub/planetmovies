import BrowseNavbar from '@/components/Browse/NavBar';
import React from 'react';


export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <BrowseNavbar />
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}