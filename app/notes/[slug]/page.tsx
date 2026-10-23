import { notFound } from "next/navigation";
import { Crumbs } from "@/components/crumbs";
import { JsonLd } from "@/components/json-ld";
import { Shell } from "@/components/shell";
import { readCollection } from "@/lib/content";
import { Markdown } from "@/lib/markdown";
import { buildMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return readCollection("notes")
    .filter((note) => note.status === "published")
    .map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = readCollection("notes").find((item) => item.slug === slug && item.status === "published");
  if (!note) return {};
  return buildMeta({
    path: `/notes/${note.slug}`,
    title: note.seo?.title ?? note.title,
    description: note.seo?.description ?? note.summary,
  });
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = readCollection("notes").find((item) => item.slug === slug && item.status === "published");
  if (!note) notFound();
  const origin = getSiteUrl();
  return (
    <Shell section="Notes">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${origin}/notes/${note.slug}`,
          headline: note.title,
          description: note.summary,
          datePublished: note.createdAt,
          dateModified: note.updatedAt,
          author: { "@type": "Organization", name: note.byline },
          mainEntityOfPage: `${origin}/notes/${note.slug}`,
        }}
      />
      <Crumbs items={[{ href: "/", label: "Home" }, { href: "/notes", label: "Notes" }, { label: note.title }]} />
      <p className="kicker">{note.byline}</p>
      <h1>{note.title}</h1>
      <p className="lede">{note.summary}</p>
      <Markdown source={note.body} />
    </Shell>
  );
}
