import { markPaid, readBookings } from "@/lib/bookings";
import { verifyRazorpaySignature } from "@/lib/payments";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: "not_configured" }, { status: 503 });
  const raw = await request.text();
  if (!verifyRazorpaySignature(raw, request.headers.get("x-razorpay-signature") ?? "", secret)) {
    return Response.json({ error: "invalid_signature" }, { status: 400 });
  }
  let event: {
    event?: string;
    payload?: { payment?: { entity?: { amount?: number; order_id?: string; notes?: { bookingId?: string } } } };
  };
  try {
    event = JSON.parse(raw) as typeof event;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  if (event.event !== "payment.captured") return Response.json({ received: true });
  const payment = event.payload?.payment?.entity;
  const bookingId = payment?.notes?.bookingId;
  if (!payment?.order_id || !bookingId || typeof payment.amount !== "number" || payment.amount % 100 !== 0) {
    return Response.json({ ignored: true });
  }
  const booking = readBookings().find((item) => item.id === bookingId);
  const amountInr = payment.amount / 100;
  if (!booking?.amountInr || booking.amountInr !== amountInr) {
    return Response.json({ error: "amount_mismatch" }, { status: 400 });
  }
  if (booking.providerRef && booking.providerRef !== payment.order_id) {
    return Response.json({ error: "reference_mismatch" }, { status: 400 });
  }
  const ok = await markPaid(bookingId, "razorpay", payment.order_id, amountInr);
  return ok ? Response.json({ received: true }) : Response.json({ error: "not_updated" }, { status: 400 });
}
