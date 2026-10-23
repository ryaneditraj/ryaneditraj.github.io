"use client";

import { useActionState } from "react";
import { submitDispatch, type DispatchState } from "@/lib/actions";

const initial: DispatchState = { status: "idle" };

export function DispatchForm({ enabled }: { enabled: boolean }) {
  const [state, action, pending] = useActionState(submitDispatch, initial);
  if (!enabled) {
    return (
      <form className="form" aria-describedby="dispatch-off">
        <p id="dispatch-off">Signups are off. No list provider is configured, so this form does not collect addresses.</p>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" disabled />
        </label>
        <label className="check">
          <input type="checkbox" disabled />
          <span>I want the letters. This box does nothing until a provider is configured.</span>
        </label>
        <button className="stamp" type="button" disabled>
          Signup unavailable
        </button>
      </form>
    );
  }
  return (
    <form className="form" action={action}>
      {state.status !== "idle" ? (
        <div className="alert" role={state.status === "error" ? "alert" : "status"}>
          {state.message}
        </div>
      ) : null}
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <div className="hp" aria-hidden="true">
        <label>
          Company website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="check">
        <input type="checkbox" name="consent" required />
        <span>Add me to the dispatch list. I can unsubscribe later.</span>
      </label>
      <button className="stamp" type="submit" disabled={pending}>
        {pending ? "Adding" : "Subscribe"}
      </button>
    </form>
  );
}
