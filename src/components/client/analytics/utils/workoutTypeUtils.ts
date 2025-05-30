
import { ProgressItem, GoalLog, GoalType } from "@/components/client/overview/fitness-progress/types";
import { WorkoutType } from "../types";

// Map goal types to workout categories
const goalTypeToWorkoutType: Record<GoalType, string> = {
  'strength_progress': 'Strength',
  'cardiovascular_endurance': 'Cardio',
  'activity_level': 'Activity',
  'weight_management': 'Weight Management',
  'body_composition': 'Body Composition'
};

// Generate workout types from real progress data
export const generateWorkoutTypesFromData = (progressData: ProgressItem[]): WorkoutType[] => {
  const workoutCounts: Record<string, number> = {};
  let totalSessions = 0;

  // Count sessions by analyzing goal logs
  progressData.forEach(goal => {
    if (goal.logs && goal.logs.length > 0) {
      const workoutType = goalTypeToWorkoutType[goal.goalType] || 'Other';
      
      // Count sessions from logs (each log represents a session)
      const sessionCount = goal.logs.filter(log => 
        log.source === 'workout' || log.source === 'strength_training' || log.source === 'manual'
      ).length;
      
      workoutCounts[workoutType] = (workoutCounts[workoutType] || 0) + sessionCount;
      totalSessions += sessionCount;
    } else {
      // If no logs, estimate based on goal type
      const workoutType = goalTypeToWorkoutType[goal.goalType] || 'Other';
      const estimatedSessions = 3; // Conservative estimate
      workoutCounts[workoutType] = (workoutCounts[workoutType] || 0) + estimatedSessions;
      totalSessions += estimatedSessions;
    }
  });

  // If no data, return realistic defaults
  if (totalSessions === 0) {
    return getDefaultWorkoutTypes();
  }

  // Convert counts to percentages and create WorkoutType objects
  const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  let colorIndex = 0;

  return Object.entries(workoutCounts)
    .map(([name, count]) => ({
      name,
      value: Math.round((count / totalSessions) * 100),
      color: colors[colorIndex++ % colors.length]
    }))
    .filter(type => type.value > 0)
    .sort((a, b) => b.value - a.value);
};

// Realistic default workout types (no more "Flexibility")
export const getDefaultWorkoutTypes = (): WorkoutType[] => [
  { name: "Strength", value: 40, color: "#4f46e5" },
  { name: "Cardio", value: 35, color: "#10b981" },
  { name: "Activity", value: 20, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#ef4444" }
];
