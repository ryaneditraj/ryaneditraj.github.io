# Ryan Editraj — personal internet

A new site for [Ryan Editraj](https://github.com/ryaneditraj). The previous GitHub Pages site was removed on this branch. It is still in git history.

This app is Next.js (App Router) and TypeScript. It needs a host that runs a Node server. GitHub Pages cannot run the forms, the admin session, or the payment webhooks.

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev
```

With no secrets, the public pages render, collaboration inquiries are validated and then **not sent**, the newsletter control stays disabled, mentorship booking stays closed, and `/admin` explains that sign-in is not configured.

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

End-to-end tests expect a production build and start `next start` on `127.0.0.1:3000`.

## Read next

- [docs/HANDOFF.md](docs/HANDOFF.md) — what was built, what was tested, what is missing
- [docs/design-direction.md](docs/design-direction.md) — the three prototypes and the system that shipped
- [docs/needs-ryan-input.md](docs/needs-ryan-input.md) — facts only Ryan can confirm
- [docs/deployment.md](docs/deployment.md) — host, domain, and integrations
- [docs/seo.md](docs/seo.md) — indexing and the crawler policy
- [docs/portal-architecture.md](docs/portal-architecture.md) — why `/portal` is a refusal page

`SITE_URL` overrides the origin. If it is unset, production metadata uses `https://ryaneditraj.vercel.app`. Local development uses `http://localhost:3000`.
