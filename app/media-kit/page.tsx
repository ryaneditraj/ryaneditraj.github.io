import { Shell } from "@/components/shell";
import { getSite, published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/media-kit",
  title: "Media kit",
  description: "Facts about Ryan Editraj for producers. Counts have a source and a date. His other claims are marked as his.",
});

export default function MediaKitPage() {
  const site = getSite();
  const metrics = published(readCollection("metrics"));
  return (
    <Shell section="Media kit">
      <p className="kicker">Media kit</p>
      <h1>Facts a producer can check</h1>
      <p className="lede">Profile counts below are snapshots with a date. A patent, a vulnerability, a line count, and a hackathon place are his statements, not audited results.</p>
      <p>
        <a className="stamp" href="/media-kit/download">
          Download the kit
        </a>
      </p>
      <section className="section">
        <h2>Positioning</h2>
        <p className="measure">
          {site.name} is 16 and is based in {site.location}. {site.positioning} Thugir Labs is autonomous security research for pentesters, security teams, and MSPs, in a free closed beta.
        </p>
        <p className="meta">Sources: X bio, moneyradar.in/about/ryan-editraj, thugirlabs.com. Checked 23 October 2026.</p>
      </section>
      <section className="section">
        <h2>Profile counts</h2>
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
        <h2>His statements</h2>
        <dl className="facts">
          <div>
            <dt>At 14</dt>
            <dd>He says he found a CVSS 9.8 vulnerability. No report id is published here.</dd>
          </div>
          <div>
            <dt>Patent</dt>
            <dd>He says one is pending. No application number was found.</dd>
          </div>
          <div>
            <dt>Line count</dt>
            <dd>He wrote that a Thugir Labs build was 138,936 lines, built alone, at 16.</dd>
          </div>
          <div>
            <dt>Hackathon</dt>
            <dd>He posted that he placed first at a Liya Tech hackathon, his first.</dd>
          </div>
        </dl>
        <p className="meta">LinkedIn About, X bio, and his posts of 30 May 2026 and 13 July 2026.</p>
      </section>
      <section className="section">
        <h2>Boilerplate</h2>
        <p className="measure">
          {site.name} is 16 and lives in {site.location}. He is founder of MoneyRadar and of Thugir Group, the parent of MoneyRadar and Thugir Labs. Thugir Labs is a free closed beta for autonomous security research, aimed at pentesters, security teams, and MSPs.
        </p>
        <p className="todo">TODO(Ryan): add a portrait only when you supply the file. This kit does not use a stock photo.</p>
      </section>
      <section className="section">
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p className="meta">Thugir Labs lists sales@thugirlabs.com on its site.</p>
      </section>
    </Shell>
  );
}
