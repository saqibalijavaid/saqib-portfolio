# CLAUDE.md

Working notes for anyone — human or Claude — picking this repository up cold.
This file is the entry point; `docs/` holds the detail.

| Document | What is in it |
| --- | --- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | The build pipeline, prerendering and hydration — the only genuinely unusual part of this codebase |
| [docs/SEO.md](docs/SEO.md) | Metadata system, structured data, sitemap, Search Console state |
| [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md) | How to change content and design tokens without touching components |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Why things are the way they are, including dead ends |
| [docs/STATUS.md](docs/STATUS.md) | Current state, pending work, known issues, open questions |

---

## What this is

The personal portfolio of **Saqib Ali Javaid**, a frontend engineer in Lahore,
Pakistan, live at **<https://saqibalijavaid.me>**. Four pages: Home, Projects,
About, Contact. Its job is to get him hired — specifically into **remote
frontend roles** — and secondarily to attract freelance work.

It is not a blog, a CMS, or a product. Content changes by editing two JSON files
and redeploying.

**Positioning matters here.** The site was deliberately repositioned from
"full-stack engineer and automation" to **frontend: React Native, React,
Next.js**. Several past changes exist only to serve that: the technology list was
cut from 22 badges to a grouped set, Python/Django/Flask were removed from the
stack display, and copy leads with mobile. Do not reintroduce backend or
automation breadth without a reason — it actively dilutes the message. See
[docs/DECISIONS.md](docs/DECISIONS.md).

---

## Quick start

```bash
npm install
npm run dev          # Vite dev server, http://localhost:5173
```

The contact form posts to `/api/contact`, a Vercel serverless function that the
Vite dev server does not run. To exercise both together:

```bash
npm i -g vercel
vercel dev
```

### Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server. Serves raw `index.html`, so no prerendered markup. |
| `npm run build` | Four steps: `tsc -b`, client build, SSR build, then `scripts/prerender.mjs` |
| `npm run lint` | ESLint over the repo |
| `npm run preview` | **Misleading — see warning below** |
| `npx vercel build` | Runs the real Vercel build, including `vercel.json` schema validation |

> **`npm run preview` does not reflect production.** `vite preview` applies the
> SPA fallback and serves `dist/index.html` for every route, ignoring
> `dist/projects/index.html`. Vercel checks the filesystem first, so the two
> disagree. To test the prerendered output the way Vercel serves it:
>
> ```bash
> npm run build && cd dist && python3 -m http.server 5191
> # then visit /projects/ — with the trailing slash
> ```
>
> Several confusing "hydration mismatch" hours were spent on this. It was the
> test harness, not the build.

### Environment variables

Copy `.env.example` to `.env.local`. All three are server-side only, read by
`api/contact.ts`:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key — <https://resend.com/api-keys> |
| `CONTACT_TO_EMAIL` | Inbox that receives form submissions |
| `CONTACT_FROM_EMAIL` | Verified sender on a domain added to Resend |

All three are **already configured in Vercel** for Production and Preview. No
secrets are stored in this repository.

---

## Stack

| Area | Choice |
| --- | --- |
| UI | React 19.2, TypeScript 5.9 (strict), Tailwind CSS v4 |
| Routing | React Router 7 (`BrowserRouter` in the browser, `StaticRouter` at build time) |
| Build | Vite 7, plus a second SSR pass used only for prerendering |
| Icons | `lucide-react` |
| Forms | React Hook Form + Zod, shared schema client and server |
| Email | Resend, via a Vercel serverless function |
| Fonts | `@fontsource` — Instrument Serif, Inter, JetBrains Mono (self-hosted) |
| Hosting | Vercel |

**The site makes no third-party runtime requests.** Fonts are self-hosted and
the LinkedIn embed badge was removed. Keep it that way — it is why there is no
Content-Security-Policy to maintain, and why performance is good.

Node: Vercel runs **24.x**, CI runs **22**. Both work.

---

## Structure

```
.github/workflows/ci.yml   Lint, typecheck, build, then assert the output is real
api/contact.ts             Serverless contact endpoint (POST only)
scripts/prerender.mjs      THE IMPORTANT BUILD STEP — see docs/ARCHITECTURE.md
src/
  main.tsx                 Browser entry. Resolves the route chunk, then hydrates.
  entry-server.tsx         Build-time render entry. Direct imports, no lazy.
  App.tsx                  Browser tree: ThemeProvider > BrowserRouter > AppRoutes
  routes.tsx               Route table. Page components are injected, not imported.
  index.css                Tailwind v4 @theme — all design tokens live here
  components/
    common/                Button, SeoSync, ScrollToTop, ThemeToggle
    layout/                Layout, Sidebar, NavigationDrawer, Footer
    sections/              Homepage sections: Hero, Technologies, FeaturedWork,
                           Experience, CTA, HeroPattern
  context/
    ThemeContext.tsx       Provider only (component exports only, for Fast Refresh)
    theme-context.ts       Context + useTheme hook
  data/
    projects.json          Project records — read by the app AND the build
    projects.ts            Typed wrapper; maps icon names to lucide components
  lib/contactSchema.ts     Zod schema shared by the form and the API
  pages/                   Home, Projects, About, Contact, NotFound
  seo/pages.json           Per-route titles, descriptions, schema types
```

`src/App.css` is empty and imported nowhere. Safe to delete.

---

## The one thing to understand first

**This is a Vite SPA that does not behave like one.** `npm run build` renders
every route to its own static HTML file with real markup, real metadata and real
JSON-LD. The client then *hydrates* that markup rather than rebuilding it.

Three constraints follow, and breaking any of them is silent — the site still
looks perfect in a browser:

