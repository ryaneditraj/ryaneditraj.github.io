# Portal

`/portal` is a public page that says the private portal is not enabled. It is `noindex`. There is no account system, no inbox, and no shared activity.

## Why it is not built

A portal that shows someone their own inquiries needs an identity that is not the admin password. Reusing the admin session would show every inquiry to anyone who can sign in as the operator, and it would put visitor data behind the same cookie that can edit the site.

Until a real auth provider is chosen, inventing accounts, magic links, or a fake “you have 3 messages” feed would be a lie. `/community` is the same kind of refusal: no members, no posts, no fabricated activity.

## What a later portal would be

- A separate session from `/admin`. Admin remains the operator. A visitor session can read only the inquiries that match that visitor’s verified email.
- No shared feed. One person sees their own thread.
- Storage stays server-side. The current optional file store (`COLLAB_STORE=file` → `data/collaboration-inquiries.json`, gitignored) is a single-machine log, not a multi-user database. A portal needs a real store with a row per inquiry and a verified email, and it needs deletion.
- Sign-in has to be a provider Ryan operates (for example email magic links through the same Resend account, or an OAuth provider). The app should not ship a default password for visitors.
- The page stays `noindex`. It is not a marketing surface.

## What exists today

The inquiry form can validate, rate-limit, and, when Resend is configured, email the operator. It does not create a login. The visitor’s confirmation is the message on the page, which states whether email was actually sent.
