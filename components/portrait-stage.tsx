"use client";

import Image from "next/image";
import { useRef } from "react";

export function PortraitStage({ line }: { line: string }) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      className="stage"
      ref={ref}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const node = ref.current;
        if (!node) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const box = node.getBoundingClientRect();
        node.style.setProperty("--mx", ((event.clientX - box.left) / box.width - 0.5).toFixed(3));
        node.style.setProperty("--my", ((event.clientY - box.top) / box.height - 0.5).toFixed(3));
      }}
    >
      <div className="stage-shift">
        <Image
          className="stage-photo"
          src="/ryan.jpg"
          alt="Black and white portrait of Ryan Editraj."
          fill
          priority
          sizes="100vw"
        />
        <Image className="stage-ghost" src="/ryan.jpg" alt="" fill sizes="100vw" aria-hidden />
        <div className="stage-slice" aria-hidden="true" />
        <div className="stage-dots" aria-hidden="true" />
        <div className="stage-scan" aria-hidden="true" />
      </div>
      <p className="tape">16 · Tamil Nadu, India</p>
      <p className="rubber">Since about 12</p>
      <h1>
        <span className="slab slab-ink">I build.</span>
        <span className="slab slab-red">For companies.</span>
        <span className="slab slab-paper">Web, apps, AI, ops.</span>
      </h1>
      <p className="studio-card">{line}</p>
      <p className="stage-note">
        Technical founder. Freelance, and a fractional CTO when a company wants a partner for the build and the operations. This site was designed and built by me. The portrait file is public/ryan.jpg, ready to swap.
      </p>
    </section>
  );
}
