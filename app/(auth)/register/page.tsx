import RegisterWithBg from "@/components/Auth/Register";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ role?: string; plan?: string }> }) {
  // Await searchParams to resolve the Promise
  const resolvedSearchParams = await searchParams;
  const role = resolvedSearchParams.role || "USER"; // Default to "USER" if undefined
  const plan = resolvedSearchParams.plan || ""; // Default to empty string if undefined

  const session = await getServerSession(authOptions);

  // Redirect if already logged in
  if (session) {
    redirect("/dashboard");
  }

  // Pass role and plan to the client component
  return (
    <div className="">
      <RegisterWithBg role={role} plan={plan} />
    </div>
  );
}