"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function MobileNav({ links, current }: { links: { href: string; label: string }[]; current: string }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const shell = document.querySelector(".shell");
    if (!(shell instanceof HTMLElement)) return;
    if (open) shell.setAttribute("inert", "");
    else shell.removeAttribute("inert");
    return () => shell.removeAttribute("inert");
  }, [open]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="nav-fold">
      <button type="button" className="menu-button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}>
        {open ? "Close" : "Menu"}
      </button>
      {open
        ? createPortal(
        <div id="mobile-nav" className="nav-panel" role="dialog" aria-modal="true" aria-label="Site menu">
          <header>
            <span className="kicker">Ryan Editraj</span>
            <button ref={closeRef} type="button" className="menu-button" onClick={() => setOpen(false)}>
              Close
            </button>
          </header>
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={current === link.href ? "page" : undefined} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          </div>,
        document.body,
      )
        : null}
    </div>
  );
}
