
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  repsUnit?: 'reps' | 'sec' | 'min';
  weight?: number;
  notes?: string;
  videoUrl?: string;
  videoSource?: 'youtube' | 'vimeo';
  // User tracking fields
  userNotes?: string;
  maxWeight?: number; // For strength exercises
  exerciseType?: 'strength' | 'cardio';
}

export interface WorkoutSession {
  id: string;
  sessionNumber: number;
  title: string;
  exercises: Exercise[];
  completed: boolean;
  completedDate?: string; // ISO date string when completed
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
}

// Keep backward compatibility
export interface WorkoutDay {
  id: string;
  day: string;
  exercises: Exercise[];
  completed: boolean;
}
