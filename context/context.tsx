"use client";
import {
  BioDataFormProps,
  ContactFormProps,
  RefereeFormProps,
  PracticeFormProps,
  ProfileFormProps,
  additionalFormProps,
  IndividualClientFormProps,
  ClientProfileFormProps,
} from "@/types/types";
// import { DoctorProfile } from "@prisma/client";
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
  indvidualClientProfileId: string;
  setIndvidualClientProfileId: (value: string) => void;
  clientProfileId: string;
  setClientProfileId: (value: string) => void;

  //TRACK THE FORM DATA
  bioData: BioDataFormProps;
  profileData: ProfileFormProps;
  contactData: ContactFormProps;
  refereeData: RefereeFormProps;
  practiceData: PracticeFormProps;
  additionalData: additionalFormProps;
  individualClientData: IndividualClientFormProps;
  ClientData: ClientProfileFormProps;
  savedDBData: any;
  setSavedDBData: (data: any) => void;
  setBioData: (data: BioDataFormProps) => void;
  setProfileData: (data: ProfileFormProps) => void;
  setContactData: (data: ContactFormProps) => void;
  setRefereeData: (data: RefereeFormProps) => void;
  setPracticeData: (data: PracticeFormProps) => void;
  setAdditionalData: (data: additionalFormProps) => void;
  setIndividualClientData: (data: IndividualClientFormProps) => void;
  setClientData: (data: ClientProfileFormProps) => void;
}

const initialIndividualClientData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",

  nextOfKinName: "",
  nextOfKinNumber: "",

  proofOfAddress: [],
  userId: "",
  trackingNumber: "",
};
const initialClientData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  companyNumber: "",
  cqcNumber: "",
  organisationType: "",

  companyLogo: "",
  bio: "",

  employersLiability: [],
  userId: "",
  trackingNumber: "",
};
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
const initialContextData: IOnBoardingContextData = {
  setTruckingNumber: () => {},
  setDoctorProfileId: () => {},
  setIndvidualClientProfileId: () => {},
  setClientProfileId: () => {},
  setBioData: () => {},
  setProfileData: () => {},
  setContactData: () => {},
  setRefereeData: () => {},
  setPracticeData: () => {},
  setAdditionalData: () => {},
  setIndividualClientData: () => {},
  setClientData: () => {},
  savedDBData: {},
  setSavedDBData: () => {},
  truckingNumber: "",
  doctorProfileId: "",
  clientProfileId: "",
  indvidualClientProfileId: "",
  bioData: initialBioData,
  profileData: initialProfileData,
  contactData: initialContactData,
  refereeData: initialRefereeData,
  practiceData: initialPracticeData,
  additionalData: initialAdditionalData,
  individualClientData: initialIndividualClientData,
  ClientData: initialClientData,
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
  const [indvidualClientProfileId, setIndvidualClientProfileId] = useState<string>("");
  const [clientProfileId, setClientProfileId] = useState<string>("");
  const [bioData, setBioData] = useState<BioDataFormProps>(initialBioData);
  const [individualClientData, setIndividualClientData] =
    useState<IndividualClientFormProps>(initialIndividualClientData);
  const [ClientData, setClientData] =
    useState<ClientProfileFormProps>(initialClientData);
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
  
  const contextValues: IOnBoardingContextData = {
    truckingNumber,
    setTruckingNumber,
    doctorProfileId,
    setDoctorProfileId,
    indvidualClientProfileId,
    setIndvidualClientProfileId,
    clientProfileId,
    setClientProfileId,
    bioData,
    setBioData,
    profileData,
    setProfileData,
    contactData,
    setContactData,
    refereeData,
    setRefereeData,
    practiceData,
    setPracticeData,
    additionalData,
    setAdditionalData,
    individualClientData,
    setIndividualClientData,
    ClientData,
    setClientData,
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