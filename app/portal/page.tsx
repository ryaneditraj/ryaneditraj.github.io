import { Shell } from "@/components/shell";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/portal",
  title: "Portal",
  description: "The private portal is not enabled.",
  index: false,
});

export default function PortalPage() {
  return (
    <Shell section="Portal">
      <p className="kicker">Portal</p>
      <h1>The portal is not enabled</h1>
      <p className="lede">There is no account system, no client login, and no private files. A portal page with invented projects would be a fiction, so this one refuses.</p>
      <p className="measure">
        The shape, if Ryan wants it later, is in the repository at docs/portal-architecture.md: a separate session from the admin, scoped to a person’s own inquiries, and no shared activity feed.
      </p>
    </Shell>
  );
}
