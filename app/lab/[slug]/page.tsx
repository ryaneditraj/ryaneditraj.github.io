import { notFound, redirect } from "next/navigation";
import { ProjectView } from "@/components/project-view";
import { JsonLd } from "@/components/json-ld";
import { Shell } from "@/components/shell";
import { readCollection } from "@/lib/content";
import { buildMeta, personId } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return readCollection("projects")
    .filter((project) => project.status === "published" && project.lab && !project.featured)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = readCollection("projects").find((item) => item.slug === slug && item.lab && !item.featured && item.status === "published");
  if (!project) return {};
  return buildMeta({ path: `/lab/${project.slug}`, title: project.title, description: project.summary });
}

export default async function LabDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = readCollection("projects").find((item) => item.slug === slug && item.status === "published");
  if (!project || !project.lab) notFound();
  if (project.featured) redirect(`/work/${project.slug}`);
  const origin = getSiteUrl();
  return (
    <Shell section="Lab">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "@id": `${origin}/lab/${project.slug}`,
          name: project.title,
          description: project.summary,
          url: `${origin}/lab/${project.slug}`,
          author: { "@id": personId() },
        }}
      />
      <ProjectView project={project} parent={{ href: "/lab", label: "Lab" }} />
    </Shell>
  );
}
