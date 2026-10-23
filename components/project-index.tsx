import { projectPath } from "@/lib/projects";
import type { Project } from "@/lib/schemas";

export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <table className="index">
      <thead>
        <tr>
          <th>No.</th>
          <th>Work</th>
          <th>Year</th>
          <th>Stage</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => {
          const href = projectPath(project) ?? project.repo ?? "#";
          return (
            <tr key={project.slug}>
              <td className="num" data-label="No.">{String(index + 1).padStart(2, "0")}</td>
              <td data-label="Work">
                <a href={href}>{project.title}</a>
                <div className="meta">{project.summary}</div>
              </td>
              <td data-label="Year">{project.year}</td>
              <td data-label="Stage">{project.stage}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
