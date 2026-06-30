
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

export interface FitnessTrackerData {
  steps: number;
  calories: number;
  heartRate: number;
  activeTime: number;
  distance: number;
  sleepHours?: number;
}

export interface BodyCompositionData {
  date: string;
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  bmi?: number;
}

export interface AnalyticsStats {
  totalWorkouts: number;
  weeklyAverage: number;
  currentStreak: number;
  longestStreak: number;
  totalMinutes: number;
  totalCaloriesBurned: number;
  averageIntensity: string;
  avgStepsPerDay: number;
  avgCaloriesPerDay: number;
}

export interface AIInsights {
  totalAnalyses: number;
  averageCaloriesPerWorkout: number;
  dominantIntensity: string;
  topGoalCategories: string[];
  improvementAreas: string[];
  currentMotivation: string;
  fitnessScore: number;
  progressTrend: 'improving' | 'stable' | 'declining';
  personalizedInsights?: string[];
  weeklyProgressChange?: number;
  specificRecommendations?: string[];
  goalAchievementRate?: number;
}

export interface TrendData {
  period: string;
  workouts: number;
  minutes: number;
  calories: number;
  steps: number;
  weight?: number;
  goalProgress: number;
}

export interface WorkoutAnalyticsProps {
  progressData: ProgressItem[];
  weeklyData?: WeeklyDataItem[];
  workoutTypes?: WorkoutType[];
  fitnessTrackerData?: FitnessTrackerData;
  bodyCompositionData?: BodyCompositionData[];
  hideAI?: boolean;
}

