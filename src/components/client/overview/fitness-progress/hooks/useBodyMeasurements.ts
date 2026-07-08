import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { BodyMeasurements } from "../types";
import { calculateBodyComposition } from "../utils";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "body-measurements-data";

// Mock body measurements data for demo users
const getMockBodyMeasurements = (): BodyMeasurements[] => [
  {
    id: "mock-measurement-1",
    date: new Date().toISOString().split('T')[0],
    weight: 78,
    waist: 84,
    neck: 38,
    hips: 95,
    thighs: 55,
    shoulders: 115,
    arms: 33,
    source: 'manual'
  },
  {
    id: "mock-measurement-2",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    weight: 80,
    waist: 86,
    neck: 38,
    hips: 96,
    thighs: 56,
    shoulders: 115,
    arms: 32,
    source: 'manual'
  }
];

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
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurements[]>(() => hydrate() ?? []);
  const { profile } = useUserProfile();
  const didMount = useRef(false);
  const hydratedFromStorage = useRef(hydrate() !== null);

  // Seed mock data for demo mode only if nothing in localStorage yet
  useEffect(() => {
    if (hydratedFromStorage.current) return;
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
