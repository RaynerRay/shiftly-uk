"use client";
import {
  BioDataFormProps,
  ContactFormProps,
  RefereeFormProps,
  PracticeFormProps,
  ProfileFormProps,
  additionalFormProps,
} from "@/types/types";
import { DoctorProfile } from "@prisma/client";
//context => useState ta global level

import { ReactNode, createContext, useContext, useState } from "react";

//Steps for Creating Context API
//CREATING AD EXPORT THE CONTEXT
//1) Define the shape of the data you want to track
//2)Define the initial data
//3) create and export the context
//4)add the types to the Context and initialData

// Use the Created Context to CREATE AND EXPORT CONTEXT PROVIDER

//CREATE AND EXPORT USECONTEXT HOOK

//WRAP THE ENTIRE APP WITH THE PROVIDER

interface IOnBoardingContextData {
  truckingNumber: string;
  setTruckingNumber: (value: string) => void;
  setDoctorProfileId: (value: string) => void;
  doctorProfileId: string;

  //TRACK THE FORM DATA
  bioData: BioDataFormProps;
  profileData: ProfileFormProps;
  contactData: ContactFormProps;
  refereeData: RefereeFormProps;
  practiceData: PracticeFormProps;
  additionalData: additionalFormProps;
  savedDBData: any;
  setSavedDBData: (data: any) => void;
  setBioData: (data: BioDataFormProps) => void;
  setProfileData: (data: ProfileFormProps) => void;
  setContactData: (data: ContactFormProps) => void;
  setRefereeData: (data: RefereeFormProps) => void;
  setPracticeData: (data: PracticeFormProps) => void;
  setAdditionalData: (data: additionalFormProps) => void;
}

const initialBioData = {
  firstName: "",
  lastName: "",
  middleName: "",
  dob: "",
  gender: "",
  page: "",
  userId: "",
  trackingNumber: "",
};
const initialProfileData = {
  profilePicture: "",
  bio: "",
  page: "",
  profession: "",
  medicalLicense: "",
  medicalLicenseExpiry: "",
  yearsOfExperience: 0,
  // primarySpecialization: "",
  otherSpecialties: [],
  
};
const initialContactData: ContactFormProps = {
  email: "",
  phone: "",
  address: "",
  // country: "",
  city: "",
  // state: "",
  page: "",
};
const initialRefereeData: RefereeFormProps = {
  refereeName: "",
  refereeNumber: "",
  refereeEmail: "",
  page: "",
};
const initialPracticeData: PracticeFormProps = {
  // hospitalName: "",
  // hospitalAddress: "",
  // hospitalContactNumber: "",
  // hospitalEmailAddress: "",
  // primarySpecialization: "",
  otherSpecialties: [],
  servicesOffered: [],
  // insuranceAccepted: "",
  page: "",
  hourlyWage: 100,
};
const initialAdditionalData: additionalFormProps = {
  // educationHistory: "",
  // research: "",
  accomplishments: "",
  additionalDocs: [],
  page: "",
};
const initialContextData = {
  setTruckingNumber: () => {},
  setDoctorProfileId: () => {},
  setBioData: () => {},
  setProfileData: () => {},
  setContactData: () => {},
  setRefereeData: () => {},
  setPracticeData: () => {},
  setAdditionalData: () => {},
  savedDBData: {},
  setSavedDBData: () => {},
  truckingNumber: "",
  doctorProfileId: "",
  bioData: initialBioData,
  profileData: initialProfileData,
  contactData: initialContactData,
  refereeData: initialRefereeData,
  practiceData: initialPracticeData,
  additionalData: initialAdditionalData,
};

const OnBoardingContext =
  createContext<IOnBoardingContextData>(initialContextData);

export function OnboardingContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [truckingNumber, setTruckingNumber] = useState<string>("");
  const [doctorProfileId, setDoctorProfileId] = useState<string>("");
  const [bioData, setBioData] = useState<BioDataFormProps>(initialBioData);
  const [profileData, setProfileData] =
    useState<ProfileFormProps>(initialProfileData);
  const [contactData, setContactData] =
    useState<ContactFormProps>(initialContactData);
  const [refereeData, setRefereeData] =
    useState<RefereeFormProps>(initialRefereeData);
  const [practiceData, setPracticeData] =
    useState<PracticeFormProps>(initialPracticeData);
  const [additionalData, setAdditionalData] = useState<additionalFormProps>(
    initialAdditionalData
  );
  const [savedDBData, setSavedDBData] = useState<any>({});
  console.log(savedDBData);
  const contextValues = {
    truckingNumber,
    setTruckingNumber,
    doctorProfileId,
    setDoctorProfileId,
    bioData,
    setBioData,
    setProfileData,
    profileData,
    contactData,
    refereeData,
    practiceData,
    additionalData,
    setContactData,
    setRefereeData,
    setPracticeData,
    setAdditionalData,
    savedDBData,
    setSavedDBData,
  };

  return (
    <OnBoardingContext.Provider value={contextValues}>
      {children}
    </OnBoardingContext.Provider>
  );
}

export function useOnboardingContext() {
  return useContext(OnBoardingContext);
}
export default OnBoardingContext;
