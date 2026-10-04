import type { ComponentType } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

/**
 * The route table, with the page components supplied by whoever renders it.
 *
 * The two entries need different components for the same routes. The browser
 * wants them code-split, so a visitor reading the homepage does not also
 * download the projects gallery and the contact form. The build wants them
 * imported directly: React.lazy suspends, and a suspended boundary is written
 * out as a fallback plus the real markup in a `<div hidden>` for a script to
 * swap in later. That is fine for a browser and useless for a crawler that does
 * not run scripts — which is the entire reason these pages are prerendered.
 *
 * Injecting the components keeps the paths themselves defined once. Home is not
 * injected: it is in the main bundle either way, because it is the most common
 * landing page and should paint without a second round trip.
 */
export interface RoutePages {
  About: ComponentType;
  Projects: ComponentType;
  Contact: ComponentType;
  NotFound: ComponentType;
}

export default function AppRoutes({ pages }: { pages: RoutePages }) {
  const { About, Projects, Contact, NotFound } = pages;

  return (
    <Routes>
      {/* The Layout wraps all these routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
