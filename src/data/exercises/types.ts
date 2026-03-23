
export type Mechanics = 'isolation' | 'compound';
export type ForceType = 'push' | 'pull' | 'static' | 'hinge' | 'squat' | 'carry';
export type ActivityType = 'strength' | 'cardio' | 'mobility' | 'plyometric' | 'stretching';

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
  
  // Biomechanical Fields
  mechanics?: Mechanics;
  forceType?: ForceType;
  activityType?: ActivityType;
  
  // GIF/Media Fields
  demonstrationGif?: string;
  customGifUrl?: string;
  
  // Source tracking (for client library)
  source?: 'client' | 'trainer';
  readOnly?: boolean;
}
