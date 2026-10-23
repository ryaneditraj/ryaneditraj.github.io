import { Crumbs } from "@/components/crumbs";
import { Markdown } from "@/lib/markdown";
import type { Project } from "@/lib/schemas";

export function ProjectView({ project, parent }: { project: Project; parent: { href: string; label: string } }) {
  return (
    <>
      <Crumbs items={[{ href: "/", label: "Home" }, parent, { label: project.title }]} />
      <p className="kicker">
        {project.year} · {project.lane} · {project.stage}
      </p>
      <h1>{project.title}</h1>
      <p className="lede">{project.summary}</p>
      <Markdown source={project.body} />
      <dl className="facts">
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>{project.stack.join(", ") || "Not stated"}</dd>
        </div>
        <div>
          <dt>Repository</dt>
          <dd>{project.repo ? <a href={project.repo}>{project.repo.replace("https://github.com/", "")}</a> : "None"}</dd>
        </div>
        <div>
          <dt>Stars</dt>
          <dd>{project.stars == null ? "Not recorded" : `${project.stars} on GitHub, ${project.starsAsOf}`}</dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{project.verifiedFrom}</dd>
        </div>
        {project.homepageNote ? (
          <div>
            <dt>Homepage</dt>
            <dd>{project.homepageNote}</dd>
          </div>
        ) : null}
      </dl>
    </>
  );
}
