import React from 'react';
import {
  ExternalLink,
  ShoppingCart,
  Globe,
  Workflow,
  Github,
} from 'lucide-react';

interface ProjectItem {
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  stack: string[];
  liveUrl: string;
  liveLabel: string;
  icon: React.ElementType;
}

const projects: ProjectItem[] = [
  {
    name: 'ZEFTON',
    tagline: 'Full-Stack E-Commerce Platform',
    description:
      'A production e-commerce platform built collaboratively with the MERN stack. End-to-end shopping experience from browsing to checkout.',
    bullets: [
      'User authentication with secure session handling',
      'Product catalog with dynamic routing and filtering',
      'Cart management and order processing flow',
      'Responsive UI with integrated REST APIs',
    ],
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Git'],
    liveUrl: 'https://zefton.vercel.app',
    liveLabel: 'Visit live site',
    icon: ShoppingCart,
  },
  {
    name: 'NOVOSOLS',
    tagline: 'Tech Startup Website',
    description:
      'A dynamic startup website featuring separate user and admin panels. The admin dashboard lets the team manage all website content without touching code.',
    bullets: [
      'Responsive Next.js frontend with SSR',
      'Express.js backend with secure data handling',
      'Fully functional admin dashboard for content management',
      'Tailwind CSS design system',
    ],
    stack: ['Next.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    liveUrl: 'https://novosols.com',
    liveLabel: 'Visit live site',
    icon: Globe,
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
          <h2 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase text-sm mb-2">
            Projects
          </h2>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Selected Work
          </h1>
          <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            Real projects shipped for real clients — full-stack apps, automation pipelines,
            and systems quietly running in the background while businesses grow.
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
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-600 text-white group-hover:scale-105 transition-transform duration-300">
                  <project.icon size={32} strokeWidth={1.5} />
                </div>
                <p className="mt-6 font-mono text-xs uppercase tracking-wider text-gray-400">
                  0{index + 1} / 0{projects.length}
                </p>
              </div>

              <div className="md:col-span-4">
                <p className="font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
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
                      <span className="text-blue-600 dark:text-blue-400 font-mono mr-3 mt-1">
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

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {project.liveLabel}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
