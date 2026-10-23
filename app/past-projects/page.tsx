import { ProjectIndex } from "@/components/project-index";
import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/past-projects",
  title: "Past projects",
  description: "Finished public repositories by Ryan Editraj, including early exercises.",
});

export default function PastPage() {
  const projects = published(readCollection("projects"))
    .filter((project) => project.stage === "completed")
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  return (
    <Shell section="Archive">
      <p className="kicker">Archive</p>
      <h1>Past projects</h1>
      <p className="lede">Completed repositories. Early games sit next to later experiments because both are public and both are finished enough to list. Active work is on Building.</p>
      <ProjectIndex projects={projects} />
    </Shell>
  );
}
