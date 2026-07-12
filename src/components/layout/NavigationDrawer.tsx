import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Helper to generate classes based on active state
  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;

    // Base classes for typography and layout
    const baseClasses = 'block py-3 transition-all duration-300 font-bold text-2xl md:text-5xl';

    if (isActive) {
      // ACTIVE STATE: Blue text + Left Border Indicator + Indentation
      return `${baseClasses} text-blue-600 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400 pl-6`;
    } else {
      // INACTIVE STATE: Gray text + No Border + Standard Padding
      return `${baseClasses} text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white border-l-4 border-transparent pl-0 hover:pl-2`;
    }
  };

  return (
    <>
      {/* 1. Backdrop */}
      <div
        className={`fixed inset-0 left-16 md:left-20 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* 2. Sliding Panel */}
      <div
        className={`fixed top-0 left-16 md:left-20 h-full w-full max-w-md bg-white dark:bg-gray-900 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-gray-100 dark:border-gray-800 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* UPDATE: Changed 'overflow-y-auto' to 'overflow-hidden' to remove scrollbar */}
        <div className="p-8 md:p-12 h-full flex flex-col overflow-hidden">
          {/* Header inside Drawer */}
          <div className="flex justify-end mb-8">
            <ThemeToggle />
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow flex flex-col justify-center space-y-4">
            <Link to="/" onClick={onClose} className={getLinkClass('/')}>
              Home
            </Link>
            <Link to="/about" onClick={onClose} className={getLinkClass('/about')}>
              About
            </Link>
            <Link to="/projects" onClick={onClose} className={getLinkClass('/projects')}>
              Projects
            </Link>
            <Link to="/contact" onClick={onClose} className={getLinkClass('/contact')}>
              Contact
            </Link>
          </nav>

          {/* Footer Info */}
          <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800">
            <Link
              to="/contact"
              onClick={onClose}
              className="flex items-center text-blue-600 dark:text-blue-400 font-semibold cursor-pointer group"
            >
              <span>Let's work together</span>
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-4 text-gray-400 text-sm">&copy; {new Date().getFullYear()} Saqib Ali Javaid</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationDrawer;
