// Type definitions for archive data

export interface FilmCase {
  id: number;
  title: string;
  year: number;
  decision: "passed" | "passed_with_cuts" | "rejected";
  cuts: number;
}

export interface YearlyFilmData {
  year: number;
  total: number;
  passed: number;
  withCuts: number;
  rejected: number;
}

export interface IncidentData {
  id: number;
  date: string;
  title: string;
  platform: string;
  state: string;
  district?: string;
  authority: string;
  category: string;
  legalReason: string;
  contentType: "film" | "website" | "social_media" | "other";
  status: "Verified" | "Pending" | "Under Review";
  description?: string;
}


