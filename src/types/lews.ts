export type RiskLevel = "critical" | "warning" | "normal";

export type ReportStatus =
  | "community"
  | "panchayat_verified"
  | "geologist_confirmed";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Alert {
  id: string;
  level: RiskLevel;
  title: string;
  message: string;
  zoneId: string;
  issuedAt: string; // ISO timestamp
  instruction: string;
  distanceToShelterM?: number;
}

export interface RiskZone {
  id: string;
  name: string;
  district: string;
  level: RiskLevel;
  center: GeoPoint;
  radiusM: number;
  slopeDeg: number;
  soilMoisturePct: number;
  rainfallMmHr: number;
  lastAssessedAt: string;
}

export interface SensorData {
  id: string;
  zoneId: string;
  type: "rain_gauge" | "soil_moisture" | "tilt" | "piezometer";
  label: string;
  value: number;
  unit: string;
  status: RiskLevel;
  recordedAt: string;
}

export interface CitizenReport {
  id: string;
  title: string;
  description: string;
  location: GeoPoint;
  village: string;
  reportedBy: string;
  reportedAt: string;
  status: ReportStatus;
  severity: RiskLevel;
  photoAttached: boolean;
}

export interface SavedLocation {
  id: string;
  label: string;
  village: string;
  position: GeoPoint;
  isDefault: boolean;
}

export interface EvacuationShelter {
  id: string;
  name: string;
  position: GeoPoint;
  capacity: number;
  distanceM: number;
  walkMinutes: number;
  facilities: string[];
}
