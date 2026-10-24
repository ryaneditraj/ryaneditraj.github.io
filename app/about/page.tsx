import { JsonLd } from "@/components/json-ld";
import { Shell } from "@/components/shell";
import { getSite } from "@/lib/content";
import { bridge } from "@/lib/lanes";
import { buildMeta, personId } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/about",
  title: "About",
  description: "Ryan Editraj is 16, a creator-founder in India, and the bridge from non-tech to tech.",
});

export default function AboutPage() {
  const site = getSite();
  return (
    <Shell section="About">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${personId()}-about`,
          mainEntity: { "@id": personId() },
        }}
      />
      <p className="kicker">About</p>
      <h1>Who is Ryan Editraj?</h1>
      <p className="lede">
        I am 16, in {site.location}. {bridge} I have been coding since about 12. I build security and AI products, and I explain them so they feel possible.
      </p>
      <div className="prose">
        <p>
          <a href="https://moneyradar.in/about/ryan-editraj">My MoneyRadar page</a> calls me founder of MoneyRadar and Thugir Group, and calls Thugir Group the parent of MoneyRadar and Thugir Labs. X and LinkedIn call me founder and CEO of Thugir Labs. No company registration was found.
        </p>
        <p>
          Instagram is <a href="https://www.instagram.com/ryaneditraj/">@ryaneditraj</a>. There I document the building. On LinkedIn and X I am the security founder. This site holds both.
        </p>
        <p>
          On 2 June 2026 I wrote that technology should explain itself, and that the job is to reduce complexity.
        </p>
        <p>
          I took part in the Liya Tech inaugural hackathon on 11 July 2026. The event is corroborated by the organizer and by other participants. A finishing place is not stated here.
        </p>
        <p>
          Age 16 is what my X bio says. A finer address is not printed. Reach me through <a href="/contact">the form</a>.
        </p>
      </div>
    </Shell>
  );
}
