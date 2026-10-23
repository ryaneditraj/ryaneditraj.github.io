import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/uses",
  title: "Uses",
  description: "Tools Ryan Editraj has confirmed, and blanks where he has not.",
});

export default function UsesPage() {
  const items = published(readCollection("uses"));
  return (
    <Shell section="Uses">
      <p className="kicker">Uses</p>
      <h1>Uses</h1>
      <p className="lede">Only the operating-system line is sourced. Everything else is a blank with his name on it.</p>
      <dl className="facts">
        {items.map((item) => (
          <div key={item.id}>
            <dt>{item.area}</dt>
            <dd>
              <strong>{item.item}</strong>
              <div className={item.verified ? undefined : "todo"}>{item.detail}</div>
            </dd>
          </div>
        ))}
      </dl>
    </Shell>
  );
}
