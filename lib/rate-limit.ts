type Bucket = { tokens: number; updated: number };

const buckets = new Map<string, Bucket>();

/** In-process token bucket. One Node server only; document a shared store for multi-instance deploys. */
export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const current = buckets.get(key);
  if (!current || now - current.updated >= windowMs) {
    buckets.set(key, { tokens: limit - 1, updated: now });
    return true;
  }
  if (current.tokens <= 0) return false;
  current.tokens -= 1;
  return true;
}

export function resetRateLimit(): void {
  buckets.clear();
}

export function clientAddress(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headerList.get("x-real-ip")?.trim() || "local";
}
