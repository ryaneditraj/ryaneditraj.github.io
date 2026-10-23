# Needs Ryan’s input

Everything below is a blank, a conflict, or a claim this site refuses to make. Search the repo for `TODO(Ryan)` to find the same notes in the content files. Do not fill these with guesses.

Checked against the GitHub users API, public repository pages, and HTTP responses on 23 October 2026.

## Identity

- The GitHub account bio still says: “A casual coder studying in St Joseph's CBSE School, Manavalakurichi. Linux Fanboy.” The profile README created the same day says “AI builder, founder, and engineer from India.” Journey quotes both and asks which is current. The homepage does not lead with the school.
- “Founder” is his word in that README. It is not attached to a company registration. Role at Thugir Labs and at MoneyRadar is unconfirmed beyond the Indiquant README line “A Money Radar product by Thugir Group. Maintained by Ryan Editraj.”
- LinkedIn `https://www.linkedin.com/in/ryaneditraj/` appeared on the old github.io homepage. Confirm it is still the right profile.
- A portrait. None is published here. The old headshots were not migrated.
- What he is doing this week. `/now` quotes the profile README and then says so. Replace `content/now.json`.

## Work that was not listed

These names came up in the old site or in conversation and were **not** found as public repositories under `ryaneditraj` on 23 October 2026:

- placement-karo
- roomgpt
- Coducher (the old homepage called him founder of Coducher)

If they should appear, send the canonical URL and the one-sentence description.

## Projects that need a correction, not a rewrite

- TuitionOS README says it was built for Trinity Educational Institutions. That institution was not independently verified.
- `https://tuition-os-eta.vercel.app` returned HTTP 404. `https://moneyradar.in/indiquant` returned HTTP 404. `https://moneyradar.in/` returned 200, titled “MoneyRadar — Gen Z Money Decisions for India.” Do not claim he operates every calculator on that site.
- `https://thugirlabs.com` returned 200, titled “Thugir Labs — Autonomous Security Research.” The README says “Thugir Group,” not a job title.
- `ryaneditraj.tech` did not resolve (curl exit 000) on 23 October 2026. The profile README lists `https://ryaneditraj.github.io` as the website. This app should not be forced onto GitHub Pages. See `docs/deployment.md`.

## Offers

- Services have no fees and no real deliverable list. Both published services say `TODO(Ryan)` in `content/services.json`.
- Mentorship is a draft. Confirm whether it exists, the length, the fee in INR, and the hours in Asia/Kolkata. The weekday 18:00–20:00 window is an example, not a promise.
- Response time on inquiries is not stated.

## Shelf

- Press: empty. Do not add a clipping that is not a real URL.
- Resources: empty.
- Uses: Linux is the only verified line, and no distribution is named. Editor, terminal, and hardware are blanks. The Keeb repository is a keyboard he designed, not proof it is his daily keyboard.
- Bookmarks are his public properties, not a reading list. A reading list needs real URLs he chooses.
- Notes: the only published note is the site colophon, bylined as the site, not as a personal essay.

## Legal and operations

- Privacy and terms describe this software. Have a lawyer review them before relying on them.
- Choose `SITE_URL` once a host exists.
- Choose whether collaboration inquiries should be emailed (Resend), stored on disk, or both. Until then, a successful form tells the visitor that nothing was sent and points them at `ryaneditraj@gmail.com`.
- Dispatches (the letter list) stay off until a Resend segment id exists. Do not paste a list of addresses into the repo.
- Payments: Razorpay is the preferred India provider. Stripe is the alternative. Both need keys and a webhook secret before any booking can be confirmed.
