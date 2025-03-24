
export interface WeeklyDataItem {
  day: string;
  minutes: number;
  calories: number;
}

export interface MonthlyGoal {
  type: string;
  current: number;
  target: number;
}

export interface WorkoutType {
  name: string;
  value: number;
  color: string;
}

export interface ProgressHistoryItem {
  week: string;
  weight: number;
  strength: number;
  endurance: number;
}

export interface WorkoutAnalyticsProps {
  weeklyData: WeeklyDataItem[];
  monthlyData: MonthlyGoal[];
  workoutTypes: WorkoutType[];
  progressHistory: ProgressHistoryItem[];
}
