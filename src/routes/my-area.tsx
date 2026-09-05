import { createFileRoute } from "@tanstack/react-router";
import { Home, MapPin, Sprout } from "lucide-react";
import { RiskIndicator } from "@/components/lews/RiskIndicator";
import { ReportCard } from "@/components/lews/ReportCard";
import {
  mockReports,
  mockRiskZones,
  mockSavedLocations,
  mockSensors,
} from "@/data/mockLewsData";
import { useOfflineStore } from "@/hooks/useOfflineStore";
import { RISK_CONFIG } from "@/components/lews/RiskIndicator";

export const Route = createFileRoute("/my-area")({
  head: () => ({
    meta: [
      { title: "My Area — LEWS Landslide Early Warning" },
      {
        name: "description",
        content:
          "Local landslide risk for your saved villages: sensor readouts, current risk level and nearby citizen reports.",
      },
      { property: "og:title", content: "My Area — LEWS" },
      {
        property: "og:description",
        content: "Local landslide risk, sensor readouts and nearby reports.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyAreaPage,
});

function MyAreaPage() {
  const { lastKnownLocation } = useOfflineStore();
  const localZone = mockRiskZones[0]!; // Khireshwar sits inside Malshej Ghat zone
  const cfg = RISK_CONFIG[localZone.level];

  return (
    <div className="pb-6">
      <section aria-label="Local risk" className="mx-4 mt-4">
        <div className="flex items-end justify-between">
          <h1 className="font-display text-xl font-extrabold tracking-tight">
            My Area
          </h1>
          <span className="text-[10px] font-semibold text-muted-foreground">
            {lastKnownLocation
              ? `${lastKnownLocation.lat.toFixed(2)}° N, ${lastKnownLocation.lng.toFixed(2)}° E`
              : "No saved location"}
          </span>
        </div>

        <div className="mt-3 rounded-3xl border border-line bg-white/5 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-bold">
                Khireshwar, {localZone.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {localZone.district} district
              </p>
            </div>
            <RiskIndicator level={localZone.level} label={cfg.label} />
          </div>
          <dl className="mt-3 grid grid-cols-3 gap-2">
            {mockSensors.map((s) => (
              <div key={s.id} className="rounded-lg bg-white/5 px-2 py-2">
                <dt className="text-[9px] font-semibold text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="text-sm font-bold">
                  {s.value} {s.unit}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-label="Saved locations" className="mx-4 mt-5">
        <h2 className="font-display text-sm font-extrabold tracking-tight">
          Saved locations
        </h2>
        <ul className="mt-2 space-y-2">
          {mockSavedLocations.map((loc) => (
            <li
              key={loc.id}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white/5 p-3"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-aqua/15 text-aqua">
                {loc.label === "Home" ? (
                  <Home className="size-4" aria-hidden="true" />
                ) : (
                  <Sprout className="size-4" aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{loc.label}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" aria-hidden="true" />
                  {loc.village} · {loc.position.lat.toFixed(3)},{" "}
                  {loc.position.lng.toFixed(3)}
                </p>
              </div>
              {loc.isDefault && (
                <span className="rounded-md border border-aqua/40 bg-aqua/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-aqua">
                  Default
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Nearby reports" className="mx-4 mt-5">
        <h2 className="font-display text-sm font-extrabold tracking-tight">
          Nearby reports
        </h2>
        <div className="mt-2 space-y-2">
          {mockReports.slice(0, 2).map((r) => (
            <ReportCard key={r.id} report={r} />
          ))}
        </div>
      </section>
    </div>
  );
}
