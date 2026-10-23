import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/resources",
  title: "Resources",
  description: "A resource shelf for Ryan Editraj. Empty until he publishes his own list.",
});

export default function ResourcesPage() {
  const items = published(readCollection("resources"));
  return (
    <Shell section="Resources">
      <p className="kicker">Resources</p>
      <h1>Resources</h1>
      <p className="lede">Guides and references Ryan chooses to share. None are published yet, so this page does not invent a reading list.</p>
      {items.length === 0 ? (
        <p className="empty todo">TODO(Ryan): add resources you actually recommend, with a one-line reason each.</p>
      ) : (
        <ul className="directory-list">
          {items.map((item) => (
            <li key={item.slug}>
              <a href={item.url}>{item.title}</a>
              <p>{item.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}
