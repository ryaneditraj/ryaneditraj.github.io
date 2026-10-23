"use client";

import { useActionState } from "react";
import Script from "next/script";
import { submitInquiry, type InquiryState } from "@/lib/actions";

const initial: InquiryState = { status: "idle" };

export function InquiryForm({
  budgets,
  timelines,
  email,
  turnstileSiteKey,
}: {
  budgets: string[];
  timelines: string[];
  email: string;
  turnstileSiteKey?: string;
}) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  return (
    <form className="form" action={action} noValidate>
      {state.status === "error" && state.message ? (
        <div className="alert" role="alert">
          {state.message}
        </div>
      ) : null}
      {state.status === "success" ? (
        <div className="alert" role="status">
          {state.delivery === "email" ? "Sent. Ryan has the inquiry by email." : null}
          {state.delivery === "stored" ? "Saved on the server for Ryan. Email delivery is not configured, so no email was sent." : null}
          {state.delivery === "unsent" ? (
            <>
              The inquiry is valid, and nothing was sent. Email delivery is not configured. Write to <a href={`mailto:${email}`}>{email}</a>.
            </>
          ) : null}
          {state.delivery === "discarded" ? "Received." : null}
        </div>
      ) : null}
      <div className="field">
        <label htmlFor="inquiry-name">Name</label>
        <input id="inquiry-name" name="name" autoComplete="name" required aria-invalid={state.status === "error" && state.errors?.name ? true : undefined} aria-describedby={state.status === "error" && state.errors?.name ? "inquiry-name-error" : undefined} />
        {state.status === "error" && state.errors?.name ? <p id="inquiry-name-error" className="field-error">{state.errors.name}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="inquiry-org">Organisation</label>
        <input id="inquiry-org" name="org" autoComplete="organization" required aria-invalid={state.status === "error" && state.errors?.org ? true : undefined} aria-describedby={state.status === "error" && state.errors?.org ? "inquiry-org-error" : undefined} />
        {state.status === "error" && state.errors?.org ? <p id="inquiry-org-error" className="field-error">{state.errors.org}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="inquiry-contact">Contact</label>
        <input id="inquiry-contact" name="contact" autoComplete="email" required aria-invalid={state.status === "error" && state.errors?.contact ? true : undefined} aria-describedby={state.status === "error" && state.errors?.contact ? "inquiry-contact-error" : undefined} />
        {state.status === "error" && state.errors?.contact ? <p id="inquiry-contact-error" className="field-error">{state.errors.contact}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="inquiry-objective">Objective</label>
        <textarea id="inquiry-objective" name="objective" required aria-invalid={state.status === "error" && state.errors?.objective ? true : undefined} aria-describedby={state.status === "error" && state.errors?.objective ? "inquiry-objective-error" : undefined} />
        {state.status === "error" && state.errors?.objective ? <p id="inquiry-objective-error" className="field-error">{state.errors.objective}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="inquiry-deliverables">Deliverables</label>
        <textarea id="inquiry-deliverables" name="deliverables" required aria-invalid={state.status === "error" && state.errors?.deliverables ? true : undefined} aria-describedby={state.status === "error" && state.errors?.deliverables ? "inquiry-deliverables-error" : undefined} />
        {state.status === "error" && state.errors?.deliverables ? <p id="inquiry-deliverables-error" className="field-error">{state.errors.deliverables}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="inquiry-budget">Budget range</label>
        <select id="inquiry-budget" name="budget" defaultValue="" required aria-invalid={state.status === "error" && state.errors?.budget ? true : undefined} aria-describedby={state.status === "error" && state.errors?.budget ? "inquiry-budget-error" : undefined}>
          <option value="" disabled>
            Choose a range
          </option>
          {budgets.map((budget) => (
            <option key={budget}>{budget}</option>
          ))}
        </select>
        {state.status === "error" && state.errors?.budget ? <p id="inquiry-budget-error" className="field-error">{state.errors.budget}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="inquiry-timeline">Timeline</label>
        <select id="inquiry-timeline" name="timeline" defaultValue="" required aria-invalid={state.status === "error" && state.errors?.timeline ? true : undefined} aria-describedby={state.status === "error" && state.errors?.timeline ? "inquiry-timeline-error" : undefined}>
          <option value="" disabled>
            Choose a timeline
          </option>
          {timelines.map((timeline) => (
            <option key={timeline}>{timeline}</option>
          ))}
        </select>
        {state.status === "error" && state.errors?.timeline ? <p id="inquiry-timeline-error" className="field-error">{state.errors.timeline}</p> : null}
      </div>
      <div className="hp" aria-hidden="true">
        <label>
          Company website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="check">
        <input type="checkbox" name="consent" />
        <span>Ryan may store this inquiry long enough to reply. Do not send secrets.</span>
      </label>
      {state.status === "error" && state.errors?.consent ? <p className="field-error">{state.errors.consent}</p> : null}
      {turnstileSiteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
        </>
      ) : null}
      <button className="stamp" type="submit" disabled={pending}>
        {pending ? "Sending" : "Send the inquiry"}
      </button>
    </form>
  );
}
