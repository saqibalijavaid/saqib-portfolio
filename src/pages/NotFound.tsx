import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-[80vh] flex items-center transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <span className="font-mono text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
          Error 404
        </span>

        <h1 className="mt-6 font-display font-normal text-6xl md:text-8xl text-gray-900 dark:text-white leading-[0.85]">
          This page <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-800 dark:from-accent-400 dark:to-accent-200">
            doesn't exist.
          </span>
        </h1>

        <p className="mt-8 font-mono text-lg text-gray-500 dark:text-gray-400">
          // The link may be broken, or the page may have moved.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-2 rounded-md font-semibold bg-accent-500 text-white hover:bg-accent-600 transition-all duration-200"
          >
            Back to Home
          </Link>
          <Link
            to="/projects"
            className="px-6 py-2 rounded-md font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
          >
            See My Work
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
