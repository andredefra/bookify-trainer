
import { useState } from "react";
import { toast } from "sonner";
import { BodyMeasurements } from "../types";
import { calculateBodyComposition } from "../utils";

export function useBodyMeasurements() {
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurements[]>([]);

  // Add body measurements
  const addBodyMeasurements = (data: BodyMeasurements) => {
    const measurementWithCalculations = {
      ...data,
      ...calculateBodyComposition(data)
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
