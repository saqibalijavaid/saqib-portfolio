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
    role: 'Software Engineer',
    company: 'Barq Dev',
    period: 'Mar 2026 — Present',
    location: 'Lahore',
    description:
      'Build mobile applications with React Native and web applications with React and Next.js. Collaborate with cross-functional teams to design, implement, and optimize software solutions using agile methodologies.',
  },
  {
    role: 'Associate Software Engineer',
    company: 'Mavericks United',
    period: 'May 2025 — Feb 2026',
    location: 'Lahore',
    description:
      'Shipped full-stack applications with React, Flask, FastAPI, and SQL. Automated business development workflows with Selenium and cron jobs, significantly reducing manual effort.',
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

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
            Experience
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Where I've worked
          </p>
        </div>

        <ol className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-4">
          {experience.map((item, index) => (
            <li key={index} className="mb-12 ml-8 last:mb-0">
              <span className="absolute -left-[17px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 ring-8 ring-gray-50 dark:ring-gray-800">
                <Briefcase className="w-4 h-4 text-white" />
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
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
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

export default Testimonials;
