import { JsonLd } from "@/components/json-ld";
import { Shell } from "@/components/shell";
import { getSite } from "@/lib/content";
import { buildMeta, personId } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/about",
  title: "About",
  description: "Ryan Editraj is 16, in Tamil Nadu. He builds companies. AI first.",
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
        I am 16, in {site.location}. I build companies. AI is the main thing. Some are mine, including MoneyRadar and Thugir Labs. Some I build with other people, as the technical co-builder. I also explain the work to people who are not in tech. I have been coding since about 12.
      </p>
      <div className="prose">
        <h2>Ventures I&apos;ve built</h2>
        <p>
          <a href="https://moneyradar.in/about/ryan-editraj">My MoneyRadar page</a> calls me founder of MoneyRadar and Thugir Group, and calls Thugir Group the parent of MoneyRadar and Thugir Labs. X and LinkedIn call me founder and CEO of Thugir Labs. No company registration was found. I do not name a co-founder title at a company that is not mine.
        </p>
        <p>
          Instagram is <a href="https://www.instagram.com/ryaneditraj/">@ryaneditraj</a>, 300K+ followers, confirmed 24 October 2026. I document the building there.
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
