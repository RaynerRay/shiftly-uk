import { getPatientAppointments } from "@/actions/appointments";
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
  if (user?.role !== "USER") {
    return <NotAuthorized />;
  }
  const appointments = (await getPatientAppointments(user?.id)).data || [];
  return (
    <div>
      {/* Header */}

      {/* 2 PANELS - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* LIST PANEL - Full width on mobile, 4 cols on larger screens */}
        <div className="md:col-span-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
          <PanelHeader
            title="Appointments"
            count={appointments.length ?? 0}
            icon={Calendar}
          />
          <div className="px-3">
            <ListPanel role={user.role} appointments={appointments} />
          </div>
        </div>

        {/* Content panel - Full width on mobile, 8 cols on larger screens */}
        <div className="md:col-span-8">{children}</div>
      </div>
    </div>
  );
}