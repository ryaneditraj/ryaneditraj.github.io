import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ZineCursor } from "@/components/zine-cursor";
import { getSite } from "@/lib/content";
import { directoryGroups } from "@/lib/directory";

export function Shell({
  section,
  variant = "default",
  children,
}: {
  section: string;
  variant?: "default" | "links" | "wild";
  children: React.ReactNode;
}) {
  const site = getSite();

  return (
    <div className="shell">
      {variant === "wild" ? <ZineCursor /> : null}
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="mast">
        <SiteNav nav={site.nav} />
      </header>
      {variant === "links" ? (
        <main id="content" className="links-page">
          {children}
        </main>
      ) : (
        <main id="content" className={variant === "wild" ? "page page-wild" : "page"}>
          <div className="spine">
            <b>■</b>
            <span>{section}</span>
            <span>Tamil Nadu</span>
          </div>
          <div>{children}</div>
        </main>
      )}
      {variant === "links" ? (
        <footer className="footer">
          <p className="colophon">
            Ryan Editraj · Tamil Nadu · <Link href="/directory">Full index</Link>
          </p>
        </footer>
      ) : (
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <p className="colophon">
                {site.name}, {site.location}. Time on this site is {site.timezone}. {site.positioning}
              </p>
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            {directoryGroups.slice(0, 3).map((group) => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                <ul>
                  {group.links.slice(0, 5).map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>
      )}
    </div>
  );
}
