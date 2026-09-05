import { useSyncExternalStore } from "react";
import type { Alert, GeoPoint } from "@/types/lews";

const STORAGE_KEY = "lews-offline-store-v1";

export interface OfflineState {
  offlineMode: boolean;
  lastKnownLocation: GeoPoint | null;
  cachedAlerts: Alert[];
  lastSyncAt: string | null;
  pendingReports: number;
}

const DEFAULT_STATE: OfflineState = {
  offlineMode: false,
  lastKnownLocation: { lat: 19.349, lng: 73.789 }, // Khireshwar, Malshej
  cachedAlerts: [],
  lastSyncAt: "2026-09-05T06:47:00+05:30",
  pendingReports: 0,
};

function loadState(): OfflineState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<OfflineState>) };
  } catch {
    return DEFAULT_STATE;
  }
}

let state: OfflineState = loadState();
const listeners = new Set<() => void>();

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full / unavailable — app keeps working in memory
  }
}

function setState(patch: Partial<OfflineState>) {
  state = { ...state, ...patch };
  persist();
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useOfflineStore() {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => state,
    () => DEFAULT_STATE,
  );

  return {
    ...snapshot,
    setOfflineMode: (offlineMode: boolean) =>
      setState({
        offlineMode,
        lastSyncAt: offlineMode ? state.lastSyncAt : new Date().toISOString(),
      }),
    saveLocation: (lastKnownLocation: GeoPoint) =>
      setState({ lastKnownLocation }),
    cacheAlerts: (cachedAlerts: Alert[]) =>
      setState({ cachedAlerts, lastSyncAt: new Date().toISOString() }),
    queueReport: () =>
      setState({ pendingReports: state.pendingReports + 1 }),
    flushReports: () => setState({ pendingReports: 0 }),
  };
}
