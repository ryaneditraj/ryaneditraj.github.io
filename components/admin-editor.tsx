"use client";

import { useActionState } from "react";
import { deleteEntry, saveEntry, type AdminState } from "@/lib/actions";
import { displayValue, fieldSpecs, type Field } from "@/lib/admin-form";
import type { CollectionName } from "@/lib/schemas";

const initial: AdminState = { status: "idle" };

function Control({ field, record }: { field: Field; record: Record<string, unknown> }) {
  const value = displayValue(field, record);
  if (field.type === "textarea" || field.type === "json") {
    return <textarea name={field.name} defaultValue={value} rows={field.type === "json" ? 8 : 6} />;
  }
  if (field.type === "select") {
    return (
      <select name={field.name} defaultValue={value}>
        {field.options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    );
  }
  if (field.type === "checkbox") {
    return <input type="checkbox" name={field.name} defaultChecked={value === "on"} />;
  }
  return <input name={field.name} defaultValue={value} />;
}

export function AdminEditor({
  collection,
  record,
  recordKey,
}: {
  collection: CollectionName;
  record: Record<string, unknown>;
  recordKey: string;
}) {
  const save = saveEntry.bind(null, collection);
  const remove = deleteEntry.bind(null, collection);
  const [saveState, saveAction, saving] = useActionState(save, initial);
  const [deleteState, deleteAction, deleting] = useActionState(remove, initial);
  const seo = (record.seo ?? {}) as { title?: string; description?: string };
  const hasSlug = fieldSpecs[collection].some((field) => field.name === "slug");
  return (
    <>
      {saveState.status === "error" ? (
        <div className="alert" role="alert">
          {saveState.message}
        </div>
      ) : null}
      <form className="form" action={saveAction}>
        <input type="hidden" name="_key" value={recordKey} />
        {fieldSpecs[collection].map((field) => (
          <label className={field.type === "checkbox" ? "check" : "field"} key={field.name}>
            {field.type === "checkbox" ? <Control field={field} record={record} /> : null}
            <span>{field.label}</span>
            {field.type === "checkbox" ? null : <Control field={field} record={record} />}
          </label>
        ))}
        {hasSlug ? (
          <>
            <label className="field">
              <span>SEO title</span>
              <input name="seoTitle" defaultValue={seo.title ?? ""} maxLength={70} />
            </label>
            <label className="field">
              <span>SEO description</span>
              <input name="seoDescription" defaultValue={seo.description ?? ""} maxLength={200} />
            </label>
          </>
        ) : null}
        <button className="stamp" type="submit" disabled={saving}>
          {saving ? "Saving" : "Save"}
        </button>
      </form>
      {recordKey ? (
        <form className="form" action={deleteAction} style={{ marginTop: "2rem" }}>
          <h2>Delete</h2>
          {deleteState.status === "error" ? (
            <div className="alert" role="alert">
              {deleteState.message}
            </div>
          ) : null}
          <p>Type {recordKey} to confirm. This removes the record from the content file.</p>
          <input type="hidden" name="key" value={recordKey} />
          <label className="field">
            <span>Confirm slug</span>
            <input name="confirm" autoComplete="off" />
          </label>
          <button className="stamp" type="submit" disabled={deleting}>
            {deleting ? "Deleting" : "Delete"}
          </button>
        </form>
      ) : null}
    </>
  );
}
