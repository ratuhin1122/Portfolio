"use client";

import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { useScrollDirection } from '@/components/useScrollDirection'; // Import the hook
import { Menu, X } from 'lucide-react'; // Example icons for mobile menu
import  BorderAnimationButton  from "@/components/BorderAnimationButton";

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/' },
  { name: 'Projects', href: '/' },
  
];

const Navbar = () => {
  const scrolled = useScrollDirection(50); // Becomes true after scrolling 50px
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dynamic classes for the background effect
  const headerClasses = scrolled
    ? 'bg-white/0 backdrop-blur-md shadow-lg transition-all duration-300' // Glass/Scrolled effect
    : 'bg-transparent transition-all duration-300'; // Transparent effect

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 p-4 ${headerClasses}`}>
      <nav className="max-w-7xl mx-auto flex items-center  justify-between">
        {/* Logo/Branding */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold text-white ">
            Portfolio Logo
          </Link>
        </div>

        {/* 1. Desktop Navigation - Centered Links */}
        <ul className="hidden md:flex flex-1  justify-center space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className=" text-white hover:text-indigo-600 transition-colors font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            
            >
              <BorderAnimationButton text="Contact" />
          </Link>
        </div>

        {/* 3. Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-700 rounded-md hover:bg-gray-100 transition-all duration-300"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* 3. Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 ${scrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-white/5'} transition-all duration-300 transform ${
          isMenuOpen ? 'translate-y-0 opacity-100 p-4 border-t' : '-translate-y-4 opacity-0 h-0 overflow-hidden'
        }`}
      >
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(false)} // Close menu on click
                className="block text-lg font-medium text-white hover:text-indigo-600"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-medium text-white hover:text-indigo-600"
              >
             Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
