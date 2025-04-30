import Dashboard from "@/components/Dashboard/Dashboard";
import DoctorDashboard from "@/components/Dashboard/DoctorDashboard";
import PatientDashboard from "@/components/Dashboard/PatientDashboard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  
  // Redirect to login if not authenticated
  if (!session || !session.user) {
    redirect("/login");
  }
  
  const user = session.user;
  const role = user.role;
  
  // Only ADMIN can access Dashboard
  if (role === "ADMIN") {
    return <Dashboard session={session} />;
  }
  
  // DOCTOR role gets DoctorDashboard
  if (role === "DOCTOR") {
    return <DoctorDashboard session={session} />;
  }
  
  // USER, CLIENT, and INDIVIDUALCLIENT all get PatientDashboard
  if (role === "USER" || role === "CLIENT" || role === "INDIVIDUALCLIENT") {
    return <PatientDashboard session={session} />;
  }
  
  // If none of the above roles match, redirect to an unauthorized page
  redirect("/unauthorized");
}