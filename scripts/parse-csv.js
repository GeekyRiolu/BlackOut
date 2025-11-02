import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read CSV file
const csvPath = path.join(__dirname, '../src/data/cleaned_output.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV manually (simple parser for this specific format)
const lines = csvContent.split('\n').filter(line => line.trim());

// Helper to parse CSV rows properly handling quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Parse CSV rows
const csvRows = [];
for (let i = 1; i < lines.length; i++) {
  const values = parseCSVLine(lines[i]);
  if (values.length >= 5) {
    csvRows.push({
      Category: values[0] || '',
      Title: values[1] || '',
      State: values[2] || '',
      Year: values[3] || '',
      Date: values[4] || ''
    });
  }
}

// Helper function to parse date string to YYYY-MM-DD format
function parseDate(dateStr) {
  if (!dateStr || dateStr.trim() === "") return new Date().toISOString().split("T")[0];
  
  try {
    // Handle format like "October 21, 2025"
    const months = {
      january: "01", february: "02", march: "03", april: "04",
      may: "05", june: "06", july: "07", august: "08",
      september: "09", october: "10", november: "11", december: "12"
    };
    
    const cleaned = dateStr.trim().toLowerCase();
    for (const [month, num] of Object.entries(months)) {
      if (cleaned.includes(month)) {
        const parts = dateStr.trim().split(/[\s,]+/);
        const day = (parts[1]?.replace(",", "") || "01").padStart(2, "0");
        const year = parts[2] || parts[parts.length - 1];
        return `${year}-${num}-${day}`;
      }
    }
    
    // Try standard date parsing
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0];
    }
  } catch (e) {
    // If parsing fails
  }
  
  return new Date().toISOString().split("T")[0];
}

// Helper function to determine platform from title/category
function inferPlatform(title, category) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes("x ") || titleLower.includes("twitter") || titleLower.includes("x account") || titleLower.includes("x handle") || titleLower.includes("x id")) {
    return "Twitter/X";
  }
  if (titleLower.includes("youtube") || titleLower.includes("video")) {
    return "YouTube";
  }
  if (titleLower.includes("facebook")) {
    return "Facebook";
  }
  if (titleLower.includes("instagram")) {
    return "Instagram";
  }
  if (titleLower.includes("film") || titleLower.includes("movie") || titleLower.includes("cbfc") || titleLower.includes("censor")) {
    return "Film";
  }
  if (titleLower.includes("website") || titleLower.includes("site")) {
    return "Website";
  }
  if (category === "Internet Control") {
    return "Internet";
  }
  
  return "Other";
}

// Helper function to determine content type
function inferContentType(title, category) {
  const platform = inferPlatform(title, category);
  
  if (platform === "Film") return "film";
  if (platform === "Website") return "website";
  if (["Twitter/X", "YouTube", "Facebook", "Instagram"].includes(platform)) {
    return "social_media";
  }
  return "other";
}

// Helper function to determine authority from title/category/state
function inferAuthority(title, category, state) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes("high court") || titleLower.includes("court order")) {
    return "High Court";
  }
  if (titleLower.includes("supreme court") || titleLower.includes("sc ")) {
    return "Supreme Court";
  }
  if (titleLower.includes("cbfc") || titleLower.includes("censor board")) {
    return "CBFC";
  }
  if (titleLower.includes("police")) {
    return `${state} Police`;
  }
  if (titleLower.includes("ministry")) {
    if (titleLower.includes("information") || titleLower.includes("i&b")) {
      return "Ministry of Information & Broadcasting";
    }
    if (titleLower.includes("electronics") || titleLower.includes("it")) {
      return "Ministry of Electronics and IT";
    }
    return "Central Government";
  }
  if (category === "Lawfare") {
    return "Court";
  }
  if (category === "Censorship") {
    return "Government Authority";
  }
  if (category === "Internet Control") {
    return "Government Authority";
  }
  
  return "Government Authority";
}

