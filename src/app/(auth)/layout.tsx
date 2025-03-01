import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Image
        src="/images/auth-background.jpg"
        layout="fill"
        objectFit="cover"
        alt="Background"
        priority
      />

      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="relative z-10 flex-grow flex flex-col">
        <header className="p-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/logo.svg"
            alt="PlanetMovies Logo"
            width={200}
            height={200}
            className="mr-2"
          />
        </Link>
        </header>

        <main className="flex-grow flex items-center justify-center px-4">
          <div className="bg-black bg-opacity-70 p-8 rounded-md w-full max-w-md">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;