# SEO

The site's SEO is implemented in code, not bolted on. This describes the system,
the reasoning behind the non-obvious choices, and the current Search Console
state.

## Where it lives

| File | Role |
| --- | --- |
| `src/seo/pages.json` | Per-route titles, descriptions, social copy, schema types |
| `scripts/prerender.mjs` | Builds the `<head>`, the JSON-LD graph and `sitemap.xml` |
| `src/components/common/SeoSync.tsx` | Re-applies metadata on client-side navigation |
| `index.html` | Homepage copy and the dev-server default |
| `public/robots.txt` | Crawl directives |
| `vercel.json` | Canonical host and trailing-slash enforcement |

`index.html` holds a full copy of the homepage tags. **The set of tags there must
stay in sync with what `SeoSync` mutates** — it updates existing elements and
silently skips any that do not exist, so a tag missing from the template is a tag
that never updates when a visitor navigates.

## Copy rules

Titles are kept under ~60 characters and descriptions under ~160 so neither is
truncated in a result. `ogDescription` is shorter again, nearer 120, because
social cards cut earlier — one string cannot be right for both.

Current values, all verified in range:

| Route | Title | chars | desc |
| --- | --- | --- | --- |
| `/` | Saqib Ali Javaid — React Native & Next.js Engineer | 50 | 143 |
| `/projects` | Projects — React Native & Next.js Work \| Saqib Ali Javaid | 57 | 159 |
| `/about` | About — Frontend Engineer in Lahore \| Saqib Ali Javaid | 54 | 157 |
| `/contact` | Contact — Hire a React Native Developer \| Saqib Ali Javaid | 58 | 138 |

These were rewritten from branding-only versions ("About — Saqib Ali Javaid")
that competed for nothing. They now carry the terms the work is findable under:
React Native, Next.js, iOS and Android, Lahore, remote.

### There is deliberately no `<meta name="keywords">`

Google dropped support in 2009 and Bing treats it as a spam signal. Keywords
belong in titles, descriptions, headings, body copy, alt text and structured
data — which is where they are. Do not add the tag back.

## Structured data

Each page emits **one `@graph`**, not a bag of loose objects. Every node resolves
to the same `#person` and `#website` by `@id`, so four pages describe one entity
rather than four documents that happen to share a name.

| Route | `@graph` contents |
| --- | --- |
| `/` | Person, WebSite, **ProfilePage**, BreadcrumbList |
| `/projects` | Person, WebSite, **CollectionPage**, BreadcrumbList, **ItemList** (7 × CreativeWork) |
| `/about` | Person, WebSite, **AboutPage**, BreadcrumbList |
| `/contact` | Person, WebSite, **ContactPage**, BreadcrumbList |

`sameAs` does the heaviest lifting in the whole file: GitHub, LinkedIn, X and
LeetCode. It is how a crawler connects a name on a small site to established
profiles elsewhere, which is what turns an unknown string into a known entity.

`knowsAbout` lives in `pages.json` and must track the real stack. It previously
still listed "Web Scraping" and "Workflow Automation" from the pre-repositioning
site — stale values here actively work against the positioning.

The `ItemList` is generated from `src/data/projects.json`, the same records the
page renders. See [ARCHITECTURE.md](ARCHITECTURE.md#data-flow).

JSON-LD is escaped with `.replace(/</g, '\\u003c')` before embedding —
`JSON.stringify` alone does not prevent a `<` breaking out of the `<script>`
block.

## Sitemap

Generated at build time into `dist/sitemap.xml` from the route list, stamped with
the build date.

The committed static sitemap was deleted. It claimed `lastmod 2026-09-12` for
every URL while the pages changed underneath it, and **a stale `lastmod` is worse
than none** — it tells Google not to bother recrawling.

`priority` and `changefreq` are deliberately omitted. Google has stated it
ignores both.

## Canonicalisation

Three domains once served the site with HTTP 200 — apex, `www`, and the
`.vercel.app` URL — so Google saw three complete copies and had to guess. Now:

- `www.saqibalijavaid.me` → 308 → apex
- `saqib-ali-javaid.vercel.app` → 308 → apex
- `/projects/` → 308 → `/projects` (`trailingSlash: false`)
- Every page carries a self-referencing `<link rel="canonical">`

The trailing-slash rule does double duty: it also keeps the live URL shape
identical to the path the build renders, which is what the markup is hydrated
against.

## robots.txt

Everything is crawlable except `/api/`, which is POST-only and has nothing to
read. AI crawlers are **deliberately not blocked** — being readable by them is
most of the point of prerendering the body.

## Headings and semantics

Exactly one `<h1>` per page, asserted in CI. Two historical problems:

- `/projects` opened with an `<h2>` ("Projects") *above* its `<h1>`, inverting
  the outline.
- Homepage sections made the small eyebrow the `<h2>` and the large visible title
  a `<p>`.

Both fixed. Eyebrow text is a `<p>`; the sentence a reader would call the section
title is the heading.

## Social cards

One shared card at `public/og-image.jpg`, 1200×630, built around the headshot in
the site's own identity. `og:image:alt` and `twitter:image:alt` are set.

Platforms cache aggressively and **key on the URL**. If the image changes, a
re-scrape may not be enough — publishing at a new filename (`og-image-v2.jpg`)
forces every platform to refetch. Keep the old file in place so nothing 404s.

## Search Console

**Verified 2026-10-05** as a Domain property.

| Item | State |
| --- | --- |
| Sitemap | Submitted, **Success**, 4 discovered pages |
| Page indexing report | "Processing data" — normal for a new property |
| `/` | Indexed |
| `/projects`, `/about`, `/contact` | Were "URL is unknown to Google"; indexing requested 2026-10-05 |

### Why the other three were unknown

URL Inspection reported **"Referring page: None detected"**, and until the body
prerendering shipped that was literally true: the internal links existed only
after JavaScript ran, so there was no crawlable path from the homepage anywhere.
The prerendered homepage now contains 11 internal anchors (`/projects` ×3,
`/about` ×2, `/contact` ×5) with real anchor text.

"No referring sitemaps detected" on those inspections was lag — URL Inspection
reads from the last indexing pass, and the sitemap had only just been read.

### What to watch

- Pages moving to **Indexed** in the Pages report over the following days.
- **"Duplicate without user-selected canonical"** — plausible given the
  three-domain history. The redirects and canonicals handle it; consolidation
  just takes time.
- Impressions in Performance after roughly one to two weeks.

### Still to do

**Bing Webmaster Tools** — <https://bing.com/webmasters> → *Import from Google
Search Console*. One click now that GSC is verified. Bing's index feeds ChatGPT
Search and Copilot.

## Measurements

Lighthouse, taken on the live site **before** body prerendering shipped:

| Category | Score |
| --- | --- |
| Performance | 94 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

CLS 0, TBT 10 ms, LCP 2.6 s under simulated slow-4G mobile throttling.

**These predate the SSG work and should be re-measured.** Hydration replaced
client rendering and security headers were added, so Performance and Best
Practices may both have moved.

Crawlable text per page after prerendering — a useful regression check:

| Route | Words |
| --- | --- |
| `/` | 696 |
| `/projects` | 759 |
| `/about` | 314 |
| `/contact` | 96 |
