
import { useState } from "react";
import { toast } from "sonner";
import { BodyMeasurements } from "../types";
import { calculateBodyComposition } from "../utils";
import { useUserProfile } from "@/hooks/useUserProfile";

export function useBodyMeasurements() {
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurements[]>([]);
  const { profile } = useUserProfile();

  // Add body measurements
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

  return {
    bodyMeasurements,
    addBodyMeasurements
  };
}
