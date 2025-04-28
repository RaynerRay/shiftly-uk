"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInputProps } from "@/types/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Cross, AlertCircle, Mail, Lock, ArrowRight } from "lucide-react";

interface LoginFormProps {
  returnUrl: string;
}

export default function LoginFormWithBg({ returnUrl }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<LoginInputProps>();

  async function onSubmit(data: LoginInputProps) {
    try {
      setIsLoading(true);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (loginData?.error) {
        setIsLoading(false);
        toast.error("Sign-in error: Check your credentials");
        setShowNotification(true);
      } else {
        setShowNotification(false);
        reset();
        setIsLoading(false);
        toast.success("Login Successful");
        router.push(returnUrl);
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      toast.error("It seems something is wrong with your network");
    }
  }

  return (
    <div className="w-full lg:grid h-screen lg:min-h-[800px] lg:grid-cols-2 relative bg-neutral-50 dark:bg-neutral-900">
      {/* Left Section - Form */}
      <div className="flex items-center justify-center py-16 lg:py-20 px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[500px] grid gap-8">
          <div className="absolute top-8 left-8">
            <Link href="/" className="flex items-center group">
              <div className="text-neutral-700 dark:text-neutral-300 text-4xl mr-3 group-hover:text-sky-500 transition-colors duration-200">
                <Cross />
              </div>
              <span className="text-2xl font-extrabold tracking-wide text-sky-500 dark:text-neutral-100 group-hover:text-sky-700 transition-colors duration-200">
                SHIFTLY
              </span>
            </Link>
          </div>
          
          <div className="grid gap-4 text-center lg:text-left mt-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-neutral-800 dark:text-neutral-100">
              Welcome back
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Sign in to <span className="font-semibold text-sky-500">Shiftly</span> to continue your journey
            </p>
          </div>

          <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
            {showNotification && (
              <div className="flex items-center p-4 text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="font-medium ml-2">Sign-in error!</span> Please check your credentials.
              </div>
            )}
            
            <div className="grid gap-2">
              <label className="text-base font-medium text-neutral-700 dark:text-neutral-300 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-neutral-500 dark:text-neutral-400" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className="h-14 w-full text-base px-5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-base font-medium text-neutral-700 dark:text-neutral-300 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-neutral-500 dark:text-neutral-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••••"
                  {...register("password")}
                  className="h-14 w-full text-base px-5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              {/* <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 font-medium">
                  Forgot password?
                </Link>
              </div> */}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="h-14 text-base font-medium rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-600 hover:to-sky-500 text-white mt-2 flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* <div className="mt-2">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-neutral-200 dark:border-neutral-700"></div>
              <span className="flex-shrink mx-4 text-neutral-500 dark:text-neutral-400 text-sm">or continue with</span>
              <div className="flex-grow border-t border-neutral-200 dark:border-neutral-700"></div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button className="h-12 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
              <button className="h-12 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors duration-200">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </button>
            </div>
          </div> */}

          <div className="text-center text-neutral-600 dark:text-neutral-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200">
              Create account
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden lg:block bg-gradient-to-br from-neutral-100 to-sky-50 dark:from-neutral-800 dark:to-sky-900/30">
  <div className="h-full w-full flex items-center justify-center p-12">
    <div className="max-w-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
          Shiftly is changing the face of healthcare staffing
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          Healthcare providers across the UK are turning to Shiftly for fast, reliable, and qualified staff—on demand.
        </p>
      </div>
      <div className="relative bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-xl">
        <div className="absolute -top-3 -left-3 bg-sky-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          TESTIMONIAL
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 italic mb-4">
          “Since partnering with Shiftly, our staffing gaps have decreased dramatically. The platform is intuitive, the professionals are top-notch, and the response time is outstanding. It’s become an essential part of our daily operations.”
        </p>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
          <div className="ml-3">
            <div className="font-medium text-neutral-800 dark:text-neutral-200">
              Olivia Baker
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Staffing Manager, St. Andrews Care Group
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}