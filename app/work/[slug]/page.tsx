import { notFound } from "next/navigation";
import { ProjectView } from "@/components/project-view";
import { JsonLd } from "@/components/json-ld";
import { Shell } from "@/components/shell";
import { readCollection } from "@/lib/content";
import { buildMeta, personId } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return readCollection("projects")
    .filter((project) => project.status === "published" && project.featured)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = readCollection("projects").find((item) => item.slug === slug && item.featured && item.status === "published");
  if (!project) return {};
  return buildMeta({ path: `/work/${project.slug}`, title: project.title, description: project.summary });
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = readCollection("projects").find((item) => item.slug === slug && item.status === "published" && item.featured);
  if (!project) notFound();
  const origin = getSiteUrl();
  return (
    <Shell section="Work">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "@id": `${origin}/work/${project.slug}`,
          name: project.title,
          description: project.summary,
          url: `${origin}/work/${project.slug}`,
          dateCreated: project.createdAt,
          dateModified: project.updatedAt,
          author: { "@id": personId() },
          ...(project.repo ? { sameAs: project.repo } : {}),
        }}
      />
      <ProjectView project={project} parent={{ href: "/work", label: "Work" }} />
    </Shell>
  );
}
