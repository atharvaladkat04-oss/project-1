import { Circle, CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { mockRiskZones, mockShelters } from "@/data/mockLewsData";
import { RISK_CONFIG } from "./RiskIndicator";
import type { RiskLevel } from "@/types/lews";

/*
 * Browser-only Leaflet map. Never statically import this module from an
 * SSR route — load it via React.lazy behind <ClientOnly>.
 */

const ZONE_COLORS: Record<RiskLevel, { stroke: string; fill: string }> = {
  critical: { stroke: "#ef4444", fill: "#ef4444" },
  warning: { stroke: "#f59e0b", fill: "#f59e0b" },
  normal: { stroke: "#22c55e", fill: "#22c55e" },
};

const CENTER: [number, number] = [19.35, 73.79];

export default function HazardMap() {
  return (
    <MapContainer
      center={CENTER}
      zoom={11}
      zoomControl={false}
      attributionControl={false}
      className="h-72 w-full"
      style={{ background: "#0a1826" }}
    >
      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" />
      {mockRiskZones.map((zone) => {
        const colors = ZONE_COLORS[zone.level];
        const cfg = RISK_CONFIG[zone.level];
        return (
          <Circle
            key={zone.id}
            center={[zone.center.lat, zone.center.lng]}
            radius={zone.radiusM}
            pathOptions={{
              color: colors.stroke,
              fillColor: colors.fill,
              fillOpacity: 0.28,
              weight: 2,
            }}
          >
            <Popup>
              <div style={{ minWidth: 160 }}>
                <p style={{ fontWeight: 800, margin: 0 }}>{zone.name}</p>
                <p style={{ margin: "2px 0", fontSize: 12 }}>
                  ⚠ {cfg.label}
                </p>
                <p style={{ margin: 0, fontSize: 12 }}>
                  Rain {zone.rainfallMmHr} mm/hr · Slope {zone.slopeDeg}°
                </p>
              </div>
            </Popup>
          </Circle>
        );
      })}
      {mockShelters.map((shelter) => (
        <CircleMarker
          key={shelter.id}
          center={[shelter.position.lat, shelter.position.lng]}
          radius={7}
          pathOptions={{ color: "#0a1826", fillColor: "#67e8f9", fillOpacity: 1, weight: 2 }}
        >
          <Popup>
            <p style={{ fontWeight: 800, margin: 0 }}>{shelter.name}</p>
            <p style={{ margin: "2px 0", fontSize: 12 }}>
              Shelter · capacity {shelter.capacity} · {shelter.walkMinutes} min walk
            </p>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
