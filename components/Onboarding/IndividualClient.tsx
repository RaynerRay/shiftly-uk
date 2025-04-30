"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { TextAreaInput } from "../FormInputs/TextAreaInput";
import { useOnboardingContext } from "@/context/context";
import MultipleFileUpload from "../FormInputs/MultipleFileUpload";
import { IndividualClientFormProps } from "@/types/types";
import { updateIndividualClientProfile } from "@/actions/individualclient";

type Props = {
  individualClientProfile: Partial<IndividualClientFormProps>;
  redirectUrl?: string;
  profileId?: string; // The profile ID for updating
};

export default function IndividualClientOnboardingForm({
  individualClientProfile,
  redirectUrl,
  profileId
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { savedDBData, setIndividualClientData } = useOnboardingContext();
  const router = useRouter();

  // State for file uploads
  const [proofOfAddress, setProofOfAddress] = useState<string[]>(
    individualClientProfile.proofOfAddress || savedDBData.proofOfAddress || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IndividualClientFormProps>({
    defaultValues: {
      fullName: individualClientProfile.fullName || savedDBData.fullName || "",
      email: individualClientProfile.email || savedDBData.email || "",
      phone: individualClientProfile.phone || savedDBData.phone || "",
      address: individualClientProfile.address || savedDBData.address || "",
      nextOfKinName: individualClientProfile.nextOfKinName || savedDBData.nextOfKinName || "",
      nextOfKinNumber: individualClientProfile.nextOfKinNumber || savedDBData.nextOfKinNumber || "",
    },
  });

  async function onSubmit(data: IndividualClientFormProps) {
    setIsLoading(true);

    try {
      // Make sure we have a profile ID
      if (!profileId) {
        throw new Error("Profile ID is required for updating");
      }

      // Add proofOfAddress to the form data
      const profileData = {
        ...data,
        proofOfAddress,
      };

      console.log("Submitting with profile ID:", profileId);
      console.log("Form data:", profileData);

      // Call the server action to update the profile
      const res = await updateIndividualClientProfile(profileId, profileData);
      
      // Update context with the new data
      setIndividualClientData(profileData);
      
      // Check if the update was successful (accepting both 200 and 201)
      if (res?.status === 200 || res?.status === 201) {
        toast.success("Client Profile Updated Successfully");
        // Redirect if a URL is provided
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      } else {
        throw new Error(res?.error || "Something went wrong");
      }
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      toast.error(error.message || "An error occurred while updating the profile");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full bg-gray-50 rounded-lg shadow-md p-6">
      <div className="text-center border-b border-gray-200 pb-4 dark:border-slate-600">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-sky-500 lg:text-5xl mb-2">
          Individual Client Onboarding
        </h1>
      </div>
      <form className="py-6 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 grid-cols-2">
          <TextInput
            label="Full Name"
            register={register}
            name="fullName"
            errors={errors}
            placeholder="Enter your full name"
            className="col-span-full sm:col-span-2"
            required
          />
          
          <TextInput
            label="Email Address"
            register={register}
            name="email"
            type="email"
            errors={errors}
            placeholder="Enter your email address"
            className="col-span-full sm:col-span-1"
            required
          />
          
          <TextInput
            label="Phone Number"
            register={register}
            name="phone"
            errors={errors}
            placeholder="Enter your phone number"
            className="col-span-full sm:col-span-1"
            required
          />
          
          <TextAreaInput
            label="Address"
            register={register}
            name="address"
            errors={errors}
            placeholder="Enter your complete address"
            className="col-span-full"
            required
          />
          
          <TextInput
            label="Next of Kin Name"
            register={register}
            name="nextOfKinName"
            errors={errors}
            placeholder="Enter next of kin's name"
            className="col-span-full sm:col-span-1"
            required
          />
          
          <TextInput
            label="Next of Kin Phone Number"
            register={register}
            name="nextOfKinNumber"
            errors={errors}
            placeholder="Enter next of kin's phone number"
            className="col-span-full sm:col-span-1"
            required
          />
          
          <div className="col-span-full">
            <MultipleFileUpload
              label="Proof of Address (utility bill, bank statement, etc.)"
              files={proofOfAddress as any} // eslint-disable-line @typescript-eslint/no-explicit-any
              setFiles={setProofOfAddress}
              endpoint="clientProofOfAddress"
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            title="Save Profile"
            isLoading={isLoading}
            loadingTitle="Saving please wait..."
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
          />
        </div>
      </form>
    </div>
  );
}