import { getPatientAppointments } from "@/actions/appointments";
import { timeAgo } from "@/utils/timeAgo";
import {
  CalendarCheck,
  Check,
  CircleEllipsis,
  History,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  UserCheck,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubHeading from "@/components/SubHeading";
import { Button } from "@/components/ui/button";
import generateSlug from "@/utils/generateSlug";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return {
          icon: Check,
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          borderColor: "border-green-200",
        };
      case "rejected":
        return {
          icon: X,
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-200",
        };
      default:
        return {
          icon: CircleEllipsis,
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
          borderColor: "border-blue-200",
        };
    }
  };

  const { icon: Icon, bgColor, textColor, borderColor } = getStatusConfig(status);

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${bgColor} ${textColor} ${borderColor}`}>
      <Icon className="w-4 h-4 mr-2" />
      <span className="capitalize">{status}</span>
    </div>
  );
};

export default async function PatientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params object
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const appointments = (await getPatientAppointments(id)).data || [];
  const patientDetails = appointments[0];
  
  // Handle case where no patient details are found
  if (!patientDetails) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-4">
        <div className="space-y-4 text-center flex items-center justify-center flex-col max-w-md">
          <AlertTriangle className="w-12 h-12 text-amber-500" />
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">No Patient Found</h2>
            <p className="text-slate-600">The patient profile you are looking for does not exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Get unique doctors for this patient
  const patientDoctors = appointments.reduce((unique, app) => {
    const exists = unique.find(doc => doc.doctorId === app.doctorId);
    if (!exists && app.doctorName && app.doctorId) {
      unique.push({
        doctorName: app.doctorName,
        doctorId: app.doctorId,
      });
    }
    return unique;
  }, [] as Array<{ doctorName: string; doctorId: string }>);
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 sm:p-6 lg:p-8 border-b border-slate-200">
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
              
              {/* Patient Info */}
              <div className="flex-1">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 break-words">
                      {patientDetails.firstName} {patientDetails.lastName}
                    </h1>
                    <div className="mt-2 space-y-1 sm:space-y-2">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="break-all">{patientDetails.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span>{patientDetails.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:flex-col lg:items-end">
                <div className="flex items-center justify-center sm:justify-start lg:justify-end space-x-2 px-3 py-2 bg-white/60 rounded-lg border border-slate-200">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    <span className="font-semibold">{appointments.length.toString().padStart(2, "0")}</span> Appointments
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start lg:justify-end space-x-2 px-3 py-2 bg-white/60 rounded-lg border border-slate-200">
                  <UserCheck className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    <span className="font-semibold">{patientDoctors.length}</span> {patientDoctors.length === 1 ? 'Doctor' : 'Doctors'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="p-4 sm:p-6 lg:p-8">
            <Tabs defaultValue="details" className="w-full">
              
              {/* Mobile-First Tab Navigation */}
              <div className="mb-6 overflow-x-auto">
                <TabsList className="inline-flex h-auto p-1 bg-slate-100 rounded-lg w-full sm:w-auto min-w-max">
                  <TabsTrigger 
                    value="details" 
                    className="flex items-center space-x-2 px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <User className="w-4 h-4" />
                    <span>Patient Info</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="appointments" 
                    className="flex items-center space-x-2 px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Appointments</span>
                    <span className="ml-1 px-2 py-0.5 bg-slate-200 data-[state=active]:bg-emerald-100 text-xs rounded-full">
                      {appointments.length}
                    </span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Patient Details Tab */}
              <TabsContent value="details" className="space-y-6 sm:space-y-8">
                
                {/* Personal Information */}
                <div className="bg-slate-50 rounded-xl p-4 sm:p-6">
                  <SubHeading title="Personal Information" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
                    {[
                      { label: "First Name", value: patientDetails.firstName, icon: User },
                      { label: "Last Name", value: patientDetails.lastName, icon: User },
                      { label: "Gender", value: patientDetails.gender, icon: User },
                      { label: "Phone Number", value: patientDetails.phone, icon: Phone },
                      { label: "Email Address", value: patientDetails.email, icon: Mail },
                      { label: "Location", value: patientDetails.location, icon: MapPin },
                    ].filter(item => item.value).map(({ label, value, icon: Icon }, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 border border-slate-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-medium text-slate-600">{label}</span>
                        </div>
                        <span className="text-base text-slate-900 font-medium break-all">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Information */}
                {patientDetails.occupation && (
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-6">
                    <SubHeading title="Professional Information" />
                    <div className="mt-4">
                      <div className="bg-white rounded-lg p-4 border border-slate-200 inline-block">
                        <div className="flex items-center space-x-2 mb-2">
                          <Briefcase className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-medium text-slate-600">Occupation</span>
                        </div>
                        <span className="text-base text-slate-900 font-medium">{patientDetails.occupation}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Associated Doctors */}
                {patientDoctors.length > 0 && (
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-6">
                    <SubHeading title="Associated Medical Professionals" />
                    <div className="mt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {patientDoctors.map((doc) => {
                          const slug = generateSlug(doc.doctorName ?? "");
                          return (
                            <Link 
                              key={`${doc.doctorId}-${slug}`} 
                              href={`/doctors/${slug}?id=${doc.doctorId}`}
                              className="group"
                            >
                              <Button 
                                variant="outline" 
                                className="w-full justify-start h-auto p-4 bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
                              >
                                <div className="flex items-center space-x-3 w-full">
                                  <UserCheck className="w-5 h-5 text-slate-500 group-hover:text-emerald-600 flex-shrink-0" />
                                  <div className="flex-1 text-left min-w-0">
                                    <div className="font-medium text-slate-800 group-hover:text-emerald-800 truncate">
                                      {doc.doctorName}
                                    </div>
                                    <div className="text-xs text-slate-500 group-hover:text-emerald-600">
                                      View Profile
                                    </div>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 flex-shrink-0" />
                                </div>
                              </Button>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Appointments Tab */}
              <TabsContent value="appointments" className="space-y-6">
                {appointments.length > 0 ? (
                  <>
                    {/* Appointments Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-slate-500" />
                        <h2 className="text-lg font-semibold text-slate-800">
                          Appointments History
                        </h2>
                      </div>
                      <span className="text-sm text-slate-500">
                        {appointments.length} total
                      </span>
                    </div>

                    {/* Appointments Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {appointments.map((item) => (
                        <Link
                          key={item.id}
                          href={`/dashboard/doctor/appointments/view/${item.id}`}
                          className="group bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          {/* Appointment Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors truncate">
                                {item.firstName} {item.lastName}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <History className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-500">
                                  {timeAgo(item.createdAt)}
                                </span>
                              </div>
                            </div>
                            <StatusBadge status={item.status} />
                          </div>

                          {/* Appointment Details */}
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                              <CalendarCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-slate-800">
                                  {item.appointmentFormattedDate}
                                </div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Clock className="w-3 h-3 text-slate-500" />
                                  <span className="text-sm text-slate-600">
                                    {item.appointmentTime}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Doctor Info if available */}
                            {item.doctorName && (
                              <div className="flex items-center space-x-2 text-sm text-slate-600">
                                <UserCheck className="w-4 h-4 text-slate-400" />
                                <span>Dr. {item.doctorName}</span>
                              </div>
                            )}

                            {/* View Details CTA */}
                            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                              <span className="text-sm text-slate-500">
                                Click to view details
                              </span>
                              <div className="flex items-center text-sm text-emerald-600 group-hover:text-emerald-700">
                                <span>View</span>
                                <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">No Appointments</h3>
                    <p className="text-slate-500">This patient does not have any appointments scheduled yet.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}