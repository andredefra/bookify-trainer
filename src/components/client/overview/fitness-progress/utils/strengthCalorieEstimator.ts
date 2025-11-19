import { ExerciseData } from "@/data/exercises/types";
import { getStrengthMETValue, getMuscleGroupMultiplier, isCompoundExercise } from "../data/strengthMetValues";

export interface StrengthCalorieInput {
  exercise: ExerciseData;
  weight: number;        // kg lifted
  sets: number;
  reps: number;
  duration: number;      // total minutes including rest
  userWeight: number;    // user's body weight in kg
}

/**
 * Estimates calories burned during strength training
 * Based on MET values, exercise type, and muscle groups involved
 */
export const estimateStrengthCalories = (input: StrengthCalorieInput): number => {
  const { exercise, duration, userWeight } = input;
  
  // Get base MET value for this exercise
  const baseMET = getStrengthMETValue(exercise.muscleGroup);
  
  // Apply compound exercise multiplier
  const compoundMultiplier = isCompoundExercise(exercise.muscleGroup) ? 1.2 : 1.0;
  
  // Apply muscle group size multiplier
  const muscleMultiplier = getMuscleGroupMultiplier(exercise.muscleGroup);
  
  // Apply difficulty multiplier
  const difficultyMultiplier = getDifficultyMultiplier(exercise.difficulty);
  
  // Calculate adjusted MET
  const adjustedMET = baseMET * compoundMultiplier * muscleMultiplier * difficultyMultiplier;
  
  // Calculate calories: MET × weight(kg) × duration(hours)
  const durationHours = duration / 60;
  const calories = adjustedMET * userWeight * durationHours;
  
  return Math.round(calories);
};

/**
 * Get difficulty multiplier for calorie calculation
 */
const getDifficultyMultiplier = (difficulty: string): number => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 0.9;
    case 'intermediate':
      return 1.0;
    case 'advanced':
      return 1.1;
    default:
      return 1.0;
  }
};

/**
 * Calculate total volume for the exercise (weight × sets × reps)
 * This is useful for tracking strength progress
 */
export const calculateTotalVolume = (
  weight: number,
  sets: number,
  reps: number
): number => {
  return weight * sets * reps;
};

/**
 * Estimate rest time based on sets and exercise type
 * Useful for suggesting total duration
 */
export const estimateRestTime = (
  sets: number,
  isCompound: boolean
): number => {
  // Compound exercises typically need longer rest (2-3 min)
  // Isolation exercises need shorter rest (1-2 min)
  const restPerSet = isCompound ? 2.5 : 1.5;
  return Math.round((sets - 1) * restPerSet); // No rest after last set
};

/**
 * Suggest total duration based on exercise parameters
 */
export const suggestDuration = (
  sets: number,
  reps: number,
  isCompound: boolean
): number => {
  // Estimate time per set: ~3-4 seconds per rep for compound, 2-3 for isolation
  const timePerRep = isCompound ? 3.5 : 2.5;
  const workTime = (sets * reps * timePerRep) / 60; // Convert to minutes
  
  // Add rest time
  const restTime = estimateRestTime(sets, isCompound);
  
  return Math.round(workTime + restTime);
};

/**
 * Calculate calorie breakdown for display purposes
 */
export interface CalorieBreakdown {
  baseMET: number;
  adjustedMET: number;
  compoundBonus: number;
  muscleGroupBonus: number;
  difficultyBonus: number;
  totalCalories: number;
  caloriesPerMinute: number;
}

export const getCalorieBreakdown = (input: StrengthCalorieInput): CalorieBreakdown => {
  const { exercise, duration, userWeight } = input;
  
  const baseMET = getStrengthMETValue(exercise.muscleGroup);
  const compoundMultiplier = isCompoundExercise(exercise.muscleGroup) ? 1.2 : 1.0;
  const muscleMultiplier = getMuscleGroupMultiplier(exercise.muscleGroup);
  const difficultyMultiplier = getDifficultyMultiplier(exercise.difficulty);
  
  const adjustedMET = baseMET * compoundMultiplier * muscleMultiplier * difficultyMultiplier;
  const totalCalories = Math.round(adjustedMET * userWeight * (duration / 60));
  
  return {
    baseMET,
    adjustedMET,
    compoundBonus: compoundMultiplier - 1,
    muscleGroupBonus: muscleMultiplier - 1,
    difficultyBonus: difficultyMultiplier - 1,
    totalCalories,
    caloriesPerMinute: Math.round(totalCalories / duration)
  };
};
