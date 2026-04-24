import { MapPin, Radio } from "lucide-react";
import type { EmergencyAlert } from "@/data/alerts";
import { SeverityBadge } from "./SeverityBadge";
import { VerificationBadge } from "./VerificationBadge";
import { timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";

const accent: Record<EmergencyAlert["severity"], string> = {
  high: "before:bg-emergency",
  medium: "before:bg-warning",
  low: "before:bg-safe",
};

export const AlertCard = ({ alert }: { alert: EmergencyAlert }) => {
  const isHigh = alert.severity === "high" && alert.status === "verified";
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card p-5 shadow-card-soft transition-all hover:shadow-lg animate-fade-in-up",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-1",
        accent[alert.severity],
        isHigh && "border-emergency/40"
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <SeverityBadge severity={alert.severity} />
        <VerificationBadge status={alert.status} count={alert.sources.length} />
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {alert.id}
        </span>
      </div>

      <h3 className={cn("mt-3 text-lg font-bold leading-tight", isHigh && "text-emergency")}>
        {alert.title}
        {isHigh && (
          <span className="ml-2 inline-block h-2 w-2 -translate-y-0.5 rounded-full bg-emergency align-middle animate-pulse-emergency" />
        )}
      </h3>

      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{alert.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 font-mono text-[11px]">
        <span className="inline-flex items-center gap-1 text-foreground/80">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          {alert.location}
        </span>
        <span className="inline-flex items-center gap-1 text-foreground/80">
          <Radio className="h-3.5 w-3.5 text-muted-foreground" />
          {alert.sources.join(" · ")}
        </span>
        <span className="ml-auto text-muted-foreground">{timeAgo(alert.timestamp)}</span>
      </div>
    </article>
  );
};
