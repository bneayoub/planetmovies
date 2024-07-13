import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import Image from "next/image";

function TopNavbar() {
  return (
    <div>
      <div>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logos/logo.svg"
                alt="PlanetMovies Logo"
                width={150}
                height={150}
                className="mr-2"
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
      </div>
    </div>
  );
}

export default TopNavbar;
