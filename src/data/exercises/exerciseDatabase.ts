
export interface ExerciseData {
  id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscleGroup: string[];
  equipment: string[];
  notes: string;
  videoUrl?: string;
  equipmentImages?: { [equipment: string]: string };
  alternativeExercises?: string[];
  isCustom?: boolean;
  isModified?: boolean;
  primaryEquipment?: string;
}

// Complete exercise database with your exact list
export const exerciseDatabase: ExerciseData[] = [
  // LEG EXERCISES
  {
    id: 'leg_001',
    name: 'Angled leg press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Leg Press Machine'],
    notes: 'Position feet shoulder-width apart on the platform. Lower the weight with control and press through heels.',
    videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
    equipmentImages: {
      'Leg Press Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['leg_002', 'leg_007'],
    primaryEquipment: 'Leg Press Machine'
  },
  {
    id: 'leg_002',
    name: 'Horizontal Leg Press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Leg Press Machine'],
    notes: 'Seated horizontal leg press machine. Keep core engaged and full range of motion.',
    videoUrl: 'https://www.youtube.com/watch?v=0tn5K9NlCfo',
    equipmentImages: {
      'Leg Press Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['leg_001', 'leg_007'],
    primaryEquipment: 'Leg Press Machine'
  },
  {
    id: 'leg_003',
    name: 'Leg Extension',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps'],
    equipment: ['Leg Extension Machine'],
    notes: 'Seated leg extension focusing on quadriceps isolation. Control the eccentric phase.',
    videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0',
    equipmentImages: {
      'Leg Extension Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['leg_007', 'leg_001'],
    primaryEquipment: 'Leg Extension Machine'
  },
  {
    id: 'leg_004',
    name: 'Seated Leg Curl',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Seated hamstring curl machine. Focus on controlled movement and full contraction.',
    videoUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuHs',
    equipmentImages: {
      'Leg Curl Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['leg_005', 'leg_006'],
    primaryEquipment: 'Leg Curl Machine'
  },
  {
    id: 'leg_005',
    name: 'Leg Curl lying down',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Lying leg curl machine. Keep hips pressed down and focus on hamstring contraction.',
    videoUrl: 'https://www.youtube.com/watch?v=ELOCsoDSmrg',
    equipmentImages: {
      'Leg Curl Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['leg_004', 'leg_006'],
    primaryEquipment: 'Leg Curl Machine'
  },
  {
    id: 'leg_006',
    name: 'Standing Leg Curl',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Single leg standing curl. Focus on balance and controlled movement.',
    videoUrl: 'https://www.youtube.com/watch?v=F488k67BTdc',
    equipmentImages: {
      'Leg Curl Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['leg_004', 'leg_005'],
    primaryEquipment: 'Leg Curl Machine'
  },
  {
    id: 'leg_007',
    name: 'Barbell squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell', 'Squat Rack'],
    notes: 'King of all exercises. Proper form is crucial. Feet shoulder-width apart, squat to parallel.',
    videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
    equipmentImages: {
      'Barbell': 'https://images.unsplash.com/photo-1534368420009-621b391ec95c?w=400&h=300&fit=crop',
      'Squat Rack': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['leg_008', 'leg_001'],
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_008',
    name: 'Squat SMITH Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Smith machine squat provides stability. Position feet slightly forward of the bar.',
    videoUrl: 'https://www.youtube.com/watch?v=rjkPQJOgJ5k',
    equipmentImages: {
      'Smith Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['leg_007', 'leg_009'],
    primaryEquipment: 'Smith Machine'
  },
  {
    id: 'leg_009',
    name: 'Hack Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Hack Squat Machine'],
    notes: 'Hack squat machine provides back support. Focus on full range of motion.',
    videoUrl: 'https://www.youtube.com/watch?v=EdtaJRBqI9Y',
    equipmentImages: {
      'Hack Squat Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['leg_007', 'leg_008'],
    primaryEquipment: 'Hack Squat Machine'
  },

  // CHEST EXERCISES
  {
    id: 'chest_001',
    name: 'Dumbbell flat bench press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Classic chest exercise. Lower dumbbells to chest level with control, press up explosively.',
    videoUrl: 'https://www.youtube.com/watch?v=QCAFqkBk4hE',
    equipmentImages: {
      'Dumbbells': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      'Bench': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['chest_002', 'chest_003'],
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'chest_002',
    name: 'Barbell flat bench press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Barbell', 'Bench'],
    notes: 'The king of chest exercises. Grip slightly wider than shoulders, lower to chest.',
    videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
    equipmentImages: {
      'Barbell': 'https://images.unsplash.com/photo-1534368420009-621b391ec95c?w=400&h=300&fit=crop',
      'Bench': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['chest_001', 'chest_003'],
    primaryEquipment: 'Barbell'
  },
  {
    id: 'chest_003',
    name: 'Chest Press',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Chest Press Machine'],
    notes: 'Machine chest press provides stability for beginners. Adjust seat height properly.',
    videoUrl: 'https://www.youtube.com/watch?v=xUm0BiZCWlQ',
    equipmentImages: {
      'Chest Press Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['chest_001', 'chest_002'],
    primaryEquipment: 'Chest Press Machine'
  },

  // BACK EXERCISES
  {
    id: 'back_001',
    name: 'Lat machine pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine'],
    notes: 'Wide grip lat pulldown. Pull to upper chest, squeeze shoulder blades together.',
    videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
    equipmentImages: {
      'Lat Pulldown Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['back_002', 'back_003'],
    primaryEquipment: 'Lat Pulldown Machine'
  },
  {
    id: 'back_002',
    name: 'Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Pull-up Bar'],
    notes: 'Classic bodyweight back exercise. Start from dead hang, pull chin over bar.',
    videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    equipmentImages: {
      'Pull-up Bar': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['back_001', 'back_003'],
    primaryEquipment: 'Pull-up Bar'
  },
  {
    id: 'back_003',
    name: 'Seated cable low row with triangle bar',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Middle Trapezius', 'Rhomboids', 'Latissimus Dorsi'],
    equipment: ['Cable Machine', 'Triangle Bar'],
    notes: 'Seated cable row with triangle handle. Keep chest up, pull to lower ribs.',
    videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74',
    equipmentImages: {
      'Cable Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      'Triangle Bar': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['back_001', 'back_004'],
    primaryEquipment: 'Cable Machine'
  },

  // SHOULDER EXERCISES
  {
    id: 'shoulders_001',
    name: 'Barbell shoulder press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Barbell'],
    notes: 'Standing or seated barbell overhead press. Keep core tight, press straight up.',
    videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI',
    equipmentImages: {
      'Barbell': 'https://images.unsplash.com/photo-1534368420009-621b391ec95c?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['shoulders_002', 'shoulders_003'],
    primaryEquipment: 'Barbell'
  },
  {
    id: 'shoulders_002',
    name: 'Standing lateral raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Lateral raise for shoulder width. Lift arms to shoulder height, control the descent.',
    videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
    equipmentImages: {
      'Dumbbells': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['shoulders_001', 'shoulders_003'],
    primaryEquipment: 'Dumbbells'
  },

  // ARM EXERCISES
  {
    id: 'arms_001',
    name: 'Biceps cable curl',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Cable bicep curl provides constant tension. Keep elbows stationary.',
    videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
    equipmentImages: {
      'Cable Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['arms_002', 'arms_003'],
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'arms_002',
    name: 'Cable Tricep pushdown',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Cable tricep pushdown. Keep elbows at sides, push down with control.',
    videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU',
    equipmentImages: {
      'Cable Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['arms_001', 'arms_003'],
    primaryEquipment: 'Cable Machine'
  },

  // CORE EXERCISES
  {
    id: 'core_001',
    name: 'Crunch',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Basic abdominal crunch. Focus on lifting shoulder blades off ground.',
    videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU',
    equipmentImages: {
      'Bodyweight': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['core_002', 'core_003'],
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_002',
    name: 'Plank',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis', 'Transverse Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Isometric core exercise. Maintain straight line from head to heels.',
    videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
    equipmentImages: {
      'Bodyweight': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['core_001', 'core_003'],
    primaryEquipment: 'Bodyweight'
  },

  // CARDIO EXERCISES
  {
    id: 'cardio_001',
    name: 'TreadMill',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Full Body'],
    equipment: ['Treadmill'],
    notes: 'Running or walking on treadmill. Adjust speed and incline as needed.',
    videoUrl: 'https://www.youtube.com/watch?v=8QdRnV0IwZQ',
    equipmentImages: {
      'Treadmill': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['cardio_002', 'cardio_003'],
    primaryEquipment: 'Treadmill'
  },
  {
    id: 'cardio_002',
    name: 'Stationary bike',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Full Body'],
    equipment: ['Stationary Bike'],
    notes: 'Low impact cardio exercise. Adjust resistance for intensity.',
    videoUrl: 'https://www.youtube.com/watch?v=8QdRnV0IwZQ',
    equipmentImages: {
      'Stationary Bike': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    alternativeExercises: ['cardio_001', 'cardio_003'],
    primaryEquipment: 'Stationary Bike'
  }
];

// Helper functions
export function getExerciseById(id: string): ExerciseData | undefined {
  return exerciseDatabase.find(exercise => exercise.id === id);
}

export function getExercisesByCategory(category: string): ExerciseData[] {
  return exerciseDatabase.filter(exercise => exercise.category === category);
}

export function getExercisesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): ExerciseData[] {
  return exerciseDatabase.filter(exercise => exercise.difficulty === difficulty);
}

export function searchExercises(query: string): ExerciseData[] {
  const lowerQuery = query.toLowerCase();
  return exerciseDatabase.filter(exercise =>
    exercise.name.toLowerCase().includes(lowerQuery) ||
    exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(lowerQuery)) ||
    exercise.equipment.some(eq => eq.toLowerCase().includes(lowerQuery)) ||
    exercise.notes.toLowerCase().includes(lowerQuery)
  );
}

export const completeExerciseDatabase = exerciseDatabase;
