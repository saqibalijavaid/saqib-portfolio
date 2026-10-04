import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes, { type RoutePages } from './routes';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './index.css';

/*
 * Imported directly rather than lazily, unlike the browser entry. A suspended
 * boundary is serialised as a fallback plus the real markup in a `<div hidden>`
 * that only a script can reveal, which would hide every page from exactly the
 * crawlers this prerender exists to serve.
 */
const pages: RoutePages = { About, Projects, Contact, NotFound };

/**
 * Build-time render. Not a server — this runs once per route in
 * scripts/prerender.mjs and the output is written to a static file.
 *
 * `prerenderToNodeStream` rather than `renderToString` because the route tree
 * uses React.lazy: renderToString would emit the Suspense fallback and the HTML
 * would contain an empty placeholder where the page should be. prerender waits
 * for every boundary to resolve before producing anything.
 *
 * ThemeProvider resolves to 'light' with no `window` present, which is why
 * nothing rendered here may branch on the theme — see ThemeToggle for how that
 * is handled. The visible theme comes from the `dark` class that the inline
 * script in index.html puts on <html> before first paint, which is outside
 * React and so cannot mismatch during hydration.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <ThemeProvider>
        <StaticRouter location={url}>
          <AppRoutes pages={pages} />
        </StaticRouter>
      </ThemeProvider>
    </StrictMode>
  );

  /*
   * Decoded with TextDecoder rather than Buffer so this file stays inside the
   * app's browser tsconfig — it imports app components, so it has to typecheck
   * under the same config they do, and pulling Node globals in for one build
   * script would loosen that for everything.
   *
   * The cast covers a types gap: the stream is async-iterable at runtime, but
   * lib.dom's ReadableStream declaration has no Symbol.asyncIterator.
   */
  const decoder = new TextDecoder();
  let html = '';

  for await (const chunk of prelude as unknown as AsyncIterable<Uint8Array>) {
    html += decoder.decode(chunk, { stream: true });
  }
  html += decoder.decode();

  return html;
}
