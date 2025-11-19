// MET (Metabolic Equivalent of Task) values for common activities
// 1 MET = resting metabolic rate
// Formula: Calories = MET × weight(kg) × duration(hours)

export const MET_VALUES: Record<string, number> = {
  // Light activities (2-3 METs)
  'yoga_light': 2.5,
  'stretching': 2.3,
  'walking_slow': 2.5,
  'pilates': 3.0,
  'tai_chi': 3.0,
  
  // Moderate activities (4-6 METs)
  'walking_moderate': 4.0,
  'cycling_leisure': 4.0,
  'swimming_leisure': 4.5,
  'dancing': 4.5,
  'yoga_moderate': 4.0,
  'weight_lifting_light': 3.5,
  
  // Vigorous activities (7-9 METs)
  'running_moderate': 7.0,
  'cycling_vigorous': 8.0,
  'swimming_vigorous': 8.0,
  'rowing': 7.0,
  'basketball': 8.0,
  'soccer': 8.0,
  'tennis': 7.3,
  'weight_lifting_vigorous': 6.0,
  
  // Very vigorous activities (10+ METs)
  'running_fast': 11.5,
  'hiit': 12.0,
  'sprinting': 15.0,
  'crossfit': 10.0,
  'boxing': 12.3,
  'jump_rope': 12.3,
  'burpees': 8.0
};

export const calculateCaloriesFromMET = (
  metValue: number,
  weightKg: number,
  durationMinutes: number
): number => {
  const durationHours = durationMinutes / 60;
  return Math.round(metValue * weightKg * durationHours);
};

export const getMETValue = (activityKey: string): number => {
  return MET_VALUES[activityKey] || 5.0; // Default to moderate intensity
};

export const getMETCategory = (metValue: number): string => {
  if (metValue < 3) return 'Light';
  if (metValue < 6) return 'Moderate';
  if (metValue < 9) return 'Vigorous';
  return 'Very Vigorous';
};
