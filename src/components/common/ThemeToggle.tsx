import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 rounded-full cursor-pointer
        bg-gray-100 text-gray-600 hover:bg-gray-200 
        dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
      "
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        // In Light Mode, show Moon (to switch to Dark)
        <Moon size={20} strokeWidth={2} />
      ) : (
        // In Dark Mode, show Sun (to switch to Light)
        <Sun size={20} strokeWidth={2} />
      )}
    </button>
  );
};

export default ThemeToggle;