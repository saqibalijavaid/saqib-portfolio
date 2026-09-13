import React from 'react';
import { ExternalLink, ShoppingCart, Globe, Workflow, Smartphone, Wrench } from 'lucide-react';

interface ProjectItem {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  /* Absent for pre-launch client work, which has nothing public to link to. */
  liveUrl?: string;
  icon: React.ElementType;
}

const projects: ProjectItem[] = [
  {
    name: 'Cross-Platform Mobile & Web Platform',
    tagline: 'Client work · pre-launch',
    description:
      'A three-surface product for a UK vehicle storage company — a React Native customer app for iOS and Android, a Next.js web portal, and an internal admin panel, all against a REST API. Led frontend across all three, including the app\'s auth layer.',
    stack: ['React Native', 'Next.js', 'TypeScript', 'Expo Router'],
    icon: Smartphone,
  },
  {
    name: 'AI Home Repair Diagnosis App',
    tagline: 'Client work · pre-launch',
    description:
      'A React Native app where users photograph a household problem and get ranked candidate diagnoses with safety warnings and an in-app assistant. Sole engineer across the mobile surface and the Supabase backend.',
    stack: ['React Native', 'Supabase', 'PostgreSQL', 'TypeScript'],
    icon: Wrench,
  },
  {
    name: 'NOVOSOLS',
    tagline: 'Next.js Web Application',
    description:
      'Responsive Next.js frontend with server-side rendering and a Tailwind design system, plus a full admin dashboard letting the team manage every piece of site content without touching code.',
    stack: ['Next.js', 'React', 'Tailwind', 'Express'],
    liveUrl: 'https://novosols.com',
    icon: Globe,
  },
  {
    name: 'ZEFTON',
    tagline: 'React E-Commerce Platform',
    description:
      'Production e-commerce front end built in React — product catalog with dynamic routing and filtering, cart and checkout flow, and a responsive UI wired to REST APIs.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: 'https://zefton.vercel.app',
    icon: ShoppingCart,
  },
  {
    name: 'AI Outreach Automation',
    tagline: 'n8n Workflow System',
    description:
      'Automated prospect scraping and personalized outreach. Integrates Google Maps API for lead collection, Airtable for storage, AI enrichment, and Brevo for email delivery.',
    stack: ['n8n', 'Airtable', 'Google Maps API', 'Brevo'],
    liveUrl:
      'https://www.fiverr.com/saqibalijavaid/make-ai-bot-automating-your-work-of-any-type',
    icon: Workflow,
  },
];

const Features: React.FC = () => {
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
            Mobile and web work for real clients, from pre-launch builds to live products.
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
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <project.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                {project.liveUrl ? (
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors" />
                ) : (
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    Pre-launch
                  </span>
                )}
              </div>

              <p className="font-mono text-xs uppercase tracking-wider text-accent-700 dark:text-accent-400 mb-2">
                {project.tagline}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {project.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
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

export default Features;
