
import { toast } from "sonner";
import { ProgressItem, GoalLog } from "../types";
import { calculateProgress, getCurrentDate } from "../utils";

export function useFitnessSync() {
  // Auto-sync from fitness apps (simulated)
  const syncFromFitnessApps = (connectedApps: any, progressData: ProgressItem[], setProgressData: (updater: (prev: ProgressItem[]) => ProgressItem[]) => void) => {
    if (!connectedApps.googleFit && !connectedApps.appleHealth) return;
    
    // Simulate automatic data sync
    const currentDate = getCurrentDate();
    let syncedData = false;
    
    setProgressData(prev => prev.map(item => {
      // Simulate automatic step tracking
      if (item.unit === "steps" && connectedApps.googleFit) {
        const dailySteps = Math.floor(Math.random() * 3000) + 7000; // Simulate 7000-10000 steps
        const newLog: GoalLog = {
          id: `sync-${Date.now()}-${item.id}`,
          date: currentDate,
          value: dailySteps,
          source: 'googleFit',
          note: 'Auto-synced from Google Fit'
        };
        
        syncedData = true;
        return {
          ...item,
          current: item.current + dailySteps,
          progress: calculateProgress(item.current + dailySteps, item.target),
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
