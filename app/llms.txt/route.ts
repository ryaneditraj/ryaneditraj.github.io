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

Ryan Editraj is 16, as stated on his X bio, and is based in ${site.location}. He builds companies. AI is the main thing. His own include Thugir Labs and MoneyRadar. He also builds as a technical co-builder with other founders, and he does not name those companies or claim a title at one. He explains the work to people who are not in tech. Instagram is 300K+ followers. No client name is published.

Instagram: https://www.instagram.com/ryaneditraj/ (@ryaneditraj, 300K+ followers, confirmed by Ryan on 24 October 2026).
X: https://x.com/ryaneditraj
LinkedIn: https://linkedin.com/in/ryaneditraj
Contact form: ${origin}/contact

Build: ${origin}/build
Learn: ${origin}/learn
Start here: ${origin}/learn/start

## Selected work
${work}

## Work with me
Partnership and collaboration, not a service menu: ${origin}/services

## Contact
${origin}/contact

## Not claimed
Thugir Labs is high-end AI security research: an autonomous engine that reasons, instead of only scanning. Closed beta. https://thugir.com and the demo at https://www.youtube.com/watch?v=pzrIMsDy0Wg

This site does not list client names, testimonials, or prices. It does not state a vulnerability finding, a patent, a line count, or a hackathon place. It does not state a vulnerability finding, a patent, a line count, or a hackathon place. Mentorship booking and the newsletter are off until configured. The private portal is not enabled.

## Optional
Canonical origin is SITE_URL when set. In production, with SITE_URL unset, it is https://ryaneditraj.vercel.app. Local development uses http://localhost:3000.
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
