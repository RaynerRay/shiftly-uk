import {
  createAvailability,
  updateAvailabilityById,
} from "@/actions/onboarding";
// import SubmitButton from "@/components/FormInputs/SubmitButton";
// import { Button } from "@/components/ui/button";
// import { DoctorProfile } from "@prisma/client";
// import { Loader, Plus, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SelectedTimes from "./SelectedTimes";
import { timesArray } from "@/config/constants";
import { prismaClient } from "@/lib/db";

export default function Monday({
  profile,
  day,
}: {
  profile: any; // eslint-disable-line
  day: string;
}) {
  let initialData: string[] = ["7:00 AM"];
  if (profile && profile?.availability) {
    initialData = profile?.availability[day] || [];
  }
  const availability = profile?.availability || "";

  const [selectedTimes, setSelectedTimes] = useState(initialData);
  console.log(selectedTimes, profile?.id);
  function handleAddTime(time: string) {
    if (!selectedTimes.includes(time)) {
      setSelectedTimes((prevTimes) => [...prevTimes, time]);
    } else {
      toast.error(`${time} already added!`);
    }
  }
  function handleRemoveTime(index: number) {
    const updatedTimes = selectedTimes.filter((_, i) => i !== index);
    setSelectedTimes(updatedTimes);
  }
  function handleAddAll() {
    setSelectedTimes([...timesArray]);
  }
  function clearAll() {
    setSelectedTimes([]);
  }
  async function handleSubmit() {
    setLoading(true);
    try {
      if (profile?.id && availability?.id) {
        // If availability already exists, update it
        const data = {
          monday: selectedTimes,
          doctorProfileId: profile.id,
        };
        await updateAvailabilityById(availability?.id, data);
        setLoading(false);
        toast.success("Settings Updated Successfully");
      } else if (profile?.id) {
        // Check if availability exists for this doctorProfileId
        const existingAvailability = await prismaClient.availability.findUnique({
          where: {
            doctorProfileId: profile.id,
          },
        });
  
        if (existingAvailability) {
          // If found, update it
          const data = {
            monday: selectedTimes,
            doctorProfileId: profile.id,
          };
          await updateAvailabilityById(existingAvailability.id, data);
          setLoading(false);
          toast.success("Settings Updated Successfully");
        } else {
          // If not found, create new
          const data = {
            monday: selectedTimes,
            doctorProfileId: profile.id,
          };
          await createAvailability(data);
          setLoading(false);
          toast.success("Settings Updated Successfully");
        }
      } else {
        // console.log("Profile id Not set");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  
  const [loading, setLoading] = useState(false);
  return (
    <SelectedTimes
      handleAddAll={handleAddAll}
      timesArray={timesArray}
      handleAddTime={handleAddTime}
      selectedTimes={selectedTimes}
      loading={loading}
      handleSubmit={handleSubmit}
      clearAll={clearAll}
      handleRemoveTime={handleRemoveTime}
      day={day}
    />
  );
}
