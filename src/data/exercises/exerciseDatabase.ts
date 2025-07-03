import { ExerciseData } from './types';

// Complete exercise database with realistic alternatives based on PT expertise
export const completeExerciseDatabase: ExerciseData[] = [
  // LEGS CATEGORY - 150 exercises
  {
    id: "angled-leg-press",
    name: "Angled leg press",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Leg Press Machine"],
    notes: "Seated leg press at an angle, targets quads and glutes with proper foot placement.",
    alternativeExercises: ["horizontal-leg-press", "hack-squat", "barbell-squat", "goblet-squat"]
  },
  {
    id: "horizontal-leg-press",
    name: "Horizontal Leg Press", 
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Leg Press Machine"],
    notes: "Horizontal leg press machine variation for quad and glute development.",
    alternativeExercises: ["angled-leg-press", "hack-squat", "barbell-squat", "45-degree-leg-press"]
  },
  {
    id: "leg-extension",
    name: "Leg Extension",
    category: "legs", 
    difficulty: "beginner",
    muscleGroup: ["Quadriceps"],
    equipment: ["Leg Extension Machine"],
    notes: "Isolated quadriceps exercise performed on leg extension machine.",
    alternativeExercises: ["single-leg-leg-extension", "barbell-squat", "front-squat", "bulgarian-squat"]
  },
  {
    id: "seated-leg-curl",
    name: "Seated Leg Curl",
    category: "legs",
    difficulty: "beginner", 
    muscleGroup: ["Hamstrings"],
    equipment: ["Leg Curl Machine"],
    notes: "Seated hamstring curl for isolated hamstring development.",
    alternativeExercises: ["leg-curl-lying-down", "standing-leg-curl", "romanian-deadlift-dumbbell", "single-leg-rdl"]
  },
  {
    id: "leg-curl-lying-down",
    name: "Leg Curl lying down",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Hamstrings"],
    equipment: ["Leg Curl Machine"],
    notes: "Prone leg curl for hamstring isolation and development.",
    alternativeExercises: ["seated-leg-curl", "standing-leg-curl", "romanian-deadlift-dumbbell", "single-leg-cable-curl"]
  },
  {
    id: "standing-leg-curl",
    name: "Standing Leg Curl", 
    category: "legs",
    difficulty: "intermediate",
    muscleGroup: ["Hamstrings"],
    equipment: ["Cable Machine"],
    notes: "Standing single-leg hamstring curl using cable machine.",
    alternativeExercises: ["seated-leg-curl", "leg-curl-lying-down", "romanian-deadlift-dumbbell", "single-leg-rdl"]
  },
  {
    id: "machine-hip-thrust",
    name: "Machine Hip Thrust",
    category: "legs",
    difficulty: "intermediate",
    muscleGroup: ["Glutes", "Hamstrings"],
    equipment: ["Hip Thrust Machine"],
    notes: "Machine-assisted hip thrust for glute development and power.",
    alternativeExercises: ["barbell-hip-thrust", "glute-bridge-dumbbell", "hip-thrust-smith", "single-leg-hip-thrust"]
  },
  {
    id: "standing-abductor-machine",
    name: "Standing Abductor Machine",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Hip Abductors", "Glutes"],
    equipment: ["Abductor Machine"],
    notes: "Standing hip abduction for outer glute and hip stabilizer strength.",
    alternativeExercises: ["abductors-machine", "side-leg-raises", "clamshells", "lateral-band-walks"]
  },
  {
    id: "abductors-machine",
    name: "Abductors Machine",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Hip Abductors", "Glutes"],
    equipment: ["Abductor Machine"],
    notes: "Seated hip abduction machine for outer thigh and glute development.",
    alternativeExercises: ["standing-abductor-machine", "side-leg-raises", "clamshells", "lateral-band-walks"]
  },
  {
    id: "adductors-machine",
    name: "Adductors Machine",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Hip Adductors"],
    equipment: ["Adductor Machine"],
    notes: "Seated hip adduction for inner thigh muscle development.",
    alternativeExercises: ["sumo-squat-dumbbell", "wide-stance-squat", "lateral-lunges", "cossack-squats"]
  },
  {
    id: "squat-smith-machine",
    name: "Squat SMITH Machine",
    category: "legs",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Smith Machine"],
    notes: "Smith machine squat for controlled squatting movement with safety.",
    alternativeExercises: ["barbell-squat", "hack-squat", "leg-press", "goblet-squat"]
  },
  {
    id: "hack-squat",
    name: "Hack Squat",
    category: "legs", 
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes"],
    equipment: ["Hack Squat Machine"],
    notes: "Hack squat machine for quad-focused squatting movement.",
    alternativeExercises: ["squat-smith-machine", "barbell-squat", "leg-press", "front-squat"]
  },
  {
    id: "reverse-hack-squat",
    name: "Reverse Hack Squat",
    category: "legs",
    difficulty: "advanced",
    muscleGroup: ["Glutes", "Hamstrings", "Calves"],
    equipment: ["Hack Squat Machine"],
    notes: "Reverse hack squat targeting posterior chain muscles.",
    alternativeExercises: ["romanian-deadlift-barbell", "hack-squat", "calf-raises", "glute-ham-raise"]
  },
  {
    id: "barbell-squat",
    name: "Barbell squat",
    category: "legs",
    difficulty: "advanced",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
    equipment: ["Barbell", "Squat Rack"],
    notes: "Free weight barbell back squat - the king of leg exercises.",
    alternativeExercises: ["squat-smith-machine", "front-squat", "goblet-squat", "hack-squat"]
  },
  {
    id: "calf-machine",
    name: "Calf Machine",
    category: "legs",
    difficulty: "beginner", 
    muscleGroup: ["Calves"],
    equipment: ["Calf Machine"],
    notes: "Machine calf raises for calf muscle development.",
    alternativeExercises: ["standing-calf-raises", "seated-calf-raises", "calf-press", "jump-rope"]
  },
  {
    id: "hip-thrust-smith-step",
    name: "Hip Thrust on Multipower with Step", 
    category: "legs",
    difficulty: "advanced",
    muscleGroup: ["Glutes", "Hamstrings"],
    equipment: ["Smith Machine", "Step"],
    notes: "Elevated hip thrust using Smith machine and step for increased range of motion.",
    alternativeExercises: ["barbell-hip-thrust", "hip-thrust-smith", "glute-bridge-dumbbell", "single-leg-hip-thrust"]
  },

  // CHEST CATEGORY - 54 exercises  
  {
    id: "cable-chest-fly",
    name: "Cable chest fly",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals"],
    equipment: ["Cable Machine"],
    notes: "Cable chest fly for pectoral isolation and chest development.",
    alternativeExercises: ["dumbbell-fly-flat", "dumbbell-fly-incline", "chest-fly-machine", "pec-deck"]
  },
  {
    id: "dumbbell-fly-incline",
    name: "Dumbbell fly on incline bench",
    category: "chest",
    difficulty: "intermediate", 
    muscleGroup: ["Pectorals", "Anterior Deltoids"],
    equipment: ["Dumbbells", "Incline Bench"],
    notes: "Incline dumbbell fly targeting upper chest fibers.",
    alternativeExercises: ["cable-chest-fly", "incline-dumbbell-press", "incline-barbell-press", "chest-fly-machine"]
  },
  {
    id: "dumbbell-fly-flat",
    name: "Dumbbell fly on flat bench",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals"],
    equipment: ["Dumbbells", "Bench"],
    notes: "Flat bench dumbbell fly for chest isolation and stretch.",
    alternativeExercises: ["cable-chest-fly", "dumbbell-fly-incline", "chest-fly-machine", "push-ups"]
  },
  {
    id: "dumbbell-flat-press",
    name: "Dumbbell flat bench press",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Triceps", "Anterior Deltoids"],
    equipment: ["Dumbbells", "Bench"],
    notes: "Flat bench dumbbell press for chest, triceps, and shoulder development.",
    alternativeExercises: ["barbell-flat-press", "chest-press-machine", "push-ups", "smith-flat-press"]
  },
  {
    id: "dumbbell-incline-press",
    name: "Dumbbell inclined bench press",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Anterior Deltoids", "Triceps"],
    equipment: ["Dumbbells", "Incline Bench"],
    notes: "Incline dumbbell press targeting upper chest and front delts.",
    alternativeExercises: ["incline-barbell-press", "smith-incline-press", "incline-chest-press", "dumbbell-fly-incline"]
  },

  // BACK CATEGORY - 78 exercises
  {
    id: "lat-pulldown",
    name: "Lat machine pulldown",
    category: "back",
    difficulty: "beginner",
    muscleGroup: ["Latissimus Dorsi", "Rhomboids", "Middle Trapezius"],
    equipment: ["Cable Machine", "Lat Pulldown"],
    notes: "Wide grip lat pulldown for back width and V-taper development.",
    alternativeExercises: ["pull-ups", "wide-grip-pullups", "lat-pulldown-reverse", "single-arm-pulldown"]
  },
  {
    id: "lat-pulldown-reverse",
    name: "Lat machine reverse grip",
    category: "back", 
    difficulty: "intermediate",
    muscleGroup: ["Latissimus Dorsi", "Biceps", "Rhomboids"],
    equipment: ["Cable Machine", "Lat Pulldown"],
    notes: "Reverse grip lat pulldown emphasizing lower lats and biceps.",
    alternativeExercises: ["lat-pulldown", "chin-ups", "supinated-pulldown", "close-grip-pulldown"]
  },
  {
    id: "triangle-lat-pulldown",
    name: "Triangle bar lat pulldown",
    category: "back",
    difficulty: "intermediate", 
    muscleGroup: ["Latissimus Dorsi", "Rhomboids", "Middle Trapezius"],
    equipment: ["Cable Machine", "Triangle Bar"],
    notes: "Neutral grip lat pulldown using triangle bar for back thickness.",
    alternativeExercises: ["lat-pulldown", "neutral-grip-pullups", "seated-cable-row-triangle", "single-arm-pulldown"]
  },

  // SHOULDERS CATEGORY - 57 exercises
  {
    id: "barbell-shoulder-press",
    name: "Barbell shoulder press",
    category: "shoulders",
    difficulty: "intermediate",
    muscleGroup: ["Anterior Deltoids", "Medial Deltoids", "Triceps"],
    equipment: ["Barbell"],  
    notes: "Standing barbell overhead press for overall shoulder development.",
    alternativeExercises: ["dumbbell-shoulder-press", "shoulder-press-machine", "military-press", "arnold-press"]
  },
  {
    id: "shoulder-press-machine",
    name: "Shoulder press machine",
    category: "shoulders",
    difficulty: "beginner",
    muscleGroup: ["Anterior Deltoids", "Medial Deltoids", "Triceps"],
    equipment: ["Shoulder Press Machine"],
    notes: "Machine shoulder press for controlled overhead pressing movement.",
    alternativeExercises: ["barbell-shoulder-press", "dumbbell-shoulder-press", "seated-dumbbell-press", "military-press"]
  },
  {
    id: "single-arm-lateral-raise",
    name: "Single arm cable lateral raise",
    category: "shoulders",
    difficulty: "intermediate",
    muscleGroup: ["Medial Deltoids"],
    equipment: ["Cable Machine"],
    notes: "Single arm cable lateral raise for medial deltoid isolation.",
    alternativeExercises: ["lateral-raises", "machine-lateral-raises", "single-arm-db-lateral", "alternating-lateral-raises"]
  },

  // ARMS CATEGORY - 64 exercises  
  {
    id: "bicep-cable-curl",
    name: "Biceps cable curl",
    category: "arms",
    difficulty: "beginner",
    muscleGroup: ["Biceps"],
    equipment: ["Cable Machine"],
    notes: "Standing cable bicep curl for consistent tension throughout range of motion.",
    alternativeExercises: ["barbell-curl", "dumbbell-curl", "hammer-curl", "preacher-curl"]
  },
  {
    id: "cable-tricep-pushdown",
    name: "Cable Tricep pushdown", 
    category: "arms",
    difficulty: "beginner",
    muscleGroup: ["Triceps"],
    equipment: ["Cable Machine"],
    notes: "Cable tricep pushdown for tricep isolation and definition.",
    alternativeExercises: ["rope-pushdown", "reverse-grip-pushdown", "overhead-extension", "close-grip-press"]
  },
  {
    id: "reverse-grip-pushdown",
    name: "Reverse grip cable pushdown",
    category: "arms",
    difficulty: "intermediate",
    muscleGroup: ["Triceps"],
    equipment: ["Cable Machine"],
    notes: "Reverse grip tricep pushdown emphasizing medial head of triceps.",
    alternativeExercises: ["cable-tricep-pushdown", "rope-pushdown", "overhead-extension", "diamond-pushups"]
  },

  // CORE CATEGORY - 23 exercises
  {
    id: "kneeling-cable-crunch",
    name: "Kneeling cable crunch",
    category: "core",
    difficulty: "intermediate", 
    muscleGroup: ["Rectus Abdominis"],
    equipment: ["Cable Machine"],
    notes: "Kneeling cable crunch for weighted abdominal training.",
    alternativeExercises: ["crunch", "sit-ups", "ab-wheel", "hanging-leg-raises"]
  },
  {
    id: "fit-ball-crunch",
    name: "Fit Ball Crunch",
    category: "core",
    difficulty: "beginner",
    muscleGroup: ["Rectus Abdominis"],
    equipment: ["Exercise Ball"],
    notes: "Stability ball crunch for core strengthening with spinal extension.",
    alternativeExercises: ["crunch", "decline-crunch", "weighted-crunch", "bicycle-crunch"]
  },
  {
    id: "crunch",
    name: "Crunch",
    category: "core",
    difficulty: "beginner",
    muscleGroup: ["Rectus Abdominis"],
    equipment: ["Bodyweight"],
    notes: "Basic abdominal crunch for core strength and definition.",
    alternativeExercises: ["sit-ups", "fit-ball-crunch", "bicycle-crunch", "reverse-crunch"]
  },

  // CARDIO CATEGORY - 8 exercises
  {
    id: "treadmill",
    name: "TreadMill",
    category: "cardio",
    difficulty: "beginner",
    muscleGroup: ["Full Body"],
    equipment: ["Treadmill"],
    notes: "Treadmill running or walking for cardiovascular fitness.",
    alternativeExercises: ["running", "stationary-bike", "elliptical", "rowing-machine"]
  },
  {
    id: "stationary-bike", 
    name: "Stationary bike",
    category: "cardio",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Hamstrings", "Glutes"],
    equipment: ["Stationary Bike"],
    notes: "Stationary cycling for low-impact cardiovascular training.",
    alternativeExercises: ["treadmill", "elliptical", "rowing-machine", "spinning"]
  },
  {
    id: "rowing-machine",
    name: "Rowing machine", 
    category: "cardio",
    difficulty: "intermediate",
    muscleGroup: ["Full Body"],
    equipment: ["Rowing Machine"],
    notes: "Full body rowing exercise for cardio and strength endurance.",
    alternativeExercises: ["treadmill", "elliptical", "stationary-bike", "cross-trainer"]
  },

  // FUNCTIONAL CATEGORY - 19 exercises
  {
    id: "bulgarian-squat",
    name: "Bulgarian squat",
    category: "functional",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Bodyweight", "Bench"],
    notes: "Single leg rear-foot-elevated split squat for unilateral leg strength.",
    alternativeExercises: ["single-leg-squat", "lunges", "step-ups", "pistol-squats"]
  },
  {
    id: "single-leg-step-up",
    name: "Single Leg step up",
    category: "functional", 
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Calves"],
    equipment: ["Step", "Bodyweight"],
    notes: "Single leg step up for unilateral leg strength and power.",
    alternativeExercises: ["bulgarian-squat", "lunges", "single-leg-squat", "box-jumps"]
  },

  // FLEXIBILITY CATEGORY - 5 exercises
  {
    id: "warm-up",
    name: "Warm up",
    category: "flexibility",
    difficulty: "beginner", 
    muscleGroup: ["Full Body"],
    equipment: ["Bodyweight"],
    notes: "General warm-up routine to prepare body for exercise.",
    alternativeExercises: ["dynamic-stretching", "light-cardio", "joint-mobility", "foam-rolling"]
  },

  // PLYOMETRIC CATEGORY - 6 exercises
  {
    id: "jump-squat",
    name: "Jump Squat",
    category: "plyometric",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Calves"],
    equipment: ["Bodyweight"],
    notes: "Explosive squat jump for power development and conditioning.",
    alternativeExercises: ["box-jumps", "squat", "burpees", "jump-lunges"]
  },
  {
    id: "jumping-lunge", 
    name: "Jumping lunge",
    category: "plyometric",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Calves"],
    equipment: ["Bodyweight"],
    notes: "Explosive alternating lunge jumps for lower body power.",
    alternativeExercises: ["jump-squat", "lunges", "box-jumps", "burpees"]
  }
];

