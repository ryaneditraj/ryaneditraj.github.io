#!/usr/bin/env python3
"""Static checks for the portfolio site. No network access."""

from html.parser import HTMLParser
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

REQUIRED = [
    "index.html",
    "gallery.html",
    "404.html",
    "README.md",
    "LICENSE",
    "CONTRIBUTING.md",
    "CODE_OF_CONDUCT.md",
    "SECURITY.md",
    "robots.txt",
    "sitemap.xml",
    "llms.txt",
    ".env.example",
    ".gitignore",
    "css/styles.css",
    "css/gallery.css",
    "js/gallery.js",
    "vendor/photoswipe/photoswipe.min.js",
    "vendor/photoswipe/LICENSE",
    "fonts/ibm-plex-mono-400.woff2",
    "fonts/OFL.txt",
    ".github/workflows/ci.yml",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/ISSUE_TEMPLATE/bug_report.yml",
    ".github/ISSUE_TEMPLATE/config.yml",
    "docs/screenshot-home.png",
    "docs/screenshot-home-mobile.png",
    "docs/screenshot-gallery.png",
    "docs/screenshot-lightbox.png",
    "docs/og-home.png",
]

FORBIDDEN_IN_SOURCE = [
    "code.jquery.com",
    "jquery-2",
    "maxcdn.bootstrapcdn.com",
    "cdnjs.cloudflare.com",
    "fonts.googleapis.com",
    "fontawesome.com",
    "maps.googleapis.com",
    "AIza",
    "<script>alert",
    "bootstrap.min.css",
]

PAGES = ["index.html", "gallery.html"]
PAGE_NEEDLES = [
    'rel="canonical"',
    'property="og:title"',
    'name="twitter:card"',
    "application/ld+json",
    "Content-Security-Policy",
    '"@type": "Person"',
    "script-src 'self'",
]


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.srcs = []
        self.hrefs = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag in {"img", "script"} and data.get("src"):
            self.srcs.append(data["src"])
        if tag == "link" and data.get("rel") == "stylesheet" and data.get("href"):
            self.hrefs.append(data["href"])


def fail(message):
    print(f"FAIL: {message}")
    return 1


def main():
    errors = 0
    for relative in REQUIRED:
        if not (ROOT / relative).is_file():
            errors += fail(f"missing {relative}")

    license_text = (ROOT / "LICENSE").read_text(encoding="utf-8")
    if "MIT License" not in license_text:
        errors += fail("LICENSE is not the MIT license")

    gitignore = (ROOT / ".gitignore").read_text(encoding="utf-8")
    if ".env" not in gitignore:
        errors += fail(".gitignore does not ignore .env")

    package = (ROOT / "package.json").read_text(encoding="utf-8")
    if "photoswipe" in package.lower():
        errors += fail("package.json still depends on photoswipe")
    if (ROOT / "package-lock.json").exists():
        errors += fail("package-lock.json should be absent while there are no dependencies")

    gallery_js = (ROOT / "js" / "gallery.js").read_text(encoding="utf-8")
    if "escapeHtml" not in gallery_js or '#gallery figure' not in gallery_js:
        errors += fail("gallery.js must escape captions and bind only gallery figures")
    if "$('a')" in gallery_js or 'querySelectorAll("a")' in gallery_js:
        errors += fail("gallery.js must not bind every anchor")

    source_suffixes = {".html", ".js", ".css"}
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix not in source_suffixes:
            continue
        if "node_modules" in path.parts:
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        for needle in FORBIDDEN_IN_SOURCE:
            if needle in text:
                errors += fail(f"{path.relative_to(ROOT)} contains {needle!r}")

    for page in PAGES:
        text = (ROOT / page).read_text(encoding="utf-8")
        for needle in PAGE_NEEDLES:
            if needle not in text:
                errors += fail(f"{page} missing {needle}")
        parser = LinkParser()
        parser.feed(text)
        for url in parser.srcs + parser.hrefs:
            if url.startswith(("http://", "https://", "data:", "mailto:", "#")):
                if url.startswith("http"):
                    errors += fail(f"{page} still references remote asset {url}")
                continue
            target = (ROOT / url.split("?", 1)[0]).resolve()
            if not target.is_file():
                errors += fail(f"{page} missing local asset {url}")

    if "https://ryaneditraj.github.io/" not in (ROOT / "sitemap.xml").read_text(encoding="utf-8"):
        errors += fail("sitemap.xml is not pointed at the GitHub Pages origin")
    if "Sitemap:" not in (ROOT / "robots.txt").read_text(encoding="utf-8"):
        errors += fail("robots.txt has no sitemap")
    llms = (ROOT / "llms.txt").read_text(encoding="utf-8")
    if "instagram.com/ryaneditraj" not in llms or "github.com/ryaneditraj" not in llms:
        errors += fail("llms.txt is missing author profile links")

    if errors:
        print(f"{errors} check(s) failed")
        return 1
    print("site checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
