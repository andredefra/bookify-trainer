
export interface ExerciseLog {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  // Enhanced tracking fields
  exerciseDbId?: string; // Link to exercise database
  setsData?: any[]; // Individual set tracking (can be SetData or SetLogData)
  notes?: string;
  restTime?: number; // Rest time in seconds
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  muscleGroups?: string[];
  equipment?: string[];
}

export interface SetLogData {
  setNumber: number;
  targetReps: number;
  actualReps?: number;
  weight?: number;
  completed?: boolean;
  notes?: string;
  restTime?: number; // Rest time after this set
}

export interface WorkoutLog {
  id: string;
  date: string;
  name: string;
  exercises: ExerciseLog[];
  duration?: number; // in minutes
  totalVolume?: number; // total weight * reps
  notes?: string;
  programId?: string; // Link to training program if applicable
  sessionId?: string; // Link to specific session if applicable
}
