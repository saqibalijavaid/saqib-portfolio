import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { Terminal } from 'lucide-react';
import HeroPattern from './HeroPattern';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 pt-10 pb-20 transition-colors duration-300">
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-accent-50 dark:bg-accent-900/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <HeroPattern />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center z-10">
        {/*
          Two columns from lg up, stacked below. The photo follows the text in
          DOM order on purpose: on a phone the headline is the message and the
          portrait is support, so pushing the headline below the fold to lead
          with a face would trade the point for the decoration.
        */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full py-12">
          <div className="lg:col-span-7">
            <div className="flex items-center space-x-2 mb-8 animate-fade-in-up">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Terminal className="text-gray-600 dark:text-gray-300 w-6 h-6" />
              </div>
              <span className="font-mono text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                Saqib Ali Javaid
              </span>
            </div>

            {/*
              A step smaller than the previous single-column scale — 128px type
              cannot share a row with an image without one of them overflowing.
            */}
            <h1 className="font-display font-normal text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-gray-900 dark:text-white leading-[0.85] mb-8">
              Frontend <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-800 dark:from-accent-400 dark:to-accent-200">
                Engineer.
              </span>
            </h1>

            <div className="max-w-2xl mb-10">
              <p className="font-mono text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
                // Frontend engineer building mobile and web apps with React Native, React
                and Next.js. Open to remote roles.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/projects">
                <Button label="View Projects" variant="primary" />
              </Link>
              <Link to="/contact">
                <Button label="Get in Touch" variant="secondary" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto w-64 sm:w-80 lg:w-full max-w-sm">
              {/* Echoes the ambient blobs already in this section, so the studio
                  grey backdrop reads as framed rather than pasted on. */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent-500/20 via-accent-400/20 to-transparent blur-2xl"
              />
              <img
                src="/saqib.webp"
                alt="Saqib Ali Javaid"
                width={900}
                height={1352}
                /*
                 * Eager and high priority, unlike every other image on the site.
                 * This is above the fold and almost certainly the Largest
                 * Contentful Paint element, so lazy-loading it would delay the
                 * exact metric Google measures.
                 */
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="relative w-full rounded-2xl object-cover shadow-2xl ring-1 ring-gray-900/5 dark:ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
