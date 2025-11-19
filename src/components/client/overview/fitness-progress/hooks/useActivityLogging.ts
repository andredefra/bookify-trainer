
import { toast } from "sonner";
import { ProgressItem, GoalLog } from "../types";
import { calculateProgress, getCurrentDate } from "../utils";
import { getActivityTypeById } from "../data/activityTemplates";
import { calculateCalories } from "../utils/calorieCalculator";

export function useActivityLogging() {
  // Enhanced activity logging with custom activity types support
  const logActivity = (data: any, progressData: ProgressItem[], setProgressData: (updater: (prev: ProgressItem[]) => ProgressItem[]) => void) => {
    const currentDate = data.date || getCurrentDate();
    let updatedGoals = 0;
    
    // Get activity type configuration
    const activityType = getActivityTypeById(data.activityTypeId || "general");
    if (!activityType) {
      toast.error("Invalid activity type");
      return false;
    }
    
    // Calculate calories
    const calculatedCalories = calculateCalories(activityType, data);
    
    setProgressData(prev => prev.map(item => {
      let shouldUpdate = false;
      let newValue = item.current;
      let activityName = activityType.title;
      let logData: Partial<GoalLog> = {};
      
      // Check if this activity impacts this goal
      const impacts = activityType.goalImpacts.filter(
        impact => impact.goalType === item.goalType && impact.unitMapping === item.unit
      );
      
      impacts.forEach(impact => {
        let sourceValue: number;
        
        if (impact.sourceField === "calculated_calories") {
          sourceValue = calculatedCalories;
        } else {
          sourceValue = Number(data[impact.sourceField]) || 0;
        }
        
        if (sourceValue > 0) {
          shouldUpdate = true;
          
          switch (impact.calculation) {
            case 'add':
              newValue += sourceValue;
              break;
            case 'max':
              newValue = Math.max(newValue, sourceValue);
              break;
            case 'average':
              const logsCount = (item.logs?.length || 0) + 1;
              newValue = ((item.current * (logsCount - 1)) + sourceValue) / logsCount;
              break;
          }
          
          // Build log data
          Object.keys(data).forEach(key => {
            if (data[key] && key !== 'date' && key !== 'note' && key !== 'activityTypeId') {
              logData[key] = data[key];
            }
          });
        }
      });
      
      if (shouldUpdate) {
        updatedGoals++;
        
        // Extract exercise metadata
        const exerciseMetadata: any = {};
        if (data.exercise_metadata) {
          exerciseMetadata.exerciseDbId = data.exercise;
          exerciseMetadata.exerciseMetadata = data.exercise_metadata;
        } else if (data.cardioExercise_metadata) {
          exerciseMetadata.exerciseDbId = data.cardioExercise;
          exerciseMetadata.exerciseMetadata = data.cardioExercise_metadata;
        }
        
        const newLog: GoalLog = {
          id: `log-${Date.now()}-${item.id}`,
          date: currentDate,
          value: newValue - item.current,
          source: 'manual',
          note: `${activityName}${data.note ? ` - ${data.note}` : ''}`,
          ...exerciseMetadata,
          ...(calculatedCalories > 0 && {
            calorieBreakdown: {
              method: activityType.calorieCalculation.method,
              duration: Number(data.duration || data.cardioMinutes || 0),
              totalCalories: calculatedCalories
            }
          }),
          ...logData
        };
        
        const updatedLogs = [...(item.logs || []), newLog];
        
        return {
          ...item,
          current: newValue,
          progress: calculateProgress(newValue, item.target),
          lastUpdated: currentDate,
          logs: updatedLogs
        };
      }
      
      return item;
    }));
    
    toast.success(`Activity logged successfully! Updated ${updatedGoals} goals.`);
    return true;
  };

  // Enhanced weight logging
  const logWeight = (data: any, progressData: ProgressItem[], setProgressData: (updater: (prev: ProgressItem[]) => ProgressItem[]) => void) => {
    const currentDate = data.date || getCurrentDate();
    let updatedGoals = 0;
    
    setProgressData(prev => prev.map(item => {
      if ((item.goalType === 'weight_management' || item.goalType === 'body_composition') && 
          item.unit === "kg" && data.weight > 0) {
        updatedGoals++;
        const newLog: GoalLog = {
          id: `log-${Date.now()}-${item.id}`,
          date: currentDate,
          value: Number(data.weight),
          source: 'manual',
          note: `Weight measurement${data.note ? ` - ${data.note}` : ''}`
        };
        
        const updatedLogs = [...(item.logs || []), newLog];
        
        return {
          ...item,
          current: Number(data.weight),
          progress: calculateProgress(Number(data.weight), item.target),
          lastUpdated: currentDate,
          logs: updatedLogs
        };
      }
      
      return item;
    }));
    
    toast.success(`Weight logged successfully! Updated ${updatedGoals} weight goals.`);
    return true;
  };

  // Log strength exercise specifically
  const logStrengthExercise = (data: any, progressData: ProgressItem[], setProgressData: (updater: (prev: ProgressItem[]) => ProgressItem[]) => void) => {
    const currentDate = data.date || getCurrentDate();
    let updatedGoals = 0;
    
    setProgressData(prev => prev.map(item => {
      if (item.goalType === 'strength_progress' && 
          (!item.exerciseId || item.exerciseId === data.exerciseId) &&
          data.weight > 0) {
        updatedGoals++;
        const newLog: GoalLog = {
          id: `log-${Date.now()}-${item.id}`,
          date: currentDate,
          value: Number(data.weight),
          source: 'strength_training',
          note: `${data.exerciseName} - ${data.sets}x${data.reps}${data.note ? ` - ${data.note}` : ''}`,
          exerciseWeight: Number(data.weight),
          exerciseName: data.exerciseName,
          reps: data.reps,
          sets: data.sets
        };
        
        const updatedLogs = [...(item.logs || []), newLog];
        const newValue = Math.max(item.current, Number(data.weight)); // Use max weight achieved
        
        return {
          ...item,
          current: newValue,
          progress: calculateProgress(newValue, item.target),
          lastUpdated: currentDate,
          logs: updatedLogs
        };
      }
      
      return item;
    }));
    
    toast.success(`Strength exercise logged! Updated ${updatedGoals} strength goals.`);
    return true;
  };

  return {
    logActivity,
    logWeight,
    logStrengthExercise
  };
}
