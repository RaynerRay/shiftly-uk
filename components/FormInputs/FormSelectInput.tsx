"use client";
import React, { useState, useRef, useEffect } from "react";

// Define types similar to original component
type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type Options = Option[];

type FormSelectInputProps = {
  options: Options;
  label: string;
  option: Option | null;
  setOption: (option: Option | null) => void;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
  isSearchable?: boolean;
};

export default function FormSelectInput({
  options,
  label,
  option,
  setOption,
  labelShown = true,
  isSearchable = true,
}: FormSelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    // Check if we're in a browser environment before using document
    if (typeof document === 'undefined') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && isSearchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isSearchable]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  const handleSelect = (selectedOption: Option) => {
    if (!selectedOption.disabled) {
      setOption(selectedOption);
      setIsOpen(false);
    }
  };

  const filteredOptions = isSearchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  return (
    <div className="">
      {labelShown && (
        <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900">
          Select {label}
        </h2>
      )}
      <div className="flex items-center space-x-2" ref={dropdownRef}>
        <div className="relative w-full">
          <button
            type="button"
            onClick={toggleDropdown}
            className="bg-white relative w-full cursor-default rounded-md border border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <span className="block truncate">
              {option ? option.label : `Select ${label}...`}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {isSearchable && (
                <div className="sticky top-0 z-10 bg-white px-2 py-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Search..."
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              <ul className="max-h-48 overflow-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <li
                      key={opt.value}
                      className={`relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 ${
                        opt.disabled
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-100"
                      } ${
                        option && option.value === opt.value ? "bg-blue-50" : ""
                      }`}
                      onClick={() => handleSelect(opt)}
                    >
                      <span className="block truncate font-normal">
                        {opt.label}
                      </span>
                      {option && option.value === opt.value && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500">
                    No options found
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}