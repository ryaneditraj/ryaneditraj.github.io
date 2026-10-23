import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/analytics";
import { getSite } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../node_modules/@fontsource/fraunces/files/fraunces-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../node_modules/@fontsource/fraunces/files/fraunces-latin-600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

const text = localFont({
  src: [
    { path: "../node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-text",
  display: "swap",
  preload: true,
});

const sans = localFont({
  src: [
    { path: "../node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

const mono = localFont({
  src: [{ path: "../node_modules/@fontsource/dm-mono/files/dm-mono-latin-400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: site.name, template: `%s — ${site.name}` },
  description: `${site.name} builds applied AI in public and explains it to people outside the field. ${site.positioning}`,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  category: "portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
