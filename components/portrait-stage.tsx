"use client";

import Image from "next/image";
import { useRef } from "react";

export function PortraitStage({ mission }: { mission: string }) {
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
        <span className="slab slab-red">I explain.</span>
        <span className="slab slab-paper">So tech feels possible.</span>
      </h1>
      <div className="terminal">
        <p>
          <span>$</span> whoami
        </p>
        <p>ryaneditraj — security and AI, explained in public</p>
        <p>
          <span>$</span> mission
        </p>
        <p>{mission}</p>
        <p>
          <span>$</span> now
        </p>
        <p>thugir labs, closed beta · moneyradar, live · @ryaneditraj</p>
      </div>
      <p className="stage-note">
        I have been coding since I was about 12. I build security and AI products, and I explain them for people who think this field is not for them. About 12 is an old public listing, not a diary. The portrait is my GitHub photo, in black and white.
      </p>
    </section>
  );
}
