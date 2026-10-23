import { Shell } from "@/components/shell";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/404",
  title: "Not found",
  description: "That page is not on Ryan Editraj’s site.",
  index: false,
});

export default function NotFound() {
  return (
    <Shell section="Missing">
      <p className="kicker">404</p>
      <h1>This page is not on the internet.</h1>
      <p className="lede">The address does not match a published page. Drafts and the admin are not linked from here.</p>
      <p>
        <a className="stamp" href="/directory">
          Open the index
        </a>
      </p>
    </Shell>
  );
}
