export function collaborateMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM && process.env.COLLAB_TO_EMAIL);
}

export function dispatchMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_SEGMENT_ID);
}

export async function sendCollaborationEmail(text: string, replyTo: string): Promise<{ ok: true } | { ok: false; detail: string }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.COLLAB_TO_EMAIL;
  if (!key || !from || !to) return { ok: false, detail: "not_configured" };
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Collaboration inquiry — ryaneditraj.com",
      text,
      reply_to: replyTo.includes("@") ? replyTo : undefined,
    }),
  });
  if (!response.ok) {
    return { ok: false, detail: `provider_${response.status}` };
  }
  return { ok: true };
}

export async function subscribeDispatch(email: string): Promise<{ ok: true } | { ok: false; detail: string }> {
  const key = process.env.RESEND_API_KEY;
  const segment = process.env.RESEND_SEGMENT_ID;
  const topic = process.env.RESEND_TOPIC_ID;
  if (!key || !segment) return { ok: false, detail: "not_configured" };
  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      unsubscribed: false,
      segments: [{ id: segment }],
      ...(topic ? { topics: [{ id: topic, subscription: "opt_in" }] } : {}),
    }),
  });
  if (!response.ok) return { ok: false, detail: `provider_${response.status}` };
  return { ok: true };
}
