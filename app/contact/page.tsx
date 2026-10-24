import { InquiryForm } from "@/components/inquiry-form";
import { Shell } from "@/components/shell";
import { getSite } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/contact",
  title: "Contact",
  description: "Write to Ryan Editraj through the form. No street address is published.",
});

export default function ContactPage() {
  const site = getSite();
  return (
    <Shell section="Contact">
      <p className="kicker">Contact</p>
      <h1>Write through the form</h1>
      <p className="lede">This is the door. There is no street address on this site, and no school or village.</p>
      <InquiryForm
        budgets={site.budgetRanges}
        timelines={site.timelines}
        email={site.email}
        turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      />
      <p className="meta">If email delivery is not configured, the form says so and offers {site.email} as the reply address.</p>
    </Shell>
  );
}
