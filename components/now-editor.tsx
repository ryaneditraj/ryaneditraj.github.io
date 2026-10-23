"use client";

import { useActionState } from "react";
import { saveNow, type AdminState } from "@/lib/actions";

const initial: AdminState = { status: "idle" };

export function NowEditor({ text, source }: { text: string; source: string }) {
  const [state, action, pending] = useActionState(saveNow, initial);
  return (
    <form className="form" action={action}>
      {state.message ? (
        <div className="alert" role={state.status === "error" ? "alert" : "status"}>
          {state.message}
        </div>
      ) : null}
      <label className="field">
        <span>Text</span>
        <textarea name="text" required defaultValue={text} />
      </label>
      <label className="field">
        <span>Source</span>
        <textarea name="source" required defaultValue={source} />
      </label>
      <button className="stamp" type="submit" disabled={pending}>
        {pending ? "Saving" : "Save now"}
      </button>
    </form>
  );
}
