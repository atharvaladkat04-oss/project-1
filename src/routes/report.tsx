import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Camera, CloudOff, Send } from "lucide-react";
import { RISK_CONFIG } from "@/components/lews/RiskIndicator";
import { useOfflineStore } from "@/hooks/useOfflineStore";
import type { RiskLevel } from "@/types/lews";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report a Hazard — LEWS Landslide Early Warning" },
      {
        name: "description",
        content:
          "Report cracks, muddy streams or rockfall to the panchayat and geologists. Works offline — reports sync when connectivity returns.",
      },
      { property: "og:title", content: "Report a Hazard — LEWS" },
      {
        property: "og:description",
        content: "Report landslide warning signs; works offline and syncs later.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const { offlineMode, queueReport, pendingReports } = useOfflineStore();
  const [severity, setSeverity] = useState<RiskLevel>("warning");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    queueReport();
    setSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <div className="pb-6">
      <section aria-label="Report a hazard" className="mx-4 mt-4">
        <h1 className="font-display text-xl font-extrabold tracking-tight">
          Report a Hazard
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Your report goes to the gram panchayat and the district geologist
          cell. {offlineMode ? "You are offline — it will be queued and sent when the network returns." : ""}
        </p>

        {submitted && (
          <div
            role="status"
            className="mt-3 flex items-center gap-2 rounded-2xl border border-safe/40 bg-safe/15 p-3 text-xs font-semibold text-safe"
          >
            <CloudOff className="size-4" aria-hidden="true" />
            Report {offlineMode ? "queued for sync" : "submitted"}. Pending:{" "}
            {pendingReports}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <fieldset>
            <legend className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Severity
            </legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(Object.keys(RISK_CONFIG) as RiskLevel[]).map((level) => {
                const cfg = RISK_CONFIG[level];
                const Icon = cfg.icon;
                const active = severity === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSeverity(level)}
                    aria-pressed={active}
                    className={cn(
                      "flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl border p-2 text-[10px] font-bold uppercase tracking-wide",
                      active
                        ? cn(cfg.border, cfg.softBg, cfg.text)
                        : "border-line bg-white/5 text-muted-foreground",
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="report-title"
              className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground"
            >
              What did you see?
            </label>
            <input
              id="report-title"
              name="title"
              required
              placeholder="e.g. Cracks on the road shoulder"
              className="mt-2 min-h-11 w-full rounded-xl border border-line bg-white/5 px-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-aqua"
            />
          </div>

          <div>
            <label
              htmlFor="report-details"
              className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground"
            >
              Details
            </label>
            <textarea
              id="report-details"
              name="details"
              rows={4}
              placeholder="Where is it? How big? Since when?"
              className="mt-2 w-full rounded-xl border border-line bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-aqua"
            />
          </div>

          <button
            type="button"
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-line bg-white/5 text-sm font-semibold text-muted-foreground"
          >
            <Camera className="size-4" aria-hidden="true" />
            Attach a photo (uses GPS tag)
          </button>

          <button
            type="submit"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-aqua text-sm font-bold text-slate-deep"
          >
            <Send className="size-4" aria-hidden="true" />
            {offlineMode ? "Queue report" : "Send report"}
          </button>
        </form>
      </section>
    </div>
  );
}
