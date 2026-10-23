import { LoginForm } from "@/components/login-form";
import { Shell } from "@/components/shell";
import { adminConfigured } from "@/lib/session";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  path: "/admin/login",
  title: "Admin sign in",
  description: "Operator sign-in.",
  index: false,
});

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const query = await searchParams;
  const next = query.next && query.next.startsWith("/admin") ? query.next : "/admin";
  return (
    <Shell section="Admin">
      <p className="kicker">Admin</p>
      <h1>Sign in</h1>
      <LoginForm next={next} configured={adminConfigured()} />
    </Shell>
  );
}
