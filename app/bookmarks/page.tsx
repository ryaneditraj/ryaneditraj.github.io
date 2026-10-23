import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/bookmarks",
  title: "Bookmarks",
  description: "Public pages tied to Ryan Editraj’s work, with categories and tags.",
});

export default async function BookmarksPage({ searchParams }: { searchParams: Promise<{ category?: string; tag?: string }> }) {
  const query = await searchParams;
  const all = published(readCollection("bookmarks"));
  const categories = [...new Set(all.flatMap((item) => item.categories))];
  const tags = [...new Set(all.flatMap((item) => item.tags))];
  const items = all.filter((item) => {
    if (query.category && !item.categories.includes(query.category)) return false;
    if (query.tag && !item.tags.includes(query.tag)) return false;
    return true;
  });
  return (
    <Shell section="Bookmarks">
      <p className="kicker">Bookmarks</p>
      <h1>Places attached to the work</h1>
      <p className="lede">These are his public properties, not a private reading list. A reading list waits until he publishes one.</p>
      <form className="filter" method="get">
        <label>
          <span>Category</span>
          <select name="category" defaultValue={query.category ?? ""}>
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Tag</span>
          <select name="tag" defaultValue={query.tag ?? ""}>
            <option value="">All</option>
            {tags.map((tag) => (
              <option key={tag}>{tag}</option>
            ))}
          </select>
        </label>
        <button className="stamp" type="submit">
          Filter
        </button>
      </form>
      {items.length === 0 ? <p className="empty">Nothing in that filter.</p> : null}
      <ul className="directory-list">
        {items.map((item) => (
          <li key={item.slug}>
            <a href={item.url}>{item.title}</a>
            <div className="meta">
              {item.categories.join(", ")} · {item.tags.join(", ")}
            </div>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
