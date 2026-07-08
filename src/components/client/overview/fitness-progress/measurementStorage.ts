import { BodyMeasurements } from "./types";

export const BODY_MEASUREMENTS_STORAGE_KEY = "body-measurements-data";
export const BODY_MEASUREMENTS_SEED_FLAG = "body-measurements-seeded-v5";

// 6-entry history over ~5 months. Weights match the weight-log trend
// (ending at 82 kg today). Includes chest, quadriceps.
export const getMockBodyMeasurements = (): BodyMeasurements[] => {
  const today = new Date();
  const entries = [
    { daysAgo: 150, weight: 84.5, chest: 104, waist: 89, hips: 100, quadriceps: 58, arms: 34 },
    { daysAgo: 120, weight: 84.0, chest: 104, waist: 88, hips: 99, quadriceps: 57, arms: 34 },
    { daysAgo: 90, weight: 83.4, chest: 103, waist: 87, hips: 98, quadriceps: 57, arms: 34 },
    { daysAgo: 60, weight: 82.7, chest: 103, waist: 86, hips: 97, quadriceps: 56, arms: 33 },
    { daysAgo: 30, weight: 82.2, chest: 102, waist: 85, hips: 96, quadriceps: 56, arms: 33 },
    { daysAgo: 3, weight: 82.0, chest: 102, waist: 84, hips: 95, quadriceps: 55, arms: 33 },
  ];

  return entries.map((entry, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() - entry.daysAgo);

    return {
      id: `mock-measurement-${index}`,
      date: date.toISOString().split("T")[0],
      weight: entry.weight,
      chest: entry.chest,
      waist: entry.waist,
      hips: entry.hips,
      quadriceps: entry.quadriceps,
      arms: entry.arms,
      source: "manual" as const,
    };
  });
};

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const inferChest = (measurement: any): number | undefined => {
  const waist = toNumber(measurement?.waist);
  const hips = toNumber(measurement?.hips);
  const quadriceps = toNumber(measurement?.quadriceps ?? measurement?.thighs);
  const arms = toNumber(measurement?.arms);

  if (waist === 84 && hips === 95 && quadriceps === 55 && arms === 33) return 102;
  if (waist === 85 && hips === 96 && quadriceps === 56 && arms === 33) return 102;
  if (waist === 86 && hips === 97 && quadriceps === 56 && arms === 33) return 103;
  if (waist === 87 && hips === 98 && quadriceps === 57 && arms === 34) return 103;
  if (waist === 88 && hips === 99 && quadriceps === 57 && arms === 34) return 104;
  if (waist === 89 && hips === 100 && quadriceps === 58 && arms === 34) return 104;

  return waist ? waist + 18 : undefined;
};

export const normalizeBodyMeasurements = (measurements: any[]): BodyMeasurements[] => {
  return measurements.map((measurement) => {
    if (!measurement || typeof measurement !== "object") return measurement;

    const normalized = { ...measurement };

    if (normalized.thighs != null && normalized.quadriceps == null) {
      normalized.quadriceps = normalized.thighs;
    }

    if (normalized.chest == null) {
      const chest = inferChest(normalized);
      if (chest != null) normalized.chest = chest;
    }

    return normalized as BodyMeasurements;
  });
};

export function readBodyMeasurements(seedIfNeeded = false): BodyMeasurements[] {
  if (typeof window === "undefined") return [];

  let parsed: any[] = [];
  let hasStoredData = false;

  try {
    const stored = localStorage.getItem(BODY_MEASUREMENTS_STORAGE_KEY);
    if (stored) {
      const value = JSON.parse(stored);
      if (Array.isArray(value)) {
        parsed = value;
        hasStoredData = true;
      }
    }
  } catch (error) {
    console.warn("Failed to hydrate body-measurements-data:", error);
  }

  if (seedIfNeeded && !localStorage.getItem(BODY_MEASUREMENTS_SEED_FLAG) && parsed.length < 3) {
    const mocks = getMockBodyMeasurements();
    try {
      localStorage.setItem(BODY_MEASUREMENTS_STORAGE_KEY, JSON.stringify(mocks));
      localStorage.setItem(BODY_MEASUREMENTS_SEED_FLAG, "1");
    } catch {}
    return mocks;
  }

  const normalized = normalizeBodyMeasurements(parsed);

  if (hasStoredData && JSON.stringify(normalized) !== JSON.stringify(parsed)) {
    try {
      localStorage.setItem(BODY_MEASUREMENTS_STORAGE_KEY, JSON.stringify(normalized));
    } catch (error) {
      console.warn("Failed to persist body-measurements-data migration:", error);
    }
  }

  return normalized;
}