import { mockAlerts } from "@/data/alerts";
import { AlertCard } from "@/components/AlertCard";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { WifiOff, Radio, Phone, MapPin, AlertTriangle } from "lucide-react";

const cellBroadcasts = [
  {
    id: "CB-01",
    text: "GOVT ALERT: Cyclone landfall expected within 6h. Move to nearest shelter immediately.",
    time: "12:42",
  },
  { id: "CB-02", text: "POLICE: NH-48 km 142 closed. Use diversion via NH-8 spur.", time: "12:18" },
  {
    id: "CB-03",
    text: "HEALTH: Air quality severe (AQI 412). Vulnerable groups stay indoors. N95 outdoors.",
    time: "11:55",
  },
];

const Offline = () => {
  const online = useOnlineStatus();
  const cached = mockAlerts.slice(0, 4);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-warning">
          <WifiOff className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Offline Emergency Mode</h1>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {online
              ? "Online — preview of offline mode shown below"
              : "Disconnected — showing cached & broadcast data"}
          </p>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-warning/30 bg-warning/5 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
          <div className="text-sm text-foreground/90">
            When network is lost, SENTINEL automatically falls back to cached alerts and a simulated
            cell-broadcast feed. Critical safety instructions remain available without internet.
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider">Last cached alerts</h2>
          <div className="space-y-3">
            {cached.map((a) => (
              <AlertCard key={a.id} alert={a} />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
              <Radio className="h-4 w-4 text-warning" />
              Simulated cell broadcast
            </h2>
            <div className="space-y-2">
              {cellBroadcasts.map((b) => (
                <div
                  key={b.id}
                  className="rounded-lg border border-border bg-card p-3 font-mono text-xs leading-relaxed"
                >
                  <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>{b.id} · CELL BROADCAST</span>
                    <span>{b.time}</span>
                  </div>
                  <div className="text-foreground/90">{b.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-emergency/30 bg-emergency/5 p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emergency">
              Emergency instructions
            </h3>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-foreground/90">
              <li>Stay calm. Do not crowd phone lines unless reporting an emergency.</li>
              <li>Move to higher ground / shelter if flood or cyclone alert is active.</li>
              <li>Keep a torch, water, dry food and battery-pack within reach.</li>
              <li>Tune to community radio at 90.4 MHz for ongoing instructions.</li>
              <li>Do not enter flood water or damaged buildings.</li>
            </ol>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:112"
              className="flex items-center gap-3 rounded-xl border border-emergency/30 bg-card p-4 hover:bg-emergency/5"
            >
              <Phone className="h-5 w-5 text-emergency" />
              <div>
                <div className="font-bold">112</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Unified Emergency
                </div>
              </div>
            </a>
            <a
              href="tel:108"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:bg-accent"
            >
              <MapPin className="h-5 w-5 text-info" />
              <div>
                <div className="font-bold">108</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Ambulance
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Offline;