1. **`src/entry-server.tsx` must import pages directly, never via `lazy()`.**
   React serialises a suspended boundary as a fallback plus the real markup in a
   `<div hidden>` for a script to reveal. Crawlers that do not run scripts then
   see a loading placeholder. That defeats the entire point.

2. **`src/main.tsx` must resolve the current route's chunk before hydrating.**
   `lazy()` suspends on its first render even when the module is already in
   memory, so React would compare the server's finished page against a
   placeholder, call it a mismatch, and throw the whole tree away.

3. **Nothing rendered may branch on anything the build cannot know** — theme,
   `window`, time, randomness. `ThemeToggle` renders both icons and swaps them
   with CSS for exactly this reason.

Full explanation, including what each failure looks like:
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Traps that have already cost time

**`vercel.json` rejects unknown keys.** Adding a `"comment"` property to explain
a header broke every deployment for hours with *"Invalid vercel.json —
headers[1] should NOT have additional property `comment`"*. GitHub Actions stayed
green because it never touches that file, so production silently served a stale
build. JSON has no comments and this file is schema-validated — put rationale in
`docs/`, and validate changes with `npx vercel build` before pushing.

**Never put white text or icons on amber.** White on `accent-500` measures
**2.15:1**; `text-gray-950` measures **9.20:1**. This has been fixed three
separate times in different components. The full table is in
[docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md).

**Two markers in `index.html` are matched literally by the build** and will
throw if reworded:
- `<!-- SEO:START — replaced per route at build time by scripts/prerender.mjs -->`
  and its matching `<!-- SEO:END -->`
- `<div id="root"></div>`

The thrown error is deliberate: a silent miss would ship empty pages.

**The display font ships weight 400 only.** Any `font-display` heading must be
`font-normal`. `font-bold` triggers faux-bold synthesis, which looks bad on a
high-contrast serif.

**`src/data/projects.json` is read by two consumers** — the React app and
`scripts/prerender.mjs`. The `icon` field is a string key into the map in
`projects.ts`, which throws on an unknown name. Keep them in step.

**Tailwind class names that do not exist fail silently.** `animate-fade-in-up`
and `group-hover:paused` were in the markup for months, compiled to zero CSS, and
nobody noticed — the marquee they were supposed to pause never paused. If a
utility is not a real Tailwind class or declared in `@theme`, check the built CSS
rather than assuming.

---

## Conventions

**Comments explain *why*, never *what*.** The codebase is deliberately heavy on
rationale — contrast ratios, hydration constraints, why a link is absent. Match
that: a comment that restates the code is noise, a comment recording a measured
value or a rejected alternative is the most valuable thing in the file.

**Status is declared, never inferred.** A project is not "unreleased" because it
lacks a URL; it says so via an explicit field. This came from a real bug where
an absent link silently produced the wrong UI state.

**Accessibility is a hard requirement, not a nice-to-have.** The site has held
Lighthouse 100 on accessibility. Specifically:
- An `<a>` without an `href` is not focusable and is not announced as a link —
  render a `<div>` instead.
- Exactly one `<h1>` per page. Eyebrow text above a heading is a `<p>`, not an
  `<h2>`.
- Icon-only controls need an `aria-label`; decorative icons need
  `aria-hidden="true"`.
- Anything that moves indefinitely needs a `prefers-reduced-motion` escape.

**Formatting:** Prettier — single quotes, semicolons, 100 columns, 2-space
indent, ES5 trailing commas. TypeScript is strict with `noUnusedLocals` and
`noUnusedParameters`.

**Commit messages** are prose explaining the problem and the reasoning, not
bullet lists of changes. Read `git log` for the house style.

---

## Testing

**There is no automated test suite.** No Vitest, no Playwright, no unit tests.
This is the biggest gap in the repository.

What exists instead:

- **CI** (`.github/workflows/ci.yml`) runs lint, typecheck and the full build on
  every push and pull request, then asserts the prerendered output is real: every
  page has markup, exactly one `<h1>`, and parseable JSON-LD with a populated
  `@graph`. That last check exists because a prerender that silently misses its
  marker produces pages that look perfect in a browser and are empty to
  everything else.
- **Manual browser verification** has been the main method: load each route from
  a filesystem-first static server, check the console is clean, confirm
  hydration, exercise the form and navigation.

Note the stack already lists Vitest and Playwright as skills. Adding a real suite
would be both useful and on-message.

---

## Deployment

Pushing to `main` deploys to production automatically via the Vercel GitHub
integration. There is no staging branch.

- Vercel project: `saqib-portfolio`, team `saqib-ali-javaids-projects`
- Primary domain: `saqibalijavaid.me`
- `www.saqibalijavaid.me` and `saqib-ali-javaid.vercel.app` both 308 to the apex
- `trailingSlash: false`, so `/projects/` 308s to `/projects`

`vercel.json` also sets long cache headers for hashed assets, short ones for
`robots.txt` and `sitemap.xml`, and baseline security headers.

**Verify a deploy actually succeeded.** A green GitHub Actions run does not mean
Vercel deployed:

```bash
gh api repos/saqibalijavaid/saqib-portfolio/commits/$(git rev-parse HEAD)/status \
  --jq '{state, statuses: [.statuses[] | {context, state}]}'
```

---

## Where things stand

Current state, pending tasks and open questions live in
[docs/STATUS.md](docs/STATUS.md) — check it first, it changes most often.

Short version as of **2026-10-05**: the site is live and current, every route is
prerendered, Search Console is verified with the sitemap submitted and indexing
requested on all four URLs. The main open items are Bing Webmaster Tools, a
contact-form end-to-end test, and a permissions question about naming Barq Dev's
clients publicly.
