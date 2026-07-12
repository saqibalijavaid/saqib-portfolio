import React from 'react';
import { ExternalLink, ShoppingCart, Globe, Workflow } from 'lucide-react';

interface ProjectItem {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  liveUrl: string;
  icon: React.ElementType;
}

const projects: ProjectItem[] = [
  {
    name: 'ZEFTON',
    tagline: 'E-Commerce Platform',
    description:
      'Full-stack MERN e-commerce platform with user authentication, product listings, cart management, and order handling. Dynamic routing and responsive UI.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    liveUrl: 'https://zefton.vercel.app',
    icon: ShoppingCart,
  },
  {
    name: 'NOVOSOLS',
    tagline: 'Tech Startup Website',
    description:
      'Dynamic startup site with separate user and admin panels. Responsive Next.js frontend + Express backend and a fully functional admin dashboard to manage content.',
    stack: ['Next.js', 'Express', 'MongoDB', 'Tailwind'],
    liveUrl: 'https://novosols.com',
    icon: Globe,
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
          <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
            Featured Work
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Things I've built
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Shipped projects — live, in production, solving real problems for real users.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700/50 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-600 text-white group-hover:scale-110 transition-transform duration-300">
                  <project.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </div>

              <p className="font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
