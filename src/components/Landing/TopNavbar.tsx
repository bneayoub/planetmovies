import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

function TopNavbar() {
  return (
	<div>
		<div>
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
	</div>
	</div>
  )
}

export default TopNavbar