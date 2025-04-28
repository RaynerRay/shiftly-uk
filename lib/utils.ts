import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function separateAndCapitalise(str: string): string {
  const separated: string = str.replace(/([A-Z])/g, ' $1').trim();
  return separated.charAt(0).toUpperCase() + separated.slice(1);
}

export const separateByUnderScore = (str: string): string => {
  return str
    .split('_') // Split the string by underscores
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(' '); // Join the words back together with spaces
};