// Helper function to determine legal reason from category/title
function inferLegalReason(category, title) {
  const titleLower = title.toLowerCase();
  
  if (category === "Censorship") {
    if (titleLower.includes("it act") || titleLower.includes("section 69")) {
      return "IT Act Section 69A";
    }
    if (titleLower.includes("it rules")) {
      return "IT Rules 2021";
    }
    if (titleLower.includes("court order") || titleLower.includes("court")) {
      return "Court Order";
    }
    return "IT Act Section 69A";
  }
  
  if (category === "Lawfare") {
    return "Defamation/Other Legal";
  }
  
  if (category === "Internet Control") {
    return "IT Act Section 69A";
  }
  
  if (category === "Arrests" || category === "Killings" || category === "Attacks") {
    return "IPC/Other Laws";
  }
  
  if (category === "Policies/Regulation") {
    return "Policy/Regulation";
  }
  
  return "Legal Notice/Order";
}

// Read existing incidents file to preserve the existing data
const existingIncidentsPath = path.join(__dirname, '../src/data/incidents.ts');
const existingContent = fs.readFileSync(existingIncidentsPath, 'utf-8');

// Extract existing incidents - simple regex approach
const existingIncidents = [];
const incidentRegex = /{\s*id: (\d+),[\s\S]*?date: "([^"]+)",[\s\S]*?title: "([^"]+)",[\s\S]*?platform: "([^"]+)",[\s\S]*?state: "([^"]+)",[\s\S]*?authority: "([^"]+)",[\s\S]*?category: "([^"]+)",[\s\S]*?legalReason: "([^"]+)",[\s\S]*?contentType: "([^"]+)",[\s\S]*?status: "([^"]+)"(?:,[\s\S]*?district: "([^"]+)")?(?:,[\s\S]*?description: "([^"]+)")?[\s\S]*?}/g;

let match;
let maxId = 0;
while ((match = incidentRegex.exec(existingContent)) !== null) {
  const id = parseInt(match[1]);
  if (id > maxId) maxId = id;
  
  existingIncidents.push({
    id,
    date: match[2],
    title: match[3],
    platform: match[4],
    state: match[5],
    district: match[11] || undefined,
    authority: match[6],
    category: match[7],
    legalReason: match[8],
    contentType: match[9],
    status: match[10],
    description: match[12] || undefined
  });
}

console.log(`Found ${existingIncidents.length} existing incidents (max ID: ${maxId})`);

// Convert CSV rows to incidents
let nextId = maxId + 1;
const csvIncidents = csvRows.map(row => {
  const category = row.Category || "Other";
  const title = row.Title || "";
  const state = row.State === "Applicable Across India" || row.State === "All India" 
    ? "All India" 
    : (row.State || "Unknown");
  
  const incident = {
    id: nextId++,
    date: parseDate(row.Date || row.Year || ""),
    title: title.trim(),
    platform: inferPlatform(title, category),
    state,
    authority: inferAuthority(title, category, state),
    category: category.trim(),
    legalReason: inferLegalReason(category, title),
    contentType: inferContentType(title, category),
    status: "Verified",
    description: title.trim()
  };
  
  return incident;
});

// Merge existing and CSV incidents
const allIncidents = [...existingIncidents, ...csvIncidents];

console.log(`Parsed ${csvIncidents.length} incidents from CSV`);
console.log(`Total incidents: ${allIncidents.length}`);

// Generate TypeScript file content
function formatIncident(inc) {
  const fields = [
    `    id: ${inc.id}`,
    `    date: "${inc.date}"`,
    `    title: ${JSON.stringify(inc.title)}`,
    `    platform: ${JSON.stringify(inc.platform)}`,
    `    state: ${JSON.stringify(inc.state)}`,
    inc.district ? `    district: ${JSON.stringify(inc.district)}` : null,
    `    authority: ${JSON.stringify(inc.authority)}`,
    `    category: ${JSON.stringify(inc.category)}`,
    `    legalReason: ${JSON.stringify(inc.legalReason)}`,
    `    contentType: ${JSON.stringify(inc.contentType)}`,
    `    status: ${JSON.stringify(inc.status)}`,
    inc.description ? `    description: ${JSON.stringify(inc.description)}` : null
  ].filter(Boolean);
  
  return `  {\n${fields.join(",\n")}\n  }`;
}

const tsContent = `import { IncidentData } from "./types";

export const incidents: IncidentData[] = [
${allIncidents.map(formatIncident).join(",\n")}
];
`;

// Write the merged incidents file
fs.writeFileSync(existingIncidentsPath, tsContent, 'utf-8');
console.log(`✓ Updated ${existingIncidentsPath} with ${allIncidents.length} total incidents`);
console.log(`  - ${existingIncidents.length} existing incidents`);
console.log(`  - ${csvIncidents.length} new incidents from CSV`);
