import { Shell } from "@/components/shell";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/terms",
  title: "Terms",
  description: "Plain terms for using Ryan Editraj’s site. Have a lawyer review them.",
});

export default function TermsPage() {
  return (
    <Shell section="Terms">
      <p className="kicker">Terms</p>
      <h1>Terms</h1>
      <div className="banner">
        <p>Have a lawyer review this before you treat it as your terms of business. It describes the site as built.</p>
      </div>
      <div className="prose">
        <p>The pages are information. A collaboration starts only when Ryan agrees in a separate exchange, not when a form is submitted. A mentorship time is not reserved by selecting it, and a payment is not complete because a checkout page redirected back here.</p>
        <p>Project descriptions follow public repositories. They are not an offer of securities, not financial advice, and not a claim that a model will make money. The markets projects say the same thing in their own READMEs.</p>
        <p>Do not send secrets, credentials, or someone else’s personal data through the forms.</p>
        <p>TODO(Ryan): add governing law, your legal name for contracts, and a refund line if you sell sessions.</p>
      </div>
    </Shell>
  );
}
