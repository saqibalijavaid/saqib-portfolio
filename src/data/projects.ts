import {
  Gem,
  Globe,
  ShoppingCart,
  Smartphone,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/*
 * Single source of truth for both project surfaces.
 *
 * The homepage grid and /projects previously held separate copies of this list,
 * which had already drifted — the stacks disagreed, and only one of the two
 * declared a `liveLabel`. They read different fields off the same record now:
 * `summary` + `featuredStack` on the homepage, `description` + `bullets` +
 * `stack` on the detail page.
 *
 * `liveUrl` and `liveLabel` stay optional. A project without them renders a
 * "Not yet public" marker on /projects and a non-anchor card with a Pre-launch
 * pill on the homepage — an <a> with no href is neither focusable nor announced
 * as a link, so it cannot stay an anchor. Adding the two fields is all it takes
 * to switch both surfaces to the linked treatment.
 */
export interface Project {
  name: string;
  tagline: string;
  /** Short form, homepage card. */
  summary: string;
  /** Long form, /projects. */
  description: string;
  bullets: string[];
  /** Full stack, /projects. */
  stack: string[];
  /** Trimmed stack, homepage card, where space is tighter. */
  featuredStack: string[];
  liveUrl?: string;
  liveLabel?: string;
  icon: LucideIcon;
}

export const projects: Project[] = [
  {
    name: 'Garage Queens',
    tagline: 'Client work · iOS, Android & web',
    summary:
      'A three-surface platform for a UK premium car storage company — a 64-route React Native app for iOS and Android, a companion Next.js web portal, and a staff admin panel. Led frontend across all three and built the auth layer.',
    description:
      'A three-surface management platform for a UK premium car storage company, built against a Django API. I led frontend across all three surfaces: a 64-route React Native customer app for iOS and Android at roughly 38k lines and 154 components, a companion Next.js web portal, and a staff admin panel.',
    bullets: [
      'JWT access and refresh tokens held in the device Keychain and Keystore',
      'Single-flight refresh interceptor, so concurrent 401s share one refresh rather than stampeding',
      'Biometric session unlock and trusted-device sign-in',
      'Web portal scoped deliberately narrower than the app, to drive mobile adoption',
    ],
    stack: ['React Native', 'Next.js', 'TypeScript', 'Expo Router', 'TanStack Query', 'Zustand'],
    featuredStack: ['React Native', 'Next.js', 'TypeScript', 'Expo Router'],
    icon: Smartphone,
  },
  {
    name: 'HomeFlash',
    tagline: 'Client work · iOS & Android',
    summary:
      'A React Native app where users photograph a household problem and get confidence-ranked diagnoses with safety warnings and an in-app assistant. Sole engineer across the mobile surface and the Supabase backend.',
    description:
      'An AI home repair diagnosis app for iOS and Android. Users photograph a household problem and get confidence-ranked candidate diagnoses with safety warnings and an in-app assistant. I was the only engineer on it — 25 screens and 48 components, roughly 27k lines, plus the entire Supabase backend.',
    bullets: [
      'Custom camera pipeline feeding a confidence-ranked diagnosis flow',
      'Anonymous per-device identity enforced through row-level security instead of user accounts',
      'Atomic quota system rate-limiting AI calls per device on hashed identifiers',
      '13 Edge Functions across 16 PostgreSQL tables',
      '390 automated tests across client and backend',
    ],
    stack: ['React Native', 'Supabase', 'PostgreSQL', 'TypeScript', 'Deno Edge Functions'],
    featuredStack: ['React Native', 'Supabase', 'PostgreSQL', 'TypeScript'],
    icon: Wrench,
  },
  {
    name: 'Julian Varel',
    tagline: 'Client work · brand site & portal',
    summary:
      'A multilingual EN/DE/FR Next.js brand site with a hand-written reveal engine and no animation library, plus a two-role client portal with argon2id auth and server-enforced RBAC.',
    description:
      'A private luxury brand site and the client portal behind it. The public site is a multilingual Next.js build with route-based i18n across English, German and French, and a reveal engine written by hand on IntersectionObserver rather than pulled in from a library. The portal is a separate two-role application built end to end.',
    bullets: [
      'Route-based i18n across English, German and French',
      'Hand-written IntersectionObserver reveal engine — no animation library, no CSS framework',
      'Two-role client portal in React and Vite, on an Express and PostgreSQL backend',
      'argon2id auth, server-enforced RBAC, and short-lived signed tokens for document downloads',
    ],
    stack: ['Next.js', 'React', 'Vite', 'Express.js', 'PostgreSQL', 'TypeScript'],
    featuredStack: ['Next.js', 'React', 'Express.js', 'PostgreSQL'],
    icon: Gem,
  },
  {
    name: 'NOVOSOLS',
    tagline: 'Next.js Web Application',
    summary:
      'Responsive Next.js frontend with server-side rendering and a Tailwind design system, plus a full admin dashboard letting the team manage every piece of site content without touching code.',
    description:
      'A production web application with separate user and admin experiences. The admin dashboard lets the team manage every piece of site content without touching code.',
    bullets: [
      'Responsive Next.js frontend with server-side rendering',
      'Tailwind CSS design system across both panels',
      'Fully functional admin dashboard for content management',
      'Express.js backend with secure data handling',
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Express.js', 'MongoDB'],
    featuredStack: ['Next.js', 'React', 'Tailwind', 'Express'],
    liveUrl: 'https://novosols.com',
    liveLabel: 'Visit live site',
    icon: Globe,
  },
  {
    name: 'ZEFTON',
    tagline: 'React E-Commerce Platform',
    summary:
      'Production e-commerce front end built in React — product catalog with dynamic routing and filtering, cart and checkout flow, and a responsive UI wired to REST APIs.',
    description:
      'A production e-commerce front end built collaboratively in React. End-to-end shopping experience from browsing to checkout.',
    bullets: [
      'Product catalog with dynamic routing and filtering',
      'Cart management and order processing flow',
      'Responsive UI wired to REST APIs',
      'User authentication with secure session handling',
    ],
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Git'],
    featuredStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: 'https://zefton.vercel.app',
    liveLabel: 'Visit live site',
    icon: ShoppingCart,
  },
  {
    name: 'AI Outreach Automation',
    tagline: 'n8n Workflow System',
    summary:
      'Automated prospect scraping and personalized outreach. Integrates Google Maps API for lead collection, Airtable for storage, AI enrichment, and Brevo for email delivery.',
    description:
      'An AI-powered automation that replaces 4+ hours of weekly manual cold outreach with a 60-second pipeline. Scrapes prospects, enriches data, and sends personalized emails.',
    bullets: [
      'Automated prospect scraping via Google Maps API',
      'Airtable as the lead database with stage tracking',
      'AI data enrichment for personalization',
      'Brevo integration for personalized email delivery',
    ],
    stack: ['n8n', 'Airtable', 'Google Maps API', 'Brevo', 'AI Enrichment'],
    featuredStack: ['n8n', 'Airtable', 'Google Maps API', 'Brevo'],
    liveUrl: 'https://www.fiverr.com/saqibalijavaid/make-ai-bot-automating-your-work-of-any-type',
    liveLabel: 'See client feedback',
    icon: Workflow,
  },
];
