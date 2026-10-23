"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="page" id="content">
      <p className="kicker">Error</p>
      <h1>The page failed to render.</h1>
      <p className="lede">Nothing was charged and nothing was sent. Try the page again, or go back to the index.</p>
      <p>
        <button className="stamp" type="button" onClick={() => reset()}>
          Try again
        </button>{" "}
        <Link className="ghost" href="/">
          Home
        </Link>
      </p>
    </main>
  );
}
