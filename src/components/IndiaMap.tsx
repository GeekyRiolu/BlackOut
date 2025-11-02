import React from "react";

type StatePoint = {
  state: string;
  incidents: number;
  x: number; // normalized 0-12 approx
  y: number; // normalized 0-20 approx
};

type Props = {
  states: StatePoint[];
  width?: number;
  height?: number;
  selectedState?: string | null;
  onSelectState?: (state: string | null) => void;
};

// Simple stylized India map using positioned circles to represent states.
// This is intentionally lightweight and doesn't rely on external geo libs.
export default function IndiaMap({ states, width = 600, height = 520, selectedState, onSelectState }: Props) {
  // coordinate system in source data uses roughly x in [6..12], y in [6..20]
  const minX = 6;
  const maxX = 12;
  const minY = 6;
  const maxY = 20;

  const toPx = (x: number, y: number) => ({
    px: ((x - minX) / (maxX - minX)) * width,
    py: ((y - minY) / (maxY - minY)) * height,
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="India map with state hotspots">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background silhouette placeholder */}
      <rect x={0} y={0} width={width} height={height} rx={8} fill="transparent" />

      {states.map((s) => {
        const { px, py } = toPx(s.x, s.y);
        const radius = Math.min(36, Math.sqrt(s.incidents || 1) * 4 + 6);
        const isSelected = selectedState === s.state;

        return (
          <g key={s.state} transform={`translate(${px}, ${py})`} style={{ cursor: 'pointer' }} onClick={() => onSelectState && onSelectState(isSelected ? null : s.state)}>
            <circle
              r={radius}
              fill={isSelected ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-3))'}
              opacity={isSelected ? 0.95 : 0.6}
              stroke={isSelected ? 'hsl(var(--border))' : 'none'}
              strokeWidth={isSelected ? 3 : 0}
              filter={isSelected ? 'url(#glow)' : undefined}
            />
            <text x={0} y={radius + 14} textAnchor="middle" fontSize={12} fill="var(--muted-foreground)">
              {s.state}
            </text>
            <text x={0} y={radius + 28} textAnchor="middle" fontSize={11} fill="var(--foreground)" style={{ fontWeight: 600 }}>
              {s.incidents}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
