import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { BodyMeasurements } from "../types";
import { calculateBodyComposition } from "../utils";
import { useUserProfile } from "@/hooks/useUserProfile";

const STORAGE_KEY = "body-measurements-data";
const SEED_FLAG = "body-measurements-seeded-v4";

// 6-entry history over ~5 months. Weights match the weight-log trend
// (ending at 82 kg today). Includes chest, abdomen, quadriceps.
const getMockBodyMeasurements = (): BodyMeasurements[] => {
  const today = new Date();
  const entries = [
    { daysAgo: 150, weight: 84.5, chest: 104, waist: 89, abdomen: 92, hips: 100, quadriceps: 58, arms: 34 },
    { daysAgo: 120, weight: 84.0, chest: 104, waist: 88, abdomen: 91, hips: 99,  quadriceps: 57, arms: 34 },
    { daysAgo: 90,  weight: 83.4, chest: 103, waist: 87, abdomen: 90, hips: 98,  quadriceps: 57, arms: 34 },
    { daysAgo: 60,  weight: 82.7, chest: 103, waist: 86, abdomen: 89, hips: 97,  quadriceps: 56, arms: 33 },
    { daysAgo: 30,  weight: 82.2, chest: 102, waist: 85, abdomen: 88, hips: 96,  quadriceps: 56, arms: 33 },
    { daysAgo: 3,   weight: 82.0, chest: 102, waist: 84, abdomen: 87, hips: 95,  quadriceps: 55, arms: 33 },
  ];
  return entries.map((e, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - e.daysAgo);
    return {
      id: `mock-measurement-${i}`,
      date: d.toISOString().split('T')[0],
      weight: e.weight,
      chest: e.chest,
      waist: e.waist,
      abdomen: e.abdomen,
      hips: e.hips,
      quadriceps: e.quadriceps,
      arms: e.arms,
      source: 'manual' as const,
    };
  });
};

// Migrate legacy `thighs` field to `quadriceps` while preserving the rest.
const migrateLegacy = (arr: any[]): BodyMeasurements[] =>
  arr.map(m => {
    if (m && m.thighs != null && m.quadriceps == null) {
      const { thighs, ...rest } = m;
      return { ...rest, quadriceps: thighs };
    }
    return m;
  });

function hydrate(): BodyMeasurements[] {
  try {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return migrateLegacy(parsed);
    }
  } catch (e) {
    console.warn("Failed to hydrate body-measurements-data:", e);
  }
  return [];
}

export function useBodyMeasurements() {
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurements[]>(() => {
    const initial = hydrate();
    if (typeof window === "undefined") return initial;
    const seeded = localStorage.getItem(SEED_FLAG);
    if (!seeded && initial.length < 3) {
      const mocks = getMockBodyMeasurements();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mocks));
        localStorage.setItem(SEED_FLAG, "1");
      } catch {}
      return mocks;
    }
    return initial;
  });
  const { profile } = useUserProfile();
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bodyMeasurements));
    } catch (e) {
      console.warn("Failed to persist body-measurements-data:", e);
    }
  }, [bodyMeasurements]);

  const addBodyMeasurements = (data: BodyMeasurements) => {
    const measurementWithCalculations = {
      ...data,
      ...calculateBodyComposition(data, {
        height: profile?.height,
        gender: profile?.gender,
        weight: data.weight
      })
    };

    setBodyMeasurements(prev => [...prev, measurementWithCalculations]);
    toast.success("Body measurements logged successfully!");
    return true;
  };

  const deleteBodyMeasurement = (id: string) => {
    setBodyMeasurements(prev => prev.filter(m => m.id !== id));
    toast.success("Measurement deleted");
  };

  return {
    bodyMeasurements,
    addBodyMeasurements,
    deleteBodyMeasurement,
  };
}
