import {
  getDoctorAppointments,
} from "@/actions/appointments";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import PatientPanel from "@/components/Dashboard/Doctor/PatientPanel";
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
  
  if (user?.role !== "DOCTOR") {
    return <NotAuthorized />;
  }
  
  const appointments = (await getDoctorAppointments(user?.id)).data || [];

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
        // dob: app.dob,
      });
    }
  });
  
  const patients = Array.from(uniquePatientsMap.values()) as PatientProps[];
  
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:grid md:grid-cols-12">
        {/* LIST PANEL - Full width on mobile, 4 cols on larger screens */}
        <div className="w-full md:col-span-4 lg:col-span-3 py-3 border-b md:border-b-0 md:border-r border-gray-100 overflow-auto max-h-screen md:max-h-full">
          <PanelHeader
            title="Clients"
            count={patients.length ?? 0}
            icon={Users}
          />
          <div className="px-3">
            <PatientPanel patients={patients} role={user?.role} />
          </div>
        </div>

        {/* CONTENT AREA - Full width on mobile, 8 cols on larger screens */}
        <div className="w-full md:col-span-8 lg:col-span-9 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}