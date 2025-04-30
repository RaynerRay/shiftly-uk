import { getIndividualClientProfileById } from "@/actions/individualclient";
import IndividualClientOnboardingForm from "@/components/Onboarding/IndividualClient";
import { IndividualClientFormProps } from "@/types/types";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params promise using React.use()
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  // Fetch the profile data server-side
  const individualClientProfileResponse = use(getIndividualClientProfileById(id));
  const individualClientProfile = individualClientProfileResponse?.data;

  if (!individualClientProfile) {
    return (
      <div className="bg-sky-700 dark:bg-slate-800 mt-4 flex items-center justify-center min-h-screen">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold mb-4">Individual Client Profile Not Found</h1>
          <p>The requested client profile could not be found.</p>
        </div>
      </div>
    );
  }

  const formattedProfile: Partial<IndividualClientFormProps> = {
    fullName: individualClientProfile.fullName || "",
    email: individualClientProfile.email || "",
    phone: individualClientProfile.phone || "",
    address: individualClientProfile.address || "",
    nextOfKinName: individualClientProfile.nextOfKinName || "",
    nextOfKinNumber: individualClientProfile.nextOfKinNumber || "",
    proofOfAddress: individualClientProfile.proofOfAddress || [],
  };

  return (
    <div className="bg-gray-100 dark:bg-slate-800 mt-4">
      <div className="max-w-5xl mx-auto py-8 min-h-screen">
        <IndividualClientOnboardingForm
          individualClientProfile={formattedProfile}
          profileId={individualClientProfile.id} // Pass the profile ID
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}