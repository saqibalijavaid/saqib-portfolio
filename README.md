# saqib-portfolio

Personal portfolio for Saqib Ali Javaid — **[saqibalijavaid.me](https://saqibalijavaid.me)**

[![Deployed on Vercel](https://img.shields.io/badge/deployed-Vercel-000?logo=vercel)](https://saqibalijavaid.me)
[![React 19](https://img.shields.io/badge/React-19-087ea4?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber)](LICENSE)

A four-page site built with React 19, TypeScript, Vite and Tailwind CSS v4,
statically prerendered at build time and deployed on Vercel.

> **Working on this codebase?** Start with **[CLAUDE.md](CLAUDE.md)** — it is the
> project's knowledge base, covering architecture, conventions, current status
> and the traps that have already cost time. Deeper notes live in [`docs/`](docs).

---

## Why it is not just a Vite SPA

A single-page app serves one empty `<div>` to every URL. That is fine for a
browser and useless for everything else — link previews, search engines, and the
LLM crawlers that increasingly decide whether a site is found at all. The build
here closes that gap without adopting a framework.

**Every route is prerendered to its own HTML file.** `scripts/prerender.mjs`
renders each page with `react-dom/static` and writes `dist/about/index.html`,
`dist/projects/index.html` and so on, each with its own `<title>`, description,
canonical, Open Graph tags and JSON-LD. Vercel checks the filesystem before
applying the SPA rewrite, so those files are served directly while unknown URLs
still fall through to the client router.

**The client hydrates rather than re-renders.** Routes are code-split, but
`lazy()` suspends on its first render — which would make React compare the
server's finished page against a loading placeholder and discard the tree. So
`src/main.tsx` resolves the current route's chunk *before* hydrating and hands it
over ready. Every other route stays split for client-side navigation.

**Structured data is generated from the same records the page renders.** Project
data lives in `src/data/projects.json`, read by both the React components and the
build script, so the `ItemList` of `CreativeWork` on `/projects` cannot drift
from what a visitor sees.

## Stack

| | |
|---|---|
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Routing | React Router 7 |
| Build | Vite 7, plus an SSR pass for prerendering |
| Forms | React Hook Form + Zod |
| Email | Resend, via a Vercel serverless function |
| Hosting | Vercel |

Type is Instrument Serif for display, Inter for UI, JetBrains Mono for accents —
all self-hosted via `@fontsource`, so the site makes no third-party requests at
runtime.

## Getting started

```bash
npm install
npm run dev          # Vite dev server on :5173
```

The contact form posts to `/api/contact`, a Vercel serverless function. The Vite
dev server does not run it — use the Vercel CLI to exercise both together:

```bash
npm i -g vercel      # one-time
vercel dev           # serves the SPA and the api/ routes
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Used by | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | `api/contact.ts` | Get one at <https://resend.com/api-keys> |
| `CONTACT_TO_EMAIL` | `api/contact.ts` | Inbox that receives submissions |
| `CONTACT_FROM_EMAIL` | `api/contact.ts` | Verified sender on a domain added to Resend |

For production, set the same variables in the Vercel dashboard for both the
Production and Preview environments.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck, client build, SSR build, then prerender |
| `npm run preview` | Serve the built output locally |
| `npm run lint` | ESLint across the repo |

`npm run build` runs four steps in order. The last one, `scripts/prerender.mjs`,
is where the static HTML and `sitemap.xml` are written — it throws rather than
emitting an empty page if the shell's markers are missing, because a silently
empty build still looks correct in a browser.

## Project structure

```
api/                    Vercel serverless functions (contact form)
scripts/prerender.mjs   Build step: per-route HTML, JSON-LD, sitemap
src/
  components/
    common/             Button, SeoSync, ScrollToTop, ThemeToggle
    layout/             Sidebar, NavigationDrawer, Footer, Layout
    sections/           Homepage sections
  context/              Theme provider
  data/projects.json    Project records — read by the app and the build
  pages/                Home, About, Projects, Contact, NotFound
  seo/pages.json        Per-route titles, descriptions, schema types
  entry-server.tsx      Build-time render entry
  routes.tsx            Route table, with page components injected
```

## Editing content

Most changes do not need a component touched:

- **Projects** — `src/data/projects.json`. A project with `liveUrl` renders as a
  link; with `pendingRelease` it shows a release note; with `note` it explains
  why there is nothing to link. `reference` points at something the client built,
  never presented as Saqib's own work.
- **Page titles and descriptions** — `src/seo/pages.json`.
- **Colours and type** — the `@theme` block in `src/index.css`. The neutral and
  accent ramps are defined once there, so a palette change is one file.

> **Note on the accent colour.** Amber is bright, so white-on-amber fails WCAG AA
> badly (2.15:1). Dark text on `accent-500` measures 9.20:1. Any new element on
> an amber background takes `text-gray-950`, never white.

## Licence

[MIT](LICENSE) © Saqib Ali Javaid

The code is MIT. The content — copy, photography, project write-ups and the
personal brand — is not; please do not republish the site as your own.
