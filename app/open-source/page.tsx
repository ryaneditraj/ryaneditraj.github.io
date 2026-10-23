import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/open-source",
  title: "Open source",
  description: "Original public repositories by Ryan Editraj, with stars as fetched on 23 October 2026.",
});

export default async function OpenSourcePage({ searchParams }: { searchParams: Promise<{ lane?: string }> }) {
  const { lane } = await searchParams;
  const all = published(readCollection("projects"));
  const lanes = [...new Set(all.map((project) => project.lane))];
  const projects = lane ? all.filter((project) => project.lane === lane) : all;
  return (
    <Shell section="Source">
      <p className="kicker">Open source</p>
      <h1>Repositories</h1>
      <p className="lede">Original repos only. Forks, Hacktoberfest contribution dumps, and a third-party Wi-Fi deauther fork are left out on purpose. Stars were read from the GitHub API on 23 October 2026.</p>
      <form className="filter" method="get">
        <label>
          <span>Lane</span>
          <select name="lane" defaultValue={lane ?? ""}>
            <option value="">All</option>
            {lanes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <button className="stamp" type="submit">
          Filter
        </button>
      </form>
      <table className="index">
        <thead>
          <tr>
            <th>Repo</th>
            <th>Language</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.slug}>
              <td data-label="Repo">
                {project.repo ? <a href={project.repo}>{project.title}</a> : project.title}
                <div className="meta">{project.summary}</div>
              </td>
              <td data-label="Language">{project.language}</td>
              <td data-label="Stars">{project.stars ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {projects.length === 0 ? <p className="empty">No repository in that lane.</p> : null}
    </Shell>
  );
}
