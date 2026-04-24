import { Megaphone } from "lucide-react";
import { mockAlerts } from "@/data/alerts";

export const AlertTicker = () => {
  const items = mockAlerts.filter((a) => a.severity !== "low" && a.status === "verified");
  return (
    <div className="flex items-stretch overflow-hidden border-y border-emergency/30 bg-emergency/5">
      <div className="flex shrink-0 items-center gap-2 bg-gradient-emergency px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-emergency-foreground">
        <Megaphone className="h-3.5 w-3.5 animate-blink" />
        Live Broadcast
      </div>
      <div className="flex-1 overflow-hidden whitespace-nowrap py-2">
        <div className="inline-block animate-ticker font-mono text-xs text-foreground/90">
          {items.map((a, i) => (
            <span key={a.id} className="mx-8">
              <span className="text-emergency font-bold">●</span>{" "}
              <span className="font-bold">{a.title}</span>
              <span className="text-muted-foreground"> — {a.location}</span>
              {i < items.length - 1 && <span className="ml-8 text-border">|</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
