"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IconType } from "react-icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { updateUserById } from "@/actions/users";
import SubmitButton from "../FormInputs/SubmitButton";
import { UserRole } from "@prisma/client";

const FormSchema = z.object({
  token: z.string().min(6, {
    message: "Your Token must be 6 characters.",
  }),
});

// Custom Alert component with proper TypeScript interfaces
interface CustomAlertProps {
  children: React.ReactNode;
  icon?: IconType;
}

const CustomAlert = ({ children, icon: Icon }: CustomAlertProps) => {
  return (
    <div className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
      <div className="flex items-center">
        {Icon && <Icon className="flex-shrink-0 inline w-5 h-5 mr-3" />}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default function VerifyTokenForm({
  userToken,
  id,
  role,
}: {
  userToken: number | undefined;
  id: string;
  role: UserRole | undefined;
}) {
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const userInputToken = parseInt(data.token);
    if (userInputToken === userToken) {
      setShowNotification(false);
      //Update User
      try {
        await updateUserById(id);
        setLoading(false);
        toast.success("Account Verified");
        
        // Redirect based on user role
        if (role === "DOCTOR") {
          router.push(`/login?returnUrl=/onboarding`);
        } else if (role === "CLIENT") {
          router.push(`/login?returnUrl=/clientonboarding`);
        } else if (role === "INDIVIDUALCLIENT") {
          router.push(`/login?returnUrl=/individualonboarding`);
        } else {
          router.push("/login");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      setShowNotification(true);
      setLoading(false);
    }
    console.log(userInputToken);
  }

  return (
    <Form {...form}>
      {showNotification && (
        <CustomAlert icon={HiInformationCircle}>
          <span className="font-medium">Wrong Token!</span> Please Check the
          token and Enter again
        </CustomAlert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Token Here</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          title="Submit to Verify"
          isLoading={loading}
          loadingTitle="Verifying please wait..."
        />
      </form>
    </Form>
  );
}