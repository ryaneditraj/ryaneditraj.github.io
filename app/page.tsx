import { JsonLd } from "@/components/json-ld";
import { PortraitStage } from "@/components/portrait-stage";
import { Shell } from "@/components/shell";
import Link from "next/link";
import { getNow, getSite } from "@/lib/content";
import { buildRows, learnRows, mission } from "@/lib/lanes";
import { personId, websiteId, buildMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

const offerLine = "AI first  ·  I build companies  ·  Thugir Labs  ·  MoneyRadar  ·  300K+ on Instagram";

export const metadata = buildMeta({
  path: "/",
  title: "Ryan Editraj — I build companies",
  description:
    "Ryan Editraj builds companies. AI first. His own, including Thugir Labs and MoneyRadar, and as a technical co-builder with other founders. He explains the work to 300K+ people on Instagram. Based in Tamil Nadu, India. Age 16.",
});

export default function HomePage() {
  const site = getSite();
  const now = getNow();
  const origin = getSiteUrl();
  const thugir = buildRows.find((row) => row.name === "Thugir Labs");
  const ventures = buildRows.filter((row) => row.name !== "Thugir Labs");
  const content = learnRows.filter((row) => row.name !== "Start here");
  return (
    <Shell section="Home" variant="wild">
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
            description: `${mission} He states that he is 16. Based in Tamil Nadu, India.`,
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

      <PortraitStage line={mission} />
      <div className="zine-marquee" aria-hidden="true">
        <div className="zine-marquee-track">
          <span>{offerLine} · </span>
          <span>{offerLine} · </span>
        </div>
      </div>

      <section className="chapter">
        <p className="chapter-no">01</p>
        <h2>What I build</h2>
        <p className="lede">AI first. Security research is the deep work. Then the products.</p>
        <p className="measure">
          AI is the main thing. I put it inside companies: mine, and the ones I build with other people. I do not name those other companies here.
        </p>
        {thugir ? (
          <article className="build-row">
            <div className="build-head">
              {thugir.state ? <span className="state">{thugir.state}</span> : null}
              <h3>{thugir.name}</h3>
            </div>
            <p>{thugir.line}</p>
            <p className="build-links">
              {thugir.links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
              <a href="https://www.youtube.com/watch?v=pzrIMsDy0Wg">Watch the demo</a>
            </p>
          </article>
        ) : null}
        <h3>Products and ventures</h3>
        <ol className="builds">
          {ventures.map((row) => (
            <li key={row.name} className="build-row">
              <div className="build-head">
                {row.state ? <span className="state">{row.state}</span> : null}
                <h3>{row.name}</h3>
              </div>
              <p>{row.line}</p>
              <p className="build-links">
                {row.links.map((link) =>
                  link.href.startsWith("/") ? (
                    <Link key={link.href} href={link.href}>
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.href} href={link.href}>
                      {link.label}
                    </a>
                  ),
                )}
              </p>
            </li>
          ))}
        </ol>
        <p>
          <Link className="ghost" href="/work">
            All the work
          </Link>
        </p>
      </section>

      <section className="chapter">
        <p className="chapter-no">02</p>
        <h2>Build with me</h2>
        <p className="lede">A company, a technical partnership, or a collaboration. Not a menu of things I sell.</p>
        <ol className="steps">
          <li>
            <h3>A company of yours</h3>
            <p>If you are starting one and need a technical co-builder, write. I do not list partners, and I do not claim a title at a company that is not mine.</p>
          </li>
          <li>
            <h3>A partnership</h3>
            <p>We build the technical side together. There is no rate card on this site.</p>
          </li>
          <li>
            <h3>A collaboration</h3>
            <p>A piece of work we both want to exist. The form is the door.</p>
          </li>
        </ol>
        <p>
          <Link className="ghost" href="/services">
            Work with me
          </Link>
        </p>
      </section>

      <section className="chapter">
        <p className="chapter-no">03</p>
        <h2>Content</h2>
        <p className="lede">The same work, said so someone outside tech can follow it.</p>
        <ol className="builds">
          {content.map((row) => (
            <li key={row.name} className="build-row">
              <h3>{row.name}</h3>
              <p>{row.line}</p>
              <p className="build-links">
                {row.links.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="chapter">
        <p className="chapter-no">04</p>
        <h2>The story</h2>
        <div className="why-lines">
          <p>I am 16.</p>
          <p>Tamil Nadu, India.</p>
          <p>Coding since about 12.</p>
        </div>
        <p className="meta">About 12 is an old public listing that called me a 12-year-old. It is not a diary.</p>
        <blockquote className="pull">
          <p>Technology should explain itself… reduce complexity.</p>
          <footer>What I wrote, 2 June 2026.</footer>
        </blockquote>
        <p className="measure">
          I build the company, then I say what it does in plain words. 300K+ followers on Instagram,{" "}
          <a href="https://www.instagram.com/ryaneditraj/">@ryaneditraj</a>. Confirmed 24 October 2026.
        </p>
      </section>

      <section className="cta-band">
        <p className="kicker">The door</p>
        <h2>Write to me.</h2>
        <p>A company, a technical partnership, or a collaboration. The form is how it starts.</p>
        <p className="craft-note">This site was designed and built by me.</p>
        <p className="cta-actions">
          <Link className="stamp" href="/contact">
            Write to me
          </Link>
          <Link className="ghost" href="/services">
            Work with me
          </Link>
        </p>
      </section>
    </Shell>
  );
}
