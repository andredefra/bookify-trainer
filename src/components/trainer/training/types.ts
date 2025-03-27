
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  notes?: string;
  videoUrl?: string;
  videoSource?: 'youtube' | 'vimeo';
}

export interface WorkoutDay {
  id: string;
  day: string;
  exercises: Exercise[];
}

export interface TrainingProgram {
  title: string;
  weekStart: string;
  duration: number;
  objective: string;
  description?: string;
  price?: number;
  isPaid: boolean;
  days: WorkoutDay[];
}

export interface ProgramFormProps {
  clientId: string;
  clientName: string;
  onSend: (program: any) => void;
  isPremium: boolean;
}
