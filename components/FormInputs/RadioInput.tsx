import { cn } from "@/lib/utils";
import React from "react";

type RadioInputProps = {
  className?: string;
  name: string;
  title: string;
  register: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  errors: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  radioOptions: RadioOption[];
  disabled?: boolean;
};

export type RadioOption = {
  value: string;
  label: string;
};

export default function RadioInput({
  className = "col-span-full",
  name,
  title,
  register,
  errors,
  radioOptions,
  disabled = false,
}: RadioInputProps) {
  return (
    <div className={cn("grid gap-6", className)}>
      <h3 className={cn("font-normal", disabled ? "text-gray-400" : "text-gray-900 dark:text-white")}>
        {title}
      </h3>
      <ul className={cn(
        "items-center w-full text-sm font-medium bg-white border rounded-lg sm:flex",
        disabled 
          ? "text-gray-400 border-gray-200 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-400" 
          : "text-gray-900 border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      )}>
        {radioOptions.map((item, i) => {
          return (
            <li
              key={i}
              className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
            >
              <div className="flex items-center ps-3">
                <input
                  {...register(`${name}`, { required: true })}
                  name={`${name}`}
                  id={item.value}
                  type="radio"
                  value={item.value}
                  disabled={disabled}
                  className={cn(
                    "w-4 h-4 bg-gray-100 border-gray-300 focus:ring-2 dark:bg-gray-600 dark:border-gray-500",
                    disabled
                      ? "text-gray-400 focus:ring-gray-400 cursor-not-allowed opacity-60"
                      : "text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700"
                  )}
                />
                <label
                  htmlFor={item.value}
                  className={cn(
                    "w-full py-3 ms-2 text-sm font-medium",
                    disabled
                      ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "text-gray-900 dark:text-gray-300"
                  )}
                >
                  {item.label}{" "}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      {errors[`${name}`] && !disabled && (
        <span className="text-red-600 text-sm">{title} is required</span>
      )}
    </div>
  );
}