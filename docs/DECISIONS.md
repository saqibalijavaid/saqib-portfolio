# Decisions

Why things are the way they are, including things that were tried and abandoned.
Roughly chronological. The reasoning is the point — the code is already visible.

---

## Positioning: frontend, not full-stack

**Decision:** The site presents Saqib as a **frontend engineer** — React Native,
React, Next.js — not as a full-stack or automation generalist.

**Why:** He is applying for remote frontend roles. A page claiming breadth
competes for nothing in particular.

**What it cost:** Real work had to be pushed into the background. Python, Flask,
FastAPI and Selenium are genuine and still appear in the Mavericks United
experience entry, but not in the stack display. The n8n automation project stays
because it is unusual and has a live Fiverr listing behind it.

**Watch for:** Reintroducing breadth by accident. Every added backend badge
dilutes the message.

---

## Visual identity separate from vistalabs.tech

**Decision:** Instrument Serif display, JetBrains Mono accents, warm stone
neutrals, amber accent.

**Why:** The portfolio and vistalabs.tech were the same template. A prospect
seeing both would notice, and it made the personal site read like a second
company site. The serif reads human and editorial; the mono keeps the developer
signal so the serif does not read as "not technical".

---

## The tech stack list: marquee → static grid, 22 badges → grouped set

**Decision:** Replaced a two-row infinite marquee with a static grouped grid, and
cut the list to technologies evidenced elsewhere on the site.

**Why the content changed:** Django, Kotlin, MySQL, Docker and Linux appeared
nowhere else — no project, no experience entry. A badge with nothing behind it is
a question with no answer. Meanwhile the six most current and most on-message
tools (Supabase, Expo Router, PostgreSQL, TanStack Query, Zustand, Deno Edge
Functions) were described in detail on `/projects` and **missing from the section
whose entire job is to list the stack**.

**Why the marquee went:** Its only benefit was motion. Its costs were real:

- **No control over what is seen.** A captured frame showed nine consecutive
  backend and infra badges and not one frontend item — directly beneath a caption
  reading "Frontend first".
- **WCAG 2.2.2 (Pause, Stop, Hide).** It moved indefinitely. The
  `group-hover:paused` class meant to stop it compiled to *zero CSS* — `paused`
  is not a Tailwind utility — so it never paused. Verified by hovering for four
  seconds and watching a badge travel ~500px.
- **No keyboard equivalent.** The badges are not focusable, so hover-pause could
  never have been a complete fix.

A grid also communicates the *shape* of the stack, which a scrolling line cannot.

**Later addition:** Docker came back when the resume evidenced it. Selenium came
back too — removing it was a misjudgement; it is evidenced twice over, and the
real problem had been the four backend badges around it.

---

## Project data moved to JSON

**Decision:** `src/data/projects.json` holds the records; `projects.ts` adds types
and icons.

**Why:** Two surfaces (homepage, `/projects`) previously held **separate copies**
that had already drifted — the stacks disagreed and only one declared a
`liveLabel`. Then the structured-data work needed the same records at build time,
and `scripts/prerender.mjs` is plain Node and cannot import TypeScript.

Structured data that disagrees with the visible page is worse than none. Making
disagreement impossible beat making it unlikely.

---

## Prerendering the body, not just the head

**Decision:** Render every route to static HTML at build time.

**Why:** Every page shipped `<div id="root"></div>` and nothing else. Googlebot
renders JavaScript and coped; LLM crawlers largely do not, and they increasingly
decide whether a portfolio is found at all.

**Alternatives rejected:**

- **Migrate to Next.js.** Correct for a content site; disproportionate here.
  Four static pages do not need a framework, and the migration risk outweighed
  the benefit.
- **A prerendering service.** Adds a dependency and a cost for something the
  build can do in ~300 ms.

**What it cost:** Three non-obvious constraints, all documented in
[ARCHITECTURE.md](ARCHITECTURE.md). Each was discovered the hard way via
`Minified React error #418`.

---

## Routes take their page components as a prop

**Decision:** `src/routes.tsx` exports `AppRoutes({ pages })`. The browser passes
lazy components; the build passes direct imports.

