import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ReportCard } from "@/components/lews/ReportCard";
import { mockReports } from "@/data/mockLewsData";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community Reports — LEWS Landslide Early Warning" },
      {
        name: "description",
        content:
          "Citizen landslide reports from Western Ghats villages with community, panchayat-verified and geologist-confirmed status.",
      },
      { property: "og:title", content: "Community Reports — LEWS" },
      {
        property: "og:description",
        content: "Citizen landslide reports with verification status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <div className="pb-6">
      <section aria-label="Community reports" className="mx-4 mt-4">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-xl font-extrabold tracking-tight">
              Community
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Reports are reviewed by the panchayat, then confirmed by the
              district geologist cell.
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-white/5 px-2.5 py-1.5 text-[10px] font-bold text-muted-foreground">
            <Users className="size-3.5" aria-hidden="true" />
            {mockReports.length} today
          </span>
        </div>
        <div className="mt-4 space-y-2">
          {mockReports.map((r) => (
            <ReportCard key={r.id} report={r} />
          ))}
        </div>
      </section>
    </div>
  );
}
