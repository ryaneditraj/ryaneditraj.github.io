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
| `/journey` | Dated public facts, including the school-bio conflict |
| `/now` | Placeholder quoting the profile README |
| `/press` | Empty |
| `/media-kit`, `/media-kit/download` | One metric, sourced. Markdown download |
| `/services` | Two services, no fees |
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

Documented in `docs/seo.md`. `SITE_URL` defaults to `http://localhost:3000`. The production domain is not hardcoded. `ryaneditraj.tech` did not resolve on this date.

## Tests that were run

On this tree, before the final metadata-head change described below:

- `npx tsc --noEmit` — clean
- `npx next lint` — clean
- `npx next build` — succeeded, 57 pages
- `npx vitest run` — 11 passed, 11 total (`tests/unit/core.test.ts`)
- `npx playwright test` — 8 passed, 8 total (`tests/e2e/site.spec.ts`)

Playwright covered: home headings, designed 404, `/gallery.html` redirect to `/`, collaborate empty-field errors and a valid submit that says nothing was sent, disabled dispatches, `/admin` redirect to a not-configured login, disabled booking control, robots.txt containing GPTBot and Googlebot and a sitemap line, sitemap containing `/work/indiquant` and omitting `/admin` and `/portal`, axe with zero violations on `/`, `/about`, `/links`, `/work`, `/collaborate`, `/directory`, `/media-kit`, `/mentorship/book`, `/open-source`, and horizontal overflow of at most 1px at 360, 390, 768, 1280, and 1600 on the representative set. Below 768 the inline nav is hidden and the menu button is visible; at 768 and above the reverse is true.

### Lighthouse

Lighthouse 12.8.2, Playwright Chromium, production `next start` on `127.0.0.1:3000`, 23 October 2026. These numbers are from the build **before** the shell stopped calling `headers()`.

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Speed index | TTI |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 95 | 100 | 100 | 91 | 1.4 s | 2.7 s | 100 ms | 0 | 1.4 s | 2.7 s |
| `/links` | 95 | 100 | 100 | 91 | 1.4 s | 2.9 s | 90 ms | 0 | 1.4 s | 3.0 s |
| `/collaborate` | 96 | 100 | 100 | 91 | 1.4 s | 2.6 s | 120 ms | 0 | 1.4 s | 3.0 s |

The SEO deduction was only `meta-description`. The tag was in the response body, streamed there because the shell read request headers, and Lighthouse did not count it. See `docs/seo.md`. This revision removes that `headers()` call so static pages can emit the tag inside `<head>`. **These scores were not remeasured after that change.** If a later commit in this pull request says they were, use that commit’s numbers.

JSON from the run above was written to `/tmp/lh/home.json`, `/tmp/lh/links.json`, and `/tmp/lh/collaborate.json` on the build machine. Those files are not in git.

### Visual QA

Playwright wrote full-page screenshots to `/opt/cursor/artifacts/visual/` for home, links, work, collaborate, directory, mentorship book, media kit, and about, at 360, 390, 768, 1280, and 1600, plus `menu-390.png` and `collaborate-reduced-motion-390.png`. Prototype comparisons are in `docs/design/` and `/opt/cursor/artifacts/design/`.

Those screenshots are from the same pre-change build as the Lighthouse run. The visual system did not change in the metadata fix. The mobile menu no longer adds a second “Full index” row, because “Index” already points at `/directory`. The open-menu screenshot is from before that one-line change.

What was checked in code and by the assertions, not only by looking at pictures: no horizontal overflow beyond 1px, nav swap at 768, menu dialog Escape, reduced-motion screenshot of the form, stacked tables below 64rem with `data-label`s, errors outside form labels.

## Known limits

- No live email, payment, Turnstile, or analytics credentials. Those integrations are coded and unexercised against the vendors.
- Admin CRUD was not click-tested with a password.
- Rate limiting is in-memory. Booking state is a file with a process lock. Neither survives multiple instances or a read-only serverless disk.
- `CALCOM_LINK` is documented and not called.
- Most pages were dynamic because of `headers()`. After this revision, pages that do not read `searchParams` can be static. `/open-source`, `/bookmarks`, and `/mentorship/book` still read the query string.
- The links page still ships the shared client navigation. It is visually light. It is not zero JavaScript.
- First-load JavaScript on the earlier production build was about 107 kB shared. Page-specific JS was under 1 kB except collaborate (~4 kB), booking (~1.6 kB), dispatches (~1.5 kB), and admin login (~1.4 kB). Those sizes were not remeasured after the nav component moved to the client.
- `npm audit` reported 10 vulnerabilities in the dependency tree (2 moderate, 6 high, 2 critical). They were not triaged or patched.
- Services have `TODO(Ryan)` fees. Mentorship is not open. The newsletter is disabled. The portal and community are not launched. There is no portrait.
- TuitionOS and the Indiquant deep link returned HTTP 404. MoneyRadar’s homepage and thugirlabs.com returned 200. Roles are unconfirmed. See `docs/needs-ryan-input.md`.
- The old gallery photographs were not migrated. That was intentional.

## Deploy

`docs/deployment.md` and `docs/seo.md`. Short version: Vercel or another Node host, set `SITE_URL`, do not static-export, do not point GitHub Pages at this app, submit the sitemap only after the origin is real.
