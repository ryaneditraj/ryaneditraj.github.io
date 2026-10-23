/** Public origin. Never hardcoded to a production domain. */
export function getSiteUrl(): string {
  const raw = process.env.SITE_URL?.trim();
  const value = raw && raw.length > 0 ? raw : "http://localhost:3000";
  return value.replace(/\/$/, "");
}
