
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
  duration?: number; // For cardio/flexibility tracking (minutes)
  reps?: number; // For strength/flexibility tracking
  sets?: number; // For strength tracking
}

export interface Milestone {
  id: string;
  targetValue: number;
  targetDate: string;
  achieved: boolean;
  achievedDate?: string;
}

export type GoalType = 
  | 'weight_management'
  | 'cardiovascular_endurance' 
  | 'strength_progress'
  | 'activity_level'
  | 'body_composition'
  | 'workout_consistency'
  | 'flexibility_mobility';

export interface GoalTemplate {
  type: GoalType;
  name: string;
  description: string;
  unit: string;
  defaultTarget?: number;
  requiresExercise?: boolean;
  requiresFrequency?: boolean;
  examples: string[];
}

export interface BodyMeasurements {
  id?: string;
  date: string;
  waist?: number; // vita
  hips?: number; // fianchi
  thighs?: number; // cosce
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
