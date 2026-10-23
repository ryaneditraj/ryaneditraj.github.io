import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/session-token";

function contentSecurityPolicy(): string {
  const script = ["'self'", "'unsafe-inline'"];
  const connect = ["'self'"];
  const frame = ["'none'"];
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    script.push("https://challenges.cloudflare.com");
    connect.push("https://challenges.cloudflare.com");
    frame[0] = "https://challenges.cloudflare.com";
  }
  if (process.env.PLAUSIBLE_DOMAIN) {
    const origin = process.env.PLAUSIBLE_SRC?.trim() || "https://plausible.io";
    script.push(origin);
    connect.push(origin);
  }
  if (process.env.UMAMI_SRC) {
    try {
      script.push(new URL(process.env.UMAMI_SRC).origin);
    } catch {
      /* ignore malformed analytics origin */
    }
  }
  return [
    "default-src 'self'",
    `script-src ${script.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src ${connect.join(" ")}`,
    `frame-src ${frame.join(" ")}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const ok = await verifySessionToken(request.cookies.get("re_session")?.value, process.env.SESSION_SECRET);
    if (!ok) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", contentSecurityPolicy());
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|icon.svg|.*\\.png$).*)"],
};
