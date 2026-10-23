import type { Project } from "@/lib/schemas";

export function projectPath(project: Pick<Project, "slug" | "featured" | "lab">): string | null {
  if (project.featured) return `/work/${project.slug}`;
  if (project.lab) return `/lab/${project.slug}`;
  return null;
}

export function lanes(projects: Project[]): string[] {
  return [...new Set(projects.map((project) => project.lane))].sort();
}
