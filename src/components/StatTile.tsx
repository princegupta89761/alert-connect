import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export const StatTile = ({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  tone?: "default" | "emergency" | "warning" | "safe";
}) => {
  const tones = {
    default: "text-foreground",
    emergency: "text-emergency",
    warning: "text-warning",
    safe: "text-safe",
  };
  const accent = {
    default: "bg-muted text-muted-foreground",
    emergency: "bg-emergency/10 text-emergency",
    warning: "bg-warning/10 text-warning",
    safe: "bg-safe/10 text-safe",
  };
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card-soft">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className={cn("flex h-7 w-7 items-center justify-center rounded-md", accent[tone])}>
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className={cn("mt-2 text-3xl font-bold tracking-tight font-mono", tones[tone])}>
        {value}
      </div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
};
