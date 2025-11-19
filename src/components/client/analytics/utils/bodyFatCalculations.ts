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
 * @param params Object containing waist, neck, hips (for female), height, and gender
 * @returns Body fat percentage or null if insufficient data
 */
export const calculateBodyFatPercentage = (params: {
  waist: number;
  neck: number;
  hips?: number;
  height: number;
  gender: 'male' | 'female';
}): number | null => {
  const { waist, neck, hips, height, gender } = params;
  
  if (!gender || !height || !waist || !neck) {
    return null;
  }

  if (gender === 'male') {
    return calculateMaleBodyFat(waist, neck, height);
  } else if (gender === 'female') {
    if (!hips) {
      return null; // Hips required for female calculation
    }
    return calculateFemaleBodyFat(waist, hips, neck, height);
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
 * Check if measurements and profile data are sufficient for body fat calculation
 * @param params Object containing height, gender, waist, neck, hips
 * @returns Object with sufficiency status and missing fields
 */
export const checkBodyFatRequirements = (params: {
  height?: number;
  gender?: 'male' | 'female';
  waist?: number;
  neck?: number;
  hips?: number;
}): { 
  sufficient: boolean; 
  missing: string[] 
} => {
  const missing: string[] = [];
  
  if (!params.height) missing.push('Height');
  if (!params.gender) missing.push('Gender');
  if (!params.waist) missing.push('Waist');
  if (!params.neck) missing.push('Neck');
  
  if (params.gender === 'female' && !params.hips) {
    missing.push('Hips');
  }
  
  return {
    sufficient: missing.length === 0,
    missing
  };
};