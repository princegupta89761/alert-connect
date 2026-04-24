import { Activity, Wifi, WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useEffect, useState } from "react";

export const StatusBar = () => {
  const online = useOnlineStatus();
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider">
      <span className="hidden items-center gap-1.5 text-muted-foreground sm:inline-flex">
        <Activity className="h-3 w-3 text-safe animate-blink" />
        System Operational
      </span>
      <span className="hidden text-muted-foreground md:inline">
        {time.toUTCString().slice(17, 25)} UTC
      </span>
      {online ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-safe/30 bg-safe/10 px-2 py-0.5 text-safe">
          <Wifi className="h-3 w-3" /> Online
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-2 py-0.5 text-warning">
          <WifiOff className="h-3 w-3" /> Offline Mode
        </span>
      )}
    </div>
  );
};
