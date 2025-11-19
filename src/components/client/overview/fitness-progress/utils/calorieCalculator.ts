import { ActivityType } from "../types";
import { calculateCaloriesFromMET } from "../data/metValues";
import { getCardioMETValue } from "../data/cardioMetValues";
import { estimateStrengthCalories } from "./strengthCalorieEstimator";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";
import { ExerciseData } from "@/data/exercises/types";

export const calculateCalories = (
  activityType: ActivityType,
  fieldValues: Record<string, any>,
  userWeight: number = 70 // Default weight in kg
): number => {
  const { calorieCalculation } = activityType;
  
  switch (calorieCalculation.method) {
    case 'fixed':
      return calorieCalculation.value || 0;
    
    case 'per-minute':
      const duration = fieldValues.duration || fieldValues.minutes || fieldValues.cardioMinutes || 0;
      return Math.round((calorieCalculation.value || 0) * Number(duration));
    
    case 'per-distance':
      const distance = fieldValues.distance || 0;
      return Math.round((calorieCalculation.value || 0) * Number(distance));
    
    case 'met':
      const durationMins = fieldValues.duration || fieldValues.minutes || fieldValues.cardioMinutes || 0;
      const metValue = calorieCalculation.metValue || 5.0;
      
      // Adjust MET value based on intensity if provided
      let adjustedMET = metValue;
      if (fieldValues.intensity) {
        const intensity = String(fieldValues.intensity).toLowerCase();
        if (intensity === 'light') adjustedMET = metValue * 0.8;
        else if (intensity === 'vigorous') adjustedMET = metValue * 1.3;
      }
      
      return calculateCaloriesFromMET(adjustedMET, userWeight, Number(durationMins));
    
    case 'met-dynamic':
      // Dynamic MET calculation for cardio exercises
      const cardioExerciseId = fieldValues.cardioExercise || fieldValues.exercise;
      if (!cardioExerciseId) return 0;
      
      const intensity = String(fieldValues.intensity || 'moderate').toLowerCase() as 'light' | 'moderate' | 'vigorous';
      const cardioMET = getCardioMETValue(cardioExerciseId, intensity);
      const cardioDuration = fieldValues.duration || fieldValues.minutes || 0;
      
      return calculateCaloriesFromMET(cardioMET, userWeight, Number(cardioDuration));
    
    case 'strength-formula':
      // Strength training calorie estimation
      const exerciseId = fieldValues.exercise;
      if (!exerciseId) return 0;
      
      const exercise = completeExerciseDatabase.find(ex => ex.id === exerciseId);
      if (!exercise) return 0;
      
      return estimateStrengthCalories({
        exercise,
        weight: Number(fieldValues.weight || 0),
        sets: Number(fieldValues.sets || 0),
        reps: Number(fieldValues.reps || 0),
        duration: Number(fieldValues.duration || 0),
        userWeight
      });
    
    case 'formula':
      // Safe formula evaluation with limited scope
      try {
        const formula = calorieCalculation.formula || '0';
        const context = { ...fieldValues, weight: userWeight };
        
        // Simple formula parser (supports basic math operations)
        let result = formula;
        Object.keys(context).forEach(key => {
          const value = context[key] || 0;
          result = result.replace(new RegExp(key, 'g'), String(value));
        });
        
        // Evaluate using Function constructor (safer than eval)
        const calculatedValue = new Function(`return ${result}`)();
        return Math.round(Number(calculatedValue) || 0);
      } catch (error) {
        console.error('Error calculating calories from formula:', error);
        return 0;
      }
    
    default:
      return 0;
  }
};

export const estimateCaloriesPreview = (
  activityType: ActivityType,
  fieldValues: Record<string, any>,
  userWeight?: number
): string => {
  const calories = calculateCalories(activityType, fieldValues, userWeight);
  
  if (calories === 0) {
    return 'Enter values to see calorie estimate';
  }
  
  return `Estimated: ~${calories} kcal`;
};
