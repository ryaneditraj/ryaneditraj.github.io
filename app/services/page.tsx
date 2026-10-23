import { Shell } from "@/components/shell";
import { published, readCollection } from "@/lib/content";
import { Markdown } from "@/lib/markdown";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/services",
  title: "Services",
  description: "How to work with Ryan Editraj. Fees are unset until he publishes them.",
});

export default function ServicesPage() {
  const services = published(readCollection("services"));
  return (
    <Shell section="Services">
      <p className="kicker">Services</p>
      <h1>What a collaboration can be</h1>
      <p className="lede">Two lanes, both without a price. A number appears here only after Ryan writes it into the content file.</p>
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
        <a className="stamp" href="/collaborate">
          Start a collaboration
        </a>
      </p>
    </Shell>
  );
}
