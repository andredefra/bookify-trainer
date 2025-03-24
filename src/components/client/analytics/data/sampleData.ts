
import { WeeklyDataItem, MonthlyGoal, WorkoutType, ProgressHistoryItem } from '../types';

// Sample data for the charts
export const weeklyWorkoutData: WeeklyDataItem[] = [
  { day: "Mon", minutes: 45, calories: 350 },
  { day: "Tue", minutes: 60, calories: 560 },
  { day: "Wed", minutes: 0, calories: 0 },
  { day: "Thu", minutes: 30, calories: 400 },
  { day: "Fri", minutes: 40, calories: 420 },
  { day: "Sat", minutes: 90, calories: 700 },
  { day: "Sun", minutes: 20, calories: 300 },
];

export const monthlyGoalsData: MonthlyGoal[] = [
  { type: "Weight Loss", current: 75, target: 100 },
  { type: "Cardio", current: 60, target: 100 },
  { type: "Strength", current: 85, target: 100 },
  { type: "Flexibility", current: 40, target: 100 },
];

export const workoutTypesData: WorkoutType[] = [
  { name: "HIIT", value: 12, color: "#0088FE" },
  { name: "Strength", value: 8, color: "#00C49F" },
  { name: "Cardio", value: 15, color: "#FFBB28" },
  { name: "Yoga", value: 6, color: "#FF8042" },
  { name: "Pilates", value: 4, color: "#8884d8" },
];

export const progressHistoryData: ProgressHistoryItem[] = [
  { week: "Jan", weight: 75, strength: 30, endurance: 40 },
  { week: "Feb", weight: 74, strength: 35, endurance: 42 },
  { week: "Mar", weight: 73, strength: 40, endurance: 45 },
  { week: "Apr", weight: 71, strength: 45, endurance: 50 },
  { week: "May", weight: 70, strength: 48, endurance: 55 },
  { week: "Jun", weight: 69, strength: 52, endurance: 60 },
];
