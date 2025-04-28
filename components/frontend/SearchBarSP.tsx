"use client";

import { ChevronDown, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { locations } from '../../lib/locations';

interface OptionType {
  value: string;
  label: string;
}

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [profession, setProfession] = useState<string>("careWorker");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const professions = [
    { value: "careWorker", label: "Care Worker" },
    { value: "nurse", label: "Nurse" },
    { value: "adultSocialWorker", label: "Adult Social Worker" },
    { value: "childrenSocialWorker", label: "Chidren Social Worker" },
  ];

  const filteredOptions = locations.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option: OptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSearch = () => {
    if (selectedOption) {
      router.push(`/search?city=${selectedOption.value}&profession=${profession}`);
    } else {
      // alert("Please select a location");
    }
  };

  useEffect(() => {
    // Check if document is defined before accessing it
    if (typeof document === 'undefined') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between z-10 relative bg-gradient-to-r from-sky-600 to-sky-700 p-8 rounded-lg mx-1">
        <div ref={dropdownRef} className="relative w-full md:w-5/12 mx-4 mb-4 md:mb-0">
          <div
            className="flex items-center bg-white border border-slate-200 shadow-sm gap-4 rounded-lg py-3 px-4 cursor-pointer hover:border-sky-300 transition-all duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <input
              type="text"
              placeholder={selectedOption ? selectedOption.label : "Select location..."}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              className="w-full outline-none bg-white text-gray-800 placeholder-gray-400 focus:placeholder-gray-300 transition-all duration-200"
            />
            <ChevronDown className={`ml-2 h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>

          {isOpen && (
            <ul className="absolute z-10 w-full bg-white border border-slate-200 shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    className="cursor-pointer p-3 hover:bg-sky-50 text-gray-700 transition-colors duration-150"
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className="p-3 text-gray-500">No results found</li>
              )}
            </ul>
          )}
        </div>

        <div className="relative w-full md:w-5/12 mb-4 md:mb-0 mr-0 md:mr-2">
          <select
            className="w-full appearance-none bg-white border border-slate-200 shadow-sm text-gray-800 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all duration-200"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          >
            <option value="" disabled>Select a profession</option>
            {professions.map((prof) => (
              <option key={prof.value} value={prof.value}>
                {prof.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>

        <button
  className="bg-orange-500 text-white w-full md:w-2/12 rounded-lg cursor-pointer flex items-center px-4 justify-center py-3 hover:bg-orange-600 transition-colors duration-200 shadow-md font-medium"
  onClick={handleSearch}
>
  <Search className="mr-2 h-5 w-5" />
  Search
</button>

      </div>
    </div>
  );
}