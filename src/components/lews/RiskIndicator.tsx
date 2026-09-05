import { CircleCheck, OctagonAlert, TriangleAlert } from "lucide-react";
import type { RiskLevel } from "@/types/lews";
import { cn } from "@/lib/utils";

/*
 * Global UX rule: every risk indicator combines Icon + Text Label + Color.
 * Never rely on color alone.
 */
export const RISK_CONFIG: Record<
  RiskLevel,
  {
    icon: typeof OctagonAlert;
    label: string;
    text: string;
    softBg: string;
    border: string;
    solidBg: string;
  }
> = {
  critical: {
    icon: OctagonAlert,
    label: "CRITICAL EVACUATION",
    text: "text-crit",
    softBg: "bg-crit/20",
    border: "border-crit/40",
    solidBg: "bg-crit",
  },
  warning: {
    icon: TriangleAlert,
    label: "STAY ALERT",
    text: "text-warn",
    softBg: "bg-warn/20",
    border: "border-warn/40",
    solidBg: "bg-warn",
  },
  normal: {
    icon: CircleCheck,
    label: "NORMAL · SAFE",
    text: "text-safe",
    softBg: "bg-safe/20",
    border: "border-safe/30",
    solidBg: "bg-safe",
  },
};

export function RiskIndicator({
  level,
  label,
  className,
}: {
  level: RiskLevel;
  label?: string;
  className?: string;
}) {
  const cfg = RISK_CONFIG[level];
  const Icon = cfg.icon;
  return (
    <span
      role="status"
      aria-label={`Risk level: ${label ?? cfg.label}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wide",
        cfg.border,
        cfg.softBg,
        "text-foreground",
        className,
      )}
    >
      <Icon className={cn("size-3", cfg.text)} aria-hidden="true" />
      {label ?? cfg.label}
    </span>
  );
}

export function RiskIconBadge({
  level,
  className,
}: {
  level: RiskLevel;
  className?: string;
}) {
  const cfg = RISK_CONFIG[level];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-xl",
        cfg.softBg,
        cfg.text,
        className,
      )}
      aria-hidden="true"
    >
      <Icon className="size-5" />
    </span>
  );
}
