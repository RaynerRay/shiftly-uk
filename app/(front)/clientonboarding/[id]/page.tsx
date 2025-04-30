import { getClientProfileById } from "@/actions/clientonboarding";
import ClientProfileOnboardingForm from "@/components/Onboarding/Client";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const clientProfileResponse = await getClientProfileById(id);
  const clientProfile = clientProfileResponse?.data;

  // Make sure there's a clientProfile before rendering the form
  if (!clientProfile) {
    return (
      <div className="bg-sky-700 dark:bg-slate-800 mt-4 flex items-center justify-center min-h-screen">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold mb-4">Client Profile Not Found</h1>
          <p>The requested client profile could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sky-700 dark:bg-slate-800 mt-4">
      <div className="max-w-5xl mx-auto py-8 min-h-screen">
        <ClientProfileOnboardingForm
          clientProfile={{
            ...clientProfile,
            companyLogo: clientProfile.companyLogo ?? undefined,
            employersLiability: clientProfile.employersLiability || [],
          }}
          userId={id} // Pass the userId explicitly to the form
          redirectUrl="/dashboard" // Add a redirect URL after successful update
        />
      </div>
    </div>
  );
}