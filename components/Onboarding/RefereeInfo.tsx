"use client";
import { RefereeFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import ArrayItemsInput from "../FormInputs/ArrayInput";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";

export default function RefereeInfo({
  page,
  title,
  description,
  nextPage,
  doctorProfile,
}: StepFormProps) {
  const {  savedDBData, setRefereeData } = useOnboardingContext(); 
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const initialSpecialities =
    doctorProfile.otherSpecialties?.length > 0
      ? doctorProfile.otherSpecialties
      : savedDBData.otherSpecialties || [];
  const [otherSpecialties, setOtherSpecialties] = useState(initialSpecialities);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RefereeFormProps>({
    defaultValues: {
      refereeName: doctorProfile.refereeName || savedDBData.refereeName || "",
      refereeNumber: doctorProfile.refereeNumber || savedDBData.refereeNumber || "",
      refereeEmail: doctorProfile.refereeEmail || savedDBData.refereeEmail || "",
      page: doctorProfile.page || savedDBData.page || "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: RefereeFormProps) {
    setIsLoading(true);
    try {
      const updatedData = {
        ...data,
        page,
        otherSpecialties,
      };
      console.log(updatedData);
      const res = await updateDoctorProfile(doctorProfile.id, updatedData);
      setRefereeData(updatedData);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Referee Info Updated Successfully");
        router.push(`${pathname}?page=${nextPage}`);
        console.log(res.data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) { // eslint-disable-line
      setIsLoading(false);
      toast.error("An error occurred while updating the referee info");
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
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            label="Referee Name"
            register={register}
            name="refereeName"
            errors={errors}
            placeholder="Enter your Referee Name"
          />
          <TextInput
            label="Referee Phone Number"
            register={register}
            type="tel"
            name="refereeNumber"
            errors={errors}
            placeholder="Enter your Referee Phone Number"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Referee Email"
            register={register}
            type="email"
            name="refereeEmail"
            errors={errors}
            placeholder="Enter your Referee Email"
            className="col-span-full sm:col-span-1"
          />
          <ArrayItemsInput
            setItems={setOtherSpecialties}
            items={otherSpecialties}
            itemTitle="Add Other Specialties"
          />
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