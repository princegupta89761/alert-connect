import { mockAlerts } from "@/data/alerts";
import { AlertCard } from "@/components/AlertCard";
import { StatTile } from "@/components/StatTile";
import { StylizedMap } from "@/components/StylizedMap";
import { AlertTriangle, BadgeCheck, Radio, Siren, Volume2, Tv2, Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const high = mockAlerts.filter((a) => a.severity === "high" && a.status === "verified").length;
  const verified = mockAlerts.filter((a) => a.status === "verified").length;
  const pending = mockAlerts.filter((a) => a.status === "pending").length;
  const top = mockAlerts.slice(0, 3);

  const [pushEnabled, setPushEnabled] = useState(false);

  // Simulate a real-time incoming alert after a few seconds
  useEffect(() => {
    const t = setTimeout(() => {
      toast("New verified alert received", {
        description: "Cyclone ARNAV — Landfall imminent · Mumbai Coastal Belt",
        className: "border-emergency/40",
      });
    }, 3500);
    return () => clearTimeout(t);
  }, []);

  const enablePush = async () => {
    if (!("Notification" in window)) {
      toast.error("Notifications not supported in this browser");
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      setPushEnabled(true);
      new Notification("SENTINEL alerts enabled", {
        body: "You will receive emergency notifications.",
      });
    } else {
      toast.error("Notification permission denied");
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-gradient-mission p-6 text-sidebar-foreground sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emergency/30 bg-emergency/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-emergency">
              <span className="h-1.5 w-1.5 rounded-full bg-emergency animate-blink" />
              {high} active emergency · live monitoring
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              One source of truth.
              <br />
              <span className="bg-gradient-to-r from-emergency via-warning to-safe bg-clip-text text-transparent">
                For every emergency.
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-sidebar-foreground/70 sm:text-base">
              SENTINEL aggregates, verifies and broadcasts alerts from government, police, weather
              and disaster agencies — across SMS, radio, sirens and digital boards.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={enablePush}
                disabled={pushEnabled}
                className="inline-flex items-center gap-2 rounded-md bg-gradient-emergency px-4 py-2.5 text-sm font-semibold text-emergency-foreground shadow-emergency disabled:opacity-60"
              >
                <Siren className="h-4 w-4" />
                {pushEnabled ? "Push notifications enabled" : "Enable push notifications"}
              </button>
              <a
                href="/map"
                className="inline-flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent px-4 py-2.5 text-sm font-semibold text-sidebar-foreground hover:bg-sidebar-accent/70"
              >
                Open live map
              </a>
            </div>
          </div>
          {/* Mini ops panel */}
          <div className="relative rounded-xl border border-sidebar-border bg-sidebar/60 p-4 backdrop-blur">
            <div className="font-mono text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
              Channels online
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { icon: Radio, label: "SMS gateway", v: "OK" },
                { icon: Volume2, label: "Sirens", v: "OK" },
                { icon: Tv2, label: "LED boards", v: "OK" },
                { icon: Languages, label: "Radio (3 lang)", v: "OK" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent/40 p-2.5"
                >
                  <c.icon className="h-4 w-4 text-safe" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-sidebar-foreground">{c.label}</div>
                    <div className="font-mono text-[10px] text-sidebar-foreground/60">
                      Status: {c.v}
                    </div>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-safe animate-blink" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Active Emergencies" value={high} icon={AlertTriangle} tone="emergency" />
        <StatTile label="Verified Alerts" value={verified} icon={BadgeCheck} tone="safe" />
        <StatTile label="Under Verification" value={pending} icon={Radio} tone="warning" />
        <StatTile label="Channels Live" value={4} icon={Volume2} hint="SMS · Radio · Sirens · LED" />
      </section>

      {/* Map + top alerts */}
      <section className="mb-6 grid gap-5 xl:grid-cols-[1.3fr_1fr]">
        <div>
          <SectionHeader title="Live situational map" subtitle="Verified zones · safe points · your position" />
          <StylizedMap />
        </div>
        <div>
          <SectionHeader title="Priority alerts" subtitle="AI-normalized · de-duplicated" />
          <div className="space-y-3">
            {top.map((a) => (
              <AlertCard key={a.id} alert={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Extended channels */}
      <section className="mb-6">
        <SectionHeader title="Public alert systems" subtitle="Multi-channel broadcast simulation" />
        <div className="grid gap-3 md:grid-cols-3">
          <PublicChannelCard
            icon={Volume2}
            title="Smart Sirens"
            status="Broadcasting"
            tone="emergency"
            lines={["Pattern: Cyclone Alert", "Coverage: 14.2 km radius", "Last test: 2h ago"]}
          />
          <PublicChannelCard
            icon={Languages}
            title="Community Radio"
            status="On air · EN/HI/MR"
            tone="warning"
            lines={["Frequency: 90.4 MHz", "Voice: TTS Synth", "Loop: 4 min"]}
          />
          <PublicChannelCard
            icon={Tv2}
            title="Digital LED Boards"
            status="142 boards live"
            tone="safe"
            lines={["Bus stops · Stations", "Avg refresh: 8s", "Failure rate: 0.3%"]}
          />
        </div>
      </section>
    </div>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-3 flex items-end justify-between">
    <div>
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {subtitle}
      </p>
    </div>
  </div>
);

const PublicChannelCard = ({
  icon: Icon,
  title,
  status,
  lines,
  tone,
}: {
  icon: any;
  title: string;
  status: string;
  lines: string[];
  tone: "emergency" | "warning" | "safe";
}) => {
  const ring =
    tone === "emergency" ? "border-emergency/30" : tone === "warning" ? "border-warning/30" : "border-safe/30";
  const dot =
    tone === "emergency" ? "bg-emergency" : tone === "warning" ? "bg-warning" : "bg-safe";
  return (
    <div className={`rounded-xl border bg-card p-5 shadow-card-soft ${ring}`}>
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${tone}/10 text-${tone}`}>
          <Icon className={`h-5 w-5 text-${tone}`} />
        </span>
        <div>
          <div className="font-bold">{title}</div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className={`h-1.5 w-1.5 rounded-full ${dot} animate-blink`} />
            {status}
          </div>
        </div>
      </div>
      <ul className="mt-3 space-y-1 border-t border-border pt-3 font-mono text-[11px] text-muted-foreground">
        {lines.map((l) => (
          <li key={l}>› {l}</li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
