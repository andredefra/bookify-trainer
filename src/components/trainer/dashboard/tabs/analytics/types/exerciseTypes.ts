export interface ExerciseMaxDataPoint {
  exercise: string;
  weight: number;
  reps: number;
  oneRM: number;
  tenRM: number;
  date: string;
  clientId?: string;
  clientName?: string;
}

export interface ExerciseMaxCalculation {
  oneRM: number;
  tenRM: number;
}

// Common exercises that trainers typically track
export const COMMON_EXERCISES = [
  'Squat',
  'Bench Press',
  'Deadlift',
  'Overhead Press',
  'Barbell Row',
  'Pull-ups',
  'Dips',
  'Front Squat',
  'Incline Press',
  'Romanian Deadlift'
] as const;

export type ExerciseType = typeof COMMON_EXERCISES[number];