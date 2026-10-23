"use server";

import fs from "node:fs";
import path from "node:path";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { recordFromForm } from "@/lib/admin-form";
import { attachProvider, cancelHold, createHold } from "@/lib/bookings";
import { createRazorpayOrder, createStripeSession } from "@/lib/checkout";
import {
  blankRecord,
  contentWritable,
  findByKey,
  getSite,
  readCollection,
  writeCollection,
  writeNow,
} from "@/lib/content";
import { collaborateMailConfigured, sendCollaborationEmail, subscribeDispatch, dispatchMailConfigured } from "@/lib/email";
import { validateInquiry, type InquiryErrors } from "@/lib/inquiry";
import { keyOf, nowSchema, type CollectionName } from "@/lib/schemas";
import { configuredPaymentProvider, paymentsReady } from "@/lib/payments";
import { clientAddress, rateLimit } from "@/lib/rate-limit";
import { isCollection } from "@/lib/content";
import {
  adminConfigured,
  passwordsMatch,
  readSession,
  sessionCookieName,
  startSession,
} from "@/lib/session";
import { turnstileRequired, verifyTurnstile } from "@/lib/turnstile";

export type InquiryState =
  | { status: "idle" }
  | { status: "error"; errors?: InquiryErrors; message?: string }
  | { status: "success"; delivery: "email" | "stored" | "discarded" | "unsent" };

export type DispatchState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

export type AdminState = { status: "idle" | "success" | "error"; message?: string };
export type LoginState = { status: "idle" | "error"; message?: string };
export type BookState = {
  status: "idle" | "error" | "success";
  message?: string;
  checkoutUrl?: string;
  razorpay?: { keyId: string; orderId: string; amount: number; currency: "INR"; bookingId: string };
};

function safeNext(value: FormDataEntryValue | null): string {
  const next = String(value ?? "/admin");
  if (!next.startsWith("/admin") || next.startsWith("//") || next.includes("\\")) return "/admin";
  return next;
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!adminConfigured()) {
    return { status: "error", message: "Admin is not configured. Set SESSION_SECRET and ADMIN_PASSWORD on the server." };
  }
  const headerList = await headers();
  if (!rateLimit(`login:${clientAddress(headerList)}`, 5, 10 * 60 * 1000)) {
    return { status: "error", message: "Too many attempts. Wait ten minutes and try again." };
  }
  const expected = process.env.ADMIN_PASSWORD ?? "";
  const given = String(formData.get("password") ?? "");
  if (!passwordsMatch(given, expected)) return { status: "error", message: "That password does not match." };
  const token = await startSession();
  const jar = await cookies();
  jar.set(sessionCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  redirect(safeNext(formData.get("next")));
}

