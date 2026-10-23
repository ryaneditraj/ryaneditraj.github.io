"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions";

const initial: LoginState = { status: "idle" };

export function LoginForm({ next, configured }: { next: string; configured: boolean }) {
  const [state, action, pending] = useActionState(login, initial);
  if (!configured) {
    return (
      <div className="banner">
        <p>Admin sign-in is not configured. Set SESSION_SECRET and ADMIN_PASSWORD on the server. No default password exists.</p>
      </div>
    );
  }
  return (
    <form className="form" action={action}>
      <input type="hidden" name="next" value={next} />
      {state.status === "error" ? (
        <div className="alert" role="alert">
          {state.message}
        </div>
      ) : null}
      <label className="field">
        <span>Password</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      <button className="stamp" type="submit" disabled={pending}>
        {pending ? "Checking" : "Sign in"}
      </button>
    </form>
  );
}
