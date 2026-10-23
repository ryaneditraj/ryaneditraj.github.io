import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export function buildMeta(input: { path: string; title: string; description: string; index?: boolean }): Metadata {
  const url = `${getSiteUrl()}${input.path === "/" ? "" : input.path}`;
  return {
    title: input.path === "/" ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: "Ryan Editraj",
      type: "website",
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image", title: input.title, description: input.description },
    robots: input.index === false ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function personId(): string {
  return `${getSiteUrl()}/#person`;
}

export function websiteId(): string {
  return `${getSiteUrl()}/#website`;
}
