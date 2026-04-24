import { BadgeCheck, Clock } from "lucide-react";
import type { AlertStatus } from "@/data/alerts";
import { cn } from "@/lib/utils";

export const VerificationBadge = ({
  status,
  count,
  className,
}: {
  status: AlertStatus;
  count: number;
  className?: string;
}) => {
  if (status === "verified") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full border border-safe/30 bg-safe/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-safe",
          className
        )}
      >
        <BadgeCheck className="h-3 w-3" />
        Verified · {count}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-warning",
        className
      )}
    >
      <Clock className="h-3 w-3" />
      Under Verification
    </span>
  );
};
