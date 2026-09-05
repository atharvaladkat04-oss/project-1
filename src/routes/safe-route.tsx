import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BedDouble,
  Droplets,
  Footprints,
  HeartPulse,
  Zap,
  UtensilsCrossed,
  Toilet,
} from "lucide-react";
import { mockShelters } from "@/data/mockLewsData";

export const Route = createFileRoute("/safe-route")({
  head: () => ({
    meta: [
      { title: "Safe Route — LEWS Landslide Early Warning" },
      {
        name: "description",
        content:
          "Nearest evacuation shelters in the Western Ghats with walking distance, capacity and available facilities.",
      },
      { property: "og:title", content: "Safe Route — LEWS" },
      {
        property: "og:description",
        content:
          "Nearest evacuation shelters with walking distance and facilities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SafeRoutePage,
});

const FACILITY_ICONS: Record<string, typeof Droplets> = {
  "Drinking water": Droplets,
  "First aid": HeartPulse,
  Generator: Zap,
  Toilets: Toilet,
  Kitchen: UtensilsCrossed,
};

function SafeRoutePage() {
  const nearest = mockShelters[0]!;
  return (
    <div className="pb-6">
      <section aria-label="Nearest shelter route" className="mx-4 mt-4">
        <h1 className="font-display text-xl font-extrabold tracking-tight">
          Safe Route
        </h1>
        <div className="mt-3 overflow-hidden rounded-3xl border border-aqua/40 bg-aqua/10">
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-aqua">
              Recommended evacuation
            </p>
            <p className="mt-1 text-sm font-bold">
              Khireshwar → {nearest.name}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-white/5 px-3 py-2">
                <p className="text-[9px] font-semibold text-muted-foreground">
                  Distance
                </p>
                <p className="text-sm font-bold">{nearest.distanceM} m</p>
              </div>
              <div className="rounded-lg bg-white/5 px-3 py-2">
                <p className="text-[9px] font-semibold text-muted-foreground">
                  Walking time
                </p>
                <p className="text-sm font-bold">{nearest.walkMinutes} min</p>
              </div>
            </div>
          </div>
          <ol className="border-t border-line px-4 py-3">
            {[
              "Exit via the north lane, away from the slope",
              "Follow the marked blue reflectors past the temple",
              "Cross the footbridge — do not use the ghat road",
              "Check in with the shelter warden on arrival",
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-3 py-1.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-aqua/20 text-[11px] font-bold text-aqua">
                  {i + 1}
                </span>
                <span className="text-xs leading-relaxed text-foreground/90">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
                {s.facilities.map((f) => {
                  const Icon = FACILITY_ICONS[f] ?? ArrowUpRight;
                  return (
                    <li
                      key={f}
                      className="flex items-center gap-1 rounded-full border border-line bg-white/5 px-2 py-1 text-[10px] font-semibold text-muted-foreground"
                    >
                      <Icon className="size-3" aria-hidden="true" />
                      {f}
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
