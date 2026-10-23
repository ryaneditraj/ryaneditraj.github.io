# Handoff

23 October 2026. Branch `cursor/personal-internet-fa6c`. Nothing was deployed. The previous site is gone from this branch and still in git history (`main` and earlier commits).

## What was built

A new Next.js 15 App Router site in TypeScript. Content is JSON in `content/`, checked with Zod on every read. Public pages show `status: "published"` only. Drafts 404. There is no database.

The design is the hybrid described in `docs/design-direction.md`: editorial paper and serif type, a Swiss numbered spine, one stamp-red action. Three prototypes were screenshotted before this choice. Production CSS does not import those files.

### Pages

One identity, shared content, no second thin copy of a page.

| Path | Role |
| --- | --- |
| `/` | Who he is, what he builds, how to collaborate, now |
| `/about` | Longer account, with sources |
| `/links` | Phone bio. Short list, light footer |
| `/work`, `/work/[slug]` | Featured projects |
| `/lab`, `/lab/[slug]` | Lab pieces. Featured lab work redirects to `/work/[slug]` |
| `/past-projects`, `/building` | Finished and active, plus related public sites |
| `/tools` | Empty on purpose. No first-party tool URL returned HTTP 200 |
| `/open-source` | Original repos, stars as fetched 23 October 2026, lane filter |
| `/notes`, `/notes/[slug]` | Only the colophon, bylined as the site |
| `/resources` | Empty shelf |
| `/bookmarks` | His public properties, not a reading list. Category and tag filters |
| `/uses` | Linux verified. Editor, terminal, hardware are blanks |
| `/playbooks`, `/playbooks/[slug]` | How to use the collaboration form |
| `/dispatches` | Signup disabled until Resend is configured |
| `/build`, `/learn`, `/learn/start` | Products, explanations, and a path for someone new to tech |
| `/journey` | Dated public facts. School name omitted. A hackathon place is not stated |
| `/now` | Building in public, and posting again on X |
| `/press` | Empty |
| `/media-kit`, `/media-kit/download` | Dated profile counts, plus his statements kept separate |
| `/services` | Building is published. Fees unset. The explanation lane is archived |
| `/collaborate` | Inquiry. Validated. Not sent without Resend |
| `/mentorship`, `/mentorship/book` | Not open. Example slots. Button disabled |
| `/contact` | Switchboard. Not a second form |
| `/community`, `/portal` | Refusal pages. No fake activity |
| `/directory` | Full index |
| `/privacy`, `/terms` | Practical descriptions. Lawyer-review banners |
| `/admin` | Server-gated. Unconfigured without env |
| 404 | Designed |

Also: `sitemap.xml`, `robots.txt`, `llms.txt`, generated Open Graph and Twitter images, `POST /api/webhooks/stripe`, `POST /api/webhooks/razorpay`.

### Projects that are listed

Verified from the GitHub API and repository pages on 23 October 2026. Dates are `created_at`, not `pushed_at` (many repos were touched in bulk that day). Stars are low and dated; they are on the open-source table, not in the media kit.

Featured, with a page under `/work`: Indiquant, trading-ai, TuitionOS, CBSE Physics Predictor, helmet detection, LayoverBuddy.

Lab, under `/lab` unless also featured: KL-ctf (one sentence, no procedure), Keeb keyboard, Exam Strategy Studio, Travel Personality Analyzer, Space 3D site.

Archive or open source only, linking to GitHub, no detail page: waffles-site, The CLI Restaurant, Word Counter, Restaurant Flask (description only; README 404), Stock Profit Calculator, Letter Game, Number Guessing Game, Old-Portfolio.

Not listed: placement-karo, roomgpt, Coducher, forks (including esp32-deauther), Hacktoberfest dumps, the profile-readme repo, this github.io repo, John-Doe-Portfolio, essentials. See `docs/needs-ryan-input.md`.

Helmet detection and KL-ctf stay high-level. No deployment guide, no challenge steps.

### Forms and money

- Collaboration: server validation, honeypot, in-process rate limit, optional Turnstile (fail closed if the secret is set), Resend only when configured. If email is not configured, the success state says nothing was sent and gives `ryaneditraj@gmail.com`.
- Dispatches: disabled unless `RESEND_API_KEY` and `RESEND_SEGMENT_ID` are set.
- Booking: holds and conflicts exist in `lib/bookings.ts`. The public offering is a draft, so `createHold` refuses and the button is disabled. A return URL never marks a booking paid. Stripe and Razorpay webhooks verify signatures and amounts. Those paths are unit-tested with fixture signatures. They were not called against live Razorpay or Stripe. No credentials were present.
- Admin: no default password. Without `SESSION_SECRET` and `ADMIN_PASSWORD` the login page says it is not configured. Writes need `CONTENT_WRITABLE=true`. A signed-in create/edit/delete click-through was not performed.

### SEO

Documented in `docs/seo.md`. `SITE_URL` overrides the origin. A production build with it unset uses `https://ryaneditraj.vercel.app`. Local development uses `http://localhost:3000`. `ryaneditraj.tech` did not resolve on this date.

