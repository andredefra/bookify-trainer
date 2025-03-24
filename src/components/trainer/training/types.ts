
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  notes?: string;
}

export interface WorkoutDay {
  id: string;
  day: string;
  exercises: Exercise[];
}

export interface TrainingProgram {
  title: string;
  weekStart: string;
  days: WorkoutDay[];
}

export interface ProgramFormProps {
  clientId: string;
  clientName: string;
  onSend: (program: any) => void;
  isPremium: boolean;
}
