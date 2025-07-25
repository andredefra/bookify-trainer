// Unified types for workout logging
export interface WorkoutExercise {
  id: string;
  name: string;
  exerciseDbId?: string; // Link to exercise database
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  muscleGroups?: string[];
  equipment?: string[];
  notes?: string;
  setsData: WorkoutSet[];
}

export interface WorkoutSet {
  setNumber: number;
  targetReps: string;
  actualReps?: number;
  weight?: number;
  completed: boolean;
  notes?: string;
}

export interface WorkoutLog {
  id: string;
  date: string;
  name: string;
  exercises: WorkoutExercise[];
  duration?: string;
  notes?: string;
}