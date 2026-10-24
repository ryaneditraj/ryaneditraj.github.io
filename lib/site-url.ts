const LOCAL_DEFAULT = "http://localhost:3000";
const PRODUCTION_DEFAULT = "https://ryaneditraj.vercel.app";

/** Public origin. SITE_URL always wins. Production with no env uses the Vercel app. */
export function getSiteUrl(): string {
  const raw = process.env.SITE_URL?.trim();
  const fallback = process.env.NODE_ENV === "production" ? PRODUCTION_DEFAULT : LOCAL_DEFAULT;
  const value = raw && raw.length > 0 ? raw : fallback;
  return value.replace(/\/$/, "");
}
