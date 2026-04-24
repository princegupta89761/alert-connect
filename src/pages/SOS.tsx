import { useEffect, useState } from "react";
import { Siren, Phone, MapPin, ShieldCheck, Cross, Home } from "lucide-react";
import { toast } from "sonner";
import { safePoints } from "@/data/alerts";
import { cn } from "@/lib/utils";

const SOS = () => {
  const [active, setActive] = useState(false);
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!holding) {
      setProgress(0);
      return;
    }
    const start = Date.now();
    const dur = 1500;
    const t = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / dur) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(t);
        triggerSOS();
      }
    }, 30);
    return () => clearInterval(t);
  }, [holding]);

  const triggerSOS = () => {
    setActive(true);
    setHolding(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setCoords({ lat: 19.076, lng: 72.8777 })
      );
    } else {
      setCoords({ lat: 19.076, lng: 72.8777 });
    }
    toast.success("SOS broadcast", { description: "Live location shared with emergency responders." });
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emergency/30 bg-emergency/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-emergency">
            <span className="h-1.5 w-1.5 rounded-full bg-emergency animate-blink" />
            One-tap emergency
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Press &amp; hold to send SOS
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your live location, identity and time-stamped alert will be sent to the nearest control
            room and your emergency contacts.
          </p>
        </div>

        {/* Big button */}
        <div className="relative mx-auto flex h-72 w-72 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emergency/20 blur-2xl" />
          {!active && (
            <span className="absolute inset-0 rounded-full bg-emergency/30 animate-ping-slow" />
          )}
          <button
            onMouseDown={() => !active && setHolding(true)}
            onMouseUp={() => setHolding(false)}
            onMouseLeave={() => setHolding(false)}
            onTouchStart={() => !active && setHolding(true)}
            onTouchEnd={() => setHolding(false)}
            className={cn(
              "relative flex h-60 w-60 items-center justify-center rounded-full bg-gradient-emergency text-emergency-foreground shadow-emergency transition-transform",
              holding && "scale-95",
              active && "animate-pulse-emergency"
            )}
          >
            <div className="text-center">
              <Siren className="mx-auto h-14 w-14" />
              <div className="mt-2 font-mono text-2xl font-bold tracking-widest">
                {active ? "ACTIVE" : "SOS"}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-80">
                {active ? "Help on the way" : holding ? "Hold to confirm…" : "Press & hold 1.5s"}
              </div>
            </div>
            {/* Progress ring */}
            {holding && (
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="hsl(var(--emergency-foreground) / 0.4)"
                  strokeWidth="3"
                  strokeDasharray={`${(progress / 100) * 289} 289`}
                />
              </svg>
            )}
          </button>
        </div>

        {/* Live location */}
        {active && coords && (
          <div className="mx-auto mt-6 max-w-md rounded-xl border border-emergency/30 bg-card p-5 shadow-card-soft animate-fade-in-up">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emergency">
              <span className="h-1.5 w-1.5 rounded-full bg-emergency animate-blink" />
              Broadcasting live location
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3 font-mono text-xs">
              <div>
                <div className="text-muted-foreground">LAT</div>
                <div className="font-bold">{coords.lat.toFixed(5)}°</div>
              </div>
              <div>
                <div className="text-muted-foreground">LNG</div>
                <div className="font-bold">{coords.lng.toFixed(5)}°</div>
              </div>
            </div>
            <button
              onClick={() => setActive(false)}
              className="mt-4 w-full rounded-md border border-border py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:bg-accent"
            >
              Cancel SOS
            </button>
          </div>
        )}

        {/* Quick contacts */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { num: "112", label: "Unified Emergency", icon: Phone, tone: "emergency" },
            { num: "108", label: "Ambulance", icon: Cross, tone: "info" },
            { num: "100", label: "Police", icon: ShieldCheck, tone: "info" },
          ].map((c) => (
            <a
              key={c.num}
              href={`tel:${c.num}`}
              className={cn(
                "flex items-center gap-3 rounded-xl border bg-card p-4 transition hover:shadow-md",
                c.tone === "emergency" ? "border-emergency/30" : "border-border"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  c.tone === "emergency" ? "bg-emergency/10 text-emergency" : "bg-info/10 text-info"
                )}
              >
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-lg font-bold">{c.num}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Nearest help */}
        <div className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
            <MapPin className="h-4 w-4 text-info" />
            Nearest help centers
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {safePoints.slice(0, 4).map((p) => {
              const Icon = p.type === "Hospital" ? Cross : p.type === "Police" ? ShieldCheck : Home;
              return (
                <div
                  key={p.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-safe/10 text-safe">
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOS;
