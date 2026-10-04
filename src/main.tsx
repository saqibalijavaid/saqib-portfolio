import { StrictMode, type ComponentType } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import './index.css';
import App, { type Preloaded } from './App.tsx';
import type { RoutePages } from './routes';

// Import Fonts
import '@fontsource/instrument-serif/400.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';

const container = document.getElementById('root')!;

/*
 * Prerendered pages ship with their markup already rendered, so they are
 * hydrated — React adopts the existing DOM instead of discarding and rebuilding
 * it. That only works if the first client render produces the same tree, and
 * for a code-split route it does not: lazy() suspends on first render, so React
 * would compare the server's finished page against a loading placeholder.
 *
 * So the route being hydrated has its chunk resolved first and is handed to App
 * as a plain component. Costs one module fetch before hydration — which the
 * browser has usually already made via modulepreload — and buys a tree that is
 * adopted rather than rebuilt.
 */
const routeChunks: Partial<Record<string, [keyof RoutePages, () => Promise<{ default: ComponentType }>]>> =
  {
    '/about': ['About', () => import('./pages/About')],
    '/projects': ['Projects', () => import('./pages/Projects')],
    '/contact': ['Contact', () => import('./pages/Contact')],
  };

const path = window.location.pathname.replace(/\/+$/, '') || '/';
const chunk = routeChunks[path];

let preloaded: Preloaded | undefined;

/*
 * Only worth doing when there is server markup to match. An unknown URL is
 * answered from the homepage shell with an empty container, so there is nothing
 * to hydrate and no reason to block on a fetch.
 */
if (chunk && container.firstChild) {
  const [name, load] = chunk;
  preloaded = { name, Component: (await load()).default };
}

const tree = (
  <StrictMode>
    <App preloaded={preloaded} />
  </StrictMode>
);

/*
 * The container is only empty on the dev server, which serves the raw
 * index.html, and on an unknown URL. Both need a fresh render; calling
 * hydrateRoot against an empty container would warn on every node.
 */
if (container.firstChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
