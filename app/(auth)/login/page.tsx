import LoginFormWithBg from "@/components/Auth/Login";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ returnUrl?: string }> }) {
  // Await searchParams to resolve the Promise
  const resolvedSearchParams = await searchParams;
  const returnUrl = resolvedSearchParams.returnUrl || "/dashboard";

  const session = await getServerSession(authOptions);

  // Redirect if already logged in
  if (session) {
    redirect(returnUrl);
  }

  // Pass returnUrl to the client component
  return (
    <div className="">
      <LoginFormWithBg returnUrl={returnUrl} />
    </div>
  );
}