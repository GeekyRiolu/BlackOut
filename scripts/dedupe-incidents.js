import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const incidentsPath = path.join(__dirname, '../src/data/incidents.ts');
const content = fs.readFileSync(incidentsPath, 'utf-8');

// Extract all incidents using regex
const incidentMatches = content.matchAll(/{\s*id: (\d+),[\s\S]*?date: "([^"]+)",[\s\S]*?title: "([^"]+)",[\s\S]*?}/g);

const incidents = [];
const seen = new Set();

for (const match of incidentMatches) {
  const fullMatch = match[0];
  const id = parseInt(match[1]);
  const date = match[2];
  const title = match[3];
  
  // Create a unique key
  const key = `${date}|${title}`;
  
  if (!seen.has(key)) {
    seen.add(key);
    incidents.push({ id, full: fullMatch });
  }
}

// Sort by ID
incidents.sort((a, b) => a.id - b.id);

// Renumber IDs sequentially
const deduplicated = incidents.map((inc, idx) => {
  const newId = idx + 1;
  return inc.full.replace(/id: \d+,/, `id: ${newId},`);
});

const newContent = `import { IncidentData } from "./types";

export const incidents: IncidentData[] = [
${deduplicated.join(",\n")}
];
`;

fs.writeFileSync(incidentsPath, newContent, 'utf-8');
console.log(`✓ Deduplicated incidents: ${incidents.length} unique incidents (down from ${content.match(/id: \d+,/g)?.length || 0})`);


