import { notFound } from "next/navigation";
import { AdminEditor } from "@/components/admin-editor";
import { findByKey, isCollection } from "@/lib/content";

export default async function EditEntry({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string; slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { collection, slug } = await params;
  const query = await searchParams;
  if (!isCollection(collection)) notFound();
  const record = findByKey(collection, slug);
  if (!record) notFound();
  return (
    <>
      <h1>Edit</h1>
      {query.saved ? <p role="status">Saved.</p> : null}
      <AdminEditor collection={collection} record={record} recordKey={slug} />
    </>
  );
}
