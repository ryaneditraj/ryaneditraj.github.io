import { JsonLd } from "@/components/json-ld";
import { Shell } from "@/components/shell";
import { getSite } from "@/lib/content";
import { buildMeta, personId } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/about",
  title: "About",
  description: "Ryan Editraj is 16, in Tamil Nadu, India, and founder of MoneyRadar and Thugir Group.",
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
        He is 16, based in {site.location}. {site.positioning}
      </p>
      <div className="prose">
        <p>
          The founder line is his. <a href="https://moneyradar.in/about/ryan-editraj">moneyradar.in/about/ryan-editraj</a> calls him founder of MoneyRadar and Thugir Group. The same page calls Thugir Group the parent of MoneyRadar and Thugir Labs. His X bio and LinkedIn headline call him founder and CEO of Thugir Labs. No company registration was found, so this site does not add one.
        </p>
        <p>
          <a href="https://thugirlabs.com">thugirlabs.com</a>, checked 23 October 2026, describes Thugir Labs as autonomous security research for pentesters, security teams, and MSPs. It is a free closed beta, and the contact on the site is sales@thugirlabs.com. An older X bio described network security monitoring for law firms and healthcare. That is not the line on the current site.
        </p>
        <p>
          MoneyRadar publishes free finance calculators and guides for India and says they are not SEBI advice. His author page quotes him: “Security researcher turned product builder — obsessed with systems that quietly cheat people.”
        </p>
        <h2>What he says, in his words</h2>
        <p>
          On LinkedIn he writes: “I started in cybersecurity at 12. At 14, I found a CVSS 9.8 critical vulnerability on OLX.in.” He was not in the 2026 entries of the OLX Hall of Fame page when that page was checked. Earlier years were not checked. There is no report id here, and no description of the bug.
        </p>
        <p>
          X and LinkedIn both say a patent is pending. No application number or title was found.
        </p>
        <p>
          On 30 May 2026 he posted that a Thugir Labs build was 138,936 lines of code, built alone, at 16, and that he was launching it on Product Hunt. The post is his. The Product Hunt launch was not found.
        </p>
        <p>
          On 13 July 2026 he posted that he placed first at his first hackathon, hosted by Liya Tech. No independent write-up was found, so it is not on the press page.
        </p>
        <p>
          Age 16 is what his X bio says, and what the 30 May 2026 post says (“At 16”). It is his statement. It is shown because he asked for it on this site.
        </p>
        <p>
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>. Times on this site use {site.timezone}. Location is {site.location}. A finer address is not printed. A school name that appears on some profiles is omitted.
        </p>
      </div>
    </Shell>
  );
}
