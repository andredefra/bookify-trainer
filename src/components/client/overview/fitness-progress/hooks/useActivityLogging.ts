
import { toast } from "sonner";
import { ProgressItem, GoalLog } from "../types";
import { calculateProgress, getCurrentDate } from "../utils";

export function useActivityLogging() {
  // Log manual activity with detailed tracking per goal
  const logActivity = (data: any, progressData: ProgressItem[], setProgressData: (updater: (prev: ProgressItem[]) => ProgressItem[]) => void) => {
    const currentDate = data.date || getCurrentDate();
    let updatedGoals = 0;
    
    setProgressData(prev => prev.map(item => {
      let shouldUpdate = false;
      let newValue = item.current;
      let activityType = '';
      
      // Map activity to specific goals (excluding weight)
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
      
      if (shouldUpdate) {
        updatedGoals++;
        const newLog: GoalLog = {
          id: `log-${Date.now()}-${item.id}`,
          date: currentDate,
          value: shouldUpdate ? Number(data[activityType.split(' ')[0]]) : newValue,
          source: 'manual',
          note: `Logged ${activityType}${data.note ? ` - ${data.note}` : ''}`
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

  // Log weight separately
  const logWeight = (data: any, progressData: ProgressItem[], setProgressData: (updater: (prev: ProgressItem[]) => ProgressItem[]) => void) => {
    const currentDate = data.date || getCurrentDate();
    let updatedGoals = 0;
    
    setProgressData(prev => prev.map(item => {
      if (item.unit === "kg" && data.weight > 0) {
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

  return {
    logActivity,
    logWeight
  };
}
