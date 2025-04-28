"use client";

import { updateAppointmentById } from "@/actions/appointments";
import RadioInput from "@/components/FormInputs/RadioInput";
import { Button } from "@/components/ui/button";
import { Appointment, AppointmentStatus } from "@prisma/client";
import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// Define the shape of the form data
export type AppointmentUpdateProps = {
  status: AppointmentStatus;
  meetingLink: string;
  meetingProvider: string;
};

// Define the component props
interface UpdateAppointmentFormProps {
  appointment: Appointment;
}

export default function UpdateAppointmentForm({ appointment }: UpdateAppointmentFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isInvalidDate, setIsInvalidDate] = useState<boolean>(false);

  // Initialize form with react-hook-form - moved above any conditionals
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentUpdateProps>({
    defaultValues: {
      meetingLink: appointment.meetingLink || "",
      meetingProvider: appointment.meetingProvider || "",
      status: appointment.status,
    },
  });

  // Memoize parsed appointment date and time to prevent recreation on every render
  const { dateString, firstAppointmentTime, appointmentDateTime } = useMemo(() => {
    const dateStr = appointment.appointmentDate 
      ? appointment.appointmentDate.toISOString().split("T")[0] 
      : '';
    const timeStr = appointment.appointmentTime?.split(",")[0]?.trim() || "";
    const dateTime = new Date(`${dateStr} ${timeStr}`);
    
    return {
      dateString: dateStr,
      firstAppointmentTime: timeStr,
      appointmentDateTime: dateTime
    };
  }, [appointment.appointmentDate, appointment.appointmentTime]);

  // Check for invalid date or null date - now with state instead of early return
  useEffect(() => {
    if (!dateString || isNaN(appointmentDateTime.getTime())) {
      console.error("Invalid appointment date or time:", { dateString, firstAppointmentTime });
      setIsInvalidDate(true);
    } else {
      setIsInvalidDate(false);
    }
  }, [dateString, firstAppointmentTime, appointmentDateTime]);

  // Update current time every minute to re-evaluate conditions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, []);

  // Calculate time difference in hours - memoize to prevent recalculation on every render
  const hoursDifference = useMemo(() => {
    if (isInvalidDate) return 0;
    return (appointmentDateTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60);
  }, [isInvalidDate, appointmentDateTime, currentTime]);

  // Conditions for disabling - also memoized
  const { isAppointmentPassed, isWithinThreeHours, cannotUpdateAppointment } = useMemo(() => {
    const passed = !isInvalidDate && hoursDifference < 0;
    const withinThree = !isInvalidDate && hoursDifference >= 0 && hoursDifference < 3;
    const cannotUpdate = isInvalidDate || passed || withinThree;
    
    return {
      isAppointmentPassed: passed,
      isWithinThreeHours: withinThree,
      cannotUpdateAppointment: cannotUpdate
    };
  }, [isInvalidDate, hoursDifference]);

  // Reset form to read-only when appointment has passed
  useEffect(() => {
    if (isAppointmentPassed) {
      reset(
        {
          meetingLink: appointment.meetingLink || "",
          meetingProvider: appointment.meetingProvider || "",
          status: appointment.status,
        },
        { keepValues: true }
      );
    }
  }, [isAppointmentPassed, appointment, reset]);

  // Define status options for radio input
  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Approve", value: "approved" },
    { label: "Reject", value: "rejected" },
  ];

  // Handle form submission
  const handleUpdate = async (data: AppointmentUpdateProps) => {
    if (isAppointmentPassed) {
      toast.error("Cannot update appointments that have already passed");
      return;
    }
    if (isWithinThreeHours) {
      toast.error("Cannot update appointments within 3 hours of the scheduled time");
      return;
    }

    setLoading(true);
    try {
      await updateAppointmentById(appointment.id, data);
      toast.success("Appointment updated successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update appointment";
      toast.error(errorMessage);
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Prevent form submission if appointment has passed
  const onSubmit = isAppointmentPassed
    ? (e: React.FormEvent) => {
        e.preventDefault();
        toast.error("Cannot update appointments that have already passed");
        return false;
      }
    : handleSubmit(handleUpdate);

  // If date is invalid, show error message
  if (isInvalidDate) {
    return <div className="text-red-600 p-4">Invalid appointment date or time</div>;
  }

  return (
    <form
      className={`border-2 ${
        isAppointmentPassed ? "border-red-600" : "border-green-600"
      } shadow rounded-md p-2 sm:p-4 mx-0 sm:mx-4 my-4`}
      onSubmit={onSubmit}
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b">
          <h2 className="scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight py-2 mb-2 sm:mb-3">
            Update Appointment
          </h2>
          <Button
            className={`w-full sm:w-auto mb-3 sm:mb-0 ${
              cannotUpdateAppointment
                ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                : ""
            }`}
            disabled={loading || cannotUpdateAppointment}
            type="submit"
          >
            {loading
              ? "Saving..."
              : isAppointmentPassed
              ? "Appointment Passed"
              : isWithinThreeHours
              ? "Too Close to Start Time"
              : "Update Appointment"}
          </Button>
        </div>

        {isAppointmentPassed && (
          <div className="bg-red-50 border-l-4 border-red-400 p-3 sm:p-4 my-3 sm:my-4">
            <div className="flex">
              <div className="ml-2 sm:ml-3">
                <p className="text-xs sm:text-sm text-red-700 font-semibold">
                  This appointment has already passed and cannot be updated.
                </p>
              </div>
            </div>
          </div>
        )}

        {isWithinThreeHours && !isAppointmentPassed && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 my-3 sm:my-4">
            <div className="flex">
              <div className="ml-2 sm:ml-3">
                <p className="text-xs sm:text-sm text-yellow-700">
                  Appointments cannot be updated within 3 hours of the scheduled time.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-2">
          <div className="py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <RadioInput
                title="Appointment Status"
                name="status"
                errors={errors}
                register={register}
                radioOptions={statusOptions}
                className="col-span-1"
                disabled={cannotUpdateAppointment}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}