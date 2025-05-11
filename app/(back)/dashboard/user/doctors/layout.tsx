import {
  // getAppointments,
  // getDoctorAppointments,
  getPatientAppointments,
} from "@/actions/appointments";
import DoctorsPanel from "@/components/Dashboard/Doctor/DoctorsPanel";
// import ListPanel from "@/components/Dashboard/Doctor/ListPanel";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
// import PatientPanel from "@/components/Dashboard/Doctor/PatientPanel";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { Users } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

export interface PatientProps {
  patientId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  gender: string;
  occupation: string;
  dob: string;
}

export interface DoctorProps {
  doctorId: string;
  doctorName: string;
}

export default async function PatientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  
  // Updated to authorize USER, CLIENT, and INDIVIDUALCLIENT roles
  const authorizedRoles = ["USER", "CLIENT", "INDIVIDUALCLIENT"];
  
  if (!user?.role || !authorizedRoles.includes(user.role)) {
    return <NotAuthorized />;
  }
  
  const appointments = (await getPatientAppointments(user?.id)).data || [];

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
    <div>
      <div className="grid grid-cols-12">
        {/* LIST PANNEL */}
        <div className="col-span-6 py-3 border-r border-gray-100">
          <PanelHeader
            title="Professionals"
            count={doctors.length ?? 0}
            icon={Users}
          />
          <div className="px-3">
            <DoctorsPanel doctors={doctors} role={user.role} />
          </div>
        </div>

        <div className="col-span-6">{children}</div>
      </div>
    </div>
  );
}