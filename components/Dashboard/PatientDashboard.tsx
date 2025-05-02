import React from "react";
import AnalyticsCard from "../AnalyticsCard";
import { Session } from "next-auth";
import { getUserAnalytics } from "@/actions/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getPatientAppointments } from "@/actions/appointments";
import { DoctorProps } from "@/app/(back)/dashboard/doctors/layout";
import { Button } from "../ui/button";
import Link from "next/link";
import { timeAgo } from "@/utils/timeAgo";
import {
  CalendarCheck,
  Check,
  CircleEllipsis,
  History,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import generateSlug from "@/utils/generateSlug";
export default async function PatientDashboard({
  session,
}: {
  session: Session | null;
}) {
  const user = session?.user;
  const userId = user?.id ?? "";
  const analytics = (await getUserAnalytics()) || [];
  const appointments = (await getPatientAppointments(userId)).data || [];

  const uniquePatientsMap = new Map();

  appointments.forEach((app) => {
    if (!uniquePatientsMap.has(app.doctorId)) {
      uniquePatientsMap.set(app.doctorId, {
        doctorId: app.doctorId,
        doctorName: app.doctorName ?? "Name Not Provided",
      });
    }
  });
  const doctors = Array.from(uniquePatientsMap.values()) as DoctorProps[];
  return (
    <div className="px-8 py-4">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
        Welcome, {user?.name}
      </h1>

      <div className="bg-blue-50 p-4 rounded-lg mt-2 mb-6 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between">
        <p className="text-sky-700 font-medium mb-3 sm:mb-0">
          📅 Ready to hire? Browse and book available workers on the Search
          Page.
        </p>
        <Button
          asChild
          variant="outline"
          className="flex items-center gap-2 border border-sky-500 self-start"
        >
          <Link href="/search">
            <Search className="w-4 h-4" />
            Search
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
                <Link href="/dashboard/user/appointments">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            {appointments &&
              appointments.slice(0, 5).map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`/dashboard/user/appointments/view/${item.id}`}
                    className={
                      "border mb-2 border-gray-300 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:text-slate-900"
                    }
                  >
                    <div className="flex justify-between items-center pb-2">
                      <h2>From {item.doctorName}</h2>
                      <div className="flex items-center ">
                        <History className="w-4 h-4 mr-2" />
                        <span>{timeAgo(item.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center font-semibold">
                        <CalendarCheck className="w-4 h-4 mr-2" />
                        <span>{item.appointmentFormattedDate}</span>
                      </div>
                      <span className="font-semibold">
                        <span className="font-normal">from </span>
                        {item.appointmentTime?.toString().split(",")[0]}
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
              <CardTitle>Recent Professionals</CardTitle>
              <Button asChild>
                <Link href="/dashboard/doctor/patients">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-8">
            {doctors &&
              doctors.slice(0, 5).map((item) => {
                const slug = generateSlug(item.doctorName);
                return (
                  <Link
                    key={item.doctorId}
                    href={`/doctors/${slug}?id=${item.doctorId}`}
                    className={
                      "border mb-2 border-gray-300 shadow-sm text-xs bg-white py-3 px-2 w-full rounded-md dark:text-slate-900 flex justify-between items-center "
                    }
                  >
                    <h2 className="font-medium">{item.doctorName}</h2>
                    <Button size={"sm"} variant={"outline"}>
                      View
                    </Button>
                  </Link>
                );
              })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
