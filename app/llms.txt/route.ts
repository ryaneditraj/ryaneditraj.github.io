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

Ryan Editraj publishes applied AI software and explains technical work to a general audience. Instagram ${site.instagram.handle} is self-reported at ${site.instagram.followersLabel} as of ${site.instagram.asOf}. Source: ${site.instagram.source}

Email: ${site.email}

## Selected work
${work}

## Collaborate
${origin}/collaborate

## Not claimed
This site does not list clients, testimonials, press, or audited statistics unless a page shows a source and a date. Mentorship booking and the newsletter are off until configured. The private portal is not enabled.

## Optional
Canonical origin comes from the SITE_URL environment variable.
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
