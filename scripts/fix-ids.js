import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const incidentsPath = path.join(__dirname, '../src/data/incidents.ts');
const content = fs.readFileSync(incidentsPath, 'utf-8');

// Fix duplicate IDs by renumbering all incidents after id 7
let currentId = 7;
const fixedContent = content.replace(/\{\s*id: (\d+),/g, (match, idStr) => {
  const id = parseInt(idStr);
  if (id <= 7) {
    return match; // Keep original IDs 1-7
  }
  currentId++;
  return match.replace(`id: ${id}`, `id: ${currentId}`);
});

fs.writeFileSync(incidentsPath, fixedContent, 'utf-8');
console.log(`✓ Fixed IDs in incidents.ts`);

