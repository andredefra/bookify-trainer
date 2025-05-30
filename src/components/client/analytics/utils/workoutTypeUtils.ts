
import { ProgressItem, GoalLog, GoalType } from "@/components/client/overview/fitness-progress/types";
import { WorkoutType } from "../types";

// Map goal types to simplified activity categories
const goalTypeToActivityType: Record<GoalType, string> = {
  'strength_progress': 'Strength Training',
  'cardiovascular_endurance': 'Cardio Training',
  'activity_level': 'Cardio Training',
  'weight_management': 'Cardio Training',
  'body_composition': 'Cardio Training'
};

// Generate activity types from real progress data
export const generateWorkoutTypesFromData = (progressData: ProgressItem[]): WorkoutType[] => {
  const activityCounts: Record<string, number> = {
    'Strength Training': 0,
    'Cardio Training': 0
  };
  let totalSessions = 0;

  // Count sessions by analyzing goal logs
  progressData.forEach(goal => {
    if (goal.logs && goal.logs.length > 0) {
      const activityType = goalTypeToActivityType[goal.goalType] || 'Cardio Training';
      
      // Count sessions from logs (each log represents a session)
      const sessionCount = goal.logs.filter(log => 
        log.source === 'workout' || log.source === 'strength_training' || log.source === 'manual'
      ).length;
      
      activityCounts[activityType] = (activityCounts[activityType] || 0) + sessionCount;
      totalSessions += sessionCount;
    } else {
      // If no logs, estimate based on goal type
      const activityType = goalTypeToActivityType[goal.goalType] || 'Cardio Training';
      const estimatedSessions = 2; // Conservative estimate
      activityCounts[activityType] = (activityCounts[activityType] || 0) + estimatedSessions;
      totalSessions += estimatedSessions;
    }
  });

  // If no data, return realistic defaults
  if (totalSessions === 0) {
    return getDefaultWorkoutTypes();
  }

  // Calculate total activity time (assuming 1 hour per session on average)
  const totalActivityHours = totalSessions;
  const totalHoursInWeek = 24 * 7; // 168 hours per week
  const inactivityHours = totalHoursInWeek - totalActivityHours;
  
  // Calculate percentages
  const inactivityPercentage = Math.round((inactivityHours / totalHoursInWeek) * 100);
  const strengthPercentage = Math.round((activityCounts['Strength Training'] / totalHoursInWeek) * 100);
  const cardioPercentage = Math.round((activityCounts['Cardio Training'] / totalHoursInWeek) * 100);

  return [
    { name: "Inactivity", value: inactivityPercentage, color: "#94a3b8" },
    { name: "Cardio Training", value: cardioPercentage, color: "#10b981" },
    { name: "Strength Training", value: strengthPercentage, color: "#4f46e5" }
  ].filter(type => type.value > 0);
};

// Realistic default activity types
export const getDefaultWorkoutTypes = (): WorkoutType[] => [
  { name: "Inactivity", value: 75, color: "#94a3b8" },
  { name: "Cardio Training", value: 15, color: "#10b981" },
  { name: "Strength Training", value: 10, color: "#4f46e5" }
];
