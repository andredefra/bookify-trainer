export interface ExerciseData {
  id: string;
  name: string;
  category: string;
  muscleGroup: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  notes: string;
  videoUrl?: string;
  isCustom?: boolean;
  isModified?: boolean;
  primaryEquipment?: string;
  alternativeExercises?: string[];
}

export const exerciseDatabase: ExerciseData[] = [
  {
    id: "1",
    name: "Push-up",
    category: "chest",
    muscleGroup: ["chest", "triceps", "shoulders"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Start in plank position, lower chest to ground, push back up. Keep core tight throughout movement.",
    alternativeExercises: ["incline-push-up", "knee-push-up", "diamond-push-up"]
  },
  {
    id: "2",
    name: "Squat",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes", "hamstrings"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Stand with feet shoulder-width apart, lower hips back and down, keep chest up, return to standing.",
    alternativeExercises: ["goblet-squat", "wall-squat", "jump-squat"]
  },
  {
    id: "3",
    name: "Plank",
    category: "core",
    muscleGroup: ["core", "shoulders"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Hold straight line from head to heels, engage core, breathe normally.",
    alternativeExercises: ["knee-plank", "side-plank", "plank-up-down"]
  },
  {
    id: "4",
    name: "Lunges",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes", "hamstrings"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Step forward, lower back knee toward ground, push back to starting position. Alternate legs.",
    alternativeExercises: ["reverse-lunge", "lateral-lunge", "walking-lunge"]
  },
  {
    id: "5",
    name: "Burpees",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Squat down, jump back to plank, do push-up, jump feet to hands, jump up with arms overhead.",
    alternativeExercises: ["half-burpee", "burpee-without-pushup", "mountain-climber"]
  },
  {
    id: "6",
    name: "Mountain Climbers",
    category: "cardio",
    muscleGroup: ["core", "shoulders", "legs"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Start in plank position, alternate bringing knees to chest rapidly while maintaining plank form.",
    alternativeExercises: ["high-knees", "running-in-place", "plank-jacks"]
  },
  {
    id: "7",
    name: "Jumping Jacks",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Jump feet apart while raising arms overhead, jump back to starting position.",
    alternativeExercises: ["step-touch", "arm-circles", "marching-in-place"]
  },
  {
    id: "8",
    name: "Tricep Dips",
    category: "arms",
    muscleGroup: ["triceps", "shoulders"],
    equipment: ["chair", "bench"],
    difficulty: "intermediate",
    notes: "Sit on edge of chair, hands beside hips, lower body by bending elbows, push back up.",
    alternativeExercises: ["wall-push-up", "tricep-push-up", "overhead-press"]
  },
  {
    id: "9",
    name: "Crunches",
    category: "core",
    muscleGroup: ["core"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Lie on back, knees bent, hands behind head, lift shoulders off ground using core muscles.",
    alternativeExercises: ["sit-ups", "bicycle-crunches", "dead-bug"]
  },
  {
    id: "10",
    name: "High Knees",
    category: "cardio",
    muscleGroup: ["legs", "core"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Run in place bringing knees up to hip level, pump arms naturally.",
    alternativeExercises: ["marching-in-place", "butt-kicks", "jumping-jacks"]
  },
  {
    id: "11",
    name: "Bench Press",
    category: "chest",
    muscleGroup: ["chest", "triceps", "shoulders"],
    equipment: ["barbell", "bench"],
    difficulty: "intermediate",
    notes: "Lie on bench, grip bar slightly wider than shoulders, lower to chest, press up.",
    alternativeExercises: ["dumbbell-press", "push-up", "incline-press"]
  },
  {
    id: "12",
    name: "Deadlift",
    category: "back",
    muscleGroup: ["hamstrings", "glutes", "back", "traps"],
    equipment: ["barbell"],
    difficulty: "advanced",
    notes: "Stand with feet hip-width apart, grip bar, lift by extending hips and knees, keep back straight.",
    alternativeExercises: ["romanian-deadlift", "sumo-deadlift", "trap-bar-deadlift"]
  },
  {
    id: "13",
    name: "Pull-ups",
    category: "back",
    muscleGroup: ["lats", "biceps", "rhomboids"],
    equipment: ["pull-up bar"],
    difficulty: "advanced",
    notes: "Hang from bar with overhand grip, pull body up until chin clears bar, lower with control.",
    alternativeExercises: ["assisted-pull-up", "lat-pulldown", "inverted-rows"]
  },
  {
    id: "14",
    name: "Overhead Press",
    category: "shoulders",
    muscleGroup: ["shoulders", "triceps", "core"],
    equipment: ["barbell", "dumbbells"],
    difficulty: "intermediate",
    notes: "Stand with feet shoulder-width apart, press weight overhead, keep core engaged.",
    alternativeExercises: ["dumbbell-press", "pike-push-up", "handstand-push-up"]
  },
  {
    id: "15",
    name: "Rows",
    category: "back",
    muscleGroup: ["lats", "rhomboids", "biceps"],
    equipment: ["barbell", "dumbbells"],
    difficulty: "intermediate",
    notes: "Bend at hips, pull weight to lower chest/upper abdomen, squeeze shoulder blades together.",
    alternativeExercises: ["cable-row", "t-bar-row", "inverted-row"]
  },
  {
    id: "16",
    name: "Dumbbell Curls",
    category: "arms",
    muscleGroup: ["biceps"],
    equipment: ["dumbbells"],
    difficulty: "beginner",
    notes: "Stand with dumbbells at sides, curl weights up by flexing biceps, lower with control.",
    alternativeExercises: ["hammer-curls", "cable-curls", "resistance-band-curls"]
  },
  {
    id: "17",
    name: "Leg Press",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes"],
    equipment: ["leg press machine"],
    difficulty: "intermediate",
    notes: "Sit in machine, place feet on platform, lower weight by bending knees, press back up.",
    alternativeExercises: ["squat", "hack-squat", "goblet-squat"]
  },
  {
    id: "18",
    name: "Lat Pulldown",
    category: "back",
    muscleGroup: ["lats", "biceps", "rhomboids"],
    equipment: ["cable machine"],
    difficulty: "intermediate",
    notes: "Sit at machine, grip bar wider than shoulders, pull down to upper chest, control the return.",
    alternativeExercises: ["pull-ups", "assisted-pull-up", "cable-row"]
  },
  {
    id: "19",
    name: "Leg Curls",
    category: "legs",
    muscleGroup: ["hamstrings"],
    equipment: ["leg curl machine"],
    difficulty: "beginner",
    notes: "Lie face down, curl heels toward glutes by flexing hamstrings, lower with control.",
    alternativeExercises: ["romanian-deadlift", "good-mornings", "glute-ham-raise"]
  },
  {
    id: "20",
    name: "Calf Raises",
    category: "legs",
    muscleGroup: ["calves"],
    equipment: ["bodyweight", "dumbbells"],
    difficulty: "beginner",
    notes: "Stand on balls of feet, raise up onto toes, lower with control. Can add weight for resistance.",
    alternativeExercises: ["seated-calf-raise", "single-leg-calf-raise", "jump-rope"]
  },
  {
    id: "21",
    name: "Incline Bench Press",
    category: "chest",
    muscleGroup: ["upper chest", "triceps", "shoulders"],
    equipment: ["barbell", "incline bench"],
    difficulty: "intermediate",
    notes: "Set bench to 30-45 degree incline, press weight from chest level to arms extended.",
    alternativeExercises: ["incline-dumbbell-press", "incline-push-up", "pike-push-up"]
  },
  {
    id: "22",
    name: "Decline Bench Press",
    category: "chest",
    muscleGroup: ["lower chest", "triceps"],
    equipment: ["barbell", "decline bench"],
    difficulty: "intermediate",
    notes: "Set bench to decline position, press weight from chest to arms extended, control the descent.",
    alternativeExercises: ["decline-dumbbell-press", "dips", "decline-push-up"]
  },
  {
    id: "23",
    name: "Dumbbell Flyes",
    category: "chest",
    muscleGroup: ["chest"],
    equipment: ["dumbbells", "bench"],
    difficulty: "intermediate",
    notes: "Lie on bench, arms extended with slight bend, lower weights in arc motion, squeeze chest to return.",
    alternativeExercises: ["cable-flyes", "pec-deck", "push-up-variations"]
  },
  {
    id: "24",
    name: "Shoulder Shrugs",
    category: "shoulders",
    muscleGroup: ["traps"],
    equipment: ["dumbbells", "barbell"],
    difficulty: "beginner",
    notes: "Hold weights at sides, lift shoulders straight up toward ears, hold briefly, lower slowly.",
    alternativeExercises: ["upright-rows", "face-pulls", "reverse-flyes"]
  },
  {
    id: "25",
    name: "Lateral Raises",
    category: "shoulders",
    muscleGroup: ["side delts"],
    equipment: ["dumbbells"],
    difficulty: "beginner",
    notes: "Stand with weights at sides, raise arms out to sides until parallel to floor, lower slowly.",
    alternativeExercises: ["cable-lateral-raise", "resistance-band-raise", "upright-rows"]
  },
  {
    id: "26",
    name: "Front Raises",
    category: "shoulders",
    muscleGroup: ["front delts"],
    equipment: ["dumbbells"],
    difficulty: "beginner",
    notes: "Hold weights in front of thighs, raise one or both arms forward to shoulder height.",
    alternativeExercises: ["cable-front-raise", "plate-raise", "pike-push-up"]
  },
  {
    id: "27",
    name: "Rear Delt Flyes",
    category: "shoulders",
    muscleGroup: ["rear delts", "rhomboids"],
    equipment: ["dumbbells"],
    difficulty: "intermediate",
    notes: "Bend forward at hips, arms hanging down, raise weights out to sides squeezing shoulder blades.",
    alternativeExercises: ["cable-reverse-flye", "face-pulls", "band-pull-aparts"]
  },
  {
    id: "28",
    name: "Tricep Extensions",
    category: "arms",
    muscleGroup: ["triceps"],
    equipment: ["dumbbells", "cable"],
    difficulty: "beginner",
    notes: "Hold weight overhead, lower behind head by bending elbows, extend back to start position.",
    alternativeExercises: ["tricep-dips", "close-grip-push-up", "diamond-push-up"]
  },
  {
    id: "29",
    name: "Hammer Curls",
    category: "arms",
    muscleGroup: ["biceps", "forearms"],
    equipment: ["dumbbells"],
    difficulty: "beginner",
    notes: "Hold dumbbells with neutral grip, curl up keeping palms facing each other throughout movement.",
    alternativeExercises: ["regular-curls", "cable-hammer-curls", "resistance-band-curls"]
  },
  {
    id: "30",
    name: "Preacher Curls",
    category: "arms",
    muscleGroup: ["biceps"],
    equipment: ["preacher bench", "barbell"],
    difficulty: "intermediate",
    notes: "Sit at preacher bench, arms over pad, curl weight up focusing on bicep contraction.",
    alternativeExercises: ["concentration-curls", "cable-curls", "incline-curls"]
  },
  {
    id: "31",
    name: "Close-Grip Bench Press",
    category: "arms",
    muscleGroup: ["triceps", "chest"],
    equipment: ["barbell", "bench"],
    difficulty: "intermediate",
    notes: "Grip bar with hands closer than shoulder-width, press focusing on tricep engagement.",
    alternativeExercises: ["diamond-push-up", "tricep-dips", "overhead-press"]
  },
  {
    id: "32",
    name: "Upright Rows",
    category: "shoulders",
    muscleGroup: ["traps", "side delts"],
    equipment: ["barbell", "dumbbells"],
    difficulty: "intermediate",
    notes: "Hold weight with narrow grip, pull straight up to chest level, elbows leading the movement.",
    alternativeExercises: ["lateral-raises", "face-pulls", "high-pulls"]
  },
  {
    id: "33",
    name: "Face Pulls",
    category: "shoulders",
    muscleGroup: ["rear delts", "rhomboids", "traps"],
    equipment: ["cable machine"],
    difficulty: "intermediate",
    notes: "Pull cable to face level, separate hands at face, focus on squeezing shoulder blades together.",
    alternativeExercises: ["rear-delt-flyes", "band-pull-aparts", "reverse-flyes"]
  },
  {
    id: "34",
    name: "Cable Crossovers",
    category: "chest",
    muscleGroup: ["chest"],
    equipment: ["cable machine"],
    difficulty: "intermediate",
    notes: "Stand between cable towers, bring handles together in front of chest in hugging motion.",
    alternativeExercises: ["dumbbell-flyes", "pec-deck", "push-ups"]
  },
  {
    id: "35",
    name: "T-Bar Rows",
    category: "back",
    muscleGroup: ["lats", "rhomboids", "traps"],
    equipment: ["t-bar", "plates"],
    difficulty: "intermediate",
    notes: "Straddle T-bar, bend at hips, pull weight to lower chest, squeeze shoulder blades together.",
    alternativeExercises: ["barbell-rows", "cable-rows", "dumbbell-rows"]
  },
  {
    id: "36",
    name: "Cable Rows",
    category: "back",
    muscleGroup: ["lats", "rhomboids", "biceps"],
    equipment: ["cable machine"],
    difficulty: "intermediate",
    notes: "Sit at cable machine, pull handle to lower chest/upper abdomen, squeeze shoulder blades.",
    alternativeExercises: ["barbell-rows", "t-bar-rows", "dumbbell-rows"]
  },
  {
    id: "37",
    name: "One-Arm Dumbbell Rows",
    category: "back",
    muscleGroup: ["lats", "rhomboids", "biceps"],
    equipment: ["dumbbell", "bench"],
    difficulty: "intermediate",
    notes: "Support body with one hand on bench, row dumbbell to hip with other arm, alternate sides.",
    alternativeExercises: ["cable-rows", "barbell-rows", "inverted-rows"]
  },
  {
    id: "38",
    name: "Hyperextensions",
    category: "back",
    muscleGroup: ["lower back", "glutes"],
    equipment: ["hyperextension bench"],
    difficulty: "intermediate",
    notes: "Lie face down on bench, lower upper body, raise back up using lower back muscles.",
    alternativeExercises: ["good-mornings", "superman", "reverse-plank"]
  },
  {
    id: "39",
    name: "Good Mornings",
    category: "back",
    muscleGroup: ["lower back", "hamstrings", "glutes"],
    equipment: ["barbell"],
    difficulty: "advanced",
    notes: "Bar on shoulders, bend forward at hips keeping back straight, return to upright position.",
    alternativeExercises: ["romanian-deadlift", "hyperextensions", "hip-hinge"]
  },
  {
    id: "40",
    name: "Romanian Deadlifts",
    category: "legs",
    muscleGroup: ["hamstrings", "glutes", "lower back"],
    equipment: ["barbell", "dumbbells"],
    difficulty: "intermediate",
    notes: "Hold weight, hinge at hips lowering weight while keeping legs relatively straight, return to standing.",
    alternativeExercises: ["stiff-leg-deadlift", "good-mornings", "glute-ham-raise"]
  },
  {
    id: "41",
    name: "Sumo Deadlifts",
    category: "legs",
    muscleGroup: ["glutes", "hamstrings", "quadriceps"],
    equipment: ["barbell"],
    difficulty: "advanced",
    notes: "Wide stance, toes pointed out, grip bar inside legs, lift by extending hips and knees.",
    alternativeExercises: ["conventional-deadlift", "trap-bar-deadlift", "goblet-squat"]
  },
  {
    id: "42",
    name: "Front Squats",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes", "core"],
    equipment: ["barbell"],
    difficulty: "advanced",
    notes: "Bar rests on front of shoulders, squat down keeping chest up and elbows high.",
    alternativeExercises: ["back-squat", "goblet-squat", "hack-squat"]
  },
  {
    id: "43",
    name: "Back Squats",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes", "hamstrings"],
    equipment: ["barbell", "squat rack"],
    difficulty: "intermediate",
    notes: "Bar on upper back, feet shoulder-width apart, squat down and drive through heels to stand.",
    alternativeExercises: ["front-squat", "goblet-squat", "leg-press"]
  },
  {
    id: "44",
    name: "Hack Squats",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes"],
    equipment: ["hack squat machine"],
    difficulty: "intermediate",
    notes: "Stand in machine with back against pad, squat down and press through heels to return.",
    alternativeExercises: ["leg-press", "back-squat", "goblet-squat"]
  },
  {
    id: "45",
    name: "Bulgarian Split Squats",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes"],
    equipment: ["bench", "dumbbells"],
    difficulty: "intermediate",
    notes: "Rear foot elevated on bench, lunge down on front leg, drive through heel to return.",
    alternativeExercises: ["lunges", "step-ups", "single-leg-squat"]
  },
  {
    id: "46",
    name: "Walking Lunges",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes", "hamstrings"],
    equipment: ["bodyweight", "dumbbells"],
    difficulty: "intermediate",
    notes: "Step forward into lunge, bring back leg forward into next lunge, continue walking pattern.",
    alternativeExercises: ["stationary-lunges", "reverse-lunges", "lateral-lunges"]
  },
  {
    id: "47",
    name: "Step-Ups",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes"],
    equipment: ["box", "bench"],
    difficulty: "beginner",
    notes: "Step up onto box with one foot, drive through heel, step down with control, alternate legs.",
    alternativeExercises: ["box-jumps", "lunges", "single-leg-squat"]
  },
  {
    id: "48",
    name: "Box Jumps",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes", "calves"],
    equipment: ["box"],
    difficulty: "intermediate",
    notes: "Jump up onto box landing softly, step down with control, focus on landing mechanics.",
    alternativeExercises: ["step-ups", "jump-squats", "broad-jumps"]
  },
  {
    id: "49",
    name: "Leg Extensions",
    category: "legs",
    muscleGroup: ["quadriceps"],
    equipment: ["leg extension machine"],
    difficulty: "beginner",
    notes: "Sit in machine, extend legs by straightening knees, lower with control, focus on quad contraction.",
    alternativeExercises: ["squats", "lunges", "wall-sit"]
  },
  {
    id: "50",
    name: "Stiff-Leg Deadlifts",
    category: "legs",
    muscleGroup: ["hamstrings", "glutes"],
    equipment: ["barbell", "dumbbells"],
    difficulty: "intermediate",
    notes: "Keep legs straight, hinge at hips lowering weight, feel stretch in hamstrings, return to standing.",
    alternativeExercises: ["romanian-deadlift", "good-mornings", "leg-curls"]
  },
  {
    id: "51",
    name: "Glute Ham Raises",
    category: "legs",
    muscleGroup: ["hamstrings", "glutes"],
    equipment: ["glute ham developer"],
    difficulty: "advanced",
    notes: "Kneel on pad, lower body forward, use hamstrings and glutes to return to starting position.",
    alternativeExercises: ["leg-curls", "romanian-deadlift", "good-mornings"]
  },
  {
    id: "52",
    name: "Hip Thrusts",
    category: "legs",
    muscleGroup: ["glutes", "hamstrings"],
    equipment: ["bench", "barbell"],
    difficulty: "intermediate",
    notes: "Upper back on bench, drive hips up squeezing glutes at top, lower with control.",
    alternativeExercises: ["glute-bridges", "romanian-deadlift", "squats"]
  },
  {
    id: "53",
    name: "Glute Bridges",
    category: "legs",
    muscleGroup: ["glutes", "hamstrings"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Lie on back, knees bent, drive hips up squeezing glutes, hold briefly, lower slowly.",
    alternativeExercises: ["hip-thrusts", "single-leg-glute-bridge", "clamshells"]
  },
  {
    id: "54",
    name: "Single-Leg Glute Bridges",
    category: "legs",
    muscleGroup: ["glutes", "hamstrings"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Lie on back, one leg extended, drive up through planted heel, alternate legs.",
    alternativeExercises: ["glute-bridges", "hip-thrusts", "single-leg-deadlift"]
  },
  {
    id: "55",
    name: "Clamshells",
    category: "legs",
    muscleGroup: ["glutes"],
    equipment: ["resistance band"],
    difficulty: "beginner",
    notes: "Lie on side, knees bent, lift top knee while keeping feet together, focus on glute activation.",
    alternativeExercises: ["side-lying-leg-lifts", "monster-walks", "lateral-band-walks"]
  },
  {
    id: "56",
    name: "Monster Walks",
    category: "legs",
    muscleGroup: ["glutes", "hip abductors"],
    equipment: ["resistance band"],
    difficulty: "beginner",
    notes: "Band around ankles, maintain squat position, step sideways maintaining tension in band.",
    alternativeExercises: ["lateral-band-walks", "clamshells", "side-steps"]
  },
  {
    id: "57",
    name: "Wall Sits",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes"],
    equipment: ["wall"],
    difficulty: "beginner",
    notes: "Back against wall, slide down to squat position, hold position, keep knees at 90 degrees.",
    alternativeExercises: ["squats", "leg-extensions", "isometric-squat"]
  },
  {
    id: "58",
    name: "Single-Leg Deadlifts",
    category: "legs",
    muscleGroup: ["hamstrings", "glutes", "core"],
    equipment: ["dumbbells"],
    difficulty: "intermediate",
    notes: "Stand on one leg, hinge at hip lowering weight, maintain balance, alternate legs.",
    alternativeExercises: ["romanian-deadlift", "single-leg-glute-bridge", "balance-exercises"]
  },
  {
    id: "59",
    name: "Pistol Squats",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes"],
    equipment: ["bodyweight"],
    difficulty: "advanced",
    notes: "Single-leg squat, other leg extended forward, requires significant strength and balance.",
    alternativeExercises: ["assisted-pistol-squat", "single-leg-squat", "bulgarian-split-squat"]
  },
  {
    id: "60",
    name: "Jump Squats",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes", "calves"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Perform squat, explode up into jump, land softly and immediately go into next squat.",
    alternativeExercises: ["squats", "box-jumps", "broad-jumps"]
  },
  {
    id: "61",
    name: "Russian Twists",
    category: "core",
    muscleGroup: ["obliques", "core"],
    equipment: ["bodyweight", "medicine ball"],
    difficulty: "intermediate",
    notes: "Sit with knees bent, lean back slightly, rotate torso side to side, can add weight for resistance.",
    alternativeExercises: ["bicycle-crunches", "side-plank", "wood-chops"]
  },
  {
    id: "62",
    name: "Bicycle Crunches",
    category: "core",
    muscleGroup: ["obliques", "core"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Lie on back, alternate bringing elbow to opposite knee in cycling motion.",
    alternativeExercises: ["russian-twists", "mountain-climbers", "cross-crunches"]
  },
  {
    id: "63",
    name: "Dead Bug",
    category: "core",
    muscleGroup: ["core", "hip flexors"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Lie on back, arms up, knees bent at 90°, lower opposite arm and leg, return to start.",
    alternativeExercises: ["bird-dog", "plank", "hollow-hold"]
  },
  {
    id: "64",
    name: "Bird Dog",
    category: "core",
    muscleGroup: ["core", "glutes", "back"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Start on hands and knees, extend opposite arm and leg, hold, return to start, alternate.",
    alternativeExercises: ["dead-bug", "superman", "plank"]
  },
  {
    id: "65",
    name: "Superman",
    category: "back",
    muscleGroup: ["lower back", "glutes"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Lie face down, lift chest and legs off ground simultaneously, hold briefly, lower slowly.",
    alternativeExercises: ["bird-dog", "hyperextensions", "reverse-plank"]
  },
  {
    id: "66",
    name: "Side Plank",
    category: "core",
    muscleGroup: ["obliques", "core"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Lie on side, prop up on elbow, lift hips creating straight line from head to feet.",
    alternativeExercises: ["modified-side-plank", "russian-twists", "lateral-raises"]
  },
  {
    id: "67",
    name: "Hollow Hold",
    category: "core",
    muscleGroup: ["core"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Lie on back, press lower back to floor, lift shoulders and legs, hold hollow position.",
    alternativeExercises: ["dead-bug", "plank", "v-ups"]
  },
  {
    id: "68",
    name: "V-Ups",
    category: "core",
    muscleGroup: ["core", "hip flexors"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Lie on back, simultaneously lift legs and torso to form V shape, lower with control.",
    alternativeExercises: ["sit-ups", "hollow-hold", "leg-raises"]
  },
  {
    id: "69",
    name: "Leg Raises",
    category: "core",
    muscleGroup: ["lower abs", "hip flexors"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Lie on back, lift straight legs to 90°, lower slowly without touching ground.",
    alternativeExercises: ["knee-raises", "reverse-crunches", "dead-bug"]
  },
  {
    id: "70",
    name: "Hanging Leg Raises",
    category: "core",
    muscleGroup: ["core", "hip flexors"],
    equipment: ["pull-up bar"],
    difficulty: "advanced",
    notes: "Hang from bar, lift legs to 90° or higher, lower with control, avoid swinging.",
    alternativeExercises: ["leg-raises", "knee-raises", "v-ups"]
  },
  {
    id: "71",
    name: "Knee Raises",
    category: "core",
    muscleGroup: ["lower abs", "hip flexors"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Lie on back, bring knees to chest, lower slowly, easier variation of leg raises.",
    alternativeExercises: ["leg-raises", "reverse-crunches", "dead-bug"]
  },
  {
    id: "72",
    name: "Reverse Crunches",
    category: "core",
    muscleGroup: ["lower abs"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Lie on back, knees bent, lift hips off ground bringing knees toward chest.",
    alternativeExercises: ["knee-raises", "leg-raises", "v-ups"]
  },
  {
    id: "73",
    name: "Wood Chops",
    category: "core",
    muscleGroup: ["obliques", "core"],
    equipment: ["medicine ball", "cable"],
    difficulty: "intermediate",
    notes: "Hold weight, rotate from high to low across body, engage core throughout movement.",
    alternativeExercises: ["russian-twists", "cable-twists", "medicine-ball-slams"]
  },
  {
    id: "74",
    name: "Plank Up-Downs",
    category: "core",
    muscleGroup: ["core", "shoulders", "triceps"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Start in plank, lower to forearms one arm at a time, return to plank position.",
    alternativeExercises: ["plank", "push-ups", "mountain-climbers"]
  },
  {
    id: "75",
    name: "Plank Jacks",
    category: "core",
    muscleGroup: ["core", "shoulders"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Hold plank position, jump feet apart and together like jumping jacks.",
    alternativeExercises: ["mountain-climbers", "plank", "jumping-jacks"]
  },
  {
    id: "76",
    name: "Bear Crawls",
    category: "core",
    muscleGroup: ["core", "shoulders", "legs"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Start on hands and knees, lift knees slightly, crawl forward maintaining position.",
    alternativeExercises: ["mountain-climbers", "plank", "crab-walks"]
  },
  {
    id: "77",
    name: "Crab Walks",
    category: "core",
    muscleGroup: ["core", "triceps", "glutes"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Sit with hands behind you, lift hips, walk backward and forward in crab position.",
    alternativeExercises: ["bear-crawls", "tricep-dips", "glute-bridges"]
  },
  {
    id: "78",
    name: "Turkish Get-Ups",
    category: "core",
    muscleGroup: ["core", "shoulders", "legs"],
    equipment: ["kettlebell", "dumbbell"],
    difficulty: "advanced",
    notes: "Complex movement from lying to standing while holding weight overhead, requires practice.",
    alternativeExercises: ["overhead-press", "single-arm-press", "core-stability"]
  },
  {
    id: "79",
    name: "Farmer's Walks",
    category: "core",
    muscleGroup: ["core", "traps", "forearms"],
    equipment: ["dumbbells", "kettlebells"],
    difficulty: "intermediate",
    notes: "Hold heavy weights at sides, walk maintaining good posture, engages entire core.",
    alternativeExercises: ["suitcase-carry", "overhead-carry", "plank"]
  },
  {
    id: "80",
    name: "Suitcase Carry",
    category: "core",
    muscleGroup: ["core", "obliques"],
    equipment: ["dumbbell", "kettlebell"],
    difficulty: "intermediate",
    notes: "Hold weight in one hand, walk maintaining upright posture, resist lateral bending.",
    alternativeExercises: ["farmers-walk", "side-plank", "single-arm-row"]
  },
  {
    id: "81",
    name: "Kettlebell Swings",
    category: "cardio",
    muscleGroup: ["glutes", "hamstrings", "core"],
    equipment: ["kettlebell"],
    difficulty: "intermediate",
    notes: "Hip hinge movement, swing kettlebell to shoulder height using hip drive, not arms.",
    alternativeExercises: ["hip-thrusts", "romanian-deadlift", "jump-squats"]
  },
  {
    id: "82",
    name: "Kettlebell Goblet Squats",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes"],
    equipment: ["kettlebell"],
    difficulty: "beginner",
    notes: "Hold kettlebell at chest, squat down keeping chest up, easier to maintain form than back squat.",
    alternativeExercises: ["bodyweight-squat", "front-squat", "dumbbell-squat"]
  },
  {
    id: "83",
    name: "Kettlebell Turkish Get-Up",
    category: "core",
    muscleGroup: ["core", "shoulders", "legs"],
    equipment: ["kettlebell"],
    difficulty: "advanced",
    notes: "Complex movement pattern from lying to standing with kettlebell overhead.",
    alternativeExercises: ["turkish-get-up", "overhead-press", "core-stability"]
  },
  {
    id: "84",
    name: "Kettlebell Clean and Press",
    category: "shoulders",
    muscleGroup: ["shoulders", "core", "legs"],
    equipment: ["kettlebell"],
    difficulty: "advanced",
    notes: "Clean kettlebell to shoulder, then press overhead, full body explosive movement.",
    alternativeExercises: ["overhead-press", "push-press", "clean-and-jerk"]
  },
  {
    id: "85",
    name: "Kettlebell Snatches",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["kettlebell"],
    difficulty: "advanced",
    notes: "Explosive movement from floor to overhead in one motion, requires technique practice.",
    alternativeExercises: ["kettlebell-swings", "clean-and-press", "high-pulls"]
  },
  {
    id: "86",
    name: "Battle Ropes",
    category: "cardio",
    muscleGroup: ["arms", "core", "shoulders"],
    equipment: ["battle ropes"],
    difficulty: "intermediate",
    notes: "Alternate arm waves, spirals, or slams with heavy ropes, great cardio workout.",
    alternativeExercises: ["mountain-climbers", "burpees", "high-intensity-intervals"]
  },
  {
    id: "87",
    name: "Medicine Ball Slams",
    category: "cardio",
    muscleGroup: ["core", "shoulders", "legs"],
    equipment: ["medicine ball"],
    difficulty: "intermediate",
    notes: "Lift ball overhead, slam down with full force, pick up and repeat, explosive movement.",
    alternativeExercises: ["burpees", "wood-chops", "overhead-press"]
  },
  {
    id: "88",
    name: "Medicine Ball Wall Throws",
    category: "cardio",
    muscleGroup: ["chest", "core", "legs"],
    equipment: ["medicine ball", "wall"],
    difficulty: "intermediate",
    notes: "Throw ball against wall from chest, catch and immediately throw again, explosive power.",
    alternativeExercises: ["push-ups", "chest-pass", "medicine-ball-slams"]
  },
  {
    id: "89",
    name: "Box Step-Ups",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes"],
    equipment: ["box", "bench"],
    difficulty: "beginner",
    notes: "Step up onto box with control, step down slowly, focus on the working leg.",
    alternativeExercises: ["lunges", "step-ups", "single-leg-squat"]
  },
  {
    id: "90",
    name: "Broad Jumps",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes", "calves"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Jump forward as far as possible, land softly, focus on distance and landing mechanics.",
    alternativeExercises: ["box-jumps", "jump-squats", "long-jumps"]
  },
  {
    id: "91",
    name: "Lateral Bounds",
    category: "legs",
    muscleGroup: ["glutes", "hip abductors", "calves"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Jump sideways from one foot to the other, focus on lateral power and stability.",
    alternativeExercises: ["lateral-lunges", "side-steps", "skater-hops"]
  },
  {
    id: "92",
    name: "Single-Leg Hops",
    category: "legs",
    muscleGroup: ["calves", "quadriceps", "glutes"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Hop on one leg forward, backward, or in place, challenges balance and power.",
    alternativeExercises: ["calf-raises", "single-leg-squat", "balance-exercises"]
  },
  {
    id: "93",
    name: "Depth Jumps",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes", "calves"],
    equipment: ["box"],
    difficulty: "advanced",
    notes: "Step off box, land and immediately jump up, focuses on reactive strength.",
    alternativeExercises: ["box-jumps", "jump-squats", "plyometric-exercises"]
  },
  {
    id: "94",
    name: "Tuck Jumps",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes", "core"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Jump up bringing knees to chest, land softly, explosive vertical movement.",
    alternativeExercises: ["jump-squats", "box-jumps", "knee-raises"]
  },
  {
    id: "95",
    name: "Split Jump Lunges",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Start in lunge position, jump and switch legs in air, land in opposite lunge.",
    alternativeExercises: ["lunges", "jump-squats", "alternating-lunges"]
  },
  {
    id: "96",
    name: "Skater Hops",
    category: "cardio",
    muscleGroup: ["glutes", "legs", "core"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Hop side to side on one foot, mimicking skating motion, challenges lateral stability.",
    alternativeExercises: ["lateral-bounds", "lateral-lunges", "side-steps"]
  },
  {
    id: "97",
    name: "Burpee Box Jumps",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["box"],
    difficulty: "advanced",
    notes: "Perform burpee, then jump onto box, step down, repeat, combines cardio and power.",
    alternativeExercises: ["burpees", "box-jumps", "mountain-climbers"]
  },
  {
    id: "98",
    name: "Thrusters",
    category: "cardio",
    muscleGroup: ["legs", "shoulders", "core"],
    equipment: ["dumbbells", "barbell"],
    difficulty: "intermediate",
    notes: "Squat down, drive up and press weight overhead in one fluid movement.",
    alternativeExercises: ["squat-to-press", "overhead-press", "front-squat"]
  },
  {
    id: "99",
    name: "Man Makers",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["dumbbells"],
    difficulty: "advanced",
    notes: "Burpee with dumbbells, add rows at bottom, press overhead at top, full body exercise.",
    alternativeExercises: ["burpees", "thrusters", "renegade-rows"]
  },
  {
    id: "100",
    name: "Renegade Rows",
    category: "back",
    muscleGroup: ["back", "core", "shoulders"],
    equipment: ["dumbbells"],
    difficulty: "advanced",
    notes: "Plank position with dumbbells, alternate rowing each arm while maintaining plank.",
    alternativeExercises: ["plank", "dumbbell-rows", "mountain-climbers"]
  },
  {
    id: "101",
    name: "Devil's Press",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["dumbbells"],
    difficulty: "advanced",
    notes: "Burpee with dumbbells, swing weights overhead at top, extremely challenging full body movement.",
    alternativeExercises: ["man-makers", "thrusters", "burpees"]
  },
  {
    id: "102",
    name: "Wall Balls",
    category: "cardio",
    muscleGroup: ["legs", "shoulders", "core"],
    equipment: ["medicine ball", "wall"],
    difficulty: "intermediate",
    notes: "Squat with medicine ball, drive up and throw ball to target on wall, catch and repeat.",
    alternativeExercises: ["thrusters", "squat-to-press", "medicine-ball-throws"]
  },
  {
    id: "103",
    name: "Assault Bike",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["assault bike"],
    difficulty: "intermediate",
    notes: "Full body cardio machine, arms and legs work together, adjustable intensity.",
    alternativeExercises: ["rowing-machine", "burpees", "mountain-climbers"]
  },
  {
    id: "104",
    name: "Rowing Machine",
    category: "cardio",
    muscleGroup: ["back", "legs", "core"],
    equipment: ["rowing machine"],
    difficulty: "intermediate",
    notes: "Full body cardio, drive with legs, pull with arms, great for endurance and strength.",
    alternativeExercises: ["assault-bike", "swimming", "cable-rows"]
  },
  {
    id: "105",
    name: "Treadmill Running",
    category: "cardio",
    muscleGroup: ["legs", "core"],
    equipment: ["treadmill"],
    difficulty: "beginner",
    notes: "Adjustable speed and incline, great for steady state or interval cardio training.",
    alternativeExercises: ["outdoor-running", "elliptical", "stationary-bike"]
  },
  {
    id: "106",
    name: "Elliptical",
    category: "cardio",
    muscleGroup: ["legs", "arms"],
    equipment: ["elliptical machine"],
    difficulty: "beginner",
    notes: "Low impact cardio machine, works both upper and lower body, joint-friendly option.",
    alternativeExercises: ["treadmill", "stationary-bike", "rowing-machine"]
  },
  {
    id: "107",
    name: "Stationary Bike",
    category: "cardio",
    muscleGroup: ["legs"],
    equipment: ["stationary bike"],
    difficulty: "beginner",
    notes: "Low impact cardio focusing on legs, adjustable resistance, good for all fitness levels.",
    alternativeExercises: ["outdoor-cycling", "elliptical", "treadmill"]
  },
  {
    id: "108",
    name: "Stair Climber",
    category: "cardio",
    muscleGroup: ["legs", "glutes"],
    equipment: ["stair climber"],
    difficulty: "intermediate",
    notes: "Simulates stair climbing, great for leg strength and cardio endurance.",
    alternativeExercises: ["step-ups", "treadmill-incline", "box-steps"]
  },
  {
    id: "109",
    name: "Jacob's Ladder",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["jacobs ladder"],
    difficulty: "advanced",
    notes: "Climbing motion on angled ladder, self-paced, extremely challenging full body cardio.",
    alternativeExercises: ["mountain-climbers", "bear-crawls", "stair-climber"]
  },
  {
    id: "110",
    name: "Ski Erg",
    category: "cardio",
    muscleGroup: ["arms", "core", "back"],
    equipment: ["ski erg"],
    difficulty: "intermediate",
    notes: "Simulates cross-country skiing motion, great upper body and core cardio workout.",
    alternativeExercises: ["rowing-machine", "battle-ropes", "pull-ups"]
  },
  {
    id: "111",
    name: "Swimming",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["pool"],
    difficulty: "intermediate",
    notes: "Full body, low impact cardio, excellent for all fitness levels, joint-friendly.",
    alternativeExercises: ["rowing-machine", "elliptical", "water-aerobics"]
  },
  {
    id: "112",
    name: "Water Aerobics",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["pool"],
    difficulty: "beginner",
    notes: "Low impact exercises in water, great for rehabilitation and joint-friendly workouts.",
    alternativeExercises: ["swimming", "elliptical", "chair-exercises"]
  },
  {
    id: "113",
    name: "Yoga Flow",
    category: "flexibility",
    muscleGroup: ["full body"],
    equipment: ["yoga mat"],
    difficulty: "beginner",
    notes: "Flowing sequence of yoga poses, improves flexibility, balance, and mindfulness.",
    alternativeExercises: ["static-stretching", "pilates", "tai-chi"]
  },
  {
    id: "114",
    name: "Pilates",
    category: "core",
    muscleGroup: ["core", "full body"],
    equipment: ["mat", "pilates equipment"],
    difficulty: "intermediate",
    notes: "Focus on core strength, flexibility, and body awareness through controlled movements.",
    alternativeExercises: ["yoga", "core-exercises", "bodyweight-training"]
  },
  {
    id: "115",
    name: "Tai Chi",
    category: "flexibility",
    muscleGroup: ["full body"],
    equipment: ["none"],
    difficulty: "beginner",
    notes: "Slow, flowing movements that improve balance, flexibility, and mental focus.",
    alternativeExercises: ["yoga", "qigong", "gentle-stretching"]
  },
  {
    id: "116",
    name: "Foam Rolling",
    category: "recovery",
    muscleGroup: ["full body"],
    equipment: ["foam roller"],
    difficulty: "beginner",
    notes: "Self-myofascial release technique to improve muscle recovery and flexibility.",
    alternativeExercises: ["massage", "stretching", "lacrosse-ball-massage"]
  },
  {
    id: "117",
    name: "Dynamic Warm-up",
    category: "warm-up",
    muscleGroup: ["full body"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Movement-based warm-up to prepare body for exercise, includes leg swings, arm circles, etc.",
    alternativeExercises: ["light-cardio", "static-stretching", "joint-mobility"]
  },
  {
    id: "118",
    name: "Static Stretching",
    category: "flexibility",
    muscleGroup: ["full body"],
    equipment: ["none"],
    difficulty: "beginner",
    notes: "Hold stretches for 15-30 seconds, best performed after workouts when muscles are warm.",
    alternativeExercises: ["dynamic-stretching", "yoga", "pnf-stretching"]
  },
  {
    id: "119",
    name: "Mobility Work",
    category: "flexibility",
    muscleGroup: ["joints"],
    equipment: ["none"],
    difficulty: "beginner",
    notes: "Joint-specific movements to improve range of motion and movement quality.",
    alternativeExercises: ["dynamic-warm-up", "yoga", "stretching"]
  },
  {
    id: "120",
    name: "Balance Training",
    category: "balance",
    muscleGroup: ["core", "stabilizers"],
    equipment: ["balance board", "bosu ball"],
    difficulty: "intermediate",
    notes: "Exercises to improve proprioception and stability, important for injury prevention.",
    alternativeExercises: ["single-leg-stands", "yoga", "stability-ball-exercises"]
  },
  {
    id: "121",
    name: "Resistance Band Exercises",
    category: "strength",
    muscleGroup: ["full body"],
    equipment: ["resistance bands"],
    difficulty: "beginner",
    notes: "Versatile equipment for strength training, good for travel and home workouts.",
    alternativeExercises: ["bodyweight-exercises", "light-weights", "cable-exercises"]
  },
  {
    id: "122",
    name: "Suspension Training",
    category: "strength",
    muscleGroup: ["full body"],
    equipment: ["suspension trainer"],
    difficulty: "intermediate",
    notes: "Bodyweight exercises using suspension straps, adjustable difficulty by changing body angle.",
    alternativeExercises: ["bodyweight-training", "cable-exercises", "functional-training"]
  },
  {
    id: "123",
    name: "Functional Training",
    category: "strength",
    muscleGroup: ["full body"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Exercises that mimic real-life movements, improves daily activity performance.",
    alternativeExercises: ["compound-exercises", "bodyweight-training", "sport-specific-training"]
  },
  {
    id: "124",
    name: "Plyometric Training",
    category: "power",
    muscleGroup: ["legs", "full body"],
    equipment: ["bodyweight", "boxes"],
    difficulty: "advanced",
    notes: "Explosive movements to develop power and speed, includes jumps, bounds, and throws.",
    alternativeExercises: ["jump-training", "explosive-exercises", "sprint-training"]
  },
  {
    id: "125",
    name: "Agility Training",
    category: "agility",
    muscleGroup: ["legs", "core"],
    equipment: ["cones", "ladder"],
    difficulty: "intermediate",
    notes: "Quick directional changes and footwork patterns to improve coordination and speed.",
    alternativeExercises: ["cone-drills", "ladder-drills", "sport-specific-drills"]
  },
  {
    id: "126",
    name: "Sprint Training",
    category: "cardio",
    muscleGroup: ["legs", "core"],
    equipment: ["track", "field"],
    difficulty: "advanced",
    notes: "High-intensity running intervals to develop speed and anaerobic capacity.",
    alternativeExercises: ["interval-running", "hill-sprints", "bike-sprints"]
  },
  {
    id: "127",
    name: "Hill Training",
    category: "cardio",
    muscleGroup: ["legs", "glutes"],
    equipment: ["hills", "incline"],
    difficulty: "intermediate",
    notes: "Running or walking on inclines to build leg strength and cardiovascular endurance.",
    alternativeExercises: ["treadmill-incline", "stair-climbing", "step-ups"]
  },
  {
    id: "128",
    name: "Circuit Training",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Series of exercises performed in sequence with minimal rest, combines strength and cardio.",
    alternativeExercises: ["interval-training", "crosstraining", "bootcamp-style"]
  },
  {
    id: "129",
    name: "Tabata Training",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["various"],
    difficulty: "advanced",
    notes: "4-minute high-intensity protocol: 20 seconds work, 10 seconds rest, repeated 8 times.",
    alternativeExercises: ["hiit-training", "interval-training", "circuit-training"]
  },
  {
    id: "130",
    name: "HIIT Training",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "High-intensity intervals alternated with rest periods, efficient for fitness and fat loss.",
    alternativeExercises: ["tabata", "circuit-training", "interval-running"]
  },
  {
    id: "131",
    name: "Crosstraining",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Combining different types of exercise to improve overall fitness and prevent boredom.",
    alternativeExercises: ["circuit-training", "varied-workouts", "multi-sport-training"]
  },
  {
    id: "132",
    name: "Bootcamp Style",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Military-inspired group fitness combining cardio, strength, and agility exercises.",
    alternativeExercises: ["circuit-training", "hiit", "functional-training"]
  },
  {
    id: "133",
    name: "Outdoor Training",
    category: "cardio",
    muscleGroup: ["full body"],
    equipment: ["natural environment"],
    difficulty: "intermediate",
    notes: "Using outdoor environment for workouts: parks, beaches, trails, adds variety and fresh air.",
    alternativeExercises: ["gym-workouts", "home-workouts", "nature-activities"]
  },
  {
    id: "134",
    name: "Bodyweight Circuits",
    category: "strength",
    muscleGroup: ["full body"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Series of bodyweight exercises performed in circuit format, no equipment needed.",
    alternativeExercises: ["calisthenics", "circuit-training", "home-workouts"]
  },
  {
    id: "135",
    name: "Calisthenics",
    category: "strength",
    muscleGroup: ["full body"],
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    notes: "Bodyweight exercises focusing on strength, flexibility, and body control.",
    alternativeExercises: ["bodyweight-training", "gymnastics", "functional-movement"]
  },
  {
    id: "136",
    name: "Isometric Exercises",
    category: "strength",
    muscleGroup: ["various"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    notes: "Static holds that build strength without joint movement, like planks and wall sits.",
    alternativeExercises: ["static-holds", "strength-training", "rehabilitation-exercises"]
  },
  {
    id: "137",
    name: "Compound Movements",
    category: "strength",
    muscleGroup: ["multiple"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Exercises that work multiple muscle groups simultaneously, efficient and functional.",
    alternativeExercises: ["isolation-exercises", "functional-training", "full-body-workouts"]
  },
  {
    id: "138",
    name: "Isolation Exercises",
    category: "strength",
    muscleGroup: ["single"],
    equipment: ["various"],
    difficulty: "beginner",
    notes: "Exercises targeting specific muscle groups, good for addressing weaknesses or imbalances.",
    alternativeExercises: ["compound-movements", "targeted-training", "rehabilitation"]
  },
  {
    id: "139",
    name: "Progressive Overload",
    category: "strength",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Gradually increasing weight, reps, or intensity to continue making strength gains.",
    alternativeExercises: ["periodization", "strength-progression", "training-variation"]
  },
  {
    id: "140",
    name: "Periodization",
    category: "programming",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "advanced",
    notes: "Systematic planning of training phases to optimize performance and prevent plateaus.",
    alternativeExercises: ["linear-progression", "block-periodization", "undulating-periodization"]
  },
  {
    id: "141",
    name: "Active Recovery",
    category: "recovery",
    muscleGroup: ["full body"],
    equipment: ["light"],
    difficulty: "beginner",
    notes: "Light activity on rest days to promote blood flow and recovery without adding stress.",
    alternativeExercises: ["complete-rest", "gentle-movement", "restorative-activities"]
  },
  {
    id: "142",
    name: "Deload Week",
    category: "recovery",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Planned reduction in training intensity/volume to allow for recovery and adaptation.",
    alternativeExercises: ["active-recovery", "light-training", "skill-work"]
  },
  {
    id: "143",
    name: "Skill Development",
    category: "skill",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Focused practice on movement patterns and exercise technique rather than intensity.",
    alternativeExercises: ["technique-work", "movement-practice", "form-focus"]
  },
  {
    id: "144",
    name: "Movement Assessment",
    category: "assessment",
    muscleGroup: ["various"],
    equipment: ["none"],
    difficulty: "beginner",
    notes: "Evaluation of movement patterns to identify limitations and areas for improvement.",
    alternativeExercises: ["fitness-testing", "postural-assessment", "flexibility-testing"]
  },
  {
    id: "145",
    name: "Corrective Exercise",
    category: "rehabilitation",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "beginner",
    notes: "Exercises designed to address movement dysfunctions and muscle imbalances.",
    alternativeExercises: ["physical-therapy", "postural-correction", "injury-prevention"]
  },
  {
    id: "146",
    name: "Injury Prevention",
    category: "prevention",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "beginner",
    notes: "Exercises and practices designed to reduce injury risk and maintain joint health.",
    alternativeExercises: ["prehabilitation", "corrective-exercise", "mobility-work"]
  },
  {
    id: "147",
    name: "Prehabilitation",
    category: "prevention",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "beginner",
    notes: "Proactive exercises to prevent injuries before they occur, especially for vulnerable areas.",
    alternativeExercises: ["injury-prevention", "corrective-exercise", "strengthening"]
  },
  {
    id: "148",
    name: "Sport-Specific Training",
    category: "sport",
    muscleGroup: ["sport-dependent"],
    equipment: ["sport-specific"],
    difficulty: "intermediate",
    notes: "Training designed to improve performance in specific sports or activities.",
    alternativeExercises: ["general-fitness", "functional-training", "skill-development"]
  },
  {
    id: "149",
    name: "Competition Preparation",
    category: "sport",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "advanced",
    notes: "Specialized training phase leading up to competition or performance event.",
    alternativeExercises: ["general-training", "off-season-training", "maintenance-training"]
  },
  {
    id: "150",
    name: "Off-Season Training",
    category: "sport",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Training during non-competitive periods to build base fitness and address weaknesses.",
    alternativeExercises: ["in-season-training", "general-fitness", "cross-training"]
  },
  {
    id: "151",
    name: "In-Season Training",
    category: "sport",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Maintenance training during competitive season to preserve fitness without overreaching.",
    alternativeExercises: ["off-season-training", "competition-prep", "recovery-focus"]
  },
  {
    id: "152",
    name: "Team Training",
    category: "group",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Group-based training sessions that build camaraderie and motivation through shared effort.",
    alternativeExercises: ["individual-training", "partner-workouts", "group-fitness"]
  },
  {
    id: "153",
    name: "Partner Workouts",
    category: "group",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Training with a partner for motivation, accountability, and exercise assistance.",
    alternativeExercises: ["solo-training", "group-training", "buddy-system"]
  },
  {
    id: "154",
    name: "Group Fitness",
    category: "group",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Structured fitness classes led by instructor, provides motivation and social interaction.",
    alternativeExercises: ["individual-training", "personal-training", "home-workouts"]
  },
  {
    id: "155",
    name: "Personal Training",
    category: "individual",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "beginner",
    notes: "One-on-one training with qualified instructor for personalized programming and form correction.",
    alternativeExercises: ["group-fitness", "self-directed-training", "online-coaching"]
  },
  {
    id: "156",
    name: "Online Coaching",
    category: "individual",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Remote coaching through digital platforms, provides flexibility and expert guidance.",
    alternativeExercises: ["in-person-training", "self-programming", "group-coaching"]
  },
  {
    id: "157",
    name: "Self-Directed Training",
    category: "individual",
    muscleGroup: ["various"],
    equipment: ["various"],
    difficulty: "intermediate",
    notes: "Independent training following self-designed or researched programs, requires discipline.",
    alternativeExercises: ["coached-training", "guided-programs", "structured-classes"]
  },
  {
    id: "158",
    name: "Home Workouts",
    category: "location",
    muscleGroup: ["various"],
    equipment: ["minimal"],
    difficulty: "beginner",
    notes: "Training at home with minimal equipment, convenient and time-efficient option.",
    alternativeExercises: ["gym-workouts", "outdoor-training", "studio-classes"]
  },
  {
    id: "159",
    name: "Gym Workouts",
    category: "location",
    muscleGroup: ["various"],
    equipment: ["full-gym"],
    difficulty: "intermediate",
    notes: "Training in fully equipped fitness facility with access to wide variety of equipment.",
    alternativeExercises: ["home-workouts", "outdoor-training", "studio-workouts"]
  },
  {
    id: "160",
    name: "Studio Classes",
    category: "location",
    muscleGroup: ["various"],
    equipment: ["studio-specific"],
    difficulty: "intermediate",
    notes: "Specialized classes in dedicated studios: yoga, pilates, spin, dance, etc.",
    alternativeExercises: ["gym-classes", "home-practice", "outdoor-activities"]
  },
  {
    id: "161",
    name: "Virtual Training",
    category: "technology",
    muscleGroup: ["various"],
    equipment: ["device"],
    difficulty: "beginner",
    notes: "Training using apps, videos, or virtual reality for guidance and motivation.",
    alternativeExercises: ["in-person-training", "book-based-programs", "self-guided"]
  },
  {
    id: "162",
    name: "Wearable Technology",
    category: "technology",
    muscleGroup: ["monitoring"],
    equipment: ["wearable-device"],
    difficulty: "beginner",
    notes: "Using fitness trackers, heart rate monitors, and smartwatches to monitor and guide training.",
    alternativeExercises: ["manual-tracking", "perceived-exertion", "traditional-methods"]
  },
  {
    id: "163",
    name: "Biometric Monitoring",
    category: "assessment",
    muscleGroup: ["various"],
    equipment: ["monitoring-devices"],
    difficulty: "intermediate",
    notes: "Tracking physiological markers like heart rate variability, sleep, and recovery metrics.",
    alternativeExercises: ["subjective-monitoring", "basic-tracking", "simple-metrics"]
  },
  {
    id: "164",
    name: "Nutrition Integration",
    category: "lifestyle",
    muscleGroup: ["metabolic"],
    equipment: ["none"],
    difficulty: "intermediate",
    notes: "Coordinating training with proper nutrition timing and composition for optimal results.",
    alternativeExercises: ["basic-nutrition", "intuitive-eating", "standard-diet"]
  },
  {
    id: "165",
    name: "Sleep Optimization",
    category: "recovery",
    muscleGroup: ["recovery"],
    equipment: ["none"],
    difficulty: "beginner",
    notes: "Prioritizing quality sleep for recovery, adaptation, and performance enhancement.",
    alternativeExercises: ["basic-sleep", "napping", "rest-periods"]
  },
  {
    id: "166",
    name: "Stress Management",
    category: "lifestyle",
    muscleGroup: ["mental"],
    equipment: ["none"],
    difficulty: "beginner",
    notes: "Incorporating stress reduction techniques to support training and overall health.",
    alternativeExercises: ["meditation", "relaxation", "time-management"]
  },
  {
    id: "167",
    name: "Mindfulness Training",
    category: "mental",
    muscleGroup: ["mental"],
    equipment: ["none"],
    difficulty: "beginner",
    notes: "Developing present-moment awareness to improve focus, reduce stress, and enhance performance.",
    alternativeExercises: ["meditation", "breathing-exercises", "mental-training"]
  },
  {
    id: "168",
    name: "Visualization",
    category: "mental",
    muscleGroup: ["mental"],
    equipment: ["none"],
    difficulty: "intermediate",
    notes: "Mental rehearsal of movements and performance to improve skill acquisition and confidence.",
    alternativeExercises: ["mental-practice", "imagery", "cognitive-training"]
  },
  {
    id: "169",
    name: "Goal Setting",
    category: "planning",
    muscleGroup: ["mental"],
    equipment: ["none"],
    difficulty: "beginner",
    notes: "Establishing specific, measurable, achievable, relevant, and time-bound fitness objectives.",
    alternativeExercises: ["general-training", "intuitive-training", "flexible-approach"]
  },
  {
    id: "170",
    name: "Progress Tracking",
    category: "assessment",
    muscleGroup: ["various"],
    equipment: ["tracking-tools"],
    difficulty: "beginner",
    notes: "Systematic recording of training variables and outcomes to monitor improvement and adjust programs.",
    alternativeExercises: ["intuitive-training", "memory-based", "casual-tracking"]
  },
  {
    id: "171",
    name: "Angled leg press",
    category: "legs",
    muscleGroup: ["quadriceps", "glutes"],
    equipment: ["leg press machine"],
    difficulty: "intermediate",
    notes: "Position feet at an angle on the leg press platform. Press the weight up through your heels while keeping your knees aligned with your toes.",
    alternativeExercises: ["horizontal-leg-press", "hack-squat", "squat-smith-machine"]
  }
];

export const getExerciseById = (id: string): ExerciseData | undefined => {
  return exerciseDatabase.find(exercise => exercise.id === id);
};

export const getExercisesByCategory = (category: string): ExerciseData[] => {
  return exerciseDatabase.filter(exercise => exercise.category.toLowerCase() === category.toLowerCase());
};

export const getExercisesByMuscleGroup = (muscleGroup: string): ExerciseData[] => {
  return exerciseDatabase.filter(exercise => 
    exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(muscleGroup.toLowerCase()))
  );
};

export const getExercisesByEquipment = (equipment: string): ExerciseData[] => {
  return exerciseDatabase.filter(exercise => 
    exercise.equipment.some(eq => eq.toLowerCase().includes(equipment.toLowerCase()))
  );
};

export const getExercisesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): ExerciseData[] => {
  return exerciseDatabase.filter(exercise => exercise.difficulty === difficulty);
};

export const searchExercises = (query: string): ExerciseData[] => {
  const lowercaseQuery = query.toLowerCase();
  return exerciseDatabase.filter(exercise => 
    exercise.name.toLowerCase().includes(lowercaseQuery) ||
    exercise.category.toLowerCase().includes(lowercaseQuery) ||
    exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(lowercaseQuery)) ||
    exercise.equipment.some(eq => eq.toLowerCase().includes(lowercaseQuery)) ||
    exercise.notes.toLowerCase().includes(lowercaseQuery)
  );
};
