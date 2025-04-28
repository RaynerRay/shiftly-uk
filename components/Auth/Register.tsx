"use client";
import { type RegisterInputProps } from "@/types/types";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createUser } from "@/actions/users";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Cross, User, Mail, Phone, Lock, ArrowRight, CheckCircle } from "lucide-react";

interface RegisterFormProps {
  role: string;
  plan: string;
}

export default function RegisterWithBg({ role = "USER", plan = "" }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputProps>();
  const router = useRouter();

  async function onSubmit(data: RegisterInputProps) {
    setIsLoading(true);
    data.role = role;
    data.plan = plan;
    try {
      const user = await createUser(data);
      if (user.status === 409) {
        setIsLoading(false);
        setEmailErr(user.error);
      } else if (user.status === 200) {
        setIsLoading(false);
        reset();
        toast.success("Account Created successfully");
        router.push(`/verify-account/${user.data?.id}`);
      } else {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <div className="w-full lg:grid h-screen lg:min-h-[800px] lg:grid-cols-2 relative bg-neutral-50 dark:bg-neutral-900">
      {/* Left Section - Form */}
      <div className="flex items-center justify-center py-16 lg:py-20 px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[500px] grid gap-8">
          <div className="absolute top-8 left-8">
            <Link href="/" className="flex items-center group">
              <div className="text-sky-500 dark:text-neutral-300 text-4xl mr-3 group-hover:text-sky-700 transition-colors duration-200">
                <Cross />
              </div>
              <span className="text-2xl font-extrabold tracking-wide text-neutral-800 dark:text-neutral-100 group-hover:text-sky-500 transition-colors duration-200">
                SHIFTLY
              </span>
            </Link>
          </div>
          
          <div className="grid gap-4 text-center lg:text-left mt-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-neutral-800 dark:text-neutral-100">
              Join Shiftly
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Create your account and start managing your schedule with <span className="font-semibold text-sky-500">Shiftly</span>
            </p>
          </div>

          <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <label className="text-base font-medium text-neutral-700 dark:text-neutral-300 flex items-center">
                <User className="w-4 h-4 mr-2 text-neutral-500 dark:text-neutral-400" />
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                {...register("fullName", { required: "Full name is required" })}
                className={`h-14 w-full text-base px-5 rounded-xl border ${
                  errors.fullName ? "border-red-300 dark:border-red-700" : "border-neutral-200 dark:border-neutral-700"
                } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 focus:border-transparent transition-all duration-200`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-base font-medium text-neutral-700 dark:text-neutral-300 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-neutral-500 dark:text-neutral-400" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email", { required: "Email is required" })}
                className={`h-14 w-full text-base px-5 rounded-xl border ${
                  errors.email || emailErr ? "border-red-300 dark:border-red-700" : "border-neutral-200 dark:border-neutral-700"
                } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 focus:border-transparent transition-all duration-200`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
              {emailErr && (
                <p className="text-red-500 text-sm mt-1">{emailErr}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-base font-medium text-neutral-700 dark:text-neutral-300 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-neutral-500 dark:text-neutral-400" />
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phone", { required: "Phone number is required" })}
                className={`h-14 w-full text-base px-5 rounded-xl border ${
                  errors.phone ? "border-red-300 dark:border-red-700" : "border-neutral-200 dark:border-neutral-700"
                } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 focus:border-transparent transition-all duration-200`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-base font-medium text-neutral-700 dark:text-neutral-300 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-neutral-500 dark:text-neutral-400" />
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••••"
                {...register("password", { required: "Password is required" })}
                className={`h-14 w-full text-base px-5 rounded-xl border ${
                  errors.password ? "border-red-300 dark:border-red-700" : "border-neutral-200 dark:border-neutral-700"
                } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 focus:border-transparent transition-all duration-200`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-start mt-2">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-neutral-300 rounded bg-neutral-50 focus:ring-3 focus:ring-sky-300 dark:bg-neutral-700 dark:border-neutral-600 dark:focus:ring-sky-600"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                I agree to the <Link href="/terms" className="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400">Terms of Service</Link> and <Link href="/privacy" className="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="h-14 text-base font-medium rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-600 hover:to-sky-500 text-white mt-4 flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-neutral-600 dark:text-neutral-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Features */}
      <div className="hidden lg:block bg-gradient-to-br from-neutral-100 to-sky-50 dark:from-neutral-800 dark:to-sky-900/30">
  <div className="h-full w-full flex items-center justify-center p-12">
    <div className="max-w-lg">
      <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">
        Welcome to Shiftly – Instant Staffing for UK Healthcare Providers
      </h2>

      <div className="space-y-6">
        <div className="flex items-start">
          <div className="mr-4 mt-1 text-sky-500">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-1">
              Quick Access to Professionals
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Instantly connect with qualified, vetted healthcare professionals ready to take shifts.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="mr-4 mt-1 text-sky-500">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-1">
              Real-Time Matching
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Automatically match professionals to shifts in real-time for seamless scheduling.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="mr-4 mt-1 text-sky-500">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-1">
              Seamless Experience
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Built for both providers and professionals, Shiftly makes staffing simple and efficient.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="mr-4 mt-1 text-sky-500">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-1">
              Verified Professionals
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Every healthcare worker on Shiftly is rigorously vetted for quality and reliability.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-md inline-flex items-center">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
        </div>
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">Join Our Network</span> and experience instant healthcare staffing today.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}