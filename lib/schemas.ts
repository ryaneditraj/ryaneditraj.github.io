import { z } from "zod";

export const statusSchema = z.enum(["draft", "published", "archived"]);

export const seoSchema = z.object({
  title: z.string().min(1).max(70).optional(),
  description: z.string().min(1).max(200).optional(),
});

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase slug");

export const baseSchema = z.object({
  slug,
  title: z.string().min(1).max(160),
  status: statusSchema,
  summary: z.string().min(1).max(500),
  body: z.string().default(""),
  categories: z.array(z.string().min(1)).default([]),
  tags: z.array(z.string().min(1)).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  seo: seoSchema.optional(),
});

export const projectSchema = baseSchema.extend({
  stage: z.enum(["active", "completed", "paused"]),
  lane: z.enum(["markets", "education", "vision", "security", "hack-club", "early", "product"]),
  featured: z.boolean().default(false),
  lab: z.boolean().default(false),
  stack: z.array(z.string()).default([]),
  repo: z.string().url().nullable(),
  homepage: z.string().url().nullable(),
  homepageNote: z.string().nullable(),
  year: z.number().int(),
  role: z.string().min(1),
  verifiedFrom: z.string().min(1),
  stars: z.number().int().nullable(),
  starsAsOf: z.string().nullable(),
  language: z.string().nullable(),
});

export const noteSchema = baseSchema.extend({
  byline: z.string().min(1),
});

export const resourceSchema = baseSchema.extend({
  url: z.string().url(),
});

export const bookmarkSchema = baseSchema.extend({
  url: z.string().url(),
});

export const toolSchema = baseSchema.extend({
  url: z.string().url(),
  checkedOn: z.string(),
  relation: z.string().min(1),
});

export const serviceSchema = baseSchema.extend({
  audience: z.string().min(1),
  deliverables: z.string().min(1),
  fee: z.string().min(1),
});

export const windowSchema = z.object({
  dow: z.number().int().min(0).max(6),
  start: z.string().regex(/^\d{2}:\d{2}$/),
  end: z.string().regex(/^\d{2}:\d{2}$/),
});

export const offeringSchema = baseSchema.extend({
  durationMin: z.number().int().positive().max(240),
  priceInr: z.number().int().positive().nullable(),
  scheduleStatus: z.enum(["example", "confirmed"]),
  windows: z.array(windowSchema).default([]),
});

export const playbookSchema = baseSchema;

export const pressSchema = baseSchema.extend({
  url: z.string().url().nullable(),
  outlet: z.string().min(1),
  date: z.string().nullable(),
});

export const journeySchema = z.object({
  id: slug,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().min(1),
  body: z.string().min(1),
  source: z.string().min(1),
  status: statusSchema,
});

export const useSchema = z.object({
  id: slug,
  area: z.string().min(1),
  item: z.string().min(1),
  detail: z.string().min(1),
  verified: z.boolean(),
  status: statusSchema,
});

export const metricSchema = z.object({
  id: slug,
  label: z.string().min(1),
  value: z.string().min(1),
  note: z.string().min(1),
  source: z.string().min(1),
  asOf: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: statusSchema,
});

export const achievementSchema = z.object({
  id: slug,
  title: z.string().min(1),
  detail: z.string().min(1),
  source: z.string().min(1),
  status: statusSchema,
});

export const nowSchema = z.object({
  updatedAt: z.string().datetime(),
  text: z.string().min(1),
  source: z.string().min(1),
});

export const socialSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
  note: z.string().optional(),
});

export const siteSchema = z.object({
  name: z.literal("Ryan Editraj"),
  positioning: z.string().min(1),
  location: z.string().min(1),
  timezone: z.string().min(1),
  email: z.string().email(),
  socials: z.array(socialSchema),
  nav: z.array(z.object({ href: z.string().min(1), label: z.string().min(1) })),
  budgetRanges: z.array(z.string().min(1)).min(1),
  timelines: z.array(z.string().min(1)).min(1),
});

export const collectionSchemas = {
  projects: projectSchema,
  notes: noteSchema,
  resources: resourceSchema,
  bookmarks: bookmarkSchema,
  tools: toolSchema,
  services: serviceSchema,
  offerings: offeringSchema,
  playbooks: playbookSchema,
  press: pressSchema,
  journey: journeySchema,
  uses: useSchema,
  metrics: metricSchema,
  achievements: achievementSchema,
} as const;

export type CollectionName = keyof typeof collectionSchemas;
export type Project = z.infer<typeof projectSchema>;
export type Note = z.infer<typeof noteSchema>;
export type Bookmark = z.infer<typeof bookmarkSchema>;
export type Tool = z.infer<typeof toolSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Offering = z.infer<typeof offeringSchema>;
export type Playbook = z.infer<typeof playbookSchema>;
export type PressItem = z.infer<typeof pressSchema>;
export type JourneyItem = z.infer<typeof journeySchema>;
export type UseItem = z.infer<typeof useSchema>;
export type Metric = z.infer<typeof metricSchema>;
export type SiteConfig = z.infer<typeof siteSchema>;
export type NowEntry = z.infer<typeof nowSchema>;

export const COLLECTION_NAMES = Object.keys(collectionSchemas) as CollectionName[];

export function keyOf(collection: CollectionName, record: { slug?: string; id?: string }): string {
  if (collection === "journey" || collection === "uses" || collection === "metrics" || collection === "achievements") {
    return String(record.id ?? "");
  }
  return String(record.slug ?? "");
}
