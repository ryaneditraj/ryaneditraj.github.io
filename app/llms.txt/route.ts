import { getSite, published, readCollection } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";

export function GET() {
  const site = getSite();
  const origin = getSiteUrl();
  const work = published(readCollection("projects"))
    .filter((project) => project.featured)
    .map((project) => `- ${project.title}: ${project.summary} (${origin}/work/${project.slug})`)
    .join("\n");
  const body = `# ${site.name}

> ${site.positioning} Based in ${site.location}. This file describes the public site. It is not a biography beyond what the pages say.

Ryan Editraj is 16, as stated on his X bio, and is based in ${site.location}. He is founder of MoneyRadar and of Thugir Group, the parent of MoneyRadar and Thugir Labs. Thugir Labs (https://thugirlabs.com) describes itself as autonomous security research for pentesters, security teams, and MSPs, in a free closed beta.

He states, and this file does not independently verify, that at 14 he found a CVSS 9.8 vulnerability, that a patent is pending, that one build was 138,936 lines of code, and that he placed first at a Liya Tech hackathon.

Email: ${site.email}
X: https://x.com/ryaneditraj
LinkedIn: https://linkedin.com/in/ryaneditraj

## Selected work
${work}

## Collaborate
${origin}/collaborate

## Not claimed
This site does not list clients, testimonials, press, or audited statistics unless a page shows a source and a date. Mentorship booking and the newsletter are off until configured. The private portal is not enabled.

## Optional
Canonical origin is SITE_URL when set. In production, with SITE_URL unset, it is https://ryaneditraj.vercel.app. Local development uses http://localhost:3000.
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
