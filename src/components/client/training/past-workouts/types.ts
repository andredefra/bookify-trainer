
import { ExerciseLog } from "../workout-form/types";

export interface WorkoutLog {
  id: string;
  date: string;
  name: string;
  exercises: ExerciseLog[];
  duration?: string;
}
