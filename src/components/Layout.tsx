import { NavLink, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, ListFilter, Map, WifiOff, ShieldCheck, Siren, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { StatusBar } from "./StatusBar";
import { AlertTicker } from "./AlertTicker";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/feed", label: "Alert Feed", icon: ListFilter },
  { to: "/map", label: "Map View", icon: Map },
  { to: "/offline", label: "Offline Mode", icon: WifiOff },
  { to: "/admin", label: "Admin", icon: ShieldCheck },
];

export const Layout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const onSOS = location.pathname === "/sos";

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
          <button
            className="rounded-md p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Logo />
          <div className="ml-auto flex items-center gap-3">
            <StatusBar />
            {!onSOS && (
              <NavLink
                to="/sos"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-emergency px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emergency-foreground shadow-emergency animate-pulse-emergency"
              >
                <Siren className="h-3.5 w-3.5" />
                SOS
              </NavLink>
            )}
          </div>
        </div>
        <AlertTicker />
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 top-[105px] z-30 w-64 shrink-0 border-r border-sidebar-border bg-sidebar transition-transform lg:sticky lg:top-[105px] lg:h-[calc(100vh-105px)] lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="flex flex-col gap-1 p-3">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="mx-3 mt-4 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
              Active Region
            </div>
            <div className="mt-1 text-sm font-semibold text-sidebar-foreground">India · West</div>
            <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-sidebar-foreground/60">
              <span className="h-1.5 w-1.5 rounded-full bg-safe animate-blink" />
              4 channels synced
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
