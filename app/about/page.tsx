import { JsonLd } from "@/components/json-ld";
import { Shell } from "@/components/shell";
import { getSite } from "@/lib/content";
import { buildMeta, personId } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/about",
  title: "About",
  description: "Who Ryan Editraj is, according to the public record he has actually published.",
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
      <p className="lede">An AI builder in India who explains technical work to people outside the field. The sentence is his, from the GitHub profile README of 23 October 2026.</p>
      <div className="prose">
        <p>
          The profile README calls him an AI builder, founder, and engineer. “Founder” is his word. This site does not attach it to a company registration. The Indiquant README says that project is a Money Radar product by Thugir Group, maintained by Ryan Editraj. thugirlabs.com was up on the same day, titled “Thugir Labs — Autonomous Security Research.” His exact role there is unconfirmed.
        </p>
        <p>
          The public code matches the lane he describes: markets research (Indiquant, BTC 1% Radar), education software (Trinity One, a CBSE physics concept ranker), a local helmet-detection experiment, and Hack Club projects from 2026. Earlier repos are small Python and Flask exercises from 2022 and 2023.
        </p>
        <p>
          Instagram {site.instagram.handle} is the creator account. The follower line — {site.instagram.followersLabel} — is approximate and self-reported. Source: {site.instagram.source}
        </p>
        <p className="todo">
          TODO(Ryan): the GitHub account bio still says you are studying at St Joseph’s CBSE School, Manavalakurichi, and calls you a Linux fan. The newer profile README does not mention the school. Say which line is current.
        </p>
        <p>
          Email published on the profile README: <a href={`mailto:${site.email}`}>{site.email}</a>. Location on the same sources: {site.location}. Times on this site use {site.timezone}.
        </p>
      </div>
    </Shell>
  );
}
