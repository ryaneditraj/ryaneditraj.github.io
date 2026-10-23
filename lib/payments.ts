import { createHmac, timingSafeEqual } from "node:crypto";

function hexEqual(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** Stripe-Signature: t=unix,v1=hex */
export function verifyStripeSignature(
  payload: string,
  header: string,
  secret: string,
  nowSec = Math.floor(Date.now() / 1000),
  toleranceSec = 300,
): boolean {
  if (!header || !secret) return false;
  const parts = header.split(",").map((part) => part.trim());
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2);
  const signatures = parts.filter((part) => part.startsWith("v1=")).map((part) => part.slice(3));
  if (!timestamp || signatures.length === 0) return false;
  const stamp = Number(timestamp);
  if (!Number.isFinite(stamp) || Math.abs(nowSec - stamp) > toleranceSec) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  return signatures.some((signature) => hexEqual(expected, signature));
}

/** Razorpay sends hex HMAC-SHA256 of the raw body in X-Razorpay-Signature. */
export function verifyRazorpaySignature(payload: string, signature: string, secret: string): boolean {
  if (!signature || !secret) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  return hexEqual(expected, signature);
}

export type PaymentProvider = "razorpay" | "stripe";

export function configuredPaymentProvider(): PaymentProvider | null {
  const choice = process.env.PAYMENT_PROVIDER?.trim();
  if (choice === "razorpay") {
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET && process.env.RAZORPAY_WEBHOOK_SECRET) {
      return "razorpay";
    }
    return null;
  }
  if (choice === "stripe") {
    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET) return "stripe";
    return null;
  }
  return null;
}

export function paymentsReady(): boolean {
  return configuredPaymentProvider() !== null;
}
