import { JsonLd } from "@/components/json-ld";
import { PortraitStage } from "@/components/portrait-stage";
import { Shell } from "@/components/shell";
import Link from "next/link";
import { getNow, getSite, published, readCollection } from "@/lib/content";
import { buildRows, mission } from "@/lib/lanes";
import { personId, websiteId, buildMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

const offerLine = "Web development  ·  Apps  ·  AI and automation  ·  Fractional CTO  ·  Technical operations";

export const metadata = buildMeta({
  path: "/",
  title: "Ryan Editraj — Technical founder",
  description:
    "Ryan Editraj builds and operates tech for companies: web, apps, AI and automation, and fractional CTO work. Based in Tamil Nadu, India. Age 16.",
});

export default function HomePage() {
  const site = getSite();
  const now = getNow();
  const origin = getSiteUrl();
  const services = published(readCollection("services"));
  const ventures = buildRows.filter((row) => row.name !== "Thugir Labs");
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
            jobTitle: "Technical founder",
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
        <h2>Services</h2>
        <p className="lede">What I sell to companies. A fee is not listed until I publish one.</p>
        <ol className="builds">
          {services.map((service) => (
            <li key={service.slug} className="build-row">
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </li>
          ))}
        </ol>
        <p>
          <Link className="ghost" href="/services">
            Read the services
          </Link>
        </p>
      </section>

      <section className="chapter">
        <p className="chapter-no">02</p>
        <h2>How I work</h2>
        <ol className="steps">
          <li>
            <h3>You write</h3>
            <p>The form asks what should exist at the end. There is no street address.</p>
          </li>
          <li>
            <h3>We name the scope</h3>
            <p>I do not publish a price. The ranges on the form are a question, not a quote.</p>
          </li>
          <li>
            <h3>I design and build</h3>
            <p>Type, motion, and the thing a person uses. This site is the sample.</p>
          </li>
          <li>
            <h3>I can stay</h3>
            <p>Freelance for the build, or a fractional CTO while the company runs it.</p>
          </li>
        </ol>
      </section>

      <section className="chapter">
        <p className="chapter-no">03</p>
        <h2>Thugir Labs</h2>
        <p className="lede">The technical depth behind the company work. Frontier research, not a side note.</p>
        <p className="measure">
          High-end AI security research. An autonomous engine that reasons, instead of only scanning. Closed beta.
        </p>
        <p className="build-links">
          <a href="https://thugir.com">thugir.com</a>
          <a href="https://thugirlabs.com">thugirlabs.com</a>
          <a href="https://www.youtube.com/watch?v=pzrIMsDy0Wg">Watch the demo</a>
        </p>
      </section>

      <section className="chapter">
        <p className="chapter-no">04</p>
        <h2>Selected work</h2>
        <p className="measure">Products I have actually shipped or opened. Thugir Labs is the research. These are the rest.</p>
        <ol className="builds">
          {ventures.map((row) => (
            <li key={row.name} className="build-row">
              <div className="build-head">
                {row.state ? <span className="state">{row.state}</span> : null}
                <h3>{row.name}</h3>
              </div>
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
        <p>
          <Link className="ghost" href="/work">
            All selected work
          </Link>
        </p>
      </section>

      <section className="chapter">
        <p className="chapter-no">05</p>
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
          I build the product, then I say what it does in plain words. 300K+ followers on Instagram,{" "}
          <a href="https://www.instagram.com/ryaneditraj/">@ryaneditraj</a>. Confirmed 24 October 2026.
        </p>
      </section>

      <section className="cta-band">
        <p className="kicker">A project</p>
        <h2>Start a project.</h2>
        <p>Tell me what the company needs built or run. The form is the door.</p>
        <p className="craft-note">This site was designed and built by me.</p>
        <p className="cta-actions">
          <Link className="stamp" href="/contact">
            Start a project
          </Link>
          <Link className="ghost" href="/services">
            See the services
          </Link>
        </p>
      </section>
    </Shell>
  );
}
