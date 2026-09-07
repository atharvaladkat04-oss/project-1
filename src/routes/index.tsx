import { lazy, Suspense, useState } from "react";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { AlignLeft, Map as MapIcon } from "lucide-react";
import { AlertCard } from "@/components/lews/AlertCard";
import { RiskIndicator } from "@/components/lews/RiskIndicator";
import { mockAlerts, mockRiskZones } from "@/data/mockLewsData";
import { useOfflineStore } from "@/hooks/useOfflineStore";
import { cn } from "@/lib/utils";

const HazardMap = lazy(() => import("@/components/lews/HazardMap"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hazard Map — LEWS Landslide Early Warning" },
      {
        name: "description",
        content:
          "Live landslide hazard zones across the Western Ghats with evacuation shelters and multi-modal critical, warning and normal alerts.",
      },
      { property: "og:title", content: "Hazard Map — LEWS" },
      {
        property: "og:description",
        content:
          "Live landslide hazard zones across the Western Ghats with evacuation shelters and alerts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const { offlineMode } = useOfflineStore();
  const [textOnly, setTextOnly] = useState(false);
  // Offline fallback: no connectivity means tiles can't load — force text view.
  const showTextOnly = textOnly || offlineMode;

  return (
    <div className="pb-6">
      <section aria-label="Hazard map" className="mx-4 mt-4">
        <button
          type="button"
          onClick={() => setTextOnly((v) => !v)}
          aria-pressed={showTextOnly}
          disabled={offlineMode}
          className={cn(
            "mb-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border px-3 text-xs font-bold",
            showTextOnly
              ? "border-aqua/40 bg-aqua/15 text-aqua"
              : "border-line bg-white/5 text-foreground",
          )}
        >
          {showTextOnly ? (
            <MapIcon className="size-4" aria-hidden="true" />
          ) : (
            <AlignLeft className="size-4" aria-hidden="true" />
          )}
          {offlineMode
            ? "Text-Only View · map unavailable offline"
            : showTextOnly
              ? "Show Map View"
              : "Text-Only View"}
        </button>

        {showTextOnly ? (
          <div className="space-y-2">
            {mockRiskZones.map((zone) => (
              <article
                key={zone.id}
                className="rounded-2xl border border-line bg-white/5 p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold">{zone.name}</p>
                  <RiskIndicator level={zone.level} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Rain {zone.rainfallMmHr} mm/hr · Slope {zone.slopeDeg}° · Soil{" "}
                  {zone.soilMoisturePct}% saturated
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-3xl border border-line">
            <ClientOnly
              fallback={
                <div className="grid h-72 w-full place-items-center bg-slate-mid/40 text-xs font-semibold text-muted-foreground">
                  Loading map…
                </div>
              }
            >
              <Suspense
                fallback={
                  <div className="grid h-72 w-full place-items-center bg-slate-mid/40 text-xs font-semibold text-muted-foreground">
                    Loading map…
                  </div>
                }
              >
                <HazardMap />
              </Suspense>
            </ClientOnly>
            <div className="absolute left-3 top-3 z-[500] flex flex-col gap-1.5">
              <RiskIndicator level="critical" />
              <RiskIndicator level="warning" />
              <RiskIndicator level="normal" />
            </div>
            <div className="absolute right-3 top-3 z-[500] rounded-full border border-line bg-slate-deep/60 px-2 py-1 text-[9px] font-semibold text-foreground/70">
              19.35° N, 73.79° E
            </div>
          </div>
        )}
      </section>

      <section aria-label="Hazard zones" className="mx-4 mt-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-sm font-extrabold tracking-tight">
            Hazard zones
          </h1>
          <span className="text-[10px] font-semibold text-muted-foreground">
            {mockRiskZones.length} monitored
          </span>
        </div>
        <div className="mt-2 space-y-2">
          {mockRiskZones.map((zone) => (
            <article
              key={zone.id}
              className="rounded-2xl border border-line bg-white/5 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{zone.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {zone.district} district · Zone{" "}
                    {zone.id.replace("zone-", "").toUpperCase()}
                  </p>
                </div>
                <RiskIndicator level={zone.level} />
              </div>
              <dl className="mt-2 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-white/5 px-2 py-1.5">
                  <dt className="text-[9px] font-semibold text-muted-foreground">
                    Rain
                  </dt>
                  <dd className="text-xs font-bold">{zone.rainfallMmHr} mm/hr</dd>
                </div>
                <div className="rounded-lg bg-white/5 px-2 py-1.5">
                  <dt className="text-[9px] font-semibold text-muted-foreground">
                    Slope
                  </dt>
                  <dd className="text-xs font-bold">{zone.slopeDeg}°</dd>
                </div>
                <div className="rounded-lg bg-white/5 px-2 py-1.5">
                  <dt className="text-[9px] font-semibold text-muted-foreground">
                    Soil
                  </dt>
                  <dd className="text-xs font-bold">
                    {zone.soilMoisturePct >= 90
                      ? "Saturated"
                      : zone.soilMoisturePct >= 70
                        ? "Wet"
                        : "Stable"}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Live alerts" className="mx-4 mt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-extrabold tracking-tight">
            Live alerts
          </h2>
          <span className="text-[10px] font-semibold text-muted-foreground">
            Updated 2m ago
          </span>
        </div>
        <div className="mt-2 space-y-2">
          {mockAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </section>
    </div>
  );
}
