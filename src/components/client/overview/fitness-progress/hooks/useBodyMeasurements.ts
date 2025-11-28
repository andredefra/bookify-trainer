import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BodyMeasurements } from "../types";
import { calculateBodyComposition } from "../utils";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/integrations/supabase/client";

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

export function useBodyMeasurements() {
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurements[]>([]);
  const { profile } = useUserProfile();

  // Load mock data for demo mode
  useEffect(() => {
    const checkDemoMode = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setBodyMeasurements(getMockBodyMeasurements());
      }
    };
    checkDemoMode();
  }, []);

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
