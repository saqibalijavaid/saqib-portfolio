import React from 'react';
import { Menu, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleMenu }) => {
  return (
    // UPDATED: Added z-[100] and ensure border is visible
    <aside className="fixed top-0 left-0 h-screen w-16 md:w-20 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 z-[100] flex flex-col items-center py-8">
      {/* 1. Toggle Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200 cursor-pointer"
        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
      >
        {/* If icons are missing, this text fallback will show */}
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* 2. Vertical Text Branding */}
      <div className="flex-grow flex items-center justify-center">
        <h1
          className="text-2xl font-bold text-gray-400 tracking-widest uppercase select-none"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          }}
        >
          Saqib Ali Javaid
        </h1>
      </div>

      {/* 3. Bottom Decorative Element */}
      <div className="mb-4">
        <div className="w-2 h-12 bg-blue-600 rounded-full"></div>
      </div>
    </aside>
  );
};

export default Sidebar;
