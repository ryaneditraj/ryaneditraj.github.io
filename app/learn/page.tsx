import { LaneTable } from "@/components/lane-table";
import { Shell } from "@/components/shell";
import { learnRows } from "@/lib/lanes";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/learn",
  title: "Learn",
  description: "Where Ryan Editraj explains tech: Instagram, a Medium essay, and a Thugir Labs demo.",
});

export default function LearnPage() {
  return (
    <Shell section="Learn">
      <p className="kicker">Learn</p>
      <h1>Where he explains it</h1>
      <p className="lede">The other half of the work. He builds the product, then says what it is in public, for people who are not already in the field.</p>
      <LaneTable rows={learnRows} linkLabel="Open" />
      <p>
        <a className="stamp" href="/learn/start">
          Start here if you are new to tech
        </a>
      </p>
    </Shell>
  );
}
