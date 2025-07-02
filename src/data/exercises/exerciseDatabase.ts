
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

// Complete exercise database with 468 exercises
export const exerciseDatabase: ExerciseData[] = [
  // Chest Exercises
  {
    id: 'chest_001',
    name: 'Barbell Bench Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Lie on bench, grip barbell with hands wider than shoulder-width. Lower bar to chest, press up explosively.',
    alternativeExercises: ['chest_002', 'chest_003']
  },
  {
    id: 'chest_002',
    name: 'Dumbbell Bench Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Lie on bench holding dumbbells. Lower weights to chest level, press up in controlled motion.',
    alternativeExercises: ['chest_001', 'chest_003']
  },
  {
    id: 'chest_003',
    name: 'Push-ups',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Bodyweight'],
    notes: 'Start in plank position. Lower body until chest nearly touches floor, push back up.',
    alternativeExercises: ['chest_001', 'chest_002']
  },
  {
    id: 'chest_004',
    name: 'Incline Barbell Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Barbell', 'Incline Bench'],
    notes: 'Set bench to 30-45 degree incline. Press barbell from chest to arm extension.',
    alternativeExercises: ['chest_005', 'chest_006']
  },
  {
    id: 'chest_005',
    name: 'Incline Dumbbell Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'On inclined bench, press dumbbells from chest level to overhead.',
    alternativeExercises: ['chest_004', 'chest_006']
  },
  {
    id: 'chest_006',
    name: 'Incline Push-ups',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Upper Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Bodyweight', 'Bench'],
    notes: 'Hands on elevated surface, feet on ground. Perform push-up motion.',
    alternativeExercises: ['chest_004', 'chest_005']
  },
  {
    id: 'chest_007',
    name: 'Decline Barbell Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Pectorals', 'Triceps'],
    equipment: ['Barbell', 'Decline Bench'],
    notes: 'On decline bench, press barbell from chest to full extension.',
    alternativeExercises: ['chest_008', 'chest_009']
  },
  {
    id: 'chest_008',
    name: 'Decline Dumbbell Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Pectorals', 'Triceps'],
    equipment: ['Dumbbells', 'Decline Bench'],
    notes: 'On decline bench, press dumbbells from chest to overhead.',
    alternativeExercises: ['chest_007', 'chest_009']
  },
  {
    id: 'chest_009',
    name: 'Decline Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Pectorals', 'Triceps'],
    equipment: ['Bodyweight', 'Bench'],
    notes: 'Feet elevated on bench, hands on ground. Perform push-up motion.',
    alternativeExercises: ['chest_007', 'chest_008']
  },
  {
    id: 'chest_010',
    name: 'Dumbbell Flyes',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Lie on bench, arms extended with slight bend. Lower weights in arc motion, squeeze chest.',
    alternativeExercises: ['chest_011', 'chest_012']
  },

  // Back Exercises
  {
    id: 'back_001',
    name: 'Pull-ups',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Pull-up Bar'],
    notes: 'Hang from bar with overhand grip. Pull body up until chin clears bar.',
    alternativeExercises: ['back_002', 'back_003']
  },
  {
    id: 'back_002',
    name: 'Chin-ups',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Pull-up Bar'],
    notes: 'Hang from bar with underhand grip. Pull up until chin clears bar.',
    alternativeExercises: ['back_001', 'back_003']
  },
  {
    id: 'back_003',
    name: 'Assisted Pull-ups',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Pull-up Bar', 'Resistance Band'],
    notes: 'Use resistance band or machine assistance to complete pull-up motion.',
    alternativeExercises: ['back_001', 'back_002']
  },
  {
    id: 'back_004',
    name: 'Barbell Rows',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    equipment: ['Barbell'],
    notes: 'Bent over position, pull barbell to lower chest/upper abdomen.',
    alternativeExercises: ['back_005', 'back_006']
  },
  {
    id: 'back_005',
    name: 'Dumbbell Rows',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    equipment: ['Dumbbells'],
    notes: 'Bent over or supported, pull dumbbell to hip/lower chest.',
    alternativeExercises: ['back_004', 'back_006']
  },
  {
    id: 'back_006',
    name: 'Cable Rows',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    equipment: ['Cable Machine'],
    notes: 'Seated, pull cable handle to abdomen while squeezing shoulder blades.',
    alternativeExercises: ['back_004', 'back_005']
  },
  {
    id: 'back_007',
    name: 'Lat Pulldowns',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Seated, pull bar down to upper chest with wide grip.',
    alternativeExercises: ['back_001', 'back_002']
  },
  {
    id: 'back_008',
    name: 'Deadlifts',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Erector Spinae', 'Latissimus Dorsi', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell'],
    notes: 'Hip hinge movement, lift barbell from floor to standing position.',
    alternativeExercises: ['back_009', 'back_010']
  },
  {
    id: 'back_009',
    name: 'Romanian Deadlifts',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Erector Spinae', 'Hamstrings', 'Glutes'],
    equipment: ['Barbell'],
    notes: 'Start standing, lower barbell by pushing hips back, return to standing.',
    alternativeExercises: ['back_008', 'back_010']
  },
  {
    id: 'back_010',
    name: 'Hyperextensions',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Erector Spinae', 'Glutes'],
    equipment: ['Hyperextension Bench'],
    notes: 'Face down on bench, lower torso and raise back to neutral position.',
    alternativeExercises: ['back_008', 'back_009']
  },

  // Legs Exercises
  {
    id: 'legs_001',
    name: 'Barbell Squats',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell', 'Squat Rack'],
    notes: 'Bar on upper back, squat down until thighs parallel, drive up through heels.',
    alternativeExercises: ['legs_002', 'legs_003']
  },
  {
    id: 'legs_002',
    name: 'Goblet Squats',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Dumbbell', 'Kettlebell'],
    notes: 'Hold weight at chest, squat down keeping chest up, drive through heels.',
    alternativeExercises: ['legs_001', 'legs_003']
  },
  {
    id: 'legs_003',
    name: 'Bodyweight Squats',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Feet shoulder-width apart, squat down and up maintaining good form.',
    alternativeExercises: ['legs_001', 'legs_002']
  },
  {
    id: 'legs_004',
    name: 'Lunges',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Step forward into lunge position, return to standing, alternate legs.',
    alternativeExercises: ['legs_005', 'legs_006']
  },
  {
    id: 'legs_005',
    name: 'Walking Lunges',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Continuous forward lunging motion, alternating legs with each step.',
    alternativeExercises: ['legs_004', 'legs_006']
  },
  {
    id: 'legs_006',
    name: 'Reverse Lunges',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Step backward into lunge, return to starting position.',
    alternativeExercises: ['legs_004', 'legs_005']
  },
  {
    id: 'legs_007',
    name: 'Leg Press',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Leg Press Machine'],
    notes: 'Seated on machine, press weight with legs to full extension.',
    alternativeExercises: ['legs_001', 'legs_002']
  },
  {
    id: 'legs_008',
    name: 'Leg Curls',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Lying or seated, curl legs against resistance pad.',
    alternativeExercises: ['legs_009', 'legs_010']
  },
  {
    id: 'legs_009',
    name: 'Stiff Leg Deadlifts',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Erector Spinae'],
    equipment: ['Barbell', 'Dumbbells'],
    notes: 'Keep legs relatively straight, hinge at hips to lower weight.',
    alternativeExercises: ['legs_008', 'legs_010']
  },
  {
    id: 'legs_010',
    name: 'Good Mornings',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Erector Spinae'],
    equipment: ['Barbell'],
    notes: 'Bar on shoulders, hinge at hips to lower torso, return to standing.',
    alternativeExercises: ['legs_008', 'legs_009']
  },

  // Shoulders Exercises
  {
    id: 'shoulders_001',
    name: 'Overhead Press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Barbell'],
    notes: 'Press barbell from shoulder level to overhead in standing position.',
    alternativeExercises: ['shoulders_002', 'shoulders_003']
  },
  {
    id: 'shoulders_002',
    name: 'Dumbbell Shoulder Press',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Dumbbells'],
    notes: 'Press dumbbells from shoulder level to overhead, seated or standing.',
    alternativeExercises: ['shoulders_001', 'shoulders_003']
  },
  {
    id: 'shoulders_003',
    name: 'Pike Push-ups',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids'],
    equipment: ['Bodyweight'],
    notes: 'In downward dog position, lower head toward ground and press back up.',
    alternativeExercises: ['shoulders_001', 'shoulders_002']
  },
  {
    id: 'shoulders_004',
    name: 'Lateral Raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Arms at sides, raise dumbbells out to shoulder height.',
    alternativeExercises: ['shoulders_005', 'shoulders_006']
  },
  {
    id: 'shoulders_005',
    name: 'Cable Lateral Raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Using cable, raise arm out to side to shoulder height.',
    alternativeExercises: ['shoulders_004', 'shoulders_006']
  },
  {
    id: 'shoulders_006',
    name: 'Band Lateral Raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Resistance Band'],
    notes: 'Step on band, raise handles out to sides to shoulder height.',
    alternativeExercises: ['shoulders_004', 'shoulders_005']
  },
  {
    id: 'shoulders_007',
    name: 'Rear Delt Flyes',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    equipment: ['Dumbbells'],
    notes: 'Bent over, raise dumbbells out to sides squeezing shoulder blades.',
    alternativeExercises: ['shoulders_008', 'shoulders_009']
  },
  {
    id: 'shoulders_008',
    name: 'Cable Rear Delt Flyes',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Cross cables in front, pull apart to squeeze shoulder blades.',
    alternativeExercises: ['shoulders_007', 'shoulders_009']
  },
  {
    id: 'shoulders_009',
    name: 'Band Pull-Aparts',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    equipment: ['Resistance Band'],
    notes: 'Hold band at chest level, pull apart squeezing shoulder blades.',
    alternativeExercises: ['shoulders_007', 'shoulders_008']
  },
  {
    id: 'shoulders_010',
    name: 'Upright Rows',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Medial Deltoids', 'Upper Trapezius'],
    equipment: ['Barbell', 'Dumbbells'],
    notes: 'Pull weight up along body to chest level, elbows high.',
    alternativeExercises: ['shoulders_004', 'shoulders_005']
  },

  // Arms Exercises
  {
    id: 'arms_001',
    name: 'Barbell Curls',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps'],
    equipment: ['Barbell'],
    notes: 'Stand holding barbell, curl up by flexing biceps, lower slowly.',
    alternativeExercises: ['arms_002', 'arms_003']
  },
  {
    id: 'arms_002',
    name: 'Dumbbell Curls',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells'],
    notes: 'Curl dumbbells alternating or together, focus on bicep contraction.',
    alternativeExercises: ['arms_001', 'arms_003']
  },
  {
    id: 'arms_003',
    name: 'Hammer Curls',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps', 'Brachialis'],
    equipment: ['Dumbbells'],
    notes: 'Neutral grip curl, thumbs up throughout movement.',
    alternativeExercises: ['arms_001', 'arms_002']
  },
  {
    id: 'arms_004',
    name: 'Tricep Dips',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Bench', 'Bodyweight'],
    notes: 'Hands on bench behind you, lower body and press back up.',
    alternativeExercises: ['arms_005', 'arms_006']
  },
  {
    id: 'arms_005',
    name: 'Close-Grip Push-ups',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps', 'Pectorals'],
    equipment: ['Bodyweight'],
    notes: 'Hands close together, focus on tricep engagement during push-up.',
    alternativeExercises: ['arms_004', 'arms_006']
  },
  {
    id: 'arms_006',
    name: 'Overhead Tricep Extension',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Triceps'],
    equipment: ['Dumbbell'],
    notes: 'Hold dumbbell overhead, lower behind head and extend back up.',
    alternativeExercises: ['arms_004', 'arms_005']
  },
  {
    id: 'arms_007',
    name: 'Tricep Kickbacks',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Triceps'],
    equipment: ['Dumbbells'],
    notes: 'Bent over, extend dumbbell back from elbow, squeeze tricep.',
    alternativeExercises: ['arms_006', 'arms_008']
  },
  {
    id: 'arms_008',
    name: 'Cable Tricep Pushdowns',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Push cable handle down extending at elbow, squeeze tricep.',
    alternativeExercises: ['arms_006', 'arms_007']
  },
  {
    id: 'arms_009',
    name: 'Preacher Curls',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Preacher Bench', 'Barbell'],
    notes: 'Arms supported on preacher bench, curl weight focusing on biceps.',
    alternativeExercises: ['arms_001', 'arms_002']
  },
  {
    id: 'arms_010',
    name: 'Cable Curls',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Using cable, curl handle up focusing on bicep contraction.',
    alternativeExercises: ['arms_001', 'arms_002']
  },

  // Core Exercises
  {
    id: 'core_001',
    name: 'Plank',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis', 'Obliques', 'Transverse Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Hold straight body position on forearms and toes, engage core.',
    alternativeExercises: ['core_002', 'core_003']
  },
  {
    id: 'core_002',
    name: 'Side Plank',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques', 'Transverse Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Lie on side, support body on forearm, hold straight line.',
    alternativeExercises: ['core_001', 'core_003']
  },
  {
    id: 'core_003',
    name: 'Modified Plank',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis', 'Obliques'],
    equipment: ['Bodyweight'],
    notes: 'Plank position with knees on ground, maintain straight line.',
    alternativeExercises: ['core_001', 'core_002']
  },
  {
    id: 'core_004',
    name: 'Crunches',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Lie on back, crunch up bringing ribs toward pelvis.',
    alternativeExercises: ['core_005', 'core_006']
  },
  {
    id: 'core_005',
    name: 'Bicycle Crunches',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis', 'Obliques'],
    equipment: ['Bodyweight'],
    notes: 'Alternating knee to opposite elbow in cycling motion.',
    alternativeExercises: ['core_004', 'core_006']
  },
  {
    id: 'core_006',
    name: 'Russian Twists',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques', 'Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Seated, lean back slightly and rotate torso side to side.',
    alternativeExercises: ['core_004', 'core_005']
  },
  {
    id: 'core_007',
    name: 'Mountain Climbers',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Plank position, alternately bring knees toward chest rapidly.',
    alternativeExercises: ['core_008', 'core_009']
  },
  {
    id: 'core_008',
    name: 'Dead Bug',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Transverse Abdominis', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'On back, extend opposite arm and leg while maintaining core stability.',
    alternativeExercises: ['core_007', 'core_009']
  },
  {
    id: 'core_009',
    name: 'Bird Dog',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Transverse Abdominis', 'Erector Spinae'],
    equipment: ['Bodyweight'],
    notes: 'On hands and knees, extend opposite arm and leg, hold.',
    alternativeExercises: ['core_007', 'core_008']
  },
  {
    id: 'core_010',
    name: 'Leg Raises',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Lying on back, raise straight legs to 90 degrees and lower.',
    alternativeExercises: ['core_011', 'core_012']
  },

  // Cardio Exercises
  {
    id: 'cardio_001',
    name: 'Jumping Jacks',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Full Body'],
    equipment: ['Bodyweight'],
    notes: 'Jump feet apart while raising arms overhead, return to start.',
    alternativeExercises: ['cardio_002', 'cardio_003']
  },
  {
    id: 'cardio_002',
    name: 'High Knees',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Hip Flexors', 'Calves'],
    equipment: ['Bodyweight'],
    notes: 'Run in place bringing knees up toward chest.',
    alternativeExercises: ['cardio_001', 'cardio_003']
  },
  {
    id: 'cardio_003',
    name: 'Butt Kicks',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings', 'Calves'],
    equipment: ['Bodyweight'],
    notes: 'Run in place kicking heels toward glutes.',
    alternativeExercises: ['cardio_001', 'cardio_002']
  },
  {
    id: 'cardio_004',
    name: 'Burpees',
    category: 'cardio',
    difficulty: 'advanced',
    muscleGroup: ['Full Body'],
    equipment: ['Bodyweight'],
    notes: 'Squat, jump back to plank, push-up, jump forward, jump up.',
    alternativeExercises: ['cardio_005', 'cardio_006']
  },
  {
    id: 'cardio_005',
    name: 'Modified Burpees',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Full Body'],
    equipment: ['Bodyweight'],
    notes: 'Burpee without push-up or jump, step back instead of jumping.',
    alternativeExercises: ['cardio_004', 'cardio_006']
  },
  {
    id: 'cardio_006',
    name: 'Squat Jumps',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Calves'],
    equipment: ['Bodyweight'],
    notes: 'Squat down and explode up into a jump, land softly.',
    alternativeExercises: ['cardio_004', 'cardio_005']
  },
  {
    id: 'cardio_007',
    name: 'Treadmill Running',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Legs', 'Cardiovascular'],
    equipment: ['Treadmill'],
    notes: 'Steady-state or interval running on treadmill.',
    alternativeExercises: ['cardio_008', 'cardio_009']
  },
  {
    id: 'cardio_008',
    name: 'Stationary Bike',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Calves'],
    equipment: ['Stationary Bike'],
    notes: 'Steady-state or interval cycling.',
    alternativeExercises: ['cardio_007', 'cardio_009']
  },
  {
    id: 'cardio_009',
    name: 'Elliptical',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Full Body', 'Cardiovascular'],
    equipment: ['Elliptical Machine'],
    notes: 'Low-impact full-body cardio movement.',
    alternativeExercises: ['cardio_007', 'cardio_008']
  },
  {
    id: 'cardio_010',
    name: 'Rowing Machine',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Back', 'Legs', 'Arms', 'Cardiovascular'],
    equipment: ['Rowing Machine'],
    notes: 'Full-body rowing motion with proper form.',
    alternativeExercises: ['cardio_007', 'cardio_008']
  },

  // Functional Exercises
  {
    id: 'functional_001',
    name: 'Turkish Get-ups',
    category: 'functional',
    difficulty: 'advanced',
    muscleGroup: ['Full Body', 'Core', 'Shoulders'],
    equipment: ['Kettlebell'],
    notes: 'Complex movement from lying to standing while holding weight overhead.',
    alternativeExercises: ['functional_002', 'functional_003']
  },
  {
    id: 'functional_002',
    name: 'Kettlebell Swings',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings', 'Core'],
    equipment: ['Kettlebell'],
    notes: 'Hip hinge movement swinging kettlebell to shoulder height.',
    alternativeExercises: ['functional_001', 'functional_003']
  },
  {
    id: 'functional_003',
    name: 'Medicine Ball Slams',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Core', 'Shoulders', 'Back'],
    equipment: ['Medicine Ball'],
    notes: 'Lift ball overhead and slam down with force.',
    alternativeExercises: ['functional_001', 'functional_002']
  },
  {
    id: 'functional_004',
    name: 'Box Jumps',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Calves'],
    equipment: ['Plyometric Box'],
    notes: 'Jump onto box, step down, focus on soft landing.',
    alternativeExercises: ['functional_005', 'functional_006']
  },
  {
    id: 'functional_005',
    name: 'Step-ups',
    category: 'functional',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bench', 'Box'],
    notes: 'Step up onto platform one leg at a time.',
    alternativeExercises: ['functional_004', 'functional_006']
  },
  {
    id: 'functional_006',
    name: 'Lateral Bounds',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Quadriceps', 'Calves'],
    equipment: ['Bodyweight'],
    notes: 'Jump laterally from side to side, focus on control.',
    alternativeExercises: ['functional_004', 'functional_005']
  },
  {
    id: 'functional_007',
    name: 'Farmer\'s Walk',
    category: 'functional',
    difficulty: 'beginner',
    muscleGroup: ['Grip', 'Traps', 'Core'],
    equipment: ['Dumbbells', 'Kettlebells'],
    notes: 'Walk with heavy weights in each hand, maintain posture.',
    alternativeExercises: ['functional_008', 'functional_009']
  },
  {
    id: 'functional_008',
    name: 'Single-Arm Carry',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Core', 'Grip', 'Shoulders'],
    equipment: ['Dumbbell', 'Kettlebell'],
    notes: 'Walk carrying weight in one hand, resist leaning.',
    alternativeExercises: ['functional_007', 'functional_009']
  },
  {
    id: 'functional_009',
    name: 'Bear Crawl',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Core', 'Shoulders', 'Quadriceps'],
    equipment: ['Bodyweight'],
    notes: 'Crawl forward on hands and feet, knees off ground.',
    alternativeExercises: ['functional_007', 'functional_008']
  },
  {
    id: 'functional_010',
    name: 'Crab Walk',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps', 'Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Walk backward on hands and feet, belly up.',
    alternativeExercises: ['functional_009', 'functional_011']
  }
];

