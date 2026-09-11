/**
 * Post-build step: write a static HTML file per route with route-specific
 * <head> metadata baked in.
 *
 * Vite emits a single dist/index.html whose <head> only describes the homepage.
 * Crawlers that do not execute JavaScript — LinkedIn, WhatsApp, X, Slack and
 * most LLM crawlers — therefore see homepage metadata on every URL. This copies
 * that template once per route, swapping the block marked by <!-- SEO:START -->
 * / <!-- SEO:END --> for metadata from src/seo/pages.json, and appends
 * site-wide JSON-LD.
 *
 * Vercel checks the filesystem before applying the SPA rewrite in vercel.json,
 * so dist/about/index.html is served for /about while unknown URLs still fall
 * through to the SPA.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');

const seo = JSON.parse(readFileSync(join(root, 'src/seo/pages.json'), 'utf8'));
const template = readFileSync(join(distDir, 'index.html'), 'utf8');

const START = '<!-- SEO:START — replaced per route at build time by scripts/prerender.mjs -->';
const END = '<!-- SEO:END -->';

if (!template.includes(START) || !template.includes(END)) {
  throw new Error('prerender: SEO markers not found in dist/index.html — did index.html change?');
}

/** Escape a value for safe use inside a double-quoted HTML attribute. */
const attr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/*
 * Person rather than Organization: this is a portfolio, and the entity Google
 * needs to recognise is a human being. The sameAs links matter more than
 * anything else here — they are how a search engine connects a name on a small
 * site to an established profile elsewhere, which is what turns an unknown
 * string into a known entity.
 */
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${seo.siteUrl}/#person`,
    name: seo.personName,
    url: `${seo.siteUrl}/`,
    image: `${seo.siteUrl}/saqib.webp`,
    jobTitle: seo.jobTitle,
    email: seo.email,
    description: seo.pages['/'].description,
    address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' },
    sameAs: seo.sameAs,
    knowsAbout: [
      'Full-Stack Development',
      'React',
      'Node.js',
      'REST APIs',
      'Workflow Automation',
      'AI Integration',
      'Web Scraping',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seo.siteUrl}/#website`,
    url: `${seo.siteUrl}/`,
    name: seo.siteName,
    publisher: { '@id': `${seo.siteUrl}/#person` },
  },
];

const buildHead = (path, page) => {
  const url = path === '/' ? `${seo.siteUrl}/` : `${seo.siteUrl}${path}`;
  const image = `${seo.siteUrl}${seo.ogImage}`;

  // Search results and social cards truncate at different lengths — Google at
  // roughly 160 characters, social previews nearer 125 — so each gets its own
  // copy rather than one string that is wrong for both.
  const social = page.ogDescription ?? page.description;

  return `
    <title>${attr(page.title)}</title>
    <meta name="description" content="${attr(page.description)}" />
    <link rel="canonical" href="${attr(url)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="#111827" />

    <meta property="og:site_name" content="${attr(seo.siteName)}" />
    <meta property="og:type" content="${path === '/' ? 'profile' : 'website'}" />
    <meta property="og:url" content="${attr(url)}" />
    <meta property="og:title" content="${attr(page.title)}" />
    <meta property="og:description" content="${attr(social)}" />
    <meta property="og:image" content="${attr(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${attr(seo.ogImageAlt)}" />
    <meta property="og:locale" content="en_US" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="${attr(seo.twitterHandle)}" />
    <meta name="twitter:creator" content="${attr(seo.twitterHandle)}" />
    <meta name="twitter:title" content="${attr(page.title)}" />
    <meta name="twitter:description" content="${attr(social)}" />
    <meta name="twitter:image" content="${attr(image)}" />

    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
};

/*
 * Preload hints.
 *
 * The display font is needed by the <h1> on every page, and the portrait is the
 * likely Largest Contentful Paint element on the homepage. Both are discovered
 * late otherwise — the font only after the CSS parses, the image only after
 * React renders — so the browser starts fetching them well after it could have.
 *
 * The font filename carries a build hash, so it is read from the output rather
 * than hardcoded.
 */
const displayFont = readdirSync(join(distDir, 'assets')).find(
  (f) => f.startsWith('instrument-serif-latin-400-normal') && f.endsWith('.woff2')
);

if (!displayFont) {
  console.warn('[prerender] display font not found in dist/assets — skipping font preload');
}

const preloads = (path) =>
  [
    displayFont
      ? `<link rel="preload" as="font" type="font/woff2" href="/assets/${displayFont}" crossorigin />`
      : '',
    // Only the homepage renders the portrait.
    path === '/'
      ? '<link rel="preload" as="image" href="/saqib.webp" fetchpriority="high" />'
      : '',
  ]
    .filter(Boolean)
    .join('\n    ');

const before = template.slice(0, template.indexOf(START));
const after = template.slice(template.indexOf(END) + END.length);

for (const [path, page] of Object.entries(seo.pages)) {
  const hints = preloads(path);
  const html = `${before}${hints ? `${hints}\n    ` : ''}${buildHead(path, page).trim()}${after}`;
  const outFile = path === '/' ? join(distDir, 'index.html') : join(distDir, path, 'index.html');

  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`  prerendered ${path.padEnd(12)} -> ${outFile.replace(`${distDir}/`, 'dist/')}`);
}

console.log(`[prerender] wrote ${Object.keys(seo.pages).length} pages`);
