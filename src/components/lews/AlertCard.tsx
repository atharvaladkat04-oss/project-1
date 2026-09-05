import type { Alert } from "@/types/lews";
import { RISK_CONFIG, RiskIconBadge } from "./RiskIndicator";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/time";

export function AlertCard({ alert }: { alert: Alert }) {
  const cfg = RISK_CONFIG[alert.level];
  return (
    <article
      className={cn(
        "flex items-center gap-3 rounded-2xl border p-3",
        cfg.border,
        cfg.softBg.replace("/20", "/10"),
      )}
    >
      <RiskIconBadge level={alert.level} />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-[10px] font-bold uppercase tracking-[0.16em]",
            cfg.text,
          )}
        >
          {cfg.label}
        </p>
        <p className="truncate text-sm font-bold">{alert.message}</p>
        <p className="truncate text-xs text-muted-foreground">
          {alert.instruction}
        </p>
      </div>
      <span className="shrink-0 text-[10px] font-bold text-muted-foreground">
        {formatRelativeTime(alert.issuedAt)}
      </span>
    </article>
  );
}
