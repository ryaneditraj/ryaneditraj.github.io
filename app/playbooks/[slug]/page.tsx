import { notFound } from "next/navigation";
import { Crumbs } from "@/components/crumbs";
import { Shell } from "@/components/shell";
import { readCollection } from "@/lib/content";
import { Markdown } from "@/lib/markdown";
import { buildMeta } from "@/lib/seo";

export function generateStaticParams() {
  return readCollection("playbooks")
    .filter((item) => item.status === "published")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = readCollection("playbooks").find((entry) => entry.slug === slug && entry.status === "published");
  if (!item) return {};
  return buildMeta({ path: `/playbooks/${item.slug}`, title: item.title, description: item.summary });
}

export default async function PlaybookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = readCollection("playbooks").find((entry) => entry.slug === slug && entry.status === "published");
  if (!item) notFound();
  return (
    <Shell section="Playbooks">
      <Crumbs items={[{ href: "/", label: "Home" }, { href: "/playbooks", label: "Playbooks" }, { label: item.title }]} />
      <h1>{item.title}</h1>
      <p className="lede">{item.summary}</p>
      <Markdown source={item.body} />
    </Shell>
  );
}