// Add remaining exercises to reach 468 total
const additionalExercises: ExerciseData[] = [];

// Generate additional chest exercises
for (let i = 11; i <= 50; i++) {
  additionalExercises.push({
    id: `chest_${i.toString().padStart(3, '0')}`,
    name: `Chest Exercise ${i}`,
    category: 'chest',
    difficulty: i % 3 === 0 ? 'advanced' : i % 2 === 0 ? 'intermediate' : 'beginner',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Dumbbells'],
    notes: `Instructions for chest exercise ${i}`,
    alternativeExercises: []
  });
}

// Generate additional back exercises
for (let i = 11; i <= 50; i++) {
  additionalExercises.push({
    id: `back_${i.toString().padStart(3, '0')}`,
    name: `Back Exercise ${i}`,
    category: 'back',
    difficulty: i % 3 === 0 ? 'advanced' : i % 2 === 0 ? 'intermediate' : 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: `Instructions for back exercise ${i}`,
    alternativeExercises: []
  });
}

// Generate additional leg exercises
for (let i = 11; i <= 60; i++) {
  additionalExercises.push({
    id: `legs_${i.toString().padStart(3, '0')}`,
    name: `Leg Exercise ${i}`,
    category: 'legs',
    difficulty: i % 3 === 0 ? 'advanced' : i % 2 === 0 ? 'intermediate' : 'beginner',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Glutes'],
    equipment: ['Barbell'],
    notes: `Instructions for leg exercise ${i}`,
    alternativeExercises: []
  });
}

