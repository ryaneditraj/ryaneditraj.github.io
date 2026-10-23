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
        He is 16, in {site.location}. {bridge} He builds security and AI products, and he explains them so someone outside the field can use them.
      </p>
      <div className="prose">
        <p>
          <a href="https://moneyradar.in/about/ryan-editraj">His MoneyRadar page</a> calls him founder of MoneyRadar and Thugir Group, and calls Thugir Group the parent of MoneyRadar and Thugir Labs. X and LinkedIn call him founder and CEO of Thugir Labs. No company registration was found.
        </p>
        <p>
          Instagram is <a href="https://www.instagram.com/ryaneditraj/">@ryaneditraj</a>. The bio there presents a creator who documents building. LinkedIn and X present a security founder. This site holds both: the products are under Build, the explanation is under Learn.
        </p>
        <p>
          The closest essay to that bridge is on Medium, 2 June 2026. He writes that technology should explain itself, and that the job is to reduce complexity.
        </p>
        <p>
          He took part in the Liya Tech inaugural hackathon on 11 July 2026. The event is corroborated by the organizer and by other participants. A finishing place is not stated here.
        </p>
        <p>
          Age 16 is what his X bio says. A finer address is not printed. Reach him through <a href="/contact">the form</a>.
        </p>
      </div>
    </Shell>
  );
}
