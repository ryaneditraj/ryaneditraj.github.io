import { getSiteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/json-ld";

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  const origin = getSiteUrl();
  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        {items.map((item, index) => (
          <span key={`${item.label}-${index}`}>
            {index > 0 ? <span aria-hidden="true"> / </span> : null}
            {item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
          </span>
        ))}
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            ...(item.href ? { item: `${origin}${item.href}` } : {}),
          })),
        }}
      />
    </>
  );
}
