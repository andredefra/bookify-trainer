import { ExerciseMaxCalculation, ExerciseMaxDataPoint } from "../types/exerciseTypes";

/**
 * Calculate 1RM using the formula: KG sollevati x (1 + 0.0333 x ripetizioni)
 */
export const calculateOneRM = (weight: number, reps: number): number => {
  const oneRM = weight * (1 + 0.0333 * reps);
  return Math.round(oneRM * 10) / 10; // Round to 1 decimal place
};

/**
 * Calculate 10RM as 75% of 1RM
 */
export const calculateTenRM = (oneRM: number): number => {
  const tenRM = oneRM * 0.75;
  return Math.round(tenRM * 10) / 10; // Round to 1 decimal place
};

/**
 * Calculate both 1RM and 10RM from weight and reps
 */
export const calculateMaxes = (weight: number, reps: number): ExerciseMaxCalculation => {
  const oneRM = calculateOneRM(weight, reps);
  const tenRM = calculateTenRM(oneRM);
  
  return { oneRM, tenRM };
};

/**
 * Process exercise data to include calculated maxes
 */
export const processExerciseData = (
  exercise: string,
  weight: number,
  reps: number,
  date: string,
  clientId?: string,
  clientName?: string
): ExerciseMaxDataPoint => {
  const { oneRM, tenRM } = calculateMaxes(weight, reps);
  
  return {
    exercise,
    weight,
    reps,
    oneRM,
    tenRM,
    date,
    clientId,
    clientName
  };
};

/**
 * Format weight display
 */
export const formatWeight = (weight: number): string => {
  return `${weight}kg`;
};

/**
 * Format reps display
 */
export const formatReps = (reps: number): string => {
  return `${reps} reps`;
};