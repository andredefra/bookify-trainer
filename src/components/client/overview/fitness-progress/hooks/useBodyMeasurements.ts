import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { BodyMeasurements } from "../types";
import { calculateBodyComposition } from "../utils";
import { useUserProfile } from "@/hooks/useUserProfile";
import { BODY_MEASUREMENTS_STORAGE_KEY, readBodyMeasurements } from "../measurementStorage";

export function useBodyMeasurements() {
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurements[]>(() => {
    return readBodyMeasurements(true);
  });
  const { profile } = useUserProfile();
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    try {
      localStorage.setItem(BODY_MEASUREMENTS_STORAGE_KEY, JSON.stringify(bodyMeasurements));
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
