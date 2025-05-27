
import { useGoalManagement } from "./useGoalManagement";
import { useActivityLogging } from "./useActivityLogging";
import { useBodyMeasurements } from "./useBodyMeasurements";
import { useFitnessSync } from "./useFitnessSync";
import { ProgressItem } from "../types";

export function useFitnessGoals(initialProgressData: ProgressItem[]) {
  const {
    progressData,
    setProgressData,
    selectedGoal,
    addGoal,
    updateGoal,
    deleteGoal,
    selectGoal,
    clearSelectedGoal
  } = useGoalManagement(initialProgressData);

  const { logActivity: logActivityBase, logWeight: logWeightBase } = useActivityLogging();
  const { bodyMeasurements, addBodyMeasurements } = useBodyMeasurements();
  const { syncFromFitnessApps: syncFromFitnessAppsBase } = useFitnessSync();

  // Wrapper functions to pass the required state
  const logActivity = (data: any) => {
    return logActivityBase(data, progressData, setProgressData);
  };

  const logWeight = (data: any) => {
    return logWeightBase(data, progressData, setProgressData);
  };

  const syncFromFitnessApps = (connectedApps: any) => {
    return syncFromFitnessAppsBase(connectedApps, progressData, setProgressData);
  };

  return {
    progressData,
    bodyMeasurements,
    selectedGoal,
    addGoal,
    updateGoal,
    logActivity,
    logWeight,
    addBodyMeasurements,
    syncFromFitnessApps,
    deleteGoal,
    selectGoal,
    clearSelectedGoal
  };
}
