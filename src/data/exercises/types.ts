
export interface ExerciseData {
  id: string;
  name: string;
  category: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'cardio' | 'functional' | 'flexibility' | 'plyometric';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscleGroup: string[];
  equipment: string[];
  notes: string;
  videoUrl?: string;
  equipmentImages?: { [equipment: string]: string };
  alternativeExercises?: string[];
  isCustom?: boolean;
  isModified?: boolean;
  isDeletable?: boolean;
}
