
import { toast } from "sonner";
import { ProgressItem, GoalLog } from "../types";
import { calculateProgress, getCurrentDate } from "../utils";

export function useActivityLogging() {
  // Simplified activity logging for user-friendly goal types
  const logActivity = (data: any, progressData: ProgressItem[], setProgressData: (updater: (prev: ProgressItem[]) => ProgressItem[]) => void) => {
    const currentDate = data.date || getCurrentDate();
    let updatedGoals = 0;
    
    setProgressData(prev => prev.map(item => {
      let shouldUpdate = false;
      let newValue = item.current;
      let activityType = '';
      let logData: Partial<GoalLog> = {};
      
      // Map activity to specific goals based on goal type and units
      switch (item.goalType) {
        case 'activity_level':
          if (item.unit === "steps" && data.steps > 0) {
            newValue += Number(data.steps);
            activityType = 'steps';
            shouldUpdate = true;
          } else if (item.unit === "kcal" && data.calories > 0) {
            newValue += Number(data.calories);
            activityType = 'calories burned';
            shouldUpdate = true;
          } else if (item.unit === "mins" && data.minutes > 0) {
            newValue += Number(data.minutes);
            activityType = 'activity minutes';
            shouldUpdate = true;
          }
          break;

        case 'cardiovascular_endurance':
          if (item.unit === "km" && data.distance > 0) {
            newValue += Number(data.distance);
            activityType = 'distance covered';
            logData.distance = Number(data.distance);
            shouldUpdate = true;
          } else if (item.unit === "mins" && data.cardioMinutes > 0) {
            newValue += Number(data.cardioMinutes);
            activityType = 'cardio minutes';
            logData.duration = Number(data.cardioMinutes);
            shouldUpdate = true;
          }
          break;

        case 'strength_progress':
          if (item.unit === "kg" && data.strengthWeight > 0 && 
              (!item.exerciseId || item.exerciseId === data.exerciseId)) {
            newValue = Math.max(newValue, Number(data.strengthWeight)); // Use max weight for strength goals
            activityType = 'weight lifted';
            logData.exerciseWeight = Number(data.strengthWeight);
            logData.exerciseName = data.exerciseName || item.exerciseName;
            logData.reps = data.reps;
            logData.sets = data.sets;
            shouldUpdate = true;
          }
          break;

        default:
          // Fallback for generic logging
          if (item.unit === "steps" && data.steps > 0) {
            newValue += Number(data.steps);
            activityType = 'steps';
            shouldUpdate = true;
          } else if (item.unit === "kcal" && data.calories > 0) {
            newValue += Number(data.calories);
            activityType = 'calories burned';
            shouldUpdate = true;
          } else if (item.unit === "mins" && data.minutes > 0) {
            newValue += Number(data.minutes);
            activityType = 'workout minutes';
            shouldUpdate = true;
          }
      }
      
      if (shouldUpdate) {
        updatedGoals++;
        const newLog: GoalLog = {
          id: `log-${Date.now()}-${item.id}`,
          date: currentDate,
          value: shouldUpdate ? Number(data[activityType.split(' ')[0]] || newValue) : newValue,
          source: 'manual',
          note: `Logged ${activityType}${data.note ? ` - ${data.note}` : ''}`,
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
