# SEO and answer engines

The HTML is rendered on the server. Titles and descriptions are unique per route (`lib/seo.ts`). The canonical URL is `SITE_URL` plus the path. Open Graph and Twitter cards use the same copy and a generated image (`app/opengraph-image.tsx`, re-exported as the Twitter image). `lang` is `en` on `<html>`. Unknown paths return 404. `/gallery` and `/gallery.html` redirect 308 to `/`.

JSON-LD is only what the page shows: `Person` and `WebSite` with stable `@id` values (`{origin}/#person`, `{origin}/#website`), `ProfilePage` on the home page, `BreadcrumbList` where the breadcrumb is visible, `Article` on notes (the colophon’s byline is the site, not Ryan), and `CreativeWork` on project pages. No review, rating, or offer markup is emitted, because those facts are not on the page.

`app/llms.txt/route.ts` is a plain-text description of the site. It lists what is not claimed. It is not a promise that any model will read it.

## Crawler policy

Ryan is a public creator and wants to be found. `app/robots.ts` allows search and citation crawlers and disallows training crawlers.

Allowed, including `/`, and blocked from `/admin`, `/portal`, and `/api/`:

- `*` (everyone else)
- Googlebot, Bingbot, DuckDuckBot, Applebot
- OAI-SearchBot, ChatGPT-User
- Claude-SearchBot, Claude-User
- PerplexityBot

Disallowed from `/`:

- GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot, Bytespider, meta-externalagent, FacebookBot

Google-Extended is a training opt-out token, not a separate crawler. Googlebot still crawls, and Google’s AI Overviews can still quote pages Google has indexed. Blocking Google-Extended does not remove the site from Google Search.

Perplexity-User is documented by Perplexity as generally ignoring `robots.txt`. This file does not pretend otherwise. It allows PerplexityBot, which is their search crawler.

## Measured SEO score

Lighthouse 12.8.2 against `next start`, 23 October 2026, after the fix below: SEO **100** on `/`, `/links`, and `/collaborate`. Performance was 95, 97, and 95. Accessibility and best practices were 100. The full table is in `docs/HANDOFF.md`.

An earlier run the same day scored SEO 91 on those three pages. The only failing audit was `meta-description`. The description was in the HTML response and not inside the initial `<head>`. The shell called `headers()` to mark the current nav item, which forced every page to render dynamically, and Next.js streamed the metadata into the body. Lighthouse did not count it.

That call is gone. The current path comes from `usePathname()` in `components/site-nav.tsx`. Pages that do not read `searchParams` are static, and the description is in `<head>`. Routes that read `searchParams` (`/open-source`, `/bookmarks`, `/mentorship/book`, and the admin screens) still render dynamically, so their metadata can still stream. Admin and the portal are `noindex`. Those dynamic routes were not part of the Lighthouse sample.

## Indexing checklist

See the last section of `docs/deployment.md`. Submit the sitemap only for the origin in `SITE_URL`.