export async function logout(): Promise<void> {
  const jar = await cookies();
  jar.delete(sessionCookieName());
  redirect("/admin/login");
}

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const headerList = await headers();
  const ip = clientAddress(headerList);
  if (!rateLimit(`collab:${ip}`, 5, 10 * 60 * 1000)) {
    return { status: "error", message: "Too many inquiries from this network. Wait ten minutes." };
  }
  const site = getSite();
  const parsed = validateInquiry(
    {
      name: String(formData.get("name") ?? ""),
      org: String(formData.get("org") ?? ""),
      contact: String(formData.get("contact") ?? ""),
      objective: String(formData.get("objective") ?? ""),
      deliverables: String(formData.get("deliverables") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      companyWebsite: String(formData.get("company_website") ?? ""),
      consent: formData.get("consent") === "on",
    },
    { budgets: site.budgetRanges, timelines: site.timelines },
  );
  if (!parsed.ok) return { status: "error", errors: parsed.errors };
  if (parsed.discarded) return { status: "success", delivery: "discarded" };
  if (turnstileRequired()) {
    const ok = await verifyTurnstile(String(formData.get("cf-turnstile-response") ?? ""), ip);
    if (!ok) return { status: "error", message: "The spam check failed. Reload the page and try again." };
  }
  const text = [
    `Name: ${parsed.value.name}`,
    `Organisation: ${parsed.value.org}`,
    `Contact: ${parsed.value.contact}`,
    `Budget: ${parsed.value.budget}`,
    `Timeline: ${parsed.value.timeline}`,
    "",
    "Objective:",
    parsed.value.objective,
    "",
    "Deliverables:",
    parsed.value.deliverables,
  ].join("\n");
  if (collaborateMailConfigured()) {
    const sent = await sendCollaborationEmail(text, parsed.value.contact);
    if (!sent.ok) return { status: "error", message: "The message was valid, but email delivery failed. Write to the published address instead." };
    return { status: "success", delivery: "email" };
  }
  if (process.env.COLLAB_STORE === "file") {
    const dir = path.join(process.cwd(), "data");
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, "collaboration-inquiries.json");
    const current = fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, "utf8")) as unknown[]) : [];
    current.push({ ...parsed.value, receivedAt: new Date().toISOString() });
    fs.writeFileSync(file, `${JSON.stringify(current, null, 2)}\n`);
    return { status: "success", delivery: "stored" };
  }
  return { status: "success", delivery: "unsent" };
}

export async function submitDispatch(_prev: DispatchState, formData: FormData): Promise<DispatchState> {
  if (!dispatchMailConfigured()) {
    return { status: "error", message: "Dispatches are not accepting signups. No list provider is configured." };
  }
  if (formData.get("company_website")) return { status: "success", message: "If this address can be subscribed, it will be." };
  const headerList = await headers();
  if (!rateLimit(`dispatch:${clientAddress(headerList)}`, 5, 10 * 60 * 1000)) {
    return { status: "error", message: "Too many attempts. Wait ten minutes." };
  }
  const email = String(formData.get("email") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "error", message: "Enter a valid email address." };
  if (formData.get("consent") !== "on") return { status: "error", message: "Tick the consent box. Signups are not added without it." };
  const result = await subscribeDispatch(email);
  if (!result.ok) return { status: "error", message: "The list provider rejected the signup. Nothing was confirmed." };
  return { status: "success", message: "You are on the list. You can unsubscribe from any letter." };
}

