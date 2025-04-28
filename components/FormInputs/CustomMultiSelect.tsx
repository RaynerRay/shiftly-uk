// "use client";
// import * as React from "react";

// export type SelectOption = {
//   value: string;
//   label: string;
// };

// type SelectInputProps = {
//   label: string;
//   optionTitle: string;
//   className?: string;
//   options: SelectOption[];
//   selectedOption: SelectOption[];
//   setSelectedOption: (options: SelectOption[]) => void;
// };

// export default function CustomMultiSelect({
//   label,
//   className = "sm:col-span-2",
//   optionTitle,
//   options = [],
//   selectedOption,
//   setSelectedOption,
// }: SelectInputProps) {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const dropdownRef = React.useRef<HTMLDivElement>(null);
//   const searchInputRef = React.useRef<HTMLInputElement>(null);

//   // Close dropdown when clicking outside
//   React.useEffect(() => {
//     // Only run on client-side
//     if (typeof document === 'undefined') return;
    
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Focus search input when dropdown opens
//   React.useEffect(() => {
//     if (isOpen && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [isOpen]);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//     setSearchTerm("");
//   };

//   const toggleOption = (option: SelectOption) => {
//     const isSelected = selectedOption.some((item) => item.value === option.value);
    
//     if (isSelected) {
//       setSelectedOption(selectedOption.filter((item) => item.value !== option.value));
//     } else {
//       setSelectedOption([...selectedOption, option]);
//     }
//   };

//   const removeOption = (option: SelectOption, e?: React.MouseEvent) => {
//     if (e) {
//       e.stopPropagation();
//     }
//     setSelectedOption(selectedOption.filter((item) => item.value !== option.value));
//   };

//   const filteredOptions = options.filter((opt) =>
//     opt.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const isOptionSelected = (option: SelectOption) => {
//     return selectedOption.some((item) => item.value === option.value);
//   };

//   return (
//     <div className={className}>
//       <label
//         htmlFor={label}
//         className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
//       >
//         {label}
//       </label>
//       <div className="mt-2 relative" ref={dropdownRef}>
//         <div
//           className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md min-h-10 px-3 py-1 cursor-pointer flex flex-wrap items-center gap-1"
//           onClick={toggleDropdown}
//           aria-labelledby={optionTitle}
//           role="button"
//           tabIndex={0}
//         >
//           {selectedOption.length === 0 ? (
//             <span className="text-gray-500 dark:text-gray-400 py-1.5">
//               {optionTitle}
//             </span>
//           ) : (
//             selectedOption.map((option) => (
//               <div
//                 key={option.value}
//                 className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded px-2 py-1 flex items-center text-sm"
//               >
//                 <span>{option.label}</span>
//                 <button
//                   type="button"
//                   className="ml-1 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
//                   onClick={(e) => removeOption(option, e)}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <line x1="18" y1="6" x2="6" y2="18"></line>
//                     <line x1="6" y1="6" x2="18" y2="18"></line>
//                   </svg>
//                 </button>
//               </div>
//             ))
//           )}
//           <div className="ml-auto flex-shrink-0">
//             <svg
//               className="h-5 w-5 text-gray-400"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>
//         </div>

//         {isOpen && (
//           <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md overflow-hidden border border-gray-300 dark:border-gray-700">
//             <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700">
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                 placeholder="Search options..."
//                 onClick={(e) => e.stopPropagation()}
//               />
//             </div>
//             <ul className="max-h-48 overflow-auto">
//               {filteredOptions.length > 0 ? (
//                 filteredOptions.map((option) => (
//                   <li
//                     key={option.value}
//                     className={`px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
//                       isOptionSelected(option) ? "bg-blue-50 dark:bg-blue-900/30" : ""
//                     }`}
//                     onClick={() => toggleOption(option)}
//                   >
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={isOptionSelected(option)}
//                         onChange={() => {}}
//                         className="h-4 w-4 text-blue-600 rounded"
//                       />
//                       <span className="ml-2">{option.label}</span>
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <li className="px-3 py-2 text-gray-500 dark:text-gray-400">
//                   No options found
//                 </li>
//               )}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }