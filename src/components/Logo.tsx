import { ShieldAlert } from "lucide-react";

export const Logo = ({ compact = false }: { compact?: boolean }) => (
  <div className="flex items-center gap-2.5">
    <div className="relative">
      <div className="absolute inset-0 rounded-md bg-emergency/30 blur-md" />
      <div className="relative flex h-9 w-9 items-center justify-center rounded-md bg-gradient-emergency shadow-emergency">
        <ShieldAlert className="h-5 w-5 text-emergency-foreground" strokeWidth={2.5} />
      </div>
    </div>
    {!compact && (
      <div className="leading-none">
        <div className="font-mono text-[15px] font-bold tracking-tight">SENTINEL</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Alert · Verify · Protect
        </div>
      </div>
    )}
  </div>
);
