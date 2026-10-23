import { Shell } from "@/components/shell";
import { getSite, published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/media-kit",
  title: "Media kit",
  description: "Facts about Ryan Editraj for producers. Every number has a source and a date.",
});

export default function MediaKitPage() {
  const site = getSite();
  const metrics = published(readCollection("metrics"));
  return (
    <Shell section="Media kit">
      <p className="kicker">Media kit</p>
      <h1>Facts a producer can check</h1>
      <p className="lede">No engagement rate, no brand list, no audience cities. Those were not verified. The download is the same text as a Markdown file.</p>
      <p>
        <a className="stamp" href="/media-kit/download">
          Download the kit
        </a>
      </p>
      <section className="section">
        <h2>Positioning</h2>
        <p className="measure">{site.positioning} He builds applied AI and explains it to people outside the field.</p>
        <p className="meta">Source: GitHub profile README, 2026-10-23, plus the brief he gave for this site.</p>
      </section>
      <section className="section">
        <h2>Metrics</h2>
        <table className="index">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
              <th>As of</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.id}>
                <td data-label="Metric">
                  {metric.label}
                  <div className="meta">{metric.note}</div>
                </td>
                <td data-label="Value">{metric.value}</td>
                <td data-label="As of">{metric.asOf}</td>
                <td data-label="Source">{metric.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="section">
        <h2>Boilerplate</h2>
        <p className="measure">
          {site.name} is an AI builder and engineer in {site.location}. He publishes software in public and explains technical ideas for a general audience as {site.instagram.handle}.
        </p>
        <p className="todo">TODO(Ryan): replace the boilerplate if you want a shorter or longer one. Add a portrait only when you supply the file. This kit does not use a stock photo.</p>
      </section>
      <section className="section">
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </section>
    </Shell>
  );
}
