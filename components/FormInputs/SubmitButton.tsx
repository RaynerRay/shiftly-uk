"use client";

import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  isLoading: boolean;
  loadingTitle?: string;
  className?: string;
};

export default function SubmitButton({
  title,
  isLoading,
  loadingTitle = "Processing...",
  className = "",
}: Props) {
  const baseClass = "flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200";
  const defaultStyle = "bg-sky-500 hover:bg-sky-600 text-white py-2 px-6";
  
  const buttonClass = className ? `${baseClass} ${className}` : `${baseClass} ${defaultStyle}`;

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={buttonClass}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {isLoading ? loadingTitle : title}
    </button>
  );
}