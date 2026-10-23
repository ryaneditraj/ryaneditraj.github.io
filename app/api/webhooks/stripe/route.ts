import { markPaid, readBookings } from "@/lib/bookings";
import { verifyStripeSignature } from "@/lib/payments";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: "not_configured" }, { status: 503 });
  const raw = await request.text();
  if (!verifyStripeSignature(raw, request.headers.get("stripe-signature") ?? "", secret)) {
    return Response.json({ error: "invalid_signature" }, { status: 400 });
  }
  let event: {
    type?: string;
    data?: {
      object?: {
        id?: string;
        client_reference_id?: string;
        amount_total?: number;
        currency?: string;
        payment_status?: string;
        metadata?: { bookingId?: string };
      };
    };
  };
  try {
    event = JSON.parse(raw) as typeof event;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  if (event.type !== "checkout.session.completed") return Response.json({ received: true });
  const session = event.data?.object;
  const bookingId = session?.client_reference_id || session?.metadata?.bookingId;
  if (!session?.id || !bookingId || session.payment_status !== "paid" || session.currency !== "inr" || typeof session.amount_total !== "number") {
    return Response.json({ ignored: true });
  }
  const booking = readBookings().find((item) => item.id === bookingId);
  if (!booking?.amountInr || booking.amountInr * 100 !== session.amount_total) {
    return Response.json({ error: "amount_mismatch" }, { status: 400 });
  }
  if (booking.providerRef && booking.providerRef !== session.id) {
    return Response.json({ error: "reference_mismatch" }, { status: 400 });
  }
  const ok = await markPaid(bookingId, "stripe", session.id, booking.amountInr);
  return ok ? Response.json({ received: true }) : Response.json({ error: "not_updated" }, { status: 400 });
}
