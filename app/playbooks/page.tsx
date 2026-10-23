import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/playbooks",
  title: "Playbooks",
  description: "How to use Ryan Editraj’s site. Not client case studies.",
});

export default function PlaybooksPage() {
  const items = published(readCollection("playbooks"));
  return (
    <Shell section="Playbooks">
      <p className="kicker">Playbooks</p>
      <h1>Playbooks</h1>
      <p className="lede">Operating notes for this site. They are not stories about clients.</p>
      <ul className="directory-list">
        {items.map((item) => (
          <li key={item.slug}>
            <a href={`/playbooks/${item.slug}`}>{item.title}</a>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
