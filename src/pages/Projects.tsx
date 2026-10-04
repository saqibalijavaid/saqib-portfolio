import React from 'react';
import { ExternalLink, Github, Lock } from 'lucide-react';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-accent-700 dark:text-accent-400 font-semibold tracking-wide uppercase text-sm mb-2">
            Projects
          </h2>
          <h1 className="font-display font-normal text-5xl text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
            Selected Work
          </h1>
          <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            Client products built at Barq Dev, plus earlier independent work — React Native
            apps for iOS and Android, Next.js applications, and the automation behind them.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="https://github.com/saqibalijavaid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              More on GitHub
            </a>
          </div>
        </div>

        {/* Project List — stacked cards */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="group grid md:grid-cols-5 gap-8 p-8 md:p-10 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="md:col-span-1">
                {/* Dark glyph on amber: non-text contrast needs 3:1 and white
                    manages only 2.15:1 here. */}
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-accent-500 text-gray-950 group-hover:scale-105 transition-transform duration-300">
                  <project.icon size={32} strokeWidth={1.5} />
                </div>
                <p className="mt-6 font-mono text-xs uppercase tracking-wider text-gray-400">
                  {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </p>
              </div>

              <div className="md:col-span-4">
                <p className="font-mono text-xs uppercase tracking-wider text-accent-700 dark:text-accent-400 mb-2">
                  {project.tagline}
                </p>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {project.name}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {project.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start text-gray-600 dark:text-gray-400"
                    >
                      <span className="text-accent-700 dark:text-accent-400 font-mono mr-3 mt-1">
                        →
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-accent-700 dark:text-accent-400 hover:underline"
                  >
                    {project.liveLabel}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  /* Nothing to link to yet — say so plainly rather than
                     rendering a dead link or an empty gap. */
                  <span className="inline-flex items-center gap-2 font-mono text-sm text-gray-500 dark:text-gray-400">
                    <Lock className="w-4 h-4" />
                    Not yet public
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
