import { Shell } from "@/components/shell";
import { getSite } from "@/lib/content";
import { directoryGroups } from "@/lib/directory";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/directory",
  title: "Directory",
  description: "The index of Ryan Editraj’s personal internet: every public page and the outside properties tied to the work.",
});

export default function DirectoryPage() {
  const site = getSite();
  return (
    <Shell section="Index">
      <p className="kicker">Index</p>
      <h1>The personal internet</h1>
      <p className="lede">One identity, many doors. Each row says what the page is for.</p>
      {directoryGroups.map((group) => (
        <section className="section" key={group.title}>
          <h2>{group.title}</h2>
          <ul className="directory-list">
            {group.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
                <div className="meta">{link.purpose}</div>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section className="section">
        <h2>Outside</h2>
        <ul className="directory-list">
          {site.socials.map((social) => (
            <li key={social.href}>
              <a href={social.href}>{social.label}</a>
              {social.note ? <div className="meta">{social.note}</div> : null}
            </li>
          ))}
          <li>
            <a href="https://moneyradar.in">MoneyRadar</a>
            <div className="meta">Linked from the Indiquant README. Root URL checked 2026-10-23.</div>
          </li>
          <li>
            <a href="https://www.thugirlabs.com">Thugir Labs</a>
            <div className="meta">Domain responded 2026-10-23. Role unconfirmed.</div>
          </li>
        </ul>
      </section>
    </Shell>
  );
}
