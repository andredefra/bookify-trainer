
import { useGoalManagement } from "./useGoalManagement";
import { useActivityLogging } from "./useActivityLogging";
import { useBodyMeasurements } from "./useBodyMeasurements";
import { useFitnessSync } from "./useFitnessSync";
import { useWeightLogs } from "./useWeightLogs";
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
  const { bodyMeasurements, addBodyMeasurements, deleteBodyMeasurement } = useBodyMeasurements();
  const { syncFromFitnessApps: syncFromFitnessAppsBase } = useFitnessSync();
  const { weightLogs, addWeightLog, deleteWeightLog } = useWeightLogs();

  const logActivity = (data: any) => {
    return logActivityBase(data, progressData, setProgressData);
  };

  const logWeight = (data: any) => {
    // 1) Persist to weight logs history
    addWeightLog(data);
    // 2) Update any weight-related goals
    logWeightBase(data, progressData, setProgressData);
    // 3) Add a body-measurement snapshot so BMI / Body Fat cards see this weight
    addBodyMeasurements({
      id: `weight-snapshot-${Date.now()}`,
      date: data.date || new Date().toISOString().split('T')[0],
      weight: Number(data.weight),
      source: 'manual',
    });
    return true;
  };

  const syncFromFitnessApps = (connectedApps: any) => {
    return syncFromFitnessAppsBase(connectedApps, progressData, setProgressData);
  };

  return {
    progressData,
    bodyMeasurements,
    weightLogs,
    selectedGoal,
    addGoal,
    updateGoal,
    logActivity,
    logWeight,
    addBodyMeasurements,
    deleteBodyMeasurement,
    deleteWeightLog,
    syncFromFitnessApps,
    deleteGoal,
    selectGoal,
    clearSelectedGoal
  };
}
