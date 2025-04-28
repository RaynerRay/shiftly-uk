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
  Package2,
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

export default function NavBar({ session }: { session: Session }) {
  const user = session.user;
  const router = useRouter();
  const pathname = usePathname();
  const role = user?.role;
  const id = user.id;
  const slug = generateSlug(user.name ?? "");

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  const roles = {
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
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="">Shiftly</span>
            </Link>
            
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