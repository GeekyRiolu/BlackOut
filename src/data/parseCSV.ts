import { IncidentData } from "./types";

// Helper function to parse date string to YYYY-MM-DD format
function parseDate(dateStr: string): string {
  if (!dateStr || dateStr.trim() === "") return new Date().toISOString().split("T")[0];
  
  try {
    // Handle format like "October 21, 2025" or "21 October 2025"
    const months: { [key: string]: string } = {
      january: "01", february: "02", march: "03", april: "04",
      may: "05", june: "06", july: "07", august: "08",
      september: "09", october: "10", november: "11", december: "12"
    };
    
    const cleaned = dateStr.trim().toLowerCase();
    for (const [month, num] of Object.entries(months)) {
      if (cleaned.includes(month)) {
        const parts = dateStr.trim().split(/[\s,]+/);
        const day = parts[1]?.replace(",", "").padStart(2, "0") || "01";
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
    // If parsing fails, return today's date
  }
  
  return new Date().toISOString().split("T")[0];
}

// Helper function to determine platform from title/category
function inferPlatform(title: string, category: string): string {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes("x ") || titleLower.includes("twitter") || titleLower.includes("x account") || titleLower.includes("x handle")) {
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
function inferContentType(title: string, category: string): "film" | "website" | "social_media" | "other" {
  const titleLower = title.toLowerCase();
  const platform = inferPlatform(title, category);
  
  if (platform === "Film") return "film";
  if (platform === "Website") return "website";
  if (["Twitter/X", "YouTube", "Facebook", "Instagram"].includes(platform)) {
    return "social_media";
  }
  return "other";
}

// Helper function to determine authority from title/category/state
function inferAuthority(title: string, category: string, state: string): string {
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
  
  return "Government Authority";
}

// Helper function to determine legal reason from category/title
function inferLegalReason(category: string, title: string): string {
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
  
  return "Legal Notice/Order";
}

// Convert CSV row to IncidentData
export function csvRowToIncident(row: {
  Category: string;
  Title: string;
  State: string;
  Year: string;
  Date: string;
}, id: number): IncidentData {
  const category = row.Category || "Other";
  const title = row.Title || "";
  const state = row.State === "Applicable Across India" || row.State === "All India" 
    ? "All India" 
    : (row.State || "Unknown");
  
  return {
    id,
    date: parseDate(row.Date || row.Year || ""),
    title: title.trim(),
    platform: inferPlatform(title, category),
    state,
    authority: inferAuthority(title, category, state),
    category: category.trim(),
    legalReason: inferLegalReason(category, title),
    contentType: inferContentType(title, category),
    status: "Verified" as const,
    description: title.trim(), // Use title as description since CSV doesn't have separate description
  };
}

