
import { ProgressItem, BodyMeasurements } from "./types";

// Calculate progress percentage and ensure it's between 0-100
export const calculateProgress = (current: number, target: number): number => {
  return Math.min(100, Math.max(0, Math.round((current / target) * 100)));
};

// Get current date in ISO format for tracking updates
export const getCurrentDate = (): string => new Date().toISOString();

// Calculate body composition based on measurements
export const calculateBodyComposition = (measurements: BodyMeasurements) => {
  // Simplified body fat calculation using waist and neck measurements
  // This is a basic implementation - in a real app you'd use more sophisticated algorithms
  let bodyFatPercentage = undefined;
  let leanMass = undefined;
  
  if (measurements.waist && measurements.neck) {
    // Basic Navy Body Fat formula approximation
    const waistNeckRatio = measurements.waist / measurements.neck;
    bodyFatPercentage = Math.max(5, Math.min(50, waistNeckRatio * 15 - 10));
    
    // If we have weight data from goals, calculate lean mass
    // This would typically come from integrated weight tracking
    const estimatedWeight = 70; // Default estimate - would come from weight goals
    leanMass = estimatedWeight * (1 - bodyFatPercentage / 100);
  }
  
  return {
    bodyFatPercentage: bodyFatPercentage ? Math.round(bodyFatPercentage * 10) / 10 : undefined,
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
