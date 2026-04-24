import { StylizedMap } from "@/components/StylizedMap";
import { mockAlerts, safePoints } from "@/data/alerts";
import { Cross, Shield, Home } from "lucide-react";

const MapView = () => {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight">Live Situational Map</h1>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Verified zones · safe points · your live position
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <StylizedMap height="h-[640px]" />
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card-soft">
            <h3 className="text-sm font-bold uppercase tracking-wider">Active danger zones</h3>
            <ul className="mt-3 divide-y divide-border">
              {mockAlerts
                .filter((a) => a.severity === "high")
                .map((a) => (
                  <li key={a.id} className="flex items-center justify-between py-2.5 text-sm">
                    <div>
                      <div className="font-semibold">{a.title.split("—")[0].trim()}</div>
                      <div className="font-mono text-[11px] text-muted-foreground">{a.location}</div>
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emergency">
                      {a.category}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-card-soft">
            <h3 className="text-sm font-bold uppercase tracking-wider">Nearby safe points</h3>
            <ul className="mt-3 space-y-2">
              {safePoints.map((p) => {
                const Icon = p.type === "Hospital" ? Cross : p.type === "Police" ? Shield : Home;
                return (
                  <li key={p.id} className="flex items-center gap-3 rounded-md border border-border p-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-safe/10 text-safe">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{p.name}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {p.type}
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {(Math.random() * 4 + 0.4).toFixed(1)} km
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
