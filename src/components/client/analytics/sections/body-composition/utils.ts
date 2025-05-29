
import { ProgressItem, BodyMeasurements } from "@/components/client/overview/fitness-progress/types";

// Helper function to get latest body measurements
export const getLatestMeasurements = (measurements: BodyMeasurements[] = []): BodyMeasurements | null => {
  if (measurements.length === 0) return null;
  return measurements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
};

// Helper function to get weight data from progress goals
export const getWeightData = (progressData: ProgressItem[]) => {
  const weightGoal = progressData.find(goal => goal.goalType === 'weight_management');
  return weightGoal ? {
    current: weightGoal.current,
    target: weightGoal.target,
    unit: weightGoal.unit,
    trend: weightGoal.current < weightGoal.target ? 'down' : weightGoal.current > weightGoal.target ? 'up' : 'stable'
  } : null;
};

// Calculate BMI
export const calculateBMI = (weight: number, height: number = 1.75): number => {
  // Default height of 1.75m if not provided - in a real app this would come from user profile
  return Math.round((weight / (height * height)) * 10) / 10;
};

// Get BMI status
export const getBMIStatus = (bmi: number): { label: string; color: string } => {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600 bg-blue-50" };
  if (bmi < 25) return { label: "Normal", color: "text-green-600 bg-green-50" };
  if (bmi < 30) return { label: "Overweight", color: "text-orange-600 bg-orange-50" };
  return { label: "Obese", color: "text-red-600 bg-red-50" };
};
