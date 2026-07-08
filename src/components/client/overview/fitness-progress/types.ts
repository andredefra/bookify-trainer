
export interface ProgressItem {
  id?: string;
  goal: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
  lastUpdated?: string;
  createdAt?: string;
  logs?: GoalLog[];
  // Goal source tracking
  source: 'personal' | 'trainer';
  trainerId?: string;
  trainerName?: string;
  // Enhanced goal system fields
  goalType: GoalType;
  targetDate: string;
  exerciseId?: string; // For strength goals
  exerciseName?: string; // For strength goals display
  frequency?: {
    value: number;
    period: 'daily' | 'weekly' | 'monthly';
  };
  milestones?: Milestone[];
}

export interface GoalLog {
  id: string;
  date: string;
  value: number;
  source: 'manual' | 'googleFit' | 'appleHealth' | 'workout' | 'strength_training';
  note?: string;
  exerciseWeight?: number; // For strength tracking
  exerciseName?: string; // For strength exercise identification
  distance?: number; // For cardio tracking (km)
  duration?: number; // For cardio tracking (minutes)
  reps?: number; // For strength tracking
  sets?: number; // For strength tracking
  exerciseDbId?: string;
  exerciseMetadata?: {
    name: string;
    category: string;
    muscleGroups: string[];
    equipment: string[];
    difficulty: string;
  };
  calorieBreakdown?: {
    method: string;
    baseMET?: number;
    adjustedMET?: number;
    duration: number;
    totalCalories: number;
  };
}

export interface Milestone {
  id: string;
  targetValue: number;
  targetDate: string;
  achieved: boolean;
  achievedDate?: string;
}

export type GoalType = string;

export interface GoalTemplate {
  type: GoalType;
  name: string;
  description: string;
  unit: string;
  defaultTarget?: number;
  requiresExercise?: boolean;
  requiresFrequency?: boolean;
  examples: string[];
  examplePlaceholder?: string;
  customUnit?: string;
  isCustom?: boolean;
  title?: string;
  guide?: string;
}

// Custom Activity Types
export interface CustomActivityType {
  id: string;
  title: string;
  description: string;
  icon?: string;
  isCustom: true;
  fields: ActivityField[];
  calorieCalculation: {
    method: 'fixed' | 'per-minute' | 'per-distance' | 'formula' | 'met' | 'met-dynamic' | 'strength-formula' | 'manual-or-estimated';
    value?: number;
    formula?: string;
    metValue?: number;
    fallbackFormula?: string;
  };
  goalImpacts: GoalImpact[];
}

export interface ActivityField {
  name: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'exercise-selector';
  unit?: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  filterCategory?: string[] | "cardio";
  helperText?: string;
}

export interface GoalImpact {
  goalType: string;
  unitMapping: string;
  calculation: 'add' | 'max' | 'average';
  sourceField: string;
}

export interface ActivityType {
  id: string;
  title: string;
  description: string;
  icon?: string;
  isCustom?: boolean;
  fields: ActivityField[];
  calorieCalculation: {
    method: 'fixed' | 'per-minute' | 'per-distance' | 'formula' | 'met' | 'met-dynamic' | 'strength-formula' | 'manual-or-estimated';
    value?: number;
    formula?: string;
    metValue?: number;
    fallbackFormula?: string;
  };
  goalImpacts: GoalImpact[];
}

export interface BodyMeasurements {
  id?: string;
  date: string;
  weight?: number; // peso in kg
  // DEPRECATED: height e gender ora sono nel profilo utente (user_profiles table)
  // height?: number; 
  // gender?: 'male' | 'female';
  chest?: number; // petto
  waist?: number; // vita
  abdomen?: number; // addome
  hips?: number; // fianchi
  quadriceps?: number; // quadricipiti (ex thighs)
  /** @deprecated use `quadriceps` — kept for legacy log compatibility */
  thighs?: number;
  shoulders?: number; // spalle
  arms?: number; // braccia
  neck?: number; // collo
  bodyFatPercentage?: number; // calculated
  leanMass?: number; // calculated
  source: 'manual' | 'googleFit' | 'appleHealth';
}

export interface FitnessProgressCardProps {
  progressData: ProgressItem[];
  bodyMeasurements?: BodyMeasurements[];
  connectedApps?: {
    googleFit: boolean;
    appleHealth: boolean;
  };
}
