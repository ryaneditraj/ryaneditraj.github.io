import { getSite, published, readCollection } from "@/lib/content";

export function GET() {
  const site = getSite();
  const metrics = published(readCollection("metrics"));
  const lines = [
    `# ${site.name} — media kit`,
    "",
    site.positioning,
    "",
    `Location: ${site.location}`,
    `Timezone: ${site.timezone}`,
    `Email: ${site.email}`,
    `Instagram: ${site.instagram.url}`,
    "",
    "## Metrics",
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
    "## Missing",
    "",
    "No portrait is included. No engagement rate, client list, or testimonial is included, because none was verified.",
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'attachment; filename="ryan-editraj-media-kit.md"',
    },
  });
}
