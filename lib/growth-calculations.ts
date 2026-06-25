// Pure calculation helpers for the Growth Check tool, kept separate from the
// UI (components/GrowthCheckTool.tsx) so the screening logic can be tested
// and swapped independently of the modal markup.
//
// Version 1 uses a simplified BMI-for-age reference table for screening
// guidance only — it is NOT an official WHO/IAP percentile dataset, and the
// UI must never present its output as a percentile or a diagnosis.
//
// Future upgrade path: replace `BMI_REFERENCE_BANDS` / `getReferenceBand`
// with a real WHO (0-5y) and IAP (5-18y) percentile/LMS dataset lookup.
// `getBMIScreeningStatus` already accepts age-in-months and gender so that
// swap will not require any change to its signature or to the UI layer.

export type Gender = "boy" | "girl";

export type GrowthStandard = "WHO Growth Chart" | "IAP Growth Chart";

export type BmiScreeningStatus = "below" | "healthy" | "monitor" | "above";

export type BmiReferenceBand = {
  maxMonths: number;
  expectedLow: number;
  expectedHigh: number;
  monitorHigh: number;
};

const GROWTH_STANDARD_CUTOFF_MONTHS = 60;
export const MAX_AGE_MONTHS = 216;

// Simplified BMI-for-age screening bands, loosely derived from published
// WHO / IAP pediatric BMI percentile midpoints. Not a clinical percentile
// calculation — see file header.
const BMI_REFERENCE_BANDS: BmiReferenceBand[] = [
  { maxMonths: 23, expectedLow: 15.0, expectedHigh: 18.5, monitorHigh: 19.5 },
  { maxMonths: 35, expectedLow: 14.5, expectedHigh: 17.5, monitorHigh: 19.0 },
  { maxMonths: 59, expectedLow: 14.0, expectedHigh: 17.0, monitorHigh: 18.5 },
  { maxMonths: 83, expectedLow: 13.5, expectedHigh: 16.5, monitorHigh: 18.5 },
  { maxMonths: 107, expectedLow: 13.5, expectedHigh: 17.0, monitorHigh: 19.5 },
  { maxMonths: 131, expectedLow: 14.0, expectedHigh: 18.5, monitorHigh: 21.0 },
  { maxMonths: 155, expectedLow: 14.5, expectedHigh: 20.0, monitorHigh: 22.5 },
  { maxMonths: 179, expectedLow: 15.5, expectedHigh: 21.5, monitorHigh: 24.0 },
  { maxMonths: 203, expectedLow: 16.5, expectedHigh: 22.5, monitorHigh: 25.0 },
  { maxMonths: 227, expectedLow: 17.5, expectedHigh: 23.5, monitorHigh: 26.0 },
];

export function calculateAgeInMonths(years: number, months: number): number {
  return years * 12 + months;
}

export function getGrowthStandard(totalMonths: number): GrowthStandard {
  return totalMonths <= GROWTH_STANDARD_CUTOFF_MONTHS ? "WHO Growth Chart" : "IAP Growth Chart";
}

export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return Math.round(bmi * 10) / 10;
}

export function getReferenceBand(totalMonths: number): BmiReferenceBand {
  return (
    BMI_REFERENCE_BANDS.find((band) => totalMonths <= band.maxMonths) ??
    BMI_REFERENCE_BANDS[BMI_REFERENCE_BANDS.length - 1]
  );
}

// `gender` is accepted (and currently unused) purely so a future per-sex
// WHO/IAP percentile dataset can be plugged in without changing this
// function's signature or any of its call sites.
export function getBMIScreeningStatus(
  bmi: number,
  totalMonths: number,
  _gender: Gender | null,
): BmiScreeningStatus {
  const band = getReferenceBand(totalMonths);
  if (bmi < band.expectedLow) return "below";
  if (bmi <= band.expectedHigh) return "healthy";
  if (bmi <= band.monitorHigh) return "monitor";
  return "above";
}

export function getGrowthMessage(status: BmiScreeningStatus): string {
  switch (status) {
    case "healthy":
      return "Your child's BMI appears to be in a healthy screening range. Continue regular growth monitoring.";
    case "below":
      return "Your child's BMI appears to be below the usual screening range. Please discuss this with the pediatrician.";
    case "monitor":
      return "Your child's BMI is a little above the healthy screening range — worth keeping an eye on with balanced meals and regular activity.";
    case "above":
      return "Your child's BMI appears to be above the usual screening range. A pediatrician can review diet, activity, and growth pattern.";
  }
}

export function formatAgeLabel(years: number, months: number) {
  const yearPart = years > 0 ? `${years} year${years === 1 ? "" : "s"}` : "";
  const monthPart = months > 0 ? `${months} month${months === 1 ? "" : "s"}` : "";
  return [yearPart, monthPart].filter(Boolean).join(" ") || "0 months";
}
