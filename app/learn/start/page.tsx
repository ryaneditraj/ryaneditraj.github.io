import { Shell } from "@/components/shell";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/learn/start",
  title: "Start here",
  description: "A short path into Ryan Editraj’s work for someone who is new to tech.",
});

export default function StartPage() {
  return (
    <Shell section="Start">
      <p className="kicker">New to tech</p>
      <h1>Start here if you are new to tech.</h1>
      <p className="lede">Three public pieces. No reel list yet. He has not named the clips to pin, so this page does not invent them.</p>
      <ol className="directory-list">
        <li>
          <h2>Read the essay</h2>
          <p className="measure">
            He writes that technology should explain itself, and that the work is to reduce complexity. That is the closest thing he has published to the bridge from non-tech to tech.
          </p>
          <p>
            <a href="https://medium.com/@ryaneditraj/a-16-year-old-founders-prediction-the-next-cybersecurity-crisis-will-be-powered-by-ai-6cbd75ad947a">
              Medium, 2 June 2026
            </a>
          </p>
        </li>
        <li>
          <h2>Watch the demo</h2>
          <p className="measure">A film of Thugir Labs, on the Thugir Labs channel. It is a product demo, not a lesson in how to break a system.</p>
          <p>
            <a href="https://www.youtube.com/watch?v=pzrIMsDy0Wg">I Built an AI Security Engine That Reasons. Not Scans.</a>
          </p>
        </li>
        <li>
          <h2>Follow the account</h2>
          <p className="measure">Instagram is where the ongoing explanation lives. The handle is @ryaneditraj. This page does not print a follower count.</p>
          <p>
            <a href="https://www.instagram.com/ryaneditraj/">@ryaneditraj</a>
          </p>
        </li>
      </ol>
      <p className="todo measure">TODO(Ryan): name three to five explainer reels, with links, and this page can lead with them.</p>
      <p>
        <a className="ghost" href="/build">
          Or look at the products
        </a>
      </p>
    </Shell>
  );
}
