import React from 'react';
import { ExternalLink, Rocket } from 'lucide-react';
import { projects } from '../../data/projects';

const FeaturedWork: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-accent-700 dark:text-accent-400 font-semibold tracking-wide uppercase">
            Featured Work
          </h2>
          <p className="mt-2 font-display font-normal text-4xl leading-tight text-gray-900 dark:text-white sm:text-5xl">
            Things I've built
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Client products built at Barq Dev, plus earlier independent work — from
            pre-launch builds to live products.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            /* Only linked cards are anchors. A pre-launch project has nowhere
               to go, and an <a> without an href is neither focusable nor
               announced as a link — better to render a plain container. */
            const Wrapper = project.liveUrl ? 'a' : 'div';
            const linkProps = project.liveUrl
              ? { href: project.liveUrl, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <Wrapper
                key={project.name}
                {...linkProps}
                className={`group flex flex-col p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700/50 rounded-2xl transition-all duration-300 ${
                  project.liveUrl ? 'hover:shadow-xl hover:-translate-y-1' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  {/* Dark glyph on amber: non-text contrast needs 3:1 and white
                      manages only 2.15:1 here. */}
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent-500 text-gray-950 group-hover:scale-110 transition-transform duration-300">
                    <project.icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  {/* The grey Pre-launch pill is only for work with nothing to
                      show at all. Anything with apps on the way says so in the
                      release line below instead, which reads as momentum rather
                      than as an absence. */}
                  {project.liveUrl ? (
                    <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors" />
                  ) : (
                    !project.pendingRelease &&
                    !project.note && (
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        Pre-launch
                      </span>
                    )
                  )}
                </div>

                <p className="font-mono text-xs uppercase tracking-wider text-accent-700 dark:text-accent-400 mb-2">
                  {project.tagline}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow mb-6">
                  {project.summary}
                </p>

                {project.pendingRelease && (
                  <p className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-700 dark:text-accent-400">
                    <Rocket className="h-3 w-3" aria-hidden="true" />
                    {project.pendingRelease}
                  </p>
                )}

                {project.note && (
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {project.note}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.featuredStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedWork;
