import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { projectPath } from "@/lib/projects";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/building",
  title: "Building",
  description: "Ryan Editraj’s active repositories beside the finished ones.",
});

function List({ title, stage }: { title: string; stage: "active" | "completed" }) {
  const projects = published(readCollection("projects")).filter((project) => project.stage === stage);
  return (
    <section>
      <h2>{title}</h2>
      <ul className="directory-list">
        {projects.map((project) => (
          <li key={project.slug}>
            <a href={projectPath(project) ?? project.repo ?? "#"}>{project.title}</a>
            <div className="meta">{project.year}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function BuildingPage() {
  return (
    <Shell section="Building">
      <p className="kicker">Building</p>
      <h1>Active, then finished</h1>
      <p className="lede">Stage is a reading of the repository, not a launch announcement. “Active” means the README still describes current software.</p>
      <div className="columns two">
        <List title="Active" stage="active" />
        <List title="Completed" stage="completed" />
      </div>
      <section className="section">
        <h2>Related public sites</h2>
        <p className="measure">
          <a href="https://moneyradar.in">moneyradar.in</a> returned HTTP 200 on 23 October 2026. The title was “MoneyRadar — Gen Z Money Decisions for India.” His <a href="https://moneyradar.in/about/ryan-editraj">author page</a> calls him founder of MoneyRadar and Thugir Group. The path /indiquant on that host returned 404 the same day.
        </p>
        <p className="measure">
          <a href="https://www.thugirlabs.com">thugirlabs.com</a> returned HTTP 200. Thugir Labs is autonomous security research for pentesters, security teams, and MSPs, in a free closed beta. Thugir Group is the parent. The site lists sales@thugirlabs.com.
        </p>
      </section>
    </Shell>
  );
}
