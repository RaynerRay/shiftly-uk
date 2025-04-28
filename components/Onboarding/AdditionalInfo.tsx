"use client";
import { additionalFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TextAreaInput } from "../FormInputs/TextAreaInput";
import { StepFormProps } from "./BioDataForm";
import MultipleFileUpload, { FileProps } from "../FormInputs/MultipleFileUpload";
import { completeProfile, updateDoctorProfile } from "@/actions/onboarding";
import toast from "react-hot-toast";
import { useOnboardingContext } from "@/context/context";

export default function AdditionalInfo({
  page,
  title,
  description,
  doctorProfile,
}: StepFormProps) {
  const { savedDBData, setAdditionalData } = useOnboardingContext();
  const pathname = usePathname();
  const initialDocs = doctorProfile.additionalDocs.map((item) => {
    return {
      title: item,
      size: 0,
      url: item,
    };
  });
  const isOnboarding = pathname.split("/").includes("onboarding");
  const [isLoading, setIsLoading] = useState(false);
  const [additionalDocs, setAdditionalDocs] = useState<FileProps[]>(initialDocs);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<additionalFormProps>({
    defaultValues: {
      accomplishments: doctorProfile.accomplishments || savedDBData.accomplishments,
      page: doctorProfile.page || savedDBData.page,
    },
  });
  
  const router = useRouter();
  
  async function onSubmit(data: additionalFormProps) {
    data.page = page;
    data.additionalDocs = additionalDocs.map((doc: any) => doc.url); // eslint-disable-line @typescript-eslint/no-explicit-any

    setIsLoading(true);
    try {
      if (isOnboarding) {
        const res = await completeProfile(doctorProfile.id, data);
        setAdditionalData(data);
        if (res?.status === 201) {
          setIsLoading(false);
          toast.success("Profile Completed Successfully");
          router.push("/login");
        } else {
          setIsLoading(false);
          throw new Error("Something went wrong");
        }
      } else {
        const res = await updateDoctorProfile(doctorProfile.id, data);
        setAdditionalData(data);
        if (res?.status === 201) {
          setIsLoading(false);
          toast.success("Profile Updated Successfully");
        } else {
          setIsLoading(false);
          throw new Error("Something went wrong");
        }
      }
    } catch (error) { 
      setIsLoading(false);
      toast.error("Error saving profile information");
      console.log(error);
    }
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <div className="text-center border-b border-gray-200 dark:border-slate-600 py-6 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-t-lg">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight text-blue-900 dark:text-blue-100 lg:text-4xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      
      <form className="py-8 px-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <TextAreaInput
            label="Special Accomplishments or Awards"
            register={register}
            name="accomplishments"
            errors={errors}
            placeholder="Enter any special accomplishments or awards you've received"
            required={false}
          />
          
          <div className="mt-8 space-y-4">
            <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 border-b border-gray-200 dark:border-slate-600 pb-2">
              Required Documents
            </h3>
            
            <div className="grid gap-4 md:grid-cols-1">
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-md dark:bg-blue-900/20 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">Care Workers</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">Upload Training Certificate</p>
              </div>
              
              <div className="p-4 border border-green-200 bg-green-50 rounded-md dark:bg-green-900/20 dark:border-green-800">
                <h4 className="font-medium text-green-900 dark:text-green-300 mb-1">Social Workers</h4>
                <p className="text-sm text-green-700 dark:text-green-400">Upload Social Worker Certificate & DBS</p>
              </div>
              
              <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md dark:bg-yellow-900/20 dark:border-yellow-800">
                <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-1">Nurses</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">Upload Nursing Certificate</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-600">
              <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-500 dark:bg-red-900/20 dark:border-red-800 mb-4">
                <h4 className="font-medium text-red-900 dark:text-red-300 mb-1">Required for All Professionals</h4>
                <p className="text-sm text-red-700 dark:text-red-400">Right To Work & Criminal Record documents</p>
              </div>
              
              <MultipleFileUpload
                label="Upload Required Documents"
                files={additionalDocs as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                setFiles={setAdditionalDocs}
                endpoint="additionalDocs"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            title={isOnboarding ? "Complete Profile" : "Save Changes"}
            isLoading={isLoading}
            loadingTitle="Saving please wait..."
          />
        </div>
      </form>
    </div>
  );
}