"use client";

import { useEffect, useRef } from "react";

export function ZineCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const onMove = (event: PointerEvent) => {
      node.style.opacity = "1";
      node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <div className="scroll-live" aria-hidden="true" />
      <div ref={ref} className="cursor-x" aria-hidden="true" />
    </>
  );
}
