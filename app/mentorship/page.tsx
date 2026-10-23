import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/mentorship",
  title: "Mentorship",
  description: "Mentorship with Ryan Editraj is not open. No fee is published.",
});

export default function MentorshipPage() {
  const offerings = published(readCollection("offerings"));
  return (
    <Shell section="Mentorship">
      <p className="kicker">Mentorship</p>
      <h1>Mentorship is not open</h1>
      <p className="lede">No format is published, so there is nothing to buy. A draft exists in the content files for Ryan to confirm or delete.</p>
      {offerings.length === 0 ? (
        <p className="empty">Nothing on the public list.</p>
      ) : (
        <ul className="directory-list">
          {offerings.map((offering) => (
            <li key={offering.slug}>
              <h2>{offering.title}</h2>
              <p>{offering.summary}</p>
              <p className="meta">{offering.durationMin} minutes · Asia/Kolkata · {offering.priceInr == null ? "fee unset" : `₹${offering.priceInr}`}</p>
            </li>
          ))}
        </ul>
      )}
      <p>
        <a className="ghost" href="/mentorship/book">
          See the booking screen
        </a>
      </p>
    </Shell>
  );
}
