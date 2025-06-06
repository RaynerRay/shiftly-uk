"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AlertCircle } from "lucide-react";
// import { updateUserById } from "@/actions/users";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import SubmitButton from "../FormInputs/SubmitButton";

import { Input } from "../ui/input";

import { getApplicationByTrack } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";



export default function TrackingForm() {
  const { setSavedDBData } = useOnboardingContext();
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const router = useRouter();
  const FormSchema = z.object({
    trackingNumber: z.string().min(2, {
      message: "Username must be at least 10 characters.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trackingNumber: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      //Make Request
      const res = await getApplicationByTrack(data.trackingNumber);
      // SAVE THIS TO THE CONTEXT API
      setSavedDBData(res?.data);
      if (res?.status === 404) {
        setShowNotification(true);
        setLoading(false);
      }
      if (res?.status === 200) {
        toast.success("Redirecting you");
        // setUserId(res.data?.userId!);
        // setPage(res.data?.page!);
        // setTrackingSuccessful(true);
        setLoading(false);
        router.push(`/onboarding/${res.data?.userId}?page=${res.data?.page}`);
      } else {
        throw new Error("Something Went wrong");
      }
      //OnBoarding Page
    } catch (error) {
      toast.error("Something Went wrong, Try Again");
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      {showNotification && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
          <div>
            <span className="font-medium">Wrong Tracking Number!</span> Please
            Check the number and Enter again
          </div>
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Number</FormLabel>
              <FormControl>
                <Input placeholder="eg NKM3PDNDDG" {...field} />
              </FormControl>
              <FormDescription>
                {/* This is your public display name. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          title="Submit to Resume"
          isLoading={loading}
          loadingTitle="Fetching please wait..."
        />
      </form>
    </Form>
  );
}