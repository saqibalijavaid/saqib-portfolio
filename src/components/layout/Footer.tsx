import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Code2, Check } from 'lucide-react';

const EMAIL = 'saqibalijavaid2@gmail.com';

type CopyState = 'idle' | 'copied' | 'failed';

const Footer: React.FC = () => {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  /*
   * writeText returns a promise. The previous version ignored it and fired an
   * alert() immediately, so a blocked clipboard — plain HTTP, denied
   * permissions — produced an unhandled rejection while still telling the
   * visitor the copy had worked.
   */
  const copyEmail = async () => {
    clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    resetTimer.current = setTimeout(() => setCopyState('idle'), 2500);
  };

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-accent-700 dark:text-accent-400">
              Saqib Ali Javaid<span className="text-gray-900 dark:text-white">.</span>
            </span>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Frontend engineer based in Lahore. Building mobile apps with React Native and
              web apps with React and Next.js. Open to remote roles.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wider uppercase">
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
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wider uppercase">
              Connect
            </h3>
            <div className="flex space-x-6 mt-4">
              <a
                href="https://github.com/saqibalijavaid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>

              <a
                href="https://www.linkedin.com/in/saqib-ali-javaid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>

              <a
                href="https://leetcode.com/u/saqibalijavaid/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                aria-label="LeetCode"
              >
                <Code2 className="h-6 w-6" />
              </a>

              <button
                onClick={copyEmail}
                className={`transition-colors cursor-pointer ${
                  copyState === 'copied'
                    ? 'text-accent-700 dark:text-accent-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
                aria-label={`Copy email address, ${EMAIL}`}
                title={copyState === 'copied' ? 'Copied' : 'Click to copy email'}
              >
                {copyState === 'copied' ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <Mail className="h-6 w-6" />
                )}
              </button>
            </div>

            {/*
              The icon swap above is visual only, so the outcome is announced
              here too. Always rendered, so assistive tech has the live region
              under observation before the text arrives. On failure it falls
              back to showing the address, which is the thing the visitor
              actually wanted.
            */}
            <p
              role="status"
              aria-live="polite"
              className="mt-3 h-5 text-sm text-gray-500 dark:text-gray-400"
            >
              {copyState === 'copied' && 'Email copied.'}
              {copyState === 'failed' && (
                <span>
                  Couldn&apos;t copy — <span className="font-mono">{EMAIL}</span>
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Saqib Ali Javaid.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
