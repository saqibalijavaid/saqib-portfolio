import React from 'react';
import { useTheme } from '../../context/theme-context';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 min-w-11 min-h-11 flex items-center justify-center rounded-full cursor-pointer
        bg-gray-100 text-gray-600 hover:bg-gray-200 
        dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500
      "
      aria-label="Toggle dark mode"
    >
      {/*
        Both icons are always in the markup and swapped with CSS rather than
        with `theme`. The server cannot know a visitor's theme, so choosing the
        icon in JavaScript would mismatch on hydration — and this way the right
        one is already showing before React runs, driven by the same `dark`
        class the inline script in index.html applies before first paint.
      */}
      <Moon size={20} strokeWidth={2} className="dark:hidden" aria-hidden="true" />
      <Sun size={20} strokeWidth={2} className="hidden dark:block" aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;