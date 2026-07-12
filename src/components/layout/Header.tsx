import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Saqib<span className="text-gray-900 dark:text-white">.</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
            >
              About
            </Link>
            <Link
              to="/projects"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
