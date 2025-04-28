"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  CalendarCheck,
  Check,
  CircleEllipsis,
  History,
  X,
  RefreshCcw,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Appointment, UserRole } from "@prisma/client";
import { timeAgo } from "@/utils/timeAgo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ListPanelAdmin({
  appointments,
  role,
}: {
  appointments: Appointment[];
  role: UserRole;
}) {
  const pathname = usePathname();
  
  // Helper function to render payment status with appropriate icon and styling
  const renderPaymentStatus = (appointment: Appointment) => {
    // If appointment is approved but not completed yet, show waiting message
    if (appointment.status === "approved" && !appointment.isCompleted) {
      return (
        <div className="flex items-center text-purple-600 bg-purple-100 px-2 py-1 rounded-full text-xs font-semibold">
          <Clock className="mr-1 w-3 h-3" />
          <span>Awaiting Completion</span>
        </div>
      );
    }
    
    // For completed appointments, show payment status
    if (appointment.status === "approved" && appointment.isCompleted) {
      switch (appointment.paymentStatus) {
        case "pending":
          return (
            <div className="flex items-center text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-semibold">
              <CircleEllipsis className="mr-1 w-3 h-3" />
              <span>Payment Pending</span>
            </div>
          );
        case "paid":
          return (
            <div className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-semibold">
              <Check className="mr-1 w-3 h-3" />
              <span>Paid</span>
            </div>
          );
        case "refunded":
          return (
            <div className="flex items-center text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs font-semibold">
              <RefreshCcw className="mr-1 w-3 h-3" />
              <span>Refunded</span>
            </div>
          );
        case "failed":
          return (
            <div className="flex items-center text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-semibold">
              <AlertCircle className="mr-1 w-3 h-3" />
              <span>Payment Failed</span>
            </div>
          );
        default:
          return null;
      }
    }
    
    return null;
  };
  
  // Get the appropriate link path based on user role
  const getAppointmentLink = (appointmentId: string) => {
    if (role === "ADMIN") {
      return `/dashboard/appointments/view/${appointmentId}`;
    } else {
      return `/dashboard/${role === "USER" ? "user" : "doctor"}/appointments/view/${appointmentId}`;
    }
  };
  
  return (
    <ScrollArea className="h-96 w-full">
      {appointments.map((item) => {
        const linkPath = getAppointmentLink(item.id);
        
        return (
          <Link
            key={item.id}
            href={linkPath}
            className={cn(
              "border mb-2 border-gray-300 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:text-slate-900",
              pathname === linkPath && "border-green-700 border-2 bg-green-50"
            )}
          >
            <div className="flex justify-between items-center pb-2">
              <h2 className="text-sm font-semibold">{item.doctorName}</h2>
              <div className="flex items-center text-xs">
                <History className="w-4 h-4 mr-2" />
                <span>{timeAgo(item.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 border-b py-2">
              <div className="flex items-center font-semibold text-xs">
                <CalendarCheck className="w-4 h-4 mr-2" />
                <span>{item.appointmentFormattedDate}</span>
              </div>
              <span className="font-semibold text-xs">
                from {item.appointmentTime?.toString().split(",")[0]}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div
                className={cn(
                  "flex items-center px-2 py-1 rounded-full text-xs font-semibold",
                  item.status === "pending" && "text-blue-600 bg-blue-100",
                  item.status === "approved" && "text-green-600 bg-green-100",
                  item.status === "rejected" && "text-red-600 bg-red-100"
                )}
              >
                {item.status === "pending" ? (
                  <CircleEllipsis className="mr-2 w-4 h-4" />
                ) : item.status === "approved" ? (
                  <Check className="mr-2 w-4 h-4" />
                ) : (
                  <X className="mr-2 w-4 h-4" />
                )}
                <span>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
              </div>
              
              {/* Payment status display */}
              {renderPaymentStatus(item)}
            </div>
          </Link>
        );
      })}
    </ScrollArea>
  );
}