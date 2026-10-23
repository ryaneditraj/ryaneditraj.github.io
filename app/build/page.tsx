import { LaneTable } from "@/components/lane-table";
import { Shell } from "@/components/shell";
import { buildRows } from "@/lib/lanes";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/build",
  title: "Build",
  description: "Products Ryan Editraj is building, each with a plain line about what it does and a link.",
});

export default function BuildPage() {
  return (
    <Shell section="Build">
      <p className="kicker">Build</p>
      <h1>What he is building</h1>
      <p className="lede">Security products and AI products. Each line says what it does for a person, then where to open it.</p>
      <LaneTable rows={buildRows} linkLabel="Open" />
      <p className="meta">Sources checked 23 October 2026: the product sites, the GitHub API, and the MoneyRadar author page.</p>
    </Shell>
  );
}
