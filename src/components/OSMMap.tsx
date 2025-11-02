import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type StatePoint = {
  state: string;
  incidents: number;
};

const STATE_COORDS: Record<string, [number, number]> = {
  "Maharashtra": [19.7515, 75.7139],
  "Delhi": [28.7041, 77.1025],
  "Karnataka": [15.3173, 75.7139],
  "Tamil Nadu": [11.1271, 78.6569],
  "West Bengal": [22.9868, 87.8550],
  "Uttar Pradesh": [26.8467, 80.9462],
  "Gujarat": [22.2587, 71.1924],
  "Kerala": [10.8505, 76.2711],
  "Rajasthan": [27.0238, 73.3178],
  "Telangana": [18.1124, 79.0193],
  "Andhra Pradesh": [15.9129, 79.7400],
  "Assam": [26.2006, 92.9376],
  "Bihar": [25.0961, 85.3131],
  "Haryana": [29.0588, 76.0856],
  "Himachal Pradesh": [31.1048, 77.1734],
  "Jammu and Kashmir": [33.7782, 76.5762],
  "Jharkhand": [23.6102, 85.2799],
  "Madhya Pradesh": [22.9734, 78.6569],
  "Manipur": [24.6637, 93.9063],
  "Nagaland": [26.1203, 94.1220],
  "Odisha": [20.9517, 85.0985],
  "Punjab": [31.1471, 75.3412],
  "Uttarakhand": [30.0668, 79.0193],
  "All India": [22.9734, 78.6569],
};

function FlyToState({ selectedState }: { selectedState: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedState) return;
    const coords = STATE_COORDS[selectedState];
    if (coords) {
      map.flyTo(coords as [number, number], 6, { duration: 1.2 });
    }
  }, [selectedState, map]);

  return null;
}

const getRadius = (count: number) => {
  if (count <= 1) return 6;
  if (count <= 5) return 8 + count;
  if (count <= 20) return 12 + Math.log(count) * 6;
  return 22 + Math.log(count) * 3;
};

const OSMMap: React.FC<{ states: StatePoint[]; selectedState: string | null; onSelectState: (s: string | null) => void }> = ({ states, selectedState, onSelectState }) => {
  // center on India
  const center: [number, number] = [22.9734, 78.6569];

  const max = Math.max(...states.map(s => s.incidents), 1);

  return (
    <MapContainer center={center} zoom={4} style={{ height: 420, width: '100%' }} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToState selectedState={selectedState} />

      {states.map((s) => {
        const coords = STATE_COORDS[s.state] || center;
        const intensity = s.incidents / max;
        const color = `rgba(${Math.round(220 * intensity)}, ${Math.round(60 + 120 * (1 - intensity))}, ${Math.round(60)}, 0.85)`;
        const radius = getRadius(s.incidents);

        return (
          <CircleMarker
            key={s.state}
            center={coords as [number, number]}
            radius={radius}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.9, weight: selectedState === s.state ? 2.5 : 1 }}
            eventHandlers={{
              click: () => onSelectState(s.state),
            }}
          >
            <Tooltip direction="top" offset={[0, -radius]} opacity={1}>
              <div className="text-sm">
                <div className="font-medium">{s.state}</div>
                <div>{s.incidents.toLocaleString()} incident(s)</div>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};

export default OSMMap;
