// app/register/page.tsx
import UserTypeSelection from "@/components/Auth/UserTypeSelection";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  // Redirect if already logged in
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div>
      <UserTypeSelection />
    </div>
  );
}