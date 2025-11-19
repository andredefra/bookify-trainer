
import { ProgressItem, BodyMeasurements } from "./types";
import { calculateBodyFatPercentage } from "@/components/client/analytics/utils/bodyFatCalculations";

// Calculate progress percentage and ensure it's between 0-100
export const calculateProgress = (current: number, target: number): number => {
  return Math.min(100, Math.max(0, Math.round((current / target) * 100)));
};

// Get current date in ISO format for tracking updates
export const getCurrentDate = (): string => new Date().toISOString();

// Calculate body composition based on measurements and user profile
export const calculateBodyComposition = (
  measurements: BodyMeasurements,
  userProfile?: { height?: number; gender?: 'male' | 'female'; weight?: number }
) => {
  let bodyFatPercentage = undefined;
  let leanMass = undefined;
  
  // Use Navy Body Fat formula if we have all required measurements
  if (measurements.waist && measurements.neck && userProfile?.height && userProfile?.gender) {
    bodyFatPercentage = calculateBodyFatPercentage({
      waist: measurements.waist,
      neck: measurements.neck,
      hips: measurements.hips,
      height: userProfile.height,
      gender: userProfile.gender,
    });
    
    // Calculate lean mass if we have weight
    const weight = userProfile.weight || measurements.weight;
    if (bodyFatPercentage !== null && weight) {
      leanMass = weight * (1 - bodyFatPercentage / 100);
    }
  }
  
  return {
    bodyFatPercentage: bodyFatPercentage !== null && bodyFatPercentage !== undefined 
      ? Math.round(bodyFatPercentage * 10) / 10 
      : undefined,
    leanMass: leanMass ? Math.round(leanMass * 10) / 10 : undefined
  };
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Get latest log value for a goal
export const getLatestLogValue = (goal: ProgressItem): number => {
  if (!goal.logs || goal.logs.length === 0) return goal.current;
  return goal.logs[goal.logs.length - 1].value;
};
