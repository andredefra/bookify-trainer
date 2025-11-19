import { BodyMeasurements } from "@/components/client/overview/fitness-progress/types";

export interface MeasurementsStatus {
  status: 'healthy' | 'increased_risk' | 'high_risk' | 'very_high_risk';
  label: string;
  color: string;
  primaryIndicator: string;
}

// Waist-to-Height Ratio (WHtR) - most accurate health indicator
// Values apply to both genders, all ages
export const calculateWHtR = (waist: number, height: number): number => {
  return waist / height; // waist in cm, height in cm
};

export const getWHtRStatus = (whtr: number): { status: string; risk: string } => {
  if (whtr < 0.40) return { status: 'underweight', risk: 'increased_risk' };
  if (whtr < 0.50) return { status: 'healthy', risk: 'healthy' };
  if (whtr < 0.60) return { status: 'overweight', risk: 'increased_risk' };
  return { status: 'obese', risk: 'very_high_risk' };
};

// Waist-to-Hip Ratio (WHR) - body shape indicator
export const calculateWHR = (waist: number, hips: number): number => {
  return waist / hips;
};

export const getWHRStatus = (whr: number, gender: 'male' | 'female'): { status: string; risk: string } => {
  if (gender === 'male') {
    if (whr < 0.90) return { status: 'healthy', risk: 'healthy' };
    if (whr < 0.95) return { status: 'moderate', risk: 'increased_risk' };
    return { status: 'high', risk: 'high_risk' };
  } else {
    if (whr < 0.80) return { status: 'healthy', risk: 'healthy' };
    if (whr < 0.85) return { status: 'moderate', risk: 'increased_risk' };
    return { status: 'high', risk: 'high_risk' };
  }
};

// Main function to get overall measurements status
export const getMeasurementsStatus = (measurements: BodyMeasurements): MeasurementsStatus | null => {
  // Need at least waist and height for WHtR (most important)
  if (!measurements.waist || !measurements.height) {
    return null;
  }

  const height = measurements.height;
  const waist = measurements.waist;
  
  // Calculate WHtR (primary indicator)
  const whtr = calculateWHtR(waist, height);
  const whtrStatus = getWHtRStatus(whtr);
  
  // Calculate WHR if hips available (secondary indicator)
  let whrStatus = null;
  if (measurements.hips) {
    const whr = calculateWHR(waist, measurements.hips);
    whrStatus = getWHRStatus(whr, measurements.gender || 'male');
  }

  // Determine overall status (WHtR is primary, WHR can worsen it)
  let finalRisk = whtrStatus.risk;
  if (whrStatus && whrStatus.risk === 'high_risk') {
    finalRisk = 'high_risk';
  }

  // Map to status with labels
  const statusMap: Record<string, { label: string; color: string; status: 'healthy' | 'increased_risk' | 'high_risk' | 'very_high_risk' }> = {
    'healthy': {
      label: 'Healthy Range',
      color: 'bg-green-100 text-green-800',
      status: 'healthy'
    },
    'increased_risk': {
      label: 'Increased Risk',
      color: 'bg-yellow-100 text-yellow-800',
      status: 'increased_risk'
    },
    'high_risk': {
      label: 'High Risk',
      color: 'bg-orange-100 text-orange-800',
      status: 'high_risk'
    },
    'very_high_risk': {
      label: 'Very High Risk',
      color: 'bg-red-100 text-red-800',
      status: 'very_high_risk'
    }
  };

  const statusInfo = statusMap[finalRisk];

  return {
    status: statusInfo.status,
    label: statusInfo.label,
    color: statusInfo.color,
    primaryIndicator: `WHtR: ${(whtr * 100).toFixed(1)}%`
  };
}
