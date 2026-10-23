import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/tools",
  title: "Tools",
  description: "Published tools with a working public URL. Cloneable repositories are listed under open source instead.",
});

export default function ToolsPage() {
  const tools = published(readCollection("tools"));
  return (
    <Shell section="Tools">
      <p className="kicker">Tools</p>
      <h1>Published tools</h1>
      <p className="lede">A tool is listed here only when a public URL answered. Repositories you clone are under open source, not here.</p>
      {tools.length === 0 ? (
        <div className="empty">
          <p>None verified on 23 October 2026.</p>
          <p>The TuitionOS homepage field, https://tuition-os-eta.vercel.app, returned HTTP 404. Indiquant’s README path https://moneyradar.in/indiquant also returned 404. MoneyRadar’s root URL was up, and it is linked from Building because the relationship is a product family, not a confirmed first-party app on this site.</p>
          <p>
            <a className="ghost" href="/open-source">
              Open source
            </a>
          </p>
        </div>
      ) : (
        <ul className="directory-list">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <a href={tool.url}>{tool.title}</a>
              <div className="meta">
                Checked {tool.checkedOn}. {tool.relation}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}
