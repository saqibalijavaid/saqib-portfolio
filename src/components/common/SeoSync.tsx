import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import seo from '../../seo/pages.json';

/**
 * Keeps <head> metadata in sync during client-side navigation.
 *
 * Each route is served with correct metadata already baked in by
 * scripts/prerender.mjs, but React Router changes the URL without a page load,
 * so the tags would otherwise keep describing whichever page the visitor first
 * landed on. This mutates the existing tags rather than appending new ones, so
 * no duplicates are created.
 */

type PageMeta = { title: string; description: string; ogDescription?: string };

const pages = seo.pages as Record<string, PageMeta | undefined>;

const INDEXABLE = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

const setMetaContent = (selector: string, content: string) => {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = content;
};

export default function SeoSync() {
  const { pathname } = useLocation();

  useEffect(() => {
    const key = pathname.replace(/\/+$/, '') || '/';
    const page = pages[key];

    /*
     * Unknown URL. Vercel's SPA rewrite answers these from dist/index.html, so
     * the server returns 200 with the homepage's head — a soft 404, which
     * Google will happily index as a duplicate of the homepage. Nothing in a
     * static SPA can turn that into a real 404 status, but noindex keeps the
     * URL out of the index, and the canonical is left pointing at the homepage
     * so any signal it has accrued lands somewhere sensible.
     */
    if (!page) {
      document.title = `Page not found — ${seo.siteName}`;
      setMetaContent('meta[name="robots"]', 'noindex, follow');
      setMetaContent('meta[name="googlebot"]', 'noindex, follow');
      return;
    }

    const url = key === '/' ? `${seo.siteUrl}/` : `${seo.siteUrl}${key}`;

    // Search results and social cards truncate at different lengths, so the
    // shorter ogDescription drives og:/twitter: while description drives the
    // meta description. Mirrors scripts/prerender.mjs.
    const social = page.ogDescription ?? page.description;

    document.title = page.title;
    setMetaContent('meta[name="description"]', page.description);
    setMetaContent('meta[property="og:title"]', page.title);
    setMetaContent('meta[property="og:description"]', social);
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[name="twitter:title"]', page.title);
    setMetaContent('meta[name="twitter:description"]', social);

    // Restores indexability after navigating away from an unknown URL.
    setMetaContent('meta[name="robots"]', INDEXABLE);
    setMetaContent('meta[name="googlebot"]', INDEXABLE);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [pathname]);

  return null;
}
