"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/mobile-nav";

export function SiteNav({ nav }: { nav: { href: string; label: string }[] }) {
  const current = usePathname() || "/";
  return (
    <>
      <Link className="brand" href="/" aria-current={current === "/" ? "page" : undefined}>
        <i>RE</i> Ryan Editraj
      </Link>
      <nav className="nav-inline" aria-label="Primary">
        {nav.map((link) => (
          <Link key={link.href} href={link.href} aria-current={current === link.href ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </nav>
      <MobileNav links={nav} current={current} />
    </>
  );
}
