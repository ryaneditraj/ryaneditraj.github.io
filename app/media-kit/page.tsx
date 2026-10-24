import { Shell } from "@/components/shell";
import { getSite, published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/media-kit",
  title: "Media kit",
  description: "Facts about Ryan Editraj for producers. Counts have a source and a date. Unverified claims are left out.",
});

export default function MediaKitPage() {
  const site = getSite();
  const metrics = published(readCollection("metrics"));
  return (
    <Shell section="Media kit">
      <p className="kicker">Media kit</p>
      <h1>Facts a producer can check</h1>
      <p className="lede">Profile counts, each with a date. Instagram is 300K+, confirmed by Ryan. No street address.</p>
      <p>
        <a className="stamp" href="/media-kit/download">
          Download the kit
        </a>
      </p>
      <section className="section">
        <h2>Positioning</h2>
        <p className="measure">
          {site.name} is 16 and is based in {site.location}. {site.positioning} Instagram is @ryaneditraj.
        </p>
        <p className="meta">Sources: X bio, Instagram handle, moneyradar.in/about/ryan-editraj, Medium essay of 2 June 2026. Checked 23 October 2026.</p>
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
        <h2>Boilerplate</h2>
        <p className="measure">
          {site.name} is 16 and is based in {site.location}. He builds companies. AI first. Ventures he has built include MoneyRadar and Thugir Labs. He also builds with other founders, and he does not name those companies. Instagram is @ryaneditraj, 300K+ followers. No client list is included.
        </p>
        <p className="todo">TODO(Ryan): the site portrait is public/ryan.jpg, from the GitHub avatar. Replace that file if you want a different photo.</p>
      </section>
      <section className="section">
        <h2>Contact</h2>
        <p>
          <a href="/contact">The form</a>
        </p>
        <p className="meta">Reply address if mail is unset: {site.email}. Thugir Labs lists sales@thugirlabs.com. No street address.</p>
      </section>
    </Shell>
  );
}
