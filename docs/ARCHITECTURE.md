# Architecture

How this repository turns a React SPA into static HTML, and the constraints that
follow. This is the only genuinely unusual part of the codebase — everything else
is ordinary React.

## The problem it solves

A Vite SPA serves one `<div id="root"></div>` to every URL and fills it in with
JavaScript. Browsers cope. Three things that matter here do not:

- **Link preview scrapers** (LinkedIn, WhatsApp, Slack, X) read the `<head>` and
  never execute scripts.
- **LLM crawlers** (GPTBot, ClaudeBot, PerplexityBot) largely do not render
  JavaScript, and increasingly decide whether a person is findable at all.
- **Non-Google search engines** render JavaScript inconsistently.

Googlebot does render JavaScript, so this is not about Google. It is about
everything else.

This was fixed in two stages, visible in the git history:

1. `ee756c9` added per-route `<head>` generation — titles, descriptions,
   canonicals and JSON-LD became correct per page, but the `<body>` stayed empty.
2. `e6a0c83` added body rendering. Crawlable text went from **0 words on every
   page** to 696 / 759 / 314 / 96.

## The pipeline

`npm run build` runs four steps in order:

```
tsc -b                                        typecheck
vite build                                    client bundle -> dist/
vite build --ssr src/entry-server.tsx         SSR bundle    -> dist-ssr/
node scripts/prerender.mjs                    the actual work
```

`scripts/prerender.mjs` then, for each route in `src/seo/pages.json`:

1. Takes `dist/index.html` as a shell.
2. Replaces everything between `<!-- SEO:START … -->` and `<!-- SEO:END -->`
   with that route's metadata and JSON-LD.
3. Imports `dist-ssr/entry-server.js` and renders the route to a markup string.
4. Substitutes `<div id="root"></div>` for `<div id="root">{markup}</div>`.
5. Writes `dist/about/index.html`, `dist/projects/index.html`, and so on.

It also generates `dist/sitemap.xml` from the same route list, stamped with the
build date.

**Vercel checks the filesystem before applying the SPA rewrite in
`vercel.json`.** That is what makes this work: `/about` is served from
`dist/about/index.html`, while an unknown URL falls through the rewrite to
`dist/index.html` and the client router handles it.

### Why the build throws instead of warning

`prerender.mjs` throws if the SEO markers are missing, if the root marker is
missing, or if a route renders no markup. This is deliberate. A silently skipped
prerender produces pages that look flawless in a browser and are empty to every
crawler — the exact failure the step exists to prevent, and one nothing else in
the pipeline would catch. CI re-asserts the same properties against the output.

## Three hydration constraints

The build renders markup; the browser must produce *the same* markup on its first
pass or React discards the tree. Each of these was a real failure, diagnosed from
`Minified React error #418`.

### 1. The server render cannot use `lazy()`

`src/routes.tsx` does not import the page components. It takes them as a prop:

```tsx
export default function AppRoutes({ pages }: { pages: RoutePages })
```

- `src/App.tsx` (browser) passes code-split components wrapped in `Suspense`.
- `src/entry-server.tsx` (build) passes direct imports.

**Why:** React serialises a suspended boundary as the fallback, plus the real
markup in a `<div hidden id="S:0">`, plus a script to swap them. A crawler
without JavaScript sees the loading placeholder. Verified during development:
`grep -c '<div hidden' dist/contact/index.html` returned 1 before the fix and 0
after.

The route *paths* stay defined once. Only the components differ.

### 2. The browser must resolve the current route's chunk before hydrating

`src/main.tsx` maps path to chunk, awaits the matching one, and passes the
resolved component to `App` as `preloaded`:

```tsx
const routeChunks = {
  '/about':    ['About',    () => import('./pages/About')],
  '/projects': ['Projects', () => import('./pages/Projects')],
  '/contact':  ['Contact',  () => import('./pages/Contact')],
};
```

**Why:** `lazy()` suspends on its *first* render even when the module is already
in memory. React would compare the server's finished page against the fallback,
declare a mismatch, and rebuild the tree from scratch — the markup would be in
the HTML but thrown away before paint, so the SEO benefit survives while the
performance benefit does not.

