
import { ProgressItem } from "./types";

// Calculate progress percentage and ensure it's between 0-100
export const calculateProgress = (current: number, target: number): number => {
  return Math.min(100, Math.max(0, Math.round((current / target) * 100)));
};

// Get current date in ISO format for tracking updates
export const getCurrentDate = (): string => new Date().toISOString();
