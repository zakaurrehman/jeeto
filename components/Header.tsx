'use client';

import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gold/20 bg-navy/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/jeetopakistan.jpeg" alt="Jeeto Pakistan" className="h-10 md:h-12 rounded" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <Link href="/" className="text-gray-300 hover:text-gold transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-gold transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-gray-300 hover:text-gold transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-gold transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:gap-4">
            <SignedIn>
              <Link href="/dashboard" className="hidden sm:block text-xs md:text-sm text-gray-300 hover:text-gold transition-colors">
                My Tickets
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn-gold text-xs md:text-sm px-3 md:px-4 py-2 whitespace-nowrap">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gold p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-gold/20 flex flex-col gap-3">
            <Link
              href="/"
              className="text-gray-300 hover:text-gold transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-gold transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/faq"
              className="text-gray-300 hover:text-gold transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-gold transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
