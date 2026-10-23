export type InquiryInput = {
  name: string;
  org: string;
  contact: string;
  objective: string;
  deliverables: string;
  budget: string;
  timeline: string;
  companyWebsite: string;
  consent: boolean;
};

export type InquiryErrors = Partial<Record<keyof InquiryInput, string>>;

const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const url = /^https?:\/\/\S+$/i;

export function validContact(value: string): boolean {
  const v = value.trim();
  return email.test(v) || url.test(v);
}

export function validateInquiry(
  input: InquiryInput,
  options: { budgets: string[]; timelines: string[] },
): { ok: true; discarded: boolean; value: InquiryInput } | { ok: false; errors: InquiryErrors } {
  const errors: InquiryErrors = {};
  const name = input.name.trim();
  const org = input.org.trim();
  const contact = input.contact.trim();
  const objective = input.objective.trim();
  const deliverables = input.deliverables.trim();
  if (name.length < 2 || name.length > 80) errors.name = "Enter your name (2–80 characters).";
  if (org.length < 2 || org.length > 120) errors.org = "Enter an organisation, or “Independent”.";
  if (!validContact(contact)) errors.contact = "Use an email address or an https link so a reply is possible.";
  if (objective.length < 20 || objective.length > 2000) errors.objective = "Describe the objective in 20–2000 characters.";
  if (deliverables.length < 10 || deliverables.length > 2000) errors.deliverables = "Name the deliverables in 10–2000 characters.";
  if (!options.budgets.includes(input.budget)) errors.budget = "Choose a budget range.";
  if (!options.timelines.includes(input.timeline)) errors.timeline = "Choose a timeline.";
  if (!input.consent) errors.consent = "Consent is required before this inquiry can be delivered.";
  if (Object.keys(errors).length > 0) return { ok: false, errors };
  const value = { ...input, name, org, contact, objective, deliverables };
  if (input.companyWebsite.trim().length > 0) return { ok: true, discarded: true, value };
  return { ok: true, discarded: false, value };
}
