import { Shell } from "@/components/shell";
import { getSite } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/contact",
  title: "Contact",
  description: "Which door to use to reach Ryan Editraj.",
});

export default function ContactPage() {
  const site = getSite();
  return (
    <Shell section="Contact">
      <p className="kicker">Contact</p>
      <h1>Which door</h1>
      <p className="lede">This page does not repeat the inquiry form. It sends you to the right one.</p>
      <dl className="facts">
        <div>
          <dt>A project</dt>
          <dd>
            <a href="/collaborate">Start a collaboration</a>
          </dd>
        </div>
        <div>
          <dt>A session</dt>
          <dd>
            <a href="/mentorship">Mentorship</a> is not open.
          </dd>
        </div>
        <div>
          <dt>Press</dt>
          <dd>
            <a href="/media-kit">Media kit</a>, then <a href={`mailto:${site.email}`}>{site.email}</a>
          </dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <div className="meta">Published in the GitHub profile README.</div>
          </dd>
        </div>
      </dl>
    </Shell>
  );
}
