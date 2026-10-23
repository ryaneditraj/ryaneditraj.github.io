import { redirect } from "next/navigation";
import { logout } from "@/lib/actions";
import { Shell } from "@/components/shell";
import { contentWritable } from "@/lib/content";
import { readSession } from "@/lib/session";

export const metadata = { robots: { index: false, follow: false }, title: "Admin" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await readSession())) redirect("/admin/login");
  return (
    <Shell section="Admin">
      <p className="kicker">Admin</p>
      <div className="banner">
        <p>{contentWritable() ? "Writes are on. Saves change content JSON on this machine." : "Writes are off. You can look, and saves will be refused."}</p>
        <form action={logout}>
          <button className="ghost" type="submit" style={{ background: "transparent", border: 0, padding: 0 }}>
            Sign out
          </button>
        </form>
      </div>
      {children}
    </Shell>
  );
}
