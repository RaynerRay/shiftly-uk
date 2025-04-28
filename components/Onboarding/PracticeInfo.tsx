"use client";
import { PracticeFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
// import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import ArrayItemsInput from "../FormInputs/ArrayInput";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";
import { hourlyRates } from "@/lib/constants";

export default function PracticeInfo({
  page,
  title,
  description,
  specialties,
  formId,
  userId,
  nextPage,
  doctorProfile,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { savedDBData, setPracticeData } = useOnboardingContext();
  const pathname = usePathname();
  console.log(` new specialty ${specialties}`);

  const initialSpecialities =
    doctorProfile.otherSpecialties.length > 0
      ? doctorProfile.otherSpecialties
      : savedDBData.otherSpecialties;
  const [otherSpecialties, setOtherSpecialties] = useState(initialSpecialities);

  const initialServices =
    doctorProfile.servicesOffered.length > 0
      ? doctorProfile.servicesOffered
      : savedDBData.servicesOffered;
  const [services] = useState(initialServices);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
    watch,
  } = useForm<PracticeFormProps>({
    defaultValues: {
      page: doctorProfile.page || savedDBData.page,
      hourlyWage: doctorProfile.hourlyWage?.toString() || savedDBData.hourlyWage?.toString() || "",
      deductTaxBeforePayment: doctorProfile.deductTaxBeforePayment !== undefined 
        ? doctorProfile.deductTaxBeforePayment 
        : savedDBData.deductTaxBeforePayment !== undefined 
          ? savedDBData.deductTaxBeforePayment 
          : true,
    },
  });
  
  const selectedHourlyWage = watch("hourlyWage");
  
  const router = useRouter();
  
  async function onSubmit(data: PracticeFormProps) {
    data.page = page;
    data.otherSpecialties = otherSpecialties;
    data.servicesOffered = services;
    data.hourlyWage = Number(data.hourlyWage);
    
    // Convert string representation to boolean
    // The `as unknown as string` cast first treats the value as unknown, then as string
    // This avoids the TypeScript error while still performing the conversion
    const taxValue = data.deductTaxBeforePayment as unknown as string;
    data.deductTaxBeforePayment = taxValue === "true";
    
    console.log(userId, formId);
    console.log(data);
    setIsLoading(true);
    try {
      const res = await updateDoctorProfile(doctorProfile.id, data);
      setPracticeData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Practice Info Updated Successfully");
        router.push(`${pathname}?page=${nextPage}`);
        console.log(res.data);
      } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) { 
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4 dark:border-slate-600">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
  {/* Professional Role Selector */}
  <div>
    <label htmlFor="hourlyWage" className="block text-sm font-medium text-gray-700 mb-2">
      Your Professional Role
    </label>
    <select
      id="hourlyWage"
      {...register("hourlyWage", { required: "Please select your professional role" })}
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
    >
      <option value="">Select your role and experience level</option>
      {hourlyRates.map((option, index) => (
        <option key={index} value={option.rate.toString()}>
          {option.profession}
        </option>
      ))}
    </select>
    {errors.hourlyWage && (
      <p className="text-red-500 text-sm mt-1">{errors.hourlyWage.message}</p>
    )}
    {selectedHourlyWage && (
      <p className="text-sm text-gray-500 mt-2">
        {/* Hourly rate: <span className="font-medium text-sky-600">£{selectedHourlyWage}/hr</span> */}
      </p>
    )}
  </div>

  {/* Tax Preference Section - Full Width */}
  <div className="col-span-full">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Tax Management Preference
    </label>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="inline-flex items-center">
        <input
          type="radio"
          id="deductTax-yes"
          value="true"
          {...register("deductTaxBeforePayment")}
          className="h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500"
          defaultChecked
        />
        <span className="ml-2 text-sm text-gray-700">Let us handle your tax before payment</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          id="deductTax-no"
          value="false"
          {...register("deductTaxBeforePayment")}
          className="h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500"
        />
        <span className="ml-2 text-sm text-gray-700">I will handle my own taxes</span>
      </label>
    </div>
    <p className="text-sm text-gray-500 mt-2">
      Choose whether you would like taxes automatically deducted or prefer to manage them yourself.
    </p>
  </div>

  {/* Other Specialties Input - Full Width */}
  <div className="col-span-full">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Other Specialties
    </label>
    <ArrayItemsInput
      setItems={setOtherSpecialties}
      items={otherSpecialties}
      itemTitle="Other Specialties"
    />
  </div>
</div>

        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            title="Save and Continue"
            isLoading={isLoading}
            loadingTitle="Saving please wait..."
          />
        </div>
      </form>
    </div>
  );
}