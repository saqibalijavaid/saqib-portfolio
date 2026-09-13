import React from 'react';
import {
  ExternalLink,
  ShoppingCart,
  Globe,
  Workflow,
  Github,
  Smartphone,
  Wrench,
  Lock,
} from 'lucide-react';

interface ProjectItem {
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  stack: string[];
  /* Absent for pre-launch client work, which has nothing public to link to. */
  liveUrl?: string;
  liveLabel?: string;
  icon: React.ElementType;
}

const projects: ProjectItem[] = [
  {
    name: 'Cross-Platform Mobile & Web Platform',
    tagline: 'Client work · pre-launch',
    description:
      'A three-surface product for a UK vehicle storage company: a customer app for iOS and Android in React Native, a companion web portal in Next.js, and an internal admin panel, all against a REST API. I led frontend across all three and built the app\'s auth layer.',
    bullets: [
      'JWT access and refresh tokens held in the device keychain',
      'Single-flight refresh so concurrent expired requests share one retry',
      'Biometric session unlock',
      'Trusted-device sign-in',
    ],
    stack: ['React Native', 'Next.js', 'TypeScript', 'Expo Router', 'TanStack Query', 'Zustand'],
    icon: Smartphone,
  },
  {
    name: 'AI Home Repair Diagnosis App',
    tagline: 'Client work · pre-launch',
    description:
      'A React Native app for iOS and Android where users photograph a household problem and get ranked candidate diagnoses with safety warnings and an in-app assistant. I was the only engineer on it — the full mobile surface plus the Supabase backend.',
    bullets: [
      'Anonymous per-device identity model enforced through row-level security instead of user accounts',
      'Reserve-and-settle quota system that rate-limits AI calls per device on hashed identifiers',
      '390 automated tests across client and backend',
    ],
    stack: ['React Native', 'Supabase', 'PostgreSQL', 'TypeScript', 'Deno Edge Functions'],
    icon: Wrench,
  },
  {
    name: 'NOVOSOLS',
    tagline: 'Next.js Web Application',
    description:
      'A production web application with separate user and admin experiences. The admin dashboard lets the team manage every piece of site content without touching code.',
    bullets: [
      'Responsive Next.js frontend with server-side rendering',
      'Tailwind CSS design system across both panels',
      'Fully functional admin dashboard for content management',
      'Express.js backend with secure data handling',
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Express.js', 'MongoDB'],
    liveUrl: 'https://novosols.com',
    liveLabel: 'Visit live site',
    icon: Globe,
  },
  {
    name: 'ZEFTON',
    tagline: 'React E-Commerce Platform',
    description:
      'A production e-commerce front end built collaboratively in React. End-to-end shopping experience from browsing to checkout.',
    bullets: [
      'Product catalog with dynamic routing and filtering',
      'Cart management and order processing flow',
      'Responsive UI wired to REST APIs',
      'User authentication with secure session handling',
    ],
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Git'],
    liveUrl: 'https://zefton.vercel.app',
    liveLabel: 'Visit live site',
    icon: ShoppingCart,
  },
  {
    name: 'AI Outreach Automation',
    tagline: 'n8n Workflow System',
    description:
      'An AI-powered automation that replaces 4+ hours of weekly manual cold outreach with a 60-second pipeline. Scrapes prospects, enriches data, and sends personalized emails.',
    bullets: [
      'Automated prospect scraping via Google Maps API',
      'Airtable as the lead database with stage tracking',
      'AI data enrichment for personalization',
      'Brevo integration for personalized email delivery',
    ],
    stack: ['n8n', 'Airtable', 'Google Maps API', 'Brevo', 'AI Enrichment'],
    liveUrl:
      'https://www.fiverr.com/saqibalijavaid/make-ai-bot-automating-your-work-of-any-type',
    liveLabel: 'See client feedback',
    icon: Workflow,
  },
];

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
            Mobile and web work for real clients — React Native apps for iOS and Android,
            Next.js applications, and the automation behind them.
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
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-accent-500 text-white group-hover:scale-105 transition-transform duration-300">
                  <project.icon size={32} strokeWidth={1.5} />
                </div>
                <p className="mt-6 font-mono text-xs uppercase tracking-wider text-gray-400">
                  0{index + 1} / 0{projects.length}
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
