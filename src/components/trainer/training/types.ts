
import { Exercise, WorkoutDay, TrainingProgram } from "@/data/training/types";

export type { Exercise, WorkoutDay, TrainingProgram };

export interface ProgramFormProps {
  clientId: string;
  clientName: string;
  onSend: (program: any) => void;
  isPremium: boolean;
}
