# Design direction

Date: 23 October 2026.

The previous site (UIKit, IBM Plex Mono, a photo gallery) was discarded. Nothing from its CSS, markup, or layout was copied. The prototypes below were written as standalone HTML so the three directions could be compared before any production component existed.

## What was looked at

Fetched in the browser, then used as references for structure rather than as templates:

- It’s Nice That — an editorial index: dates, section labels, a feed of work rather than a grid of cards.
- Standard.site — schema and definitions as a way to talk about a person. Not used as a visual model.
- Frank Chimero and Studio Feixen — both fetches were thin. Their live CSS was not inspectable in a useful way, so they were not treated as sources for type, color, or layout.

No screenshot of those sites was traced. The three prototypes are original compositions.

## Three directions

Static prototypes live in `docs/design-prototypes/`. Screenshots:

| Direction | Desktop | Phone |
| --- | --- | --- |
| A — Editorial proof | `docs/design/a-editorial-1280.png` | `docs/design/a-editorial-390.png` |
| B — Swiss index | `docs/design/b-swiss-1280.png` | `docs/design/b-swiss-390.png` |
| C — Cinematic chapters | `docs/design/c-cinematic-1280.png` | `docs/design/c-cinematic-390.png` |

**A. Editorial proof.** Warm paper, Fraunces headlines, Source Serif body, a mono kicker, one rust action, and an index of work as rows. It reads. The risk is that cream paper plus Fraunces is a common portfolio costume.

**B. Swiss index.** Near-white field, one grotesque (Schibsted Grotesk), a numbered vertical spine, hairline rules, and a single red square. It is disciplined and a little cold for a person whose public work is explanation.

**C. Cinematic chapters.** Full-viewport dark chapters, Cormorant italic, brass labels, and an empty plate where a portrait would go. It needs photographs Ryan has not supplied. Without them it becomes a dark film page, which is the look this brief asked to avoid.

## What shipped

A hybrid, not a copy of A.

- Paper and serif reading voice from A, shifted to a green-black ink so it is not the usual cream-and-rust Fraunces page.
- The numbered spine and the single stamp-red action from B.
- C was rejected.

The live headline is “I build companies. AI first.” Instagram is published as 300K+ after Ryan confirmed the count on 24 October 2026. Prototype A’s screenshot is an older figure and is not the live line.

The production palette is in `app/globals.css`. Radius is 0. There are no shadows, gradients, glass panels, or glow. The square in the spine is a stamp, not a decoration repeated on every card. Work is an index of rows, not a card grid.

## Tokens

| Role | Value |
| --- | --- |
| Paper | `#efeae0` |
| Paper, secondary | `#e4ddd0` |
| Ink | `#17241c` |
| Ink, soft | `#24352c` |
| Muted | `#4d5a52` (about 6.04:1 on paper) |
| Stamp | `#9f2d1a` (about 6.11:1 on paper, and as the inverse button) |
| Stamp ink | `#f6f1e6` |
| Radius | `0` |
| Measure | `66ch` |
| Page | `72rem` |
| Space | 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6 rem |

Type, self-hosted Latin woff2 subsets via `next/font/local`:

- Fraunces 600 roman and italic — headlines, and the RE mark
- Source Serif 4 400, 400 italic, 600 — body
- Schibsted Grotesk 500 and 600 — navigation, buttons, labels
- DM Mono 400 — kickers, meta, table headers

System stacks sit behind each family if a subset fails to load.

## Composition

- Headlines are large and tight (`line-height: 0.96`, slight negative tracking). Body stays at 1.0625rem / 1.5.
- One primary action per page, the stamp button. Secondary actions are underlined ghost links.
- Tables are indexes. Below 64rem they stack, and cells other than the title carry a `data-label`.
- Fact rows use two columns and collapse to one below 48rem.
- The spine is sticky and vertical from 68rem up. Below that it is hidden and the section name stays in the page.
- Primary navigation is inline from 48rem (768px). Below that, a Menu button opens a full-page dialog portaled to `document.body`, with the rest of the shell `inert`, Escape to close, and focus moved to Close.

## Controls

- Buttons and text inputs have a 44px minimum height. Menu links are 48px. Link-in-bio rows are 52px.
- Focus is a 2px ink outline, offset 3px, on `:focus-visible` only.
- Invalid fields use a 2px stamp underline. Errors sit outside the label so the accessible name stays the field name.
- Disabled controls drop to 55% opacity and `cursor: not-allowed`.
- Hover on a stamp fills it with ink. Hover on an index link underlines it.

## Motion

The only motion is a short color/underline change and smooth anchor scrolling. `@media (prefers-reduced-motion: reduce)` sets scroll behavior to auto and collapses animations and transitions. The site is usable with that media query, and with CSS disabled the HTML is still a document: headings, links, and forms.

## Images

No stock photography and no fake screenshots. There is no portrait. Project pages link to the repository instead of inventing a picture. The social image is generated type (`app/opengraph-image.tsx`), using Fraunces only, with no glyph outside that font.

## Breakpoints

| Width | Behavior |
| --- | --- |
| below 48rem | Facts stack. Mast and footer padding tighten. Menu button. |
| 48rem and up | Inline nav. Two-column home split. Footer in four columns. |
| below 64rem | Index tables stack. |
| 68rem and up | Vertical spine. |
