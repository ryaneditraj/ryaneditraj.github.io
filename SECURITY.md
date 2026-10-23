# Security policy

## Reporting a vulnerability

Email  with a description, the page URL, and steps to reproduce. Please do not open a public GitHub issue for an unfixed vulnerability.

This is a static GitHub Pages site. It has no accounts, no server-side code, and no database. The useful reports are cross-site scripting, mixed content, leaked credentials, and unsafe third-party scripts.

## Supported versions

The `main` branch is the published site. There are no older supported releases.

## What was reviewed

Review date: 2026-10-23. Git history was searched. History was not rewritten.

### Fixed in the tree

| Issue | What changed |
| --- | --- |
| jQuery 2.1.4 loaded from `code.jquery.com` on the gallery. Versions before 3.5.0 are affected by [CVE-2020-11022](https://nvd.nist.gov/vuln/detail/CVE-2020-11022) and [CVE-2020-11023](https://nvd.nist.gov/vuln/detail/CVE-2020-11023) (XSS via HTML passed into jQuery DOM helpers). The gallery only used jQuery as a selector, so exploitability here was low, but the library is gone. | Gallery script is now `js/gallery.js`. No jQuery. |
| Bootstrap 3.3.5 CSS loaded from `maxcdn.bootstrapcdn.com`. Bootstrap 3 is end of life. Its historical XSS issues are in the JavaScript, which this site did not load. The stylesheet was only used for a centered column. | Replaced with `css/gallery.css`. |
| PhotoSwipe 4.1.0 CSS and JavaScript loaded from cdnjs with no integrity check. Captions were inserted as HTML, and several captions were copied from the PhotoSwipe demo, including other people's copyright lines. | PhotoSwipe 4.1.0 is vendored. Captions are the photo alt text, escaped before PhotoSwipe writes them. |
| The gallery click handler called `preventDefault` on every link, so Home, About, and Contact on that page did not navigate. | The handler is bound only to `#gallery figure a`. |
| Desktop and mobile menus pointed at different mailboxes (`` and ``). | Navigation uses ``. The about section still links to the public Gmail address that was already on the page. |
| IBM Plex Mono was imported from Google Fonts inside `css/uikit.css`. | The font files are self-hosted under `fonts/` (SIL Open Font License). |
| `package.json` depended on PhotoSwipe 5.4.4, which the pages never loaded. `npm audit` reported no known vulnerabilities in that tree. | The unused dependency and lockfile were removed. |
| Content-Security-Policy was missing. | Pages send a CSP meta tag. Scripts and fonts are same-origin. `style-src` still allows inline styles because UIkit and PhotoSwipe set style attributes. |

### Still in git history (not rewritten)

These are not in the current files. They remain reachable with `git log` because history was left intact.

1. **Google Maps JavaScript API key** in the old `index.html` (removed when that file was replaced; last present before commit `8c55958`, "Delete index.html", 2024-03-31). The key was embedded as a `maps.googleapis.com` script URL. Rotate or delete it in Google Cloud if it belongs to a project you control, and restrict any replacement key by HTTP referrer. The full value is listed in the pull request that added this policy so it is not copied back into the tree. Find the line with:

   ```bash
   git log -S 'maps.googleapis.com/maps/api/js?key=' --oneline
   ```

2. **Font Awesome kit id** `2e7e97b8df` in that same historical `index.html` (`kit.fontawesome.com/2e7e97b8df.js`). Kit ids are public embed codes. If the kit is on your Font Awesome account, rotate it if you are worried about quota use. It is not used by the current site.

3. **Google Search Console verification tokens** in historical HTML (`google-site-verification`). These tokens are meant to be public and do not grant API access. No rotation is required unless you want to re-verify the property.

4. **XSS probe filenames** committed in May 2024 and later deleted from the tree: a PNG whose name contained a `<script>alert` fragment, then a renamed copy of that file. They are not credentials. They show that a script-looking filename was stored in history.

No private keys, cloud tokens, passwords, or `.env` files were found.

### Accepted or platform limits

- **UIkit 3.14.0** is vendored and locally themed (dark background and the Plex font hook). Some UIkit builds will treat a `data-caption` on a `uk-lightbox` element as HTML. This site does not use `uk-lightbox`, and there is no user-supplied HTML. The customized bundle was not upgraded in this pass. Snyk's related npm note ([SNYK-JS-UIKIT-10587793](https://security.snyk.io/vuln/SNYK-JS-UIKIT-10587793), discussed alongside CVE-2025-5944) was later amended as not a vulnerability in UIkit itself. Revisit on the next UIkit upgrade.
- **GitHub Pages** sends `Access-Control-Allow-Origin: *` and does not let this repo set `Content-Security-Policy`, `frame-ancestors`, or `X-Frame-Options` as real HTTP headers. The CSP meta tag covers scripts, images, and fonts. Browsers ignore `frame-ancestors` in a meta tag, so it is not included. Clickjacking protection would have to be set by the host.
- **Original gallery files** are several megabytes each. The grid now uses thumbnails. The originals are still public site content, not secrets.
