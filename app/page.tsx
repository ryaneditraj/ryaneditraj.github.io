import { JsonLd } from "@/components/json-ld";
import { PortraitStage } from "@/components/portrait-stage";
import { Shell } from "@/components/shell";
import { getNow, getSite } from "@/lib/content";
import { bridge, buildRows, learnRows, mission, proofRows } from "@/lib/lanes";
import { personId, websiteId, buildMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

const nowLine = "Thugir Labs, closed beta  ·  MoneyRadar, live  ·  Explaining the work on Instagram";

export const metadata = buildMeta({
  path: "/",
  title: "Ryan Editraj — The bridge from non-tech to tech",
  description:
    "I am 16, in Tamil Nadu, India. I build security and AI products, and I explain tech so it feels possible for people who think it is not for them.",
});

export default function HomePage() {
  const site = getSite();
  const now = getNow();
  const origin = getSiteUrl();
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
            description: `${mission} ${bridge} He states that he is 16. Based in Tamil Nadu, India.`,
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

      <PortraitStage mission={mission} />
      <div className="zine-marquee" aria-hidden="true">
        <div className="zine-marquee-track">
          <span>{nowLine} · </span>
          <span>{nowLine} · </span>
        </div>
      </div>

      <section className="chapter">
        <p className="chapter-no">01</p>
        <h2>Why I build</h2>
        <div className="why-lines">
          <p>People hit a wall of jargon.</p>
          <p>They decide tech is not for them.</p>
          <p>I refuse that door.</p>
        </div>
        <blockquote className="pull">
          <p>Technology should explain itself… reduce complexity.</p>
          <footer>What I wrote, 2 June 2026.</footer>
        </blockquote>
        <p className="measure">
          {bridge} I build the product. Then I say what it does, in public, in plain words. That is the whole point.
        </p>
        <p>
          <a href="https://medium.com/@ryaneditraj/a-16-year-old-founders-prediction-the-next-cybersecurity-crisis-will-be-powered-by-ai-6cbd75ad947a">
            Read the essay
          </a>
        </p>
      </section>

      <section className="chapter">
        <p className="chapter-no">02</p>
        <h2>What I am building</h2>
        <p className="lede">Live, and still in my hands. Each one exists because a real person was stuck.</p>
        <ol className="builds">
          {buildRows.map((row) => (
            <li key={row.name} className="build-row">
              <div className="build-head">
                {row.state ? <span className="state">{row.state}</span> : null}
                <h3>{row.name}</h3>
              </div>
              <p>{row.line}</p>
              {row.note ? <p className="meta">{row.note}</p> : null}
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
        <p className="chapter-no">03</p>
        <h2>Come learn with me</h2>
        <p className="lede">The other half of the work. I build it, then I explain it, for people who are not already inside.</p>
        <ol className="builds">
          {learnRows.map((row) => (
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
        <h2>What you can check</h2>
        <p className="measure">If I cannot point at it, it is not on this wall. Open the link.</p>
        <ol className="proof">
          {proofRows.map((row, index) => (
            <li key={row.item}>
              <span className="num">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{row.item}</h3>
                <p>{row.check}</p>
                <a href={row.href}>{row.label}</a>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="cta-band">
        <p className="kicker">Stay close</p>
        <h2>If the bridge is what you needed, come through it.</h2>
        <p>Follow the work. Or write to me. The form is the door. There is no street address.</p>
        <p className="cta-actions">
          <a className="stamp" href="https://www.instagram.com/ryaneditraj/">
            Follow @ryaneditraj
          </a>
          <a className="ghost" href="/collaborate">
            Collaborate
          </a>
          <a className="ghost" href="/contact">
            Contact
          </a>
        </p>
      </section>
    </Shell>
  );
}
