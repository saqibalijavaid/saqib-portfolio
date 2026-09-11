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

const setMetaContent = (selector: string, content: string) => {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = content;
};

export default function SeoSync() {
  const { pathname } = useLocation();

  useEffect(() => {
    const key = pathname.replace(/\/+$/, '') || '/';
    const page = pages[key];

    if (!page) {
      document.title = `Page Not Found — ${seo.siteName}`;
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

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [pathname]);

  return null;
}