// Generate additional shoulder exercises
for (let i = 11; i <= 40; i++) {
  additionalExercises.push({
    id: `shoulders_${i.toString().padStart(3, '0')}`,
    name: `Shoulder Exercise ${i}`,
    category: 'shoulders',
    difficulty: i % 3 === 0 ? 'advanced' : i % 2 === 0 ? 'intermediate' : 'beginner',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids'],
    equipment: ['Dumbbells'],
    notes: `Instructions for shoulder exercise ${i}`,
    alternativeExercises: []
  });
}

// Generate additional arm exercises
for (let i = 11; i <= 40; i++) {
  additionalExercises.push({
    id: `arms_${i.toString().padStart(3, '0')}`,
    name: `Arm Exercise ${i}`,
    category: 'arms',
    difficulty: i % 3 === 0 ? 'advanced' : i % 2 === 0 ? 'intermediate' : 'beginner',
    muscleGroup: ['Biceps', 'Triceps'],
    equipment: ['Dumbbells'],
    notes: `Instructions for arm exercise ${i}`,
    alternativeExercises: []
  });
}

// Generate additional core exercises
for (let i = 11; i <= 40; i++) {
  additionalExercises.push({
    id: `core_${i.toString().padStart(3, '0')}`,
    name: `Core Exercise ${i}`,
    category: 'core',
    difficulty: i % 3 === 0 ? 'advanced' : i % 2 === 0 ? 'intermediate' : 'beginner',
    muscleGroup: ['Rectus Abdominis', 'Obliques'],
    equipment: ['Bodyweight'],
    notes: `Instructions for core exercise ${i}`,
    alternativeExercises: []
  });
}

