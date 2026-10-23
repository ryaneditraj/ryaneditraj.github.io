import Link from "next/link";
import { notFound } from "next/navigation";
import { isCollection, readCollection } from "@/lib/content";
import { keyOf } from "@/lib/schemas";

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ deleted?: string }>;
}) {
  const { collection } = await params;
  const query = await searchParams;
  if (!isCollection(collection)) notFound();
  const items = readCollection(collection) as unknown as Record<string, unknown>[];
  return (
    <>
      <h1>{collection}</h1>
      {query.deleted ? <p role="status">Deleted.</p> : null}
      <p>
        <a className="stamp" href={`/admin/${collection}/new`}>
          New
        </a>
      </p>
      {items.length === 0 ? <p className="empty">Nothing in this collection yet.</p> : null}
      <ul className="directory-list">
        {items.map((item) => {
          const key = keyOf(collection, item as { slug?: string; id?: string });
          const title = String(item.title ?? item.label ?? item.item ?? key);
          return (
            <li key={key}>
              <Link href={`/admin/${collection}/${key}`}>{title}</Link>
              <div className="meta">{String(item.status ?? "")}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
