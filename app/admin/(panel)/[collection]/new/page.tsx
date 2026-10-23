import { notFound } from "next/navigation";
import { AdminEditor } from "@/components/admin-editor";
import { blankRecord, isCollection } from "@/lib/content";

export default async function NewEntry({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  if (!isCollection(collection)) notFound();
  return (
    <>
      <h1>New {collection}</h1>
      <AdminEditor collection={collection} record={blankRecord(collection)} recordKey="" />
    </>
  );
}