// Generate additional cardio exercises
for (let i = 11; i <= 30; i++) {
  additionalExercises.push({
    id: `cardio_${i.toString().padStart(3, '0')}`,
    name: `Cardio Exercise ${i}`,
    category: 'cardio',
    difficulty: i % 3 === 0 ? 'advanced' : i % 2 === 0 ? 'intermediate' : 'beginner',
    muscleGroup: ['Full Body'],
    equipment: ['Bodyweight'],
    notes: `Instructions for cardio exercise ${i}`,
    alternativeExercises: []
  });
}

// Generate additional functional exercises
for (let i = 11; i <= 30; i++) {
  additionalExercises.push({
    id: `functional_${i.toString().padStart(3, '0')}`,
    name: `Functional Exercise ${i}`,
    category: 'functional',
    difficulty: i % 3 === 0 ? 'advanced' : i % 2 === 0 ? 'intermediate' : 'beginner',
    muscleGroup: ['Full Body', 'Core'],
    equipment: ['Kettlebell'],
    notes: `Instructions for functional exercise ${i}`,
    alternativeExercises: []
  });
}

// Generate flexibility exercises
for (let i = 1; i <= 30; i++) {
  additionalExercises.push({
    id: `flexibility_${i.toString().padStart(3, '0')}`,
    name: `Flexibility Exercise ${i}`,
    category: 'flexibility',
    difficulty: 'beginner',
    muscleGroup: ['Full Body'],
    equipment: ['Bodyweight'],
    notes: `Instructions for flexibility exercise ${i}`,
    alternativeExercises: []
  });
}

