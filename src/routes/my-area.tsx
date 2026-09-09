import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BedDouble,
  CloudRain,
  Droplets,
  Home,
  MapPin,
  Mountain,
  Plus,
  Tractor,
  Waves,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { RISK_CONFIG, RiskIconBadge } from "@/components/lews/RiskIndicator";
import type { RiskLevel } from "@/types/lews";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my-area")({
  head: () => ({
    meta: [
      { title: "My Area — LEWS Landslide Early Warning" },
      {
        name: "description",
        content:
          "Watch locations across Sikkim: family residence, ancestral home and workplace with live rain, soil and slope status.",
      },
      { property: "og:title", content: "My Area — LEWS" },
      {
        property: "og:description",
        content: "Saved watch locations with live landslide risk status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyAreaPage,
});

interface WatchLocation {
  id: string;
  icon: typeof Home;
  label: string;
  place: string;
  level: RiskLevel;
  statusText: string;
  stats: { icon: typeof CloudRain; label: string; value: string }[];
  shelter?: string;
  slopeActive?: boolean;
}

const WATCH_LOCATIONS: WatchLocation[] = [
  {
    id: "loc-family",
    icon: Home,
    label: "Family Residence",
    place: "Upper Sichey, Gangtok",
    level: "normal",
    statusText: "Safe",
    stats: [
      { icon: CloudRain, label: "24h Rain", value: "18 mm" },
      { icon: Droplets, label: "Soil Moisture", value: "28%" },
      { icon: BedDouble, label: "Nearest Shelter", value: "Paljor Stadium · 1.4 km" },
    ],
  },
  {
    id: "loc-ancestral",
    icon: Mountain,
    label: "Ancestral Home",
    place: "Dikchu Bazaar",
    level: "critical",
    statusText: "High Risk — Red Alert",
    slopeActive: true,
    stats: [
      { icon: CloudRain, label: "24h Rain", value: "94 mm" },
      { icon: Droplets, label: "Soil Moisture", value: "84%" },
      { icon: Waves, label: "Slope Movement", value: "Active" },
    ],
  },
  {
    id: "loc-work",
    icon: Tractor,
    label: "Workplace",
    place: "Singtam NH-10 Flank",
    level: "warning",
    statusText: "Watch / Advisory",
    stats: [
      { icon: CloudRain, label: "Rain", value: "52 mm" },
      { icon: ArrowRight, label: "Traffic", value: "Single-lane regulated" },
    ],
  },
];

function MyAreaPage() {
  return (
    <div className="pb-6">
      <section aria-label="Watch locations" className="mx-4 mt-4">
        <h1 className="font-display text-xl font-extrabold tracking-tight">
          My Area
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Live status for your saved watch locations
        </p>

        <div className="mt-3 space-y-3">
          {WATCH_LOCATIONS.map((loc) => {
            const cfg = RISK_CONFIG[loc.level];
            const Icon = loc.icon;
            return (
              <article
                key={loc.id}
                className={cn(
                  "rounded-3xl border p-4",
                  cfg.border,
                  cfg.softBg.replace("/20", "/10"),
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl",
                      cfg.softBg,
                      cfg.text,
                    )}
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{loc.label}</p>
                    <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                      <MapPin className="size-3 shrink-0" aria-hidden="true" />
                      {loc.place}
                    </p>
                  </div>
                  <RiskIconBadge level={loc.level} className="size-9" />
                </div>

                <p
                  className={cn(
                    "mt-3 text-[11px] font-bold uppercase tracking-[0.14em]",
                    cfg.text,
                  )}
                >
                  {cfg.label} · {loc.statusText}
                </p>

                <dl className="mt-2 grid grid-cols-3 gap-2">
                  {loc.stats.map((s) => {
                    const StatIcon = s.icon;
                    return (
                      <div
                        key={s.label}
                        className="rounded-lg bg-white/5 px-2 py-2"
                      >
                        <dt className="flex items-center gap-1 text-[9px] font-semibold text-muted-foreground">
                          <StatIcon className="size-3" aria-hidden="true" />
                          {s.label}
                        </dt>
                        <dd className="mt-0.5 text-xs font-bold leading-snug">
                          {s.value}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                {loc.level === "critical" && (
                  <Link
                    to="/safe-route"
                    className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl bg-crit font-display text-sm font-extrabold tracking-tight text-crit-foreground shadow-lg shadow-crit/30 transition-transform active:scale-[0.98]"
                  >
                    View Evacuation Plan
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-aqua/50 bg-aqua/10 font-display text-sm font-bold text-aqua transition-colors active:bg-aqua/20"
          onClick={() => {
            /* mock — presentation shell */
          }}
        >
          <Plus className="size-4" aria-hidden="true" />
          Add New Watch Location
        </button>
      </section>
    </div>
  );
}
