import { Shell } from "@/components/shell";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/community",
  title: "Community",
  description: "Ryan Editraj has not opened a community space. There is no fake activity here.",
});

export default function CommunityPage() {
  return (
    <Shell section="Community">
      <p className="kicker">Community</p>
      <h1>No community is open</h1>
      <p className="lede">There is no member count, no Discord, and no recent-posts widget. Those would have to be invented, so they are absent.</p>
      <p className="todo measure">TODO(Ryan): if you open a space, name the real URL and this page can point at it. Until then it stays quiet.</p>
    </Shell>
  );
}
