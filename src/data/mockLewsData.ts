import type {
  Alert,
  CitizenReport,
  EvacuationShelter,
  RiskZone,
  SavedLocation,
  SensorData,
} from "@/types/lews";

// Western Ghats, Maharashtra — Malshej Ghat / Igatpuri / Satara belt
export const mockRiskZones: RiskZone[] = [
  {
    id: "zone-kg02",
    name: "Malshej Ghat",
    district: "Thane",
    level: "critical",
    center: { lat: 19.3467, lng: 73.7879 },
    radiusM: 1800,
    slopeDeg: 42,
    soilMoisturePct: 96,
    rainfallMmHr: 84,
    lastAssessedAt: "2026-09-05T06:32:00+05:30",
  },
  {
    id: "zone-kg01",
    name: "Igatpuri Ridge",
    district: "Nashik",
    level: "warning",
    center: { lat: 19.6952, lng: 73.5627 },
    radiusM: 2500,
    slopeDeg: 34,
    soilMoisturePct: 78,
    rainfallMmHr: 62,
    lastAssessedAt: "2026-09-05T06:18:00+05:30",
  },
  {
    id: "zone-kg03",
    name: "Kavathe Mahankal",
    district: "Sangli",
    level: "normal",
    center: { lat: 17.0104, lng: 74.8697 },
    radiusM: 3000,
    slopeDeg: 18,
    soilMoisturePct: 41,
    rainfallMmHr: 12,
    lastAssessedAt: "2026-09-05T05:50:00+05:30",
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "alert-01",
    level: "critical",
    title: "Critical Evacuation",
    message: "Malshej Ghat · Zone KG-02",
    zoneId: "zone-kg02",
    issuedAt: "2026-09-05T06:40:00+05:30",
    instruction: "Move to Dahanur Shelter now",
    distanceToShelterM: 142,
  },
  {
    id: "alert-02",
    level: "warning",
    title: "Stay Alert",
    message: "Igatpuri Ridge · Zone KG-01",
    zoneId: "zone-kg01",
    issuedAt: "2026-09-05T06:28:00+05:30",
    instruction: "Heavy rain expected within 90 min",
  },
  {
    id: "alert-03",
    level: "normal",
    title: "Normal",
    message: "Kavathe Mahankal · Zone KG-03",
    zoneId: "zone-kg03",
    issuedAt: "2026-09-05T05:42:00+05:30",
    instruction: "Soil stable · safe conditions",
  },
];

export const mockSensors: SensorData[] = [
  {
    id: "sensor-rg-01",
    zoneId: "zone-kg02",
    type: "rain_gauge",
    label: "Rain intensity",
    value: 84,
    unit: "mm/hr",
    status: "critical",
    recordedAt: "2026-09-05T06:41:00+05:30",
  },
  {
    id: "sensor-sm-02",
    zoneId: "zone-kg02",
    type: "soil_moisture",
    label: "Soil saturation",
    value: 96,
    unit: "%",
    status: "critical",
    recordedAt: "2026-09-05T06:39:00+05:30",
  },
  {
    id: "sensor-tl-03",
    zoneId: "zone-kg01",
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
    title: "Cracks across the ghat road shoulder",
    description:
      "Fresh cracks about 2 cm wide along the retaining wall near Khireshwar turn. Mud is sliding onto the road.",
    location: { lat: 19.3512, lng: 73.7912 },
    village: "Khireshwar",
    reportedBy: "S. Pawar",
    reportedAt: "2026-09-05T06:18:00+05:30",
    status: "geologist_confirmed",
    severity: "critical",
    photoAttached: true,
  },
  {
    id: "report-02",
    title: "Stream water suddenly turned muddy brown",
    description:
      "The nullah behind the ZP school turned brown within an hour — usual early sign of upstream slope movement.",
    location: { lat: 19.6988, lng: 73.5571 },
    village: "Ghatandevi",
    reportedBy: "A. More",
    reportedAt: "2026-09-05T05:50:00+05:30",
    status: "panchayat_verified",
    severity: "warning",
    photoAttached: false,
  },
  {
    id: "report-03",
    title: "Small rockfall cleared on footpath",
    description:
      "Loose boulders rolled onto the footpath after night rain. Cleared by villagers, no active movement seen.",
    location: { lat: 17.015, lng: 74.872 },
    village: "Kavathe Mahankal",
    reportedBy: "R. Jadhav",
    reportedAt: "2026-09-05T04:31:00+05:30",
    status: "community",
    severity: "normal",
    photoAttached: true,
  },
];

export const mockShelters: EvacuationShelter[] = [
  {
    id: "shelter-01",
    name: "Dahanur Community Hall",
    position: { lat: 19.3441, lng: 73.7902 },
    capacity: 320,
    distanceM: 142,
    walkMinutes: 4,
    facilities: ["Drinking water", "First aid", "Generator"],
  },
  {
    id: "shelter-02",
    name: "ZP School, Ghatandevi",
    position: { lat: 19.7001, lng: 73.5598 },
    capacity: 180,
    distanceM: 640,
    walkMinutes: 11,
    facilities: ["Drinking water", "Toilets", "Kitchen"],
  },
];

export const mockSavedLocations: SavedLocation[] = [
  {
    id: "loc-home",
    label: "Home",
    village: "Khireshwar",
    position: { lat: 19.349, lng: 73.789 },
    isDefault: true,
  },
  {
    id: "loc-farm",
    label: "Family farm",
    village: "Ghatandevi",
    position: { lat: 19.6972, lng: 73.5601 },
    isDefault: false,
  },
];
