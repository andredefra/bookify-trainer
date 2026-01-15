
// Set tracking data for individual sets
export interface SetData {
  setNumber: number;
  targetReps: string;
  actualReps?: number;
  weight?: number;
  completed?: boolean;
  notes?: string;
}

// Historical performance tracking
export interface ExerciseHistory {
  sessionId: string;
  date: string;
  sets: SetData[];
  totalVolume: number; // weight * reps * sets
  averageWeight: number;
  maxWeight: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  repsUnit?: 'reps' | 'sec' | 'min';
  weight?: number; // Suggested/average weight
  notes?: string; // Trainer-specific notes for the client
  // User tracking fields
  userNotes?: string;
  maxWeight?: number; // For strength exercises
  exerciseType?: 'strength' | 'cardio';
  // Enhanced tracking
  setsData?: SetData[]; // Individual set tracking
  history?: ExerciseHistory[]; // Historical performance
  // Exercise database integration
  exerciseDbId?: string; // Link to exercise database
  videoUrl?: string;
  alternativeExercises?: string[];
  muscleGroups?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  equipment?: string[];
}

export interface WorkoutSession {
  id: string;
  sessionNumber: number;
  title: string;
  exercises: Exercise[];
  items?: SessionItem[];  // Mixed exercises and circuits (new)
  completed: boolean;
  completedDate?: string; // ISO date string when completed
  dayOfWeek?: number;
  notes?: string;
  isOverride?: boolean; // true = user customized this session, won't be overwritten by pattern
}

export interface TrainingProgram {
  id: string;
  title: string;
  week: string;
  trainerName: string;
  sessions: WorkoutSession[];
  // Program configuration
  weekStart?: string;
  duration?: number; // in weeks
  objective?: string;
  description?: string;
  isPaid?: boolean;
  price?: number;
  // Session tracking
  targetFrequency: number; // sessions per week (e.g., 4)
  totalSessions: number; // total sessions in program
  
  // Standalone program fields
  isStandalone?: boolean;           // true if not part of a package
  packageAssignmentId?: string;     // ID assignment if part of package
  
  // Trainer info
  trainerId?: string;
  trainerSubscriptionTier?: 'free' | 'essential' | 'pro';
  
  // Payment status
  paymentStatus?: 'pending' | 'partial' | 'paid' | 'confirmed';
  paymentMethod?: 'cash' | 'card' | 'installments';
  totalPrice?: number;
  amountPaid?: number;
  
  // Installments info
  installments?: {
    totalInstallments: number;
    paidInstallments: number;
    nextDueDate?: string;
    nextAmount?: number;
  };
  
  // Client confirmation
  clientConfirmedPayment?: boolean;
  clientConfirmedAt?: string;
}

// Routine - reusable cluster of exercises
export interface Routine {
  id: string;
  title: string;
  description?: string;
  exercises: Exercise[];
  createdAt: string;
  updatedAt: string;
}

// Circuit - a group of exercises with rounds and rest settings
export interface Circuit {
  id: string;
  name: string;
  rounds: number;            // e.g., 3
  restBetweenRounds: number; // in seconds, e.g., 90
  exercises: Exercise[];
}

// Session content can be an Exercise OR a Circuit
export type SessionItem = 
  | { type: 'exercise'; data: Exercise }
  | { type: 'circuit'; data: Circuit };

// Day pattern for Weekly Pattern mode
export interface DayPattern {
  dayNumber: number; // 1, 2, 3, etc.
  title: string; // e.g., "Leg Day"
  exercises: Exercise[];
  items?: SessionItem[];  // Mixed exercises and circuits
  routineIds?: string[]; // Track which routines were imported
}

// Keep backward compatibility
export interface WorkoutDay {
  id: string;
  day: string;
  exercises: Exercise[];
  completed: boolean;
}
