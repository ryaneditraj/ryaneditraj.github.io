import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { projectPath } from "@/lib/projects";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/lab",
  title: "Lab",
  description: "Experiments and one-off builds from Ryan Editraj’s public repositories.",
});

export default function LabPage() {
  const projects = published(readCollection("projects")).filter((project) => project.lab);
  return (
    <Shell section="Lab">
      <p className="kicker">Lab</p>
      <h1>Experiments</h1>
      <p className="lede">Things built to learn a method or answer one question. Not all of them are products, and none of them are client work.</p>
      <ol className="directory-list">
        {projects.map((project) => (
          <li key={project.slug}>
            <a href={projectPath(project) ?? project.repo ?? "#"}>{project.title}</a>
            <div className="meta">{project.summary}</div>
          </li>
        ))}
      </ol>
    </Shell>
  );
}
