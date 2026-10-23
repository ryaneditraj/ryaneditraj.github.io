import { getSite, published, readCollection } from "@/lib/content";

export function GET() {
  const site = getSite();
  const metrics = published(readCollection("metrics"));
  const lines = [
    `# ${site.name} — media kit`,
    "",
    site.positioning,
    "",
    `Instagram: https://www.instagram.com/ryaneditraj/ (@ryaneditraj, no follower count)`,
    `Age: 16 (stated on his X bio, checked 23 October 2026)`,
    `Location: ${site.location}`,
    `Timezone: ${site.timezone}`,
    `Email: ${site.email}`,
    `X: https://x.com/ryaneditraj`,
    `LinkedIn: https://linkedin.com/in/ryaneditraj`,
    "",
    "## Profile counts",
    "",
    ...metrics.flatMap((metric) => [
      `### ${metric.label}`,
      "",
      `${metric.value}`,
      "",
      metric.note,
      "",
      `As of ${metric.asOf}. Source: ${metric.source}`,
      "",
    ]),
    "## Not included",
    "",
    "No Instagram follower count. No street address. No unverified award, filing, or line count.",
    "",
    "## Missing",
    "",
    "No portrait is included. No client list or testimonial is included, because none was verified.",
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'attachment; filename="ryan-editraj-media-kit.md"',
    },
  });
}
