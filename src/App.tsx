import { lazy, Suspense, type ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes, { type RoutePages } from './routes';

/*
 * Browser entry. Every page but Home is code-split, so reading the homepage
 * does not also pull down the projects gallery, the contact form and About.
 */

// Reserves roughly a viewport of height so swapping in the real page does not
// shift the layout underneath the visitor.
const RouteFallback = () => <div className="min-h-[70vh]" aria-busy="true" />;

/** Each split page carries its own boundary, so one chunk never blocks another. */
const split = (load: () => Promise<{ default: ComponentType }>): ComponentType => {
  const Lazy = lazy(load);
  return function SplitRoute() {
    return (
      <Suspense fallback={<RouteFallback />}>
        <Lazy />
      </Suspense>
    );
  };
};

const splitPages: RoutePages = {
  About: split(() => import('./pages/About')),
  Projects: split(() => import('./pages/Projects')),
  Contact: split(() => import('./pages/Contact')),
  NotFound: split(() => import('./pages/NotFound')),
};

/**
 * The page whose chunk main.tsx already resolved, if any.
 *
 * It has to render synchronously on the first pass. The build ships each page's
 * real markup, and a lazy component suspends on its first render even when the
 * module is already in memory — so React would hydrate the server's finished
 * page against a loading placeholder, decide they disagree, and throw the whole
 * tree away. Every other route stays split, because client-side navigation has
 * no markup to match and can afford to wait.
 */
export interface Preloaded {
  name: keyof RoutePages;
  Component: ComponentType;
}

function App({ preloaded }: { preloaded?: Preloaded }) {
  const pages: RoutePages = preloaded
    ? { ...splitPages, [preloaded.name]: preloaded.Component }
    : splitPages;

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes pages={pages} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
