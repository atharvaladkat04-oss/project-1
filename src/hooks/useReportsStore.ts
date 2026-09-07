import { useSyncExternalStore } from "react";
import type { CitizenReport } from "@/types/lews";
import { mockReports } from "@/data/mockLewsData";

let reports: CitizenReport[] = [...mockReports];
const listeners = new Set<() => void>();
const timers = new Map<string, ReturnType<typeof setTimeout>>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function approveReport(id: string) {
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }
  reports = reports.map((r) =>
    r.id === id ? { ...r, status: "panchayat_verified" as const } : r,
  );
  emit();
}

export function addReport(
  input: Omit<CitizenReport, "id" | "reportedAt" | "status">,
) {
  const id = `report-${Date.now()}`;
  const report: CitizenReport = {
    ...input,
    id,
    reportedAt: new Date().toISOString(),
    status: "pending",
  };
  reports = [report, ...reports];
  emit();

  // Mock verification pipeline: panchayat picks it up after 5 seconds.
  timers.set(
    id,
    setTimeout(() => approveReport(id), 5000),
  );
  return report;
}

export function useReportsStore() {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => reports,
    () => reports,
  );
  return { reports: snapshot, addReport, approveReport };
}
