import type { Booking } from "@/lib/bookings";
import { getSiteUrl } from "@/lib/site-url";

export async function createRazorpayOrder(booking: Booking): Promise<{ ok: true; orderId: string; amount: number } | { ok: false; detail: string }> {
  const key = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key || !secret || booking.amountInr == null) return { ok: false, detail: "not_configured" };
  const amount = booking.amountInr * 100;
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt: booking.id.slice(0, 40),
      notes: { bookingId: booking.id },
    }),
  });
  if (!response.ok) return { ok: false, detail: `provider_${response.status}` };
  const data = (await response.json()) as { id?: string; amount?: number };
  if (!data.id || data.amount !== amount) return { ok: false, detail: "unexpected_order" };
  return { ok: true, orderId: data.id, amount };
}

export async function createStripeSession(booking: Booking): Promise<{ ok: true; url: string; id: string } | { ok: false; detail: string }> {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret || booking.amountInr == null) return { ok: false, detail: "not_configured" };
  const origin = getSiteUrl();
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("success_url", `${origin}/mentorship/book?returned=1&booking=${encodeURIComponent(booking.id)}`);
  body.set("cancel_url", `${origin}/mentorship/book?cancelled=1`);
  body.set("client_reference_id", booking.id);
  body.set("metadata[bookingId]", booking.id);
  body.set("line_items[0][quantity]", "1");
  body.set("line_items[0][price_data][currency]", "inr");
  body.set("line_items[0][price_data][unit_amount]", String(booking.amountInr * 100));
  body.set("line_items[0][price_data][product_data][name]", `Mentorship ${booking.offeringSlug}`);
  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) return { ok: false, detail: `provider_${response.status}` };
  const data = (await response.json()) as { id?: string; url?: string };
  if (!data.id || !data.url) return { ok: false, detail: "unexpected_session" };
  return { ok: true, url: data.url, id: data.id };
}
