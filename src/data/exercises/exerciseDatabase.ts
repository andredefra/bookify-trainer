
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
  // LEGS EXERCISES
  {
    id: 'angled-leg-press',
    name: 'Angled Leg Press',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Leg Press Machine'],
    primaryEquipment: 'Leg Press Machine',
    difficulty: 'beginner',
    notes: 'Sit in the leg press machine at an angle, place feet shoulder-width apart on the platform. Lower the weight slowly and press back up.',
    videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
    equipmentImages: generateEquipmentImages(['Leg Press Machine']),
    alternativeExercises: ['horizontal-leg-press', 'squats']
  },
  {
    id: 'horizontal-leg-press',
    name: 'Horizontal Leg Press',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Leg Press Machine'],
    primaryEquipment: 'Leg Press Machine',
    difficulty: 'beginner',
    notes: 'Sit in horizontal leg press machine, place feet on platform. Press weight forward maintaining controlled movement.',
    videoUrl: 'https://www.youtube.com/watch?v=0tn5K9NlCfo',
    equipmentImages: generateEquipmentImages(['Leg Press Machine']),
    alternativeExercises: ['angled-leg-press', 'squats']
  },
  {
    id: 'leg-extension',
    name: 'Leg Extension',
    category: 'legs',
    muscleGroup: ['Quadriceps'],
    equipment: ['Leg Extension Machine'],
    primaryEquipment: 'Leg Extension Machine',
    difficulty: 'beginner',
    notes: 'Sit on leg extension machine, secure your ankles behind the lower pad. Extend your legs smoothly to full extension.',
    videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0',
    equipmentImages: generateEquipmentImages(['Leg Extension Machine']),
    alternativeExercises: ['squats', 'lunges']
  },
  {
    id: 'seated-leg-curl',
    name: 'Seated Leg Curl',
    category: 'legs',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    primaryEquipment: 'Leg Curl Machine',
    difficulty: 'beginner',
    notes: 'Sit on leg curl machine, position ankles in front of lower pad. Curl heels toward glutes by flexing hamstrings.',
    videoUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuHs',
    equipmentImages: generateEquipmentImages(['Leg Curl Machine']),
    alternativeExercises: ['lying-leg-curl', 'romanian-deadlifts']
  },
  {
    id: 'lying-leg-curl',
    name: 'Leg Curl Lying Down',
    category: 'legs',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    primaryEquipment: 'Leg Curl Machine',
    difficulty: 'beginner',
    notes: 'Lie face down on leg curl machine, position ankles under pad. Curl heels toward glutes maintaining smooth motion.',
    videoUrl: 'https://www.youtube.com/watch?v=ELOCsoDSmrg',
    equipmentImages: generateEquipmentImages(['Leg Curl Machine']),
    alternativeExercises: ['seated-leg-curl', 'romanian-deadlifts']
  },
  {
    id: 'standing-leg-curl',
    name: 'Standing Leg Curl',
    category: 'legs',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    primaryEquipment: 'Leg Curl Machine',
    difficulty: 'beginner',
    notes: 'Stand on machine platform, position one ankle behind pad. Curl heel toward glute, alternate legs.',
    videoUrl: 'https://www.youtube.com/watch?v=F488k67BTNo',
    equipmentImages: generateEquipmentImages(['Leg Curl Machine']),
    alternativeExercises: ['lying-leg-curl', 'seated-leg-curl']
  },
  {
    id: 'machine-hip-thrust',
    name: 'Machine Hip Thrust',
    category: 'legs',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Hip Thrust Machine'],
    primaryEquipment: 'Hip Thrust Machine',
    difficulty: 'intermediate',
    notes: 'Sit with back against pad, position barbell across hips. Drive hips up by squeezing glutes, pause at top.',
    videoUrl: 'https://www.youtube.com/watch?v=xDmFkJxPzeM',
    equipmentImages: generateEquipmentImages(['Hip Thrust Machine']),
    alternativeExercises: ['barbell-hip-thrust', 'glute-bridge']
  },
  {
    id: 'standing-abductor-machine',
    name: 'Standing Abductor Machine',
    category: 'legs',
    muscleGroup: ['Glutes', 'Hip Abductors'],
    equipment: ['Abductor Machine'],
    primaryEquipment: 'Abductor Machine',
    difficulty: 'beginner',
    notes: 'Stand on machine, place leg against pad. Push leg outward against resistance, control the return.',
    videoUrl: 'https://www.youtube.com/watch?v=YzILkGp5yBw',
    equipmentImages: generateEquipmentImages(['Abductor Machine']),
    alternativeExercises: ['seated-abductor-machine', 'lateral-leg-raises']
  },
  {
    id: 'seated-abductor-machine',
    name: 'Abductors Machine',
    category: 'legs',
    muscleGroup: ['Glutes', 'Hip Abductors'],
    equipment: ['Abductor Machine'],
    primaryEquipment: 'Abductor Machine',
    difficulty: 'beginner',
    notes: 'Sit on machine with knees against pads. Push knees apart against resistance, control the return movement.',
    videoUrl: 'https://www.youtube.com/watch?v=oNb0Q2gvQBY',
    equipmentImages: generateEquipmentImages(['Abductor Machine']),
    alternativeExercises: ['standing-abductor-machine', 'lateral-leg-raises']
  },
  {
    id: 'seated-adductor-machine',
    name: 'Adductors Machine',
    category: 'legs',
    muscleGroup: ['Hip Adductors'],
    equipment: ['Adductor Machine'],
    primaryEquipment: 'Adductor Machine',
    difficulty: 'beginner',
    notes: 'Sit on machine with knees against outer pads. Squeeze knees together against resistance.',
    videoUrl: 'https://www.youtube.com/watch?v=YL6IVIr5wl0',
    equipmentImages: generateEquipmentImages(['Adductor Machine']),
    alternativeExercises: ['sumo-squats', 'side-lunges']
  },
  {
    id: 'smith-machine-squat',
    name: 'Squat SMITH Machine',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Smith Machine'],
    primaryEquipment: 'Smith Machine',
    difficulty: 'intermediate',
    notes: 'Position barbell on upper back in Smith machine. Squat down keeping chest up, knees tracking over toes.',
    videoUrl: 'https://www.youtube.com/watch?v=rWdeVZiZBIM',
    equipmentImages: generateEquipmentImages(['Smith Machine']),
    alternativeExercises: ['barbell-squats', 'leg-press']
  },
  {
    id: 'hack-squat',
    name: 'Hack Squat',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Hack Squat Machine'],
    primaryEquipment: 'Hack Squat Machine',
    difficulty: 'intermediate',
    notes: 'Stand in hack squat machine with back against pad. Squat down keeping knees aligned with toes.',
    videoUrl: 'https://www.youtube.com/watch?v=EdtaJRBqEYI',
    equipmentImages: generateEquipmentImages(['Hack Squat Machine']),
    alternativeExercises: ['leg-press', 'squats']
  },
  {
    id: 'reverse-hack-squat',
    name: 'Reverse Hack Squat',
    category: 'legs',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Hack Squat Machine'],
    primaryEquipment: 'Hack Squat Machine',
    difficulty: 'intermediate',
    notes: 'Face the hack squat machine, position shoulders under pads. Squat down emphasizing glute engagement.',
    videoUrl: 'https://www.youtube.com/watch?v=QhT2StfxksY',
    equipmentImages: generateEquipmentImages(['Hack Squat Machine']),
    alternativeExercises: ['hack-squat', 'romanian-deadlifts']
  },
  {
    id: 'barbell-squats',
    name: 'Barbell Squat',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings', 'Erector Spinae'],
    equipment: ['Barbell', 'Power Rack'],
    primaryEquipment: 'Barbell',
    difficulty: 'advanced',
    notes: 'Place barbell on upper back, squat down keeping chest up and knees tracking over toes. Requires proper form.',
    videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
    equipmentImages: generateEquipmentImages(['Barbell', 'Power Rack']),
    alternativeExercises: ['goblet-squats', 'front-squats', 'leg-press']
  },
  {
    id: 'calf-machine',
    name: 'Calf Machine',
    category: 'legs',
    muscleGroup: ['Calves'],
    equipment: ['Calf Raise Machine'],
    primaryEquipment: 'Calf Raise Machine',
    difficulty: 'beginner',
    notes: 'Stand on calf machine with shoulders under pads. Rise up on toes, squeeze calves at top, lower slowly.',
    videoUrl: 'https://www.youtube.com/watch?v=gwLzBJYoWlI',
    equipmentImages: generateEquipmentImages(['Calf Raise Machine']),
    alternativeExercises: ['standing-calf-raises', 'seated-calf-raises']
  },

  // CHEST EXERCISES
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Barbell', 'Bench'],
    primaryEquipment: 'Barbell',
    difficulty: 'intermediate',
    notes: 'Lie on bench, grip barbell slightly wider than shoulders. Lower to chest, press up maintaining control.',
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
    notes: 'Lie on bench with dumbbells. Lower with control, press up allowing greater range of motion than barbell.',
    videoUrl: 'https://www.youtube.com/watch?v=VmB1G1K7v94',
    equipmentImages: generateEquipmentImages(['Dumbbells', 'Bench']),
    alternativeExercises: ['bench-press', 'push-ups', 'incline-dumbbell-press']
  },
  {
    id: 'dumbbell-incline-press',
    name: 'Dumbbell Inclined Bench Press',
    category: 'chest',
    muscleGroup: ['Upper Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    primaryEquipment: 'Dumbbells',
    difficulty: 'intermediate',
    notes: 'Lie on incline bench with dumbbells. Press up targeting upper chest fibers.',
    videoUrl: 'https://www.youtube.com/watch?v=8iPEnn-ltC8',
    equipmentImages: generateEquipmentImages(['Dumbbells', 'Incline Bench']),
    alternativeExercises: ['incline-barbell-press', 'incline-push-ups']
  },
  {
    id: 'incline-barbell-press',
    name: 'Barbell Incline Bench Press',
    category: 'chest',
    muscleGroup: ['Upper Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Barbell', 'Incline Bench'],
    primaryEquipment: 'Barbell',
    difficulty: 'intermediate',
    notes: 'Lie on incline bench, grip barbell wider than shoulders. Lower to upper chest, press up with control.',
    videoUrl: 'https://www.youtube.com/watch?v=jzJpYnAyWd8',
    equipmentImages: generateEquipmentImages(['Barbell', 'Incline Bench']),
    alternativeExercises: ['dumbbell-incline-press', 'incline-push-ups']
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Bodyweight'],
    primaryEquipment: 'Bodyweight',
    difficulty: 'beginner',
    notes: 'Start in plank position, lower body until chest nearly touches ground, push back up keeping body straight.',
    videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    equipmentImages: generateEquipmentImages(['Bodyweight']),
    alternativeExercises: ['bench-press', 'dumbbell-bench-press', 'incline-push-ups']
  },
  {
    id: 'chest-press-machine',
    name: 'Chest Press',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Chest Press Machine'],
    primaryEquipment: 'Chest Press Machine',
    difficulty: 'beginner',
    notes: 'Sit on chest press machine, adjust seat so handles are at chest level. Press forward with controlled motion.',
    videoUrl: 'https://www.youtube.com/watch?v=xUm0BiZCWlQ',
    equipmentImages: generateEquipmentImages(['Chest Press Machine']),
    alternativeExercises: ['bench-press', 'dumbbell-bench-press', 'push-ups']
  },
  {
    id: 'chest-fly-machine',
    name: 'Chest Fly Machine',
    category: 'chest',
    muscleGroup: ['Pectorals'],
    equipment: ['Chest Fly Machine'],
    primaryEquipment: 'Chest Fly Machine',
    difficulty: 'beginner',
    notes: 'Sit on fly machine, bring arms together in wide arc motion. Focus on squeezing chest muscles.',
    videoUrl: 'https://www.youtube.com/watch?v=Z2pBH5WsXjg',
    equipmentImages: generateEquipmentImages(['Chest Fly Machine']),
    alternativeExercises: ['cable-chest-fly', 'dumbbell-fly']
  },
  {
    id: 'cable-chest-fly',
    name: 'Cable Chest Fly',
    category: 'chest',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine'],
    primaryEquipment: 'Cable Machine',
    difficulty: 'intermediate',
    notes: 'Stand between cable stacks, bring handles together in arc motion. Maintain slight bend in elbows.',
    videoUrl: 'https://www.youtube.com/watch?v=Iwe6AmxVf7o',
    equipmentImages: generateEquipmentImages(['Cable Machine']),
    alternativeExercises: ['chest-fly-machine', 'dumbbell-fly']
  },
  {
    id: 'dumbbell-fly-incline',
    name: 'Dumbbell Fly on Incline Bench',
    category: 'chest',
    muscleGroup: ['Upper Pectorals'],
    equipment: ['Dumbbells', 'Incline Bench'],
    primaryEquipment: 'Dumbbells',
    difficulty: 'intermediate',
    notes: 'Lie on incline bench with dumbbells. Lower in wide arc, bring together over chest with slight elbow bend.',
    videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
    equipmentImages: generateEquipmentImages(['Dumbbells', 'Incline Bench']),
    alternativeExercises: ['incline-cable-fly', 'incline-press']
  },
  {
    id: 'dumbbell-fly-flat',
    name: 'Dumbbell Fly on Flat Bench',
    category: 'chest',
    muscleGroup: ['Pectorals'],
    equipment: ['Dumbbells', 'Bench'],
    primaryEquipment: 'Dumbbells',
    difficulty: 'intermediate',
    notes: 'Lie on flat bench with dumbbells. Lower in wide arc maintaining slight elbow bend, bring together over chest.',
    videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
    equipmentImages: generateEquipmentImages(['Dumbbells', 'Bench']),
    alternativeExercises: ['cable-chest-fly', 'chest-fly-machine']
  },

  // BACK EXERCISES
  {
    id: 'lat-pulldowns',
    name: 'Lat machine pulldown',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius', 'Biceps'],
    equipment: ['Lat Pulldown Machine'],
    primaryEquipment: 'Lat Pulldown Machine',
    difficulty: 'beginner',
    notes: 'Sit at lat pulldown, grip bar wider than shoulders. Pull down to upper chest, squeeze shoulder blades.',
    videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
    equipmentImages: generateEquipmentImages(['Lat Pulldown Machine']),
    alternativeExercises: ['pull-ups', 'cable-rows', 'inverted-rows']
  },
  {
    id: 'lat-pulldown-reverse',
    name: 'Lat machine reverse grip',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Lat Pulldown Machine'],
    primaryEquipment: 'Lat Pulldown Machine',
    difficulty: 'beginner',
    notes: 'Sit at lat pulldown with reverse (supinated) grip. Pull down emphasizing biceps and lower lats.',
    videoUrl: 'https://www.youtube.com/watch?v=Nzgr5IfO6o8',
    equipmentImages: generateEquipmentImages(['Lat Pulldown Machine']),
    alternativeExercises: ['chin-ups', 'lat-pulldowns']
  },
  {
    id: 'triangle-lat-pulldown',
    name: 'Triangle bar lat pulldown',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    equipment: ['Lat Pulldown Machine', 'Triangle Bar'],
    primaryEquipment: 'Lat Pulldown Machine',
    difficulty: 'beginner',
    notes: 'Use triangle/v-bar attachment on lat pulldown. Pull down to upper chest with neutral grip.',
    videoUrl: 'https://www.youtube.com/watch?v=lueEPIsNqZI',
    equipmentImages: generateEquipmentImages(['Lat Pulldown Machine']),
    alternativeExercises: ['lat-pulldowns', 'neutral-grip-pullups']
  },
  {
    id: 'seated-cable-row-triangle',
    name: 'Seated cable low row with triangle bar',
    category: 'back',
    muscleGroup: ['Rhomboids', 'Middle Trapezius', 'Latissimus Dorsi'],
    equipment: ['Cable Machine', 'Triangle Bar'],
    primaryEquipment: 'Cable Machine',
    difficulty: 'beginner',
    notes: 'Sit at cable row with triangle bar. Pull to lower chest/upper abdomen, squeeze shoulder blades.',
    videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74',
    equipmentImages: generateEquipmentImages(['Cable Machine']),
    alternativeExercises: ['barbell-rows', 'dumbbell-rows']
  },
  {
    id: 'single-arm-seated-row',
    name: 'Single arm seated low row',
    category: 'back',
    muscleGroup: ['Rhomboids', 'Middle Trapezius', 'Latissimus Dorsi'],
    equipment: ['Cable Machine'],
    primaryEquipment: 'Cable Machine',
    difficulty: 'intermediate',
    notes: 'Sit at cable row, use single handle. Pull to side of torso, focus on unilateral back development.',
    videoUrl: 'https://www.youtube.com/watch?v=UCXxvVItLoM',
    equipmentImages: generateEquipmentImages(['Cable Machine']),
    alternativeExercises: ['dumbbell-rows', 'seated-cable-row']
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
    videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    equipmentImages: generateEquipmentImages(['Pull-up Bar']),
    alternativeExercises: ['lat-pulldowns', 'assisted-pull-ups', 'inverted-rows']
  },
  {
    id: 'reverse-grip-pullups',
    name: 'Reverse grip pull-ups',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Pull-up Bar'],
    primaryEquipment: 'Pull-up Bar',
    difficulty: 'intermediate',
    notes: 'Hang from bar with reverse (supinated) grip. Pull up emphasizing biceps engagement.',
    videoUrl: 'https://www.youtube.com/watch?v=hdQP1GryNrA',
    equipmentImages: generateEquipmentImages(['Pull-up Bar']),
    alternativeExercises: ['lat-pulldown-reverse', 'pull-ups']
  },
  {
    id: 'deadlifts',
    name: 'Barbell deadlift',
    category: 'back',
    muscleGroup: ['Erector Spinae', 'Latissimus Dorsi', 'Rhomboids', 'Hamstrings', 'Glutes'],
    equipment: ['Barbell'],
    primaryEquipment: 'Barbell',
    difficulty: 'advanced',
    notes: 'Hip hinge movement lifting barbell from floor. Keep back straight, chest up, bar close to body.',
    videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
    equipmentImages: generateEquipmentImages(['Barbell']),
    alternativeExercises: ['romanian-deadlifts', 'rack-pulls', 'dumbbell-deadlifts']
  },
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    category: 'back',
    muscleGroup: ['Rhomboids', 'Middle Trapezius', 'Latissimus Dorsi'],
    equipment: ['Barbell'],
    primaryEquipment: 'Barbell',
    difficulty: 'intermediate',
    notes: 'Bend over holding barbell, pull to lower chest/upper abdomen. Keep back straight throughout.',
    videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
    equipmentImages: generateEquipmentImages(['Barbell']),
    alternativeExercises: ['dumbbell-rows', 'seated-cable-row']
  },

  // SHOULDERS EXERCISES
  {
    id: 'barbell-shoulder-press',
    name: 'Barbell shoulder press',
    category: 'shoulders',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Barbell'],
    primaryEquipment: 'Barbell',
    difficulty: 'intermediate',
    notes: 'Stand or sit with barbell at shoulder level. Press overhead maintaining core stability.',
    videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI',
    equipmentImages: generateEquipmentImages(['Barbell']),
    alternativeExercises: ['dumbbell-shoulder-press', 'shoulder-press-machine']
  },
  {
    id: 'shoulder-press-machine',
    name: 'Shoulder press machine',
    category: 'shoulders',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Shoulder Press Machine'],
    primaryEquipment: 'Shoulder Press Machine',
    difficulty: 'beginner',
    notes: 'Sit on shoulder press machine, adjust seat height. Press handles overhead with controlled motion.',
    videoUrl: 'https://www.youtube.com/watch?v=M2rwvNhTOu0',
    equipmentImages: generateEquipmentImages(['Shoulder Press Machine']),
    alternativeExercises: ['dumbbell-shoulder-press', 'barbell-shoulder-press']
  },
  {
    id: 'lateral-raises',
    name: 'Standing lateral raises',
    category: 'shoulders',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Dumbbells'],
    primaryEquipment: 'Dumbbells',
    difficulty: 'beginner',
    notes: 'Stand with dumbbells at sides. Raise arms to shoulder height in lateral motion, lower slowly.',
    videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
    equipmentImages: generateEquipmentImages(['Dumbbells']),
    alternativeExercises: ['cable-lateral-raises', 'machine-lateral-raises']
  },
  {
    id: 'cable-lateral-raises',
    name: 'Single arm cable lateral raise',
    category: 'shoulders',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Cable Machine'],
    primaryEquipment: 'Cable Machine',
    difficulty: 'beginner',
    notes: 'Stand beside cable stack, raise arm laterally to shoulder height. Control the descent.',
    videoUrl: 'https://www.youtube.com/watch?v=PPrzBWZDOhA',
    equipmentImages: generateEquipmentImages(['Cable Machine']),
    alternativeExercises: ['lateral-raises', 'machine-lateral-raises']
  },
  {
    id: 'cable-rear-delt-fly',
    name: 'Single arm cable rear delt fly',
    category: 'shoulders',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Cable Machine'],
    primaryEquipment: 'Cable Machine',
    difficulty: 'beginner',
    notes: 'Stand at cable machine, pull handle across body targeting rear deltoids. Control the motion.',
    videoUrl: 'https://www.youtube.com/watch?v=6yMdhi2DVao',
    equipmentImages: generateEquipmentImages(['Cable Machine']),
    alternativeExercises: ['rear-delt-fly', 'face-pulls']
  },
  {
    id: 'dumbbell-shoulder-press',
    name: 'Standing dumbbell shoulder press',
    category: 'shoulders',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Dumbbells'],
    primaryEquipment: 'Dumbbells',
    difficulty: 'intermediate',
    notes: 'Stand with dumbbells at shoulder level. Press overhead alternating or simultaneously.',
    videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
    equipmentImages: generateEquipmentImages(['Dumbbells']),
    alternativeExercises: ['barbell-shoulder-press', 'shoulder-press-machine']
  },

  // ARMS EXERCISES
  {
    id: 'biceps-cable-curl',
    name: 'Biceps cable curl',
    category: 'arms',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine'],
    primaryEquipment: 'Cable Machine',
    difficulty: 'beginner',
    notes: 'Stand at cable machine with bar attachment. Curl weight keeping elbows stable.',
    videoUrl: 'https://www.youtube.com/watch?v=NFzTWp2qpiw',
    equipmentImages: generateEquipmentImages(['Cable Machine']),
    alternativeExercises: ['dumbbell-curls', 'barbell-curls']
  },
  {
    id: 'cable-tricep-pushdown',
    name: 'Cable Tricep pushdown',
    category: 'arms',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    primaryEquipment: 'Cable Machine',
    difficulty: 'beginner',
    notes: 'Stand at high cable, push down keeping elbows at sides. Focus on tricep contraction.',
    videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU',
    equipmentImages: generateEquipmentImages(['Cable Machine']),
    alternativeExercises: ['rope-pushdowns', 'overhead-tricep-extension']
  },
  {
    id: 'rope-pushdowns',
    name: 'Cable rope pushdown',
    category: 'arms',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Rope'],
    primaryEquipment: 'Cable Machine',
    difficulty: 'beginner',
    notes: 'Use rope attachment on high cable. Push down and apart at bottom for maximum tricep activation.',
    videoUrl: 'https://www.youtube.com/watch?v=kiuVA0gs3EI',
    equipmentImages: generateEquipmentImages(['Cable Machine']),
    alternativeExercises: ['cable-tricep-pushdown', 'overhead-tricep-extension']
  },
  {
    id: 'dumbbell-curls',
    name: 'Standing dumbbell curl hammer grip',
    category: 'arms',
    muscleGroup: ['Biceps', 'Brachialis'],
    equipment: ['Dumbbells'],
    primaryEquipment: 'Dumbbells',
    difficulty: 'beginner',
    notes: 'Stand with dumbbells in neutral grip. Curl weight maintaining hammer grip throughout motion.',
    videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEvin4',
    equipmentImages: generateEquipmentImages(['Dumbbells']),
    alternativeExercises: ['cable-hammer-curls', 'barbell-curls']
  },
  {
    id: 'dips',
    name: 'Dips',
    category: 'arms',
    muscleGroup: ['Triceps', 'Lower Pectorals', 'Anterior Deltoids'],
    equipment: ['Parallel Bars'],
    primaryEquipment: 'Parallel Bars',
    difficulty: 'intermediate',
    notes: 'Support body on parallel bars, lower by bending elbows, push back up. Keep body slightly forward.',
    videoUrl: 'https://www.youtube.com/watch?v=2z8JmcrW-As',
    equipmentImages: generateEquipmentImages(['Parallel Bars']),
    alternativeExercises: ['machine-dips', 'bench-dips']
  },

  // CORE EXERCISES  
  {
    id: 'crunch',
    name: 'Crunch',
    category: 'core',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    primaryEquipment: 'Bodyweight',
    difficulty: 'beginner',
    notes: 'Lie on back, knees bent. Curl upper body toward knees using abdominal muscles, not neck.',
    videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU',
    equipmentImages: generateEquipmentImages(['Bodyweight']),
    alternativeExercises: ['reverse-crunch', 'cable-crunch']
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'core',
    muscleGroup: ['Rectus Abdominis', 'Obliques', 'Erector Spinae'],
    equipment: ['Bodyweight'],
    primaryEquipment: 'Bodyweight',
    difficulty: 'beginner',
    notes: 'Hold push-up position maintaining straight line from head to heels. Engage core throughout.',
    videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
    equipmentImages: generateEquipmentImages(['Bodyweight']),
    alternativeExercises: ['side-plank', 'dead-bug']
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg Raise',
    category: 'core',
    muscleGroup: ['Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Pull-up Bar'],
    primaryEquipment: 'Pull-up Bar',
    difficulty: 'intermediate',
    notes: 'Hang from pull-up bar, raise legs to parallel or higher. Control the descent.',
    videoUrl: 'https://www.youtube.com/watch?v=hdng3Nm1x_E',
    equipmentImages: generateEquipmentImages(['Pull-up Bar']),
    alternativeExercises: ['leg-raises', 'knee-raises']
  },
  {
    id: 'cable-crunch',
    name: 'Kneeling cable crunch',
    category: 'core',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Cable Machine'],
    primaryEquipment: 'Cable Machine',
    difficulty: 'beginner',
    notes: 'Kneel at high cable with rope attachment. Crunch down pulling rope toward floor.',
    videoUrl: 'https://www.youtube.com/watch?v=Ffreb4urJ_E',
    equipmentImages: generateEquipmentImages(['Cable Machine']),
    alternativeExercises: ['crunch', 'reverse-crunch']
  },

  // CARDIO EXERCISES
  {
    id: 'treadmill',
    name: 'TreadMill',
    category: 'cardio',
    muscleGroup: ['Cardiovascular System', 'Legs'],
    equipment: ['Treadmill'],
    primaryEquipment: 'Treadmill',
    difficulty: 'beginner',
    notes: 'Walk or run on treadmill at appropriate speed and incline for your fitness level.',
    videoUrl: 'https://www.youtube.com/watch?v=Vr53bpKL5yE',
    equipmentImages: generateEquipmentImages(['Treadmill']),
    alternativeExercises: ['running', 'stationary-bike']
  },
  {
    id: 'stationary-bike',
    name: 'Stationary bike',
    category: 'cardio',
    muscleGroup: ['Cardiovascular System', 'Quadriceps', 'Hamstrings'],
    equipment: ['Stationary Bike'],
    primaryEquipment: 'Stationary Bike',
    difficulty: 'beginner',
    notes: 'Pedal at steady pace maintaining proper posture. Adjust resistance as needed.',
    videoUrl: 'https://www.youtube.com/watch?v=TzZzO-4O_6w',
    equipmentImages: generateEquipmentImages(['Stationary Bike']),
    alternativeExercises: ['treadmill', 'elliptical']
  },
  {
    id: 'rowing-machine',
    name: 'Rowing machine',
    category: 'cardio',
    muscleGroup: ['Cardiovascular System', 'Back', 'Legs', 'Arms'],
    equipment: ['Rowing Machine'],
    primaryEquipment: 'Rowing Machine',
    difficulty: 'beginner',
    notes: 'Use proper rowing technique: drive with legs, lean back, pull with arms. Reverse for return.',
    videoUrl: 'https://www.youtube.com/watch?v=zQ82RYDALEM',
    equipmentImages: generateEquipmentImages(['Rowing Machine']),
    alternativeExercises: ['treadmill', 'elliptical']
  },

  // FUNCTIONAL/CROSSFIT EXERCISES
  {
    id: 'barbara',
    name: 'BARBARA',
    category: 'functional',
    muscleGroup: ['Full Body'],
    equipment: ['Pull-up Bar'],
    primaryEquipment: 'Pull-up Bar',
    difficulty: 'advanced',
    notes: '5 rounds: 20 pull-ups, 30 push-ups, 40 sit-ups, 50 squats. Rest 3 minutes between rounds.',
    videoUrl: 'https://www.youtube.com/watch?v=tAUt6vW6_7k',
    equipmentImages: generateEquipmentImages(['Pull-up Bar']),
    alternativeExercises: ['murph', 'chelsea']
  },
  {
    id: 'chelsea',
    name: 'CHELSEA',
    category: 'functional',
    muscleGroup: ['Upper Body', 'Core'],
    equipment: ['Pull-up Bar'],
    primaryEquipment: 'Pull-up Bar',
    difficulty: 'advanced',
    notes: 'Every minute on the minute for 30 minutes: 5 pull-ups, 10 push-ups, 15 squats.',
    videoUrl: 'https://www.youtube.com/watch?v=4XCCW6hWU2U',
    equipmentImages: generateEquipmentImages(['Pull-up Bar']),
    alternativeExercises: ['barbara', 'cindy']
  },
  {
    id: 'cindy',
    name: 'CINDY',
    category: 'functional',
    muscleGroup: ['Full Body'],
    equipment: ['Pull-up Bar'],
    primaryEquipment: 'Pull-up Bar',
    difficulty: 'intermediate',
    notes: '20 minutes AMRAP: 5 pull-ups, 10 push-ups, 15 squats. Complete as many rounds as possible.',
    videoUrl: 'https://www.youtube.com/watch?v=cIgGGT8mCnU',
    equipmentImages: generateEquipmentImages(['Pull-up Bar']),
    alternativeExercises: ['chelsea', 'barbara']
  },
  {
    id: 'fran',
    name: 'FRAN',
    category: 'functional',
    muscleGroup: ['Full Body'],
    equipment: ['Barbell', 'Pull-up Bar'],
    primaryEquipment: 'Barbell',
    difficulty: 'advanced',
    notes: '21-15-9 reps for time: Thrusters (95/65 lbs), Pull-ups. Scale weight as needed.',
    videoUrl: 'https://www.youtube.com/watch?v=pWKJhsIJN_4',
    equipmentImages: generateEquipmentImages(['Barbell', 'Pull-up Bar']),
    alternativeExercises: ['helen', 'karen']
  }
];
