# Contributing

Thanks for helping improve Ryan Editraj's portfolio site. The project is static HTML, CSS, and a little JavaScript. There is no build step.

## Local preview

```bash
git clone https://github.com/ryaneditraj/ryaneditraj.github.io.git
cd ryaneditraj.github.io
python3 -m http.server 8080
```

Open http://localhost:8080 for the homepage and http://localhost:8080/gallery.html for the gallery.

`npm start` runs the same Python server. `npm run check` runs `scripts/check_site.py`.

## What to change

- Keep the dark theme, the homepage story, and the gallery paths working.
- Gallery thumbnails live in `assets/thumbs/`. Full-size originals stay where they are and are linked from each `<a href>`.
- Do not add API keys, tokens, or private contact lists. This site does not need a `.env` file. See `.env.example`.
- Do not load JavaScript from a third-party CDN. PhotoSwipe is vendored under `vendor/photoswipe/`.
- New pages need a canonical URL, a description, and an entry in `sitemap.xml`.

## Pull requests

1. Fork the repository and create a branch.
2. Run `python3 scripts/check_site.py`.
3. Describe what changed and how you checked the homepage and gallery.
4. Open a pull request against `main`.

Bug fixes, accessibility improvements, and docs corrections are welcome. Large redesigns should start with an issue so the direction is clear.

## Reporting security issues

Please email  instead of opening a public issue. See [SECURITY.md](SECURITY.md).

## Code of conduct

Participation is covered by the [Contributor Covenant](CODE_OF_CONDUCT.md).
