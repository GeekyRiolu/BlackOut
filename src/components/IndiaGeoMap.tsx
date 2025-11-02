import React, { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoCentroid } from "d3-geo";

type Props = {
  selectedState?: string | null;
  onSelectState: (state: string | null) => void;
  width?: number;
  height?: number;
  states?: Array<{ state: string; incidents: number }>;
};

function normalizeName(s: string | null | undefined) {
  if (!s) return "";
  try {
    return s
      .toString()
      .trim()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[\.\-_,;:\(\)\[\]"']/g, "")
      .replace(/\s+/g, " ")
      .toLowerCase();
  } catch (e) {
    return s
      .toString()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\.\-_,;:\(\)\[\]"']/g, "")
      .replace(/\s+/g, " ")
      .toLowerCase();
  }
}

function getFeatureName(feat: any) {
  if (!feat || !feat.properties) return null;
  const p = feat.properties;
  return p.name || p.NAME || p.ST_NM || p.STATE_NAME || p.st_nm || p.STATE || p.state || null;
}

export default function IndiaGeoMap({ selectedState, onSelectState, width = 800, height = 600, states = [] }: Props) {
  const projectionConfig = { scale: 900, center: [78.9629, 22.5937] };

  const [geo, setGeo] = useState<any | null>(null);
  const [geographies, setGeographies] = useState<any[] | null>(null);
  const [featureLabels, setFeatureLabels] = useState<Array<string>>([]);

  useEffect(() => {
    fetch("/india-composite.geojson")
      .then((r) => r.json())
      .then((data) => {
        setGeo(data);
        if (data && data.features) setGeographies(data.features);
        // build a list of label-candidates for each feature to improve matching
        try {
          const labels = (data.features || []).map((f: any, idx: number) => {
            const props = f.properties || {};
            const vals = Object.values(props).filter(Boolean).join(" ");
            // include common fallbacks
            return (vals || props.NAME || props.name || props.ST_NM || props.STATE_NAME || `feature-${idx}`).toString();
          });
          setFeatureLabels(labels.map((l: string) => normalizeName(l)));
        } catch (e) {
          // ignore
        }
      })
      .catch((err) => console.error("Failed loading india geojson:", err));
  }, []);

  // incidents map and max
  const incidentsMap = new Map<string, number>();
  let maxIncidents = 0;
  if (states && Array.isArray(states)) {
    states.forEach((s) => {
      const n = normalizeName(s.state);
      const newCount = (incidentsMap.get(n) || 0) + (s.incidents || 0);
      incidentsMap.set(n, newCount);
      if (newCount > maxIncidents) maxIncidents = newCount;
    });
  }

  function findFeatureByName(normName: string) {
    if (!geographies) return null;
    // direct name match
    const direct = geographies.find((g) => normalizeName(getFeatureName(g)) === normName);
    if (direct) return direct;

    // try matching against precomputed featureLabels (contains normalized props)
    if (featureLabels && featureLabels.length === geographies.length) {
      const idx = featureLabels.findIndex((lab) => lab && lab.indexOf(normName) !== -1 || normName.indexOf(lab) !== -1);
      if (idx >= 0) return geographies[idx];
    }

    // fallback: check if normalized state appears anywhere in the serialized feature
    const idx = geographies.findIndex((g) => JSON.stringify(g).toLowerCase().indexOf(normName) !== -1);
    if (idx >= 0) return geographies[idx];

    return null;
  }

  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const [center, setCenter] = useState<[number, number]>([78.9629, 22.5937]);
  const [zoom, setZoom] = useState<number>(1.0);
  const animRef = useRef<number | null>(null);

  function animateTo(targetCenter: [number, number], targetZoom: number, duration = 450) {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const startC = center;
    const startZ = zoom;
    const start = performance.now();
    function step(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const nx = startC[0] + (targetCenter[0] - startC[0]) * ease;
      const ny = startC[1] + (targetCenter[1] - startC[1]) * ease;
      const nz = startZ + (targetZoom - startZ) * ease;
      setCenter([nx, ny]);
      setZoom(nz);
      if (t < 1) animRef.current = requestAnimationFrame(step);
      else animRef.current = null;
    }
    animRef.current = requestAnimationFrame(step);
  }

  useEffect(() => {
    if (!selectedState || !geographies) {
      animateTo([78.9629, 22.5937], 1.0);
      return;
    }
    const norm = normalizeName(selectedState as any);
    const feat = findFeatureByName(norm);
    if (!feat) return;
    const centroid = geoCentroid(feat as any) as [number, number];
    animateTo([centroid[0], centroid[1]], 3.2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState, geographies]);

  return (
    <div style={{ width: "100%", maxWidth: width, height, position: "relative" }}>
      <ComposableMap projection="geoMercator" projectionConfig={projectionConfig} width={width} height={height}>
        <ZoomableGroup center={center} zoom={zoom}>
          {geo ? (
            <Geographies geography={geo as any}>
              {({ geographies }) =>
                geographies.map((geoFeat: any) => {
                  const featName = getFeatureName(geoFeat) || "Unknown";
                  const nFeat = normalizeName(featName);
                  const nSel = normalizeName(selectedState as any);
                  const isSelected = Boolean(nSel && nSel === nFeat);
                  const count = incidentsMap.get(nFeat) || 0;
                  const t = maxIncidents > 0 ? count / maxIncidents : 0;
                  const defaultFill = `hsl(var(--muted))`;
                  const intensity = `hsl(var(--chart-1) / ${0.15 + 0.85 * t})`;
                  const fill = isSelected ? `hsl(var(--primary) / 0.95)` : count > 0 ? intensity : defaultFill;

                  return (
                    <Geography
                      key={geoFeat.rsmKey}
                      geography={geoFeat}
                      onClick={() => onSelectState(isSelected ? null : featName)}
                      onMouseEnter={(evt: any) => setTooltip({ x: evt.clientX, y: evt.clientY, text: `${featName} — ${count} incident(s)` })}
                      onMouseMove={(evt: any) => setTooltip((prev) => (prev ? { x: evt.clientX, y: evt.clientY, text: prev.text } : { x: evt.clientX, y: evt.clientY, text: `${featName} — ${count} incident(s)` }))}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        default: { fill, stroke: "hsl(var(--border))", strokeWidth: isSelected ? 2.5 : 0.8, outline: "none", transition: "fill 150ms ease, stroke-width 150ms ease", cursor: "pointer" },
                        hover: { fill: isSelected ? "hsl(var(--primary))" : "hsl(var(--primary)/0.9)", cursor: "pointer" },
                        pressed: { fill: "hsl(var(--primary))" },
                      }}
                      aria-label={`${featName} (${count} incidents)`}
                    />
                  );
                })
              }
            </Geographies>
          ) : null}
        </ZoomableGroup>
      </ComposableMap>

      {tooltip && (
        <div style={{ position: "absolute", left: tooltip.x + 8, top: tooltip.y + 8, background: "hsl(var(--card))", padding: "6px 8px", borderRadius: 6, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", pointerEvents: "none", zIndex: 60 }}>
          <div style={{ fontSize: 12, fontWeight: 600 }}>{tooltip.text}</div>
        </div>
      )}

      <div style={{ position: "absolute", right: 12, bottom: 12, background: "hsl(var(--card))", padding: "8px 10px", borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,0.08)", fontSize: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Incidents</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 120, height: 12, background: "linear-gradient(90deg, rgba(230,230,230,1) 0%, rgba(0,120,220,0.95) 100%)", borderRadius: 6 }} />
          <div style={{ minWidth: 36, textAlign: "right" }}>0</div>
          <div style={{ minWidth: 40, textAlign: "right", fontWeight: 700 }}>{maxIncidents}</div>
        </div>
      </div>
    </div>
  );
}
