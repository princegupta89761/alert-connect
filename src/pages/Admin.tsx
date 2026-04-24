import { useState } from "react";
import { mockAlerts, type EmergencyAlert, type Severity } from "@/data/alerts";
import { ShieldCheck, Lock, Plus, BadgeCheck, X } from "lucide-react";
import { SeverityBadge } from "@/components/SeverityBadge";
import { VerificationBadge } from "@/components/VerificationBadge";
import { timeAgo } from "@/lib/format";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Role = "Admin" | "Authority" | "Viewer";

const Admin = () => {
  const [role, setRole] = useState<Role>("Authority");
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(mockAlerts);
  const [open, setOpen] = useState(false);

  const canCreate = role !== "Viewer";
  const canVerify = role === "Admin";

  const verify = (id: string) => {
    setAlerts((a) =>
      a.map((x) =>
        x.id === id
          ? {
              ...x,
              sources: x.sources.length < 2 ? [...x.sources, "Government"] : x.sources,
              status: x.sources.length + 1 >= 2 ? "verified" : "pending",
            }
          : x
      )
    );
    toast.success("Confirmation added", { description: "Alert promoted to verified after 2+ sources." });
  };

  const create = (data: { title: string; location: string; description: string; severity: Severity }) => {
    const newAlert: EmergencyAlert = {
      id: `ALT-${2050 + alerts.length}`,
      title: data.title,
      description: data.description,
      location: data.location,
      coords: { x: 40 + Math.random() * 30, y: 35 + Math.random() * 30 },
      timestamp: new Date().toISOString(),
      severity: data.severity,
      sources: [role === "Admin" ? "Government" : "Police"],
      status: "pending",
      category: "Health",
    };
    setAlerts((a) => [newAlert, ...a]);
    setOpen(false);
    toast.success("Alert posted", { description: "Awaiting second-source verification." });
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/10 text-info">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Console</h1>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Role-based access · multi-source verification
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 rounded-md border border-border bg-card p-1">
          {(["Admin", "Authority", "Viewer"] as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={cn(
                "rounded px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition",
                role === r
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Permissions panel */}
      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <PermTile label="Create alerts" allowed={canCreate} />
        <PermTile label="Verify (promote to verified)" allowed={canVerify} />
        <PermTile label="View feed" allowed={true} />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider">Alert queue</h2>
        <button
          disabled={!canCreate}
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-gradient-emergency px-3 py-2 text-sm font-bold text-emergency-foreground shadow-emergency disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> New alert
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card-soft">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.id} className="border-t border-border">
                <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{a.id}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold">{a.title}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{a.location}</div>
                </td>
                <td className="px-4 py-3">
                  <SeverityBadge severity={a.severity} />
                </td>
                <td className="px-4 py-3">
                  <VerificationBadge status={a.status} count={a.sources.length} />
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">
                  {timeAgo(a.timestamp)}
                </td>
                <td className="px-4 py-3 text-right">
                  {a.status === "pending" ? (
                    <button
                      disabled={!canVerify}
                      onClick={() => verify(a.id)}
                      className="inline-flex items-center gap-1 rounded-md border border-safe/30 bg-safe/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-safe disabled:opacity-40"
                    >
                      <BadgeCheck className="h-3 w-3" />
                      Confirm
                    </button>
                  ) : (
                    <span className="font-mono text-[10px] text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && <NewAlertModal onClose={() => setOpen(false)} onCreate={create} />}
    </div>
  );
};

const PermTile = ({ label, allowed }: { label: string; allowed: boolean }) => (
  <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
    <div className="text-sm font-medium">{label}</div>
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
        allowed
          ? "border-safe/30 bg-safe/10 text-safe"
          : "border-emergency/30 bg-emergency/10 text-emergency"
      )}
    >
      {allowed ? <BadgeCheck className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
      {allowed ? "Allowed" : "Denied"}
    </span>
  </div>
);

const NewAlertModal = ({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (d: { title: string; location: string; description: string; severity: Severity }) => void;
}) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("medium");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Create new alert</h3>
          <button onClick={onClose} className="rounded p-1 text-muted-foreground hover:bg-accent">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/50"
              placeholder="e.g. Heavy rainfall warning — Konkan"
            />
          </Field>
          <Field label="Location">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/50"
              placeholder="District / city / area"
            />
          </Field>
          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/50"
              placeholder="Clear, actionable instructions for the public."
            />
          </Field>
          <Field label="Severity">
            <div className="flex gap-2">
              {(["high", "medium", "low"] as Severity[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSeverity(s)}
                  className={cn(
                    "flex-1 rounded-md border px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wider",
                    severity === s ? "border-foreground bg-foreground text-background" : "border-border"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </Field>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md border border-border px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            disabled={!title || !location || !description}
            onClick={() => onCreate({ title, location, description, severity })}
            className="rounded-md bg-gradient-emergency px-4 py-2 text-sm font-bold text-emergency-foreground shadow-emergency disabled:opacity-50"
          >
            Post alert
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
      {label}
    </div>
    {children}
  </label>
);

export default Admin;
