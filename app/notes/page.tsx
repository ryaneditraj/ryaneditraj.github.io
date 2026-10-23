import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/notes",
  title: "Notes",
  description: "Notes on Ryan Editraj’s site. Personal essays appear only when he publishes them.",
});

export default function NotesPage() {
  const notes = published(readCollection("notes"));
  return (
    <Shell section="Notes">
      <p className="kicker">Notes</p>
      <h1>Notes</h1>
      <p className="lede">A notebook, not a content mill. The only published note is a colophon about the site itself.</p>
      {notes.length === 0 ? (
        <p className="empty">Nothing published.</p>
      ) : (
        <ul className="directory-list">
          {notes.map((note) => (
            <li key={note.slug}>
              <a href={`/notes/${note.slug}`}>{note.title}</a>
              <div className="meta">{note.byline}</div>
              <p>{note.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}
