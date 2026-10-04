import React from 'react';
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
}

const experience: ExperienceItem[] = [
  {
    role: 'Software Engineer (React & React Native)',
    company: 'Barq Dev',
    period: 'Mar 2026 — Present',
    location: 'Lahore',
    description:
      'Own frontend delivery hands-on across three client products while directing the engineering team — setting technical direction, coordinating backend and QA, and running client requirement meetings, solo when needed.',
  },
  {
    role: 'Associate Software Engineer',
    company: 'Mavericks United',
    period: 'May 2025 — Feb 2026',
    location: 'Lahore',
    description:
      "Built the React frontend for an internal recruitment platform used by four role tiers — team member, team lead, admin and super admin — with nested permission scoping so each tier saw only its own reporting line's data. Maintained Python and Selenium scrapers across 25+ job boards feeding a daily pipeline, replacing over 15 hours of manual work a week.",
  },
  {
    role: 'Freelance Software Engineer',
    company: 'Fiverr',
    period: 'Dec 2023 — Present',
    location: 'Remote',
    description:
      'Ongoing. Delivering full-stack web and mobile apps for international clients, plus n8n automation workflows that replace hours of manual outreach with 60-second AI-powered pipelines. 5★ average rating.',
  },
  {
    role: 'Web Developer Intern',
    company: 'KeepCoders',
    period: 'Mar 2025 — Apr 2025',
    location: 'Lahore',
    description:
      'Learned web development fundamentals with HTML, CSS, and JavaScript. Built frontend components and explored React basics while contributing to small team projects.',
  },
];

const Experience: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-accent-700 dark:text-accent-400 font-semibold tracking-wide uppercase">
            Experience
          </h2>
          <p className="mt-2 font-display font-normal text-4xl leading-tight text-gray-900 dark:text-white sm:text-5xl">
            Where I've worked
          </p>
        </div>

        <ol className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-4">
          {experience.map((item, index) => (
            <li key={index} className="mb-12 ml-8 last:mb-0">
              <span className="absolute -left-[17px] flex items-center justify-center w-8 h-8 rounded-full bg-accent-500 ring-8 ring-gray-50 dark:ring-gray-800">
                {/* Dark glyph on amber — white is 2.15:1 against the dot. */}
                <Briefcase className="w-4 h-4 text-gray-950" />
              </span>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.role}
                  </h3>
                  <span className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {item.period}
                  </span>
                </div>
                <p className="text-accent-700 dark:text-accent-400 font-semibold mb-3">
                  {item.company} · <span className="text-gray-500 dark:text-gray-400 font-normal">{item.location}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
