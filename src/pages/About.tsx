import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Zap, Target, Users, GraduationCap, Award, Link2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const certifications = [
  { name: 'Programming for Everybody (Getting Started with Python)', org: 'University of Michigan — Coursera' },
  { name: 'AI For Everyone', org: 'DeepLearning.AI — Coursera' },
  { name: 'Crafting Code with GitHub', org: 'Bit by Git workshop, by GDSC' },
  { name: 'Introduction to Subagents', org: 'Certificate of Completion' },
];

const LinkedInBadge: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous badge content
    containerRef.current.innerHTML = '';

    // Create the badge element
    const badgeDiv = document.createElement('div');
    badgeDiv.className = 'badge-base LI-profile-badge';
    badgeDiv.setAttribute('data-locale', 'en_US');
    badgeDiv.setAttribute('data-size', 'large');
    badgeDiv.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    badgeDiv.setAttribute('data-type', 'VERTICAL');
    badgeDiv.setAttribute('data-vanity', 'saqib-ali-javaid');
    badgeDiv.setAttribute('data-version', 'v1');

    const link = document.createElement('a');
    link.className = 'badge-base__link LI-simple-link';
    link.href = 'https://pk.linkedin.com/in/saqib-ali-javaid?trk=profile-badge';
    link.textContent = 'Saqib Ali Javaid';
    badgeDiv.appendChild(link);

    containerRef.current.appendChild(badgeDiv);

    // Load (or re-run) the LinkedIn badge script
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;
    script.defer = true;
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [theme]);

  return <div ref={containerRef} />;
};

const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* 1. HERO */}
      <div className="relative pt-20 pb-20 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase mb-4 block">
            About Me
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 leading-tight max-w-5xl mx-auto">
            Building in public — <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              the wins, fails &amp; everything between.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            I'm Saqib — a full-stack developer and automation engineer based in Lahore, Pakistan.
            I help coaches, consultants, small businesses, and startups build systems that generate
            leads, save time, and grow revenue.
          </p>
        </div>
      </div>

      {/* 2. VALUES / WHAT I CARE ABOUT */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Zap className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ship fast</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'd rather deploy a working prototype this week than a perfect one next quarter.
                Real feedback beats theoretical polish.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Target className="text-purple-600 dark:text-purple-400 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Build to last</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Clean, scalable code. No spaghetti, no shortcuts that future-me will hate. Every
                project I ship is maintainable the day it's handed off.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Users className="text-green-600 dark:text-green-400 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Solve real problems</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Code is a means, not an end. I focus on the outcome — less manual work, more leads,
                more revenue — and let the stack serve that.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BY THE NUMBERS */}
      <div className="py-24 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">2+</div>
              <div className="text-sm font-mono text-gray-500 uppercase tracking-wider">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">20+</div>
              <div className="text-sm font-mono text-gray-500 uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">5★</div>
              <div className="text-sm font-mono text-gray-500 uppercase tracking-wider">Avg Client Rating</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">MERN</div>
              <div className="text-sm font-mono text-gray-500 uppercase tracking-wider">Primary Stack</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. EDUCATION + CERTIFICATIONS */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-blue-600 dark:text-blue-400 w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <p className="font-bold text-gray-900 dark:text-white">BS Computer Science</p>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                Punjab University College of Information and Technology (PUCIT)
              </p>
              <p className="text-gray-500 dark:text-gray-400 font-mono text-sm mt-2">
                Dec 2022 — May 2026
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Award className="text-purple-600 dark:text-purple-400 w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certifications</h2>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">{cert.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-1">
                    {cert.org}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5. LINKEDIN BADGE */}
      <div className="py-24 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Link2 className="text-blue-600 dark:text-blue-400 w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Connect with Me</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
              Let's connect on LinkedIn — I share updates on projects, automation tips, and what I'm building.
            </p>
            <LinkedInBadge />
            <a
              href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=saqib-ali-javaid"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex justify-center items-center px-6 py-2 rounded-full bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors duration-200"
            >
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* 6. BOTTOM CTA */}
      <div className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Let's work together.</h2>
            <p className="text-gray-400 text-lg mb-8">
              Need a web app built right the first time, or a manual process you'd rather automate?
              I'd love to hear what you're working on.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button label="Get in Touch" variant="primary" />
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="p-8 border border-gray-700 rounded-2xl bg-gray-800/50 backdrop-blur-sm max-w-sm">
              <p className="font-mono text-green-400 text-sm mb-4">saqib@portfolio:~$ status</p>
              <div className="space-y-2 text-gray-300 font-mono text-sm">
                <p>✓ Location: <span className="text-blue-400">Lahore, PK</span></p>
                <p>✓ Availability: <span className="text-green-400">Open to work</span></p>
                <p>✓ Currently: <span className="animate-pulse text-blue-400">Shipping at Barq Dev</span></p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-xs text-gray-500">Let's build something worth shipping.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
