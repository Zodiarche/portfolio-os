import { useEffect, useState } from "react";
import type { UseClockReturn } from "../types/hooks";

const LOCALE = "fr-FR";

/** Provides formatted time and date strings, updated every second. */
export function useClock(): UseClockReturn {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    time: now.toLocaleTimeString(LOCALE, { hour: "2-digit", minute: "2-digit" }),
    date: now.toLocaleDateString(LOCALE, { day: "2-digit", month: "2-digit", year: "numeric" }),
  };
}
