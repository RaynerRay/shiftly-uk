"use client";
import {
  AlarmClock,
  ExternalLink,
  Home,
  Mail,
  Power,
  Settings,
  User2,
  Users,
} from "lucide-react";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
// import { signOut } from "next-auth/react";
import generateSlug from "@/utils/generateSlug";

// Define a proper type for user roles
type UserRole = 'USER' | 'ADMIN' | 'DOCTOR' | 'CLIENT' | 'INDIVIDUALCLIENT';

// Define the navigation item type
interface NavItem {
  title: string;
  path: string;
  icon: React.ForwardRefExoticComponent<any>;  // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function Sidebar({ session }: { session: Session }) {
  const { user } = session;
  const role = user?.role as UserRole;
  const id = user.id;
  const slug = generateSlug(user.name ?? "");
  const pathname = usePathname();
  
  const roles: Record<UserRole, NavItem[]> = {
    USER: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      {
        title: "My Appointments",
        path: "/dashboard/user/appointments",
        icon: AlarmClock,
      },
      { title: "Professionals", path: "/dashboard/user/doctors", icon: Users },
      { title: "Inbox", path: "/dashboard/user/inbox", icon: Mail },
      // {
      //   title: "Settings",
      //   path: "/dashboard/user/settings",
      //   icon: Settings,
      // },
    ],
    CLIENT: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      {
        title: "My Appointments",
        path: "/dashboard/user/appointments",
        icon: AlarmClock,
      },
      { title: "Professionals", path: "/dashboard/user/doctors", icon: Users },
      { title: "Inbox", path: "/dashboard/user/inbox", icon: Mail },
    ],
    INDIVIDUALCLIENT: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      {
        title: "My Appointments",
        path: "/dashboard/user/appointments",
        icon: AlarmClock,
      },
      { title: "Professionals", path: "/dashboard/user/doctors", icon: Users },
      { title: "Inbox", path: "/dashboard/user/inbox", icon: Mail },
    ],
    ADMIN: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      { title: "Services", path: "/dashboard/services", icon: Users },
      { title: "Specialties", path: "/dashboard/specialties", icon: Users },
      { title: "Symptoms", path: "/dashboard/symptoms", icon: Users },
      { title: "Professionals", path: "/dashboard/doctors", icon: Users },
      { title: "Clients", path: "/dashboard/patients", icon: Users },
      { title: "Appointments", path: "/dashboard/appointments", icon: Users },
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: Settings,
      },
    ],
    DOCTOR: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      {
        title: "Appointments",
        path: "/dashboard/doctor/appointments",
        icon: AlarmClock,
      },
      { title: "Clients", path: "/dashboard/doctor/patients", icon: Users },
      { title: "Inbox", path: "/dashboard/doctor/inbox", icon: Mail },
      {
        title: "Profile",
        path: `/dashboard/doctor/profile/${id}`,
        icon: User2,
      },
      {
        title: "Live Preview",
        path: `/doctors/${slug}?id=${id}`,
        icon: ExternalLink,
      },
      {
        title: "Settings",
        path: "/dashboard/doctor/settings",
        icon: Settings,
      },
    ],
  };

  const sideBarLinks = roles[role] || [];
  
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          {/* Logo */}
          <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <div className="text-sky-800 text-3xl group-hover:text-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M8 12h8" />
                      <path d="M12 8v8" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rounded-full hidden group-hover:block" />
                </div>
                <span className="text-xl ml-2 text-sky-900 font-bold tracking-tight group-hover:text-blue-600 transition-colors">SHIFTLY</span>
              </Link>
            </div>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sideBarLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.path ? " bg-muted text-primary  " : ""
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button size="sm" className="w-full">
            <Power className="w- h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}