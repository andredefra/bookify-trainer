
import { toast } from "sonner";
import { ProgressItem, GoalLog } from "../types";
import { calculateProgress, getCurrentDate } from "../utils";

export function useFitnessSync() {
  // Enhanced auto-sync from fitness apps with support for all goal types
  const syncFromFitnessApps = (connectedApps: any, progressData: ProgressItem[], setProgressData: (updater: (prev: ProgressItem[]) => ProgressItem[]) => void) => {
    if (!connectedApps.googleFit && !connectedApps.appleHealth) return;
    
    // Simulate automatic data sync for various metrics
    const currentDate = getCurrentDate();
    let syncedData = false;
    
    setProgressData(prev => prev.map(item => {
      let newLog: GoalLog | null = null;
      let newValue = item.current;
      
      // Sync based on goal type and connected apps
      switch (item.goalType) {
        case 'activity_level':
          if (item.unit === "steps" && connectedApps.googleFit) {
            const dailySteps = Math.floor(Math.random() * 3000) + 7000; // 7000-10000 steps
            newLog = {
              id: `sync-${Date.now()}-${item.id}`,
              date: currentDate,
              value: dailySteps,
              source: 'googleFit',
              note: 'Auto-synced daily steps from Google Fit'
            };
            newValue = item.current + dailySteps;
            syncedData = true;
          } else if (item.unit === "kcal" && connectedApps.appleHealth) {
            const dailyCalories = Math.floor(Math.random() * 200) + 300; // 300-500 calories
            newLog = {
              id: `sync-${Date.now()}-${item.id}`,
              date: currentDate,
              value: dailyCalories,
              source: 'appleHealth',
              note: 'Auto-synced calories burned from Apple Health'
            };
            newValue = item.current + dailyCalories;
            syncedData = true;
          }
          break;

        case 'cardiovascular_endurance':
          if (item.unit === "km" && connectedApps.appleHealth) {
            const dailyDistance = Math.round((Math.random() * 5 + 2) * 100) / 100; // 2-7 km
            newLog = {
              id: `sync-${Date.now()}-${item.id}`,
              date: currentDate,
              value: dailyDistance,
              source: 'appleHealth',
              note: 'Auto-synced running/walking distance from Apple Health',
              distance: dailyDistance
            };
            newValue = item.current + dailyDistance;
            syncedData = true;
          } else if (item.unit === "mins" && connectedApps.googleFit) {
            const cardioMinutes = Math.floor(Math.random() * 30) + 15; // 15-45 minutes
            newLog = {
              id: `sync-${Date.now()}-${item.id}`,
              date: currentDate,
              value: cardioMinutes,
              source: 'googleFit',
              note: 'Auto-synced cardio workout from Google Fit',
              duration: cardioMinutes
            };
            newValue = item.current + cardioMinutes;
            syncedData = true;
          }
          break;

        case 'weight_management':
        case 'body_composition':
          if (item.unit === "kg" && connectedApps.appleHealth) {
            // Simulate weight measurement (less frequent)
            if (Math.random() < 0.1) { // 10% chance of weight sync
              const weightVariation = (Math.random() - 0.5) * 0.5; // ±0.25kg variation
              const currentWeight = item.current + weightVariation;
              newLog = {
                id: `sync-${Date.now()}-${item.id}`,
                date: currentDate,
                value: Math.round(currentWeight * 10) / 10,
                source: 'appleHealth',
                note: 'Auto-synced weight measurement from Apple Health'
              };
              newValue = Math.round(currentWeight * 10) / 10;
              syncedData = true;
            }
          }
          break;

        case 'workout_consistency':
          if (item.unit === "sessions" && (connectedApps.googleFit || connectedApps.appleHealth)) {
            // Simulate workout detection
            if (Math.random() < 0.2) { // 20% chance of workout detection
              newLog = {
                id: `sync-${Date.now()}-${item.id}`,
                date: currentDate,
                value: 1,
                source: connectedApps.appleHealth ? 'appleHealth' : 'googleFit',
                note: `Auto-detected workout session from ${connectedApps.appleHealth ? 'Apple Health' : 'Google Fit'}`
              };
              newValue = item.current + 1;
              syncedData = true;
            }
          }
          break;

        case 'strength_progress':
          // Strength data is less commonly auto-synced, but can happen with some apps
          if (item.unit === "kg" && connectedApps.appleHealth && Math.random() < 0.05) { // 5% chance
            const strengthIncrease = Math.random() * 2.5; // Up to 2.5kg increase
            const newMaxWeight = item.current + strengthIncrease;
            newLog = {
              id: `sync-${Date.now()}-${item.id}`,
              date: currentDate,
              value: Math.round(newMaxWeight * 10) / 10,
              source: 'appleHealth',
              note: `Auto-synced strength workout for ${item.exerciseName || 'exercise'} from Apple Health`,
              exerciseWeight: Math.round(newMaxWeight * 10) / 10,
              exerciseName: item.exerciseName
            };
            newValue = Math.max(item.current, Math.round(newMaxWeight * 10) / 10);
            syncedData = true;
          }
          break;
      }
      
      if (newLog) {
        return {
          ...item,
          current: newValue,
          progress: calculateProgress(newValue, item.target),
          lastUpdated: currentDate,
          logs: [...(item.logs || []), newLog]
        };
      }
      
      return item;
    }));
    
    if (syncedData) {
      toast.success("Data synced from fitness apps!");
    }
  };

  return {
    syncFromFitnessApps
  };
}
