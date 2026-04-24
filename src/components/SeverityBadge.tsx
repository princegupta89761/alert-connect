import type { Severity } from "@/data/alerts";
import { cn } from "@/lib/utils";

const map: Record<Severity, { label: string; cls: string; dot: string }> = {
  high: {
    label: "Emergency",
    cls: "bg-emergency/10 text-emergency border-emergency/30",
    dot: "bg-emergency animate-blink",
  },
  medium: {
    label: "Warning",
    cls: "bg-warning/10 text-warning border-warning/30",
    dot: "bg-warning",
  },
  low: {
    label: "Advisory",
    cls: "bg-safe/10 text-safe border-safe/30",
    dot: "bg-safe",
  },
};

export const SeverityBadge = ({ severity, className }: { severity: Severity; className?: string }) => {
  const s = map[severity];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider",
        s.cls,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
};
