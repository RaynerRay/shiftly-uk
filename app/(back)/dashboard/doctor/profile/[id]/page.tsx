import { getDoctorProfileById } from "@/actions/onboarding";
import { getSpecialties } from "@/actions/specialities";
import OnboardingSteps from "@/components/Onboarding/OnboardingSteps";
import React from "react";

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  // Get existing doctor profile and specialties
  const specialties = (await getSpecialties()).data || [];
  const doctorProfile = (await getDoctorProfileById(id))?.data;

  return (
    <div className="bg-sky-700 dark:bg-slate-800">
      {doctorProfile && doctorProfile.id && (
        <div className="max-w-5xl mx-auto py-8 min-h-screen">
          <OnboardingSteps
            doctorProfile={doctorProfile}
            id={id}
            specialties={specialties}
          />
        </div>
      )}
    </div>
  );
}