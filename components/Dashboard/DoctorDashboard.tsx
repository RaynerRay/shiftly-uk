import React from "react";
import AnalyticsCard from "../AnalyticsCard";
import { Session } from "next-auth";
import { getDoctorAnalytics } from "@/actions/stats";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PatientProps } from "@/app/(back)/dashboard/doctors/layout";
import {
  getDoctorAppointments,
} from "@/actions/appointments";
import Link from "next/link";
import { getInitials } from "@/utils/generateInitials";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/utils/timeAgo";
import {
  CalendarCheck,
  Check,
  CircleEllipsis,
  History,
  RefreshCcw,
  Settings,
  X,
} from "lucide-react";
import { getDoctorProfileById } from "@/actions/onboarding";
export default async function DoctorDashboard({
  session,
}: {
  session: Session | null;
}) {
  const user = session?.user;
  const doctorId = user?.id ?? "";
  const doctorProfile = (await getDoctorProfileById(doctorId))?.data;
  const analytics = (await getDoctorAnalytics()) || [];
  const appointments = (await getDoctorAppointments(doctorId)).data || [];

  const uniquePatientsMap = new Map();
  const status = doctorProfile?.status ?? "PENDING";
  appointments.forEach((app) => {
    if (!uniquePatientsMap.has(app.patientId)) {
      uniquePatientsMap.set(app.patientId, {
        patientId: app.patientId,
        name: `${app.firstName} ${app.lastName}`,
        email: app.email,
        phone: app.phone,
        location: app.location,
        gender: app.gender,
        occupation: app.occupation,
        // dob: app.dob,
      });
    }
  });
  const patients = Array.from(uniquePatientsMap.values()) as PatientProps[];
  return (
    <div className="px-4 sm:px-6 md:px-8 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="scroll-m-20 text-xl sm:text-2xl font-extrabold tracking-tight mb-3">
          Welcome, {user?.name}
        </h1>
        <div className="flex items-center space-x-3">
        <button
  className={cn(
    "py-2 px-3 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2",
    status === "APPROVED"
      ? "bg-green-500 text-white"
      : status === "PENDING"
      ? "bg-orange-400 text-white"
      : "bg-red-500 text-white"
  )}
>
  {status === "APPROVED" ? (
    <Check className="h-4 w-4 sm:h-5 sm:w-5" />
  ) : status === "PENDING" ? (
    <RefreshCcw className="h-4 w-4 sm:h-5 sm:w-5" />
  ) : (
    <X className="h-4 w-4 sm:h-5 sm:w-5" />
  )}

  <span className="truncate">{status}</span>
</button>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mt-2 mb-6 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between">
        <p className="text-sky-700 font-medium mb-3 sm:mb-0">📅 Please set up your available days and working hours so clients can book appointments with you.</p>
        <Button asChild variant="outline" className="flex items-center gap-2 border border-sky-500 self-start">
          <Link href="/dashboard/doctor/settings">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        {analytics.map((item, i) => {
          return <AnalyticsCard key={i} data={item} />;
        })}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 grid-cols-1 ">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Appointments</CardTitle>
              <Button asChild>
                <Link href="/dashboard/doctor/appointments">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            {appointments &&
              appointments.slice(0, 5).map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`/dashboard/doctor/appointments/view/${item.id}`}
                    className={
                      "border mb-2 border-gray-300 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:text-slate-900"
                    }
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2">
                      <h2>
                        {item.firstName} {item.lastName}
                      </h2>
                      <div className="flex items-center ">
                        <History className="w-4 h-4 mr-2" />
                        <span>{timeAgo(item.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <div className="flex items-center font-semibold">
                        <CalendarCheck className="w-4 h-4 mr-2" />
                        <span>{item.appointmentFormattedDate}</span>
                      </div>
                      <span className="font-semibold">
                        from {item.appointmentTime?.toString().split(',')[0]}
                      </span>
                      <div
                        className={cn(
                          "flex items-center text-blue-600",
                          item.status === "approved" &&
                            "text-green-600 font-semibold"
                        )}
                      >
                        {item.status === "pending" ? (
                          <CircleEllipsis className="mr-2 w-4 h-4" />
                        ) : item.status === "approved" ? (
                          <Check className="mr-2 w-4 h-4" />
                        ) : (
                          <X className="mr-2 w-4 h-4" />
                        )}
                        <span>{item.status}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Clients</CardTitle>
              <Button asChild>
                <Link href="/dashboard/doctor/patients">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-8">
            {patients &&
              patients.slice(0, 5).map((patient) => {
                const initials = getInitials(patient.name);
                return (
                  <div key={patient.email} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src={""} alt="Avatar" />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {patient.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {patient.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium flex space-x-2 items-center">
                      <Button size={"sm"} asChild variant={"outline"}>
                        <Link
                          href={`/dashboard/doctor/patients/view/${patient.patientId}`}
                        >
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}