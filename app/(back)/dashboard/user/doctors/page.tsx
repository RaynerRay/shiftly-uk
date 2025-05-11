import {
  // getDoctorAppointments,
  getPatientAppointments,
} from "@/actions/appointments";
// import HomeDisplayCard from "@/components/Dashboard/Doctor/HomeDisplayCard";
import NewButton from "@/components/Dashboard/Doctor/NewButton";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
// import { PatientProps } from "./layout";
// import generateSlug from "@/utils/generateSlug";
// import { DoctorProps } from "../../doctor/patients/layout";

export default async function page() {
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
  
  // const doctors = Array.from(uniquePatientsMap.values()) as DoctorProps[];
  // console.log(patients);
  //doctors/doctor-asuman-jb
  
  return (
    <div>
      <div className="py-2 border-b border-gray-200 flex items-center justify-end px-4">
        <div className="md:flex items-center gap-4">
          <NewButton
            title="New Professional"
            href={`/search`}
          />
        </div>
      </div>
      
    </div>
  );
}