import {
  createAvailability,
  updateAvailabilityById,
} from "@/actions/onboarding";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SelectedTimes from "./SelectedTimes";
import { timesArray } from "@/config/constants";

export default function Monday({
  profile,
  day,
}: {
  profile: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  day: string;
}) {
  // Create lowercase day name for database field (monday, tuesday, etc.)
  const dayField = day.toLowerCase();
  
  let initialData: string[] = [];
  if (profile && profile?.availability) {
    initialData = profile?.availability[dayField] || [];
  }
  const availability = profile?.availability || "";

  const [selectedTimes, setSelectedTimes] = useState(initialData);
  
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
  
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit() {
    if (!profile?.id) {
      toast.error("Profile not found");
      return;
    }
    
    setLoading(true);
    try {
      // Create a data object with the dynamic day field
      const data = {
        [dayField]: selectedTimes,
        doctorProfileId: profile.id,
      };
      
      if (profile?.id && availability?.id) {
        // Update existing availability
        await updateAvailabilityById(availability?.id, data);
        toast.success("Settings Updated Successfully");
      } else if (profile?.id) {
        // Create new availability
        await createAvailability(data);
        toast.success("Settings Created Successfully");
      }
    } catch (error) {
      console.error("Error saving availability:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  
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