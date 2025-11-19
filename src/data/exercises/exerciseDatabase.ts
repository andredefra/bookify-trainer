import { ExerciseData } from './types';
import { newExercises } from './newExercises';

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
    alternativeExercises: ["horizontal-leg-press", "hack-squat", "barbell-squat", "goblet-squat"],
    isDeletable: true
  },
  {
    id: "standing-abductor-machine",
    name: "Standing Abductor Machine",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Hip Abductors", "Glutes"],
    equipment: ["Abductor Machine"],
    notes: "Standing hip abduction for outer glute and hip stabilizer strength.",
    alternativeExercises: ["abductors-machine", "side-leg-raises", "clamshells", "lateral-band-walks"],
    isDeletable: true
  },
  {
    id: "abductors-machine",
    name: "Abductors Machine",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Hip Abductors", "Glutes"],
    equipment: ["Abductor Machine"],
    notes: "Seated hip abduction machine for outer thigh and glute development.",
    alternativeExercises: ["standing-abductor-machine", "side-leg-raises", "clamshells", "lateral-band-walks"],
    isDeletable: true
  },
  {
    id: "adductors-machine",
    name: "Adductors Machine",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Hip Adductors"],
    equipment: ["Adductor Machine"],
    notes: "Seated hip adduction for inner thigh muscle development.",
    alternativeExercises: ["sumo-squat-dumbbell", "wide-stance-squat", "lateral-lunges", "cossack-squats"],
    isDeletable: true
  },
  {
    id: "squat-smith-machine",
    name: "Squat SMITH Machine",
    category: "legs",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Smith Machine"],
    notes: "Smith machine squat for controlled squatting movement with safety.",
    alternativeExercises: ["barbell-squat", "hack-squat", "leg-press", "goblet-squat"],
    isDeletable: true
  },
  {
    id: "hack-squat",
    name: "Hack Squat",
    category: "legs", 
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes"],
    equipment: ["Hack Squat Machine"],
    notes: "Hack squat machine for quad-focused squatting movement.",
    alternativeExercises: ["squat-smith-machine", "barbell-squat", "leg-press", "front-squat"],
    isDeletable: true
  },
  {
    id: "reverse-hack-squat",
    name: "Reverse Hack Squat",
    category: "legs",
    difficulty: "advanced",
    muscleGroup: ["Glutes", "Hamstrings", "Calves"],
    equipment: ["Hack Squat Machine"],
    notes: "Reverse hack squat targeting posterior chain muscles.",
    alternativeExercises: ["romanian-deadlift-barbell", "hack-squat", "calf-raises", "glute-ham-raise"],
    isDeletable: true
  },
  {
    id: "calf-machine",
    name: "Calf Machine",
    category: "legs",
    difficulty: "beginner", 
    muscleGroup: ["Calves"],
    equipment: ["Calf Machine"],
    notes: "Machine calf raises for calf muscle development.",
    alternativeExercises: ["standing-calf-raises", "seated-calf-raises", "calf-press", "jump-rope"],
    isDeletable: true
  },
  {
    id: "hip-thrust-smith-step",
    name: "Hip Thrust on Multipower with Step", 
    category: "legs",
    difficulty: "advanced",
    muscleGroup: ["Glutes", "Hamstrings"],
    equipment: ["Smith Machine", "Step"],
    notes: "Elevated hip thrust using Smith machine and step for increased range of motion.",
    alternativeExercises: ["barbell-hip-thrust", "hip-thrust-smith", "glute-bridge-dumbbell", "single-leg-hip-thrust"],
    isDeletable: true
  },
  {
    id: "45-degree-leg-press",
    name: "45 Degree Leg Press",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["45 Degree Leg Press Machine"],
    notes: "45-degree angle leg press for comprehensive leg development.",
    alternativeExercises: ["angled-leg-press", "horizontal-leg-press", "hack-squat", "barbell-squat"],
    isDeletable: true
  },
  {
    id: "single-leg-leg-extension",
    name: "Single Leg Extension",
    category: "legs",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps"],
    equipment: ["Leg Extension Machine"],
    notes: "Unilateral leg extension for balanced quad development.",
    alternativeExercises: ["leg-extension", "bulgarian-squat", "single-leg-squat", "step-ups"],
    isDeletable: true
  },
  {
    id: "single-leg-rdl",
    name: "Single Leg Romanian Deadlift",
    category: "legs",
    difficulty: "advanced",
    muscleGroup: ["Hamstrings", "Glutes", "Core"],
    equipment: ["Dumbbell"],
    notes: "Unilateral RDL for balance, stability, and posterior chain strength.",
    alternativeExercises: ["romanian-deadlift-dumbbell", "single-leg-glute-bridge", "bulgarian-squat", "single-leg-calf-raise"],
    isDeletable: true
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
    alternativeExercises: ["dumbbell-fly-flat", "dumbbell-fly-incline", "chest-fly-machine", "pec-deck"],
    isDeletable: true
  },
  {
    id: "dumbbell-fly-incline",
    name: "Dumbbell fly on incline bench",
    category: "chest",
    difficulty: "intermediate", 
    muscleGroup: ["Pectorals", "Anterior Deltoids"],
    equipment: ["Dumbbells", "Incline Bench"],
    notes: "Incline dumbbell fly targeting upper chest fibers.",
    alternativeExercises: ["cable-chest-fly", "incline-dumbbell-press", "incline-barbell-press", "chest-fly-machine"],
    isDeletable: true
  },
  {
    id: "dumbbell-fly-flat",
    name: "Dumbbell fly on flat bench",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals"],
    equipment: ["Dumbbells", "Bench"],
    notes: "Flat bench dumbbell fly for chest isolation and stretch.",
    alternativeExercises: ["cable-chest-fly", "dumbbell-fly-incline", "chest-fly-machine", "push-ups"],
    isDeletable: true
  },
  {
    id: "dumbbell-flat-press",
    name: "Dumbbell flat bench press",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Triceps", "Anterior Deltoids"],
    equipment: ["Dumbbells", "Bench"],
    notes: "Flat bench dumbbell press for chest, triceps, and shoulder development.",
    alternativeExercises: ["barbell-flat-press", "chest-press-machine", "push-ups", "smith-flat-press"],
    isDeletable: true
  },
  {
    id: "dumbbell-incline-press",
    name: "Dumbbell inclined bench press",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Anterior Deltoids", "Triceps"],
    equipment: ["Dumbbells", "Incline Bench"],
    notes: "Incline dumbbell press targeting upper chest and front delts.",
    alternativeExercises: ["incline-barbell-press", "smith-incline-press", "incline-chest-press", "dumbbell-fly-incline"],
    isDeletable: true
  },
  {
    id: "chest-fly-machine",
    name: "Chest Fly Machine",
    category: "chest",
    difficulty: "beginner",
    muscleGroup: ["Pectorals"],
    equipment: ["Chest Fly Machine"],
    notes: "Machine chest fly for controlled pectoral isolation.",
    alternativeExercises: ["cable-chest-fly", "dumbbell-fly-flat", "pec-deck", "dumbbell-fly-incline"],
    isDeletable: true
  },
  {
    id: "pec-deck",
    name: "Pec Deck",
    category: "chest",
    difficulty: "beginner",
    muscleGroup: ["Pectorals"],
    equipment: ["Pec Deck Machine"],
    notes: "Seated pec deck for chest isolation with stable positioning.",
    alternativeExercises: ["chest-fly-machine", "cable-chest-fly", "dumbbell-fly-flat", "seated-cable-fly"],
    isDeletable: true
  },
  {
    id: "incline-dumbbell-press",
    name: "Incline Dumbbell Press",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Anterior Deltoids", "Triceps"],
    equipment: ["Dumbbells", "Incline Bench"],
    notes: "Incline pressing movement for upper chest development.",
    alternativeExercises: ["dumbbell-incline-press", "incline-barbell-press", "smith-incline-press", "incline-chest-press"],
    isDeletable: true
  },
  {
    id: "incline-barbell-press",
    name: "Incline Barbell Press",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Anterior Deltoids", "Triceps"],
    equipment: ["Barbell", "Incline Bench"],
    notes: "Incline barbell press for upper chest mass and strength.",
    alternativeExercises: ["incline-dumbbell-press", "smith-incline-press", "incline-chest-press", "dumbbell-fly-incline"],
    isDeletable: true
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
    alternativeExercises: ["pull-ups", "wide-grip-pullups", "lat-pulldown-reverse", "single-arm-pulldown"],
    isDeletable: true
  },
  {
    id: "lat-pulldown-reverse",
    name: "Lat machine reverse grip",
    category: "back", 
    difficulty: "intermediate",
    muscleGroup: ["Latissimus Dorsi", "Biceps", "Rhomboids"],
    equipment: ["Cable Machine", "Lat Pulldown"],
    notes: "Reverse grip lat pulldown emphasizing lower lats and biceps.",
    alternativeExercises: ["lat-pulldown", "chin-ups", "supinated-pulldown", "close-grip-pulldown"],
    isDeletable: true
  },
  {
    id: "triangle-lat-pulldown",
    name: "Triangle bar lat pulldown",
    category: "back",
    difficulty: "intermediate", 
    muscleGroup: ["Latissimus Dorsi", "Rhomboids", "Middle Trapezius"],
    equipment: ["Cable Machine", "Triangle Bar"],
    notes: "Neutral grip lat pulldown using triangle bar for back thickness.",
    alternativeExercises: ["lat-pulldown", "neutral-grip-pullups", "seated-cable-row-triangle", "single-arm-pulldown"],
    isDeletable: true
  },
  {
    id: "wide-grip-pullups",
    name: "Wide Grip Pull-ups",
    category: "back",
    difficulty: "advanced",
    muscleGroup: ["Latissimus Dorsi", "Rhomboids", "Rear Deltoids"],
    equipment: ["Pull-up Bar"],
    notes: "Wide grip pull-ups for maximum lat activation and back width.",
    alternativeExercises: ["lat-pulldown", "pull-ups", "wide-grip-lat-pulldown", "assisted-pull-ups"],
    isDeletable: true
  },
  {
    id: "chin-ups",
    name: "Chin-ups",
    category: "back",
    difficulty: "advanced",
    muscleGroup: ["Latissimus Dorsi", "Biceps", "Rhomboids"],
    equipment: ["Pull-up Bar"],
    notes: "Supinated grip chin-ups emphasizing biceps and lower lats.",
    alternativeExercises: ["lat-pulldown-reverse", "pull-ups", "supinated-pulldown", "assisted-chin-ups"],
    isDeletable: true
  },
  {
    id: "seated-cable-row",
    name: "Seated Cable Row",
    category: "back",
    difficulty: "intermediate",
    muscleGroup: ["Rhomboids", "Middle Trapezius", "Latissimus Dorsi"],
    equipment: ["Cable Machine", "Row Handle"],
    notes: "Seated cable row for back thickness and postural muscles.",
    alternativeExercises: ["bent-over-row", "t-bar-row", "chest-supported-row", "single-arm-row"],
    isDeletable: true
  },
  {
    id: "single-arm-pulldown",
    name: "Single Arm Pulldown",
    category: "back",
    difficulty: "intermediate",
    muscleGroup: ["Latissimus Dorsi", "Rhomboids"],
    equipment: ["Cable Machine"],
    notes: "Unilateral lat pulldown for balanced back development.",
    alternativeExercises: ["lat-pulldown", "single-arm-row", "one-arm-dumbbell-row", "triangle-lat-pulldown"],
    isDeletable: true
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
    alternativeExercises: ["dumbbell-shoulder-press", "shoulder-press-machine", "military-press", "arnold-press"],
    isDeletable: true
  },
  {
    id: "shoulder-press-machine",
    name: "Shoulder press machine",
    category: "shoulders",
    difficulty: "beginner",
    muscleGroup: ["Anterior Deltoids", "Medial Deltoids", "Triceps"],
    equipment: ["Shoulder Press Machine"],
    notes: "Machine shoulder press for controlled overhead pressing movement.",
    alternativeExercises: ["barbell-shoulder-press", "dumbbell-shoulder-press", "seated-dumbbell-press", "military-press"],
    isDeletable: true
  },
  {
    id: "single-arm-lateral-raise",
    name: "Single arm cable lateral raise",
    category: "shoulders",
    difficulty: "intermediate",
    muscleGroup: ["Medial Deltoids"],
    equipment: ["Cable Machine"],
    notes: "Single arm cable lateral raise for medial deltoid isolation.",
    alternativeExercises: ["lateral-raises", "machine-lateral-raises", "single-arm-db-lateral", "alternating-lateral-raises"],
    isDeletable: true
  },
  {
    id: "dumbbell-shoulder-press",
    name: "Dumbbell Shoulder Press",
    category: "shoulders",
    difficulty: "intermediate",
    muscleGroup: ["Anterior Deltoids", "Medial Deltoids", "Triceps"],
    equipment: ["Dumbbells"],
    notes: "Seated or standing dumbbell shoulder press for balanced development.",
    alternativeExercises: ["barbell-shoulder-press", "shoulder-press-machine", "arnold-press", "seated-dumbbell-press"],
    isDeletable: true
  },
  {
    id: "lateral-raises",
    name: "Lateral Raises",
    category: "shoulders",
    difficulty: "beginner",
    muscleGroup: ["Medial Deltoids"],
    equipment: ["Dumbbells"],
    notes: "Dumbbell lateral raises for medial deltoid development and shoulder width.",
    alternativeExercises: ["single-arm-lateral-raise", "machine-lateral-raises", "cable-lateral-raises", "plate-raises"],
    isDeletable: true
  },
  {
    id: "rear-delt-fly",
    name: "Rear Delt Fly",
    category: "shoulders",
    difficulty: "intermediate",
    muscleGroup: ["Posterior Deltoids", "Rhomboids"],
    equipment: ["Dumbbells"],
    notes: "Rear deltoid fly for posterior shoulder development and posture.",
    alternativeExercises: ["reverse-pec-deck", "cable-rear-delt-fly", "face-pulls", "bent-over-reverse-fly"],
    isDeletable: true
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
    alternativeExercises: ["barbell-curl", "dumbbell-curl", "hammer-curl", "preacher-curl"],
    isDeletable: true
  },
  {
    id: "cable-tricep-pushdown",
    name: "Cable Tricep pushdown", 
    category: "arms",
    difficulty: "beginner",
    muscleGroup: ["Triceps"],
    equipment: ["Cable Machine"],
    notes: "Cable tricep pushdown for tricep isolation and definition.",
    alternativeExercises: ["rope-pushdown", "reverse-grip-pushdown", "overhead-extension", "close-grip-press"],
    isDeletable: true
  },
  {
    id: "reverse-grip-pushdown",
    name: "Reverse grip cable pushdown",
    category: "arms",
    difficulty: "intermediate",
    muscleGroup: ["Triceps"],
    equipment: ["Cable Machine"],
    notes: "Reverse grip tricep pushdown emphasizing medial head of triceps.",
    alternativeExercises: ["cable-tricep-pushdown", "rope-pushdown", "overhead-extension", "diamond-pushups"],
    isDeletable: true
  },
  {
    id: "barbell-curl",
    name: "Barbell Curl",
    category: "arms",
    difficulty: "intermediate",
    muscleGroup: ["Biceps"],
    equipment: ["Barbell"],
    notes: "Standing barbell curl for bicep mass and strength development.",
    alternativeExercises: ["dumbbell-curl", "bicep-cable-curl", "ez-bar-curl", "preacher-curl"],
    isDeletable: true
  },
  {
    id: "dumbbell-curl",
    name: "Dumbbell Curl",
    category: "arms",
    difficulty: "beginner",
    muscleGroup: ["Biceps"],
    equipment: ["Dumbbells"],
    notes: "Alternating or simultaneous dumbbell curls for bicep development.",
    alternativeExercises: ["barbell-curl", "hammer-curl", "bicep-cable-curl", "concentration-curl"],
    isDeletable: true
  },
  {
    id: "hammer-curl",
    name: "Hammer Curl",
    category: "arms",
    difficulty: "beginner",
    muscleGroup: ["Biceps", "Brachialis"],
    equipment: ["Dumbbells"],
    notes: "Neutral grip hammer curls for bicep and brachialis development.",
    alternativeExercises: ["dumbbell-curl", "rope-hammer-curl", "cross-body-hammer-curl", "cable-hammer-curl"],
    isDeletable: true
  },
  {
    id: "rope-pushdown",
    name: "Rope Pushdown",
    category: "arms",
    difficulty: "intermediate",
    muscleGroup: ["Triceps"],
    equipment: ["Cable Machine", "Rope Attachment"],
    notes: "Rope tricep pushdown for tricep isolation with rope attachment.",
    alternativeExercises: ["cable-tricep-pushdown", "reverse-grip-pushdown", "overhead-extension", "dips"],
    isDeletable: true
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
    alternativeExercises: ["crunch", "sit-ups", "ab-wheel", "hanging-leg-raises"],
    isDeletable: true
  },
  {
    id: "fit-ball-crunch",
    name: "Fit Ball Crunch",
    category: "core",
    difficulty: "beginner",
    muscleGroup: ["Rectus Abdominis"],
    equipment: ["Exercise Ball"],
    notes: "Stability ball crunch for core strengthening with spinal extension.",
    alternativeExercises: ["crunch", "decline-crunch", "weighted-crunch", "bicycle-crunch"],
    isDeletable: true
  },
  {
    id: "crunch",
    name: "Crunch",
    category: "core",
    difficulty: "beginner",
    muscleGroup: ["Rectus Abdominis"],
    equipment: ["Bodyweight"],
    notes: "Basic abdominal crunch for core strength and definition.",
    alternativeExercises: ["sit-ups", "fit-ball-crunch", "bicycle-crunch", "reverse-crunch"],
    isDeletable: true
  },
  {
    id: "plank",
    name: "Plank",
    category: "core",
    difficulty: "beginner",
    muscleGroup: ["Core", "Rectus Abdominis", "Transverse Abdominis"],
    equipment: ["Bodyweight"],
    notes: "Static plank hold for core stability and endurance.",
    alternativeExercises: ["side-plank", "plank-up-downs", "mountain-climbers", "dead-bug"],
    isDeletable: true
  },
  {
    id: "bicycle-crunch",
    name: "Bicycle Crunch",
    category: "core",
    difficulty: "intermediate",
    muscleGroup: ["Rectus Abdominis", "Obliques"],
    equipment: ["Bodyweight"],
    notes: "Dynamic bicycle crunches for abs and obliques.",
    alternativeExercises: ["crunch", "russian-twists", "mountain-climbers", "knee-to-elbow"],
    isDeletable: true
  },
  {
    id: "russian-twists",
    name: "Russian Twists",
    category: "core",
    difficulty: "intermediate",
    muscleGroup: ["Obliques", "Rectus Abdominis"],
    equipment: ["Bodyweight"],
    notes: "Seated twisting motion for oblique and core development.",
    alternativeExercises: ["bicycle-crunch", "wood-chops", "side-plank", "oblique-crunch"],
    isDeletable: true
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
    alternativeExercises: ["running", "stationary-bike", "elliptical", "rowing-machine"],
    isDeletable: true
  },
  {
    id: "stationary-bike", 
    name: "Stationary bike",
    category: "cardio",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Hamstrings", "Glutes"],
    equipment: ["Stationary Bike"],
    notes: "Stationary cycling for low-impact cardiovascular training.",
    alternativeExercises: ["treadmill", "elliptical", "rowing-machine", "spinning"],
    isDeletable: true
  },
  {
    id: "rowing-machine",
    name: "Rowing machine", 
    category: "cardio",
    difficulty: "intermediate",
    muscleGroup: ["Full Body"],
    equipment: ["Rowing Machine"],
    notes: "Full body rowing exercise for cardio and strength endurance.",
    alternativeExercises: ["treadmill", "elliptical", "stationary-bike", "cross-trainer"],
    isDeletable: true
  },
  {
    id: "elliptical",
    name: "Elliptical",
    category: "cardio",
    difficulty: "beginner",
    muscleGroup: ["Full Body"],
    equipment: ["Elliptical Machine"],
    notes: "Low-impact elliptical training for cardiovascular fitness.",
    alternativeExercises: ["treadmill", "stationary-bike", "rowing-machine", "stair-climber"],
    isDeletable: true
  },
  {
    id: "running",
    name: "Running",
    category: "cardio",
    difficulty: "intermediate",
    muscleGroup: ["Full Body"],
    equipment: ["Bodyweight"],
    notes: "Outdoor or indoor running for cardiovascular endurance.",
    alternativeExercises: ["treadmill", "jogging", "sprints", "interval-running"],
    isDeletable: true
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
    alternativeExercises: ["single-leg-squat", "lunges", "step-ups", "pistol-squats"],
    isDeletable: true
  },
  {
    id: "single-leg-step-up",
    name: "Single Leg step up",
    category: "functional", 
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Calves"],
    equipment: ["Step", "Bodyweight"],
    notes: "Single leg step up for unilateral leg strength and power.",
    alternativeExercises: ["bulgarian-squat", "lunges", "single-leg-squat", "box-jumps"],
    isDeletable: true
  },
  {
    id: "lunges",
    name: "Lunges",
    category: "functional",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Bodyweight"],
    notes: "Forward lunges for unilateral leg strength and stability.",
    alternativeExercises: ["bulgarian-squat", "reverse-lunges", "walking-lunges", "lateral-lunges"],
    isDeletable: true
  },
  {
    id: "step-ups",
    name: "Step-ups",
    category: "functional",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Glutes", "Calves"],
    equipment: ["Step", "Bodyweight"],
    notes: "Step-up exercise for functional leg strength and power.",
    alternativeExercises: ["single-leg-step-up", "box-jumps", "lunges", "bulgarian-squat"],
    isDeletable: true
  },
  {
    id: "burpees",
    name: "Burpees",
    category: "functional",
    difficulty: "advanced",
    muscleGroup: ["Full Body"],
    equipment: ["Bodyweight"],
    notes: "Full body burpees for conditioning and functional strength.",
    alternativeExercises: ["mountain-climbers", "squat-thrusts", "jump-squats", "high-knees"],
    isDeletable: true
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
    alternativeExercises: ["dynamic-stretching", "light-cardio", "joint-mobility", "foam-rolling"],
    isDeletable: true
  },
  {
    id: "dynamic-stretching",
    name: "Dynamic Stretching",
    category: "flexibility",
    difficulty: "beginner",
    muscleGroup: ["Full Body"],
    equipment: ["Bodyweight"],
    notes: "Dynamic stretching routine for mobility and activation.",
    alternativeExercises: ["warm-up", "static-stretching", "joint-mobility", "movement-prep"],
    isDeletable: true
  },
  {
    id: "static-stretching",
    name: "Static Stretching",
    category: "flexibility",
    difficulty: "beginner",
    muscleGroup: ["Full Body"],
    equipment: ["Bodyweight"],
    notes: "Static stretching for flexibility and recovery.",
    alternativeExercises: ["dynamic-stretching", "foam-rolling", "yoga-flow", "pnf-stretching"],
    isDeletable: true
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
    alternativeExercises: ["box-jumps", "squat", "burpees", "jump-lunges"],
    isDeletable: true
  },
  {
    id: "jumping-lunge", 
    name: "Jumping lunge",
    category: "plyometric",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Calves"],
    equipment: ["Bodyweight"],
    notes: "Explosive alternating lunge jumps for lower body power.",
    alternativeExercises: ["jump-squat", "lunges", "box-jumps", "burpees"],
    isDeletable: true
  },
  {
    id: "box-jumps",
    name: "Box Jumps",
    category: "plyometric",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Calves"],
    equipment: ["Plyometric Box"],
    notes: "Box jumps for explosive power and vertical jump development.",
    alternativeExercises: ["jump-squat", "step-ups", "broad-jumps", "depth-jumps"],
    isDeletable: true
  },
  {
    id: "broad-jumps",
    name: "Broad Jumps",
    category: "plyometric",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Bodyweight"],
    notes: "Horizontal jumping for explosive power and athletic performance.",
    alternativeExercises: ["box-jumps", "jump-squat", "long-jump", "triple-jump"],
    isDeletable: true
  },

  // Additional exercises to reach 468 total...
  // Adding more exercises across all categories

  // More LEG exercises
  {
    id: "goblet-squat",
    name: "Goblet Squat",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Glutes", "Core"],
    equipment: ["Dumbbell"],
    notes: "Goblet squat with dumbbell for squat pattern learning and leg strength.",
    alternativeExercises: ["barbell-squat", "front-squat", "bodyweight-squat", "sumo-squat"],
    isDeletable: true
  },
  {
    id: "front-squat",
    name: "Front Squat",
    category: "legs",
    difficulty: "advanced",
    muscleGroup: ["Quadriceps", "Core", "Upper Back"],
    equipment: ["Barbell"],
    notes: "Front-loaded squat emphasizing quads and core stability.",
    alternativeExercises: ["goblet-squat", "barbell-squat", "hack-squat", "leg-press"],
    isDeletable: true
  },
  {
    id: "sumo-squat",
    name: "Sumo Squat",
    category: "legs",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Hip Adductors"],
    equipment: ["Dumbbell"],
    notes: "Wide stance sumo squat targeting glutes and inner thighs.",
    alternativeExercises: ["goblet-squat", "wide-stance-squat", "plie-squat", "sumo-deadlift"],
    isDeletable: true
  },
  {
    id: "walking-lunges",
    name: "Walking Lunges",
    category: "legs",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Bodyweight"],
    notes: "Dynamic walking lunges for functional leg strength.",
    alternativeExercises: ["lunges", "reverse-lunges", "lateral-lunges", "bulgarian-squat"],
    isDeletable: true
  },
  {
    id: "reverse-lunges",
    name: "Reverse Lunges",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Bodyweight"],
    notes: "Reverse stepping lunges for controlled leg strengthening.",
    alternativeExercises: ["lunges", "walking-lunges", "bulgarian-squat", "step-ups"],
    isDeletable: true
  },
  {
    id: "lateral-lunges",
    name: "Lateral Lunges",
    category: "legs",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Hip Adductors"],
    equipment: ["Bodyweight"],
    notes: "Side lunges for lateral movement and hip mobility.",
    alternativeExercises: ["reverse-lunges", "walking-lunges", "cossack-squats", "side-step-ups"],
    isDeletable: true
  },
  {
    id: "stiff-leg-deadlift",
    name: "Stiff Leg Deadlift",
    category: "legs",
    difficulty: "intermediate",
    muscleGroup: ["Hamstrings", "Glutes", "Lower Back"],
    equipment: ["Barbell"],
    notes: "Stiff leg deadlift for hamstring and glute development.",
    alternativeExercises: ["romanian-deadlift-dumbbell", "good-mornings", "seated-leg-curl", "glute-ham-raise"],
    isDeletable: true
  },
  {
    id: "single-leg-calf-raise",
    name: "Single Leg Calf Raise",
    category: "legs",
    difficulty: "intermediate",
    muscleGroup: ["Calves"],
    equipment: ["Bodyweight"],
    notes: "Unilateral calf raise for balanced calf development.",
    alternativeExercises: ["standing-calf-raises", "seated-calf-raises", "calf-machine", "donkey-calf-raises"],
    isDeletable: true
  },
  {
    id: "standing-calf-raises",
    name: "Standing Calf Raises",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Calves"],
    equipment: ["Bodyweight"],
    notes: "Standing calf raises for gastrocnemius development.",
    alternativeExercises: ["single-leg-calf-raise", "seated-calf-raises", "calf-machine", "calf-press"],
    isDeletable: true
  },
  {
    id: "seated-calf-raises",
    name: "Seated Calf Raises",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Calves"],
    equipment: ["Seated Calf Raise Machine"],
    notes: "Seated calf raises targeting the soleus muscle.",
    alternativeExercises: ["standing-calf-raises", "single-leg-calf-raise", "calf-machine", "calf-press"],
    isDeletable: true
  },

  // More CHEST exercises
  {
    id: "barbell-flat-press",
    name: "Barbell Flat Press",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Triceps", "Anterior Deltoids"],
    equipment: ["Barbell", "Bench"],
    notes: "Classic barbell bench press for chest mass and strength.",
    alternativeExercises: ["dumbbell-flat-press", "chest-press-machine", "smith-flat-press", "incline-barbell-press"],
    isDeletable: true
  },
  {
    id: "chest-press-machine",
    name: "Chest Press Machine",
    category: "chest",
    difficulty: "beginner",
    muscleGroup: ["Pectorals", "Triceps", "Anterior Deltoids"],
    equipment: ["Chest Press Machine"],
    notes: "Machine chest press for controlled chest development.",
    alternativeExercises: ["barbell-flat-press", "dumbbell-flat-press", "smith-flat-press", "push-ups"],
    isDeletable: true
  },
  {
    id: "smith-flat-press",
    name: "Smith Machine Flat Press",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Triceps", "Anterior Deltoids"],
    equipment: ["Smith Machine", "Bench"],
    notes: "Smith machine chest press for controlled pressing movement.",
    alternativeExercises: ["barbell-flat-press", "dumbbell-flat-press", "chest-press-machine", "incline-smith-press"],
    isDeletable: true
  },
  {
    id: "incline-chest-press",
    name: "Incline Chest Press Machine",
    category: "chest",
    difficulty: "beginner",
    muscleGroup: ["Pectorals", "Anterior Deltoids"],
    equipment: ["Incline Chest Press Machine"],
    notes: "Machine incline chest press for upper chest development.",
    alternativeExercises: ["incline-dumbbell-press", "incline-barbell-press", "smith-incline-press", "dumbbell-fly-incline"],
    isDeletable: true
  },
  {
    id: "smith-incline-press",
    name: "Smith Machine Incline Press",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Anterior Deltoids", "Triceps"],
    equipment: ["Smith Machine", "Incline Bench"],
    notes: "Smith machine incline press for controlled upper chest development.",
    alternativeExercises: ["incline-barbell-press", "incline-dumbbell-press", "incline-chest-press", "smith-flat-press"],
    isDeletable: true
  },
  {
    id: "decline-barbell-press",
    name: "Decline Barbell Press",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Triceps"],
    equipment: ["Barbell", "Decline Bench"],
    notes: "Decline barbell press for lower chest development.",
    alternativeExercises: ["decline-dumbbell-press", "dips", "decline-push-ups", "cable-crossover-low"],
    isDeletable: true
  },
  {
    id: "decline-dumbbell-press",
    name: "Decline Dumbbell Press",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Triceps"],
    equipment: ["Dumbbells", "Decline Bench"],
    notes: "Decline dumbbell press for lower chest targeting.",
    alternativeExercises: ["decline-barbell-press", "dips", "decline-push-ups", "decline-fly"],
    isDeletable: true
  },
  {
    id: "dips",
    name: "Dips",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Triceps", "Anterior Deltoids"],
    equipment: ["Dip Bars"],
    notes: "Bodyweight dips for chest and tricep development.",
    alternativeExercises: ["decline-barbell-press", "close-grip-bench-press", "tricep-dips", "assisted-dips"],
    isDeletable: true
  },
  {
    id: "cable-crossover",
    name: "Cable Crossover",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals"],
    equipment: ["Cable Machine"],
    notes: "Cable crossover for chest isolation from multiple angles.",
    alternativeExercises: ["cable-chest-fly", "dumbbell-fly-flat", "pec-deck", "chest-fly-machine"],
    isDeletable: true
  },
  {
    id: "incline-push-ups",
    name: "Incline Push-ups",
    category: "chest",
    difficulty: "beginner",
    muscleGroup: ["Pectorals", "Triceps", "Anterior Deltoids"],
    equipment: ["Bench"],
    notes: "Incline push-ups for upper chest emphasis and beginner progression.",
    alternativeExercises: ["push-ups", "incline-dumbbell-press", "chest-press-machine", "wall-push-ups"],
    isDeletable: true
  },
  {
    id: "decline-push-ups",
    name: "Decline Push-ups",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Triceps", "Anterior Deltoids"],
    equipment: ["Bench"],
    notes: "Decline push-ups for lower chest emphasis and increased difficulty.",
    alternativeExercises: ["push-ups", "decline-dumbbell-press", "dips", "diamond-push-ups"],
    isDeletable: true
  },
  {
    id: "diamond-push-ups",
    name: "Diamond Push-ups",
    category: "chest",
    difficulty: "advanced",
    muscleGroup: ["Triceps", "Pectorals"],
    equipment: ["Bodyweight"],
    notes: "Diamond push-ups for tricep emphasis and upper body strength.",
    alternativeExercises: ["close-grip-bench-press", "tricep-dips", "push-ups", "decline-push-ups"],
    isDeletable: true
  },

  // More BACK exercises
  {
    id: "bent-over-row",
    name: "Bent Over Row",
    category: "back",
    difficulty: "intermediate",
    muscleGroup: ["Rhomboids", "Middle Trapezius", "Latissimus Dorsi"],
    equipment: ["Barbell"],
    notes: "Bent over barbell row for back thickness and strength.",
    alternativeExercises: ["seated-cable-row", "t-bar-row", "chest-supported-row", "single-arm-row"],
    isDeletable: true
  },
  {
    id: "t-bar-row",
    name: "T-Bar Row",
    category: "back",
    difficulty: "intermediate",
    muscleGroup: ["Rhomboids", "Middle Trapezius", "Latissimus Dorsi"],
    equipment: ["T-Bar Row Machine"],
    notes: "T-bar row for back thickness with stable positioning.",
    alternativeExercises: ["bent-over-row", "seated-cable-row", "chest-supported-row", "landmine-row"],
    isDeletable: true
  },
  {
    id: "chest-supported-row",
    name: "Chest Supported Row",
    category: "back",
    difficulty: "intermediate",
    muscleGroup: ["Rhomboids", "Middle Trapezius", "Rear Deltoids"],
    equipment: ["Chest Supported Row Machine"],
    notes: "Chest supported row for back development with spinal support.",
    alternativeExercises: ["seated-cable-row", "t-bar-row", "bent-over-row", "incline-dumbbell-row"],
    isDeletable: true
  },
  {
    id: "single-arm-row",
    name: "Single Arm Row",
    category: "back",
    difficulty: "intermediate",
    muscleGroup: ["Latissimus Dorsi", "Rhomboids", "Middle Trapezius"],
    equipment: ["Dumbbell", "Bench"],
    notes: "Single arm dumbbell row for unilateral back development.",
    alternativeExercises: ["bent-over-row", "seated-cable-row", "chest-supported-row", "single-arm-pulldown"],
    isDeletable: true
  },
  {
    id: "assisted-pull-ups",
    name: "Assisted Pull-ups",
    category: "back",
    difficulty: "beginner",
    muscleGroup: ["Latissimus Dorsi", "Rhomboids", "Biceps"],
    equipment: ["Assisted Pull-up Machine"],
    notes: "Assisted pull-ups for building up to full bodyweight pull-ups.",
    alternativeExercises: ["lat-pulldown", "pull-ups", "negative-pull-ups", "band-assisted-pull-ups"],
    isDeletable: true
  },
  {
    id: "face-pulls",
    name: "Face Pulls",
    category: "back",
    difficulty: "intermediate",
    muscleGroup: ["Rear Deltoids", "Rhomboids", "Middle Trapezius"],
    equipment: ["Cable Machine", "Rope Attachment"],
    notes: "Cable face pulls for rear deltoids and upper back.",
    alternativeExercises: ["rear-delt-fly", "reverse-pec-deck", "bent-over-reverse-fly", "cable-rear-delt-fly"],
    isDeletable: true
  },
  {
    id: "shrugs",
    name: "Shrugs",
    category: "back",
    difficulty: "beginner",
    muscleGroup: ["Upper Trapezius"],
    equipment: ["Dumbbells"],
    notes: "Dumbbell shrugs for upper trapezius development.",
    alternativeExercises: ["barbell-shrugs", "cable-shrugs", "upright-rows", "trap-bar-shrugs"],
    isDeletable: true
  },
  {
    id: "deadlift",
    name: "Deadlift",
    category: "back",
    difficulty: "advanced",
    muscleGroup: ["Erector Spinae", "Glutes", "Hamstrings", "Traps"],
    equipment: ["Barbell"],
    notes: "Conventional deadlift for posterior chain strength and power.",
    alternativeExercises: ["sumo-deadlift", "trap-bar-deadlift", "romanian-deadlift-barbell", "rack-pulls"],
    isDeletable: true
  },

  // More SHOULDER exercises
  {
    id: "military-press",
    name: "Military Press",
    category: "shoulders",
    difficulty: "intermediate",
    muscleGroup: ["Anterior Deltoids", "Medial Deltoids", "Triceps"],
    equipment: ["Barbell"],
    notes: "Standing military press for strict overhead pressing strength.",
    alternativeExercises: ["barbell-shoulder-press", "dumbbell-shoulder-press", "shoulder-press-machine", "push-press"],
    isDeletable: true
  },
  {
    id: "arnold-press",
    name: "Arnold Press",
    category: "shoulders",
    difficulty: "intermediate",
    muscleGroup: ["Anterior Deltoids", "Medial Deltoids"],
    equipment: ["Dumbbells"],
    notes: "Arnold press combining rotation with pressing for complete deltoid development.",
    alternativeExercises: ["dumbbell-shoulder-press", "seated-dumbbell-press", "shoulder-press-machine", "lateral-raises"],
    isDeletable: true
  },
  {
    id: "seated-dumbbell-press",
    name: "Seated Dumbbell Press",
    category: "shoulders",
    difficulty: "intermediate",
    muscleGroup: ["Anterior Deltoids", "Medial Deltoids", "Triceps"],
    equipment: ["Dumbbells", "Bench"],
    notes: "Seated dumbbell shoulder press for controlled overhead pressing.",
    alternativeExercises: ["dumbbell-shoulder-press", "arnold-press", "shoulder-press-machine", "military-press"],
    isDeletable: true
  },
  {
    id: "machine-lateral-raises",
    name: "Machine Lateral Raises",
    category: "shoulders",
    difficulty: "beginner",
    muscleGroup: ["Medial Deltoids"],
    equipment: ["Lateral Raise Machine"],
    notes: "Machine lateral raises for controlled medial deltoid isolation.",
    alternativeExercises: ["lateral-raises", "single-arm-lateral-raise", "cable-lateral-raises", "upright-rows"],
    isDeletable: true
  },
  {
    id: "cable-lateral-raises",
    name: "Cable Lateral Raises",
    category: "shoulders",
    difficulty: "intermediate",
    muscleGroup: ["Medial Deltoids"],
    equipment: ["Cable Machine"],
    notes: "Cable lateral raises for constant tension medial deltoid development.",
    alternativeExercises: ["lateral-raises", "machine-lateral-raises", "single-arm-lateral-raise", "plate-raises"],
    isDeletable: true
  },
  {
    id: "front-raises",
    name: "Front Raises",
    category: "shoulders",
    difficulty: "beginner",
    muscleGroup: ["Anterior Deltoids"],
    equipment: ["Dumbbells"],
    notes: "Front raises for anterior deltoid isolation and development.",
    alternativeExercises: ["military-press", "arnold-press", "plate-front-raises", "cable-front-raises"],
    isDeletable: true
  },
  {
    id: "reverse-pec-deck",
    name: "Reverse Pec Deck",
    category: "shoulders",
    difficulty: "beginner",
    muscleGroup: ["Posterior Deltoids", "Rhomboids"],
    equipment: ["Reverse Pec Deck Machine"],
    notes: "Reverse pec deck for posterior deltoid isolation.",
    alternativeExercises: ["rear-delt-fly", "face-pulls", "cable-rear-delt-fly", "bent-over-reverse-fly"],
    isDeletable: true
  },
  {
    id: "cable-rear-delt-fly",
    name: "Cable Rear Delt Fly",
    category: "shoulders",
    difficulty: "intermediate",
    muscleGroup: ["Posterior Deltoids", "Rhomboids"],
    equipment: ["Cable Machine"],
    notes: "Cable rear deltoid fly for posterior shoulder development.",
    alternativeExercises: ["rear-delt-fly", "reverse-pec-deck", "face-pulls", "bent-over-reverse-fly"],
    isDeletable: true
  },
  {
    id: "upright-rows",
    name: "Upright Rows",
    category: "shoulders",
    difficulty: "intermediate",
    muscleGroup: ["Medial Deltoids", "Upper Trapezius"],
    equipment: ["Barbell"],
    notes: "Upright rows for medial deltoid and trap development.",
    alternativeExercises: ["lateral-raises", "shrugs", "high-pulls", "cable-upright-rows"],
    isDeletable: true
  },

  // More ARM exercises
  {
    id: "preacher-curl",
    name: "Preacher Curl",
    category: "arms",
    difficulty: "intermediate",
    muscleGroup: ["Biceps"],
    equipment: ["Preacher Bench", "Barbell"],
    notes: "Preacher curl for bicep isolation and peak contraction.",
    alternativeExercises: ["barbell-curl", "ez-bar-curl", "concentration-curl", "machine-preacher-curl"],
    isDeletable: true
  },
  {
    id: "concentration-curl",
    name: "Concentration Curl",
    category: "arms",
    difficulty: "intermediate",
    muscleGroup: ["Biceps"],
    equipment: ["Dumbbell"],
    notes: "Seated concentration curl for bicep isolation and mind-muscle connection.",
    alternativeExercises: ["dumbbell-curl", "preacher-curl", "hammer-curl", "cable-curl"],
    isDeletable: true
  },
  {
    id: "ez-bar-curl",
    name: "EZ Bar Curl",
    category: "arms",
    difficulty: "intermediate",
    muscleGroup: ["Biceps"],
    equipment: ["EZ Bar"],
    notes: "EZ bar curl for bicep development with reduced wrist stress.",
    alternativeExercises: ["barbell-curl", "preacher-curl", "dumbbell-curl", "cable-curl"],
    isDeletable: true
  },
  {
    id: "overhead-extension",
    name: "Overhead Extension",
    category: "arms",
    difficulty: "intermediate",
    muscleGroup: ["Triceps"],
    equipment: ["Dumbbell"],
    notes: "Overhead tricep extension for long head tricep development.",
    alternativeExercises: ["french-press", "seated-overhead-extension", "cable-overhead-extension", "skull-crushers"],
    isDeletable: true
  },
  {
    id: "close-grip-bench-press",
    name: "Close Grip Bench Press",
    category: "arms",
    difficulty: "intermediate",
    muscleGroup: ["Triceps", "Pectorals"],
    equipment: ["Barbell", "Bench"],
    notes: "Close grip bench press for tricep mass and strength.",
    alternativeExercises: ["diamond-push-ups", "dips", "overhead-extension", "cable-tricep-pushdown"],
    isDeletable: true
  },
  {
    id: "tricep-dips",
    name: "Tricep Dips",
    category: "arms",
    difficulty: "intermediate",
    muscleGroup: ["Triceps"],
    equipment: ["Bench"],
    notes: "Bench tricep dips for tricep development using bodyweight.",
    alternativeExercises: ["dips", "diamond-push-ups", "close-grip-bench-press", "overhead-extension"],
    isDeletable: true
  },
  {
    id: "skull-crushers",
    name: "Skull Crushers",
    category: "arms",
    difficulty: "intermediate",
    muscleGroup: ["Triceps"],
    equipment: ["Barbell", "Bench"],
    notes: "Lying tricep extension (skull crushers) for tricep isolation.",
    alternativeExercises: ["overhead-extension", "french-press", "close-grip-bench-press", "cable-tricep-pushdown"],
    isDeletable: true
  },
  {
    id: "21s-bicep-curl",
    name: "21s Bicep Curl",
    category: "arms",
    difficulty: "advanced",
    muscleGroup: ["Biceps"],
    equipment: ["Barbell"],
    notes: "21s bicep curl method for intense bicep stimulation.",
    alternativeExercises: ["barbell-curl", "drop-set-curls", "slow-negatives-curl", "rest-pause-curls"],
    isDeletable: true
  },
  {
    id: "wrist-curls",
    name: "Wrist Curls",
    category: "arms",
    difficulty: "beginner",
    muscleGroup: ["Forearms"],
    equipment: ["Barbell"],
    notes: "Wrist curls for forearm and grip strength development.",
    alternativeExercises: ["reverse-wrist-curls", "farmer-walks", "grip-squeezes", "plate-pinches"],
    isDeletable: true
  },

  // More CORE exercises
  {
    id: "sit-ups",
    name: "Sit-ups",
    category: "core",
    difficulty: "beginner",
    muscleGroup: ["Rectus Abdominis", "Hip Flexors"],
    equipment: ["Bodyweight"],
    notes: "Traditional sit-ups for abdominal and hip flexor development.",
    alternativeExercises: ["crunch", "bicycle-crunch", "v-ups", "leg-raises"],
    isDeletable: true
  },
  {
    id: "mountain-climbers",
    name: "Mountain Climbers",
    category: "core",
    difficulty: "intermediate",
    muscleGroup: ["Core", "Shoulders", "Legs"],
    equipment: ["Bodyweight"],
    notes: "Dynamic mountain climbers for core stability and cardio.",
    alternativeExercises: ["plank", "burpees", "high-knees", "plank-jacks"],
    isDeletable: true
  },
  {
    id: "side-plank",
    name: "Side Plank",
    category: "core",
    difficulty: "intermediate",
    muscleGroup: ["Obliques", "Core"],
    equipment: ["Bodyweight"],
    notes: "Side plank for oblique strength and lateral core stability.",
    alternativeExercises: ["plank", "russian-twists", "oblique-crunch", "side-bends"],
    isDeletable: true
  },
  {
    id: "leg-raises",
    name: "Leg Raises",
    category: "core",
    difficulty: "intermediate",
    muscleGroup: ["Lower Abs", "Hip Flexors"],
    equipment: ["Bodyweight"],
    notes: "Leg raises for lower abdominal development.",
    alternativeExercises: ["reverse-crunch", "knee-raises", "v-ups", "flutter-kicks"],
    isDeletable: true
  },
  {
    id: "wood-chops",
    name: "Wood Chops",
    category: "core",
    difficulty: "intermediate",
    muscleGroup: ["Obliques", "Core"],
    equipment: ["Cable Machine"],
    notes: "Cable wood chops for rotational core strength.",
    alternativeExercises: ["russian-twists", "medicine-ball-slams", "bicycle-crunch", "side-plank"],
    isDeletable: true
  },
  {
    id: "ab-wheel",
    name: "Ab Wheel Rollout",
    category: "core",
    difficulty: "advanced",
    muscleGroup: ["Rectus Abdominis", "Core"],
    equipment: ["Ab Wheel"],
    notes: "Ab wheel rollout for advanced core strengthening.",
    alternativeExercises: ["plank", "mountain-climbers", "body-saw", "dead-bug"],
    isDeletable: true
  },
  {
    id: "hanging-leg-raises",
    name: "Hanging Leg Raises",
    category: "core",
    difficulty: "advanced",
    muscleGroup: ["Lower Abs", "Grip Strength"],
    equipment: ["Pull-up Bar"],
    notes: "Hanging leg raises for advanced lower abdominal development.",
    alternativeExercises: ["leg-raises", "knee-raises", "v-ups", "captain-chair-leg-raise"],
    isDeletable: true
  },
  {
    id: "dead-bug",
    name: "Dead Bug",
    category: "core",
    difficulty: "beginner",
    muscleGroup: ["Core", "Hip Flexors"],
    equipment: ["Bodyweight"],
    notes: "Dead bug exercise for core stability and coordination.",
    alternativeExercises: ["bird-dog", "plank", "modified-plank", "knee-to-chest"],
    isDeletable: true
  },
  {
    id: "bird-dog",
    name: "Bird Dog",
    category: "core",
    difficulty: "beginner",
    muscleGroup: ["Core", "Glutes", "Lower Back"],
    equipment: ["Bodyweight"],
    notes: "Bird dog for core stability and spinal alignment.",
    alternativeExercises: ["dead-bug", "plank", "superman", "quadruped-hip-extension"],
    isDeletable: true
  },
  {
    id: "pallof-press",
    name: "Pallof Press",
    category: "core",
    difficulty: "intermediate",
    muscleGroup: ["Core", "Obliques"],
    equipment: ["Cable Machine"],
    notes: "Anti-rotation core exercise for functional strength.",
    alternativeExercises: ["plank", "side-plank", "wood-chops", "single-arm-farmer-walk"],
    isDeletable: true
  },

  // More CARDIO exercises
  {
    id: "spinning",
    name: "Spinning",
    category: "cardio",
    difficulty: "intermediate",
    muscleGroup: ["Legs", "Cardiovascular"],
    equipment: ["Spin Bike"],
    notes: "High-intensity spinning class for cardiovascular fitness.",
    alternativeExercises: ["stationary-bike", "cycling", "interval-bike", "airdyne-bike"],
    isDeletable: true
  },
  {
    id: "stair-climber",
    name: "Stair Climber",
    category: "cardio",
    difficulty: "intermediate",
    muscleGroup: ["Legs", "Glutes"],
    equipment: ["Stair Climber Machine"],
    notes: "Stair climbing for lower body and cardiovascular conditioning.",
    alternativeExercises: ["step-ups", "treadmill-incline", "elliptical", "stationary-bike"],
    isDeletable: true
  },
  {
    id: "cross-trainer",
    name: "Cross Trainer",
    category: "cardio",
    difficulty: "beginner",
    muscleGroup: ["Full Body"],
    equipment: ["Cross Trainer"],
    notes: "Cross trainer for full-body low-impact cardio workout.",
    alternativeExercises: ["elliptical", "rowing-machine", "treadmill", "stationary-bike"],
    isDeletable: true
  },

  // More FUNCTIONAL exercises
  {
    id: "pistol-squats",
    name: "Pistol Squats",
    category: "functional",
    difficulty: "advanced",
    muscleGroup: ["Quadriceps", "Glutes", "Core"],
    equipment: ["Bodyweight"],
    notes: "Single-leg pistol squats for advanced unilateral strength.",
    alternativeExercises: ["bulgarian-squat", "single-leg-squat", "assisted-pistol-squat", "shrimp-squats"],
    isDeletable: true
  },
  {
    id: "single-leg-squat",
    name: "Single Leg Squat",
    category: "functional",
    difficulty: "advanced",
    muscleGroup: ["Quadriceps", "Glutes", "Core"],
    equipment: ["Bodyweight"],
    notes: "Single leg squat for unilateral strength and balance.",
    alternativeExercises: ["bulgarian-squat", "pistol-squats", "lunges", "step-ups"],
    isDeletable: true
  },
  {
    id: "bear-crawl",
    name: "Bear Crawl",
    category: "functional",
    difficulty: "intermediate",
    muscleGroup: ["Full Body", "Core"],
    equipment: ["Bodyweight"],
    notes: "Bear crawl for full-body functional movement and core stability.",
    alternativeExercises: ["crab-walk", "lizard-crawl", "army-crawl", "quadruped-crawl"],
    isDeletable: true
  },
  {
    id: "farmer-walks",
    name: "Farmer Walks",
    category: "functional",
    difficulty: "intermediate",
    muscleGroup: ["Full Body", "Grip Strength"],
    equipment: ["Dumbbells"],
    notes: "Farmer walks for functional strength and grip development.",
    alternativeExercises: ["suitcase-carry", "overhead-carry", "front-loaded-carry", "mixed-carry"],
    isDeletable: true
  },
  {
    id: "turkish-get-up",
    name: "Turkish Get-up",
    category: "functional",
    difficulty: "advanced",
    muscleGroup: ["Full Body", "Core", "Shoulders"],
    equipment: ["Kettlebell"],
    notes: "Turkish get-up for full-body functional movement and stability.",
    alternativeExercises: ["getup-sit", "half-getup", "tall-kneeling-press", "overhead-squat"],
    isDeletable: true
  },
  {
    id: "kettlebell-swing",
    name: "Kettlebell Swings",
    category: "functional",
    difficulty: "intermediate",
    muscleGroup: ["Glutes", "Hamstrings", "Core"],
    equipment: ["Kettlebell"],
    notes: "Kettlebell swings for posterior chain power and conditioning.",
    alternativeExercises: ["american-kettlebell-swing", "sumo-deadlift", "hip-thrust", "good-mornings"],
    isDeletable: true
  },
  {
    id: "medicine-ball-slams",
    name: "Medicine Ball Slams",
    category: "functional",
    difficulty: "intermediate",
    muscleGroup: ["Full Body", "Core"],
    equipment: ["Medicine Ball"],
    notes: "Medicine ball slams for explosive power and conditioning.",
    alternativeExercises: ["wood-chops", "overhead-slams", "rotational-slams", "wall-balls"],
    isDeletable: true
  },
  {
    id: "battle-ropes",
    name: "Battle Ropes",
    category: "functional",
    difficulty: "intermediate",
    muscleGroup: ["Full Body", "Cardiovascular"],
    equipment: ["Battle Ropes"],
    notes: "Battle ropes for full-body conditioning and power endurance.",
    alternativeExercises: ["mountain-climbers", "burpees", "jumping-jacks", "high-intensity-intervals"],
    isDeletable: true
  },
  {
    id: "sled-push",
    name: "Sled Push",
    category: "functional",
    difficulty: "advanced",
    muscleGroup: ["Full Body", "Legs"],
    equipment: ["Prowler Sled"],
    notes: "Sled push for functional strength and power development.",
    alternativeExercises: ["sled-pull", "car-push", "tire-flip", "farmer-walks"],
    isDeletable: true
  },
  {
    id: "tire-flip",
    name: "Tire Flip",
    category: "functional",
    difficulty: "advanced",
    muscleGroup: ["Full Body", "Posterior Chain"],
    equipment: ["Large Tire"],
    notes: "Tire flipping for explosive power and functional strength.",
    alternativeExercises: ["sled-push", "deadlift", "atlas-stone-lift", "sandbag-carry"],
    isDeletable: true
  },

  // More FLEXIBILITY exercises
  {
    id: "foam-rolling",
    name: "Foam Rolling",
    category: "flexibility",
    difficulty: "beginner",
    muscleGroup: ["Full Body"],
    equipment: ["Foam Roller"],
    notes: "Foam rolling for myofascial release and recovery.",
    alternativeExercises: ["static-stretching", "massage", "lacrosse-ball-massage", "trigger-point-therapy"],
    isDeletable: true
  },
  {
    id: "yoga-flow",
    name: "Yoga Flow",
    category: "flexibility",
    difficulty: "intermediate",
    muscleGroup: ["Full Body"],
    equipment: ["Yoga Mat"],
    notes: "Dynamic yoga flow for flexibility, strength, and mindfulness.",
    alternativeExercises: ["static-stretching", "dynamic-stretching", "pilates", "tai-chi"],
    isDeletable: true
  },

  // More PLYOMETRIC exercises
  {
    id: "depth-jumps",
    name: "Depth Jumps",
    category: "plyometric",
    difficulty: "advanced",
    muscleGroup: ["Legs", "Power"],
    equipment: ["Plyometric Box"],
    notes: "Depth jumps for reactive strength and jumping ability.",
    alternativeExercises: ["box-jumps", "drop-jumps", "jump-squat", "broad-jumps"],
    isDeletable: true
  },
  {
    id: "lateral-bounds",
    name: "Lateral Bounds",
    category: "plyometric",
    difficulty: "intermediate",
    muscleGroup: ["Legs", "Glutes"],
    equipment: ["Bodyweight"],
    notes: "Lateral bounds for lateral power and agility.",
    alternativeExercises: ["lateral-lunges", "side-shuffles", "skater-hops", "lateral-jumps"],
    isDeletable: true
  },
   ...newExercises,
  // Essential bodyweight exercises with comprehensive alternatives
  {
    id: "push-ups",
    name: "Push-ups",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Pectorals", "Triceps", "Anterior Deltoids"],
    equipment: ["Bodyweight"],
    notes: "Classic bodyweight pushing exercise for upper body strength",
    alternativeExercises: ["incline-push-ups", "knee-push-ups", "wall-push-ups", "diamond-push-ups", "decline-push-ups", "dumbbell-flat-press", "chest-press-machine"],
    isDeletable: true
  },
  {
    id: "bent-over-row",
    name: "Bent Over Row",
    category: "back",
    difficulty: "intermediate",
    muscleGroup: ["Latissimus Dorsi", "Rhomboids", "Middle Trapezius"],
    equipment: ["Barbell", "Dumbbells"],
    notes: "Hip hinge rowing movement for back thickness",
    alternativeExercises: ["seated-cable-row", "single-arm-row", "t-bar-row", "chest-supported-row", "lat-pulldown"],
    isDeletable: true
  },
  {
    id: "barbell-squat",
    name: "Barbell Squat",
    category: "legs",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Barbell"],
    notes: "King of exercises - compound leg movement",
    alternativeExercises: ["front-squat", "goblet-squat", "leg-press", "hack-squat", "bodyweight-squats"],
    isDeletable: true
  },
  // Additional bodyweight exercises with proper alternatives
  {
    id: "bodyweight-squats",
    name: "Bodyweight Squats",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Bodyweight"],
    notes: "Basic squat movement with no added weight",
    alternativeExercises: ["goblet-squat", "wall-sits", "chair-squats", "sumo-squat"],
    isDeletable: true
  },
  {
    id: "chair-squats",
    name: "Chair Squats",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Chair"],
    notes: "Sit-to-stand exercise using chair for assistance",
    alternativeExercises: ["bodyweight-squats", "wall-sits", "goblet-squat", "box-squats"],
    isDeletable: true
  },
  {
    id: "air-squats",
    name: "Air Squats",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["Bodyweight"],
    notes: "Another name for bodyweight squats",
    alternativeExercises: ["bodyweight-squats", "goblet-squat", "wall-sits", "chair-squats"],
    isDeletable: true
  },
  {
    id: "close-grip-push-ups",
    name: "Close Grip Push-ups",
    category: "chest",
    difficulty: "intermediate",
    muscleGroup: ["Triceps", "Pectorals", "Anterior Deltoids"],
    equipment: ["Bodyweight"],
    notes: "Push-ups with hands closer together for more tricep focus",
    alternativeExercises: ["diamond-push-ups", "tricep-push-ups", "push-ups", "tricep-dips"],
    isDeletable: true
  },
  {
    id: "tricep-push-ups",
    name: "Tricep Push-ups",
    category: "arms",
    difficulty: "intermediate",
    muscleGroup: ["Triceps", "Pectorals", "Anterior Deltoids"],
    equipment: ["Bodyweight"],
    notes: "Push-ups with arms close to body for tricep emphasis",
    alternativeExercises: ["close-grip-push-ups", "diamond-push-ups", "tricep-dips", "bench-dips"],
    isDeletable: true
  },
  {
    id: "decline-push-ups",
    name: "Decline Push-ups",
    category: "chest",
    difficulty: "advanced",
    muscleGroup: ["Upper Pectorals", "Triceps", "Anterior Deltoids"],
    equipment: ["Bench", "Platform"],
    notes: "Push-ups with feet elevated on platform",
    alternativeExercises: ["incline-push-ups", "push-ups", "handstand-push-ups", "pike-push-ups"],
    isDeletable: true
  },
  {
    id: "pike-push-ups",
    name: "Pike Push-ups",
    category: "shoulders",
    difficulty: "advanced",
    muscleGroup: ["Anterior Deltoids", "Triceps"],
    equipment: ["Bodyweight"],
    notes: "Push-ups in pike position targeting shoulders",
    alternativeExercises: ["handstand-push-ups", "decline-push-ups", "shoulder-press-machine", "dumbbell-shoulder-press"],
    isDeletable: true
  },
  {
    id: "handstand-push-ups",
    name: "Handstand Push-ups",
    category: "shoulders",
    difficulty: "advanced",
    muscleGroup: ["Anterior Deltoids", "Triceps", "Core"],
    equipment: ["Wall"],
    notes: "Inverted push-ups against wall in handstand position",
    alternativeExercises: ["pike-push-ups", "shoulder-press-machine", "military-press", "wall-handstand-hold"],
    isDeletable: true
  },
  {
    id: "squat-pulses",
    name: "Squat Pulses",
    category: "legs",
    difficulty: "intermediate",
    muscleGroup: ["Quadriceps", "Glutes"],
    equipment: ["Bodyweight"],
    notes: "Small pulsing movements at bottom of squat",
    alternativeExercises: ["jump-squats", "bodyweight-squats", "wall-sits", "squat-holds"],
    isDeletable: true
  },
  {
    id: "squat-holds",
    name: "Squat Holds",
    category: "legs",
    difficulty: "beginner",
    muscleGroup: ["Quadriceps", "Glutes"],
    equipment: ["Bodyweight"],
    notes: "Isometric hold in squat position",
    alternativeExercises: ["wall-sits", "squat-pulses", "bodyweight-squats", "chair-squats"],
    isDeletable: true
  },
  
  // CARDIO OUTDOOR EXERCISES
  {
    id: "jogging-outdoor",
    name: "Jogging Outdoor (Corsetta)",
    category: "cardio",
    difficulty: "beginner",
    muscleGroup: ["Legs", "Core"],
    equipment: ["None"],
    notes: "Light running pace outdoors on flat terrain",
    alternativeExercises: ["treadmill-running", "outdoor-running", "trail-running"],
    isDeletable: false
  },
  {
    id: "sprint-intervals",
    name: "Sprint Intervals (Scatti)",
    category: "cardio",
    difficulty: "advanced",
    muscleGroup: ["Legs", "Core"],
    equipment: ["None"],
    notes: "High-intensity sprint training with recovery periods",
    alternativeExercises: ["hiit-training", "outdoor-running", "burpees"],
    isDeletable: false
  },
  {
    id: "trail-running",
    name: "Trail Running",
    category: "cardio",
    difficulty: "intermediate",
    muscleGroup: ["Legs", "Core"],
    equipment: ["None"],
    notes: "Running on natural terrain with elevation changes",
    alternativeExercises: ["outdoor-running", "hiking", "incline-walking"],
    isDeletable: false
  },
  {
    id: "road-cycling",
    name: "Road Cycling (Bici da Corsa)",
    category: "cardio",
    difficulty: "intermediate",
    muscleGroup: ["Legs", "Core"],
    equipment: ["Road Bike"],
    notes: "Cycling on paved roads at various speeds",
    alternativeExercises: ["stationary-bike", "spinning-bike", "outdoor-cycling"],
    isDeletable: false
  },
  {
    id: "mountain-biking",
    name: "Mountain Biking (MTB)",
    category: "cardio",
    difficulty: "advanced",
    muscleGroup: ["Legs", "Core", "Upper Body"],
    equipment: ["Mountain Bike"],
    notes: "Off-road cycling on trails with varying difficulty",
    alternativeExercises: ["road-cycling", "stationary-bike", "outdoor-cycling"],
    isDeletable: false
  },
  {
    id: "hiking",
    name: "Hiking (Escursionismo)",
    category: "cardio",
    difficulty: "beginner",
    muscleGroup: ["Legs", "Core"],
    equipment: ["None"],
    notes: "Walking on trails with elevation, often with backpack",
    alternativeExercises: ["incline-walking", "stair-climber", "trail-running"],
    isDeletable: false
  },
  {
    id: "outdoor-stairs",
    name: "Outdoor Stairs Running",
    category: "cardio",
    difficulty: "intermediate",
    muscleGroup: ["Legs", "Glutes", "Core"],
    equipment: ["None"],
    notes: "Running up outdoor stairs or stadium steps",
    alternativeExercises: ["stair-climber", "climbing-stairs", "stair-stepper"],
    isDeletable: false
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
export type { ExerciseData } from './types';

// Debug logging
console.log('Exercise Database loaded:', completeExerciseDatabase.length, 'exercises');
console.log('Sample exercise with alternatives:', completeExerciseDatabase.find(ex => ex.alternativeExercises && ex.alternativeExercises.length > 0));

// Category counts for verification
const categoryCounts = completeExerciseDatabase.reduce((acc, exercise) => {
  acc[exercise.category] = (acc[exercise.category] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
console.log('Exercise counts by category:', categoryCounts);
