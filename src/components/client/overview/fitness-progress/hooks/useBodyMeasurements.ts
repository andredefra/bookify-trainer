import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { BodyMeasurements } from "../types";
import { calculateBodyComposition } from "../utils";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "body-measurements-data";

// Mock body measurements data for demo users — 6 entries over ~150 days,
// weights aligned with the seeded weight-log trend, full circumferences
// so Body Fat % can be computed for both genders.
const getMockBodyMeasurements = (): BodyMeasurements[] => {
  const today = new Date();
  const entries = [
    { daysAgo: 150, weight: 82.4, waist: 89, neck: 39, hips: 100, thighs: 58, shoulders: 118, arms: 34 },
    { daysAgo: 120, weight: 81.5, waist: 88, neck: 39, hips: 99,  thighs: 57, shoulders: 118, arms: 34 },
    { daysAgo: 90,  weight: 80.6, waist: 87, neck: 38, hips: 98,  thighs: 57, shoulders: 117, arms: 34 },
    { daysAgo: 60,  weight: 79.8, waist: 86, neck: 38, hips: 97,  thighs: 56, shoulders: 116, arms: 33 },
    { daysAgo: 30,  weight: 78.9, waist: 85, neck: 38, hips: 96,  thighs: 56, shoulders: 116, arms: 33 },
    { daysAgo: 3,   weight: 78.0, waist: 84, neck: 38, hips: 95,  thighs: 55, shoulders: 115, arms: 33 },
  ];
  return entries.map((e, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - e.daysAgo);
    return {
      id: `mock-measurement-${i}`,
      date: d.toISOString().split('T')[0],
      weight: e.weight,
      waist: e.waist,
      neck: e.neck,
      hips: e.hips,
      thighs: e.thighs,
      shoulders: e.shoulders,
      arms: e.arms,
      source: 'manual' as const,
    };
  });
};

function hydrate(): BodyMeasurements[] | null {
  try {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Failed to hydrate body-measurements-data:", e);
  }
  return null;
}

export function useBodyMeasurements() {
  const initial = hydrate();
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurements[]>(
    initial && initial.length > 0 ? initial : []
  );
  const { profile } = useUserProfile();
  const didMount = useRef(false);
  const needsSeed = useRef(!initial || initial.length === 0);

  // Seed mock data for demo mode when storage is empty or missing
  useEffect(() => {
    if (!needsSeed.current) return;
    const checkDemoMode = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setBodyMeasurements(getMockBodyMeasurements());
      }
    };
    checkDemoMode();
  }, []);

  // Persist to localStorage
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
