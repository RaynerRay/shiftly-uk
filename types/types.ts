// import { FileProps } from "@/components/FormInputs/MultipleFileUpload";
import { AppointmentStatus, DoctorStatus, PaymentStatus } from "@prisma/client";

export type ServiceProps = { title: string; imageUrl: string; slug: string };

export type RegisterInputProps = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: any;
  plan: any;
};
export type LoginInputProps = {
  email: string;
  password: string;
};

export interface ClientProfileFormProps {
  name: string;
  companyNumber?: string | null;
  cqcNumber?: string | null;
  organisationType?: string | null;
  companyLogo?: string | null;
  bio?: string | null;
  email?: string | null;
  website?: string | null;
  phone?: string | null;
  city?: string | null;
  address?: string | null;
  employersLiability?: string[];
  userId: string;
}

export interface IndividualClientFormProps {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  nextOfKinName: string;
  nextOfKinNumber: string;
  proofOfAddress?: string[];
  userId: string;
}




export type BioDataFormProps = {
  firstName: string;
  lastName: string;
  middleName: any;
  dob: any;
  gender: string;
  page: string;
  userId: string;
  trackingNumber: string;
};
export type ProfileFormProps = {
  profilePicture: string;
  bio: string;
  page: string;
  profession: string;
  // primarySpecialization: string;
  otherSpecialties: string[];
  medicalLicense: string;
  medicalLicenseExpiry: any;
  yearsOfExperience: number;
  

};
export type ContactFormProps = {
  email: string;
  phone: string;
  // country: string;
  city: string;
  address: string;
  page: string;
};
export type RefereeFormProps = {
  refereeName: string;
  refereeNumber: string;
  refereeEmail: string;
  page: string;
};
export type PracticeFormProps = {
  // hospitalName: string;
  // hospitalAddress: string;
  // hospitalContactNumber: string;
  // hospitalEmailAddress: string;
  // primarySpecialization: string;
  otherSpecialties: string[];
  servicesOffered: string[];
  // insuranceAccepted: string;
  hourlyWage: number;
  deductTaxBeforePayment?: boolean
  // languagesSpoken: string[];
  page: string;
};
export type additionalFormProps = {
  // educationHistory: string;
  // research: string;
  accomplishments: string;
  additionalDocs: any;
  page: string;
};
export type stats = {
  doctors: string;
  patients: string;
  appointments: string;
  services: string;
};

export type DoctorProfileAvailability = {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

export interface DoctorProfile {
  
  firstName: string;
  lastName: string;
  gender: string | null;
  profession: string | null;
  bio: string | null;
  profilePicture: string | null;
  hourlyWage: number;
  availability: DoctorProfileAvailability | null;
}
interface DoctorProfileDetail extends DoctorProfile {
  id: string | null;
  yearsOfExperience: number | null;
  // country: string | null;
  city: string | null;
  address: string | null;
  dob: Date;
  middleName: string | null;
  // primarySpecialization: string | null;
  otherSpecialties: string[] | null;
  profession: string | null;
  refereeName: string | null;
  refereeNumber: string | null;
  refereeEmail: string | null;
  servicesOffered: string[] | null;
  insuranceAccepted: string | null;
  educationHistory: string | null;
  research: string | null;
  accomplishments: string | null;
  status: DoctorStatus;
  deductTaxBeforePayment: Boolean;   
  band:            String
}
export type InboxProps = {
  recieverId: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
};

export type Doctor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  slug: string;
  doctorProfile: DoctorProfile | null;
};
export type DoctorDetail = {
  id: string;
  name: string;
  email: string;
  phone: string;
  slug: string;
  doctorProfile: DoctorProfileDetail | null;
};

export interface AppointmentProps {
  appointmentDate: Date | undefined;
  appointmentFormattedDate: string;
  doctorId: string;
  doctorName: string;
  companyName: string | null;

  isCompleted?: boolean;

  appointmentTime: string; // Now stores multiple times as comma-separated string
  reference?: string;
  paymentStatus?: PaymentStatus;
  paymentMethod?: string;
  

  charge: number;
  // Patient details
  firstName: string;
  lastName: string;
  gender: string | null;
  phone: string;
  email: string;
  // companyName: string;
  // dob?: Date;
  location: string;
  appointmentReason: string;
  // medicalDocuments: string[];
  // occupation: string;
  patientId: string;
  status: AppointmentStatus;
  meetingLink: string;
  meetingProvider: string;
  totalHours: number;
}

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  slug: string;
  categories: string[];
  lastUpdated: string;
}

