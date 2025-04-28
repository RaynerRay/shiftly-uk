import React from 'react';
import { getAppointmentByPatientId } from "@/actions/appointments";
import { getDoctorById, getDoctorProfile } from "@/actions/users";
import DoctorDetails from "@/components/DoctorDetails";
import { authOptions } from "@/lib/auth";
import { cn, separateAndCapitalise, separateByUnderScore } from "@/lib/utils";
import { Appointment } from "@prisma/client";
import { Check, RefreshCcw, MapPin, User, Stethoscope, ScrollText } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function DoctorProfilePage(props: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Extract parameters from props and await them
  // const resolvedParams = await props.params;
  // const slug = resolvedParams?.slug;
  
  const resolvedSearchParams = await props.searchParams;
  const searchParams = resolvedSearchParams || {};
  const id = searchParams.id as string | undefined;

  // Fetch data
  const session = await getServerSession(authOptions);
  const doctor = (await getDoctorById(id as string)) || null;
  const user = session?.user;
  const appointment = await getAppointmentByPatientId(user?.id ?? "");
  const doctorProfile = await getDoctorProfile((id as string) ?? "");
  const status = doctorProfile?.status ?? "PENDING";

  // Handle case when doctor not found
  if (!doctor || !doctor.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            No Details Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            The doctor profile you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
          {/* Hero Section */}
          <div className="relative">
            <div className="h-8" />
            <div className="px-6 sm:px-10 pb-12">
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-end md:space-x-8">
                  
                  {/* Profile Image */}
                  <div className="flex-shrink-0 mb-6 md:mb-0">
                    <Image
                      src={doctor.doctorProfile?.profilePicture ?? "/doc-profile.jpeg"}
                      width={243}
                      height={207}
                      alt={`${doctor.doctorProfile?.firstName} ${doctor.doctorProfile?.lastName}`}
                      className="w-40 h-40 rounded-2xl mt-4 object-cover shadow-lg border-4 border-white dark:border-slate-800"
                    />
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex gap-4">
                      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        {doctor.doctorProfile?.firstName} {doctor.doctorProfile?.lastName}
                      </h1>
                      <button
                        className={cn(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm",
                          status === "APPROVED"
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-orange-400 text-white hover:bg-orange-500"
                        )}
                      >
                        {status === "APPROVED" ? (
                          <Check className="w-3 h-3 mr-1" />
                        ) : (
                          <RefreshCcw className="w-3 h-3 mr-1" />
                        )}
                        <span>{status === "APPROVED" ? "Verified" : "Verification Pending"}</span>
                      </button>
                    </div>

                    {/* Professional Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center text-slate-700 dark:text-slate-300">
                        <Stethoscope className="w-5 h-5 mr-2" />
                        <span className="font-medium uppercase">
                          {separateAndCapitalise(doctor.doctorProfile?.profession ?? "")}
                        </span>
                      </div>
                      <div className="flex items-center text-slate-700 dark:text-slate-300">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className='uppercase'>{doctor.doctorProfile?.city}</span>
                      </div>
                      <div className="flex items-center text-slate-700 dark:text-slate-300">
                        <User className="w-5 h-5 mr-2" />
                        <span className='uppercase'>{doctor.doctorProfile?.gender}</span>
                      </div>
                    </div>
                    
                    <div className="">
                      <div className="flex items-center text-slate-700 dark:text-slate-300">
                        <ScrollText className="w-8 h-8 mr-2" />
                        <span className="ml-2">{doctor.doctorProfile?.bio}</span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="pt-4">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-3">
                        Specialisations
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.doctorProfile?.otherSpecialties?.map((specialty, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-sm bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-slate-700"
                          >
                            {separateByUnderScore(specialty)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Details Section */}
          <div className="px-6 sm:px-10 pb-12">
            <DoctorDetails
              appointment={appointment as Appointment | null}
              doctor={doctor}
              doctorProfile={doctorProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}