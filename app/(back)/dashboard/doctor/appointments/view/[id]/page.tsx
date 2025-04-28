import { getAppointmentById } from "@/actions/appointments";
import UpdateAppointmentCompletionForm from "@/components/Dashboard/Doctor/UpdateAppointmentCompletion";
import UpdateAppointmentForm from "@/components/Dashboard/Doctor/UpdateAppointmentForm";
import { Calendar } from "lucide-react";
import React from "react";

export default async function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params object
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const appointment = await getAppointmentById(id);
  const timeItems = appointment?.appointmentTime?.split(",") || [];
  
  return (
    // Rest of your component remains the same
    <div className="max-w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-4 border-b">
        <div className="mb-4 md:mb-0">
          <h2 className="scroll-m-20 pb-2 text-xl md:text-2xl font-semibold tracking-tight first:mt-0">
            {`${appointment?.firstName} ${appointment?.lastName}`}
          </h2>
          <div className="flex flex-wrap space-x-2 divide-x-2 divide-gray-200 text-sm">
            <p className="capitalize px-2">{appointment?.gender}</p>
            <p className="px-2 break-all">{appointment?.phone}</p>
          </div>
        </div>
        <div className="mt-2 md:mt-0 md:text-right">
          <h2 className="scroll-m-20 pb-2 text-xl md:text-2xl font-medium tracking-tight first:mt-0">
            {appointment?.appointmentFormattedDate}
          </h2>
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="flex flex-wrap">
              {timeItems.map((item, index) => (
                <span key={index} className="mr-1">
                  {item.trim()}
                  {index < timeItems.length - 1 && ","}
                  {(index + 1) % 4 === 0 && <br />} {/* Line break after every 4 items */}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
      <div className="py-4">
        {/* Information rows */}
        <div className="flex flex-col sm:flex-row sm:divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold w-full sm:w-1/4 md:w-1/5 lg:w-1/6">Reason</p>
          <p className="px-3 mt-1 sm:mt-0 break-words w-full sm:w-3/4 md:w-4/5 lg:w-5/6">{appointment?.appointmentReason}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold w-full sm:w-1/4 md:w-1/5 lg:w-1/6">Email</p>
          <p className="px-3 mt-1 sm:mt-0 break-words w-full sm:w-3/4 md:w-4/5 lg:w-5/6">{appointment?.email}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold w-full sm:w-1/4 md:w-1/5 lg:w-1/6">Contact</p>
          <p className="px-3 mt-1 sm:mt-0 w-full sm:w-3/4 md:w-4/5 lg:w-5/6">{appointment?.phone}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold w-full sm:w-1/4 md:w-1/5 lg:w-1/6">Site</p>
          <p className="px-3 mt-1 sm:mt-0 break-words w-full sm:w-3/4 md:w-4/5 lg:w-5/6">{appointment?.location}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold w-full sm:w-1/4 md:w-1/5 lg:w-1/6">Total Hours</p>
          <p className="px-3 mt-1 sm:mt-0 w-full sm:w-3/4 md:w-4/5 lg:w-5/6">{appointment?.totalHours}</p>
        </div>
        {/* <div className="flex flex-col sm:flex-row sm:divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold w-full sm:w-1/4 md:w-1/5 lg:w-1/6">To Be Paid</p>
          <p className="px-3 mt-1 sm:mt-0 w-full sm:w-3/4 md:w-4/5 lg:w-5/6">£ {appointment?.charge}</p>
        </div> */}

        <div className="px-4 mt-4">
          {/* Update form */}
          {appointment && appointment.id && (
            <UpdateAppointmentForm appointment={appointment} />
          )}
        </div>
        <div className="px-4 mt-4">
          {/* Update completion form with totalHours and hourly rate */}
          {appointment && appointment.id && (
            <UpdateAppointmentCompletionForm 
            appointment={appointment} 
            totalHours={Number(appointment?.totalHours) || 0} 
            hourlyRate={appointment?.totalHours && appointment?.charge 
              ? Math.round(Number(appointment?.charge) / Number(appointment?.totalHours)) 
              : 0}
          />
          )}
        </div>
      </div>
    </div>
  );
}