import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { getTimestampFromOrderId } from "../utils/sound";

export function OrderTimer({ id }: { id: string }) {
  const [elapsed, setElapsed] = useState("");
  const [isDelayed, setIsDelayed] = useState(false);

  useEffect(() => {
    const timestamp = getTimestampFromOrderId(id);

    const updateTimer = () => {
      const diffSecs = Math.floor((Date.now() - timestamp) / 1000);
      const minutes = Math.floor(diffSecs / 60);
      const seconds = diffSecs % 60;
      setElapsed(`${minutes}:${seconds.toString().padStart(2, "0")} น.`);
      setIsDelayed(minutes >= 10);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div
      className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border font-mono font-bold text-[11px] tracking-wider transition ${
        isDelayed
          ? "text-red-600 bg-red-50 border-red-200 animate-pulse"
          : "text-[#5a6e7a] bg-[#f8fafc] border-slate-200/80"
      }`}
    >
      <Clock size={10} className={isDelayed ? "text-red-500" : "text-[#5a6e7a]"} />
      <span>{elapsed}</span>
    </div>
  );
}
