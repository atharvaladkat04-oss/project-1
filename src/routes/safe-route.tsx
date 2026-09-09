import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BedDouble,
  CheckCircle2,
  Download,
  Footprints,
  Navigation,
  OctagonAlert,
  Route as RouteIcon,
} from "lucide-react";
import { mockShelters } from "@/data/mockLewsData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/safe-route")({
  head: () => ({
    meta: [
      { title: "Safe Route — LEWS Landslide Early Warning" },
      {
        name: "description",
        content:
          "Active evacuation guide to Paljor Indoor Stadium, Gangtok with offline turn-by-turn steps avoiding the blocked NH-10 lower valley.",
      },
      { property: "og:title", content: "Safe Route — LEWS" },
      {
        property: "og:description",
        content: "Offline evacuation guide to the nearest relief shelter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SafeRoutePage,
});

const STEPS = [
  {
    text: "Head northeast towards Sichey Link Road (400 m)",
    note: "Safe ridge path",
  },
  {
    text: "Turn right onto Development Area Road (800 m)",
    note: "Avoid downhill drainage culvert",
  },
  {
    text: "Arrive at Paljor Stadium Main Gate (600 m)",
    note: "Medical camp & dry rations operational",
  },
];

const CACHE_KEY = "lews-route-cached-v1";

function SafeRoutePage() {
  const shelter = mockShelters[0]!;
  const [cached, setCached] = useState(false);

  useEffect(() => {
    try {
      setCached(window.localStorage.getItem(CACHE_KEY) === "1");
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggleCache = () => {
    setCached((prev) => {
      const next = !prev;
      try {
        if (next) window.localStorage.setItem(CACHE_KEY, "1");
        else window.localStorage.removeItem(CACHE_KEY);
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  };

  return (
    <div className="pb-6">
      <section aria-label="Active evacuation guide" className="mx-4 mt-4">
        <h1 className="font-display text-xl font-extrabold tracking-tight">
          Safe Route
        </h1>

        {/* Header card */}
        <div className="mt-3 rounded-3xl border border-aqua/40 bg-aqua/10 p-4">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-aqua">
            <Navigation className="size-3" aria-hidden="true" />
            Active Evacuation Guide from Current GPS
          </p>
          <p className="mt-2 text-sm font-bold leading-snug">
            Designated Relief Shelter: {shelter.name}, Gangtok
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-white/5 px-3 py-2">
              <p className="flex items-center gap-1 text-[9px] font-semibold text-muted-foreground">
                <RouteIcon className="size-3" aria-hidden="true" />
                Distance
              </p>
              <p className="text-sm font-bold">1.8 km</p>
            </div>
            <div className="rounded-lg bg-white/5 px-3 py-2">
              <p className="flex items-center gap-1 text-[9px] font-semibold text-muted-foreground">
                <Footprints className="size-3" aria-hidden="true" />
                Est. Walk Time
              </p>
              <p className="text-sm font-bold">22 mins</p>
            </div>
          </div>
        </div>

        {/* Route alert */}
        <div
          role="alert"
          className="mt-3 flex items-start gap-3 rounded-2xl border border-crit/50 bg-crit/15 p-3"
        >
          <OctagonAlert
            className="mt-0.5 size-5 shrink-0 text-crit"
            aria-hidden="true"
          />
          <p className="text-xs leading-relaxed">
            <span className="font-bold uppercase tracking-wide text-crit">
              Critical:
            </span>{" "}
            NH-10 Lower Valley Road is <span className="font-bold">BLOCKED</span>{" "}
            by debris flow at 20th Mile. Take Ridge Route via Development Area
            Road.
          </p>
        </div>

        {/* Turn-by-turn steps */}
        <div className="mt-3 rounded-3xl border border-line bg-white/5 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Turn-by-turn · works 100% offline
          </p>
          <ol className="mt-2">
            {STEPS.map((step, i) => (
              <li key={step.text} className="flex items-start gap-3 py-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-aqua/20 text-[12px] font-bold text-aqua">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold leading-relaxed text-foreground">
                    {step.text}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {step.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Offline cache toggle */}
        <div className="mt-3 rounded-2xl border border-line bg-white/5 p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-aqua/15 text-aqua">
                <Download className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold">Download / Cache Route Offline</p>
                <p
                  className={cn(
                    "flex items-center gap-1 text-[11px]",
                    cached ? "text-safe" : "text-muted-foreground",
                  )}
                >
                  {cached ? (
                    <>
                      <CheckCircle2 className="size-3" aria-hidden="true" />
                      Saved to Local Storage (Usable without signal)
                    </>
                  ) : (
                    "Not cached — requires signal"
                  )}
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={cached}
              aria-label="Cache route offline"
              onClick={toggleCache}
              className={cn(
                "relative h-7 w-12 shrink-0 rounded-full border transition-colors",
                cached
                  ? "border-safe/50 bg-safe/30"
                  : "border-line bg-white/10",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-5.5 rounded-full transition-all",
                  cached ? "left-[22px] bg-safe" : "left-0.5 bg-muted-foreground",
                )}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Shelter list */}
      <section aria-label="Evacuation shelters" className="mx-4 mt-5">
        <h2 className="font-display text-sm font-extrabold tracking-tight">
          Evacuation shelters
        </h2>
        <div className="mt-2 space-y-2">
          {mockShelters.map((s) => (
            <article
              key={s.id}
              className="rounded-2xl border border-line bg-white/5 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{s.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Footprints className="size-3" aria-hidden="true" />
                    {s.distanceM} m · {s.walkMinutes} min walk
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-md border border-line bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-foreground/80">
                  <BedDouble className="size-3" aria-hidden="true" />
                  {s.capacity} beds
                </span>
              </div>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {s.facilities.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-1 rounded-full border border-line bg-white/5 px-2 py-1 text-[10px] font-semibold text-muted-foreground"
                  >
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
