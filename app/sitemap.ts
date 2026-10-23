import type { MetadataRoute } from "next";
import { published, readCollection } from "@/lib/content";
import { directoryGroups } from "@/lib/directory";
import { projectPath } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  const paths = new Set(directoryGroups.flatMap((group) => group.links.map((link) => link.href)));
  paths.delete("/portal");
  const dated = [...paths].map((path) => ({
    url: `${origin}${path === "/" ? "" : path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.6,
  }));
  const projects = published(readCollection("projects"))
    .map((project) => projectPath(project))
    .filter((path): path is string => Boolean(path))
    .map((path) => ({ url: `${origin}${path}`, changeFrequency: "monthly" as const, priority: 0.5 }));
  const notes = published(readCollection("notes")).map((note) => ({
    url: `${origin}/notes/${note.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));
  const playbooks = published(readCollection("playbooks")).map((item) => ({
    url: `${origin}/playbooks/${item.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));
  return [...dated, ...projects, ...notes, ...playbooks];
}
