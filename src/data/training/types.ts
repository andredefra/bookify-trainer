
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  notes?: string;
  videoUrl?: string;
  videoSource?: 'youtube' | 'vimeo';
}

export interface WorkoutDay {
  id: string;
  day: string;
  exercises: Exercise[];
  completed: boolean;
}

export interface TrainingProgram {
  id: string;
  title: string;
  week: string;
  trainerName: string;
  days: WorkoutDay[];
}
