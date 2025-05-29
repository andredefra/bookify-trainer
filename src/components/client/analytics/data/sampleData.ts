
import { WeeklyDataItem, WorkoutType } from '../types';

// Sample data for the charts
export const weeklyWorkoutData: WeeklyDataItem[] = [
  { day: "Mon", minutes: 45, calories: 350, steps: 8500, distance: 3.2 },
  { day: "Tue", minutes: 60, calories: 560, steps: 12000, distance: 5.8 },
  { day: "Wed", minutes: 0, calories: 0, steps: 3000, distance: 1.2 },
  { day: "Thu", minutes: 30, calories: 400, steps: 7500, distance: 2.8 },
  { day: "Fri", minutes: 40, calories: 420, steps: 9200, distance: 4.1 },
  { day: "Sat", minutes: 90, calories: 700, steps: 15000, distance: 7.5 },
  { day: "Sun", minutes: 20, calories: 300, steps: 5500, distance: 2.1 },
];

export const workoutTypesData: WorkoutType[] = [
  { name: "HIIT", value: 12, color: "#0088FE" },
  { name: "Strength", value: 8, color: "#00C49F" },
  { name: "Cardio", value: 15, color: "#FFBB28" },
  { name: "Yoga", value: 6, color: "#FF8042" },
  { name: "Pilates", value: 4, color: "#8884d8" },
];
