import { Shell } from "@/components/shell";
import Link from "next/link";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/services",
  title: "Work with me",
  description:
    "Ryan Editraj builds companies: his own, and as a technical co-builder with other founders. This page is a partnership, not a service menu.",
});

export default function ServicesPage() {
  return (
    <Shell section="Work with me">
      <p className="kicker">Work with me</p>
      <h1>Work with me</h1>
      <p className="lede">
        I build companies. Mine, and as a technical co-builder with other people. This page is not a list of things I sell.
      </p>
      <section className="section">
        <p className="kicker">01</p>
        <h2>My companies</h2>
        <p className="measure">
          Thugir Labs and MoneyRadar are mine, with other products beside them. AI is the main thing. Thugir Labs is the deep work: high-end AI security research, an autonomous engine that reasons instead of only scanning, in closed beta.
        </p>
        <p>
          <Link className="ghost" href="/work">
            See the work
          </Link>
        </p>
      </section>
      <section className="section">
        <p className="kicker">02</p>
        <h2>With other founders</h2>
        <p className="measure">
          I also build as a technical co-builder. I do not name those companies, and I do not claim a title at one.
        </p>
      </section>
      <section className="section">
        <p className="kicker">03</p>
        <h2>How it starts</h2>
        <p className="measure">
          Write through the form. Say what the company is, and what the technical work is. There is no rate card.
        </p>
      </section>
      <p>
        <Link className="stamp" href="/contact">
          Write to me
        </Link>
      </p>
    </Shell>
  );
}
