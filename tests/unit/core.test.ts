import fs from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { recordFromForm } from "@/lib/admin-form";
import { generateSlots, isBlocking, overlaps, slotIsFree, type Booking } from "@/lib/bookings";
import { readCollection } from "@/lib/content";
import { publicPaths } from "@/lib/directory";
import { buildRows, learnRows, proofRows } from "@/lib/lanes";
import { validateInquiry } from "@/lib/inquiry";
import { verifyRazorpaySignature, verifyStripeSignature } from "@/lib/payments";
import { rateLimit, resetRateLimit } from "@/lib/rate-limit";
import { createSessionToken, verifySessionToken } from "@/lib/session-token";
import { getSiteUrl } from "@/lib/site-url";
import { createHmac } from "node:crypto";

const options = { budgets: ["Not sure yet"], timelines: ["No fixed date"] };

describe("inquiry", () => {
  const valid = {
    name: "Ada Lovelace",
    org: "Independent",
    contact: "ada@example.com",
    objective: "Explain a research tool to a non-technical board.",
    deliverables: "A ten-minute explanation and a one-page brief.",
    budget: "Not sure yet",
    timeline: "No fixed date",
    companyWebsite: "",
    consent: true,
  };

  it("accepts a complete inquiry", () => {
    const result = validateInquiry(valid, options);
    expect(result.ok).toBe(true);
  });

  it("rejects a missing consent and a short objective", () => {
    const result = validateInquiry({ ...valid, consent: false, objective: "short" }, options);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.consent).toBeTruthy();
      expect(result.errors.objective).toBeTruthy();
    }
  });

  it("discards a filled honeypot without calling it an error", () => {
    const result = validateInquiry({ ...valid, companyWebsite: "https://spam.example" }, options);
    expect(result.ok && result.discarded).toBe(true);
  });
});

describe("rate limit", () => {
  it("blocks after the budget is spent", () => {
    resetRateLimit();
    expect(rateLimit("k", 2, 10_000, 0)).toBe(true);
    expect(rateLimit("k", 2, 10_000, 10)).toBe(true);
    expect(rateLimit("k", 2, 10_000, 20)).toBe(false);
    expect(rateLimit("k", 2, 10_000, 10_001)).toBe(true);
  });
});

describe("payments", () => {
  it("verifies a razorpay body signature", () => {
    const payload = '{"event":"payment.captured"}';
    const secret = "whsec_test";
    const signature = createHmac("sha256", secret).update(payload).digest("hex");
    expect(verifyRazorpaySignature(payload, signature, secret)).toBe(true);
    expect(verifyRazorpaySignature(payload, signature, "other")).toBe(false);
  });

  it("verifies a stripe signature inside the tolerance window", () => {
    const payload = "{}";
    const secret = "whsec_test";
    const stamp = 1_700_000_000;
    const signature = createHmac("sha256", secret).update(`${stamp}.${payload}`).digest("hex");
    const header = `t=${stamp},v1=${signature}`;
    expect(verifyStripeSignature(payload, header, secret, stamp)).toBe(true);
    expect(verifyStripeSignature(payload, header, secret, stamp + 301)).toBe(false);
  });
});

describe("bookings", () => {
  const now = new Date("2026-10-23T04:00:00.000Z");
  const offering = {
    durationMin: 45,
    windows: [{ dow: 5, start: "18:00", end: "19:30" }],
  };

  it("builds Kolkata slots and treats paid bookings as blocking", () => {
    const slots = generateSlots(offering, now, 1);
    expect(slots.length).toBeGreaterThan(0);
    expect(slots[0]?.label).toContain("IST");
    const booking: Booking = {
      id: "bk",
      offeringSlug: "working-session",
      start: slots[0]!.start,
      end: slots[0]!.end,
      status: "paid",
      holdExpires: now.toISOString(),
      name: "A",
      contact: "a@example.com",
      timezone: "Asia/Kolkata",
      amountInr: 1000,
      provider: "razorpay",
      providerRef: "order_1",
    };
    expect(overlaps(booking.start, booking.end, slots[0]!.start, slots[0]!.end)).toBe(true);
    expect(slotIsFree([booking], slots[0]!.start, slots[0]!.end, now)).toBe(false);
    expect(isBlocking({ ...booking, status: "hold", holdExpires: new Date(now.getTime() - 1000).toISOString() }, now)).toBe(false);
  });
});

describe("session", () => {
  it("round-trips a token and rejects a tampered one", async () => {
    const token = await createSessionToken("secret", 1_000);
    expect(await verifySessionToken(token, "secret", 1_000)).toBe(true);
    expect(await verifySessionToken(token, "other", 1_000)).toBe(false);
    expect(await verifySessionToken(`${token}x`, "secret", 1_000)).toBe(false);
  });
});

describe("site url", () => {
  it("prefers SITE_URL, then the production origin, then localhost", () => {
    try {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("SITE_URL", "https://example.com/");
      expect(getSiteUrl()).toBe("https://example.com");
      vi.stubEnv("SITE_URL", "");
      expect(getSiteUrl()).toBe("https://ryaneditraj.vercel.app");
      vi.stubEnv("NODE_ENV", "test");
      expect(getSiteUrl()).toBe("http://localhost:3000");
    } finally {
      vi.unstubAllEnvs();
    }
  });
});

describe("content", () => {
  it("parses every collection", () => {
    expect(readCollection("projects").length).toBeGreaterThan(5);
    expect(readCollection("tools")).toEqual([]);
    expect(readCollection("press")).toEqual([]);
    expect(readCollection("achievements")).toEqual([]);
  });

  it("keeps the two lanes factual and leaves unverified claims out", () => {
    const text = JSON.stringify({ buildRows, learnRows, proofRows });
    for (const name of ["Thugir Labs", "MoneyRadar", "IndiQuant", "Trinity One", "KL-ctf", "Hack Club"]) {
      expect(text).toContain(name);
    }
    expect(text).not.toMatch(/placement karo|placement-karo/i);
    expect(text).toContain("@ryaneditraj");
    expect(text).toContain("300K+");
    expect(text).not.toMatch(/CVSS|138,936|patent pending|first place|placed first/i);
    expect(learnRows.some((row) => row.links.some((link) => link.href.includes("medium.com")))).toBe(true);
    expect(learnRows.some((row) => row.links.some((link) => link.href.includes("youtube.com")))).toBe(true);
  });

  it("has a page for every directory link", () => {
    for (const href of publicPaths) {
      const relative = href === "/" ? "app/page.tsx" : path.join("app", href.slice(1), "page.tsx");
      expect(fs.existsSync(path.join(process.cwd(), relative)), relative).toBe(true);
    }
  });
});

describe("admin form", () => {
  it("rejects a project without a source", () => {
    const form = new FormData();
    form.set("slug", "example");
    form.set("title", "Example");
    form.set("status", "draft");
    form.set("summary", "A summary long enough.");
    form.set("body", "");
    form.set("stage", "paused");
    form.set("lane", "product");
    form.set("year", "2026");
    form.set("role", "Author");
    form.set("verifiedFrom", "");
    const result = recordFromForm("projects", form, undefined);
    expect(result.ok).toBe(false);
  });
});
