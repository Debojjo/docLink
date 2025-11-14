import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Parse and stringify safely
export const parseStringify = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};

// Convert file to a URL
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// 🇮🇳 FORMAT DATE & TIME FOR INDIAN USERS
export const formatDateTime = (dateString: Date | string) => {
  const locale = "en-IN"; // 👈 Indian English locale
  const timeZone = "Asia/Kolkata"; // 👈 Indian Standard Time (IST)

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short",     // e.g., "Nov"
    day: "numeric",     // e.g., "11"
    year: "numeric",    // e.g., "2025"
    hour: "2-digit",    // e.g., "08"
    minute: "2-digit",  // e.g., "30"
    hour12: true,       // show AM/PM format
    timeZone,
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",   // e.g., "Tue"
    day: "2-digit",     // e.g., "11"
    month: "2-digit",   // e.g., "11"
    year: "numeric",    // e.g., "2025"
    timeZone,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",     // e.g., "11"
    month: "short",     // e.g., "Nov"
    year: "numeric",    // e.g., "2025"
    timeZone,
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",    // e.g., "08"
    minute: "2-digit",  // e.g., "30"
    hour12: true,
    timeZone,
  };

  return {
    dateTime: new Date(dateString).toLocaleString(locale, dateTimeOptions), // e.g., "11 Nov 2025, 8:30 PM"
    dateDay: new Date(dateString).toLocaleString(locale, dateDayOptions),   // e.g., "Tue, 11/11/2025"
    dateOnly: new Date(dateString).toLocaleString(locale, dateOptions),     // e.g., "11 Nov 2025"
    timeOnly: new Date(dateString).toLocaleString(locale, timeOptions),     // e.g., "8:30 PM"
  };
};

// Simple base64 encryption/decryption (for mild obfuscation)
export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}
