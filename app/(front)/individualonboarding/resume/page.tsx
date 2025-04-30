// import { getUserById } from "@/actions/users";
// import VerifyTokenForm from "@/components/VerifyTokenForm";


import TrackingForm from "@/components/frontend/TrackingForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function VerifyTrackingNumber() {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  if (id) {
    redirect(`/individualonboarding/${id}`);
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Resume your Application</CardTitle>
          <CardDescription>
            Please enter the 10-Character Tracking number that was given to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TrackingForm />
        </CardContent>
      </Card>
    </div>
  );
}
