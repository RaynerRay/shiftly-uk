import { getAppointments } from "@/actions/appointments";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import ListPanelAdmin from "@/components/Dashboard/ListPanelAdmin";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { Calendar } from "lucide-react";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

export default async function AppointmentLayout({
    children,
  }: {
    children: ReactNode;
  }) {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (user?.role !== "ADMIN") {
      return <NotAuthorized />;
    }
    
    // Fix: properly access the data property from getAppointments response
    const response = await getAppointments();
    const appointments = response.data || [];
    
    return (
      <div>
        <div className="grid grid-cols-12">
          {/* LIST PANEL */}
          <div className="col-span-4 py-3 border-r border-gray-100">
            <PanelHeader
              title="Appointments"
              count={appointments.length}
              icon={Calendar}
            />
            <div className="px-3">
              <ListPanelAdmin appointments={appointments} role={user?.role} />
            </div>
          </div>
  
          <div className="col-span-8">{children}</div>
        </div>
      </div>
    );
  }