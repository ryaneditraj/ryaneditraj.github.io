import { z } from "zod";
import { collectionSchemas, type CollectionName } from "@/lib/schemas";

export type Field =
  | { name: string; label: string; type: "text" | "textarea" | "nullable" }
  | { name: string; label: string; type: "select"; options: string[] }
  | { name: string; label: string; type: "checkbox" }
  | { name: string; label: string; type: "list" }
  | { name: string; label: string; type: "number" }
  | { name: string; label: string; type: "json" };

const base: Field[] = [
  { name: "slug", label: "Slug", type: "text" },
  { name: "title", label: "Title", type: "text" },
  { name: "status", label: "Status", type: "select", options: ["draft", "published", "archived"] },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "body", label: "Body", type: "textarea" },
  { name: "categories", label: "Categories", type: "list" },
  { name: "tags", label: "Tags", type: "list" },
];

export const fieldSpecs: Record<CollectionName, Field[]> = {
  projects: [
    ...base,
    { name: "stage", label: "Stage", type: "select", options: ["active", "completed", "paused"] },
    { name: "lane", label: "Lane", type: "select", options: ["markets", "education", "vision", "security", "hack-club", "early", "product"] },
    { name: "featured", label: "Featured on Work", type: "checkbox" },
    { name: "lab", label: "Show in Lab", type: "checkbox" },
    { name: "stack", label: "Stack", type: "list" },
    { name: "repo", label: "Repository URL", type: "nullable" },
    { name: "homepage", label: "Homepage URL", type: "nullable" },
    { name: "homepageNote", label: "Homepage note", type: "nullable" },
    { name: "year", label: "Year", type: "number" },
    { name: "role", label: "Role", type: "text" },
    { name: "verifiedFrom", label: "Verified from", type: "textarea" },
    { name: "stars", label: "Stars", type: "number" },
    { name: "starsAsOf", label: "Stars as of", type: "nullable" },
    { name: "language", label: "Language", type: "nullable" },
  ],
  notes: [...base, { name: "byline", label: "Byline", type: "text" }],
  resources: [...base, { name: "url", label: "URL", type: "text" }],
  bookmarks: [...base, { name: "url", label: "URL", type: "text" }],
  tools: [
    ...base,
    { name: "url", label: "URL", type: "text" },
    { name: "checkedOn", label: "Checked on", type: "text" },
    { name: "relation", label: "Relation", type: "textarea" },
  ],
  services: [
    ...base,
    { name: "audience", label: "Audience", type: "text" },
    { name: "deliverables", label: "Deliverables", type: "textarea" },
    { name: "fee", label: "Fee", type: "text" },
  ],
  offerings: [
    ...base,
    { name: "durationMin", label: "Duration (minutes)", type: "number" },
    { name: "priceInr", label: "Price INR", type: "number" },
    { name: "scheduleStatus", label: "Schedule", type: "select", options: ["example", "confirmed"] },
    { name: "windows", label: "Windows JSON", type: "json" },
  ],
  playbooks: base,
  press: [
    ...base,
    { name: "outlet", label: "Outlet", type: "text" },
    { name: "url", label: "URL", type: "nullable" },
    { name: "date", label: "Date", type: "nullable" },
  ],
  journey: [
    { name: "id", label: "Id", type: "text" },
    { name: "date", label: "Date", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "body", label: "Body", type: "textarea" },
    { name: "source", label: "Source", type: "textarea" },
    { name: "status", label: "Status", type: "select", options: ["draft", "published", "archived"] },
  ],
  uses: [
    { name: "id", label: "Id", type: "text" },
    { name: "area", label: "Area", type: "text" },
    { name: "item", label: "Item", type: "text" },
    { name: "detail", label: "Detail", type: "textarea" },
    { name: "verified", label: "Verified", type: "checkbox" },
    { name: "status", label: "Status", type: "select", options: ["draft", "published", "archived"] },
  ],
  metrics: [
    { name: "id", label: "Id", type: "text" },
    { name: "label", label: "Label", type: "text" },
    { name: "value", label: "Value", type: "text" },
    { name: "note", label: "Note", type: "textarea" },
    { name: "source", label: "Source", type: "textarea" },
    { name: "asOf", label: "As of", type: "text" },
    { name: "status", label: "Status", type: "select", options: ["draft", "published", "archived"] },
  ],
  achievements: [
    { name: "id", label: "Id", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "detail", label: "Detail", type: "textarea" },
    { name: "source", label: "Source", type: "textarea" },
    { name: "status", label: "Status", type: "select", options: ["draft", "published", "archived"] },
  ],
};

function readValue(field: Field, form: FormData): unknown {
  if (field.type === "checkbox") return form.get(field.name) === "on";
  const raw = String(form.get(field.name) ?? "");
  if (field.type === "list") return raw.split(",").map((part) => part.trim()).filter(Boolean);
  if (field.type === "number") {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    return Number(trimmed);
  }
  if (field.type === "json") {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    return JSON.parse(trimmed) as unknown;
  }
  if (field.type === "nullable") {
    const trimmed = raw.trim();
    return trimmed ? trimmed : null;
  }
  return raw;
}

export function displayValue(field: Field, record: Record<string, unknown>): string {
  const value = record[field.name];
  if (field.type === "checkbox") return value ? "on" : "";
  if (field.type === "list" && Array.isArray(value)) return value.join(", ");
  if (field.type === "json") return JSON.stringify(value ?? [], null, 2);
  if (value == null) return "";
  return String(value);
}

export function recordFromForm(
  collection: CollectionName,
  form: FormData,
  existing: Record<string, unknown> | undefined,
): { ok: true; record: Record<string, unknown> } | { ok: false; message: string } {
  const next: Record<string, unknown> = { ...(existing ?? {}) };
  try {
    for (const field of fieldSpecs[collection]) {
      next[field.name] = readValue(field, form);
    }
  } catch {
    return { ok: false, message: "A JSON field could not be parsed." };
  }
  const now = new Date().toISOString();
  const hasTimestamps = fieldSpecs[collection].some((field) => field.name === "slug");
  if (hasTimestamps) {
    next.createdAt = typeof existing?.createdAt === "string" ? existing.createdAt : now;
    next.updatedAt = now;
  }
  const seoTitle = String(form.get("seoTitle") ?? "").trim();
  const seoDescription = String(form.get("seoDescription") ?? "").trim();
  if (hasTimestamps) {
    if (seoTitle || seoDescription) {
      next.seo = {
        ...(seoTitle ? { title: seoTitle } : {}),
        ...(seoDescription ? { description: seoDescription } : {}),
      };
    } else {
      delete next.seo;
    }
  }
  const parsed = collectionSchemas[collection].safeParse(next);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, message: `${issue?.path.join(".") || "record"}: ${issue?.message ?? "Invalid"}` };
  }
  return { ok: true, record: parsed.data as Record<string, unknown> };
}

export function zodMessage(error: z.ZodError): string {
  const issue = error.issues[0];
  return `${issue?.path.join(".") || "record"}: ${issue?.message ?? "Invalid"}`;
}
