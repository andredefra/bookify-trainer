
import { ProgressItem, GoalLog, GoalType } from "@/components/client/overview/fitness-progress/types";

export interface WeeklyDataItem {
  day: string;
  minutes: number;
  calories: number;
  steps: number;
  distance: number;
}

export interface GoalProgressItem {
  type: GoalType;
  name: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
}

export interface WorkoutType {
  name: string;
  value: number;
  color: string;
}

export interface WorkoutAnalyticsProps {
  progressData: ProgressItem[];
  weeklyData?: WeeklyDataItem[];
  workoutTypes?: WorkoutType[];
}
