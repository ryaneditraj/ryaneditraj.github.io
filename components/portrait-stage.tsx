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
        <picture>
          <source srcSet="/ryan.avif" type="image/avif" />
          <source srcSet="/ryan.webp" type="image/webp" />
          <Image
            className="stage-photo"
            src="/ryan.jpg"
            alt="Black and white portrait of Ryan Editraj."
            fill
            unoptimized
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
          />
        </picture>
        <picture>
          <source srcSet="/ryan.avif" type="image/avif" />
          <source srcSet="/ryan.webp" type="image/webp" />
          <Image className="stage-ghost" src="/ryan.jpg" alt="" fill unoptimized sizes="100vw" aria-hidden />
        </picture>
        <div className="stage-slice" aria-hidden="true" />
        <div className="stage-dots" aria-hidden="true" />
        <div className="stage-scan" aria-hidden="true" />
      </div>
      <p className="tape">16 · Tamil Nadu, India</p>
      <p className="rubber">Since about 12</p>
      <h1>
        <span className="slab slab-ink">I build</span>
        <span className="slab slab-red">companies.</span>
        <span className="slab slab-paper">AI first.</span>
      </h1>
      <p className="studio-card">{line}</p>
      <p className="stage-note">This site was designed and built by me.</p>
    </section>
  );
}
