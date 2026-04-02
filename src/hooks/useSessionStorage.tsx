import { useState, useEffect } from 'react';

export default function useSessionStorage<T>(key: string, initialValue: T) {
  // 1. Initialize state
  const [value, setValue] = useState<T>(() => {
    // Check if we are in the browser to avoid Next.js SSR errors
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (err) {
      console.warn(`Error reading sessionStorage key "${key}":`, err);
      return initialValue;
    }
  });

  // 2. Sync to storage whenever value changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.warn(`Error setting sessionStorage key "${key}":`, err);
      }
    }
  }, [key, value]);

  return [value, setValue] as const;
}