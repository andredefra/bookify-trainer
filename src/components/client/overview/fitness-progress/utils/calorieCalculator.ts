import { ActivityType } from "../types";
import { calculateCaloriesFromMET } from "../data/metValues";

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
