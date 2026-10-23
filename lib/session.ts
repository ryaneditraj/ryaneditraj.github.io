import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { createSessionToken, verifySessionToken } from "@/lib/session-token";

const COOKIE = "re_session";
const MAX_AGE_SEC = 60 * 60 * 12;

export function sessionCookieName(): string {
  return COOKIE;
}

export function sessionSecret(): string | null {
  const value = process.env.SESSION_SECRET?.trim();
  return value ? value : null;
}

export function adminConfigured(): boolean {
  return Boolean(sessionSecret() && process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length > 0);
}

export function passwordsMatch(given: string, expected: string): boolean {
  const left = createHash("sha256").update(given).digest();
  const right = createHash("sha256").update(expected).digest();
  return timingSafeEqual(left, right);
}

export async function readSession(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(COOKIE)?.value, sessionSecret() ?? undefined);
}

export async function startSession(): Promise<string> {
  const secret = sessionSecret();
  if (!secret) throw new Error("session_secret_missing");
  return createSessionToken(secret);
}

export function sessionSetCookie(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE_SEC}${secure}`;
}

export function sessionClearCookie(): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}
