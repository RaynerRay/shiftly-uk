"use client";

import { ProfileFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { TextAreaInput } from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import { StepFormProps } from "./BioDataForm";
import { useOnboardingContext } from "@/context/context";
import { updateDoctorProfile } from "@/actions/onboarding";
import { specialisations } from './../../lib/specialisations';
import SelectInput from "../FormInputs/SelectInput";

// Define the type for profession keys
type ProfessionKey = "nurse" | "careWorker" | "adultSocialWorker" | "childrenSocialWorker";

// Define the type for specialization options
type SpecializationOption = { value: string; label: string };

export default function ProfileInfoForm({
  page,
  title,
  description,
  nextPage,
  doctorProfile,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const {  savedDBData, setProfileData } = useOnboardingContext(); 

  // const initialSpecialities =
  //   doctorProfile.otherSpecialties.length > 0
  //     ? doctorProfile.otherSpecialties
  //     : savedDBData.otherSpecialties;
  // const [otherSpecialties, setOtherSpecialties] = useState(initialSpecialities); // eslint-disable-line @typescript-eslint/no-explicit-any

  const initialProfileImage =
    doctorProfile.profilePicture || savedDBData.profilePicture;
  const [profileImage, setProfileImage] = useState(initialProfileImage);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormProps>({
    defaultValues: {
      bio: doctorProfile.bio || savedDBData.bio,
      // primarySpecialization:
      //   doctorProfile.primarySpecialization ||
      //   savedDBData.primarySpecialization,
      profession: doctorProfile.profession || savedDBData.profession,
      page: doctorProfile.page || savedDBData.page,
      yearsOfExperience:
        doctorProfile.yearsOfExperience || savedDBData.yearsOfExperience,
    },
  });

  // Watch the profession field
  const profession = watch("profession");

  // Set specialization options based on selected profession
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);

  useEffect(() => {
    // Clear selected specializations when profession changes
    setSelectedSpecializations([]);
  }, [profession]);

  const router = useRouter();

  async function onSubmit(data: ProfileFormProps) {
    setIsLoading(true);

    data.page = page;
    data.yearsOfExperience = Number(data.yearsOfExperience);
    data.profilePicture = profileImage;

    try {
      const res = await updateDoctorProfile(doctorProfile.id, {
        ...data,
        otherSpecialties: selectedSpecializations,
      });
      setProfileData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Profile Info Updated Successfully");
        router.push(`${pathname}?page=${nextPage}`);
      } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred while updating the profile");
      console.log(error)
    }
  }

  const professions = [
    { value: "careWorker", label: "Care Worker" },
    { value: "nurse", label: "Nurse" },
    { value: "adultSocialWorker", label: "Adult Social Worker" },
    { value: "childrenSocialWorker", label: "Chidren Social Worker" },
  ];

  const handleSpecializationChange = (value: string) => {
    if (selectedSpecializations.includes(value)) {
      // Remove the specialization if it's already selected
      setSelectedSpecializations((prev) =>
        prev.filter((specialization) => specialization !== value)
      );
    } else {
      // Add the specialization if it's not selected
      setSelectedSpecializations((prev) => [...prev, value]);
    }
  };

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
          <SelectInput
            options={professions}
            label="Select Your Profession"
            name="profession"
            className="col-span-full sm:col-span-1"
            register={register}
          />
          <TextInput
            label="Years of Experience"
            register={register}
            name="yearsOfExperience"
            type="number"
            errors={errors}
            placeholder="Enter Years of Experience"
            className="col-span-full sm:col-span-1"
          />
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">
              Select Your Specialisations
            </label>
            <div className="mt-2 space-y-2 grid grid-cols-2">
              {profession && (profession as ProfessionKey) in specialisations ? (
                specialisations[profession as ProfessionKey].map(
                  (specialization: SpecializationOption) => (
                    <div key={specialization.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={specialization.value}
                        value={specialization.value}
                        checked={selectedSpecializations.includes(
                          specialization.value
                        )}
                        onChange={() =>
                          handleSpecializationChange(specialization.value)
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={specialization.value}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {specialization.label}
                      </label>
                    </div>
                  )
                )
              ) : (
                <p>Please select a profession to see specialisations</p>
              )}
            </div>
          </div>
          <TextAreaInput
            label="Enter your Biography"
            register={register}
            name="bio"
            errors={errors}
            placeholder="Enter your Biography"
          />
          <ImageInput
            label="Professional Profile Image (make sure image size is less than 1 mb)"
            imageUrl={profileImage}
            setImageUrl={setProfileImage}
            endpoint="doctorProfileImage"
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
