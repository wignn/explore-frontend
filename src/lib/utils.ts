import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const normalizeTitle = (title: string) => {
  return title
    .replace(/\u200B/g, "")
    .trim() 
    .replaceAll(" ", "-");
};


export const denormalizeTitle = (normalizedTitle: string) => {
  return decodeURIComponent(normalizedTitle.replace(/-/g, " "));
};

