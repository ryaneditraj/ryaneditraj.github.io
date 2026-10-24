import Image from "next/image";
import Link from "next/link";
import { Shell } from "@/components/shell";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/404",
  title: "Not found",
  description: "That page is not on Ryan Editraj’s site.",
  index: false,
});

export default function NotFound() {
  return (
    <Shell section="Missing">
      <div className="lost">
        <div className="lost-frame">
          <picture>
            <source srcSet="/ryan.avif" type="image/avif" />
            <source srcSet="/ryan.webp" type="image/webp" />
            <Image src="/ryan.jpg" alt="" fill unoptimized sizes="28rem" />
          </picture>
          <div className="lost-slice" aria-hidden="true" />
          <p className="lost-num">404</p>
        </div>
        <p className="kicker">Missing page</p>
        <h1>This page is not on the internet.</h1>
        <p className="lede">The address does not match a published page. It walked off. The index is still here.</p>
        <p>
          <Link className="stamp" href="/">
            Back to the portrait
          </Link>{" "}
          <Link className="ghost" href="/directory">
            Open the index
          </Link>
        </p>
      </div>
    </Shell>
  );
}
