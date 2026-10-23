import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  COLLECTION_NAMES,
  collectionSchemas,
  keyOf,
  nowSchema,
  siteSchema,
  type CollectionName,
  type NowEntry,
  type SiteConfig,
} from "@/lib/schemas";

const contentDir = path.join(process.cwd(), "content");

function readJson(file: string): unknown {
  const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
  return JSON.parse(raw) as unknown;
}

export function getSite(): SiteConfig {
  return siteSchema.parse(readJson("site.json"));
}

export function getNow(): NowEntry {
  return nowSchema.parse(readJson("now.json"));
}

export function readCollection<T extends CollectionName>(name: T): z.infer<(typeof collectionSchemas)[T]>[] {
  const schema = z.array(collectionSchemas[name]);
  return schema.parse(readJson(`${name}.json`)) as z.infer<(typeof collectionSchemas)[T]>[];
}

export function published<T extends { status: string }>(items: T[]): T[] {
  return items.filter((item) => item.status === "published");
}

export function isCollection(value: string): value is CollectionName {
  return (COLLECTION_NAMES as string[]).includes(value);
}

export function contentWritable(): boolean {
  return process.env.CONTENT_WRITABLE === "true";
}

export function writeCollection(name: CollectionName, records: unknown[]): void {
  if (!contentWritable()) {
    throw new Error("content_readonly");
  }
  const parsed = z.array(collectionSchemas[name]).parse(records);
  const file = path.join(contentDir, `${name}.json`);
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(parsed, null, 2)}\n`);
  fs.renameSync(tmp, file);
}

export function writeNow(entry: unknown): void {
  if (!contentWritable()) throw new Error("content_readonly");
  const parsed = nowSchema.parse(entry);
  const file = path.join(contentDir, "now.json");
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(parsed, null, 2)}\n`);
  fs.renameSync(tmp, file);
}

export function findByKey(name: CollectionName, key: string): Record<string, unknown> | undefined {
  const items = readCollection(name) as unknown as Record<string, unknown>[];
  return items.find((item) => keyOf(name, item as { slug?: string; id?: string }) === key);
}

export function blankRecord(name: CollectionName): Record<string, unknown> {
  const now = new Date().toISOString();
  if (name === "journey") {
    return { id: "", date: "2026-01-01", title: "", body: "", source: "", status: "draft" };
  }
  if (name === "uses") {
    return { id: "", area: "", item: "", detail: "", verified: false, status: "draft" };
  }
  if (name === "metrics") {
    return { id: "", label: "", value: "", note: "", source: "", asOf: "2026-01-01", status: "draft" };
  }
  if (name === "achievements") {
    return { id: "", title: "", detail: "", source: "", status: "draft" };
  }
  const base: Record<string, unknown> = {
    slug: "",
    title: "",
    status: "draft",
    summary: "",
    body: "",
    categories: [],
    tags: [],
    createdAt: now,
    updatedAt: now,
  };
  if (name === "projects") {
    return {
      ...base,
      stage: "paused",
      lane: "product",
      featured: false,
      lab: false,
      stack: [],
      repo: null,
      homepage: null,
      homepageNote: null,
      year: new Date().getFullYear(),
      role: "",
      verifiedFrom: "",
      stars: null,
      starsAsOf: null,
      language: null,
    };
  }
  if (name === "notes") return { ...base, byline: "Ryan Editraj" };
  if (name === "resources" || name === "bookmarks") return { ...base, url: "https://example.com" };
  if (name === "tools") return { ...base, url: "https://example.com", checkedOn: "2026-01-01", relation: "" };
  if (name === "services") return { ...base, audience: "", deliverables: "", fee: "TODO(Ryan): set the fee." };
  if (name === "offerings") {
    return {
      ...base,
      durationMin: 45,
      priceInr: null,
      scheduleStatus: "example",
      windows: [],
    };
  }
  if (name === "press") return { ...base, url: null, outlet: "", date: null };
  return base;
}
