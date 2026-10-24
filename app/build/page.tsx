import { LaneTable } from "@/components/lane-table";
import { Shell } from "@/components/shell";
import { buildRows } from "@/lib/lanes";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/build",
  title: "Build",
  description: "Why Ryan Editraj is building each product, and where to open it.",
});

export default function BuildPage() {
  return (
    <Shell section="Build">
      <p className="kicker">Build</p>
      <h1>What I am building</h1>
      <p className="lede">Each line is the problem it is there to fix. Then the link, so you can open the thing itself.</p>
      <LaneTable rows={buildRows} linkLabel="Open" />
      <p className="meta">Sources checked 23 October 2026: the product sites, the GitHub API, and the MoneyRadar author page.</p>
    </Shell>
  );
}
