import { useMemo, useState } from "react";
import { mockAlerts, type Severity } from "@/data/alerts";
import { AlertCard } from "@/components/AlertCard";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const filters: { key: "all" | Severity | "pending"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "high", label: "Emergency" },
  { key: "medium", label: "Warning" },
  { key: "low", label: "Advisory" },
  { key: "pending", label: "Under Verification" },
];

const Feed = () => {
  const [active, setActive] = useState<(typeof filters)[number]["key"]>("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let l = mockAlerts;
    if (active === "pending") l = l.filter((a) => a.status === "pending");
    else if (active !== "all") l = l.filter((a) => a.severity === active);
    if (q.trim()) {
      const t = q.toLowerCase();
      l = l.filter(
        (a) =>
          a.title.toLowerCase().includes(t) ||
          a.location.toLowerCase().includes(t) ||
          a.description.toLowerCase().includes(t)
      );
    }
    return l;
  }, [active, q]);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight">Alert Feed</h1>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {list.length} of {mockAlerts.length} alerts shown
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search alerts, locations, keywords..."
            className="w-full rounded-md border border-input bg-card pl-9 pr-3 py-2.5 text-sm outline-none ring-ring/50 transition focus:ring-2"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors",
                active === f.key
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {list.map((a) => (
          <AlertCard key={a.id} alert={a} />
        ))}
      </div>
      {list.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          No alerts match your filter.
        </div>
      )}
    </div>
  );
};

export default Feed;
