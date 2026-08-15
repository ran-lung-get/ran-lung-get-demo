import { useState, useMemo } from "react";

export function useStoreStatus() {
  const [simulateClosed, setSimulateClosed] = useState(false);
  const [bypassRealClosed, setBypassRealClosed] = useState(false);

  // Business Hours logic: Open Sun - Fri 08:00 - 21:00, Closed on Saturdays
  const isRealClosed = useMemo(() => {
    try {
      const now = new Date();
      const thTimeStr = now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
      const thTime = new Date(thTimeStr);

      const day = thTime.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const hour = thTime.getHours();

      // Closed on Saturday (day 6)
      if (day === 6) {
        return true;
      }

      // Sun - Fri: Open from 08:00 to 21:00 (closed if hour < 8 or hour >= 21)
      if (hour < 8 || hour >= 21) {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }, []);

  const isCurrentlyClosed = (isRealClosed && !bypassRealClosed) || simulateClosed;
  const isStoreClosed = (isRealClosed && !bypassRealClosed) || simulateClosed;

  return {
    isStoreClosed,
    isCurrentlyClosed,
    isRealClosed,
    simulateClosed,
    setSimulateClosed,
    bypassRealClosed,
    setBypassRealClosed,
  };
}
