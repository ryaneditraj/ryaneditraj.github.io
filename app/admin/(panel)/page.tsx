import Link from "next/link";
import { COLLECTION_NAMES } from "@/lib/schemas";
import { readCollection } from "@/lib/content";

export default function AdminHome() {
  return (
    <>
      <h1>Content</h1>
      <p className="lede">Edit the JSON collections. Drafts stay off the public site.</p>
      <ul className="directory-list">
        <li>
          <Link href="/admin/now">Now</Link>
          <div className="meta">Single page</div>
        </li>
        {COLLECTION_NAMES.map((name) => {
          const count = readCollection(name).length;
          return (
            <li key={name}>
              <Link href={`/admin/${name}`}>{name}</Link>
              <div className="meta">{count === 0 ? "Empty" : `${count} records`}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
