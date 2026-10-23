import { Shell } from "@/components/shell";
import { getNow } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/now",
  title: "Now",
  description: "What Ryan Editraj is doing now, or the placeholder standing in until he writes it.",
});

export default function NowPage() {
  const now = getNow();
  return (
    <Shell section="Now">
      <p className="kicker">Now · {now.updatedAt.slice(0, 10)}</p>
      <h1>What is he doing now?</h1>
      <p className="lede todo">{now.text}</p>
      <p className="meta">{now.source}</p>
    </Shell>
  );
}
