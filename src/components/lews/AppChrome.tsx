import { Link } from "@tanstack/react-router";
import {
  Map as MapIcon,
  MapPin,
  Megaphone,
  Route as RouteIcon,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useOfflineStore } from "@/hooks/useOfflineStore";
import { mockAlerts } from "@/data/mockLewsData";
import { RISK_CONFIG } from "./RiskIndicator";
import { formatClock, formatRelativeTime } from "@/lib/time";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "Map", icon: MapIcon },
  { to: "/my-area", label: "My Area", icon: MapPin },
  { to: "/safe-route", label: "Safe Route", icon: RouteIcon },
  { to: "/report", label: "Report", icon: Megaphone },
  { to: "/community", label: "Community", icon: Users },
] as const;

export function AppHeader() {
  const { offlineMode, setOfflineMode, lastSyncAt } = useOfflineStore();
  return (
    <header className="flex items-center justify-between px-4 pt-4">
      <div className="flex items-center gap-2.5">
        <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-aqua to-sky-500 font-display text-base font-black text-slate-deep">
          L
        </div>
        <div>
          <p className="font-display text-sm font-extrabold leading-none tracking-tight">
            LEWS
          </p>
          <p className="text-[10px] font-medium text-muted-foreground">
            Western Ghats
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOfflineMode(!offlineMode)}
        aria-pressed={offlineMode}
        className={cn(
          "flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-white/5 px-3 text-[11px] font-semibold",
          offlineMode ? "text-warn" : "text-aqua",
        )}
      >
        {offlineMode ? (
          <WifiOff className="size-3.5" aria-hidden="true" />
        ) : (
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-aqua/60" />
            <span className="relative inline-flex size-2 rounded-full bg-aqua" />
          </span>
        )}
        {offlineMode ? "Offline" : "Synced"}
        <span className="sr-only"> — toggle offline mode</span>
      </button>
    </header>
  );
}

export function EmergencyBanner() {
  const { offlineMode, lastSyncAt } = useOfflineStore();
  const top = mockAlerts.find((a) => a.level === "critical") ?? mockAlerts[0]!;
  const cfg = RISK_CONFIG[top.level];
  const Icon = cfg.icon;
  return (
    <section aria-label="Active emergency alert" className="mx-4 mt-4">
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border p-3",
          cfg.border,
          cfg.softBg,
        )}
      >
        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-crit text-white">
          <Icon className="size-6 animate-pulse" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-crit">
            {cfg.label}
          </p>
          <p className="truncate text-sm font-bold">{top.message}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] font-semibold text-muted-foreground">
            {formatRelativeTime(top.issuedAt)}
          </p>
          {top.distanceToShelterM != null && (
            <p className="text-[10px] font-bold text-foreground/80">
              {top.distanceToShelterM}m to shelter
            </p>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-xl border border-line bg-white/5 px-3 py-1.5">
        <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {offlineMode ? (
            <WifiOff className="size-3 text-warn" aria-hidden="true" />
          ) : (
            <Wifi className="size-3 text-aqua" aria-hidden="true" />
          )}
          {offlineMode ? "Offline · cached data" : "Online · live data"}
        </span>
        {lastSyncAt && (
          <span className="text-[10px] font-semibold text-muted-foreground">
            Last sync {formatClock(lastSyncAt)}
          </span>
        )}
      </div>
    </section>
  );
}

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 z-50 border-t border-line bg-slate-deep/90 backdrop-blur-md"
    >
      <div className="grid grid-cols-5">
        {TABS.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="flex min-h-14 flex-col items-center justify-center gap-1 py-2 text-muted-foreground"
            activeProps={{ className: "text-aqua" }}
            aria-label={label}
          >
            <Icon className="size-5" aria-hidden="true" />
            <span className="text-[10px] font-semibold">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
