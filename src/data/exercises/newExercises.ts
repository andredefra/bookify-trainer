
import { ExerciseData } from './types';

export const newExercises: ExerciseData[] = [
  // LEGS - Complete 247 exercises
  {
    id: 'walking-lunges',
    name: 'Walking Lunges',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Step forward into lunge, alternate legs walking forward',
    alternativeExercises: ['Static Lunges', 'Reverse Lunges', 'Lateral Lunges']
  },
  {
    id: 'stationary-lunges',
    name: 'Stationary Lunges',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Step back into lunge position, return to start, repeat on same leg',
    alternativeExercises: ['Walking Lunges', 'Reverse Lunges', 'Bulgarian Split Squats']
  },
  {
    id: 'reverse-lunges',
    name: 'Reverse Lunges',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Step backward into lunge, push through front heel to return',
    alternativeExercises: ['Forward Lunges', 'Walking Lunges', 'Bulgarian Split Squats']
  },
  {
    id: 'lateral-lunges',
    name: 'Lateral Lunges',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Adductors'],
    equipment: ['Bodyweight'],
    notes: 'Step wide to one side, bend knee while keeping other leg straight',
    alternativeExercises: ['Cossack Squats', 'Side Steps', 'Curtsy Lunges']
  },
  {
    id: 'curtsy-lunges',
    name: 'Curtsy Lunges',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Quadriceps', 'Hip Stabilizers'],
    equipment: ['Bodyweight'],
    notes: 'Step back and across behind standing leg like a curtsy',
    alternativeExercises: ['Lateral Lunges', 'Reverse Lunges', 'Cossack Squats']
  },
  {
    id: 'bulgarian-split-squats',
    name: 'Bulgarian Split Squats',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bench'],
    notes: 'Rear foot elevated on bench, lower into single-leg squat',
    alternativeExercises: ['Single Leg Squats', 'Lunges', 'Step-ups']
  },
  {
    id: 'goblet-squats',
    name: 'Goblet Squats',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core'],
    equipment: ['Dumbbell'],
    notes: 'Hold dumbbell at chest, squat down keeping chest up',
    alternativeExercises: ['Bodyweight Squats', 'Front Squats', 'Sumo Squats']
  },
  {
    id: 'sumo-squats',
    name: 'Sumo Squats',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Adductors'],
    equipment: ['Bodyweight'],
    notes: 'Wide stance squat with toes pointed out',
    alternativeExercises: ['Regular Squats', 'Goblet Squats', 'Plie Squats']
  },
  {
    id: 'jump-squats',
    name: 'Jump Squats',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Calves'],
    equipment: ['Bodyweight'],
    notes: 'Squat down then explode up into a jump, land softly',
    alternativeExercises: ['Bodyweight Squats', 'Box Jumps', 'Squat Pulses']
  },
  {
    id: 'single-leg-squats',
    name: 'Single Leg Squats (Pistol)',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Single leg squat with other leg extended forward',
    alternativeExercises: ['Bulgarian Split Squats', 'Assisted Pistol Squats', 'Box Pistol Squats']
  },
  {
    id: 'wall-sits',
    name: 'Wall Sits',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Wall'],
    notes: 'Back against wall, slide down to squat position and hold',
    alternativeExercises: ['Isometric Squats', 'Chair Squats', 'Squat Holds']
  },
  {
    id: 'step-ups',
    name: 'Step-ups',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Calves'],
    equipment: ['Box', 'Bench'],
    notes: 'Step up onto platform, focus on pushing through heel',
    alternativeExercises: ['Box Jumps', 'Bulgarian Split Squats', 'High Knees']
  },
  {
    id: 'box-jumps',
    name: 'Box Jumps',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Calves'],
    equipment: ['Plyo Box'],
    notes: 'Jump onto box with both feet, step down carefully',
    alternativeExercises: ['Step-ups', 'Jump Squats', 'Broad Jumps']
  },
  {
    id: 'single-leg-deadlifts',
    name: 'Single Leg Deadlifts',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Hinge at hip on one leg, extend other leg back for balance',
    alternativeExercises: ['Romanian Deadlifts', 'Good Mornings', 'Glute Bridges']
  },
  {
    id: 'romanian-deadlift-barbell',
    name: 'Romanian Deadlift (Barbell)',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Erector Spinae'],
    equipment: ['Barbell'],
    notes: 'Hip hinge movement, keep bar close to body',
    alternativeExercises: ['Romanian Deadlift DB', 'Good Mornings', 'Single Leg RDL']
  },
  {
    id: 'romanian-deadlift-dumbbell',
    name: 'Romanian Deadlift (Dumbbell)',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings', 'Glutes', 'Erector Spinae'],
    equipment: ['Dumbbells'],
    notes: 'Hip hinge with dumbbells, focus on hamstring stretch',
    alternativeExercises: ['Romanian Deadlift BB', 'Single Leg RDL', 'Good Mornings']
  },
  {
    id: 'conventional-deadlift',
    name: 'Conventional Deadlift',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Erector Spinae', 'Traps'],
    equipment: ['Barbell'],
    notes: 'Full deadlift from floor, hip and knee extension',
    alternativeExercises: ['Sumo Deadlift', 'Trap Bar Deadlift', 'Romanian Deadlift']
  },
  {
    id: 'sumo-deadlift',
    name: 'Sumo Deadlift',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Adductors'],
    equipment: ['Barbell'],
    notes: 'Wide stance deadlift, more quad dominant',
    alternativeExercises: ['Conventional Deadlift', 'Sumo Squats', 'Wide Stance Squats']
  },
  {
    id: 'stiff-leg-deadlifts',
    name: 'Stiff Leg Deadlifts',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Barbell', 'Dumbbells'],
    notes: 'Keep legs relatively straight, focus on hamstring stretch',
    alternativeExercises: ['Romanian Deadlifts', 'Good Mornings', 'Hamstring Curls']
  },
  {
    id: 'good-mornings',
    name: 'Good Mornings',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Erector Spinae'],
    equipment: ['Barbell'],
    notes: 'Barbell on shoulders, hip hinge forward and back',
    alternativeExercises: ['Romanian Deadlifts', 'Back Extensions', 'Hip Thrusts']
  },
  {
    id: 'glute-bridges',
    name: 'Glute Bridges',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Lie on back, drive hips up squeezing glutes',
    alternativeExercises: ['Hip Thrusts', 'Single Leg Glute Bridges', 'Clamshells']
  },
  {
    id: 'single-leg-glute-bridges',
    name: 'Single Leg Glute Bridges',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Glute bridge with one leg extended, alternate legs',
    alternativeExercises: ['Glute Bridges', 'Single Leg Hip Thrusts', 'Single Leg RDL']
  },
  {
    id: 'hip-thrusts-barbell',
    name: 'Hip Thrusts (Barbell)',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Shoulders on bench, barbell on hips, thrust up',
    alternativeExercises: ['Glute Bridges', 'Hip Thrusts DB', 'Machine Hip Thrust']
  },
  {
    id: 'hip-thrusts-dumbbell',
    name: 'Hip Thrusts (Dumbbell)',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Dumbbell', 'Bench'],
    notes: 'Shoulders on bench, dumbbell on hips, thrust up',
    alternativeExercises: ['Hip Thrusts BB', 'Glute Bridges', 'Machine Hip Thrust']
  },
  {
    id: 'clamshells',
    name: 'Clamshells',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Resistance Band'],
    notes: 'Side lying, knees bent, rotate top knee up',
    alternativeExercises: ['Side Leg Raises', 'Fire Hydrants', 'Lateral Band Walks']
  },
  {
    id: 'fire-hydrants',
    name: 'Fire Hydrants',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'On hands and knees, lift leg out to side like a dog',
    alternativeExercises: ['Clamshells', 'Side Leg Raises', 'Lateral Band Walks']
  },
  {
    id: 'side-leg-raises',
    name: 'Side Leg Raises',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Lie on side, lift top leg up and down',
    alternativeExercises: ['Clamshells', 'Fire Hydrants', 'Standing Leg Abduction']
  },
  {
    id: 'lateral-band-walks',
    name: 'Lateral Band Walks',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Resistance Band'],
    notes: 'Band around ankles, walk sideways maintaining tension',
    alternativeExercises: ['Clamshells', 'Side Steps', 'Monster Walks']
  },
  {
    id: 'monster-walks',
    name: 'Monster Walks',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hip Abductors', 'Glutes', 'Quadriceps'],
    equipment: ['Resistance Band'],
    notes: 'Band around ankles, walk forward in semi-squat position',
    alternativeExercises: ['Lateral Band Walks', 'Duck Walks', 'Crab Walks']
  },
  {
    id: 'standing-calf-raises',
    name: 'Standing Calf Raises',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Calves'],
    equipment: ['Bodyweight'],
    notes: 'Rise up on toes, squeeze calves at top',
    alternativeExercises: ['Seated Calf Raises', 'Single Leg Calf Raises', 'Calf Press']
  },
  {
    id: 'seated-calf-raises',
    name: 'Seated Calf Raises',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Soleus'],
    equipment: ['Calf Raise Machine'],
    notes: 'Seated position targets soleus muscle specifically',
    alternativeExercises: ['Standing Calf Raises', 'Single Leg Calf Raises', 'Donkey Calf Raises']
  },
  {
    id: 'single-leg-calf-raises',
    name: 'Single Leg Calf Raises',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Calves'],
    equipment: ['Bodyweight'],
    notes: 'Calf raise on one leg for increased difficulty',
    alternativeExercises: ['Standing Calf Raises', 'Seated Calf Raises', 'Weighted Calf Raises']
  },
  {
    id: 'donkey-calf-raises',
    name: 'Donkey Calf Raises',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Calves'],
    equipment: ['Donkey Calf Machine'],
    notes: 'Bent over position for maximum calf stretch',
    alternativeExercises: ['Standing Calf Raises', 'Incline Calf Raises', 'Calf Press']
  },
  {
    id: 'calf-press-leg-press',
    name: 'Calf Press (Leg Press)',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Calves'],
    equipment: ['Leg Press Machine'],
    notes: 'Use leg press machine for calf raises with toes on platform',
    alternativeExercises: ['Standing Calf Raises', 'Seated Calf Raises', 'Donkey Calf Raises']
  },
  {
    id: 'farmer-walks',
    name: 'Farmer Walks',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Calves', 'Traps', 'Core', 'Forearms'],
    equipment: ['Dumbbells', 'Farmer Walk Handles'],
    notes: 'Walk with heavy weights in each hand, maintain posture',
    alternativeExercises: ['Suitcase Carries', 'Overhead Carries', 'Front Loaded Carries']
  },
  {
    id: 'suitcase-carries',
    name: 'Suitcase Carries',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Core', 'Obliques', 'Legs'],
    equipment: ['Dumbbell', 'Kettlebell'],
    notes: 'Carry weight on one side, resist lateral flexion',
    alternativeExercises: ['Farmer Walks', 'Single Arm Overhead Carry', 'Offset Carries']
  },
  {
    id: 'weighted-squats',
    name: 'Weighted Squats',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Dumbbells', 'Weight Vest'],
    notes: 'Add external weight to bodyweight squats',
    alternativeExercises: ['Goblet Squats', 'Front Squats', 'Back Squats']
  },
  {
    id: 'front-squats',
    name: 'Front Squats',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Core', 'Upper Back'],
    equipment: ['Barbell'],
    notes: 'Barbell held in front rack position, more quad dominant',
    alternativeExercises: ['Goblet Squats', 'Back Squats', 'Zercher Squats']
  },
  {
    id: 'back-squats',
    name: 'Back Squats',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell'],
    notes: 'Barbell on upper back, classic squat movement',
    alternativeExercises: ['Front Squats', 'Goblet Squats', 'Smith Machine Squats']
  },
  {
    id: 'overhead-squats',
    name: 'Overhead Squats',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core', 'Shoulders'],
    equipment: ['Barbell'],
    notes: 'Squat with barbell held overhead, requires mobility and stability',
    alternativeExercises: ['Front Squats', 'Goblet Squats', 'Overhead Lunges']
  },
  {
    id: 'zercher-squats',
    name: 'Zercher Squats',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Core', 'Upper Back'],
    equipment: ['Barbell'],
    notes: 'Barbell held in crook of elbows, unique loading pattern',
    alternativeExercises: ['Front Squats', 'Goblet Squats', 'Anderson Squats']
  },
  {
    id: 'pause-squats',
    name: 'Pause Squats',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell'],
    notes: 'Squat with 2-3 second pause at bottom position',
    alternativeExercises: ['Tempo Squats', 'Box Squats', 'Anderson Squats']
  },
  {
    id: 'box-squats',
    name: 'Box Squats',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell', 'Box'],
    notes: 'Squat down to seated position on box, then stand',
    alternativeExercises: ['Pause Squats', 'Anderson Squats', 'Chair Squats']
  },
  {
    id: 'anderson-squats',
    name: 'Anderson Squats',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Barbell', 'Power Rack'],
    notes: 'Start from bottom position in rack, concentric only',
    alternativeExercises: ['Pin Squats', 'Box Squats', 'Pause Squats']
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
