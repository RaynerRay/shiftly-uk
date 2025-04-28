"use client";
import { AppointmentProps, DoctorDetail } from "@/types/types";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getDayFromDate } from "@/utils/getDayFromDate";
import { getLongDate } from "@/utils/getLongDate";
import { Loader2, MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter} from "next/navigation";
import TextInput from "./FormInputs/TextInput";
import RadioInput from "./FormInputs/RadioInput";
import { TextAreaInput } from "./FormInputs/TextAreaInput";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Appointment, DoctorProfile } from "@prisma/client";
import FrontDoctorDetails from "./FrontDoctorDetails";
import { createAppointment } from "@/actions/appointments";
import { platformPercentage } from "@/lib/constants";
import { generateAppointmentReference } from "@/utils/generateReference";

export default function DoctorDetails({
  doctor,
  appointment,
  doctorProfile,
}: {
  doctor: DoctorDetail;
  appointment: Appointment | null;
  doctorProfile: DoctorProfile | null | undefined;
}) {
  const [isActive, setIsActive] = useState("availability");
  const { data: session } = useSession();
  const patient = session?.user;
  const [step, setStep] = useState(1);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [totalCost, setTotalCost] = useState(0);
  const [baseAmount, setBaseAmount] = useState(0);
  
  const day = getDayFromDate(date?.toDateString());
  const longDate = getLongDate(date!.toDateString());
  const times = doctor.doctorProfile?.availability?.[day] ?? null;
  const hourlyRate = doctor.doctorProfile?.hourlyWage ?? 0;
  
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const router = useRouter();
  // const params = useSearchParams();

  // Function to disable past dates
  const disablePastDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };


 // Function to convert time string to minutes for comparison
const convertTimeToMinutes = (time: string): number => {
  const [timeStr, period] = time.split(/(?=[ap]m)/i);
  let [hours, minutes] = timeStr.split(':').map(Number);
  
  // If minutes is undefined (because there's no colon in the time), set it to 0
  if (isNaN(minutes)) minutes = 0;
  
  // Convert to 24-hour format
  if (period.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  } else if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }
  
  return hours * 60 + minutes;
};

// Function to check if times are consecutive
const areTimesConsecutive = (times: string[], newTime: string): boolean => {
  if (times.length === 0) return true;
  
  const sortedTimes = [...times].sort((a, b) => 
    convertTimeToMinutes(a) - convertTimeToMinutes(b)
  );
  
  const newTimeMinutes = convertTimeToMinutes(newTime);
  const earliestTime = convertTimeToMinutes(sortedTimes[0]);
  const latestTime = convertTimeToMinutes(sortedTimes[sortedTimes.length - 1]);
  
  // Check if the new time is one hour before the earliest or one hour after the latest
  return (
    Math.abs(newTimeMinutes - earliestTime) === 60 || 
    Math.abs(newTimeMinutes - latestTime) === 60
  );
};

