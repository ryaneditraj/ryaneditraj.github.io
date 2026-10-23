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

Ryan Editraj is 16, as stated on his X bio, and is based in ${site.location}. He builds security and AI products and explains them so someone outside the field can use them. He is founder of MoneyRadar and of Thugir Group, the parent of MoneyRadar and Thugir Labs.

Instagram: https://www.instagram.com/ryaneditraj/ (@ryaneditraj). No follower count is stated in this file.
X: https://x.com/ryaneditraj
LinkedIn: https://linkedin.com/in/ryaneditraj
Contact form: ${origin}/contact

Build: ${origin}/build
Learn: ${origin}/learn
Start here: ${origin}/learn/start

## Selected work
${work}

## Collaborate
${origin}/collaborate

## Not claimed
This site does not list clients, testimonials, press, or an Instagram follower count. It does not state a vulnerability finding, a patent, a line count, or a hackathon place. Mentorship booking and the newsletter are off until configured. The private portal is not enabled.

## Optional
Canonical origin is SITE_URL when set. In production, with SITE_URL unset, it is https://ryaneditraj.vercel.app. Local development uses http://localhost:3000.
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