**Why:** The two renderers genuinely need different components for the same
paths. The browser wants code splitting — `Contact` alone is 89 kB because of
React Hook Form and Zod. The build must avoid `lazy()` entirely, because React
serialises a suspended boundary into a `<div hidden>` that only a script can
reveal, which would hide every page from exactly the crawlers the prerender
exists to serve.

**Alternative rejected:** Two separate route tables. Duplicating the paths is
precisely the kind of drift the projects.json change was undoing.

---

## LinkedIn embed badge → native profile card

**Decision:** Removed `platform.linkedin.com/badges/js/profile.js` and rebuilt the
card from assets already on the page.

**Why:** LinkedIn put an end date on the embed, so it had started rendering a red
*"this feature will no longer be available on 12/12/2026"* notice to every
visitor — on a portfolio that reads as something broken. It was also the slowest
thing on the site and the only third-party request.

**What it cost:** The headline no longer syncs from LinkedIn. It is static text
in `About.tsx` and changes about as often as the rest of the page.

**Bonus:** The site now loads no third-party scripts at all, which is why there
is no CSP to maintain.

---

## Attribution: "built at Barq Dev"

**Decision:** Garage Queens, HomeFlash and Julian Varel are labelled as Barq Dev
work, not as Saqib's own clients.

**Why:** They *are* Barq Dev's client relationships, engaged through employment.
The site labelled all three "Client work", which on a personal portfolio reads as
his own clients or freelance engagements. The resume gets this right by nesting
them under the Barq Dev role; flattening them into standalone projects lost it.

NOVOSOLS, ZEFTON and the n8n automation keep purely descriptive taglines — they
predate Barq Dev, but only the Fiverr listing confirms how they were engaged, and
claiming "freelance" for the others would swap one misattribution for another.

---

## Status fields instead of inferred state

**Decision:** `liveUrl`, `reference`, `pendingRelease` and `note` each declare
something explicitly. The old code inferred "not public" from a missing URL.

**Why:** HomeFlash broke the inference. Saqib built the apps, not
`homeflashpro.com`, and the apps have not shipped. One URL field could not
express "here is something related that I did not build, and my part is not out
yet" — using `liveUrl` would have claimed someone else's site *and* implied a
release.

Later the same pressure produced `note`, when NOVOSOLS' domain started serving a
different business entirely.

---

## Dead ends and mistakes worth remembering

**`vercel.json` comments broke production for hours.** Explanatory `"comment"`
keys were added beside the header config. Vercel validates that file against a
strict schema and rejects unknown properties, so every deploy failed — while
GitHub Actions stayed green, because CI never touches `vercel.json`. Production
silently served the pre-SEO build. **Validate with `npx vercel build` before
pushing**; it runs the same check.

**Two Tailwind classes compiled to nothing for months.**
`animate-fade-in-up` had no keyframes defined and `group-hover:paused` was not a
real utility. Both sat in the markup looking correct. Tailwind fails silently on
unknown classes — grep the built CSS when a visual behaviour seems absent.

**`vite preview` is not production.** It applies the SPA fallback and serves
`dist/index.html` for every route, ignoring the prerendered files. Hours were
spent chasing a hydration mismatch that was the test harness serving the homepage
at `/projects`. Use a filesystem-first static server.

**A strict `===` on pathname.** `NavigationDrawer` compared
`location.pathname === path`, so `/projects/` matched no link and showed no
active state — and because the build renders `/projects` while a browser might be
on `/projects/`, it also broke hydration. Normalised now, with
`trailingSlash: false` enforcing one URL shape at the edge.

**Verify links were recoverable, not lost.** The two Anthropic certificate URLs
were not in the resume PDF that was sent, but were in link annotations of an
older PDF. Each was fetched to confirm which credential it belonged to rather
than trusting annotation order — worth doing before publishing a credential link.

---

## Things deliberately not done

- **No analytics.** Vercel Analytics is not installed. Note the Hobby tier has no
  custom events.
- **No blog or case studies.** If that changes, the Next.js question reopens —
  content pages are where a framework starts paying for itself.
- **No Content-Security-Policy.** The site loads no third-party script, so a CSP
  would add maintenance for little gain, and one authored blind is a good way to
  break a deploy quietly.
- **No `<meta name="keywords">`.** Dead since 2009. See [SEO.md](SEO.md).
- **No automated tests.** The largest remaining gap — see
  [STATUS.md](STATUS.md).