// Updated time selection handler
const handleTimeSelection = (time: string) => {
  if (selectedTimes.includes(time)) {
    // If removing a time, make sure remaining times stay consecutive
    const remainingTimes = selectedTimes.filter(t => t !== time);
    
    // If we're left with 0 or 1 times, that's always valid
    if (remainingTimes.length <= 1) {
      setSelectedTimes(remainingTimes);
      return;
    }
    
    // Sort the remaining times
    const sortedTimes = [...remainingTimes].sort((a, b) => 
      convertTimeToMinutes(a) - convertTimeToMinutes(b)
    );
    
    // Check if all remaining times are consecutive
    let allConsecutive = true;
    for (let i = 1; i < sortedTimes.length; i++) {
      const prevTime = convertTimeToMinutes(sortedTimes[i-1]);
      const currTime = convertTimeToMinutes(sortedTimes[i]);
      if (Math.abs(currTime - prevTime) !== 60) {
        allConsecutive = false;
        break;
      }
    }
    
    if (allConsecutive) {
      setSelectedTimes(remainingTimes);
    } else {
      toast.error("Removing this time would break consecutive selection");
    }
  } else {
    // Adding a new time
    if (selectedTimes.length === 0) {
      // First selection is always valid
      setSelectedTimes([time]);
    } else {
      // Check if the new time would be consecutive with existing selections
      if (areTimesConsecutive(selectedTimes, time)) {
        const newTimes = [...selectedTimes, time].sort((a, b) => 
          convertTimeToMinutes(a) - convertTimeToMinutes(b)
        );
        setSelectedTimes(newTimes);
      } else {
        toast.error("Please select consecutive time slots");
      }
    }
  }
};

  // Calculate total cost whenever selected times change
 
  useEffect(() => {
    const numberOfHours = selectedTimes.length;
    const baseAmount = numberOfHours * hourlyRate;
    setTotalCost( baseAmount + (baseAmount * platformPercentage ) );
  }, [selectedTimes, hourlyRate]);
  console.log(baseAmount)
  useEffect(() => {
    const numberOfHours = selectedTimes.length;
    setBaseAmount( numberOfHours * hourlyRate);
  }, [selectedTimes, hourlyRate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentProps>({
    defaultValues: {
      email: appointment?.email || "",
      firstName: appointment?.firstName || patient?.name?.split(" ")[0],
      phone: appointment?.phone ?? "",
      lastName: appointment?.lastName || patient?.name?.split(" ")[1],
      location:  "",
      gender: appointment?.gender ?? "",
    },
  });

  async function onSubmit(data: AppointmentProps) {
    if (selectedTimes.length === 0) {
      toast.error("Please select at least one time slot");
      return;
    }

    // Generate a unique reference for the appointment
    const reference = generateAppointmentReference(doctor.name);

    data.appointmentDate = date;
    data.appointmentFormattedDate = longDate;
    data.appointmentTime = selectedTimes.join(", "); // Join all selected times
    data.doctorId = doctor.id;
    data.charge = totalCost; // Use calculated total cost
    data.patientId = patient?.id ?? "";
    data.doctorName = doctor.name;
    data.totalHours = selectedTimes.length;
    data.reference = reference; // Add the generated reference

    try {
      setLoading(true);
    
      const res = await createAppointment(data);
      console.log(res)
      setLoading(false);
      toast.success("Appointment Created Successfully");
      router.push("/dashboard/user/appointments");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  function initiateAppointment() {
    if (patient?.id) {
      if (selectedTimes.length === 0) {
        toast.error("Please select at least one time slot");
        return;
      }
      setStep((curr) => curr + 1);
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      {step === 1 ? (
        <div className="">
          <div className="flex items-center justify-between">
            
            <button
              onClick={() => setIsActive("details")}
              className={
                isActive === "details"
                  ? "py-4 px-8 w-full uppercase tracking-widest bg-sky-600 text-white"
                  : "border border-gray-200 bg-slate-100 w-full text-slate-800 text-sm sm:text-md py-4 px-8 uppercase tracking-widest"
              }
            >
              Details
            </button>
            <button
              onClick={() => setIsActive("availability")}
              className={
                isActive === "availability"
                  ? "py-4 px-8 w-full bg-sky-600 text-white uppercase tracking-widest"
                  : "border border-gray-200 bg-slate-100 w-full text-slate-800 text-sm sm:text-md py-4 px-8 uppercase tracking-widest"
              }
            >
              Availability
            </button>
          </div>
          <div className="py-8 px-6">
            {isActive === "availability" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="">
                <Calendar
  value={date}
  onSelect={(newDate) => setDate(newDate)}
  disabled={disablePastDates}
  className="rounded-md border"
/>
                </div>
                <div className="">
                  <span className="text-sky-600 text-sm">
                    You have selected
                  </span>
                  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {longDate}
                  </h2>
                  {times && times.length > 0 && (
                    <div className="py-3 grid grid-cols-4 gap-2">
                      {times.map((item, i) => (
                        <Button
                          key={i}
                          onClick={() => handleTimeSelection(item)}
                          variant={
                            selectedTimes.includes(item) ? "default" : "outline"
                          }
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  )}
                  {selectedTimes.length > 0 && (
                    <div className="mt-4 p-4 bg-sky-50 rounded-lg">
                      <p className="text-sky-800 font-medium">Selected Times: {selectedTimes.join(", ")}</p>
                      <p className="text-sky-800 font-medium">Duration: {selectedTimes.length} hour(s)</p>
                      {/* <p className="text-sky-800 font-medium">Base Amount {baseAmount}</p>
                      <p className="text-sky-800 font-medium">Total Cost: £{totalCost}</p> */}
                    </div>
                  )}
                  <div className="py-4">
                    <button
                      onClick={initiateAppointment}
                      type="button"
                      className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                    >
                      Book Appointment
                      <MoveRight className="w-6 h-6 ml-3" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <FrontDoctorDetails doctorProfile={doctorProfile} />
              </div>
            )}
          </div>
        </div>
      ) : (
          <div className="p-8 ">
      
          <form
            className=" py-4 px-4  mx-auto "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="scroll-m-20 border-b pb-3 mb-6 text-3xl font-normal tracking-tight first:mt-0 ">
              Tell <span className="font-semibold text-sky-900">{doctor.doctorProfile?.firstName} </span> a few details about the work
            </h2>
            {step === 2 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6 ">
                  <TextInput
                    label="Patient First Name"
                    register={register}
                    name="firstName"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter First Name"
                  />
                  <TextInput
                    label="Patient Last Name"
                    register={register}
                    name="lastName"
                    className="col-span-1"
                    errors={errors}
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <TextInput
                    label="Phone Number"
                    register={register}
                    name="phone"
                    errors={errors}
                    className="col-span-1"
                    placeholder="Enter Phone Number"
                  />
                  <TextInput
                    label="Email Address"
                    register={register}
                    name="email"
                    className="col-span-1"
                    errors={errors}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                 
                   <TextInput
                    label="Company Name (optional)"
                    register={register}
                    name="companyName"
                    className="col-span-1"
                    errors={errors}
                    placeholder="Enter Company Name"
                  />
                </div>
                <div className="mt-8 flex justify-between gap-4 items-center">
                  <Button
                  
                    type="button"
                    className=" bg-sky-500 text-white"
                    onClick={() => setStep((currStep) => currStep - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    className=" bg-sky-600 text-white"
                    onClick={() => setStep((currStep) => currStep + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="">
                  <TextInput
                    label="Work Site"
                    register={register}
                    name="location"
                    errors={errors}
                    className="col-span-1 my-2"
                    placeholder="Enter work address"
                  />
                   <RadioInput
                    title="Patient Gender"
                    register={register}
                    name="gender"
                    errors={errors}
                    className="col-span-1"
                    radioOptions={genderOptions}
                  />
                 
                </div>
                <TextAreaInput
                  label="Description Of The Work"
                  register={register}
                  name="appointmentReason"
                  errors={errors}
                  placeholder="Enter work description"
                />

                {/* <MultipleFileUpload
                  label="Medical Documents"
                  files={medicalDocs}
                  setFiles={setMedicalDocs}
                  endpoint="patientMedicalFiles"
                /> */}
                <div className="mt-8 flex justify-between gap-4 items-center">
                  <Button
                    variant={"outline"}
                    className="text-white bg-sky-500"
                    type="button"
                    onClick={() => setStep((currStep) => currStep - 1)}
                  >
                    Previous
                  </Button>
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving please wait ...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className=" bg-sky-600 text-white"
                      onClick={() => setStep((currStep) => currStep + 1)}
                    >
                      Complete Appointment
                    </Button>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}