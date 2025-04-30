"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { TextAreaInput } from "../FormInputs/TextAreaInput";
import SelectInput from "../FormInputs/SelectInput";
import { useOnboardingContext } from "@/context/context";
import MultipleFileUpload from "../FormInputs/MultipleFileUpload";
import { ClientProfileFormProps } from "@/types/types";
import { createClientProfile, getClientProfileById } from "@/actions/clientonboarding";
import ImageInput from "../FormInputs/ImageInput";
import { ClientProfile } from '@prisma/client';

// Organization type options
const organisationTypes = [
  { value: "NHS", label: "NHS" },
  { value: "Private Hospital", label: "Private Hospital" },
  { value: "Clinic", label: "Clinic" },
  { value: "Care Home", label: "Care Home" },
  { value: "Agency", label: "Agency" },
  { value: "Other", label: "Other" }
];

type ClientProfileOnboardingFormProps = {
  clientProfile: Partial<ClientProfile> & {
    employersLiability?: string[];
    companyLogo?: string;
  };
  userId?: string; // Add explicit userId prop
  redirectUrl?: string;
};

export default function ClientProfileOnboardingForm({
  clientProfile,
  userId: passedUserId, // Accept userId directly from props
  redirectUrl = "/dashboard/clients",
}: ClientProfileOnboardingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { savedDBData, setClientData } = useOnboardingContext();
  const router = useRouter();

  // Use the passed userId if available, otherwise fall back to the context
  const userId = passedUserId || savedDBData.userId || "";

  // State for file uploads
  const [companyLogo, setCompanyLogo] = useState<string>(
    clientProfile.companyLogo || savedDBData.companyLogo || ""
  );
  
  const [employersLiability, setEmployersLiability] = useState<string[]>(
    clientProfile.employersLiability || savedDBData.employersLiability || []
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientProfileFormProps>({
    defaultValues: {
      name: clientProfile.name || savedDBData.name || "",
      companyNumber: clientProfile.companyNumber || savedDBData.companyNumber || "",
      cqcNumber: clientProfile.cqcNumber || savedDBData.cqcNumber || "",
      organisationType: clientProfile.organisationType || savedDBData.organisationType || "",
      bio: clientProfile.bio || savedDBData.bio || "",
      email: clientProfile.email || savedDBData.email || "",
      website: clientProfile.website || savedDBData.website || "",
      phone: clientProfile.phone || savedDBData.phone || "",
      city: clientProfile.city || savedDBData.city || "",
      address: clientProfile.address || savedDBData.address || "",
    },
  });

  // Fetch the latest profile data when component mounts or userId changes
  useEffect(() => {
    const fetchClientProfile = async () => {
      if (userId) {
        try {
          console.log("Fetching profile for userId:", userId);
          const response = await getClientProfileById(userId);
          
          if (response?.status === 200 && response.data) {
            console.log("Profile data fetched:", response.data);
            // Update the form with the latest data
            reset({
              name: response.data.name || "",
              companyNumber: response.data.companyNumber || "",
              cqcNumber: response.data.cqcNumber || "",
              organisationType: response.data.organisationType || "",
              bio: response.data.bio || "",
              email: response.data.email || "",
              website: response.data.website || "",
              phone: response.data.phone || "",
              city: response.data.city || "",
              address: response.data.address || "",
            });
            
            // Update file states
            if (response.data.companyLogo) {
              setCompanyLogo(response.data.companyLogo);
            }
            if (response.data.employersLiability) {
              setEmployersLiability(response.data.employersLiability);
            }
            
            // Update the context
            setClientData({
              ...savedDBData,
              ...response.data,
              userId
            });
          }
        } catch (error) {
          console.error("Error fetching client profile:", error);
        }
      }
    };

    fetchClientProfile();
  }, [userId, reset, setClientData, savedDBData]);

  async function onSubmit(data: ClientProfileFormProps) {
    setIsLoading(true);

    try {
      if (!userId) {
        toast.error("User ID is required. Please login again.");
        setIsLoading(false);
        return;
      }

      const profileData = {
        ...data,
        companyLogo,
        employersLiability,
        userId,
      };

      console.log("Submitting profile data:", profileData);
      const res = await createClientProfile(profileData);
      
      if (res?.status === 201) {
        // Update context with new data
        setClientData({
          ...savedDBData,
          ...profileData
        });
        
        setIsLoading(false);
        toast.success("Client Profile Updated Successfully");
        
        // Wait for the toast to be visible before redirecting
        setTimeout(() => {
          if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            // Refresh the current page to show updated data
            router.refresh();
          }
        }, 1500);
      } else {
        setIsLoading(false);
        throw new Error(res?.error || "Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred while updating the profile");
      console.error(error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center border-b border-gray-200 pb-6 dark:border-gray-700 mb-8">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3 text-gray-900 dark:text-white">
            {clientProfile.id ? "Update Client Profile" : "Client Registration"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {clientProfile.id 
              ? "Update your client information below"
              : "Please provide your client information to register with us"
            }
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 grid-cols-2">
              <div className="col-span-full">
                <TextInput
                  label="Company/Organisation Name"
                  register={register}
                  name="name"
                  errors={errors}
                  placeholder="Enter your organisation name"
                  className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              
                />
              </div>

              <div className="col-span-full sm:col-span-1">
                <SelectInput
                  label="Organisation Type"
                  name="organisationType"
                  register={register}
                  options={organisationTypes}
                  className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="col-span-full sm:col-span-1">
                <TextInput
                  label="Company Number"
                  register={register}
                  name="companyNumber"
                  errors={errors}
                  placeholder="Enter your company number (if applicable)"
                  className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="col-span-full sm:col-span-1">
                <TextInput
                  label="CQC Number"
                  register={register}
                  name="cqcNumber"
                  errors={errors}
                  placeholder="Enter your CQC number (if applicable)"
                  className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="col-span-full sm:col-span-1">
                <TextInput
                  label="Email Address"
                  register={register}
                  name="email"
                  type="email"
                  errors={errors}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              
                />
              </div>

              <div className="col-span-full sm:col-span-1">
                <TextInput
                  label="Phone Number"
                  register={register}
                  name="phone"
                  errors={errors}
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              
                />
              </div>

              <div className="col-span-full sm:col-span-1">
                <TextInput
                  label="Website"
                  register={register}
                  name="website"
                  errors={errors}
                  placeholder="Enter your website URL (if applicable)"
                  className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="col-span-full sm:col-span-1">
                <TextInput
                  label="City"
                  register={register}
                  name="city"
                  errors={errors}
                  placeholder="Enter your city"
                  className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="col-span-full">
                <TextAreaInput
                  label="Address"
                  register={register}
                  name="address"
                  errors={errors}
                  placeholder="Enter your complete address"
                  className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="col-span-full">
                <TextAreaInput
                  label="About the Organisation"
                  register={register}
                  name="bio"
                  errors={errors}
                  placeholder="Provide a brief description about your organisation"
                  className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="col-span-full sm:col-span-1">
                <ImageInput
                  label="Company Logo (make sure image size is less than 1 mb)"
                  imageUrl={companyLogo}
                  setImageUrl={setCompanyLogo}
                  endpoint="companyLogo"
                  className="w-full"
                />
              </div>

              <div className="col-span-full">
                <MultipleFileUpload
                  label="Employers' Liability Insurance"
                  files={employersLiability as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                  setFiles={setEmployersLiability}
                  endpoint="employersLiability"
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <SubmitButton
                title={clientProfile.id ? "Update Profile" : "Save and Continue"}
                isLoading={isLoading}
                loadingTitle="Saving please wait..."/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}