# Content guide

Most changes to this site do not need a component touched. This is where the
content and the design tokens live, and the rules that govern them.

## Projects — `src/data/projects.json`

One record per project, rendered on two surfaces that read different fields:

| Field | Used by | Notes |
| --- | --- | --- |
| `slug` | both | DOM `id` on `/projects` **and** the `CreativeWork` `@id` in JSON-LD. Changing it breaks an anchor and a structured-data reference. |
| `name` | both | Heading |
| `tagline` | both | Small uppercase eyebrow. Barq Dev work leads with `Barq Dev · …` |
| `summary` | homepage | Short form for the card |
| `description` | `/projects` | Long form |
| `bullets` | `/projects` | Technical highlights |
| `stack` | `/projects` | Full technology list |
| `featuredStack` | homepage | Trimmed list — the card is narrower |
| `icon` | both | **String key** into the lucide map in `projects.ts`, which throws on an unknown name |

### Status fields — declared, never inferred

A project's state is explicit. Do not infer "unreleased" from a missing URL.

| Field | Meaning | Rendering |
| --- | --- | --- |
| `liveUrl` + `liveLabel` | Saqib's own work, reachable now | Link; card becomes an `<a>` on the homepage |
| `reference` | Something related he **did not build** — a client's own marketing site | Link shown *beside* the status, never instead of it |
| `pendingRelease` | Built, shipping shortly | Amber pill with a rocket. Forward-looking. |
| `note` | Neither linkable nor on the way | Grey text with a lock. Backward-looking. |

`reference` exists because of HomeFlash: Saqib built the apps, not
`homeflashpro.com`. Using `liveUrl` would have claimed someone else's site as his
work *and* implied the apps had shipped. A project with only a `reference` still
reads as unreleased on both surfaces.

A project with **no** `liveUrl` renders as a `<div>` on the homepage, not an
`<a>`. An anchor without an `href` is neither focusable nor announced as a link.

### When a project goes live

Add `liveUrl` and `liveLabel`, remove `pendingRelease`. Both surfaces switch to
the linked treatment on their own. No component changes.

### Current link decisions, and why

| Project | Link | Reasoning |
| --- | --- | --- |
| Garage Queens | **none** | `app.garagequeens.co.uk` redirects to `/login`. The sign-in screen is his work, but it demonstrates nothing the card describes — sending a recruiter to a password field spends their click for nothing. |
| HomeFlash | `reference` only | He built the apps, not the marketing site |
| Julian Varel | `julianvarel.com` | The brand site is his. `portal.julianvarel.com` is deliberately **not** linked — it is a client login and does not belong in a portfolio. |
| Services Hub | `serviceshub.site` | Live, his own independent work |
| NOVOSOLS | **none**, with `note` | `novosols.com` now serves an entirely different business, so the link showed a visitor someone else's site under his name |
| ZEFTON | `zefton.vercel.app` | Live |
| AI Outreach Automation | Fiverr listing | Shows client feedback |

## Page metadata — `src/seo/pages.json`

Titles, descriptions, social copy, schema type and breadcrumb label per route,
plus site-wide identity (`sameAs`, `knowsAbout`, `alumniOf`). Length rules and
the reasoning are in [SEO.md](SEO.md#copy-rules).

## Design tokens — `src/index.css`

Everything visual is defined once in the Tailwind v4 `@theme` block.

### Type

| Role | Family | Weights shipped |
| --- | --- | --- |
| Display | Instrument Serif | **400 only** |
| UI / body | Inter | 400, 500, 600, 700 |
| Mono / accents | JetBrains Mono | 400, 700 |

**Every `font-display` heading must be `font-normal`.** Only weight 400 is
loaded, so `font-bold` triggers faux-bold synthesis, which looks bad on a
high-contrast serif. `.font-display` also carries `letter-spacing: -0.02em`
because Instrument Serif is loose at display sizes.

The serif-plus-mono pairing is deliberate: it reads as a person who writes and
builds, and it is intentionally unlike the geometric sans on vistalabs.tech so
the two properties are not mistaken for each other.

### Colour

The `gray` ramp is **overridden to warm stone** rather than renamed — these are
still neutrals, so the class names stay honest and every existing `gray-*`
utility picks up the warmer tone. The accent is amber.

### The amber contrast rules — do not guess these

Amber is bright, so the intuitive choices fail. All measured:

| Use | Correct value | Ratio |
| --- | --- | --- |
| Button background | `accent-500` + `text-gray-950` | 9.20:1 |
| Text on light | `accent-700` | 5.02:1 |
| Text on dark | `accent-400` | 11.83:1 |
| Display gradient | `accent-600` and darker | 3.19:1+ (large-text AA) |
| **Anything on an amber background** | **dark text, never light** | white is only **2.15:1** |

That last row has caused the same bug three times:

1. The CTA section kept pale text through the palette migration and dropped to
   **1.72:1**.
2. The Contact submit button, the 404 button and three icon tiles were still
   white on amber months later. Text needs 4.5:1; icons need 3:1. All were at
   2.15:1.

**Lighthouse will not catch the icon cases** — axe only evaluates contrast on
text nodes, so white glyphs on amber are invisible to it. And a homepage-only
Lighthouse run never loads `/contact` or the 404 page.

Whenever a hue changes, re-check everything that relied on the old luminance.

### Motion

A `prefers-reduced-motion: reduce` block disables `animate-fade-in-up` and
`animate-pulse`. Anything new that moves indefinitely must be added to it.

The tech marquee that originally forced this rule is gone — it is a static grid
now. See [DECISIONS.md](DECISIONS.md).

## Experience and About content

These are still arrays inside components, not JSON:

- `src/components/sections/Experience.tsx` — the four roles
- `src/pages/About.tsx` — `certifications`, education, the values cards, the
  "By the numbers" tiles

Worth moving to `src/data/` if they change often. They have not yet.

## Copy conventions

- **"Built at Barq Dev"**, not "client work". Garage Queens, HomeFlash and Julian
  Varel are **Barq Dev's clients**, engaged through employment — not Saqib's own.
  The site said "Client work" for a while, which on a personal portfolio reads as
  his own clients. See [STATUS.md](STATUS.md) for the open permissions question.
- **"Built for"**, not "shipped for**,** where a project is pre-launch. Two of
  the three Barq Dev products have not released.
- Don't claim a technology the site cannot evidence somewhere else. The stack
  list was cut partly because Django, Kotlin, MySQL, Docker and Linux appeared
  nowhere else on the site — a badge with nothing behind it is a question that
  cannot be answered in an interview.
