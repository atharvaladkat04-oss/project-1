import { BadgeCheck, Camera, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import type { CitizenReport, ReportStatus } from "@/types/lews";
import { RISK_CONFIG, RiskIconBadge } from "./RiskIndicator";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/time";

const STATUS_CONFIG: Record<
  ReportStatus,
  { icon: typeof MessageCircle; label: string; classes: string }
> = {
  community: {
    icon: MessageCircle,
    label: "Community",
    classes: "text-safe bg-safe/15 border-safe/30",
  },
  panchayat_verified: {
    icon: ShieldCheck,
    label: "Panchayat",
    classes: "text-warn bg-warn/15 border-warn/30",
  },
  geologist_confirmed: {
    icon: BadgeCheck,
    label: "Confirmed",
    classes: "text-crit bg-crit/15 border-crit/40",
  },
};

export function ReportCard({ report }: { report: CitizenReport }) {
  const risk = RISK_CONFIG[report.severity];
  const status = STATUS_CONFIG[report.status];
  const StatusIcon = status.icon;
  return (
    <article className="rounded-2xl border border-line bg-white/5 p-3">
      <div className="flex items-start gap-3">
        <RiskIconBadge level={report.severity} className="size-9" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug">{report.title}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3 shrink-0" aria-hidden="true" />
            {report.village} · {formatRelativeTime(report.reportedAt)} ·{" "}
            {report.reportedBy}
          </p>
        </div>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wide",
            status.classes,
          )}
        >
          <StatusIcon className="size-3" aria-hidden="true" />
          {status.label}
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {report.description}
      </p>
      <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold text-muted-foreground">
        <span className={cn("h-1.5 w-1.5 rounded-full", risk.solidBg)} aria-hidden="true" />
        Severity: {risk.label}
        {report.photoAttached && (
          <span className="flex items-center gap-1">
            <Camera className="size-3" aria-hidden="true" /> Photo attached
          </span>
        )}
      </div>
    </article>
  );
}
