import { Shell } from "@/components/shell";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/privacy",
  title: "Privacy",
  description: "What Ryan Editraj’s site stores, and what it leaves alone.",
});

export default function PrivacyPage() {
  return (
    <Shell section="Privacy">
      <p className="kicker">Privacy</p>
      <h1>Privacy</h1>
      <div className="banner">
        <p>This is a practical description of the software, not a lawyer’s opinion. Have it reviewed before you rely on it.</p>
      </div>
      <div className="prose">
        <h2>What you can send</h2>
        <p>The collaboration form asks for a name, an organisation, a contact, an objective, deliverables, a budget band, and a timeline. It is emailed only when Resend is configured. Otherwise it is not stored, unless the operator sets COLLAB_STORE=file, in which case it is written to a gitignored file on the server.</p>
        <p>Dispatches collect an email address only when you tick consent and a Resend segment is configured. With neither, the form is disabled and does not submit.</p>
        <p>A mentorship booking stores a name, an email, and a time only after a real hold is created. Holds are not created while payments and a confirmed schedule are missing. Payment card data stays with Razorpay or Stripe. This server sees the webhook, not the card.</p>
        <h2>What is not here</h2>
        <p>No analytics script loads unless Plausible or Umami environment variables are set. No advertising cookies are set by this application. The admin cookie is an httpOnly session for the operator, not for visitors.</p>
        <h2>How long</h2>
        <p>TODO(Ryan): say how long you keep inquiries and bookings, and who can read them.</p>
      </div>
    </Shell>
  );
}
