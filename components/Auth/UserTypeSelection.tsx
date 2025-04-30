"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building, Users, UserCircle, ArrowRight } from "lucide-react";

export default function UserTypeSelection() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedType) {
      // Map selection to role for the RegisterWithBg component
      let role = "USER";
      if (selectedType === "company") {
        role = "CLIENT";
      } else if (selectedType === "individual") {
        role = "INDIVIDUALCLIENT";
      } else if (selectedType === "worker") {
        role = "DOCTOR";
      }

      router.push(`/register/form?role=${role}`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="flex items-center group">
            <div className="text-sky-500 dark:text-neutral-300 text-4xl mr-3 group-hover:text-sky-700 transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-wide text-neutral-800 dark:text-neutral-100 group-hover:text-sky-500 transition-colors duration-200">
              SHIFTLY
            </span>
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-neutral-800 dark:text-neutral-100 mb-4">
            Get started
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Choose one of three user types
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Client Option */}
          <div
            className={`border rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
              selectedType === "company"
                ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 shadow-md"
                : "border-neutral-200 dark:border-neutral-700 hover:border-sky-300 dark:hover:border-sky-700"
            }`}
            onClick={() => setSelectedType("company")}
          >
            <div className="mb-6 p-3 rounded-full bg-neutral-100 dark:bg-neutral-800">
              <Building className="w-12 h-12 text-sky-500" />
            </div>
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
              I am a company client
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-center">
              Looking for healthcare workers for my facility
            </p>
            <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 text-center">
              <p>Please prepare to upload the following scanned document:</p>
              <ul className="list-disc list-inside">
                <li>Certificate of Employer&#39;s Liability</li>
              </ul>
            </div>
            <div className="mt-4">
              <input
                type="radio"
                id="company-client"
                name="user-type"
                className="sr-only"
                checked={selectedType === "company"}
                onChange={() => {}}
              />
              <label
                htmlFor="company-client"
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedType === "company"
                    ? "border-sky-500 bg-sky-500"
                    : "border-neutral-300 dark:border-neutral-600"
                }`}
              >
                {selectedType === "company" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </label>
            </div>
          </div>

          {/* Individual Client Option */}
          <div
            className={`border rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
              selectedType === "individual"
                ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 shadow-md"
                : "border-neutral-200 dark:border-neutral-700 hover:border-sky-300 dark:hover:border-sky-700"
            }`}
            onClick={() => setSelectedType("individual")}
          >
            <div className="mb-6 p-3 rounded-full bg-neutral-100 dark:bg-neutral-800">
              <UserCircle className="w-12 h-12 text-sky-500" />
            </div>
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
              I am an individual client
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-center">
              Looking for healthcare workers for personal care
            </p>
            <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 text-center">
              <p>Please prepare to upload the following scanned document:</p>
              <ul className="list-disc list-inside">
                <li>Proof of address (e.g., your latest utility bill)</li>
              </ul>
            </div>
            <div className="mt-4">
              <input
                type="radio"
                id="individual-client"
                name="user-type"
                className="sr-only"
                checked={selectedType === "individual"}
                onChange={() => {}}
              />
              <label
                htmlFor="individual-client"
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedType === "individual"
                    ? "border-sky-500 bg-sky-500"
                    : "border-neutral-300 dark:border-neutral-600"
                }`}
              >
                {selectedType === "individual" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </label>
            </div>
          </div>

          {/* Worker Option */}
          <div
            className={`border rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
              selectedType === "worker"
                ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 shadow-md"
                : "border-neutral-200 dark:border-neutral-700 hover:border-sky-300 dark:hover:border-sky-700"
            }`}
            onClick={() => setSelectedType("worker")}
          >
            <div className="mb-6 p-3 rounded-full bg-neutral-100 dark:bg-neutral-800">
              <Users className="w-12 h-12 text-sky-500" />
            </div>
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
              I am a worker
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-center">
              Looking for flexible healthcare work opportunities
            </p>
            <div className="mt-4">
              <input
                type="radio"
                id="worker"
                name="user-type"
                className="sr-only"
                checked={selectedType === "worker"}
                onChange={() => {}}
              />
              <label
                htmlFor="worker"
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedType === "worker"
                    ? "border-sky-500 bg-sky-500"
                    : "border-neutral-300 dark:border-neutral-600"
                }`}
              >
                {selectedType === "worker" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`px-8 py-4 rounded-xl text-base font-medium flex items-center gap-2 transition-all duration-200 ${
              selectedType
                ? "bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-600 hover:to-sky-500 text-white shadow-sm hover:shadow-md"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
