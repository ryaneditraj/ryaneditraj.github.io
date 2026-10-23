import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/press",
  title: "Press",
  description: "Press mentions of Ryan Editraj. Empty until a real clipping is added.",
});

export default function PressPage() {
  const items = published(readCollection("press"));
  return (
    <Shell section="Press">
      <p className="kicker">Press</p>
      <h1>Press</h1>
      <p className="lede">No clipping was verified for this build. The page stays empty rather than quoting coverage that was not found.</p>
      {items.length === 0 ? (
        <p className="empty todo">TODO(Ryan): add an outlet, a date, a URL, and the headline. Do not add a quote you cannot link.</p>
      ) : (
        <ul className="directory-list">
          {items.map((item) => (
            <li key={item.slug}>
              {item.url ? <a href={item.url}>{item.title}</a> : item.title}
              <div className="meta">
                {item.outlet}
                {item.date ? ` · ${item.date}` : ""}
              </div>
            </li>
          ))}
        </ul>
      )}
      <p>
        <a className="ghost" href="/media-kit">
          Media kit
        </a>
      </p>
    </Shell>
  );
}
