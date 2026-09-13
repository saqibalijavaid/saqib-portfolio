import React from 'react';
import {
  Code,
  Cloud,
  Database,
  Workflow,
  Layers,
  Terminal,
  Command,
  FileCode,
  Server,
  Braces,
  GitBranch,
  Mail,
  Smartphone,
} from 'lucide-react';

/*
 * Ordered by what the work actually leads with. Mobile and web sit first,
 * backend and automation follow as supporting capability.
 *
 * React Native was missing from this list even though the Barq Dev entry in the
 * experience section already describes building mobile apps with it — adding it
 * is correcting an omission, not making a new claim.
 */
const techStack = [
  // Mobile
  { name: 'React Native', icon: Smartphone, type: 'Mobile' },

  // Frontend
  { name: 'React', icon: Layers, type: 'Web' },
  { name: 'Next.js', icon: Terminal, type: 'Web' },
  { name: 'TypeScript', icon: Code, type: 'Web' },
  { name: 'Tailwind CSS', icon: Layers, type: 'Web' },
  { name: 'JavaScript', icon: Braces, type: 'Web' },

  // Backend
  { name: 'Node.js', icon: Server, type: 'Backend' },
  { name: 'Express.js', icon: Server, type: 'Backend' },
  { name: 'FastAPI', icon: Server, type: 'Backend' },
  { name: 'Flask', icon: Server, type: 'Backend' },
  { name: 'Django', icon: Server, type: 'Backend' },

  // Languages
  { name: 'Python', icon: FileCode, type: 'Lang' },
  { name: 'Kotlin', icon: Code, type: 'Lang' },

  // Data & DevOps
  { name: 'MongoDB', icon: Database, type: 'Data' },
  { name: 'MySQL', icon: Database, type: 'Data' },
  { name: 'Docker', icon: Command, type: 'Infra' },
  { name: 'Linux', icon: Cloud, type: 'Infra' },
  { name: 'Git', icon: GitBranch, type: 'Infra' },

  // Automation
  { name: 'n8n', icon: Workflow, type: 'Auto' },
  { name: 'Selenium', icon: Workflow, type: 'Auto' },
  { name: 'Airtable', icon: Workflow, type: 'Auto' },
  { name: 'Brevo', icon: Mail, type: 'Auto' },
];

const Technologies: React.FC = () => {
  return (
    <section className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden border-y border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="absolute inset-0 z-0 opacity-[0.1] dark:opacity-[0.1] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px),
                               linear-gradient(to bottom, #808080 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-base font-semibold text-accent-700 dark:text-accent-400 tracking-wide uppercase">
          Tech Stack
        </h2>
        <p className="mt-2 font-display font-normal text-4xl text-gray-900 dark:text-white sm:text-5xl">
          Tools I work with daily
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto font-mono text-sm">
          // Frontend first — React Native, React and Next.js, with the backend and automation
          // tooling to ship end to end.
        </p>
      </div>

      <div className="relative flex flex-col gap-8">
        <div className="flex overflow-hidden group">
          <div className="flex animate-infinite-scroll group-hover:paused gap-8 px-4">
            {[...techStack, ...techStack].map((tech, index) => (
              <TechBadge key={`${tech.name}-${index}`} tech={tech} />
            ))}
          </div>
        </div>

        <div className="flex overflow-hidden group">
          <div
            className="flex animate-infinite-scroll group-hover:paused gap-8 px-4"
            style={{ animationDirection: 'reverse' }}
          >
            {[...techStack]
              .reverse()
              .concat([...techStack].reverse())
              .map((tech, index) => (
                <TechBadge key={`rev-${tech.name}-${index}`} tech={tech} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TechBadge: React.FC<{ tech: (typeof techStack)[0] }> = ({ tech }) => (
  <div
    className="
    flex items-center space-x-2
    px-6 py-3 rounded-full
    whitespace-nowrap cursor-default transition-all duration-300
    bg-white
    border border-gray-200
    shadow-[0_2px_8px_rgba(0,0,0,0.04)]
    hover:border-accent-500
    hover:shadow-accent-100
    dark:bg-gray-800
    dark:border-gray-700
    dark:hover:border-accent-400
    dark:shadow-none
  "
  >
    <tech.icon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 font-mono">
      {tech.name}
    </span>
  </div>
);

export default Technologies;
