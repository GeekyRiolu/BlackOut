// src/utils/analytics.ts

// Helper to clean up state names so "Delhi" matches "NCT of Delhi" etc.
export const normalizeStateName = (name: string) => {
  if (!name) return "Unknown";
  const lower = name.toLowerCase().trim();
  
  // Add common aliases here if your GeoJSON and Data don't match
  const aliases: Record<string, string> = {
    "delhi": "Delhi",
    "nct of delhi": "Delhi",
    "jammu & kashmir": "Jammu and Kashmir",
    "j&k": "Jammu and Kashmir",
    "odisha": "Odisha",
    "orissa": "Odisha",
    // Add others as you find discrepancies
  };

  return aliases[lower] || name;
};

export const aggregateIncidentsByState = (incidents: any[]) => {
  const stateCounts: Record<string, number> = {};

  incidents.forEach((incident) => {
    // specific check for "All India" orders vs state specific
    if (incident.state === "All India") return; 
    
    const normalizedState = normalizeStateName(incident.state);
    stateCounts[normalizedState] = (stateCounts[normalizedState] || 0) + 1;
  });

  // Convert to the format IndiaGeoMap expects: Array<{ state: string, incidents: number }>
  return Object.entries(stateCounts).map(([state, count]) => ({
    state,
    incidents: count,
  })).sort((a, b) => b.incidents - a.incidents); // Sort high to low
};