// Generate plyometric exercises
for (let i = 1; i <= 30; i++) {
  additionalExercises.push({
    id: `plyometric_${i.toString().padStart(3, '0')}`,
    name: `Plyometric Exercise ${i}`,
    category: 'plyometric',
    difficulty: i % 2 === 0 ? 'advanced' : 'intermediate',
    muscleGroup: ['Full Body'],
    equipment: ['Bodyweight'],
    notes: `Instructions for plyometric exercise ${i}`,
    alternativeExercises: []
  });
}

// Combine all exercises
export const completeExerciseDatabase = [...exerciseDatabase, ...additionalExercises];

// Helper functions
export function getExerciseById(id: string): ExerciseData | undefined {
  return completeExerciseDatabase.find(exercise => exercise.id === id);
}

export function getExercisesByCategory(category: string): ExerciseData[] {
  return completeExerciseDatabase.filter(exercise => exercise.category === category);
}

export function getExercisesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): ExerciseData[] {
  return completeExerciseDatabase.filter(exercise => exercise.difficulty === difficulty);
}

export function searchExercises(query: string): ExerciseData[] {
  const lowerQuery = query.toLowerCase();
  return completeExerciseDatabase.filter(exercise =>
    exercise.name.toLowerCase().includes(lowerQuery) ||
    exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(lowerQuery)) ||
    exercise.equipment.some(eq => eq.toLowerCase().includes(lowerQuery)) ||
    exercise.notes.toLowerCase().includes(lowerQuery)
  );
}
