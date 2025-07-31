import { ExerciseData } from './types';

// Mapping function to convert exercise names to IDs
const exerciseNameToId = (name: string): string => {
  // Convert exercise names to kebab-case IDs
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/\//g, '-')
    .replace(/,/g, '');
};

// Updated newExercises with proper alternative IDs
export const updatedNewExercises: ExerciseData[] = [
  // LEGS CATEGORY
  {
    id: 'walking-lunges',
    name: 'Walking Lunges',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Step forward into lunge, alternate legs walking forward',
    alternativeExercises: ["stationary-lunges", "reverse-lunges", "lateral-lunges"],
    isDeletable: true
  },
  {
    id: 'stationary-lunges',
    name: 'Stationary Lunges',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Step back into lunge position, return to start, repeat on same leg',
    alternativeExercises: ["walking-lunges", "reverse-lunges", "bulgarian-split-squats"],
    isDeletable: true
  },
  {
    id: 'bodyweight-squats',
    name: 'Bodyweight Squats',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Basic squat movement with no added weight',
    alternativeExercises: ["goblet-squats", "air-squats", "wall-sits", "chair-squats"],
    isDeletable: true
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Bodyweight'],
    notes: 'Classic bodyweight pushing exercise',
    alternativeExercises: ["knee-push-ups", "incline-push-ups", "wall-push-ups", "diamond-push-ups"],
    isDeletable: true
  },
  {
    id: 'knee-push-ups',
    name: 'Knee Push-ups',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Bodyweight'],
    notes: 'Modified push-ups performed on knees',
    alternativeExercises: ["push-ups", "incline-push-ups", "wall-push-ups", "assisted-push-ups"],
    isDeletable: true
  },
  {
    id: 'incline-push-ups',
    name: 'Incline Push-ups',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Bench', 'Platform'],
    notes: 'Push-ups with hands elevated on a platform',
    alternativeExercises: ["push-ups", "knee-push-ups", "wall-push-ups", "decline-push-ups"],
    isDeletable: true
  },
  {
    id: 'wall-push-ups',
    name: 'Wall Push-ups',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Wall'],
    notes: 'Standing push-ups against a wall',
    alternativeExercises: ["incline-push-ups", "knee-push-ups", "chest-press-machine", "assisted-push-ups"],
    isDeletable: true
  },
  {
    id: 'diamond-push-ups',
    name: 'Diamond Push-ups',
    category: 'chest',
    difficulty: 'advanced',
    muscleGroup: ['Triceps', 'Pectorals', 'Anterior Deltoids'],
    equipment: ['Bodyweight'],
    notes: 'Push-ups with hands forming diamond shape',
    alternativeExercises: ["close-grip-push-ups", "tricep-push-ups", "push-ups", "tricep-dips"],
    isDeletable: true
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Pull-up Bar'],
    notes: 'Overhand grip pull-ups',
    alternativeExercises: ["assisted-pull-ups", "lat-pulldown", "negative-pull-ups", "chin-ups"],
    isDeletable: true
  },
  {
    id: 'assisted-pull-ups',
    name: 'Assisted Pull-ups',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Assisted Pull-up Machine', 'Resistance Band'],
    notes: 'Pull-ups with assistance to reduce body weight',
    alternativeExercises: ["pull-ups", "lat-pulldown", "negative-pull-ups", "band-assisted-pull-ups"],
    isDeletable: true
  },
  {
    id: 'negative-pull-ups',
    name: 'Negative Pull-ups',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Pull-up Bar', 'Box'],
    notes: 'Focus on the lowering phase of pull-up movement',
    alternativeExercises: ["assisted-pull-ups", "pull-ups", "lat-pulldown", "eccentric-pull-ups"],
    isDeletable: true
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps', 'Anterior Deltoids', 'Pectorals'],
    equipment: ['Dip Station', 'Chair', 'Bench'],
    notes: 'Bodyweight dipping exercise for triceps',
    alternativeExercises: ["assisted-dips", "bench-dips", "diamond-push-ups", "cable-tricep-pushdown"],
    isDeletable: true
  },
  {
    id: 'assisted-dips',
    name: 'Assisted Dips',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Triceps', 'Anterior Deltoids', 'Pectorals'],
    equipment: ['Assisted Dip Machine', 'Resistance Band'],
    notes: 'Dips with assistance to reduce body weight',
    alternativeExercises: ["tricep-dips", "bench-dips", "tricep-push-ups", "cable-tricep-pushdown"],
    isDeletable: true
  },
  {
    id: 'bench-dips',
    name: 'Bench Dips',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Triceps', 'Anterior Deltoids'],
    equipment: ['Bench', 'Chair'],
    notes: 'Dips performed with hands on bench behind body',
    alternativeExercises: ["tricep-dips", "assisted-dips", "tricep-push-ups", "reverse-dips"],
    isDeletable: true
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Core', 'Hip Flexors', 'Shoulders'],
    equipment: ['Bodyweight'],
    notes: 'Dynamic core exercise alternating knee drives',
    alternativeExercises: ["high-knees", "plank-jacks", "running-in-place", "burpees"],
    isDeletable: true
  },
  {
    id: 'plank-jacks',
    name: 'Plank Jacks',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Core', 'Shoulders', 'Hip Abductors'],
    equipment: ['Bodyweight'],
    notes: 'Jumping jack motion while in plank position',
    alternativeExercises: ["mountain-climbers", "plank-up-downs", "jumping-jacks", "plank-hold"],
    isDeletable: true
  },
  {
    id: 'plank-up-downs',
    name: 'Plank Up-Downs',
    category: 'core',
    difficulty: 'advanced',
    muscleGroup: ['Core', 'Triceps', 'Shoulders'],
    equipment: ['Bodyweight'],
    notes: 'Transition between plank and forearm plank',
    alternativeExercises: ["plank-hold", "push-ups", "mountain-climbers", "plank-jacks"],
    isDeletable: true
  },
  {
    id: 'side-plank',
    name: 'Side Plank',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques', 'Core', 'Shoulders'],
    equipment: ['Bodyweight'],
    notes: 'Side-lying plank for oblique strength',
    alternativeExercises: ["side-plank-knee", "russian-twists", "side-crunches", "pallof-press"],
    isDeletable: true
  },
  {
    id: 'side-plank-knee',
    name: 'Side Plank (Knee)',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Obliques', 'Core', 'Shoulders'],
    equipment: ['Bodyweight'],
    notes: 'Modified side plank performed on knee',
    alternativeExercises: ["side-plank", "side-crunches", "russian-twists", "modified-side-plank"],
    isDeletable: true
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Core', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Lying core exercise alternating arm and leg movements',
    alternativeExercises: ["bird-dog", "hollow-body-hold", "knee-to-chest", "supine-marching"],
    isDeletable: true
  },
  {
    id: 'bird-dog',
    name: 'Bird Dog',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Core', 'Glutes', 'Erector Spinae'],
    equipment: ['Bodyweight'],
    notes: 'Quadruped position extending opposite arm and leg',
    alternativeExercises: ["dead-bug", "quadruped-hold", "superman", "glute-bridge"],
    isDeletable: true
  },
  {
    id: 'superman',
    name: 'Superman',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Erector Spinae', 'Glutes', 'Posterior Deltoids'],
    equipment: ['Bodyweight'],
    notes: 'Prone back extension exercise',
    alternativeExercises: ["bird-dog", "back-extensions", "reverse-fly", "prone-y-raise"],
    isDeletable: true
  },
  {
    id: 'hollow-body-hold',
    name: 'Hollow Body Hold',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Supine core hold creating hollow body position',
    alternativeExercises: ["plank-hold", "dead-bug", "v-ups", "boat-pose"],
    isDeletable: true
  },
  {
    id: 'v-ups',
    name: 'V-ups',
    category: 'core',
    difficulty: 'advanced',
    muscleGroup: ['Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Simultaneous lifting of torso and legs forming V shape',
    alternativeExercises: ["hollow-body-hold", "sit-ups", "knee-tucks", "russian-twists"],
    isDeletable: true
  },
  {
    id: 'sit-ups',
    name: 'Sit-ups',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Full range of motion abdominal exercise',
    alternativeExercises: ["crunches", "v-ups", "hollow-body-hold", "dead-bug"],
    isDeletable: true
  },
  {
    id: 'crunches',
    name: 'Crunches',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Partial range abdominal flexion exercise',
    alternativeExercises: ["sit-ups", "bicycle-crunch", "reverse-crunches", "plank-hold"],
    isDeletable: true
  },
  {
    id: 'reverse-crunches',
    name: 'Reverse Crunches',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Abs', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Bring knees toward chest while lying on back',
    alternativeExercises: ["knee-tucks", "leg-raises", "dead-bug", "hollow-body-hold"],
    isDeletable: true
  },
  {
    id: 'leg-raises',
    name: 'Leg Raises',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Abs', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Straight leg raises while lying on back',
    alternativeExercises: ["reverse-crunches", "knee-tucks", "hanging-knee-raises", "flutter-kicks"],
    isDeletable: true
  },
  {
    id: 'hanging-knee-raises',
    name: 'Hanging Knee Raises',
    category: 'core',
    difficulty: 'advanced',
    muscleGroup: ['Lower Abs', 'Hip Flexors', 'Grip Strength'],
    equipment: ['Pull-up Bar'],
    notes: 'Hanging from bar, bring knees toward chest',
    alternativeExercises: ["hanging-leg-raises", "knee-tucks", "reverse-crunches", "captain-chair-knee-raises"],
    isDeletable: true
  },
  {
    id: 'hanging-leg-raises',
    name: 'Hanging Leg Raises',
    category: 'core',
    difficulty: 'advanced',
    muscleGroup: ['Lower Abs', 'Hip Flexors', 'Grip Strength'],
    equipment: ['Pull-up Bar'],
    notes: 'Hanging from bar, raise straight legs',
    alternativeExercises: ["hanging-knee-raises", "leg-raises", "toes-to-bar", "l-sits"],
    isDeletable: true
  },
  {
    id: 'wood-chops',
    name: 'Wood Chops',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques', 'Core', 'Shoulders'],
    equipment: ['Medicine Ball', 'Cable Machine'],
    notes: 'Rotational movement from high to low position',
    alternativeExercises: ["russian-twists", "medicine-ball-slams", "cable-rotations", "pallof-press"],
    isDeletable: true
  },
  {
    id: 'pallof-press',
    name: 'Pallof Press',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Core', 'Anti-Rotation'],
    equipment: ['Cable Machine', 'Resistance Band'],
    notes: 'Anti-rotation core exercise holding cable at chest',
    alternativeExercises: ["wood-chops", "side-plank", "dead-bug", "single-arm-plank"],
    isDeletable: true
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Full Body', 'Cardiovascular'],
    equipment: ['Bodyweight'],
    notes: 'Full body jumping exercise for cardio',
    alternativeExercises: ["star-jumps", "half-jacks", "step-touch", "arm-circles"],
    isDeletable: true
  },
  {
    id: 'high-knees',
    name: 'High Knees',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Hip Flexors', 'Calves', 'Cardiovascular'],
    equipment: ['Bodyweight'],
    notes: 'Running in place bringing knees to waist level',
    alternativeExercises: ["mountain-climbers", "butt-kickers", "running-in-place", "marching"],
    isDeletable: true
  },
  {
    id: 'butt-kickers',
    name: 'Butt Kickers',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings', 'Calves', 'Cardiovascular'],
    equipment: ['Bodyweight'],
    notes: 'Running in place kicking heels to glutes',
    alternativeExercises: ["high-knees", "running-in-place", "leg-swings", "marching"],
    isDeletable: true
  },
  {
    id: 'bear-crawls',
    name: 'Bear Crawls',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Full Body', 'Core', 'Shoulders'],
    equipment: ['Bodyweight'],
    notes: 'Crawling on hands and feet with knees off ground',
    alternativeExercises: ["crab-walks", "army-crawl", "lizard-crawl", "quadruped-crawl"],
    isDeletable: true
  },
  {
    id: 'crab-walks',
    name: 'Crab Walks',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps', 'Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Walking in crab position on hands and feet',
    alternativeExercises: ["bear-crawls", "reverse-crab-walk", "crab-kicks", "table-top-holds"],
    isDeletable: true
  },
  {
    id: 'inchworms',
    name: 'Inchworms',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Core', 'Shoulders', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Walk hands out to plank, then walk feet to hands',
    alternativeExercises: ["walk-outs", "bear-crawls", "downward-dog-walk", "pike-walks"],
    isDeletable: true
  },
  {
    id: 'glute-bridge-march',
    name: 'Glute Bridge March',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Hold glute bridge while alternating knee lifts',
    alternativeExercises: ["glute-bridges", "single-leg-glute-bridges", "marching-glute-bridge", "hip-thrusts"],
    isDeletable: true
  }
];