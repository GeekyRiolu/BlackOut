import { FilmCase, YearlyFilmData } from "./types";

export const filmCensorshipCases: FilmCase[] = [
  { id: 1, title: "Udta Punjab", year: 2016, decision: "passed_with_cuts", cuts: 2 },
  { id: 2, title: "Padmaavat", year: 2018, decision: "passed_with_cuts", cuts: 1 },
  { id: 3, title: "Lipstick Under My Burkha", year: 2017, decision: "passed", cuts: 0 },
  { id: 4, title: "PK", year: 2014, decision: "passed_with_cuts", cuts: 1 },
  { id: 5, title: "Ae Dil Hai Mushkil", year: 2016, decision: "passed_with_cuts", cuts: 1 },
  { id: 6, title: "Bajirao Mastani", year: 2015, decision: "passed_with_cuts", cuts: 2 },
  { id: 7, title: "The Accidental Prime Minister", year: 2019, decision: "passed_with_cuts", cuts: 1 },
  { id: 8, title: "Article 15", year: 2019, decision: "passed", cuts: 0 },
  { id: 9, title: "Thappad", year: 2020, decision: "passed", cuts: 0 },
  { id: 10, title: "The Kashmir Files", year: 2022, decision: "passed", cuts: 0 },
];

export const yearlyFilmData: YearlyFilmData[] = [
  { year: 2014, total: 45, passed: 32, withCuts: 11, rejected: 2 },
  { year: 2015, total: 52, passed: 38, withCuts: 12, rejected: 2 },
  { year: 2016, total: 78, passed: 45, withCuts: 28, rejected: 5 },
  { year: 2017, total: 85, passed: 52, withCuts: 28, rejected: 5 },
  { year: 2018, total: 92, passed: 58, withCuts: 30, rejected: 4 },
  { year: 2019, total: 88, passed: 55, withCuts: 29, rejected: 4 },
  { year: 2020, total: 65, passed: 42, withCuts: 20, rejected: 3 },
  { year: 2021, total: 72, passed: 48, withCuts: 21, rejected: 3 },
  { year: 2022, total: 95, passed: 60, withCuts: 30, rejected: 5 },
  { year: 2023, total: 102, passed: 64, withCuts: 33, rejected: 5 },
  { year: 2024, total: 78, passed: 52, withCuts: 23, rejected: 3 },
];

