import { BodyMeasurements } from "@/components/client/overview/fitness-progress/types";

/**
 * Calculate Body Fat percentage for males using Navy formula
 * Formula: 86.010 x log10 (cm vita- cm collo) – 70.041 x log10 (altezza) + 36.76
 * @param waist Waist circumference in cm
 * @param neck Neck circumference in cm  
 * @param height Height in cm
 * @returns Body fat percentage
 */
export const calculateMaleBodyFat = (waist: number, neck: number, height: number): number => {
  const log10WaistMinusNeck = Math.log10(waist - neck);
  const log10Height = Math.log10(height);
  
  const bodyFat = 86.010 * log10WaistMinusNeck - 70.041 * log10Height + 36.76;
  
  return Math.max(0, Math.min(50, Math.round(bodyFat * 10) / 10));
};

/**
 * Calculate Body Fat percentage for females using Navy formula
 * Formula: 163.205 x log10 (cm vita+ cm fianchi – cm collo) – 97.684 x log10 (altezza) – 78.387
 * @param waist Waist circumference in cm
 * @param hips Hips circumference in cm
 * @param neck Neck circumference in cm
 * @param height Height in cm
 * @returns Body fat percentage
 */
export const calculateFemaleBodyFat = (waist: number, hips: number, neck: number, height: number): number => {
  const log10WaistPlusHipsMinusNeck = Math.log10(waist + hips - neck);
  const log10Height = Math.log10(height);
  
  const bodyFat = 163.205 * log10WaistPlusHipsMinusNeck - 97.684 * log10Height - 78.387;
  
  return Math.max(0, Math.min(50, Math.round(bodyFat * 10) / 10));
};

/**
 * Calculate Body Fat percentage based on gender and measurements
 * @param measurements Body measurements including gender
 * @returns Body fat percentage or null if insufficient data
 */
export const calculateBodyFatPercentage = (measurements: BodyMeasurements): number | null => {
  if (!measurements.gender || !measurements.height || !measurements.waist || !measurements.neck) {
    return null;
  }

  if (measurements.gender === 'male') {
    return calculateMaleBodyFat(measurements.waist, measurements.neck, measurements.height);
  } else if (measurements.gender === 'female') {
    if (!measurements.hips) {
      return null; // Hips required for female calculation
    }
    return calculateFemaleBodyFat(measurements.waist, measurements.hips, measurements.neck, measurements.height);
  }

  return null;
};

/**
 * Get body fat status category
 * @param bodyFat Body fat percentage
 * @param gender Gender (male/female)
 * @returns Status with label and color
 */
export const getBodyFatStatus = (bodyFat: number, gender: 'male' | 'female'): { label: string; color: string } => {
  if (gender === 'male') {
    if (bodyFat < 6) return { label: "Essential", color: "text-blue-600 bg-blue-50" };
    if (bodyFat < 14) return { label: "Athletic", color: "text-green-600 bg-green-50" };
    if (bodyFat < 18) return { label: "Fitness", color: "text-emerald-600 bg-emerald-50" };
    if (bodyFat < 25) return { label: "Average", color: "text-yellow-600 bg-yellow-50" };
    return { label: "Obese", color: "text-red-600 bg-red-50" };
  } else {
    if (bodyFat < 14) return { label: "Essential", color: "text-blue-600 bg-blue-50" };
    if (bodyFat < 21) return { label: "Athletic", color: "text-green-600 bg-green-50" };
    if (bodyFat < 25) return { label: "Fitness", color: "text-emerald-600 bg-emerald-50" };
    if (bodyFat < 32) return { label: "Average", color: "text-yellow-600 bg-yellow-50" };
    return { label: "Obese", color: "text-red-600 bg-red-50" };
  }
};

/**
 * Check if measurements are sufficient for body fat calculation
 * @param measurements Body measurements
 * @returns Object with sufficiency status and missing fields
 */
export const checkBodyFatRequirements = (measurements: BodyMeasurements): { 
  sufficient: boolean; 
  missing: string[] 
} => {
  const missing: string[] = [];
  
  if (!measurements.height) missing.push('Height');
  if (!measurements.gender) missing.push('Gender');
  if (!measurements.waist) missing.push('Waist');
  if (!measurements.neck) missing.push('Neck');
  
  if (measurements.gender === 'female' && !measurements.hips) {
    missing.push('Hips');
  }
  
  return {
    sufficient: missing.length === 0,
    missing
  };
};