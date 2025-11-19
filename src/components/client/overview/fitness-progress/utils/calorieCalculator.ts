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
      const minuteDuration = fieldValues.duration || fieldValues.minutes || fieldValues.cardioMinutes || 0;
      return Math.round((calorieCalculation.value || 0) * Number(minuteDuration));
    
    case 'per-distance':
      const distanceValue = fieldValues.distance || 0;
      return Math.round((calorieCalculation.value || 0) * Number(distanceValue));
    
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
    
    case 'manual-or-estimated':
      // Use manual calories if provided, otherwise estimate
      if (fieldValues.calories && Number(fieldValues.calories) > 0) {
        return Math.round(Number(fieldValues.calories));
      }
      
      // Estimate from steps and minutes
      const manualSteps = Number(fieldValues.steps || 0);
      const manualMinutes = Number(fieldValues.minutes || 0);
      return Math.round(manualSteps * 0.04 + manualMinutes * 5);
    
    case 'met-dynamic':
      // Dynamic MET calculation for cardio exercises
      const cardioExerciseId = fieldValues.cardioExercise || fieldValues.exercise;
      if (!cardioExerciseId) return 0;
      
      // Validate required fields
      const intensity = fieldValues.intensity;
      const cardioDuration = Number(fieldValues.duration || 0);
      
      if (!intensity || !cardioDuration) {
        return 0; // Don't calculate until all required fields present
      }
      
      // Get base MET value
      const intensityLevel = String(intensity).toLowerCase() as 'light' | 'moderate' | 'vigorous';
      let cardioMET = getCardioMETValue(cardioExerciseId, intensityLevel);
      
      // Enhanced accuracy: Adjust for distance if provided
      const exerciseDistance = Number(fieldValues.distance || 0);
      if (exerciseDistance > 0 && cardioDuration > 0) {
        // Calculate speed (km/h)
        const speed = (exerciseDistance / cardioDuration) * 60;
        
        // Adjust MET based on speed for specific exercises
        if (cardioExerciseId.includes('running') || cardioExerciseId.includes('jogging')) {
          // Running MET adjustments based on actual pace
          if (speed < 8) cardioMET = 6.0;        // Slow (<8 km/h)
          else if (speed < 12) cardioMET = 9.0;  // Moderate (8-12 km/h)
          else if (speed < 16) cardioMET = 12.5; // Fast (12-16 km/h)
          else cardioMET = 15.0;                  // Very fast (>16 km/h)
        } else if (cardioExerciseId.includes('cycling') || cardioExerciseId.includes('bike')) {
          // Cycling MET adjustments based on speed
          if (speed < 15) cardioMET = 4.0;       // Slow (<15 km/h)
          else if (speed < 20) cardioMET = 6.8;  // Moderate (15-20 km/h)
          else if (speed < 25) cardioMET = 8.0;  // Fast (20-25 km/h)
          else cardioMET = 10.0;                  // Racing (>25 km/h)
        }
      }
      
      return calculateCaloriesFromMET(cardioMET, userWeight, cardioDuration);
    
    case 'strength-formula':
      // Strength training calorie estimation
      const exerciseId = fieldValues.exercise;
      if (!exerciseId) return 0;
      
      const exercise = completeExerciseDatabase.find(ex => ex.id === exerciseId);
      if (!exercise) return 0;
      
      // Validate required fields
      const weight = Number(fieldValues.weight || 0);
      const sets = Number(fieldValues.sets || 0);
      const reps = Number(fieldValues.reps || 0);
      const strengthDuration = Number(fieldValues.duration || 0);
      
      // All fields must be present and > 0
      if (sets === 0 || reps === 0 || strengthDuration === 0) {
        return 0; // Don't calculate until complete
      }
      
      return estimateStrengthCalories({
        exercise,
        weight,
        sets,
        reps,
        duration: strengthDuration,
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
  // Check if manual calories are provided
  if (activityType.calorieCalculation.method === 'manual-or-estimated' && 
      fieldValues.calories && Number(fieldValues.calories) > 0) {
    return `Manual entry: ${fieldValues.calories} kcal`;
  }
  
  // For cardio exercises - validate required fields
  if (activityType.id === 'cardio') {
    if (!fieldValues.cardioExercise) {
      return 'Select an exercise to calculate calories';
    }
    if (!fieldValues.intensity) {
      return 'Select intensity level to calculate calories';
    }
    if (!fieldValues.duration || Number(fieldValues.duration) === 0) {
      return 'Enter duration to calculate calories';
    }
    
    // Show accuracy improvement with distance
    const hasDistance = fieldValues.distance && Number(fieldValues.distance) > 0;
    const calories = calculateCalories(activityType, fieldValues, userWeight);
    
    if (calories === 0) {
      return 'Unable to calculate calories';
    }
    
    return hasDistance 
      ? `Estimated: ~${calories} kcal (distance-adjusted)`
      : `Estimated: ~${calories} kcal`;
  }
  
  // For strength training - validate required fields
  if (activityType.id === 'strength') {
    if (!fieldValues.exercise) {
      return 'Select an exercise to calculate calories';
    }
    if (!fieldValues.sets || Number(fieldValues.sets) === 0) {
      return 'Enter sets to calculate calories';
    }
    if (!fieldValues.reps || Number(fieldValues.reps) === 0) {
      return 'Enter reps to calculate calories';
    }
    if (!fieldValues.duration || Number(fieldValues.duration) === 0) {
      return 'Enter duration to calculate calories';
    }
  }
  
  const calories = calculateCalories(activityType, fieldValues, userWeight);
  
  if (calories === 0) {
    return 'Enter all required values to see calorie estimate';
  }
  
  return `Estimated: ~${calories} kcal`;
};