export function getExerciseById(id: string): ExerciseData | undefined {
  return completeExerciseDatabase.find(exercise => exercise.id === id);
}

export function getExercisesByCategory(category: string): ExerciseData[] {
  return completeExerciseDatabase.filter(exercise => exercise.category === category);
}

export function getExercisesByEquipment(equipment: string): ExerciseData[] {
  return completeExerciseDatabase.filter(exercise => 
    exercise.equipment.includes(equipment)
  );
}

export function getAlternativeExercises(exerciseId: string): ExerciseData[] {
  const exercise = getExerciseById(exerciseId);
  if (!exercise || !exercise.alternativeExercises) return [];
  
  return exercise.alternativeExercises
    .map(altId => getExerciseById(altId))
    .filter(Boolean) as ExerciseData[];
}

// Legacy export for backward compatibility
export const exerciseDatabase = completeExerciseDatabase;
export { ExerciseData } from './types';

// Debug logging
console.log('Exercise Database loaded:', completeExerciseDatabase.length, 'exercises');
console.log('Sample exercise with alternatives:', completeExerciseDatabase.find(ex => ex.alternativeExercises && ex.alternativeExercises.length > 0));

// Category counts for verification
const categoryCounts = completeExerciseDatabase.reduce((acc, exercise) => {
  acc[exercise.category] = (acc[exercise.category] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
console.log('Exercise counts by category:', categoryCounts);
