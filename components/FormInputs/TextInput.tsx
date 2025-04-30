"use client";

import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  register: UseFormRegister<any>;  // eslint-disable-line @typescript-eslint/no-explicit-any
  errors?: FieldErrors;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const TextInput = ({
  label,
  name,
  register,
  errors,
  type = "text",
  placeholder,
  required = false,
  className,
}: Props) => {
  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-800"
      />
      {errors && errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default TextInput;