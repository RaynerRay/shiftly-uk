import Link from "next/link";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import { getAdminAnalytics } from "@/actions/stats";
// import AnalyticsCard from "../AnalyticsCard";
import { getClientsAdmin, getDoctorsAdmin } from "@/actions/users";
import { getInitials } from "@/utils/generateInitials";
import ApproveBtn from "./ApproveBtn";
import { getAppointments } from "@/actions/appointments";
// import { PatientProps } from "@/app/(back)/dashboard/doctors/layout";
import { Session } from "next-auth";

export default async function Dashboard({
  session,
}: {
  session: Session | null;
})  {
  // const analytics = await getAdminAnalytics();
  const doctors = (await getDoctorsAdmin()) || [];
  const clients = (await getClientsAdmin()) || [];
  // const session = await getServerSession(authOptions);
  const user = session?.user;
  const appointments = (await getAppointments()).data || [];

  const uniquePatientsMap = new Map();

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
      });
    }
  });
  // const patients = Array.from(uniquePatientsMap.values()) as PatientProps[];
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <p className="text-sm text-muted-foreground">{user?.role}</p>
  
    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
      Welcome, Admin
    </h1>
  
    {/* Analytics Cards */}
    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {analytics.map((item, i) => (
        <AnalyticsCard key={i} data={item} />
      ))}
    </div> */}
  
    {/* Doctors & Clients Section */}
    <div className="grid gap-6 md:gap-8 lg:gap-10 xl:grid-cols-2 max-w-7xl mx-auto w-full">
  {/* Recent Doctors */}
  <Card className="w-full">
    <CardHeader>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardTitle>Recent Professionals</CardTitle>
        <Button asChild size="sm" className="w-full sm:w-auto">
          <Link href="/dashboard/doctors">View All</Link>
        </Button>
      </div>
    </CardHeader>
    <CardContent className="grid gap-6">
      {doctors.slice(0, 5).map((doctor) => {
        const initials = getInitials(doctor.name);
        return (
          <div
            key={doctor.id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 p-2 rounded-lg hover:bg-muted transition"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-9 w-9 hidden sm:flex">
                <AvatarImage
                  src={doctor.doctorProfile?.profilePicture ?? ""}
                  alt="Avatar"
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{doctor.name}</p>
                <p className="text-sm text-muted-foreground truncate">{doctor.email}</p>
              </div>
            </div>
            <div className="sm:ml-auto flex gap-2">
              <Button size="sm" asChild variant="outline">
                <Link href={`/dashboard/doctors/view/${doctor.id}`}>View</Link>
              </Button>
              <ApproveBtn
                status={doctor.doctorProfile?.status ?? "PENDING"}
                profileId={doctor.doctorProfile?.id ?? ""}
              />
            </div>
          </div>
        );
      })}
    </CardContent>
  </Card>

  {/* Recent Clients */}
  <Card className="w-full">
    <CardHeader>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardTitle>Recent Clients</CardTitle>
        <Button asChild size="sm" className="w-full sm:w-auto">
          <Link href="/dashboard/patients">View All</Link>
        </Button>
      </div>
    </CardHeader>
    <CardContent className="grid gap-6">
      {clients.slice(0, 5).map((client) => {
        const initials = getInitials(client.name);
        return (
          <div
            key={client.email}
            className="flex flex-col sm:flex-row sm:items-center gap-3 p-2 rounded-lg hover:bg-muted transition"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-9 w-9 hidden sm:flex">
                <AvatarImage src={""} alt="Avatar" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{client.name}</p>
                <p className="text-sm text-muted-foreground truncate">{client.email}</p>
              </div>
            </div>
            <div className="sm:ml-auto flex gap-2">
              <Button size="sm" asChild variant="outline">
                <Link href={`/dashboard/patients/view/${client.id}`}>View</Link>
              </Button>
            </div>
          </div>
        );
      })}
    </CardContent>
  </Card>
</div>

  </main>
  
  );
}