Only the route being hydrated is preloaded. Every other route stays split,
because client-side navigation has no markup to match and can afford to wait.
Home is never split — it is the most common landing page.

`main.tsx` also chooses between `hydrateRoot` and `createRoot` by checking
`container.firstChild`. The container is empty on the dev server and on unknown
URLs; hydrating an empty container warns on every node.

### 3. Nothing rendered may branch on build-unknowable state

`ThemeProvider` resolves to `'light'` when `window` is undefined, so the build
always renders the light tree. That is fine **only because no markup depends on
it**:

- The visible theme comes from a `dark` class that an inline script in
  `index.html` puts on `<html>` before first paint. That is outside React and
  cannot mismatch.
- `ThemeToggle` renders *both* the sun and moon icons and swaps them with
  `dark:hidden` / `hidden dark:block`. It used to pick one from React state,
  which mismatched.

The same rule rules out `Date.now()`, `Math.random()` and `window` checks in
render. `Footer` and `NavigationDrawer` call `new Date().getFullYear()`, which is
safe only because build and visit fall in the same year — it will mismatch on
1 January. Low stakes, worth knowing.

### Debugging a mismatch

React's production error is `#418` with no detail. The fastest diagnosis is to
compare the shipped HTML against the hydrated DOM in the browser console:

```js
const res = await fetch('/projects/index.html', { cache: 'reload' });
const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
const server = doc.getElementById('root').innerHTML;
const client = document.getElementById('root').innerHTML;
let i = 0;
while (i < Math.min(server.length, client.length) && server[i] === client[i]) i++;
console.log({ i, server: server.slice(i - 200, i + 200), client: client.slice(i - 200, i + 200) });
```

That is how the `NavigationDrawer` trailing-slash bug was found: the server
rendered `/projects` as the active link, the browser was on `/projects/`, and a
strict `===` disagreed.

## Data flow

`src/data/projects.json` is the single source of truth for project content and is
read by **two independent consumers**:

- `src/data/projects.ts` — adds types and maps `icon` strings to lucide
  components, throwing on an unknown name.
- `scripts/prerender.mjs` — generates the `ItemList` of `CreativeWork` in the
  `/projects` structured data.

This split is the whole reason the records live in JSON rather than TypeScript:
the build script is plain Node and cannot import a `.ts` module. Structured data
that disagrees with the visible page is worse than none, so the fix was to make
disagreement impossible rather than merely unlikely.

`src/seo/pages.json` is read by `prerender.mjs` at build time and by
`SeoSync.tsx` at runtime, which keeps `<head>` correct across client-side
navigation — React Router changes the URL without a page load, so the tags would
otherwise keep describing the landing page.

## Request lifecycle

| Request | What happens |
| --- | --- |
| `/`, `/about`, `/projects`, `/contact` | Static file served from `dist/<route>/index.html`, then hydrated |
| `/projects/` | 308 to `/projects` (`trailingSlash: false`) |
| `/anything-else` | SPA rewrite to `dist/index.html`, client router renders `NotFound`, `SeoSync` sets `noindex` |
| `/api/contact` | Serverless function; excluded from the rewrite by `/((?!api/).*)` |
| `www.` or `*.vercel.app` | 308 to the apex domain |

### The soft-404 caveat

An unknown URL returns **HTTP 200**, not 404, because a static SPA cannot set a
status code. `SeoSync` sets `noindex, follow` on unrecognised paths so the URL
stays out of the index, and leaves the canonical pointing at the homepage. This
is a mitigation, not a fix — a real 404 would need a serverless catch-all.

## Known limitation: the contact rate limiter

`api/contact.ts` holds its rate-limit counters in a module-level `Map`
(5 requests per 60 seconds per IP). Serverless instances are ephemeral and
concurrent, so the limit is **per instance, not global**, and resets on cold
start. It raises the cost of casual abuse and nothing more. A real limit would
need shared storage such as Upstash Redis.
