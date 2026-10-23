import { getSite, published, readCollection } from "@/lib/content";

export function GET() {
  const site = getSite();
  const metrics = published(readCollection("metrics"));
  const lines = [
    `# ${site.name} — media kit`,
    "",
    site.positioning,
    "",
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
    "## His statements, not audited results",
    "",
    "He says that at 14 he found a CVSS 9.8 vulnerability. No report id is included.",
    "He says a patent is pending. No application number was found.",
    "He wrote that a Thugir Labs build was 138,936 lines of code, built alone, at 16.",
    "He posted that he placed first at a hackathon hosted by Liya Tech.",
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