## Tests that were run

After the shell stopped calling `headers()`, on 23 October 2026:

- `npx tsc --noEmit` — clean
- `npx next lint` — clean (Next 16 will drop `next lint`; this project is still on 15.5.28)
- `npx next build` — succeeded, 57 pages. `/`, `/links`, and `/collaborate` are static. `/open-source`, `/bookmarks`, `/mentorship/book`, and `/admin` stay dynamic because they read the query string or a session.
- `npx vitest run` — 11 passed, 11 total (`tests/unit/core.test.ts`)
- `npx playwright test` — 8 passed, 8 total (`tests/e2e/site.spec.ts`)

Playwright covered: home headings, designed 404, `/gallery.html` redirect to `/`, collaborate empty-field errors and a valid submit that says nothing was sent, disabled dispatches, `/admin` redirect to a not-configured login, disabled booking control, robots.txt containing GPTBot and Googlebot and a sitemap line, sitemap containing `/work/indiquant` and omitting `/admin` and `/portal`, axe with zero violations on `/`, `/about`, `/links`, `/work`, `/collaborate`, `/directory`, `/media-kit`, `/mentorship/book`, `/open-source`, and horizontal overflow of at most 1px at 360, 390, 768, 1280, and 1600 on the representative set. Below 768 the inline nav is hidden and the menu button is visible; at 768 and above the reverse is true.

### Lighthouse

Lighthouse 12.8.2, Playwright Chromium (`chromium-1248`), production `next start` on `127.0.0.1:3000`, mobile default, 23 October 2026. Measured after the description was confirmed inside the initial `<head>` (curl of `/` shows `<title>` and `<meta name="description">` before `</head>`).

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Speed index | TTI |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 94 | 100 | 100 | 100 | 1.4 s | 2.9 s | 90 ms | 0 | 1.4 s | 3.0 s |
| `/build` | 94 | 100 | 100 | 100 | 1.4 s | 2.9 s | 100 ms | 0 | 1.4 s | 3.0 s |
| `/learn` | 96 | 100 | 100 | 100 | 1.4 s | 2.6 s | 90 ms | 0 | 1.4 s | 3.0 s |

An earlier run on the same day, before that change, scored SEO 91 on all three pages. The only failing audit was `meta-description`. The tag was in the response but streamed outside `<head>`, because the shell called `headers()`. No other SEO audit failed in that run. JSON for the remeasure was written to `/tmp/lh/{home,links,collaborate}.json` on the build machine and is not in git.

### Visual QA

Playwright wrote full-page screenshots to `/opt/cursor/artifacts/visual/` for home, build, learn, start, contact, about, links, and work, at 360, 390, 768, 1280, and 1600, plus `menu-390.png` and `collaborate-reduced-motion-390.png`. Prototype comparisons are in `docs/design/` and `/opt/cursor/artifacts/design/`.

The screenshot set was regenerated by the passing Playwright run after the nav change. The mobile menu lists the primary nav only. “Index” already goes to `/directory`, so the menu does not add a second “Full index” row. The footer still links to the full index.

What was checked in code and by the assertions, not only by looking at pictures: no horizontal overflow beyond 1px, nav swap at 768, menu dialog Escape, reduced-motion screenshot of the form, stacked tables below 64rem with `data-label`s, errors outside form labels.

## Known limits

- No live email, payment, Turnstile, or analytics credentials. Those integrations are coded and unexercised against the vendors.
- Admin CRUD was not click-tested with a password.
- Rate limiting is in-memory. Booking state is a file with a process lock. Neither survives multiple instances or a read-only serverless disk.
- `CALCOM_LINK` is documented and not called.
- `/open-source`, `/bookmarks`, and `/mentorship/book` read the query string, so their metadata can still be streamed. Admin reads a session. The pages Lighthouse measured are static.
- The links page still ships the shared client navigation. It is visually light. It is not zero JavaScript.
- Production build, 23 October 2026: first-load JavaScript is 107 kB on `/` and `/links` (103 kB shared). Collaborate is 110 kB (4.06 kB page). Dispatches 108 kB (1.64 kB). Booking 108 kB (1.71 kB). Admin login 108 kB (1.48 kB).
- `npm audit` reported 10 vulnerabilities in the dependency tree (2 moderate, 6 high, 2 critical). They were not triaged or patched.
- Services have `TODO(Ryan)` fees. Mentorship is not open. The newsletter is disabled. The portal and community are not launched. There is no portrait.
- TuitionOS and the Indiquant deep link returned HTTP 404. MoneyRadar’s homepage and thugirlabs.com returned 200. Roles are unconfirmed. See `docs/needs-ryan-input.md`.
- The old gallery photographs were not migrated. That was intentional.

## Deploy

`docs/deployment.md` and `docs/seo.md`. Short version: Vercel or another Node host. `SITE_URL` overrides the origin; a production build with it unset uses `https://ryaneditraj.vercel.app`. Do not static-export, and do not point GitHub Pages at this app.
