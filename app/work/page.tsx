import { ProjectIndex } from "@/components/project-index";
import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/work",
  title: "Work",
  description: "Selected public projects by Ryan Editraj, each tied to a GitHub repository.",
});

export default function WorkPage() {
  const projects = published(readCollection("projects")).filter((project) => project.featured);
  return (
    <Shell section="Work">
      <p className="kicker">Work</p>
      <h1>Selected work</h1>
      <p className="lede">The short list. Descriptions come from each repository, not from a pitch. The archive is longer.</p>
      <ProjectIndex projects={projects} />
      <p>
        <a className="ghost" href="/past-projects">
          Past projects
        </a>
      </p>
    </Shell>
  );
}
