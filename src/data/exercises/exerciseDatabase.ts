
export interface ExerciseData {
  id: string;
  name: string;
  category: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'cardio' | 'stretching';
  muscleGroup: string[];
  notes: string;
  videoUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  isCustom: boolean;
}

export const exerciseDatabase: ExerciseData[] = [
  // LEG EXERCISES
  {
    id: 'angled-leg-press',
    name: 'Angled Leg Press',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    notes: 'Sit in angled leg press machine, feet shoulder-width apart, lower weight until knees at 90 degrees, press through heels.',
    videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
    difficulty: 'beginner',
    equipment: ['Leg Press Machine'],
    isCustom: false
  },
  {
    id: 'horizontal-leg-press',
    name: 'Horizontal Leg Press',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes'],
    notes: 'Lie horizontally in leg press machine, control the descent and drive through heels to press weight.',
    videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
    difficulty: 'beginner',
    equipment: ['Leg Press Machine'],
    isCustom: false
  },
  {
    id: 'leg-extension',
    name: 'Leg Extension',
    category: 'legs',
    muscleGroup: ['Quadriceps'],
    notes: 'Sit in leg extension machine, extend legs fully, squeeze quads at top, control the descent.',
    videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0',
    difficulty: 'beginner',
    equipment: ['Leg Extension Machine'],
    isCustom: false
  },
  {
    id: 'seated-leg-curl',
    name: 'Seated Leg Curl',
    category: 'legs',
    muscleGroup: ['Hamstrings'],
    notes: 'Sit in leg curl machine, curl heels toward glutes, squeeze hamstrings, control the return.',
    videoUrl: 'https://www.youtube.com/watch?v=ELOCsoDSmrg',
    difficulty: 'beginner',
    equipment: ['Leg Curl Machine'],
    isCustom: false
  },
  {
    id: 'leg-curl-lying-down',
    name: 'Leg Curl Lying Down',
    category: 'legs',
    muscleGroup: ['Hamstrings'],
    notes: 'Lie face down, curl heels toward glutes, focus on hamstring contraction, control the negative.',
    videoUrl: 'https://www.youtube.com/watch?v=ELOCsoDSmrg',
    difficulty: 'beginner',
    equipment: ['Leg Curl Machine'],
    isCustom: false
  },
  {
    id: 'standing-leg-curl',
    name: 'Standing Leg Curl',
    category: 'legs',
    muscleGroup: ['Hamstrings'],
    notes: 'Stand at machine, curl one leg at a time, maintain balance, focus on hamstring isolation.',
    difficulty: 'intermediate',
    equipment: ['Standing Leg Curl Machine'],
    isCustom: false
  },
  {
    id: 'machine-hip-thrust',
    name: 'Machine Hip Thrust',
    category: 'legs',
    muscleGroup: ['Glutes', 'Hamstrings'],
    notes: 'Sit against hip thrust machine, drive hips up, squeeze glutes at top, control descent.',
    videoUrl: 'https://www.youtube.com/watch?v=xDmFkJxPzeM',
    difficulty: 'intermediate',
    equipment: ['Hip Thrust Machine'],
    isCustom: false
  },
  {
    id: 'standing-abductor-machine',
    name: 'Standing Abductor Machine',
    category: 'legs',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    notes: 'Stand at abductor machine, lift leg out to side against resistance, control the movement.',
    difficulty: 'beginner',
    equipment: ['Abductor Machine'],
    isCustom: false
  },
  {
    id: 'abductors-machine',
    name: 'Abductors Machine',
    category: 'legs',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    notes: 'Sit in abductor machine, push legs apart against resistance, squeeze glutes and abductors.',
    difficulty: 'beginner',
    equipment: ['Abductor Machine'],
    isCustom: false
  },
  {
    id: 'adductors-machine',
    name: 'Adductors Machine',
    category: 'legs',
    muscleGroup: ['Hip Adductors'],
    notes: 'Sit in adductor machine, squeeze legs together against resistance, control the movement.',
    difficulty: 'beginner',
    equipment: ['Adductor Machine'],
    isCustom: false
  },
  {
    id: 'squat-smith-machine',
    name: 'Squat SMITH Machine',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    notes: 'Position bar on upper traps, descend by sitting back, knees track over toes, drive through heels.',
    videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
    difficulty: 'intermediate',
    equipment: ['Smith Machine'],
    isCustom: false
  },
  {
    id: 'hack-squat',
    name: 'Hack Squat',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes'],
    notes: 'Position shoulders under pads, feet hip-width apart, descend until thighs parallel, drive up.',
    videoUrl: 'https://www.youtube.com/watch?v=EdtaJRBqsOE',
    difficulty: 'intermediate',
    equipment: ['Hack Squat Machine'],
    isCustom: false
  },
  {
    id: 'reverse-hack-squat',
    name: 'Reverse Hack Squat',
    category: 'legs',
    muscleGroup: ['Glutes', 'Hamstrings', 'Quadriceps'],
    notes: 'Face the hack squat machine, position chest against pad, focus on glute activation.',
    difficulty: 'intermediate',
    equipment: ['Hack Squat Machine'],
    isCustom: false
  },
  {
    id: 'barbell-squat',
    name: 'Barbell Squat',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    notes: 'Bar on upper traps, feet shoulder-width apart, descend by sitting back, drive through heels.',
    videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
    difficulty: 'advanced',
    equipment: ['Barbell', 'Squat Rack'],
    isCustom: false
  },
  {
    id: 'calf-machine',
    name: 'Calf Machine',
    category: 'legs',
    muscleGroup: ['Calves'],
    notes: 'Position shoulders under pads, rise up on toes, squeeze calves at top, control descent.',
    videoUrl: 'https://www.youtube.com/watch?v=gwLzBJYoWlI',
    difficulty: 'beginner',
    equipment: ['Calf Raise Machine'],
    isCustom: false
  },
  {
    id: 'bulgarian-squat',
    name: 'Bulgarian Squat',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes'],
    notes: 'Rear foot elevated on bench, lower into lunge position, drive through front heel to return.',
    videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE',
    difficulty: 'intermediate',
    equipment: ['Bench', 'Dumbbells'],
    isCustom: false
  },
  {
    id: 'single-leg-step-up',
    name: 'Single Leg Step Up',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes'],
    notes: 'Step onto bench with one leg, drive through heel, step down with control.',
    difficulty: 'intermediate',
    equipment: ['Bench', 'Dumbbells'],
    isCustom: false
  },
  {
    id: 'romanian-deadlifts-dumbbells',
    name: 'Romanian Deadlifts Dumbbells',
    category: 'legs',
    muscleGroup: ['Hamstrings', 'Glutes', 'Erector Spinae'],
    notes: 'Hip hinge movement with dumbbells, feel stretch in hamstrings, drive hips forward.',
    videoUrl: 'https://www.youtube.com/watch?v=2SHsk9AzdjA',
    difficulty: 'intermediate',
    equipment: ['Dumbbells'],
    isCustom: false
  },
  {
    id: 'romanian-deadlifts-barbell',
    name: 'Romanian Deadlifts Barbell',
    category: 'legs',
    muscleGroup: ['Hamstrings', 'Glutes', 'Erector Spinae'],
    notes: 'Hip hinge with barbell, keep bar close to legs, feel hamstring stretch, return with hip drive.',
    videoUrl: 'https://www.youtube.com/watch?v=2SHsk9AzdjA',
    difficulty: 'intermediate',
    equipment: ['Barbell'],
    isCustom: false
  },
  {
    id: 'barbell-deadlift',
    name: 'Barbell Deadlift',
    category: 'legs',
    muscleGroup: ['Hamstrings', 'Glutes', 'Erector Spinae', 'Quadriceps'],
    notes: 'Hip-width stance, grip bar outside legs, keep chest up, drive through heels, neutral spine.',
    videoUrl: 'https://www.youtube.com/watch?v=ytGaGIn3SjE',
    difficulty: 'advanced',
    equipment: ['Barbell'],
    isCustom: false
  },

  // CHEST EXERCISES
  {
    id: 'dumbbell-flat-bench-press',
    name: 'Dumbbell Flat Bench Press',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    notes: 'Lie flat on bench, press dumbbells up and together, lower with control to chest level.',
    videoUrl: 'https://www.youtube.com/watch?v=QcuF1YiMReM',
    difficulty: 'intermediate',
    equipment: ['Dumbbells', 'Bench'],
    isCustom: false
  },
  {
    id: 'dumbbell-inclined-bench-press',
    name: 'Dumbbell Inclined Bench Press',
    category: 'chest',
    muscleGroup: ['Upper Pectorals', 'Triceps', 'Anterior Deltoids'],
    notes: 'Set bench to 30-45 degree incline, press dumbbells up, focus on upper chest contraction.',
    videoUrl: 'https://www.youtube.com/watch?v=8iPEnn-ltC8',
    difficulty: 'intermediate',
    equipment: ['Dumbbells', 'Incline Bench'],
    isCustom: false
  },
  {
    id: 'barbell-flat-bench-press',
    name: 'Barbell Flat Bench Press',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    notes: 'Lie flat, grip bar slightly wider than shoulders, lower to chest, press up explosively.',
    videoUrl: 'https://www.youtube.com/watch?v=gRVjAtPip0Y',
    difficulty: 'intermediate',
    equipment: ['Barbell', 'Bench'],
    isCustom: false
  },
  {
    id: 'barbell-incline-bench-press',
    name: 'Barbell Incline Bench Press',
    category: 'chest',
    muscleGroup: ['Upper Pectorals', 'Triceps', 'Anterior Deltoids'],
    notes: 'Set bench to 30-45 degree incline, grip bar slightly wider than shoulders, focus on upper chest.',
    videoUrl: 'https://www.youtube.com/watch?v=IP9aRxuBqhA',
    difficulty: 'intermediate',
    equipment: ['Barbell', 'Incline Bench'],
    isCustom: false
  },
  {
    id: 'smith-machine-flat-bench-press',
    name: 'SMITH Machine Flat Bench Press',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    notes: 'Use Smith machine for guided movement, focus on chest contraction, control the descent.',
    difficulty: 'beginner',
    equipment: ['Smith Machine', 'Bench'],
    isCustom: false
  },
  {
    id: 'smith-machine-incline-bench-press',
    name: 'SMITH Machine Incline Bench Press',
    category: 'chest',
    muscleGroup: ['Upper Pectorals', 'Triceps', 'Anterior Deltoids'],
    notes: 'Incline bench with Smith machine, controlled movement, focus on upper chest development.',
    difficulty: 'beginner',
    equipment: ['Smith Machine', 'Incline Bench'],
    isCustom: false
  },
  {
    id: 'chest-press',
    name: 'Chest Press',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    notes: 'Sit in chest press machine, press handles forward, squeeze chest muscles, control return.',
    difficulty: 'beginner',
    equipment: ['Chest Press Machine'],
    isCustom: false
  },
  {
    id: 'chest-fly-machine',
    name: 'Chest Fly Machine',
    category: 'chest',
    muscleGroup: ['Pectorals'],
    notes: 'Sit in fly machine, bring arms together in wide arc, squeeze chest at center.',
    difficulty: 'beginner',
    equipment: ['Chest Fly Machine'],
    isCustom: false
  },
  {
    id: 'dumbbell-fly-incline-bench',
    name: 'Dumbbell Fly on Incline Bench',
    category: 'chest',
    muscleGroup: ['Upper Pectorals'],
    notes: 'Incline bench, arms slightly bent, lower weights in wide arc, squeeze upper chest.',
    videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
    difficulty: 'intermediate',
    equipment: ['Dumbbells', 'Incline Bench'],
    isCustom: false
  },
  {
    id: 'dumbbell-fly-flat-bench',
    name: 'Dumbbell Fly on Flat Bench',
    category: 'chest',
    muscleGroup: ['Pectorals'],
    notes: 'Lie on flat bench, arms slightly bent, lower in wide arc, squeeze chest together.',
    videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
    difficulty: 'intermediate',
    equipment: ['Dumbbells', 'Bench'],
    isCustom: false
  },
  {
    id: 'cable-chest-fly',
    name: 'Cable Chest Fly',
    category: 'chest',
    muscleGroup: ['Pectorals'],
    notes: 'Stand between cable machine, bring handles together in arc motion, squeeze chest.',
    difficulty: 'intermediate',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Triceps', 'Core'],
    notes: 'Start in plank position, lower chest to ground, push up explosively, keep body straight.',
    videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    difficulty: 'beginner',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  {
    id: 'dips',
    name: 'Dips',
    category: 'chest',
    muscleGroup: ['Lower Pectorals', 'Triceps'],
    notes: 'Support body on parallel bars, lower body by bending arms, push back up.',
    videoUrl: 'https://www.youtube.com/watch?v=6kALZikXxLc',
    difficulty: 'intermediate',
    equipment: ['Parallel Bars'],
    isCustom: false
  },

  // BACK EXERCISES
  {
    id: 'lat-machine-pulldown',
    name: 'Lat Machine Pulldown',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    notes: 'Sit upright, pull bar to upper chest, focus on squeezing lats, control the return.',
    videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
    difficulty: 'beginner',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'lat-machine-reverse-grip',
    name: 'Lat Machine Reverse Grip',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    notes: 'Pull lat bar with reverse (supinated) grip, focus on lat activation and bicep engagement.',
    difficulty: 'intermediate',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'triangle-bar-lat-pulldown',
    name: 'Triangle Bar Lat Pulldown',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    notes: 'Use triangle/V-bar attachment, pull to upper chest, focus on lat squeeze.',
    difficulty: 'intermediate',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'seated-cable-low-row-triangle',
    name: 'Seated Cable Low Row with Triangle Bar',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    notes: 'Sit upright, pull triangle bar to abdomen, squeeze shoulder blades together.',
    difficulty: 'beginner',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'single-arm-seated-low-row',
    name: 'Single Arm Seated Low Row',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    notes: 'Row one arm at a time, focus on lat contraction, avoid rotation.',
    difficulty: 'intermediate',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    notes: 'Hang from bar with palms facing away, pull body up until chin clears bar.',
    videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    difficulty: 'advanced',
    equipment: ['Pull-up Bar'],
    isCustom: false
  },
  {
    id: 'reverse-grip-pull-ups',
    name: 'Reverse Grip Pull-ups',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    notes: 'Pull-ups with supinated grip, increased bicep activation.',
    difficulty: 'advanced',
    equipment: ['Pull-up Bar'],
    isCustom: false
  },
  {
    id: 'neutral-grip-pull-ups',
    name: 'Neutral Grip Pull-ups',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    notes: 'Use parallel grip handles, pull up focusing on lat activation.',
    difficulty: 'advanced',
    equipment: ['Pull-up Bar'],
    isCustom: false
  },
  {
    id: 'bent-over-row',
    name: 'Barbell Row',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    notes: 'Hip hinge position, pull bar to lower chest, squeeze shoulder blades.',
    videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
    difficulty: 'intermediate',
    equipment: ['Barbell'],
    isCustom: false
  },
  {
    id: 'single-arm-dumbbell-row',
    name: 'Single Arm Dumbbell Row on Bench',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    notes: 'Support body on bench, row dumbbell to hip, focus on lat contraction.',
    difficulty: 'intermediate',
    equipment: ['Dumbbells', 'Bench'],
    isCustom: false
  },
  {
    id: 't-bar-row',
    name: 'T-Bar Row',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    notes: 'Straddle T-bar, pull to chest, focus on squeezing shoulder blades.',
    difficulty: 'intermediate',
    equipment: ['T-Bar'],
    isCustom: false
  },
  {
    id: 'hyperextension',
    name: 'Hyperextension',
    category: 'back',
    muscleGroup: ['Erector Spinae', 'Glutes'],
    notes: 'Position hips on pad, lower torso, extend back up using lower back muscles.',
    difficulty: 'beginner',
    equipment: ['Hyperextension Bench'],
    isCustom: false
  },

  // SHOULDER EXERCISES
  {
    id: 'barbell-shoulder-press',
    name: 'Barbell Shoulder Press',
    category: 'shoulders',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    notes: 'Stand with feet hip-width apart, press bar overhead, keep core tight.',
    videoUrl: 'https://www.youtube.com/watch?v=QSgd7AEVK9I',
    difficulty: 'intermediate',
    equipment: ['Barbell'],
    isCustom: false
  },
  {
    id: 'shoulder-press-machine',
    name: 'Shoulder Press Machine',
    category: 'shoulders',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    notes: 'Sit in machine, press handles overhead, control the descent.',
    difficulty: 'beginner',
    equipment: ['Shoulder Press Machine'],
    isCustom: false
  },
  {
    id: 'standing-lateral-raises',
    name: 'Standing Lateral Raises',
    category: 'shoulders',
    muscleGroup: ['Medial Deltoids'],
    notes: 'Hold dumbbells at sides, raise arms to shoulder height, control descent.',
    videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
    difficulty: 'beginner',
    equipment: ['Dumbbells'],
    isCustom: false
  },
  {
    id: 'single-arm-lateral-raises',
    name: 'Single Arm Lateral Raises',
    category: 'shoulders',
    muscleGroup: ['Medial Deltoids'],
    notes: 'Raise one arm at a time, focus on medial deltoid isolation.',
    difficulty: 'beginner',
    equipment: ['Dumbbells'],
    isCustom: false
  },
  {
    id: 'single-arm-cable-lateral-raise',
    name: 'Single Arm Cable Lateral Raise',
    category: 'shoulders',
    muscleGroup: ['Medial Deltoids'],
    notes: 'Use low cable pulley, raise arm to shoulder height, control the movement.',
    difficulty: 'intermediate',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'single-arm-cable-rear-delt-fly',
    name: 'Single Arm Cable Rear Delt Fly',
    category: 'shoulders',
    muscleGroup: ['Posterior Deltoids'],
    notes: 'Pull cable across body, focus on rear deltoid contraction.',
    difficulty: 'intermediate',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'bent-over-rear-delt-flys',
    name: 'Bent Over Rear Delt Flys',
    category: 'shoulders',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    notes: 'Bend forward, arms slightly bent, raise weights out to sides.',
    videoUrl: 'https://www.youtube.com/watch?v=ea7qmaN0f_c',
    difficulty: 'beginner',
    equipment: ['Dumbbells'],
    isCustom: false
  },
  {
    id: 'standing-dumbell-front-raises',
    name: 'Standing Dumbbell Front Raises',
    category: 'shoulders',
    muscleGroup: ['Anterior Deltoids'],
    notes: 'Raise dumbbells in front to shoulder height, control the descent.',
    difficulty: 'beginner',
    equipment: ['Dumbbells'],
    isCustom: false
  },
  {
    id: 'standing-dumbbell-shoulder-press',
    name: 'Standing Dumbbell Shoulder Press',
    category: 'shoulders',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    notes: 'Press dumbbells overhead, core engaged, controlled movement.',
    difficulty: 'intermediate',
    equipment: ['Dumbbells'],
    isCustom: false
  },
  {
    id: 'seated-dumbbell-shoulder-press',
    name: 'Seated Dumbbell Shoulder Press',
    category: 'shoulders',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    notes: 'Sit with back support, press dumbbells overhead, control descent.',
    difficulty: 'intermediate',
    equipment: ['Dumbbells', 'Bench'],
    isCustom: false
  },
  {
    id: 'upright-barbell-rows',
    name: 'Upright Barbell Rows',
    category: 'shoulders',
    muscleGroup: ['Medial Deltoids', 'Upper Trapezius'],
    notes: 'Pull bar up to chest height, elbows high, focus on deltoid activation.',
    difficulty: 'intermediate',
    equipment: ['Barbell'],
    isCustom: false
  },

  // ARM EXERCISES
  {
    id: 'biceps-cable-curl',
    name: 'Biceps Cable Curl',
    category: 'arms',
    muscleGroup: ['Biceps'],
    notes: 'Stand at cable machine, curl handles up, squeeze biceps at top.',
    difficulty: 'beginner',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'cable-tricep-pushdown',
    name: 'Cable Tricep Pushdown',
    category: 'arms',
    muscleGroup: ['Triceps'],
    notes: 'Press cable bar down, keep elbows at sides, squeeze triceps.',
    difficulty: 'beginner',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'reverse-grip-cable-pushdown',
    name: 'Reverse Grip Cable Pushdown',
    category: 'arms',
    muscleGroup: ['Triceps'],
    notes: 'Use reverse grip on cable pushdown, focus on tricep long head.',
    difficulty: 'intermediate',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'cable-rope-pushdown',
    name: 'Cable Rope Pushdown',
    category: 'arms',
    muscleGroup: ['Triceps'],
    notes: 'Use rope attachment, push down and apart at bottom, squeeze triceps.',
    difficulty: 'intermediate',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'barbell-preacher-curl',
    name: 'Barbell Preacher Curl',
    category: 'arms',
    muscleGroup: ['Biceps'],
    notes: 'Use preacher bench, curl barbell with controlled movement, focus on bicep isolation.',
    difficulty: 'intermediate',
    equipment: ['Barbell', 'Preacher Bench'],
    isCustom: false
  },
  {
    id: 'dumbbell-preacher-curl',
    name: 'Dumbbell Preacher Curl',
    category: 'arms',
    muscleGroup: ['Biceps'],
    notes: 'Single arm preacher curls, focus on bicep contraction and control.',
    difficulty: 'intermediate',
    equipment: ['Dumbbells', 'Preacher Bench'],
    isCustom: false
  },
  {
    id: 'standing-dumbbell-curl-hammer-grip',
    name: 'Standing Dumbbell Curl Hammer Grip',
    category: 'arms',
    muscleGroup: ['Biceps', 'Brachialis'],
    notes: 'Neutral grip curls, focus on brachialis and bicep development.',
    difficulty: 'beginner',
    equipment: ['Dumbbells'],
    isCustom: false
  },
  {
    id: 'wide-grip-barbell-curl',
    name: 'Wide Grip Barbell Curl',
    category: 'arms',
    muscleGroup: ['Biceps'],
    notes: 'Wider than shoulder grip, curl bar up, focus on outer bicep head.',
    difficulty: 'intermediate',
    equipment: ['Barbell'],
    isCustom: false
  },
  {
    id: 'close-grip-barbell-bench-press',
    name: 'Close Grip Barbell Bench Press',
    category: 'arms',
    muscleGroup: ['Triceps', 'Pectorals'],
    notes: 'Narrow grip on bar, focus on tricep engagement, press up explosively.',
    videoUrl: 'https://www.youtube.com/watch?v=nEF0bv2FW94',
    difficulty: 'intermediate',
    equipment: ['Barbell', 'Bench'],
    isCustom: false
  },
  {
    id: 'single-arm-dumbbell-kickback',
    name: 'Single Arm Dumbbell Kickback',
    category: 'arms',
    muscleGroup: ['Triceps'],
    notes: 'Lean on bench, extend arm back, squeeze tricep at extension.',
    difficulty: 'beginner',
    equipment: ['Dumbbells', 'Bench'],
    isCustom: false
  },
  {
    id: 'overhead-dumbbell-tricep-extension',
    name: 'Overhead Dumbbell Tricep Extension',
    category: 'arms',
    muscleGroup: ['Triceps'],
    notes: 'Hold dumbbell overhead, lower behind head, extend back up.',
    difficulty: 'intermediate',
    equipment: ['Dumbbells'],
    isCustom: false
  },

  // CORE EXERCISES
  {
    id: 'plank',
    name: 'Plank',
    category: 'core',
    muscleGroup: ['Core', 'Rectus Abdominis'],
    notes: 'Forearm plank position, keep body straight from head to heels.',
    videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
    difficulty: 'beginner',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  {
    id: 'crunch',
    name: 'Crunch',
    category: 'core',
    muscleGroup: ['Rectus Abdominis'],
    notes: 'Lie on back, lift shoulders off ground, squeeze abs at top.',
    difficulty: 'beginner',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  {
    id: 'reverse-crunch',
    name: 'Reverse Crunch',
    category: 'core',
    muscleGroup: ['Lower Abs'],
    notes: 'Lift knees toward chest, focus on lower abdominal contraction.',
    difficulty: 'beginner',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  {
    id: 'v-up',
    name: 'V Up',
    category: 'core',
    muscleGroup: ['Rectus Abdominis', 'Hip Flexors'],
    notes: 'Simultaneously lift legs and torso, form V-shape at top.',
    difficulty: 'intermediate',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg Raise',
    category: 'core',
    muscleGroup: ['Lower Abs', 'Hip Flexors'],
    notes: 'Hang from bar, raise legs to horizontal, control the descent.',
    difficulty: 'advanced',
    equipment: ['Pull-up Bar'],
    isCustom: false
  },
  {
    id: 'kneeling-cable-crunch',
    name: 'Kneeling Cable Crunch',
    category: 'core',
    muscleGroup: ['Rectus Abdominis'],
    notes: 'Kneel at cable machine, crunch down against resistance.',
    difficulty: 'intermediate',
    equipment: ['Cable Machine'],
    isCustom: false
  },
  {
    id: 'mountain-climber',
    name: 'Mountain Climber',
    category: 'core',
    muscleGroup: ['Core', 'Hip Flexors'],
    notes: 'Plank position, alternate bringing knees to chest rapidly.',
    videoUrl: 'https://www.youtube.com/watch?v=kLh-uczlPLg',
    difficulty: 'intermediate',  
    equipment: ['Bodyweight'],
    isCustom: false
  },

  // CARDIO EXERCISES
  {
    id: 'treadmill',
    name: 'TreadMill',
    category: 'cardio',
    muscleGroup: ['Full Body'],
    notes: 'Running or walking on treadmill, adjust speed and incline as needed.',
    difficulty: 'beginner',
    equipment: ['Treadmill'],
    isCustom: false
  },
  {
    id: 'stationary-bike',
    name: 'Stationary Bike',
    category: 'cardio',
    muscleGroup: ['Quadriceps', 'Glutes', 'Calves'],
    notes: 'Pedal at steady pace, adjust resistance for intensity.',
    difficulty: 'beginner',
    equipment: ['Stationary Bike'],
    isCustom: false
  },
  {
    id: 'rowing-machine',
    name: 'Rowing Machine',
    category: 'cardio',
    muscleGroup: ['Full Body'],
    notes: 'Full body cardio, drive with legs, pull with back and arms.',
    difficulty: 'intermediate',
    equipment: ['Rowing Machine'],
    isCustom: false
  },
  {
    id: 'elliptical',
    name: 'Elliptical',
    category: 'cardio',
    muscleGroup: ['Full Body'],
    notes: 'Low-impact cardio, smooth elliptical motion with arms.',
    difficulty: 'beginner',
    equipment: ['Elliptical Machine'],
    isCustom: false
  },
  {
    id: 'jumping-rope',
    name: 'Jumping Rope',
    category: 'cardio',
    muscleGroup: ['Calves', 'Shoulders', 'Core'],
    notes: 'Jump rope for cardio, maintain rhythm and light foot contact.',
    difficulty: 'intermediate',
    equipment: ['Jump Rope'],
    isCustom: false
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'cardio',
    muscleGroup: ['Full Body'],
    notes: 'Squat down, jump back to plank, push-up, jump feet to hands, jump up.',
    videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU',
    difficulty: 'intermediate',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  {
    id: 'jumping-lunge',
    name: 'Jumping Lunge',
    category: 'cardio',
    muscleGroup: ['Quadriceps', 'Glutes'],
    notes: 'Alternate jumping lunges, explosive movement, soft landing.',
    difficulty: 'intermediate',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  {
    id: 'jump-squat',
    name: 'Jump Squat',
    category: 'cardio',
    muscleGroup: ['Quadriceps', 'Glutes'],
    notes: 'Squat down, jump up explosively, land softly into next squat.',
    difficulty: 'intermediate',
    equipment: ['Bodyweight'],
    isCustom: false
  },

  // CROSSFIT WODS
  {
    id: 'barbara',
    name: 'BARBARA',
    category: 'cardio',
    muscleGroup: ['Full Body'],
    notes: '20 Pull-ups, 30 Push-ups, 40 Sit-ups, 50 Air Squats. 5 rounds for time. Rest 3 minutes between rounds.',
    difficulty: 'advanced',
    equipment: ['Pull-up Bar', 'Bodyweight'],
    isCustom: false
  },
  {
    id: 'chelsea',
    name: 'CHELSEA',
    category: 'cardio',
    muscleGroup: ['Full Body'],
    notes: 'Every minute on the minute for 30 minutes: 5 Pull-ups, 10 Push-ups, 15 Air Squats.',
    difficulty: 'advanced',
    equipment: ['Pull-up Bar', 'Bodyweight'],
    isCustom: false
  },
  {
    id: 'mary',
    name: 'MARY',
    category: 'cardio',
    muscleGroup: ['Full Body'],
    notes: 'AMRAP in 20 minutes: 5 Handstand Push-ups, 10 Pistol Squats, 15 Pull-ups.',
    difficulty: 'advanced',
    equipment: ['Pull-up Bar', 'Bodyweight'],
    isCustom: false
  },
  {
    id: 'cindy',
    name: 'CINDY',
    category: 'cardio',
    muscleGroup: ['Full Body'],
    notes: 'AMRAP in 20 minutes: 5 Pull-ups, 10 Push-ups, 15 Air Squats.',
    difficulty: 'intermediate',
    equipment: ['Pull-up Bar', 'Bodyweight'],
    isCustom: false
  },
  {
    id: 'annie',
    name: 'ANNIE',
    category: 'cardio',
    muscleGroup: ['Full Body'],
    notes: '50-40-30-20-10 reps for time: Double-unders and Sit-ups.',
    difficulty: 'intermediate',
    equipment: ['Jump Rope', 'Bodyweight'],
    isCustom: false
  },
  {
    id: 'fran',
    name: 'FRAN',
    category: 'cardio',
    muscleGroup: ['Full Body'],
    notes: '21-15-9 reps for time: Thrusters (95/65 lb) and Pull-ups.',
    difficulty: 'advanced',
    equipment: ['Barbell', 'Pull-up Bar'],
    isCustom: false
  },

  // STRETCHING EXERCISES
  {
    id: 'hamstring-stretch',
    name: 'Hamstring Stretch',
    category: 'stretching',
    muscleGroup: ['Hamstrings'],
    notes: 'Sit with one leg extended, reach toward toes, hold stretch.',
    videoUrl: 'https://www.youtube.com/watch?v=g6-t8E8TNDQ',
    difficulty: 'beginner',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  {
    id: 'hip-flexor-stretch',
    name: 'Hip Flexor Stretch',
    category: 'stretching',
    muscleGroup: ['Hip Flexors'],
    notes: 'Lunge position, push hips forward, feel stretch in front of rear leg hip.',
    videoUrl: 'https://www.youtube.com/watch?v=UGEpQ1BRx-4',
    difficulty: 'beginner',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  {
    id: 'shoulder-dislocates',
    name: 'Shoulder Dislocates',
    category: 'stretching',
    muscleGroup: ['Shoulders', 'Chest'],
    notes: 'Hold resistance band wide, pass band over head and behind back.',
    videoUrl: 'https://www.youtube.com/watch?v=02HdChcpyBw',
    difficulty: 'beginner',
    equipment: ['Resistance Band'],
    isCustom: false
  }
];

export const getExercisesByCategory = (category: string) => {
  return exerciseDatabase.filter(exercise => exercise.category === category);
};

export const searchExercises = (query: string) => {
  if (!query) return exerciseDatabase;
  
  return exerciseDatabase.filter(exercise =>
    exercise.name.toLowerCase().includes(query.toLowerCase()) ||
    exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(query.toLowerCase())) ||
    exercise.category.toLowerCase().includes(query.toLowerCase())
  );
};

export const getExerciseById = (id: string) => {
  return exerciseDatabase.find(exercise => exercise.id === id);
};
