# Deployment and integrations

Do not deploy this from the pull request. Nothing here has been deployed.

## Host

The old site was static HTML on GitHub Pages. That host cannot run server actions, signed session cookies, or payment webhooks.

Use a Node host. Vercel is the straightforward one: connect the repository and set the environment variables below. `SITE_URL` overrides the origin. If you leave it unset on a production build, canonicals use `https://ryaneditraj.vercel.app`. Set `SITE_URL` when the public origin is different. Do not set `output: "export"`. A static export would drop the forms and the admin.

GitHub Pages can keep serving the previous commit if you want the old site to stay up while this is reviewed. This branch deletes those files. Merging it to the branch Pages builds from will replace the old site with a Next app Pages cannot run. Point Pages at a different branch, or turn Pages off, before merging.

`ryaneditraj.tech` did not resolve on 23 October 2026. The CNAME file was already gone from `main`. Do not put that domain in `SITE_URL` until DNS answers.

## Environment

Every variable is listed in `.env.example`. Secrets stay in the host’s env, never in `NEXT_PUBLIC_*` except the four public values already named that way: Turnstile site key, Razorpay key id, Stripe publishable key. Those are publishable by design.

| Concern | Required variables | If unset |
| --- | --- | --- |
| Canonical origin | `SITE_URL` | Production uses `https://ryaneditraj.vercel.app`. Local dev uses `http://localhost:3000`. |
| Admin sign-in | `SESSION_SECRET`, `ADMIN_PASSWORD` | Login page says it is not configured |
| Admin writes | `CONTENT_WRITABLE=true` and a writable disk | Saves are refused |
| Inquiry email | `RESEND_API_KEY`, `RESEND_FROM`, `COLLAB_TO_EMAIL` | The form says nothing was sent |
| Inquiry file log | `COLLAB_STORE=file` | No inquiry is written to disk |
| Letters | `RESEND_API_KEY` and `RESEND_SEGMENT_ID` | The signup button stays disabled |
| Turnstile | `TURNSTILE_SECRET_KEY` (and the public site key) | No challenge. If the secret is set, a missing token fails closed |
| Razorpay | `PAYMENT_PROVIDER=razorpay`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Booking refuses |
| Stripe | `PAYMENT_PROVIDER=stripe`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Booking refuses |
| Analytics | `PLAUSIBLE_DOMAIN` or both `UMAMI_SRC` and `UMAMI_WEBSITE_ID` | No analytics script |
| Cal.com | `CALCOM_LINK` | Unused. The app does not call Cal.com |

## Collaboration email

`lib/email.ts` posts to Resend only when the three collaboration variables are set. The honeypot field `company_website` is discarded as a quiet success and is not mailed. The in-process rate limit is 5 submissions per 10 minutes per address. That limit is not shared across instances. The first `x-forwarded-for` hop is treated as the client; that header is spoofable unless the host overwrites it.

## Dispatches

Signup calls `POST https://api.resend.com/contacts` with `unsubscribed: false` and the configured segment. Resend’s audiences API was deprecated in the move to segments (November 2025); this code uses segments. There is no imported address list.

## Booking and payments

Time is Asia/Kolkata, fixed at UTC+5:30. A hold is written only when the offering is published, `scheduleStatus` is `confirmed`, a price in INR is set, and the chosen provider’s secrets exist. The public offering in `content/offerings.json` is a draft with `scheduleStatus: "example"` and `priceInr: null`, so the button on `/mentorship/book` stays disabled and the server refuses.

The file store is `data/bookings.json` (gitignored) with a lock file. It is correct for one process. It will not coordinate two serverless instances. Use one always-on Node process, or replace the store, before taking real money.

Returning from Checkout is not confirmation. The success URL is `/mentorship/book?returned=1`, and the page says so. A booking becomes paid only in the webhook:

- Stripe: `checkout.session.completed`. The `t=` timestamp and `v1` HMAC are checked, with a 300 second tolerance. Currency must be `inr`, `amount_total` must match `amountInr * 100`, and the provider reference must match the hold.
- Razorpay: `payment.captured` only. `X-Razorpay-Signature` is an HMAC of the raw body. Amount is in paise and must match the hold. Order id must match.

`markPaid` refuses an amount mismatch. Failed provider calls cancel the hold.

Webhook URLs, once a host exists:

- `https://<SITE_URL host>/api/webhooks/stripe`
- `https://<SITE_URL host>/api/webhooks/razorpay`

## Admin

Session cookie `re_session` is HMAC-signed (Web Crypto, so middleware on the edge can verify it), `httpOnly`, `SameSite=Lax`, `Secure` in production, 12 hours. The password is compared as SHA-256 with `timingSafeEqual`. There is no default password.

Writes use a temp file and rename. They revalidate the layout. Serverless disks that are read-only cannot persist them; leave `CONTENT_WRITABLE` unset on those hosts and edit the JSON in git instead.

## Analytics

`components/analytics.tsx` loads Plausible when `PLAUSIBLE_DOMAIN` is set, otherwise Umami when both Umami variables are set, otherwise nothing. The content security policy is built in `middleware.ts` and adds those origins only when the variables are present. Plausible or Umami are the intended tools. Do not add a third-party tag manager.

## Search Console and Bing

After `SITE_URL` is the live origin:

1. Add the property in Google Search Console and Bing Webmaster Tools for that exact origin.
2. Confirm the sitemap at `https://<origin>/sitemap.xml`. It lists public routes and published project, note, and playbook paths. It omits `/admin`, `/portal`, and drafts.
3. Confirm `https://<origin>/robots.txt` matches `docs/seo.md`.
4. Request indexing for `/` only after the content Ryan still owes (see `docs/needs-ryan-input.md`) is either filled or consciously left as blanks.
