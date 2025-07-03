
import { ExerciseData } from './types';

export const newExercises: ExerciseData[] = [
  {
    id: 'angled-leg-press',
    name: 'Angled Leg Press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Leg Press Machine'],
    notes: 'Position feet at middle of footplate, lower weight with control, press through heels',
    alternativeExercises: ['Horizontal Leg Press', 'Squat']
  },
  {
    id: 'horizontal-leg-press',
    name: 'Horizontal Leg Press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Leg Press Machine'],
    notes: 'Keep back flat against pad, full range of motion, controlled movement',
    alternativeExercises: ['Angled Leg Press', 'Squat']
  },
  {
    id: 'leg-extension',
    name: 'Leg Extension',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps'],
    equipment: ['Leg Extension Machine'],
    notes: 'Adjust seat back, extend legs fully, control the negative',
    alternativeExercises: ['Squat', 'Leg Press']
  },
  {
    id: 'seated-leg-curl',
    name: 'Seated Leg Curl',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Adjust back pad, full range of motion, squeeze hamstrings at bottom',
    alternativeExercises: ['Lying Leg Curl', 'Romanian Deadlift']
  },
  {
    id: 'leg-curl-lying-down',
    name: 'Leg Curl Lying Down',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings'],
    equipment: ['Lying Leg Curl Machine'],
    notes: 'Lie flat, curl heels toward glutes, control the movement',
    alternativeExercises: ['Seated Leg Curl', 'Romanian Deadlift']
  },
  {
    id: 'standing-leg-curl',
    name: 'Standing Leg Curl',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings'],
    equipment: ['Standing Leg Curl Machine'],
    notes: 'One leg at a time, maintain balance, full range of motion',
    alternativeExercises: ['Seated Leg Curl', 'Romanian Deadlift']
  },
  {
    id: 'machine-hip-thrust',
    name: 'Machine Hip Thrust',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Hip Thrust Machine'],
    notes: 'Drive through heels, squeeze glutes at top, full hip extension',
    alternativeExercises: ['Barbell Hip Thrust', 'Glute Bridge']
  },
  {
    id: 'standing-abductor-machine',
    name: 'Standing Abductor Machine',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Abductor Machine'],
    notes: 'Stand upright, push leg out against resistance, control return',
    alternativeExercises: ['Side Leg Raises', 'Clamshells']
  },
  {
    id: 'abductors-machine',
    name: 'Abductors Machine',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Abductor Machine'],
    notes: 'Sit properly aligned, push knees apart, squeeze glutes',
    alternativeExercises: ['Side Leg Raises', 'Clamshells']
  },
  {
    id: 'adductors-machine',
    name: 'Adductors Machine',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hip Adductors'],
    equipment: ['Adductor Machine'],
    notes: 'Sit with knees against pads, squeeze legs together, control movement',
    alternativeExercises: ['Sumo Squats', 'Side Lunges']
  },
  {
    id: 'squat-smith-machine',
    name: 'Squat SMITH Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Smith Machine'],
    notes: 'Position feet slightly forward, squat down keeping chest up, drive through heels',
    alternativeExercises: ['Barbell Squat', 'Leg Press']
  },
  {
    id: 'hack-squat',
    name: 'Hack Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Hack Squat Machine'],
    notes: 'Feet shoulder-width apart, squat down fully, drive through heels',
    alternativeExercises: ['Leg Press', 'Squat']
  },
  {
    id: 'reverse-hack-squat',
    name: 'Reverse Hack Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Hack Squat Machine'],
    notes: 'Face the machine, emphasizes posterior chain, control the movement',
    alternativeExercises: ['Romanian Deadlift', 'Good Mornings']
  },
  {
    id: 'barbell-squat',
    name: 'Barbell Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell', 'Squat Rack'],
    notes: 'Bar on upper traps, feet shoulder-width apart, squat below parallel',
    alternativeExercises: ['Smith Machine Squat', 'Leg Press']
  },
  {
    id: 'calf-machine',
    name: 'Calf Machine',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Calves'],
    equipment: ['Calf Raise Machine'],
    notes: 'Rise up on toes, full range of motion, squeeze at top',
    alternativeExercises: ['Standing Calf Raises', 'Seated Calf Raises']
  },
  {
    id: 'master-gluteus',
    name: 'Master Gluteus',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Glute Machine'],
    notes: 'Focus on glute activation, full range of motion, squeeze at contraction',
    alternativeExercises: ['Hip Thrust', 'Glute Bridge']
  },
  {
    id: 'lat-machine-pulldown',
    name: 'Lat Machine Pulldown',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Lat Pulldown Machine', 'Wide Grip Bar'],
    notes: 'Pull bar to upper chest, squeeze shoulder blades, control the return',
    alternativeExercises: ['Pull-ups', 'Seated Cable Row']
  },
  {
    id: 'lat-machine-reverse-grip',
    name: 'Lat Machine Reverse Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine', 'Straight Bar'],
    notes: 'Reverse grip emphasizes biceps and lower lats, pull to upper chest',
    alternativeExercises: ['Chin-ups', 'Seated Cable Row']
  },
  {
    id: 'triangle-bar-lat-pulldown',
    name: 'Triangle Bar Lat Pulldown',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine', 'Triangle Bar'],
    notes: 'Neutral grip, pull to chest, focus on lat engagement',
    alternativeExercises: ['Seated Cable Row', 'Pull-ups']
  },
  {
    id: 'seated-cable-low-row-triangle',
    name: 'Seated Cable Low Row with Triangle Bar',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Rhomboids', 'Middle Traps', 'Latissimus Dorsi'],
    equipment: ['Cable Machine', 'Triangle Bar'],
    notes: 'Sit upright, pull bar to lower chest, squeeze shoulder blades',
    alternativeExercises: ['Barbell Row', 'T-Bar Row']
  },
  {
    id: 'single-arm-seated-low-row',
    name: 'Single Arm Seated Low Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Rhomboids', 'Latissimus Dorsi', 'Rear Deltoids'],
    equipment: ['Cable Machine', 'Single Handle'],
    notes: 'One arm at a time, rotate torso slightly, full range of motion',
    alternativeExercises: ['Dumbbell Row', 'Seated Cable Row']
  },
  {
    id: 'cable-chest-fly',
    name: 'Cable Chest Fly',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine', 'Handles'],
    notes: 'Arms slightly bent, bring hands together in arc motion, squeeze chest',
    alternativeExercises: ['Dumbbell Fly', 'Pec Deck']
  },
  {
    id: 'dumbbell-fly-incline-bench',
    name: 'Dumbbell Fly on Incline Bench',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Pectorals'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Slight bend in elbows, lower dumbbells in arc, feel stretch in chest',
    alternativeExercises: ['Incline Dumbbell Press', 'Cable Fly']
  },
  {
    id: 'dumbbell-fly-flat-bench',
    name: 'Dumbbell Fly on Flat Bench',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Dumbbells', 'Flat Bench'],
    notes: 'Keep slight bend in elbows, lower dumbbells to sides, squeeze chest at top',
    alternativeExercises: ['Dumbbell Press', 'Cable Fly']
  },
  {
    id: 'dumbbell-flat-bench-press',
    name: 'Dumbbell Flat Bench Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Dumbbells', 'Flat Bench'],
    notes: 'Lower dumbbells to chest level, press up and together, full range of motion',
    alternativeExercises: ['Barbell Bench Press', 'Push-ups']
  },
  {
    id: 'dumbbell-inclined-bench-press',
    name: 'Dumbbell Inclined Bench Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Incline bench 30-45 degrees, press dumbbells up and together',
    alternativeExercises: ['Incline Barbell Press', 'Incline Fly']
  },
  {
    id: 'barbell-flat-bench-press',
    name: 'Barbell Flat Bench Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Barbell', 'Flat Bench'],
    notes: 'Lower bar to chest, press up explosively, maintain tight core',
    alternativeExercises: ['Dumbbell Press', 'Push-ups']
  },
  {
    id: 'barbell-incline-bench-press',
    name: 'Barbell Incline Bench Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Barbell', 'Incline Bench'],
    notes: 'Incline bench 30-45 degrees, lower bar to upper chest, press up',
    alternativeExercises: ['Incline Dumbbell Press', 'Incline Fly']
  },
  {
    id: 'smith-machine-flat-bench-press',
    name: 'SMITH Machine Flat Bench Press',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Smith Machine', 'Flat Bench'],
    notes: 'Guided bar path, lower to chest, press up with control',
    alternativeExercises: ['Barbell Bench Press', 'Dumbbell Press']
  },
  {
    id: 'smith-machine-incline-bench-press',
    name: 'SMITH Machine Incline Bench Press',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Upper Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Smith Machine', 'Incline Bench'],
    notes: 'Incline bench under Smith machine, lower bar to upper chest',
    alternativeExercises: ['Incline Barbell Press', 'Incline Dumbbell Press']
  },
  {
    id: 'chest-press',
    name: 'Chest Press',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Chest Press Machine'],
    notes: 'Adjust seat height, push handles forward, squeeze chest at extension',
    alternativeExercises: ['Bench Press', 'Push-ups']
  },
  {
    id: 'chest-fly-machine',
    name: 'Chest Fly Machine',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals'],
    equipment: ['Pec Deck Machine'],
    notes: 'Adjust seat height, bring arms together in front of chest, squeeze',
    alternativeExercises: ['Cable Fly', 'Dumbbell Fly']
  },
  {
    id: 'barbell-shoulder-press',
    name: 'Barbell Shoulder Press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Barbell'],
    notes: 'Press bar overhead, keep core tight, full range of motion',
    alternativeExercises: ['Dumbbell Shoulder Press', 'Military Press']
  },
  {
    id: 'shoulder-press-machine',
    name: 'Shoulder Press Machine',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Shoulder Press Machine'],
    notes: 'Adjust seat height, press handles overhead, control the movement',
    alternativeExercises: ['Barbell Shoulder Press', 'Dumbbell Press']
  },
  {
    id: 'single-arm-cable-lateral-raise',
    name: 'Single Arm Cable Lateral Raise',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Cable Machine', 'Single Handle'],
    notes: 'Raise arm to side to shoulder height, control the movement',
    alternativeExercises: ['Dumbbell Lateral Raise', 'Machine Lateral Raise']
  },
  {
    id: 'single-arm-cable-rear-delt-fly',
    name: 'Single Arm Cable Rear Delt Fly',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Cable Machine', 'Single Handle'],
    notes: 'Pull cable across body, squeeze shoulder blade, control return',
    alternativeExercises: ['Rear Delt Fly', 'Face Pulls']
  },
  {
    id: 'cable-rope-upright-row',
    name: 'Cable Rope Upright Row',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Medial Deltoids', 'Traps'],
    equipment: ['Cable Machine', 'Rope Attachment'],
    notes: 'Pull rope up to chest level, elbows high, squeeze shoulders',
    alternativeExercises: ['Barbell Upright Row', 'Dumbbell Upright Row']
  },
  {
    id: 'standing-cable-rope-front-raises',
    name: 'Standing Cable Rope Front Raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Cable Machine', 'Rope Attachment'],
    notes: 'Raise rope in front to shoulder height, control the movement',
    alternativeExercises: ['Dumbbell Front Raise', 'Barbell Front Raise']
  },
  {
    id: 'standing-cable-front-raises',
    name: 'Standing Cable Front Raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Cable Machine', 'Straight Bar'],
    notes: 'Raise bar in front to shoulder height, keep core engaged',
    alternativeExercises: ['Dumbbell Front Raise', 'Plate Front Raise']
  },
  {
    id: 'biceps-cable-curl',
    name: 'Biceps Cable Curl',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine', 'Straight Bar'],
    notes: 'Curl bar up to chest, squeeze biceps, control the negative',
    alternativeExercises: ['Barbell Curl', 'Dumbbell Curl']
  },
  {
    id: 'cable-tricep-pushdown',
    name: 'Cable Tricep Pushdown',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Straight Bar'],
    notes: 'Push bar down, squeeze triceps, control the return',
    alternativeExercises: ['Dips', 'Close Grip Bench Press']
  },
  {
    id: 'reverse-grip-cable-pushdown',
    name: 'Reverse Grip Cable Pushdown',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Straight Bar'],
    notes: 'Reverse grip emphasizes different tricep head, push down and squeeze',
    alternativeExercises: ['Cable Pushdown', 'Dips']
  },
  {
    id: 'high-cable-french-press',
    name: 'High Cable French Press',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Rope Attachment'],
    notes: 'Overhead tricep extension, keep elbows stationary, full range',
    alternativeExercises: ['Overhead Dumbbell Extension', 'Skull Crushers']
  },
  {
    id: 'cable-rope-pushdown',
    name: 'Cable Rope Pushdown',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Rope Attachment'],
    notes: 'Push rope down and apart, squeeze triceps, control return',
    alternativeExercises: ['Cable Pushdown', 'Dips']
  },
  {
    id: 'high-rope-cable-french-press',
    name: 'High Rope Cable French Press',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Rope Attachment'],
    notes: 'Overhead extension with rope, keep elbows high, full stretch',
    alternativeExercises: ['Overhead Extension', 'Skull Crushers']
  },
  {
    id: 'low-cable-rope-curl',
    name: 'Low Cable Rope Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine', 'Rope Attachment'],
    notes: 'Curl rope up, squeeze biceps, control the negative',
    alternativeExercises: ['Hammer Curl', 'Cable Curl']
  },
  {
    id: 'low-cable-kick-back',
    name: 'Low Cable Kick Back',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Single Handle'],
    notes: 'Bend forward, kick cable back, squeeze triceps, control return',
    alternativeExercises: ['Dumbbell Kickback', 'Cable Pushdown']
  },
  {
    id: 'reverse-grip-single-handle-tricep-pushdown',
    name: 'Reverse Grip Single Handle Tricep Pushdown',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Single Handle'],
    notes: 'One arm at a time, reverse grip, push down and squeeze',
    alternativeExercises: ['Single Handle Pushdown', 'Cable Pushdown']
  },
  {
    id: 'single-handle-tricep-pushdown',
    name: 'Single Handle Tricep Pushdown',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Single Handle'],
    notes: 'One arm at a time, push down and squeeze triceps',
    alternativeExercises: ['Cable Pushdown', 'Dips']
  },
  {
    id: 'curl-single-low-cable',
    name: 'Curl Single Low Cable',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine', 'Single Handle'],
    notes: 'One arm at a time, curl up and squeeze biceps',
    alternativeExercises: ['Dumbbell Curl', 'Cable Curl']
  },
  // Next batch - Pull-ups and variations
  {
    id: 'reverse-grip-pull-ups',
    name: 'Reverse Grip Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Biceps', 'Rhomboids'],
    equipment: ['Pull-up Bar'],
    notes: 'Chin-up variation with palms facing you, emphasizes biceps',
    alternativeExercises: ['Pull-ups', 'Lat Pulldown', 'Chin-ups']
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Pull-up Bar'],
    notes: 'Classic bodyweight back exercise with palms facing away',
    alternativeExercises: ['Lat Pulldown', 'Assisted Pull-ups', 'Reverse Grip Pull-ups']
  },
  {
    id: 'neutral-grip-pull-ups',
    name: 'Neutral Grip Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Pull-up Bar with Parallel Handles'],
    notes: 'Pull-ups with palms facing each other, easier on wrists',
    alternativeExercises: ['Pull-ups', 'Lat Pulldown', 'Hammer Grip Pull-ups']
  },
  {
    id: 'rope-pulldown',
    name: 'Rope Pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine', 'Rope Attachment'],
    notes: 'Lat pulldown with rope for different grip angle',
    alternativeExercises: ['Lat Pulldown', 'Wide Grip Pulldown', 'Triangle Bar Pulldown']
  },
  {
    id: 'standing-lat-pushdown',
    name: 'Standing Lat Pushdown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Cable Machine', 'Straight Bar'],
    notes: 'Standing lat pushdown for lat isolation',
    alternativeExercises: ['Lat Pulldown', 'Straight Arm Pushdown', 'Cable Pullover']
  },
  {
    id: 'vertical-row-neutral-grip',
    name: 'Vertical Row Neutral Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Rhomboids', 'Middle Traps', 'Latissimus Dorsi'],
    equipment: ['Cable Machine', 'Neutral Grip Handle'],
    notes: 'Vertical rowing motion with neutral grip',
    alternativeExercises: ['Seated Cable Row', 'T-Bar Row', 'Single Arm Row']
  },
  {
    id: 'single-arm-neutral-grip-low-row',
    name: 'Single Arm Neutral Grip Low Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Rhomboids', 'Latissimus Dorsi', 'Rear Deltoids'],
    equipment: ['Cable Machine', 'Single Handle'],
    notes: 'Unilateral rowing for balanced development',
    alternativeExercises: ['Dumbbell Row', 'Cable Row', 'T-Bar Row']
  },
  {
    id: 'low-row',
    name: 'Low Row',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Rhomboids', 'Middle Traps', 'Latissimus Dorsi'],
    equipment: ['Cable Machine', 'Wide Grip Bar'],
    notes: 'Basic cable rowing exercise for back development',
    alternativeExercises: ['Seated Cable Row', 'Barbell Row', 'T-Bar Row']
  },
  {
    id: 'single-arm-vertical-row',
    name: 'Single Arm Vertical Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Rhomboids', 'Latissimus Dorsi', 'Rear Deltoids'],
    equipment: ['Cable Machine', 'Single Handle'],
    notes: 'Vertical rowing motion with single arm',
    alternativeExercises: ['Seated Cable Row', 'Dumbbell Row', 'Cable Row']
  },
  {
    id: 'lat-machine-trazy-bar',
    name: 'Lat Machine Trazy Bar',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine', 'Trazy Bar'],
    notes: 'Lat pulldown with specialized bar attachment',
    alternativeExercises: ['Lat Pulldown', 'Wide Grip Pulldown', 'Triangle Bar Pulldown']
  },
  {
    id: 'hyperextension',
    name: 'Hyperextension',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Erector Spinae', 'Glutes', 'Hamstrings'],
    equipment: ['Hyperextension Bench'],
    notes: 'Lower back strengthening exercise',
    alternativeExercises: ['Good Mornings', 'Romanian Deadlift', 'Back Extension']
  },
  {
    id: 'seated-cable-low-row-trazy-bar',
    name: 'Seated Cable Low Row with Trazy Bar',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Rhomboids', 'Middle Traps', 'Latissimus Dorsi'],
    equipment: ['Cable Machine', 'Trazy Bar'],
    notes: 'Cable row with specialized bar attachment',
    alternativeExercises: ['Seated Cable Row', 'Triangle Bar Row', 'Wide Grip Row']
  },
  {
    id: 'barbell-preacher-curl',
    name: 'Barbell Preacher Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Barbell', 'Preacher Bench'],
    notes: 'Isolated bicep curl on preacher bench',
    alternativeExercises: ['Dumbbell Preacher Curl', 'Cable Preacher Curl', 'Barbell Curl']
  },
  {
    id: 'dumbbell-preacher-curl',
    name: 'Dumbbell Preacher Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells', 'Preacher Bench'],
    notes: 'Single or double arm preacher curl with dumbbells',
    alternativeExercises: ['Barbell Preacher Curl', 'Cable Preacher Curl', 'Hammer Preacher Curl']
  },
  {
    id: 'seated-rear-delt-machine',
    name: 'Seated Rear Delt Machine',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    equipment: ['Rear Delt Machine'],
    notes: 'Machine-based rear deltoid isolation',
    alternativeExercises: ['Rear Delt Fly', 'Face Pulls', 'Bent Over Lateral Raise']
  },
  {
    id: '45-degrees-cables-donkey-kick',
    name: '45° Cables Donkey Kick',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Cable Machine', 'Ankle Strap'],
    notes: 'Glute kickbacks using cable at 45-degree angle',
    alternativeExercises: ['Machine Hip Thrust', 'Glute Bridge', 'Hip Thrust']
  },
  {
    id: 'cable-pull-through',
    name: 'Cable Pull Through',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Cable Machine', 'Rope Attachment'],
    notes: 'Hip hinge movement with cable resistance',
    alternativeExercises: ['Romanian Deadlift', 'Hip Thrust', 'Good Mornings']
  },
  {
    id: 'kneeling-cable-crunch',
    name: 'Kneeling Cable Crunch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Cable Machine', 'Rope Attachment'],
    notes: 'Kneeling abdominal crunch with cable resistance',
    alternativeExercises: ['Cable Crunch', 'Weighted Crunch', 'Ab Wheel']
  },
  {
    id: 'dips',
    name: 'Dips',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps', 'Pectorals', 'Anterior Deltoids'],
    equipment: ['Dip Station'],
    notes: 'Bodyweight tricep and chest exercise',
    alternativeExercises: ['Assisted Dips', 'Close Grip Bench Press', 'Diamond Push-ups']
  },
  {
    id: 'parallel-bar-leg-raises',
    name: 'Parallel Bar Leg Raises',
    category: 'core',
    difficulty: 'advanced',
    muscleGroup: ['Hip Flexors', 'Rectus Abdominis'],
    equipment: ['Parallel Bars'],
    notes: 'Hanging leg raises on parallel bars',
    alternativeExercises: ['Hanging Leg Raises', 'Knee Raises', 'V-ups']
  }
];
