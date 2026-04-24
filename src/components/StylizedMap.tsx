import { useState } from "react";
import type { EmergencyAlert } from "@/data/alerts";
import { mockAlerts, safePoints } from "@/data/alerts";
import { Cross, Shield, Home, Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";

const sevColor: Record<EmergencyAlert["severity"], string> = {
  high: "hsl(var(--emergency))",
  medium: "hsl(var(--warning))",
  low: "hsl(var(--safe))",
};

const safeIcon = {
  Hospital: Cross,
  Police: Shield,
  Shelter: Home,
};

export const StylizedMap = ({ height = "h-[480px]" }: { height?: string }) => {
  const [selected, setSelected] = useState<EmergencyAlert | null>(mockAlerts[0]);
  const userPos = { x: 42, y: 48 };

  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-border bg-sidebar", height)}>
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      {/* Scan line */}
      <div className="pointer-events-none absolute inset-x-0 h-12 scan-line animate-scan" />

      {/* Topographic blobs */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="zone-red" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(0 84% 55%)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="hsl(0 84% 55%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="zone-amber" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(38 95% 53%)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(38 95% 53%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="zone-green" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(145 70% 42%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(145 70% 42%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {mockAlerts
          .filter((a) => a.status === "verified")
          .map((a) => (
            <circle
              key={a.id}
              cx={a.coords.x}
              cy={a.coords.y}
              r={a.severity === "high" ? 14 : a.severity === "medium" ? 10 : 7}
              fill={
                a.severity === "high"
                  ? "url(#zone-red)"
                  : a.severity === "medium"
                  ? "url(#zone-amber)"
                  : "url(#zone-green)"
              }
            />
          ))}
      </svg>

      {/* Safe points */}
      {safePoints.map((p) => {
        const Icon = safeIcon[p.type];
        return (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%` }}
            title={p.name}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md border border-safe/40 bg-sidebar-accent text-safe shadow-sm">
              <Icon className="h-3 w-3" />
            </div>
          </div>
        );
      })}

      {/* Alert pins */}
      {mockAlerts.map((a) => (
        <button
          key={a.id}
          onClick={() => setSelected(a)}
          className="absolute -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${a.coords.x}%`, top: `${a.coords.y}%` }}
        >
          <span className="relative flex h-3 w-3">
            {a.severity === "high" && a.status === "verified" && (
              <span
                className="absolute inline-flex h-full w-full animate-ping-slow rounded-full opacity-75"
                style={{ background: sevColor[a.severity] }}
              />
            )}
            <span
              className="relative inline-flex h-3 w-3 rounded-full ring-2 ring-background"
              style={{ background: sevColor[a.severity] }}
            />
          </span>
        </button>
      ))}

      {/* User position */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${userPos.x}%`, top: `${userPos.y}%` }}
      >
        <div className="relative">
          <span className="absolute inset-0 -m-2 rounded-full bg-info/20 animate-ping-slow" />
          <div className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-info text-info-foreground shadow-lg">
            <Crosshair className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute left-3 top-3 flex flex-col gap-1.5 rounded-lg border border-sidebar-border bg-sidebar/90 p-2.5 font-mono text-[10px] uppercase tracking-wider text-sidebar-foreground/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emergency" /> Emergency
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-warning" /> Warning
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-safe" /> Safe / Advisory
        </div>
        <div className="mt-1 flex items-center gap-2 border-t border-sidebar-border pt-1.5">
          <Crosshair className="h-3 w-3 text-info" /> You
        </div>
      </div>

      {/* Selected info */}
      {selected && (
        <div className="absolute bottom-3 left-3 right-3 max-w-md rounded-lg border border-sidebar-border bg-sidebar/95 p-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
              {selected.id}
            </span>
            <span
              className="ml-auto font-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ color: sevColor[selected.severity] }}
            >
              {selected.category}
            </span>
          </div>
          <h4 className="mt-1 text-sm font-bold text-sidebar-foreground">{selected.title}</h4>
          <p className="mt-1 line-clamp-2 text-xs text-sidebar-foreground/70">{selected.description}</p>
          <div className="mt-2 font-mono text-[10px] text-sidebar-foreground/60">
            {selected.location} · {selected.sources.length} sources
          </div>
        </div>
      )}
    </div>
  );
};