export async function submitBooking(_prev: BookState, formData: FormData): Promise<BookState> {
  const headerList = await headers();
  if (!rateLimit(`book:${clientAddress(headerList)}`, 8, 10 * 60 * 1000)) {
    return { status: "error", message: "Too many attempts. Wait ten minutes." };
  }
  const slug = String(formData.get("offering") ?? "");
  const offering = readCollection("offerings").find((item) => item.slug === slug);
  if (!offering) return { status: "error", message: "That session is not available." };
  const name = String(formData.get("name") ?? "").trim();
  const contact = String(formData.get("contact") ?? "").trim();
  if (name.length < 2) return { status: "error", message: "Enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) return { status: "error", message: "Enter an email for the confirmation." };
  const result = await createHold({
    offering,
    start: String(formData.get("start") ?? ""),
    name,
    contact,
    paymentsReady: paymentsReady(),
  });
  if (!result.ok) {
    const messages: Record<typeof result.code, string> = {
      not_live: "This schedule is an example. Ryan has not confirmed hours, so nothing was booked.",
      payments_not_configured: "Payments are not configured. Nothing was booked and no charge was created.",
      unknown_slot: "That time is not on the schedule.",
      conflict: "That time was just taken. Choose another.",
      invalid: "The booking could not be checked.",
    };
    return { status: "error", message: messages[result.code] };
  }
  const provider = configuredPaymentProvider();
  if (provider === "stripe") {
    const session = await createStripeSession(result.booking);
    if (!session.ok) {
      await cancelHold(result.booking.id);
      return { status: "error", message: "The hold was cancelled because Stripe did not open a checkout session." };
    }
    await attachProvider(result.booking.id, "stripe", session.id);
    return {
      status: "success",
      checkoutUrl: session.url,
      message: "Stripe opened a checkout session. Returning to this site does not confirm payment. The booking stays unpaid until the signed webhook marks it paid.",
    };
  }
  if (provider === "razorpay") {
    const order = await createRazorpayOrder(result.booking);
    if (!order.ok) {
      await cancelHold(result.booking.id);
      return { status: "error", message: "The hold was cancelled because Razorpay did not create an order." };
    }
    await attachProvider(result.booking.id, "razorpay", order.orderId);
    return {
      status: "success",
      message: "Razorpay created an order. Paying, or returning here, does not confirm the booking. Only the signed webhook does.",
      razorpay: {
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
        orderId: order.orderId,
        amount: order.amount,
        currency: "INR",
        bookingId: result.booking.id,
      },
    };
  }
  await cancelHold(result.booking.id);
  return { status: "error", message: "Payments are not configured. The hold was cancelled." };
}

export async function saveEntry(collectionName: string, _prev: AdminState, formData: FormData): Promise<AdminState> {
  if (!(await readSession())) return { status: "error", message: "Sign in again." };
  if (!isCollection(collectionName)) return { status: "error", message: "Unknown collection." };
  if (!contentWritable()) {
    return { status: "error", message: "Writes are off. Set CONTENT_WRITABLE=true on a server with a writable content directory." };
  }
  const collection = collectionName as CollectionName;
  const originalKey = String(formData.get("_key") ?? "");
  const existing = originalKey ? (findByKey(collection, originalKey) as Record<string, unknown> | undefined) : undefined;
  const built = recordFromForm(collection, formData, existing ?? (originalKey ? undefined : blankRecord(collection)));
  if (!built.ok) return { status: "error", message: built.message };
  const items = readCollection(collection) as unknown as Record<string, unknown>[];
  const key = keyOf(collection, built.record as { slug?: string; id?: string });
  if (!key) return { status: "error", message: "A slug or id is required." };
  if (items.some((item) => keyOf(collection, item as { slug?: string; id?: string }) === key && key !== originalKey)) {
    return { status: "error", message: "That slug is already used." };
  }
  const next = existing
    ? items.map((item) => (keyOf(collection, item as { slug?: string; id?: string }) === originalKey ? built.record : item))
    : [...items, built.record];
  writeCollection(collection, next);
  revalidatePath("/", "layout");
  redirect(`/admin/${collection}/${key}?saved=1`);
}

export async function deleteEntry(collectionName: string, _prev: AdminState, formData: FormData): Promise<AdminState> {
  if (!(await readSession())) return { status: "error", message: "Sign in again." };
  if (!isCollection(collectionName)) return { status: "error", message: "Unknown collection." };
  if (!contentWritable()) return { status: "error", message: "Writes are off, so nothing was deleted." };
  const key = String(formData.get("key") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (!key || confirm !== key) return { status: "error", message: "Type the slug exactly to confirm deletion." };
  const collection = collectionName as CollectionName;
  const items = (readCollection(collection) as unknown as Record<string, unknown>[]).filter(
    (item) => keyOf(collection, item as { slug?: string; id?: string }) !== key,
  );
  writeCollection(collection, items);
  revalidatePath("/", "layout");
  redirect(`/admin/${collection}?deleted=1`);
}

export async function saveNow(_prev: AdminState, formData: FormData): Promise<AdminState> {
  if (!(await readSession())) return { status: "error", message: "Sign in again." };
  if (!contentWritable()) return { status: "error", message: "Writes are off." };
  const parsed = nowSchema.safeParse({
    text: String(formData.get("text") ?? ""),
    source: String(formData.get("source") ?? ""),
    updatedAt: new Date().toISOString(),
  });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid" };
  writeNow(parsed.data);
  revalidatePath("/", "layout");
  return { status: "success", message: "Now page updated." };
}

