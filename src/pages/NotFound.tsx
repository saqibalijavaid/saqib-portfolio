import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-[80vh] flex items-center transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <span className="font-mono text-sm font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase">
          Error 404
        </span>

        <h1 className="mt-6 text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tighter leading-[0.9]">
          This page <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            doesn't exist.
          </span>
        </h1>

        <p className="mt-8 font-mono text-lg text-gray-500 dark:text-gray-400">
          // The link may be broken, or the page may have moved.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
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
