"use client";

import { useActionState } from "react";
import { submitBooking, type BookState } from "@/lib/actions";

const initial: BookState = { status: "idle" };

export function BookingForm({
  live,
  offeringSlug,
  slots,
}: {
  live: boolean;
  offeringSlug: string;
  slots: { start: string; end: string; label: string }[];
}) {
  const [state, action, pending] = useActionState(submitBooking, initial);
  return (
    <form className="form" action={action}>
      <input type="hidden" name="offering" value={offeringSlug} />
      {state.status !== "idle" && state.message ? (
        <div className="alert" role={state.status === "error" ? "alert" : "status"}>
          <p>{state.message}</p>
          {state.checkoutUrl ? (
            <p>
              <a href={state.checkoutUrl}>Continue to Stripe</a>
            </p>
          ) : null}
          {state.razorpay ? (
            <p>
              Order {state.razorpay.orderId} for ₹{state.razorpay.amount / 100}. Booking {state.razorpay.bookingId}. Public key{" "}
              {state.razorpay.keyId || "is missing, so checkout cannot open"}.
            </p>
          ) : null}
        </div>
      ) : null}
      <fieldset className="slots" disabled={!live}>
        <legend className="kicker">Times in Asia/Kolkata</legend>
        {slots.length === 0 ? <p>No upcoming example times in the next two weeks.</p> : null}
        {slots.map((slot) => (
          <label className="slot" key={slot.start}>
            <input type="radio" name="start" value={slot.start} required={live} />
            <span>{slot.label}</span>
          </label>
        ))}
      </fieldset>
      <label className="field">
        <span>Name</span>
        <input name="name" autoComplete="name" disabled={!live} />
      </label>
      <label className="field">
        <span>Email</span>
        <input name="contact" type="email" autoComplete="email" disabled={!live} />
      </label>
      <button className="stamp" type="submit" disabled={!live || pending}>
        {live ? (pending ? "Checking" : "Hold this time") : "Booking is not open"}
      </button>
    </form>
  );
}
