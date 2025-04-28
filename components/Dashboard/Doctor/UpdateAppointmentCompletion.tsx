"use client";

import { updateAppointmentCompletion } from "@/actions/appointments";
import { Button } from "@/components/ui/button";
import { Appointment } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CompletionFormData = {
  isCompleted: boolean;
  actualStartTime: string;
  actualFinishTime: string;
  actualHours: number | null;
  finalCharge: number | null;
};

export default function UpdateAppointmentCompletionForm({
  appointment,
  totalHours,
  hourlyRate,
}: {
  appointment: Appointment;
  totalHours: number;
  hourlyRate: number;
}) {
  const [loading, setLoading] = useState(false);
  
  // Check if appointment date has passed
  const appointmentDate = new Date(appointment.appointmentDate || "");
  const currentDate = new Date();
  const canUpdate = appointmentDate < currentDate;
  
  const {
    register,
    handleSubmit,
    formState: { },
    watch,
    setValue,
  } = useForm<CompletionFormData>({
    defaultValues: {
      isCompleted: appointment.isCompleted,
      actualStartTime: appointment.actualStartTime 
        ? new Date(appointment.actualStartTime).toISOString().slice(0, 16) 
        : "",
      actualFinishTime: appointment.actualFinishTime 
        ? new Date(appointment.actualFinishTime).toISOString().slice(0, 16) 
        : "",
      actualHours: appointment.actualHours || null,
      finalCharge: appointment.finalCharge || appointment.charge,
    },
  });
  
  // Watch the start and end time fields to calculate the hours
  const actualStartTime = watch("actualStartTime");
  const actualFinishTime = watch("actualFinishTime");
  const actualHours = watch("actualHours");
  
  // Calculate actual hours and final charge whenever start or end time changes
  useEffect(() => {
    if (actualStartTime && actualFinishTime) {
      const startDate = new Date(actualStartTime);
      const endDate = new Date(actualFinishTime);
      
      if (startDate && endDate && endDate > startDate) {
        const diffMs = endDate.getTime() - startDate.getTime();
        const diffHrs = diffMs / (1000 * 60 * 60);
        const calculatedHours = parseFloat(diffHrs.toFixed(2));
        setValue("actualHours", calculatedHours);
        
        // Calculate final charge based on whichever is greater: actualHours or totalHours
        const hoursToCharge = Math.max(calculatedHours, totalHours);
        const calculatedCharge = Math.round(hoursToCharge * hourlyRate);
        setValue("finalCharge", calculatedCharge);
      } else {
        setValue("actualHours", null);
        setValue("finalCharge", appointment.charge); // Default to original charge
      }
    }
  }, [actualStartTime, actualFinishTime, setValue, totalHours, hourlyRate, appointment.charge]);

  async function handleUpdate(data: CompletionFormData) {
    if (!canUpdate) {
      toast.error("Cannot update completion status before the appointment date");
      return;
    }
    
    // Validate that if completed is true, times are provided
    if (data.isCompleted && (!data.actualStartTime || !data.actualFinishTime)) {
      toast.error("Please provide both actual start and finish times for completed appointments");
      return;
    }
    
    setLoading(true);
    try {
      const startTime = data.actualStartTime ? new Date(data.actualStartTime) : null;
      const finishTime = data.actualFinishTime ? new Date(data.actualFinishTime) : null;
      
      await updateAppointmentCompletion(
        appointment.id, 
        data.isCompleted, 
        startTime, 
        finishTime, 
        data.actualHours,
        data.finalCharge,
        totalHours,
        hourlyRate
      );
      
      setLoading(false);
      toast.success("Appointment completion status updated successfully");
    } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
      setLoading(false);
      toast.error(error.message || "Failed to update completion status");
      console.log(error);
    }
  }

  return (
    <form
      className="border-2 border-green-600 shadow rounded-md p-2 sm:p-4 mx-0 sm:mx-4 my-4"
      onSubmit={handleSubmit(handleUpdate)}
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b">
          <h2 className="scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight py-2 mb-2 sm:mb-3">
            Appointment Completion Status
          </h2>
          <Button
            className="w-full sm:w-auto mb-3 sm:mb-0"
            disabled={loading || !canUpdate}
          >
            {loading
              ? "Saving..."
              : !canUpdate
              ? "Cannot Update"
              : "Update Completion Status"}
          </Button>
        </div>
        
        {!canUpdate && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 my-3 sm:my-4">
            <div className="flex">
              <div className="ml-2 sm:ml-3">
                <p className="text-xs sm:text-sm text-yellow-700">
                  Completion status can only be updated after the appointment date.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <div className="py-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("isCompleted")}
                disabled={!canUpdate}
                className="mr-2"
              />
              <span>Completed</span>
            </label>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Actual Start Time
              </label>
              <input
                type="datetime-local"
                {...register("actualStartTime")}
                disabled={!canUpdate}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Actual Finish Time
              </label>
              <input
                type="datetime-local"
                {...register("actualFinishTime")}
                disabled={!canUpdate}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Actual Hours
              </label>
              <input
                type="number"
                step="0.01"
                {...register("actualHours")}
                disabled={true}
                className="w-full p-2 border rounded-md bg-gray-50"
                placeholder="Calculated automatically"
              />
              <p className="text-xs text-gray-500 mt-1">
                Calculated automatically based on start and finish times
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Final Charge (£)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("finalCharge")}
                disabled={true}
                className="w-full p-2 border rounded-md bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Based on greater of actual hours ({actualHours || 0}) or scheduled hours ({totalHours})
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="text-sm">
                <strong>Hourly Rate:</strong> £{hourlyRate}
              </div>
              <div className="text-sm">
                <strong>Scheduled Hours:</strong> {totalHours}
              </div>
              <div className="text-sm">
                <strong>Original Charge:</strong> £{appointment.charge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}