import { getDoctorAppointments } from "@/actions/appointments";
import { getDoctorById, getDoctorProfile } from "@/actions/users";
import { FaRegFilePdf } from "react-icons/fa";
import ApproveBtn from "@/components/Dashboard/ApproveBtn"; // Uncomment this line
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getNormalDate } from "@/utils/getNormalDate";
import {
  AlertTriangle,
  History,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import SubHeading from "@/components/SubHeading";

export default async function DoctorDetailsPage(props: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Await params before using it
  const { id } = await props.params;
  
  const appointments = (await getDoctorAppointments(id)).data || [];
  const doctor = await getDoctorById(id);
  const doctorProfile = await getDoctorProfile(id);
  const status = doctorProfile?.status ?? "PENDING"; // Uncomment this line
  const dob = doctorProfile?.dob ?? "1992-05-13T21:00:00.000Z";
  const expiry =
    doctorProfile?.medicalLicenseExpiry ?? "1992-05-13T21:00:00.000Z";
  
  if (!doctorProfile) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="space-y-3 text-center flex items-center justify-center flex-col">
          <AlertTriangle className="w-10 h-10 " />
          <h2>No Profile Found</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg space-y-6">
  {/* Header Section */}
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-800">
        {doctor?.name}
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        {doctor?.email} &bull; {doctor?.phone}
      </p>
    </div>
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <ApproveBtn status={status} profileId={doctorProfile?.id ?? ""} />
      <span className="text-sm text-slate-600">
        Appointments <span className="font-semibold">({appointments.length.toString().padStart(2, "0")})</span>
      </span>
    </div>
  </div>

  {/* Tabs Section */}
  <Tabs defaultValue="details" className="w-full">
    <TabsList className="flex flex-wrap justify-start gap-2 border-b pb-2">
      <TabsTrigger value="details">Professional Details</TabsTrigger>
      <TabsTrigger value="education">Education Info</TabsTrigger>
      <TabsTrigger value="practice">Practice Info</TabsTrigger>
      <TabsTrigger value="additional">Additional Info</TabsTrigger>
      <TabsTrigger value="appointments">Appointments</TabsTrigger>
    </TabsList>

    {/* Details Tab */}
    <TabsContent value="details" className="space-y-8">
      {/* Bio Data */}
      <div>
        <SubHeading title="Bio Data" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "First Name", value: doctorProfile?.firstName },
            { label: "Last Name", value: doctorProfile?.lastName },
            { label: "Date of Birth", value: getNormalDate(dob as string) },
            { label: "Middle Name", value: doctorProfile?.middleName },
            { label: "Gender", value: doctorProfile?.gender },
          ].map(({ label, value }, idx) => (
            <div key={idx} className="flex flex-col text-slate-700">
              <span className="text-sm font-medium">{label}</span>
              <span className="text-base">{value || "-"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Information */}
      <div>
        <SubHeading title="Profile Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col text-slate-700">
            <span className="text-sm font-medium">Medical License</span>
            <span className="text-base">{doctorProfile?.medicalLicense || "-"}</span>
          </div>
          <div className="flex flex-col text-slate-700">
            <span className="text-sm font-medium">Years of Experience</span>
            <span className="text-base">{doctorProfile?.yearsOfExperience || "-"}</span>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex flex-col text-slate-700">
            <span className="text-sm font-medium">Medical License Expiry</span>
            <span className="text-base">{getNormalDate(expiry as string) || "-"}</span>
          </div>
          <p className="text-slate-600">{doctorProfile?.bio}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <SubHeading title="Contact Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Email Address", value: doctorProfile?.email },
            { label: "Phone", value: doctorProfile?.phone },
            { label: "City", value: doctorProfile?.city },
            { label: "State", value: doctorProfile?.state },
          ].map(({ label, value }, idx) => (
            <div key={idx} className="flex flex-col text-slate-700">
              <span className="text-sm font-medium">{label}</span>
              <span className="text-base">{value || "-"}</span>
            </div>
          ))}
        </div>
      </div>
    </TabsContent>

    {/* Education Tab */}
    <TabsContent value="education" className="space-y-8">
      <div>
        <SubHeading title="Education Information" />
        {doctorProfile?.otherSpecialties?.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700">Other Specialties</h3>
            <div className="flex flex-wrap gap-3">
              {doctorProfile.otherSpecialties.map((item, i) => (
                <p key={i} className="px-4 py-2 bg-slate-100 rounded-lg text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}
        {doctorProfile?.boardCertificates?.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700">Documents</h3>
            <div className="flex flex-wrap gap-3">
              {doctorProfile.boardCertificates.map((item, i) => (
                <Link
                  key={i}
                  href={item}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition text-slate-700"
                >
                  <FaRegFilePdf className="w-4 h-4" /> {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </TabsContent>

    {/* Practice Tab */}
    <TabsContent value="practice" className="space-y-8">
      <div>
        <SubHeading title="Practice Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col text-slate-700">
            <span className="text-sm font-medium">Hourly Charge</span>
            <span className="text-base">{doctorProfile?.hourlyWage || "-"}</span>
          </div>
        </div>
        {doctorProfile?.servicesOffered?.length > 0 && (
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold text-slate-700">Hospital Services</h3>
            <div className="flex flex-wrap gap-3">
              {doctorProfile.servicesOffered.map((item, i) => (
                <p key={i} className="px-4 py-2 bg-slate-100 rounded-lg text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </TabsContent>

    {/* Additional Tab */}
    <TabsContent value="additional" className="space-y-8">
      <div>
        <SubHeading title="Additional Information" />
        {doctorProfile?.additionalDocs?.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700">Additional Documents</h3>
            <div className="flex flex-wrap gap-3">
              {doctorProfile.additionalDocs.map((item, i) => (
                <Link
                  key={i}
                  href={item}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition text-slate-700"
                >
                  <FaRegFilePdf className="w-4 h-4" /> {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </TabsContent>

    {/* Appointments Tab */}
    <TabsContent value="appointments" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/doctor/appointments/view/${item.id}`}
            className="border border-slate-200 hover:border-slate-300 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-slate-800">
                {item.firstName} {item.lastName}
              </h4>
              <History className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-500">Appointment Details...</p>
          </Link>
        ))}
      </div>
    </TabsContent>
  </Tabs>
</div>

  );
}