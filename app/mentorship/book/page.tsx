import { BookingForm } from "@/components/booking-form";
import { Shell } from "@/components/shell";
import { generateSlots } from "@/lib/bookings";
import { readCollection } from "@/lib/content";
import { paymentsReady } from "@/lib/payments";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/mentorship/book",
  title: "Book a session",
  description: "Mentorship times in Asia/Kolkata. A booking is confirmed only by a signed payment webhook.",
});

export default async function BookPage({ searchParams }: { searchParams: Promise<{ returned?: string; cancelled?: string }> }) {
  const query = await searchParams;
  const offering = readCollection("offerings")[0];
  const live = Boolean(offering && offering.status === "published" && offering.scheduleStatus === "confirmed" && offering.priceInr && paymentsReady());
  const slots = offering ? generateSlots(offering, new Date()).slice(0, 8) : [];
  return (
    <Shell section="Book">
      <p className="kicker">Asia/Kolkata · IST, UTC+5:30</p>
      <h1>Book a session</h1>
      <div className="banner">
        <p>These times are an example week: weekday evenings, 45 minutes, India time. They are not confirmed hours.</p>
        <p>The button stays off until a published offering, a confirmed schedule, a fee, and a payment provider are all set. A return from Razorpay or Stripe is not a receipt. Only a signed webhook marks a booking paid.</p>
      </div>
      {query.returned ? (
        <p className="alert" role="status">
          You came back from a checkout page. That return does not confirm payment.
        </p>
      ) : null}
      {query.cancelled ? (
        <p className="alert" role="status">
          Checkout was cancelled. No booking was marked paid.
        </p>
      ) : null}
      {offering ? <BookingForm live={live} offeringSlug={offering.slug} slots={slots} /> : <p>No session shape is defined.</p>}
    </Shell>
  );
}
