> **Archived 2026-10-05 — superseded by [docs/STATUS.md](../STATUS.md).**
>
> This was a local-only working note from 2026-09-13, kept because `docs/` was
> gitignored at the time. Its content has been folded into STATUS.md,
> DECISIONS.md and CONTENT-GUIDE.md. It is preserved verbatim below as a
> point-in-time record; **do not treat it as current** — several items listed
> as pending have since been done, and the Lighthouse scores predate the
> static-rendering work.

---

# Pending — Action Items for Saqib (portfolio)

**Local-only working doc.** `docs/` is gitignored.
Companion to the same file in the Vista Labs repo — this one covers
`saqibalijavaid.me` only.

Last updated: 2026-09-13

---

## Status at a glance

| # | Item | Status |
|---|---|---|
| — | Three-domain duplicate content | ✅ fixed — 308s to the apex |
| — | Per-page titles, descriptions, canonicals | ✅ done |
| — | `robots.txt` + `sitemap.xml` | ✅ real files now |
| — | Open Graph card | ✅ built around the headshot |
| — | `Person` structured data | ✅ done |
| — | 404 page | ✅ added |
| — | Headshot in the hero | ✅ 1 MB → 100 KB |
| — | Own visual identity | ✅ done |
| — | Repositioned to frontend engineer | ✅ done |
| — | Two pre-launch client projects | ✅ live |
| — | Accessibility | ✅ **100** |
| — | Lint | ✅ clean |
| **1** | **Re-scrape social caches** | ⬜ **~3 min** |
| **2** | **Google Search Console** | ⬜ **~15 min** |
| **3** | **Bing Webmaster Tools** | ⬜ ~5 min |
| 4 | Contact form — verify it still sends | ⬜ ~2 min |
| — | DMARC / email | n/a — this domain sends no mail |

Nothing on the engineering side is blocked.

---

# ⬜ Remaining

## 1. Re-scrape the social caches
**~3 min · nothing has ever cached a card for this domain**

The site previously had **no** Open Graph image, so shared links rendered as a
blank grey box. Now there is a card. Push the platforms to fetch it:

- **LinkedIn Post Inspector** — paste `https://saqibalijavaid.me`, it re-scrapes
  automatically
- **X Card Validator**
- **Facebook Sharing Debugger** → *Scrape Again*
- Or simply paste the link into a WhatsApp chat with yourself

Expect the dark card with your portrait, name and stack chips.

## 2. Google Search Console
**~15 min · highest value item left**

The portfolio has never been submitted. Until recently it was also serving on
three domains at once, so whatever Google did index was split across them.

1. [search.google.com/search-console](https://search.google.com/search-console)
   → *Add property* → choose **Domain**, enter `saqibalijavaid.me`
2. Add the TXT record it gives you at your registrar
3. Once verified, submit `https://saqibalijavaid.me/sitemap.xml`
4. Use **URL Inspection → Request Indexing** on the four main pages

Every page's title and description changed when the site was repositioned
around frontend work, and `/projects` gained two more projects on top of that.
Whatever Google currently holds for this domain describes the old
full-stack-and-automation positioning, so re-indexing matters more than it
would for a routine copy tweak.

> Tell me when the property is verified and I will check the crawl results and
> confirm the canonical consolidation is being picked up.

## 3. Bing Webmaster Tools
**~5 min if done straight after**

[bing.com/webmasters](https://www.bing.com/webmasters) → **Import from Google
Search Console**. Bing's index feeds ChatGPT search and Copilot.

## 4. Verify the contact form still sends
**~2 min**

The form was not touched in this work, but the site around it changed a lot.
Send yourself a test message through `/contact` and confirm it arrives.

`RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` are already set in
Vercel for this project — they were configured before this session.

---

# 📌 Notes worth keeping

## What was actually wrong

**Three domains, no redirects, no canonical.** `saqibalijavaid.me`,
`www.saqibalijavaid.me` and `saqib-ali-javaid.vercel.app` all served the site
with a 200. Google saw three complete copies and had to guess which was real.

**`robots.txt` and `sitemap.xml` returned HTTP 200 — with HTML.** Neither file
existed; the catch-all rewrite answered for them. This is nastier than a 404,
because every checking tool reports them as present while Google receives a
webpage where it expects a sitemap.

**Two `<h1>` elements per page.** The sidebar brand was a heading competing with
the real page title. Found by accident when a measurement script grabbed a 32px
wide, 232px tall element — the rotated vertical brand.

## Lighthouse — live at saqibalijavaid.me

| Category | Score |
|---|---|
| Performance | 94 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

CLS 0, TBT 10 ms. LCP 2.6 s under simulated slow-4G mobile throttling.

## The visual identity, and why

The portfolio and vistalabs.tech were the same template. A prospect seeing both
would notice, and it made the personal site read like a second company site.

- **Display: Instrument Serif.** Editorial, human — against the geometric sans
  on the company site. JetBrains Mono for the `//` sublines keeps the developer
  signal so the serif does not read as "not technical".
- **Single 400 weight**, so every display heading must be `font-normal`.
  `font-extrabold` triggers faux-bold synthesis, which looks bad on a
  high-contrast serif. Worth remembering before adding headings.
- **Warm stone neutrals + amber accent**, as token overrides in `src/index.css`
  rather than scattered classes. Future palette changes are one file.

### The amber contrast rules — do not guess these

Amber is bright, so the intuitive choices fail:

| Use | Correct value | Ratio |
|---|---|---|
| Button background | `accent-500` + `text-gray-950` | 9.20:1 |
| Text on light | `accent-700` | 5.02:1 |
| Text on dark | `accent-400` | 11.83:1 |
| Display gradient | `accent-600` and darker | 3.19:1+ (large-text AA) |
| **Anything on an amber background** | **dark text, never light** | white is only 2.15:1 |

That last row caused a real bug: the CTA section kept its original pale text
through the migration and dropped to **1.72:1**. Whenever a hue changes,
re-check everything relying on the old luminance.

## The two pre-launch projects

They are text-only by your instruction — no client names, screenshots, links
or dates. Worth knowing how that is implemented, because it decides what
happens when they do launch:

`liveUrl` and `liveLabel` are **optional** on the project type. A project
without them renders a "Not yet public" marker instead of a link, and on the
homepage renders as a `<div>` with a "Pre-launch" pill rather than an `<a>` —
an anchor with no `href` is not focusable and is not announced as a link, so
it would have been an accessibility regression to leave it as one.

**When either project goes live, the only change needed is adding `liveUrl`
and `liveLabel`.** Both surfaces switch to the linked treatment on their own.

## Things deliberately not done

- **No analytics.** Vercel Analytics is not installed on this project. Say the
  word if you want it — note the Hobby tier has no custom events.
- **No blog or case studies.** If that changes, the same Next.js question
  applies here as on Vista Labs.
- **The About page LinkedIn badge** loads a third-party script on every visit to
  that page. It works, but it is the slowest thing on the site.
