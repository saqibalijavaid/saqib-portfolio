/**
 * Post-build step: write a static HTML file per route with route-specific
 * <head> metadata and JSON-LD baked in, plus a generated sitemap.
 *
 * Vite emits a single dist/index.html whose <head> only describes the homepage.
 * Crawlers that do not execute JavaScript — LinkedIn, WhatsApp, X, Slack and
 * most LLM crawlers — therefore see homepage metadata on every URL. This copies
 * that template once per route, swapping the block marked by <!-- SEO:START -->
 * / <!-- SEO:END --> for metadata from src/seo/pages.json.
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
const { projects } = JSON.parse(readFileSync(join(root, 'src/data/projects.json'), 'utf8'));
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
 * JSON-LD is embedded in a <script> block, so the one character that can break
 * out of it is "<". Escaping it as \u003c keeps the JSON valid and the markup
 * inert — JSON.stringify alone does not do this.
 */
const jsonLdScript = (graph) =>
  `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`;

const absolute = (path) => (path === '/' ? `${seo.siteUrl}/` : `${seo.siteUrl}${path}`);

/*
 * One @graph per page rather than a bag of disconnected objects.
 *
 * Search engines resolve entities by @id, so every node pointing at the same
 * #person and #website means four pages describing one person, rather than four
 * unrelated documents that happen to share a name. sameAs does the heaviest
 * lifting: it is how a crawler connects a name on a small site to established
 * profiles elsewhere, which is what turns an unknown string into a known entity.
 */
const person = {
  '@type': 'Person',
  '@id': `${seo.siteUrl}/#person`,
  name: seo.personName,
  givenName: seo.givenName,
  familyName: seo.familyName,
  url: `${seo.siteUrl}/`,
  image: {
    '@type': 'ImageObject',
    '@id': `${seo.siteUrl}/#headshot`,
    url: `${seo.siteUrl}/saqib.webp`,
    caption: seo.personName,
  },
  jobTitle: seo.jobTitle,
  email: `mailto:${seo.email}`,
  description: seo.pages['/'].description,
  worksFor: { '@type': 'Organization', name: seo.worksFor },
  alumniOf: { '@type': 'CollegeOrUniversity', name: seo.alumniOf },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lahore',
    addressRegion: 'Punjab',
    addressCountry: 'PK',
  },
  knowsAbout: seo.knowsAbout,
  sameAs: seo.sameAs,
};

const website = {
  '@type': 'WebSite',
  '@id': `${seo.siteUrl}/#website`,
  url: `${seo.siteUrl}/`,
  name: seo.siteName,
  description: seo.pages['/'].description,
  inLanguage: 'en',
  publisher: { '@id': `${seo.siteUrl}/#person` },
};

/*
 * Breadcrumbs for every page including the homepage. Google uses these to
 * replace the raw URL in a result with a readable path, which is worth more on
 * a four-page site than the markup costs.
 */
const breadcrumb = (path, page) => ({
  '@type': 'BreadcrumbList',
  '@id': `${absolute(path)}#breadcrumb`,
  itemListElement:
    path === '/'
      ? [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${seo.siteUrl}/` }]
      : [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${seo.siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: absolute(path) },
        ],
});

/*
 * Each project as a CreativeWork, generated from the same records the page
 * renders. A portfolio's single strongest topical signal is what it actually
 * built in, so naming every technology per project — rather than only in prose
 * — gives a crawler something unambiguous to read.
 */
const projectItemList = () => ({
  '@type': 'ItemList',
  '@id': `${seo.siteUrl}/projects#projects`,
  name: 'Selected work',
  numberOfItems: projects.length,
  itemListOrder: 'https://schema.org/ItemListOrderDescending',
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'CreativeWork',
      '@id': `${seo.siteUrl}/projects#${project.slug}`,
      name: project.name,
      description: project.description,
      ...(project.liveUrl ? { url: project.liveUrl } : {}),
      creator: { '@id': `${seo.siteUrl}/#person` },
      keywords: project.stack.join(', '),
    },
  })),
});

