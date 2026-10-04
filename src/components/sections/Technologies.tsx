import React from 'react';
import {
  Boxes,
  Braces,
  Code,
  Container,
  Database,
  FlaskConical,
  GitBranch,
  Layers,
  Palette,
  PenTool,
  RefreshCw,
  Route,
  Server,
  Smartphone,
  Terminal,
  Workflow,
} from 'lucide-react';

interface Tech {
  name: string;
  icon: React.ElementType;
}

/*
 * Grouped rather than one flat list, and every entry is backed by a project or
 * an experience entry elsewhere on the site. Django, Kotlin, MySQL, Docker and
 * Linux were removed because they appeared nowhere else — a stack badge with
 * nothing behind it is a question you cannot answer. Python, Flask, FastAPI and
 * Selenium are real but live in the Mavericks United entry; three backend
 * badges here made a frontend engineer read as a generalist.
 *
 * The additions came from /projects, which already described Supabase, Expo
 * Router, PostgreSQL, TanStack Query and Zustand in detail while this section —
 * whose whole job is to list the stack — omitted them.
 */
const groups: { label: string; items: Tech[] }[] = [
  {
    label: 'Mobile',
    items: [
      { name: 'React Native', icon: Smartphone },
      { name: 'Expo Router', icon: Route },
      { name: 'React Navigation', icon: Route },
    ],
  },
  {
    label: 'Web',
    items: [
      { name: 'React', icon: Layers },
      { name: 'Next.js', icon: Terminal },
      { name: 'TypeScript', icon: Code },
      { name: 'JavaScript', icon: Braces },
      { name: 'Tailwind CSS', icon: Palette },
      { name: 'TanStack Query', icon: RefreshCw },
      { name: 'Zustand', icon: Boxes },
    ],
  },
  {
    label: 'Backend & data',
    items: [
      { name: 'Node.js', icon: Server },
      { name: 'Express.js', icon: Server },
      { name: 'Supabase', icon: Database },
      { name: 'PostgreSQL', icon: Database },
      { name: 'Prisma', icon: Database },
      { name: 'MongoDB', icon: Database },
    ],
  },
  {
    label: 'Testing & tooling',
    items: [
      { name: 'Vitest', icon: FlaskConical },
      { name: 'Playwright', icon: FlaskConical },
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub Actions', icon: GitBranch },
      { name: 'Docker', icon: Container },
      { name: 'Figma', icon: PenTool },
    ],
  },
  {
    label: 'Automation',
    items: [{ name: 'n8n', icon: Workflow }],
  },
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <h2 className="text-base font-semibold text-accent-700 dark:text-accent-400 tracking-wide uppercase">
          Tech Stack
        </h2>
        <p className="mt-2 font-display font-normal text-4xl text-gray-900 dark:text-white sm:text-5xl">
          Tools I work with daily
        </p>
        <p className="mt-4 max-w-2xl text-gray-500 dark:text-gray-400 mx-auto font-mono text-sm">
          // Frontend first — React Native, React and Next.js, with the backend tooling to
          ship end to end.
        </p>
      </div>

      {/*
        A static grid rather than the marquee this used to be. The rows scrolled
        continuously, so which badges a visitor saw was luck — one frame showed
        nine backend and infra badges and no frontend ones at all, directly under
        a heading claiming frontend. It also moved indefinitely with no way to
        stop it, which the badges being non-focusable made impossible to fix
        properly with hover alone.
      */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {groups.map((group) => (
          <div
            key={group.label}
            className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-8 sm:items-baseline"
          >
            <h3 className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 sm:mb-0 sm:text-right">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {group.items.map((tech) => (
                <li key={tech.name}>
                  <TechBadge tech={tech} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

const TechBadge: React.FC<{ tech: Tech }> = ({ tech }) => (
  <div
    className="
    flex items-center space-x-2
    px-5 py-2.5 rounded-full
    whitespace-nowrap transition-colors duration-200
    bg-white
    border border-gray-200
    shadow-[0_2px_8px_rgba(0,0,0,0.04)]
    hover:border-accent-500
    dark:bg-gray-800
    dark:border-gray-700
    dark:hover:border-accent-400
    dark:shadow-none
  "
  >
    <tech.icon className="w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 font-mono">
      {tech.name}
    </span>
  </div>
);

export default Technologies;
