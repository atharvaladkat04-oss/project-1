import { BadgeCheck, Camera, CheckCircle2, Clock, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import type { CitizenReport, ReportStatus } from "@/types/lews";
import { RISK_CONFIG, RiskIconBadge } from "./RiskIndicator";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/time";
import { approveReport } from "@/hooks/useReportsStore";

const STATUS_CONFIG: Record<
  ReportStatus,
  { icon: typeof MessageCircle; label: string; classes: string }
> = {
  pending: {
    icon: Clock,
    label: "Pending Verification",
    classes: "text-warn bg-warn/15 border-warn/40",
  },
  verified: {
    icon: CheckCircle2,
    label: "Verified by SSDMA",
    classes: "text-safe bg-safe/15 border-safe/40",
  },
  community: {
    icon: MessageCircle,
    label: "Community",
    classes: "text-safe bg-safe/15 border-safe/30",
  },
  panchayat_verified: {
    icon: CheckCircle2,
    label: "Verified by Local Panchayat",
    classes: "text-safe bg-safe/15 border-safe/40",
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
  const isPending = report.status === "pending";

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
            "flex max-w-[42%] shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-right text-[10px] font-bold uppercase leading-tight tracking-wide",
            status.classes,
            isPending && "animate-pulse",
          )}
        >
          <StatusIcon className="size-3 shrink-0" aria-hidden="true" />
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
      {isPending && (
        <button
          type="button"
          onClick={() => approveReport(report.id)}
          className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-safe/40 bg-safe/15 text-xs font-bold text-safe"
        >
          <ShieldCheck className="size-4" aria-hidden="true" />
          Simulate Instant Approval
        </button>
      )}
    </article>
  );
}
