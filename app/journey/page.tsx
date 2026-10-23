import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/journey",
  title: "Journey",
  description: "A dated record of Ryan Editraj’s public work. Undated claims are left out.",
});

export default function JourneyPage() {
  const items = published(readCollection("journey")).slice().sort((a, b) => a.date.localeCompare(b.date));
  return (
    <Shell section="Journey">
      <p className="kicker">Journey</p>
      <h1>A dated record</h1>
      <p className="lede">Each line has a date and a source. There is no invented arc between them.</p>
      <ol className="directory-list">
        {items.map((item) => (
          <li key={item.id}>
            <div className="meta">{item.date}</div>
            <h2>{item.title}</h2>
            <p className="measure">{item.body}</p>
            <p className="meta">{item.source}</p>
          </li>
        ))}
      </ol>
    </Shell>
  );
}
