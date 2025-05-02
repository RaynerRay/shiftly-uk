"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  AlarmClock,
  ExternalLink,
  Home,
  Mail,
  Menu,
  Power,
  Settings,
  User2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { getInitials } from './../../utils/generateInitials';
import { cn } from "@/lib/utils";
import generateSlug from "@/utils/generateSlug";

// Define a proper type for user roles
type UserRole = 'USER' | 'ADMIN' | 'DOCTOR' | 'CLIENT' | 'INDIVIDUALCLIENT';

// Define the navigation item type
interface NavItem {
  title: string;
  path: string;
  icon: React.ForwardRefExoticComponent<any>;  // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function NavBar({ session }: { session: Session }) {
  const user = session.user;
  const router = useRouter();
  const pathname = usePathname();
  const role = user?.role as UserRole;
  const id = user.id;
  const slug = generateSlug(user.name ?? "");

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

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
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
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

            
            {sideBarLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.path}
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    pathname === item.path ? "bg-muted text-foreground" : ""
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto">
            <Button size="sm" className="w-full" onClick={() => handleLogout()}>
              <Power className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
{/* Search Bar */}

      <div className="w-full flex-1">
        {/* Home Button */}
      <Link href="/">
        <Button 
          variant="ghost" 
          size="sm" 
          className=" md:flex items-center gap-1 rounded-md px-3 py-2 bg-gradient-to-r from-gray-100 to-blue-50 text-gray-800 hover:from-gray-200 hover:to-blue-100 border border-sky-200 shadow-sm transition-all duration-200"
        >
          <Home className="h-4 w-4 text-gray-600" />
          <span className="font-medium">Home</span>
        </Button>
      </Link>
        {/* <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search appointments..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form> */}
      </div>
      
      {/* Home Button
      <Link href="/">
        <Button 
          variant="ghost" 
          size="sm" 
          className="hidden md:flex items-center gap-1 rounded-full px-3 py-2 bg-gradient-to-r from-sky-100 to-blue-50 text-sky-800 hover:from-sky-200 hover:to-blue-100 border border-sky-200 shadow-sm transition-all duration-200"
        >
          <Home className="h-4 w-4 text-sky-600" />
          <span className="font-medium">Go To Home</span>
        </Button>
      </Link> */}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name || ""} />
            ) : (
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-center">
            {user.name}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="text-center font-light text-sm text-slate-500">
            {user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLogout()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
        
      </DropdownMenu>
    </header>
  );
}