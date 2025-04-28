import { getDoctorAppointments } from "@/actions/appointments";
import ListPanel from "@/components/Dashboard/Doctor/ListPanel";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { Calendar } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

export default async function AppointmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "DOCTOR") {
    return <NotAuthorized />;
  }
  const appointments = (await getDoctorAppointments(user?.id)).data || [];
  return (
    <div className="container mx-auto px-4">
      {/* Header */}

      {/* 2 PANNELS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* LIST PANNEL */}
        <div className="md:col-span-4 lg:col-span-3 py-3 border-b md:border-b-0 md:border-r border-gray-100">
          <PanelHeader
            title="Appointments"
            count={appointments.length ?? 0}
            icon={Calendar}
          />
          <div className="px-3">
            <ListPanel appointments={appointments} role={user?.role} />
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}