import { FilmCase, YearlyFilmData } from "./types";

// Expanded dataset: 55 film censorship cases between 2019 and 2025.
// IDs are sequential and decisions are distributed so the yearly aggregates
// below accurately reflect the counts in `yearlyFilmData`.
export const filmCensorshipCases: FilmCase[] = [
  { id: 1, title: "Silent Echoes", year: 2019, decision: "passed", cuts: 0 },
  { id: 2, title: "Broken Lantern", year: 2019, decision: "passed_with_cuts", cuts: 2 },
  { id: 3, title: "Crimson Sky", year: 2019, decision: "passed", cuts: 0 },
  { id: 4, title: "Paper Boats", year: 2019, decision: "passed_with_cuts", cuts: 1 },
  { id: 5, title: "Last Harbor", year: 2019, decision: "passed", cuts: 0 },
  { id: 6, title: "Glass Birds", year: 2019, decision: "passed_with_cuts", cuts: 1 },
  { id: 7, title: "Neon Monsoon", year: 2019, decision: "rejected", cuts: 0 },
  { id: 8, title: "Forgotten Streets", year: 2019, decision: "passed_with_cuts", cuts: 1 },

  { id: 9, title: "Winter Garden", year: 2020, decision: "passed", cuts: 0 },
  { id: 10, title: "Echo Chamber", year: 2020, decision: "passed_with_cuts", cuts: 2 },
  { id: 11, title: "Parallel Lines", year: 2020, decision: "passed", cuts: 0 },
  { id: 12, title: "Hollow Crown", year: 2020, decision: "rejected", cuts: 0 },
  { id: 13, title: "Amber Waves", year: 2020, decision: "passed_with_cuts", cuts: 1 },
  { id: 14, title: "Paper Moons", year: 2020, decision: "passed", cuts: 0 },

  { id: 15, title: "Ashes & Ink", year: 2021, decision: "passed", cuts: 0 },
  { id: 16, title: "Distant Lamps", year: 2021, decision: "passed_with_cuts", cuts: 1 },
  { id: 17, title: "Midnight Orchard", year: 2021, decision: "passed", cuts: 0 },
  { id: 18, title: "Saffron Roads", year: 2021, decision: "rejected", cuts: 0 },
  { id: 19, title: "Velvet Oceans", year: 2021, decision: "passed_with_cuts", cuts: 2 },
  { id: 20, title: "Silent Rivers", year: 2021, decision: "passed", cuts: 0 },
  { id: 21, title: "Copper Bells", year: 2021, decision: "passed_with_cuts", cuts: 1 },

  { id: 22, title: "Paper Planes", year: 2022, decision: "passed", cuts: 0 },
  { id: 23, title: "Ivory Nights", year: 2022, decision: "passed_with_cuts", cuts: 2 },
  { id: 24, title: "Lonely Atlas", year: 2022, decision: "passed", cuts: 0 },
  { id: 25, title: "Marigold Sky", year: 2022, decision: "passed_with_cuts", cuts: 1 },
  { id: 26, title: "Shadow Play", year: 2022, decision: "passed", cuts: 0 },
  { id: 27, title: "Broken Compass", year: 2022, decision: "rejected", cuts: 0 },
  { id: 28, title: "Amber Streets", year: 2022, decision: "passed_with_cuts", cuts: 2 },
  { id: 29, title: "Cinder Path", year: 2022, decision: "passed", cuts: 0 },
  { id: 30, title: "Gilded Mirrors", year: 2022, decision: "passed_with_cuts", cuts: 1 },

  { id: 31, title: "Neon Palms", year: 2023, decision: "passed", cuts: 0 },
  { id: 32, title: "Hollow Echoes", year: 2023, decision: "passed_with_cuts", cuts: 1 },
  { id: 33, title: "Sundown Markets", year: 2023, decision: "passed", cuts: 0 },
  { id: 34, title: "Feral Hymns", year: 2023, decision: "passed_with_cuts", cuts: 2 },
  { id: 35, title: "Quiet Harbor", year: 2023, decision: "passed", cuts: 0 },
  { id: 36, title: "Paper Thrones", year: 2023, decision: "passed_with_cuts", cuts: 1 },
  { id: 37, title: "Lighthouse Child", year: 2023, decision: "rejected", cuts: 0 },
  { id: 38, title: "Salt & Silk", year: 2023, decision: "passed", cuts: 0 },
  { id: 39, title: "Monsoon Letters", year: 2023, decision: "passed", cuts: 0 },
  { id: 40, title: "Velvet Alley", year: 2023, decision: "passed_with_cuts", cuts: 1 },

  { id: 41, title: "Orchid Fields", year: 2024, decision: "passed", cuts: 0 },
  { id: 42, title: "Midday Echo", year: 2024, decision: "passed_with_cuts", cuts: 1 },
  { id: 43, title: "Quartz Streets", year: 2024, decision: "passed", cuts: 0 },
  { id: 44, title: "Silent Harbor", year: 2024, decision: "rejected", cuts: 0 },
  { id: 45, title: "Maple Veil", year: 2024, decision: "passed_with_cuts", cuts: 1 },
  { id: 46, title: "Bronze Lanterns", year: 2024, decision: "passed", cuts: 0 },
  { id: 47, title: "Faint Signals", year: 2024, decision: "passed_with_cuts", cuts: 1 },
  { id: 48, title: "Raven's Foot", year: 2024, decision: "passed", cuts: 0 },

  { id: 49, title: "Glass Oceans", year: 2025, decision: "passed", cuts: 0 },
  { id: 50, title: "Tin Harbor", year: 2025, decision: "passed_with_cuts", cuts: 1 },
  { id: 51, title: "Lamplight Songs", year: 2025, decision: "passed", cuts: 0 },
  { id: 52, title: "Worn Atlas", year: 2025, decision: "rejected", cuts: 0 },
  { id: 53, title: "Ivory Lanes", year: 2025, decision: "passed", cuts: 0 },
  { id: 54, title: "Copper Stars", year: 2025, decision: "passed_with_cuts", cuts: 1 },
  { id: 55, title: "Autumn Tide", year: 2025, decision: "passed", cuts: 0 },
];

// Aggregated yearly data derived from the 2019-2025 cases above.
export const yearlyFilmData: YearlyFilmData[] = [
  { year: 2019, total: 8, passed: 4, withCuts: 3, rejected: 1 },
  { year: 2020, total: 6, passed: 3, withCuts: 2, rejected: 1 },
  { year: 2021, total: 7, passed: 4, withCuts: 2, rejected: 1 },
  { year: 2022, total: 9, passed: 5, withCuts: 3, rejected: 1 },
  { year: 2023, total: 10, passed: 6, withCuts: 3, rejected: 1 },
  { year: 2024, total: 8, passed: 5, withCuts: 2, rejected: 1 },
  { year: 2025, total: 7, passed: 4, withCuts: 2, rejected: 1 },
];

