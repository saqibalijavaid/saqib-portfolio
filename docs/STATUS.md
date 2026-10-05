# Status

**Last updated: 2026-10-05.** The most volatile document here — check it first.

Supersedes the old local-only `PENDING-FOR-SAQIB.md`, which was in a gitignored
directory and would not have survived a fresh clone.

---

## Where things stand

The site is live at <https://saqibalijavaid.me> and current. Verified in
production on 2026-10-05:

| Check | State |
| --- | --- |
| Prerendered text per route | 696 / 759 / 314 / 96 words |
| JSON-LD | Present and parseable on all four routes |
| Canonicals | Correct, self-referencing |
| `sitemap.xml` | Live, `lastmod` from build date |
| `/projects/` → `/projects` | 308 |
| `www` → apex | 308 |
| Security headers | All present |
| Hydration | Zero console output on all four routes |
| CI | Passing |

---

## Open items

### Needs Saqib, not code

| # | Item | Effort |
| --- | --- | --- |
| 1 | **Confirm Barq Dev is happy with client names published** — see below | 5 min conversation |
| 2 | **Bing Webmaster Tools** — *Import from Google Search Console*. Feeds ChatGPT Search and Copilot. | 5 min |
| 3 | **Re-scrape social caches** — LinkedIn Post Inspector, X Card Validator, Facebook Sharing Debugger. Nothing had ever cached a card before the OG image existed. | 3 min |
| 4 | **Send a test message through `/contact`** and confirm it arrives. The form logic was untouched, but the button and page around it changed, and it has not been exercised end to end since. | 2 min |
| 5 | **Monitor Search Console** — indexing was requested for all four URLs on 2026-10-05. Watch for pages moving to *Indexed*, and for "Duplicate without user-selected canonical". | ongoing |

#### The client-names question

**This is the one item with a real downside and it is unresolved.**

Garage Queens, HomeFlash and Julian Varel are named on the public, indexed site,
along with technical detail: that HomeFlash uses anonymous per-device identity
with hashed-identifier quotas, that Julian Varel's portal uses argon2id with
server-enforced RBAC, that Garage Queens sits behind a Django API.

Saqib instructed this explicitly. But the instruction was given when the
assumption was that these were *his* clients. They are **Barq Dev's** clients,
engaged through employment — so publishing them is not solely his call. Many
agencies treat client names as confidential by default; some have explicit
clauses. Barq Dev may well be glad of the publicity, but that is their decision.

Two risks, neither about Saqib's competence: permission, and the fact that the
architectural detail is sharper than the names and is the kind of thing a client
notices.

If it needs reversing, the change is contained: `tagline`, `name`, `summary` and
`description` for three records in `src/data/projects.json`. Anonymous phrasing
("a UK premium car storage company", "an AI home repair app", "a private luxury
brand") keeps every technical detail, which is what actually demonstrates
ability. "Led frontend on a 64-route React Native app across three surfaces" is
the claim that gets him hired; the client's name is not doing much work.

### Code

| # | Item | Notes |
| --- | --- | --- |
| 1 | **No automated tests** | The biggest gap. Vitest and Playwright are already claimed as skills on the site, so adding a real suite is both useful and on-message. |
| 2 | **Re-measure Lighthouse** | Scores on record (Perf 94 / A11y 100 / BP 100 / SEO 100) predate the SSG work and the security headers. |
| 3 | **Homepage grid is 7 cards** → renders 3 + 3 + 1 with a lone trailing card. Could curate the homepage to a featured 6 and keep all 7 on `/projects`, but that silently hides one. |
| 4 | **About page is off-palette** | Purple and green icon tiles and green terminal text, outside the stone + amber system. The one page where the identity leaks. |
| 5 | **About "By the numbers"** runs 1.5+ / 20+ / 5★ / **React** — the fourth tile is not a number. |
| 6 | **Experience ordering** is not consistently reverse-chronological: the KeepCoders internship (Mar–Apr 2025) sits below a Dec 2023–Present entry. |
| 7 | **`src/App.css` is empty** and imported nowhere. Safe to delete. |
| 8 | **Soft 404** | Unknown URLs return HTTP 200 with `noindex`. A real 404 status would need a serverless catch-all. |
| 9 | **Contact rate limiting is per-instance** | In-memory `Map` in a serverless function. Raises the cost of casual abuse, nothing more. Real limiting needs shared storage. |

### Content questions outstanding

- **`mattar-fe.vercel.app`** appears in `Saqib_Reume.pdf` but on no version of
  the site. Another project worth adding?
- **How were NOVOSOLS and ZEFTON engaged?** They predate Barq Dev and currently
  carry purely descriptive taglines. If they were freelance, say so.
- **Zapier has no on-site evidence.** It is in the stack grid on Saqib's word
  alone; n8n points at a Fiverr listing and Selenium at the Mavericks entry. A
  line in a project or experience entry would give it the same footing.
- **Certificate "Verify" links** are wired up. The issuer spells the second one
  "Introduction to subagents" (lowercase s); the site uses title case to match
  the resume.
- **The resume being sent out** (`Saqib_Ali_Javaid_Frontend_Engineer.pdf`) has no
  project URLs at all — they exist only in the older `Saqib_Reume.pdf`.
- **homeflashpro.com advertises the app as downloadable now**, which contradicts
  "apps launching soon". Worth checking with the client.

---

## Recently completed

Reverse-chronological. Full reasoning in `git log` and
[DECISIONS.md](DECISIONS.md).

**2026-10-05**
- Prerendered page markup, not just the head — 0 → 696/759/314/96 crawlable words
- Rewrote all metadata, added the per-page `@graph`, generated the sitemap
- Fixed `vercel.json` schema violation that had been failing every deploy
- README rewritten; CI added with prerender assertions
- Repo metadata fixed: homepage URL, 15 topics, description, wiki disabled
- Search Console verified, sitemap submitted (Success, 4 pages), indexing
  requested for all four URLs

**2026-10-04**
- Scroll reset on navigation; five white-on-amber contrast failures fixed;
  `prefers-reduced-motion`; marquee → static grid
- Site brought up to the current resume: Julian Varel added, Barq Dev role
  description corrected, certifications replaced
- Attribution corrected to "built at Barq Dev"
- Services Hub added; NOVOSOLS unlinked; project links and status fields
- LinkedIn embed badge → native profile card
- Project data deduped into `src/data/projects.json`
- Stale `vistalabs-website` naming removed from README and `package.json`

**Earlier** (see `git log`): SEO foundation, own visual identity, OG card,
code-splitting, 404 page, three-domain canonical consolidation, honeypot fix.

---

## Historical context worth keeping

**What was originally wrong, found in September 2026:**

- **Three domains, no redirects, no canonical.** `saqibalijavaid.me`,
  `www.saqibalijavaid.me` and `saqib-ali-javaid.vercel.app` all served the site
  with a 200. Google saw three complete copies.
- **`robots.txt` and `sitemap.xml` returned HTTP 200 with HTML.** Neither file
  existed; the catch-all rewrite answered for them. Nastier than a 404, because
  every checking tool reports them present while Google receives a webpage where
  it expects a sitemap.
- **Two `<h1>` elements per page.** The rotated sidebar brand was a heading
  competing with the real page title.

All fixed. They are recorded because they are the kind of thing that creeps back.
