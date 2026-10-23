import { DispatchForm } from "@/components/dispatch-form";
import { Shell } from "@/components/shell";
import { dispatchMailConfigured } from "@/lib/email";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/dispatches",
  title: "Dispatches",
  description: "Occasional letters from Ryan Editraj. Signup works only when a list provider is configured.",
});

export default function DispatchesPage() {
  const enabled = dispatchMailConfigured();
  return (
    <Shell section="Dispatches">
      <p className="kicker">Dispatches</p>
      <h1>Letters, when there is a list</h1>
      <p className="lede">
        {enabled
          ? "The list provider is configured. An address is added only if you tick consent."
          : "Signup is disabled. Set RESEND_API_KEY and RESEND_SEGMENT_ID before this form accepts an address."}
      </p>
      <DispatchForm enabled={enabled} />
    </Shell>
  );
}
