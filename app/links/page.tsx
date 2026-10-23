import { Shell } from "@/components/shell";
import { getSite } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/links",
  title: "Links",
  description: "Ryan Editraj’s short list of public pages, for a phone bio.",
});

export default function LinksPage() {
  const site = getSite();
  const links = [
    { href: "/work", label: "Work" },
    { href: "/collaborate", label: "Collaborate" },
    { href: "/media-kit", label: "Media kit" },
    { href: "/now", label: "Now" },
    ...site.socials.map((social) => ({ href: social.href, label: social.label })),
  ];
  return (
    <Shell section="Links" variant="links">
      <p className="kicker">@ryaneditraj</p>
      <h1>Ryan Editraj</h1>
      <p>{site.positioning}</p>
      <nav className="link-stack" aria-label="Links">
        {links.map((link) => (
          <a key={link.href + link.label} href={link.href}>
            <span>{link.label}</span>
            <span aria-hidden="true">→</span>
          </a>
        ))}
      </nav>
    </Shell>
  );
}
