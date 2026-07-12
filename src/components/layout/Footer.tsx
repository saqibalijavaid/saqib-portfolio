import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Saqib Ali Javaid<span className="text-gray-900 dark:text-white">.</span>
            </span>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Full-stack software engineer and automation specialist based in Lahore. Building
              MERN apps and AI-powered workflows that save hours of manual work.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Navigate
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Connect
            </h3>
            <div className="flex space-x-6 mt-4">
              <a
                href="https://github.com/saqibalijavaid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>

              <a
                href="https://www.linkedin.com/in/saqib-ali-javaid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>

              <a
                href="https://leetcode.com/u/saqibalijavaid/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="LeetCode"
              >
                <Code2 className="h-6 w-6" />
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText('saqibalijavaid2@gmail.com');
                  alert('Email copied to clipboard!');
                }}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors cursor-pointer"
                aria-label="Copy email address"
                title="Click to copy email"
              >
                <Mail className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Saqib Ali Javaid.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
