import { Shell } from "@/components/shell";
import Link from "next/link";
import { published, readCollection } from "@/lib/content";
import { Markdown } from "@/lib/markdown";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/services",
  title: "Services",
  description: "Web development, apps, AI and automation, and fractional CTO work. Fees are unset until Ryan publishes them.",
});

export default function ServicesPage() {
  const services = published(readCollection("services"));
  return (
    <Shell section="Services">
      <p className="kicker">Services</p>
      <h1>What I build for companies</h1>
      <p className="lede">Web, apps, AI and automation, and a fractional CTO seat. A price appears here only after it is written down. No client is named.</p>
      {services.map((service, index) => (
        <section className="section" key={service.slug}>
          <p className="kicker">0{index + 1}</p>
          <h2>{service.title}</h2>
          <p className="lede">{service.summary}</p>
          <Markdown source={service.body} />
          <dl className="facts">
            <div>
              <dt>Audience</dt>
              <dd>{service.audience}</dd>
            </div>
            <div>
              <dt>Deliverables</dt>
              <dd className="todo">{service.deliverables}</dd>
            </div>
            <div>
              <dt>Fee</dt>
              <dd className="todo">{service.fee}</dd>
            </div>
          </dl>
        </section>
      ))}
      <p>
        <Link className="stamp" href="/contact">
          Start a project
        </Link>
      </p>
    </Shell>
  );
}
