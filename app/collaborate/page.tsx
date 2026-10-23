import { InquiryForm } from "@/components/inquiry-form";
import { Shell } from "@/components/shell";
import { getSite } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/collaborate",
  title: "Collaborate",
  description: "Send Ryan Editraj a collaboration inquiry. The server checks it before anything is delivered.",
});

export default function CollaboratePage() {
  const site = getSite();
  return (
    <Shell section="Collaborate">
      <p className="kicker">Collaborate</p>
      <h1>Start a collaboration</h1>
      <p className="lede">One audience: someone with a piece of work that needs building or explaining. Tell the truth about the objective. There is no deadline clock on this page.</p>
      <InquiryForm
        budgets={site.budgetRanges}
        timelines={site.timelines}
        email={site.email}
        turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      />
    </Shell>
  );
}
