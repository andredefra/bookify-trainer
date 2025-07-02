export interface ExerciseData {
  id: string;
  name: string;
  category: string;
  muscleGroup: string[];
  equipment: string[];
  primaryEquipment?: string;
  difficulty: string;
  notes: string;
  videoUrl?: string;
  isCustom?: boolean;
  equipmentImages?: { [equipment: string]: string };
  alternativeExercises?: string[];
}

export const searchExercises = (query: string, exercises: ExerciseData[]): ExerciseData[] => {
  if (!query) {
    return exercises;
  }

  const lowerCaseQuery = query.toLowerCase();
  return exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(lowerCaseQuery) ||
    exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(lowerCaseQuery))
  );
};

import { generateEquipmentImages } from './equipmentImageMap';

export const exerciseDatabase: ExerciseData[] = [
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Barbell', 'Bench'],
    primaryEquipment: 'Barbell',
    difficulty: 'intermediate',
    notes: 'Lie on a bench and press the barbell up from chest level. Keep your feet flat on the ground and maintain a slight arch in your back.',
    videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
    equipmentImages: generateEquipmentImages(['Barbell', 'Bench']),
    alternativeExercises: ['dumbbell-bench-press', 'push-ups', 'chest-press-machine']
  },
  {
    id: 'dumbbell-bench-press',
    name: 'Dumbbell Bench Press',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Dumbbells', 'Bench'],
    primaryEquipment: 'Dumbbells',
    difficulty: 'intermediate',
    notes: 'Similar to barbell bench press but with dumbbells. Allows for greater range of motion and unilateral training.',
    equipmentImages: generateEquipmentImages(['Dumbbells', 'Bench']),
    alternativeExercises: ['bench-press', 'push-ups', 'incline-dumbbell-press']
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Bodyweight'],
    primaryEquipment: 'Bodyweight',
    difficulty: 'beginner',
    notes: 'Start in plank position, lower body until chest nearly touches ground, then push back up. Keep body straight throughout.',
    equipmentImages: generateEquipmentImages(['Bodyweight']),
    alternativeExercises: ['bench-press', 'dumbbell-bench-press', 'incline-push-ups']
  },
  {
    id: 'chest-press-machine',
    name: 'Chest Press Machine',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Chest Press Machine'],
    primaryEquipment: 'Chest Press Machine',
    difficulty: 'beginner',
    notes: 'Seated chest press using machine. Adjust seat height so handles are at chest level. Press forward with control.',
    equipmentImages: generateEquipmentImages(['Chest Press Machine']),
    alternativeExercises: ['bench-press', 'dumbbell-bench-press', 'push-ups']
  },
  {
    id: 'squats',
    name: 'Squats',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    primaryEquipment: 'Bodyweight',
    difficulty: 'beginner',
    notes: 'Stand with feet shoulder-width apart, lower body as if sitting back into a chair, keep chest up and knees behind toes.',
    equipmentImages: generateEquipmentImages(['Bodyweight']),
    alternativeExercises: ['goblet-squats', 'leg-press', 'wall-sits']
  },
  {
    id: 'barbell-squats',
    name: 'Barbell Back Squats',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings', 'Erector Spinae'],
    equipment: ['Barbell', 'Power Rack'],
    primaryEquipment: 'Barbell',
    difficulty: 'advanced',
    notes: 'Place barbell on upper back, squat down keeping chest up and knees tracking over toes. Requires proper form and mobility.',
    equipmentImages: generateEquipmentImages(['Barbell', 'Power Rack']),
    alternativeExercises: ['goblet-squats', 'front-squats', 'leg-press']
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Leg Press Machine'],
    primaryEquipment: 'Leg Press Machine',
    difficulty: 'beginner',
    notes: 'Seated leg press with back support. Place feet shoulder-width apart on platform, lower weight with control.',
    equipmentImages: generateEquipmentImages(['Leg Press Machine']),
    alternativeExercises: ['squats', 'goblet-squats', 'lunges']
  },
  {
    id: 'deadlifts',
    name: 'Deadlifts',
    category: 'back',
    muscleGroup: ['Erector Spinae', 'Latissimus Dorsi', 'Rhomboids', 'Hamstrings', 'Glutes'],
    equipment: ['Barbell'],
    primaryEquipment: 'Barbell',
    difficulty: 'advanced',
    notes: 'Hip hinge movement lifting barbell from floor. Keep back straight, chest up, and bar close to body throughout movement.',
    equipmentImages: generateEquipmentImages(['Barbell']),
    alternativeExercises: ['romanian-deadlifts', 'rack-pulls', 'dumbbell-deadlifts']
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius', 'Biceps'],
    equipment: ['Pull-up Bar'],
    primaryEquipment: 'Pull-up Bar',
    difficulty: 'intermediate',
    notes: 'Hang from bar with overhand grip, pull body up until chin clears bar. Lower with control.',
    equipmentImages: generateEquipmentImages(['Pull-up Bar']),
    alternativeExercises: ['lat-pulldowns', 'assisted-pull-ups', 'inverted-rows']
  },
  {
    id: 'lat-pulldowns',
    name: 'Lat Pulldowns',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius', 'Biceps'],
    equipment: ['Lat Pulldown Machine'],
    primaryEquipment: 'Lat Pulldown Machine',
    difficulty: 'beginner',
    notes: 'Seated pulldown with wide grip bar. Pull bar to upper chest, squeeze shoulder blades together.',
    equipmentImages: generateEquipmentImages(['Lat Pulldown Machine']),
    alternativeExercises: ['pull-ups', 'cable-rows', 'inverted-rows']
  }
];