const graphFor = (path, page) => {
  const url = absolute(path);
  const nodes = [person, website];

  const webPage = {
    '@type': page.schemaType,
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': `${seo.siteUrl}/#website` },
    about: { '@id': `${seo.siteUrl}/#person` },
    primaryImageOfPage: { '@id': `${seo.siteUrl}/#headshot` },
    inLanguage: 'en',
    breadcrumb: { '@id': `${url}#breadcrumb` },
  };

  // ProfilePage names the subject it is about; the others do not take mainEntity.
  if (page.schemaType === 'ProfilePage') {
    webPage.mainEntity = { '@id': `${seo.siteUrl}/#person` };
  }

  nodes.push(webPage, breadcrumb(path, page));

  if (path === '/projects') {
    nodes.push(projectItemList());
  }

  return { '@context': 'https://schema.org', '@graph': nodes };
};

const buildHead = (path, page) => {
  const url = absolute(path);
  const image = `${seo.siteUrl}${seo.ogImage}`;

  // Search results and social cards truncate at different lengths — Google at
  // roughly 160 characters, social previews nearer 120 — so each gets its own
  // copy rather than one string that is wrong for both.
  const social = page.ogDescription ?? page.description;

  return `
    <title>${attr(page.title)}</title>
    <meta name="description" content="${attr(page.description)}" />
    <link rel="canonical" href="${attr(url)}" />
    <meta name="author" content="${attr(seo.personName)}" />

    <!--
      max-snippet/max-image-preview let Google show a full description and a
      large thumbnail instead of defaulting to something conservative.
    -->
    <meta
      name="robots"
      content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
    <meta name="theme-color" content="#0c0a09" media="(prefers-color-scheme: dark)" />
    <meta name="theme-color" content="#fafaf9" media="(prefers-color-scheme: light)" />

    <meta property="og:site_name" content="${attr(seo.siteName)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${attr(url)}" />
    <meta property="og:title" content="${attr(page.title)}" />
    <meta property="og:description" content="${attr(social)}" />
    <meta property="og:image" content="${attr(image)}" />
    <meta property="og:image:secure_url" content="${attr(image)}" />
    <meta property="og:image:type" content="image/jpeg" />
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
    <meta name="twitter:image:alt" content="${attr(seo.ogImageAlt)}" />

    ${jsonLdScript(graphFor(path, page))}`;
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

/*
 * Render each route's markup into the shell.
 *
 * Until now only the <head> was generated and every page shipped an empty
 * <div id="root">. Googlebot executes JavaScript so it coped, but the crawlers
 * that increasingly decide whether a portfolio gets found — GPTBot, ClaudeBot,
 * PerplexityBot and friends — largely do not, and were being served four
 * documents with no content in them at all.
 *
 * ROOT_MARKER has to match the shell exactly; a silent miss here would ship
 * empty pages that still look fine in a browser, which is the failure mode this
 * whole step exists to prevent.
 */
const { render } = await import(join(root, 'dist-ssr/entry-server.js'));

const ROOT_MARKER = '<div id="root"></div>';
if (!template.includes(ROOT_MARKER)) {
  throw new Error(`prerender: "${ROOT_MARKER}" not found in dist/index.html — did the shell change?`);
}

for (const [path, page] of Object.entries(seo.pages)) {
  const hints = preloads(path);
  const head = `${before}${hints ? `${hints}\n    ` : ''}${buildHead(path, page).trim()}${after}`;

  const body = await render(path);
  if (!body.trim()) {
    throw new Error(`prerender: ${path} rendered no markup`);
  }

  const html = head.replace(ROOT_MARKER, `<div id="root">${body}</div>`);
  const outFile = path === '/' ? join(distDir, 'index.html') : join(distDir, path, 'index.html');

  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);

  const kb = (Buffer.byteLength(body) / 1024).toFixed(1);
  console.log(`  prerendered ${path.padEnd(12)} -> ${outFile.replace(`${distDir}/`, 'dist/')} (${kb} kB of markup)`);
}

/*
 * Sitemap, generated rather than hand-maintained.
 *
 * The committed one had drifted to a lastmod of 2026-09-12 across every URL
 * while the pages kept changing underneath it — a stale lastmod is worse than
 * none, because it tells Google not to bother recrawling. Deriving it from the
 * build date means it is right by construction.
 *
 * priority and changefreq are deliberately omitted: Google has stated it
 * ignores both, and they only ever add noise.
 */
const buildDate = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(seo.pages)
  .map((path) => `  <url>\n    <loc>${absolute(path)}</loc>\n    <lastmod>${buildDate}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`;

writeFileSync(join(distDir, 'sitemap.xml'), sitemap);

console.log(
  `[prerender] wrote ${Object.keys(seo.pages).length} pages and sitemap.xml (lastmod ${buildDate})`
);
