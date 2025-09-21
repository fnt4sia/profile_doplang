import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Sejarah', href: '/sejarah' },
    { name: 'Administrasi', href: '/administrasi' },
    { name: 'Galeri', href: '/galeri' },
  ];

  return (
    <nav className="bg-white fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-2">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              DOPLANG
            </Link>
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 px-5 py-2 text-lg font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#hubungi"
              className="bg-blue-600 text-white px-6 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Hubungi Kami
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Buka menu utama</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
            >
              {item.name}
            </Link>
          ))}
          <a
            href="#hubungi"
            className="block px-3 py-2 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md mt-2"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </nav>
  );
}