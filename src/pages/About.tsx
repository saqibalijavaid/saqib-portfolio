import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import {
  Zap,
  Target,
  Users,
  GraduationCap,
  Award,
  Link2,
  ExternalLink,
  Linkedin,
} from 'lucide-react';

const certifications = [
  {
    name: 'Claude Code in Action',
    org: 'Anthropic',
    verifyUrl: 'https://verify.skilljar.com/c/34ctspw2fo37',
  },
  {
    name: 'Introduction to Subagents',
    org: 'Anthropic',
    verifyUrl: 'https://verify.skilljar.com/c/3ishmgbfifkw',
  },
];

/*
 * Replaces LinkedIn's embedded profile badge.
 *
 * That badge injected platform.linkedin.com/badges/js/profile.js on every
 * visit to this page — the slowest thing on the site — and LinkedIn has put an
 * end date on it, so it had started rendering a red "this feature will no
 * longer be available" notice to every visitor. On a portfolio that reads as
 * something broken.
 *
 * Built from assets already on the page instead: same information, no
 * third-party request, no expiry, and it finally looks like the rest of the
 * site rather than a square of LinkedIn chrome dropped into it. The headline
 * is static, which is the one real trade — it changes about as often as the
 * rest of this page does.
 */
const ProfileCard: React.FC = () => (
  <div className="w-full max-w-sm rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 text-center shadow-sm">
    {/* Decorative: the name is spelled out directly beneath it. */}
    <img
      src="/saqib.webp"
      alt=""
      width={112}
      height={112}
      loading="lazy"
      decoding="async"
      className="mx-auto h-28 w-28 rounded-full object-cover object-top ring-2 ring-accent-500/40"
    />

    <p className="mt-5 font-display font-normal text-3xl text-gray-900 dark:text-white">
      Saqib Ali Javaid
    </p>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
      Frontend Engineer @ Barq Dev
    </p>
    <p className="mt-1 font-mono text-xs text-gray-500 dark:text-gray-400">
      React Native · React · Next.js
    </p>
    <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
      Lahore, Pakistan
    </p>

    <a
      href="https://www.linkedin.com/in/saqib-ali-javaid"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#004182] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
    >
      <Linkedin className="h-4 w-4" aria-hidden="true" />
      View LinkedIn profile
    </a>
  </div>
);

const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* 1. HERO */}
      <div className="relative pt-20 pb-20 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-accent-700 dark:text-accent-400 font-semibold tracking-wider uppercase mb-4 block">
            About Me
          </span>
          <h1 className="font-display font-normal text-5xl md:text-7xl text-gray-900 dark:text-white mb-8 leading-[0.95] max-w-5xl mx-auto">
            I build the parts <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-800 dark:from-accent-400 dark:to-accent-200">
              people actually touch.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            I'm Saqib — a frontend engineer based in Lahore, Pakistan. I build mobile
            applications with React Native and web applications with React and Next.js, and I'm
            open to remote frontend roles.
          </p>
        </div>
      </div>

      {/* 2. VALUES / WHAT I CARE ABOUT */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                <Zap className="text-accent-700 dark:text-accent-400 w-6 h-6" />
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
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">1.5+</div>
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
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">React</div>
              <div className="text-sm font-mono text-gray-500 uppercase tracking-wider">Primary Stack</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. EDUCATION + CERTIFICATIONS */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          {/* Both columns are flex so the single Education card can grow to the
              height the taller Certifications list sets, instead of stopping
              short and leaving the row visibly lopsided. */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-accent-700 dark:text-accent-400 w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
            </div>
            <div className="flex-grow bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <p className="font-bold text-gray-900 dark:text-white">BS Computer Science</p>
              <p className="text-accent-700 dark:text-accent-400 font-semibold mt-1">
                Punjab University College of Information and Technology (PUCIT)
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Lahore, Pakistan</p>
              <p className="text-gray-500 dark:text-gray-400 font-mono text-sm mt-2">
                Dec 2022 — May 2026
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Award className="text-purple-600 dark:text-purple-400 w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certifications</h2>
            </div>
            <ul className="flex-grow space-y-3">
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white">{cert.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-1">
                      {cert.org}
                    </p>
                  </div>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 dark:text-accent-400 hover:underline"
                  >
                    {/* Names the credential, so a screen reader hearing the
                        links out of context does not get two identical
                        "Verify" announcements. */}
                    Verify
                    <span className="sr-only"> {cert.name} certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
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
              <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                <Link2 className="text-accent-700 dark:text-accent-400 w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Connect with Me</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
              Let's connect on LinkedIn — I share updates on projects, automation tips, and what I'm building.
            </p>
            <ProfileCard />

            {/* Follow is a different action from viewing the profile, so it
                stays — as a quiet text link rather than a second blue pill
                competing with the card's own button. */}
            <a
              href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=saqib-ali-javaid"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline underline-offset-4 transition-colors"
            >
              Or follow without connecting
            </a>
          </div>
        </div>
      </div>

      {/* 6. BOTTOM CTA */}
      <div className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl opacity-20"></div>

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
                <p>✓ Location: <span className="text-accent-400">Lahore, PK</span></p>
                <p>✓ Availability: <span className="text-green-400">Open to work</span></p>
                <p>✓ Currently: <span className="animate-pulse text-accent-400">Shipping at Barq Dev</span></p>
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
