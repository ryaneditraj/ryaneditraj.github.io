import { JsonLd } from "@/components/json-ld";
import { ProjectIndex } from "@/components/project-index";
import { Shell } from "@/components/shell";
import { getNow, getSite, published, readCollection } from "@/lib/content";
import { personId, websiteId, buildMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = buildMeta({
  path: "/",
  title: "Ryan Editraj — Founder of MoneyRadar and Thugir Group",
  description:
    "Ryan Editraj is 16 and is based in Tamil Nadu, India. He is founder of MoneyRadar and Thugir Group. Thugir Labs is autonomous security research in a closed beta.",
});

export default function HomePage() {
  const site = getSite();
  const now = getNow();
  const projects = published(readCollection("projects")).filter((project) => project.featured).slice(0, 6);
  const origin = getSiteUrl();
  return (
    <Shell section="Home">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": websiteId(),
            name: site.name,
            url: origin,
            description: site.positioning,
            inLanguage: "en",
            publisher: { "@id": personId() },
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": personId(),
            name: site.name,
            url: origin,
            email: site.email,
            address: { "@type": "PostalAddress", addressRegion: "Tamil Nadu", addressCountry: "IN" },
            description:
              "Founder of MoneyRadar and Thugir Group. He states that he is 16. Based in Tamil Nadu, India. Checked 23 October 2026.",
            jobTitle: "Founder",
            sameAs: site.socials.filter((social) => social.href.startsWith("http")).map((social) => social.href),
            homeLocation: { "@type": "Place", name: site.location },
          },
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": `${origin}/#profile`,
            mainEntity: { "@id": personId() },
            dateModified: now.updatedAt,
          },
        ]}
      />
      <p className="kicker">Tamil Nadu, India · Age 16</p>
      <h1>Founder of MoneyRadar and Thugir Group.</h1>
      <p className="lede">
        {site.name} is 16. {site.positioning} Thugir Labs is autonomous security research for pentesters, security teams, and MSPs, in a free closed beta.
      </p>
      <p>
        <a className="stamp" href="/collaborate">
          Start a collaboration
        </a>
      </p>
      <div className="grid-2">
        <section>
          <h2>Who is Ryan Editraj?</h2>
          <p className="measure">
            MoneyRadar and Thugir Labs name him founder. Thugir Group is the parent of both. No company registration was found, so the title is the one on his own sites and profiles, checked 23 October 2026.
          </p>
          <p className="measure">
            He states that at 14 he found a CVSS 9.8 vulnerability, that a patent is pending, that one Thugir Labs build was 138,936 lines of code, and that he placed first at a Liya Tech hackathon. Those are his statements. This page does not add a report id, a patent number, or a second source.
          </p>
        </section>
        <aside>
          <h2>At a glance</h2>
          <dl className="facts">
            <div>
              <dt>Based</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt>Timezone</dt>
              <dd>{site.timezone}</dd>
            </div>
            <div>
              <dt>Age</dt>
              <dd>
                16
                <div className="meta">Stated on his X bio, checked 23 October 2026.</div>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
      <section className="section">
        <h2>What does he build?</h2>
        <p className="measure">Selected repositories. Each one links to a page with the source of the description.</p>
        <ProjectIndex projects={projects} />
      </section>
      <section className="section">
        <h2>How do you collaborate?</h2>
        <p className="measure">
          Write through the inquiry. Say who you are, what should exist at the end, and the budget band. There is no countdown. Mentorship booking is not open.
        </p>
        <p>
          <a className="ghost" href="/services">
            See the services
          </a>
        </p>
      </section>
      <section className="section">
        <h2>Now</h2>
        <p className="measure">{now.text}</p>
        <p className="meta">{now.source}</p>
      </section>
    </Shell>
  );
}
