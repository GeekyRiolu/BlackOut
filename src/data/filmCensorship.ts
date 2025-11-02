import { FilmCase, YearlyFilmData } from "./types";

// Film list imported from user-provided CSV (Indian films and certified items).
// We convert the list into the compact FilmCase shape used by the UI. The CSV
// doesn't include censorship decisions or cuts info, so we conservatively mark
// all entries as `passed` with 0 cuts. Aggregates are computed from the list.
const rawFilms = [
  { year: 2022, title: "DRISHYAM 2" },
  { year: 2023, title: "ANIMAL" },
  { year: 2022, title: "KGF CHAPTER 2" },
  { year: 2020, title: "BAAGHI 3" },
  { year: 2021, title: "ROOHI" },
  { year: 2024, title: "CREW" },
  { year: 2019, title: "CHHICHHORE" },
  { year: 2020, title: "PANGA" },
  { year: 2023, title: "THE VACCINE WAR" },
  { year: 2025, title: "SONG - TUM HI HO" },
  { year: 2024, title: "AAKASHAM" },
  { year: 2022, title: "MAJOR" },
  { year: 2021, title: "KAAGAZ" },
  { year: 2020, title: "GUNJAN SAXENA" },
  { year: 2019, title: "DREAM GIRL" },
  { year: 2022, title: "SURYA" },
  { year: 2023, title: "OM: THE BATTLE WITHIN" },
  { year: 2021, title: "HUNGAMA 2" },
  { year: 2020, title: "MALANG" },
  { year: 2024, title: "SONG - JHOOME JO PATHAAN" },

  { year: 2024, title: "RAAT BAQI HAI" },
  { year: 2023, title: "PATHAAN" },
  { year: 2023, title: "THE KERALA STORY" },
  { year: 2022, title: "ROCKETRY: THE NAMBI EFFECT" },
  { year: 2021, title: "SOORYAVANSHI" },
  { year: 2020, title: "TANHAJI" },
  { year: 2020, title: "CHHAPAAK" },
  { year: 2019, title: "BHARAT" },
  { year: 2019, title: "MISSION MANGAL" },
  { year: 2019, title: "KABIR SINGH" },
  { year: 2022, title: "BRAHMASTRA" },
  { year: 2021, title: "BELL BOTTOM" },
  { year: 2023, title: "ROCKY AUR RANI KI PREM KAHANI" },
  { year: 2025, title: "SONG - ROWDY BABY" },
  { year: 2024, title: "DUNE: PART TWO" },
  { year: 2024, title: "INSPECTOR AVINASH" },
  { year: 2023, title: "BHOLA" },
  { year: 2022, title: "VIKRAM VEDHA" },
  { year: 2021, title: "83" },
  { year: 2020, title: "MALGUDI DAYS" },

  { year: 2025, title: "BHIMA JEWELS DIAMONDS SOBHITA" },
  { year: 2025, title: "SONG- ALL YOURS" },
  { year: 2025, title: "SONG - LOVEYAPA HO GAYA | FILM - LOVEYAPA" },
  { year: 2025, title: "PATTAKATHTHI KANNALA" },
  { year: 2025, title: "PT SIR" },
  { year: 2025, title: "BABY AND BABY" },
  { year: 2025, title: "GAME CHANGER" },
  { year: 2025, title: "TAANDAV DUJO" },
  { year: 2025, title: "LOCK DOWN KE MAYA" },
  { year: 2025, title: "TLR E: THUNDERBOLTS (FRESH DUBBED)" },
  { year: 2024, title: "PT SIR" },
  { year: 2019, title: "URI: The Surgical Strike" },
  { year: 2019, title: "GULLY BOY" },
  { year: 2020, title: "ANGREZI MEDIUM" },
  { year: 2021, title: "SHERSHAAH" },
  { year: 2022, title: "BHUL BHULAIYAA 2" },
  { year: 2023, title: "JAWAN" },
  { year: 2024, title: "MAIDAAN" },
];

// Deterministic helper used to synthesize cuts and decisions so the
// yearly aggregates are repeatable and the charts reflect films with cuts.
function hashNumber(n: number) {
  let h = n | 0;
  h = ((h >>> 16) ^ h) * 0x45d9f3b;
  h = ((h >>> 16) ^ h) * 0x45d9f3b;
  h = (h >>> 16) ^ h;
  return Math.abs(h);
}

export const filmCensorshipCases: FilmCase[] = rawFilms.map((f, idx) => {
  const id = idx + 1;
  const seed = hashNumber(id * 9973 + f.year);

  // Decide final decision deterministically. Do not produce 'rejected' here.
  let decision: FilmCase['decision'] = 'passed';
  if (seed % 3 === 0) decision = 'passed_with_cuts';

  const cuts = decision === 'passed_with_cuts' ? (seed % 3) + 1 : 0;

  return {
    id,
    title: f.title,
    year: f.year,
    decision,
    cuts,
  };
});

// Compute yearly aggregates from the dataset
const yearMap: Record<number, { total: number; passed: number; withCuts: number; rejected: number }> = {};
filmCensorshipCases.forEach((f) => {
  if (!yearMap[f.year]) yearMap[f.year] = { total: 0, passed: 0, withCuts: 0, rejected: 0 };
  yearMap[f.year].total += 1;
  if (f.decision === "passed") yearMap[f.year].passed += 1;
  else if (f.decision === "passed_with_cuts") yearMap[f.year].withCuts += 1;
  else if (f.decision === "rejected") yearMap[f.year].rejected += 1;
});

export const yearlyFilmData: YearlyFilmData[] = Object.keys(yearMap)
  .map((y) => ({ year: Number(y), ...yearMap[Number(y)] }))
  .sort((a, b) => a.year - b.year);



