import { JsonLd } from "@/components/json-ld";
import { LaneTable } from "@/components/lane-table";
import { Shell } from "@/components/shell";
import { getNow, getSite } from "@/lib/content";
import { bridge, buildRows, hero, learnRows, proofRows } from "@/lib/lanes";
import { personId, websiteId, buildMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = buildMeta({
  path: "/",
  title: "Ryan Editraj — The bridge from non-tech to tech",
  description:
    "Ryan Editraj is 16. He builds security and AI products, and he explains tech so anyone can use it. Based in India.",
});

export default function HomePage() {
  const site = getSite();
  const now = getNow();
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
            description: `${hero} ${bridge} He states that he is 16. Based in India.`,
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
      <p className="kicker">India · Age 16</p>
      <h1 className="h1-poster">{hero}</h1>
      <p className="lede">{bridge} Founder of Thugir Group. He states that he is 16.</p>
      <p>
        <a className="stamp" href="/build">
          See what he builds
        </a>{" "}
        <a className="ghost" href="/learn/start">
          New to tech
        </a>
      </p>
      <section className="section">
        <h2>Who is Ryan Editraj?</h2>
        <p className="measure">
          A creator-founder in India. He builds security and AI products under Thugir Group, including MoneyRadar and Thugir Labs, and he explains that work in public so someone outside the field can use it. Instagram is{" "}
          <a href="https://www.instagram.com/ryaneditraj/">@ryaneditraj</a>.
        </p>
      </section>
      <section className="section">
        <h2>What does he build?</h2>
        <LaneTable rows={buildRows} linkLabel="Open" />
        <p>
          <a className="ghost" href="/build">
            The build index
          </a>
        </p>
      </section>
      <section className="section">
        <h2>Where does he explain it?</h2>
        <LaneTable rows={learnRows} linkLabel="Open" />
      </section>
      <section className="section">
        <h2>What can you check?</h2>
        <p className="measure">Verified items only. A claim without a public source is not on this wall.</p>
        <table className="index">
          <thead>
            <tr>
              <th>Item</th>
              <th>Check</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {proofRows.map((row) => (
              <tr key={row.item}>
                <td data-label="Item">{row.item}</td>
                <td data-label="Check">{row.check}</td>
                <td data-label="Link">
                  <a href={row.href}>{row.label}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="section">
        <h2>How do you reach him?</h2>
        <p className="measure">Use the form. This site does not publish a street address.</p>
        <p>
          <a className="stamp" href="/contact">
            Open the contact form
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
