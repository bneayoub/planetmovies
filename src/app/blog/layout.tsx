import TopNavbar from '@/components/Landing/TopNavbar';
import React from 'react';


export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <TopNavbar />
      <main className="h-full">
        {children}
      </main>
    </div>
  );
}