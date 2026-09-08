import type {
  Alert,
  CitizenReport,
  EvacuationShelter,
  RiskZone,
  SavedLocation,
  SensorData,
} from "@/types/lews";

// Northeast India corridor — Sikkim / NH-10 (Gangtok · Dikchu · Singtam)
export const mockRiskZones: RiskZone[] = [
  {
    id: "zone-sk02",
    name: "Mangan / Dikchu Corridor",
    district: "Mangan",
    level: "critical",
    center: { lat: 27.407, lng: 88.515 },
    radiusM: 2200,
    slopeDeg: 44,
    soilMoisturePct: 88,
    rainfallMmHr: 96,
    lastAssessedAt: "2026-09-05T06:32:00+05:30",
  },
  {
    id: "zone-sk01",
    name: "Singtam – NH-10 Flank",
    district: "Gangtok",
    level: "warning",
    center: { lat: 27.2346, lng: 88.5019 },
    radiusM: 2500,
    slopeDeg: 32,
    soilMoisturePct: 74,
    rainfallMmHr: 58,
    lastAssessedAt: "2026-09-05T06:18:00+05:30",
  },
  {
    id: "zone-sk03",
    name: "Gangtok Upper Ridge",
    district: "Gangtok",
    level: "normal",
    center: { lat: 27.35, lng: 88.613 },
    radiusM: 2600,
    slopeDeg: 21,
    soilMoisturePct: 46,
    rainfallMmHr: 14,
    lastAssessedAt: "2026-09-05T05:50:00+05:30",
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "alert-01",
    level: "critical",
    title: "Critical Evacuation",
    message: "Mangan / Dikchu Corridor · Zone SK-02",
    zoneId: "zone-sk02",
    issuedAt: "2026-09-05T06:40:00+05:30",
    instruction: "Move to Paljor Stadium Shelter now",
    distanceToShelterM: 1800,
  },
  {
    id: "alert-02",
    level: "warning",
    title: "Stay Alert",
    message: "Singtam – NH-10 Flank · Zone SK-01",
    zoneId: "zone-sk01",
    issuedAt: "2026-09-05T06:28:00+05:30",
    instruction: "Heavy rain expected within 90 min · avoid NH-10 lower valley",
  },
  {
    id: "alert-03",
    level: "normal",
    title: "Normal",
    message: "Gangtok Upper Ridge · Zone SK-03",
    zoneId: "zone-sk03",
    issuedAt: "2026-09-05T05:42:00+05:30",
    instruction: "Soil stable · safe conditions",
  },
];

export const mockSensors: SensorData[] = [
  {
    id: "sensor-rg-01",
    zoneId: "zone-sk02",
    type: "rain_gauge",
    label: "Rain intensity",
    value: 96,
    unit: "mm/hr",
    status: "critical",
    recordedAt: "2026-09-05T06:41:00+05:30",
  },
  {
    id: "sensor-sm-02",
    zoneId: "zone-sk02",
    type: "soil_moisture",
    label: "Soil saturation",
    value: 88,
    unit: "%",
    status: "critical",
    recordedAt: "2026-09-05T06:39:00+05:30",
  },
  {
    id: "sensor-tl-03",
    zoneId: "zone-sk01",
    type: "tilt",
    label: "Slope displacement",
    value: 3.2,
    unit: "mm/day",
    status: "warning",
    recordedAt: "2026-09-05T06:20:00+05:30",
  },
];

export const mockReports: CitizenReport[] = [
  {
    id: "report-01",
    title: "Rockfall blocking one lane on NH-10 near Dikchu",
    description:
      "Boulders came down the cut slope onto the highway after the night cloudburst. Traffic squeezed to one lane, debris still moving.",
    location: { lat: 27.4019, lng: 88.5127 },
    village: "Dikchu",
    reportedBy: "T. Bhutia",
    reportedAt: "2026-09-05T06:18:00+05:30",
    status: "verified",
    verifiedBy: "SSDMA / District Authority",
    severity: "critical",
    photoAttached: true,
  },
  {
    id: "report-02",
    title: "Fresh cracks across NH-10 carriageway near Melli turn",
    description:
      "Cracks about 2 cm wide opened across the road shoulder; tilt sensors on the uphill flank show movement. GSI telemetry corroborates displacement.",
    location: { lat: 27.2346, lng: 88.5019 },
    village: "Singtam",
    reportedBy: "K. Lepcha",
    reportedAt: "2026-09-05T05:50:00+05:30",
    status: "geologist_confirmed",
    severity: "warning",
    photoAttached: false,
  },
  {
    id: "report-03",
    title: "Muddy seepage in roadside drain, upper Gangtok",
    description:
      "Drain water behind Deorali turned brown within an hour. Cleared by residents; no active ground movement seen so far.",
    location: { lat: 27.3389, lng: 88.6065 },
    village: "Gangtok",
    reportedBy: "P. Sharma",
    reportedAt: "2026-09-05T04:31:00+05:30",
    status: "community",
    severity: "normal",
    photoAttached: true,
  },
];

export const mockShelters: EvacuationShelter[] = [
  {
    id: "shelter-01",
    name: "Paljor Stadium Disaster Shelter",
    position: { lat: 27.3342, lng: 88.6122 },
    capacity: 1200,
    distanceM: 1800,
    walkMinutes: 26,
    facilities: ["Drinking water", "First aid", "Generator"],
  },
  {
    id: "shelter-02",
    name: "Singtam Community Hall",
    position: { lat: 27.2353, lng: 88.5004 },
    capacity: 350,
    distanceM: 640,
    walkMinutes: 11,
    facilities: ["Drinking water", "Toilets", "Kitchen"],
  },
];

export const mockSavedLocations: SavedLocation[] = [
  {
    id: "loc-home",
    label: "Home",
    village: "Gangtok",
    position: { lat: 27.3389, lng: 88.6065 },
    isDefault: true,
  },
  {
    id: "loc-site",
    label: "Field site",
    village: "Dikchu",
    position: { lat: 27.4019, lng: 88.5127 },
    isDefault: false,
  },
];
