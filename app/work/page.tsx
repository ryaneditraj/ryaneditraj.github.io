import { ProjectIndex } from "@/components/project-index";
import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMeta({
  path: "/work",
  title: "Work",
  description: "Selected work by Ryan Editraj, led by Thugir Labs and the other products he has shipped.",
});

export default function WorkPage() {
  const projects = published(readCollection("projects")).filter((project) => project.featured);
  return (
    <Shell section="Work">
      <p className="kicker">Work</p>
      <h1>Selected work</h1>
      <p className="lede">Real products. Thugir Labs is the technical centre: high-end AI security research, in closed beta.</p>
      <section className="section">
        <h2>Thugir Labs</h2>
        <p className="measure">
          An autonomous engine that reasons, instead of only scanning. The film is on the Thugir Labs channel. The product is at thugir.com.
        </p>
        <p className="build-links">
          <a href="https://thugir.com">thugir.com</a>
          <a href="https://thugirlabs.com">thugirlabs.com</a>
          <a href="https://www.youtube.com/watch?v=pzrIMsDy0Wg">Watch the demo</a>
        </p>
      </section>
      <h2>Other products</h2>
      <p className="measure">Public repositories and the sites attached to them.</p>
      <ProjectIndex projects={projects} />
      <p>
        <Link className="ghost" href="/past-projects">
          Past projects
        </Link>{" "}
        <Link className="stamp" href="/contact">
          Start a project
        </Link>
      </p>
    </Shell>
  );
}
