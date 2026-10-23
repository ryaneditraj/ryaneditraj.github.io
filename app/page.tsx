import { JsonLd } from "@/components/json-ld";
import { ProjectIndex } from "@/components/project-index";
import { Shell } from "@/components/shell";
import { getNow, getSite, published, readCollection } from "@/lib/content";
import { personId, websiteId, buildMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = buildMeta({
  path: "/",
  title: "Ryan Editraj — Make the technical thing legible",
  description:
    "Ryan Editraj is an AI builder in India. He makes technical work understandable for people outside the field, and publishes the software in public.",
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
            address: { "@type": "PostalAddress", addressCountry: "IN" },
            description:
              "AI builder and engineer from India who explains technical work to a general audience. Self-description from his GitHub profile README, 23 October 2026.",
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
      <p className="kicker">India · Asia/Kolkata</p>
      <h1>Make the technical thing legible.</h1>
      <p className="lede">
        {site.name} builds applied AI in public and explains it to people who do not live in the field. {site.positioning}
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
            He describes himself, in the GitHub profile README published on 23 October 2026, as an AI builder, founder, and engineer from India. The same note says he explains that work to a general audience as the Instagram creator {site.instagram.handle}.
          </p>
          <p className="measure">
            The code is the checkable part: quant research for Indian markets, education software, a computer-vision experiment, and earlier Hack Club builds. Follower counts and titles that are not sourced are not printed here.
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
              <dt>Instagram</dt>
              <dd>
                <a href={site.instagram.url}>{site.instagram.handle}</a>
                <div className="meta">
                  {site.instagram.followersLabel}, self-reported, {site.instagram.asOf}
                </div>
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
        <p className="todo measure">{now.text}</p>
        <p className="meta">{now.source}</p>
      </section>
    </Shell>
  );
}
