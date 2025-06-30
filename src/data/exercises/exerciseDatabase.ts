
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
  // CHEST EXERCISES
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    notes: 'Lie flat on bench, grip bar slightly wider than shoulders, lower to chest, press up explosively. Keep feet planted, maintain arch in lower back.',
    videoUrl: 'https://www.youtube.com/watch?v=gRVjAtPip0Y',
    difficulty: 'intermediate',
    equipment: ['Barbell', 'Bench'],
    isCustom: false
  },
  {
    id: 'incline-bench-press',
    name: 'Incline Bench Press',
    category: 'chest',
    muscleGroup: ['Upper Pectorals', 'Triceps', 'Anterior Deltoids'],
    notes: 'Set bench to 30-45 degree incline, grip bar slightly wider than shoulders, focus on upper chest contraction.',
    videoUrl: 'https://www.youtube.com/watch?v=IP9aRxuBqhA',
    difficulty: 'intermediate',
    equipment: ['Barbell', 'Incline Bench'],
    isCustom: false
  },
  {
    id: 'dumbbell-flyes',
    name: 'Dumbbell Flyes',
    category: 'chest',
    muscleGroup: ['Pectorals'],
    notes: 'Lie on bench with dumbbells, arms slightly bent, lower weights in wide arc, squeeze chest at top.',
    videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
    difficulty: 'intermediate',
    equipment: ['Dumbbells', 'Bench'],
    isCustom: false
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'chest',
    muscleGroup: ['Pectorals', 'Triceps', 'Core'],
    notes: 'Start in plank position, lower chest to ground, push up explosively. Keep body straight throughout movement.',
    videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    difficulty: 'beginner',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  
  // BACK EXERCISES
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'back',
    muscleGroup: ['Erector Spinae', 'Latissimus Dorsi', 'Glutes', 'Hamstrings'],
    notes: 'Stand with feet hip-width apart, grip bar outside legs, keep chest up, drive through heels, maintain neutral spine.',
    videoUrl: 'https://www.youtube.com/watch?v=ytGaGIn3SjE',
    difficulty: 'advanced',
    equipment: ['Barbell'],
    isCustom: false
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    notes: 'Hang from bar with palms facing away, pull body up until chin clears bar, lower with control.',
    videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    difficulty: 'intermediate',
    equipment: ['Pull-up Bar'],
    isCustom: false
  },
  {
    id: 'bent-over-row',
    name: 'Bent Over Row',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    notes: 'Hip hinge position, pull bar to lower chest, squeeze shoulder blades together, control the negative.',
    videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
    difficulty: 'intermediate',
    equipment: ['Barbell'],
    isCustom: false
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'back',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    notes: 'Sit upright, pull bar to upper chest, focus on squeezing lats, control the return.',
    videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
    difficulty: 'beginner',
    equipment: ['Cable Machine'],
    isCustom: false
  },

  // LEG EXERCISES
  {
    id: 'squat',
    name: 'Squat',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    notes: 'Feet shoulder-width apart, descend by sitting back, knees track over toes, drive through heels to stand.',
    videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
    difficulty: 'intermediate',
    equipment: ['Barbell', 'Squat Rack'],
    isCustom: false
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes'],
    notes: 'Sit in machine, feet shoulder-width apart, lower weight until knees at 90 degrees, press through heels.',
    videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
    difficulty: 'beginner',
    equipment: ['Leg Press Machine'],
    isCustom: false
  },
  {
    id: 'lunges',
    name: 'Lunges',
    category: 'legs',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    notes: 'Step forward, lower back knee toward ground, keep front knee over ankle, push through front heel.',
    videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
    difficulty: 'beginner',
    equipment: ['Bodyweight', 'Dumbbells'],
    isCustom: false
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'legs',
    muscleGroup: ['Hamstrings', 'Glutes', 'Erector Spinae'],
    notes: 'Hip hinge movement, keep bar close to legs, feel stretch in hamstrings, drive hips forward to return.',
    videoUrl: 'https://www.youtube.com/watch?v=2SHsk9AzdjA',
    difficulty: 'intermediate',
    equipment: ['Barbell', 'Dumbbells'],
    isCustom: false
  },

  // SHOULDER EXERCISES
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'shoulders',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    notes: 'Stand with feet hip-width apart, press bar overhead, keep core tight, bar path straight up.',
    videoUrl: 'https://www.youtube.com/watch?v=QSgd7AEVK9I',
    difficulty: 'intermediate',
    equipment: ['Barbell'],
    isCustom: false
  },
  {
    id: 'lateral-raises',
    name: 'Lateral Raises',
    category: 'shoulders',
    muscleGroup: ['Medial Deltoids'],
    notes: 'Hold dumbbells at sides, raise arms to shoulder height, pause, lower with control.',
    videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
    difficulty: 'beginner',
    equipment: ['Dumbbells'],
    isCustom: false
  },
  {
    id: 'rear-delt-flyes',
    name: 'Rear Delt Flyes',
    category: 'shoulders',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    notes: 'Bend forward, arms slightly bent, raise weights out to sides, squeeze shoulder blades.',
    videoUrl: 'https://www.youtube.com/watch?v=ea7qmaN0f_c',
    difficulty: 'beginner',
    equipment: ['Dumbbells'],
    isCustom: false
  },

  // ARM EXERCISES
  {
    id: 'bicep-curls',
    name: 'Bicep Curls',
    category: 'arms',
    muscleGroup: ['Biceps'],
    notes: 'Hold weights at sides, curl up by flexing biceps, squeeze at top, lower with control.',
    videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
    difficulty: 'beginner',
    equipment: ['Dumbbells', 'Barbell'],
    isCustom: false
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: 'arms',
    muscleGroup: ['Triceps'],
    notes: 'Hands on bench behind you, lower body by bending elbows, push back up using triceps.',
    videoUrl: 'https://www.youtube.com/watch?v=6kALZikXxLc',
    difficulty: 'intermediate',
    equipment: ['Bench', 'Bodyweight'],
    isCustom: false
  },
  {
    id: 'close-grip-bench-press',
    name: 'Close Grip Bench Press',
    category: 'arms',
    muscleGroup: ['Triceps', 'Pectorals'],
    notes: 'Narrow grip on bar, lower to chest, focus on tricep engagement, press up explosively.',
    videoUrl: 'https://www.youtube.com/watch?v=nEF0bv2FW94',
    difficulty: 'intermediate',
    equipment: ['Barbell', 'Bench'],
    isCustom: false
  },

  // CORE EXERCISES
  {
    id: 'plank',
    name: 'Plank',
    category: 'core',
    muscleGroup: ['Core', 'Rectus Abdominis', 'Transverse Abdominis'],
    notes: 'Forearm plank position, keep body straight from head to heels, engage core throughout.',
    videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
    difficulty: 'beginner',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    category: 'core',
    muscleGroup: ['Obliques', 'Rectus Abdominis'],
    notes: 'Sit with knees bent, lean back slightly, rotate torso side to side, keep chest up.',
    videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
    difficulty: 'beginner',
    equipment: ['Bodyweight', 'Medicine Ball'],
    isCustom: false
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'core',
    muscleGroup: ['Core', 'Hip Flexors'],
    notes: 'Plank position, alternate bringing knees to chest rapidly, maintain plank throughout.',
    videoUrl: 'https://www.youtube.com/watch?v=kLh-uczlPLg',
    difficulty: 'intermediate',
    equipment: ['Bodyweight'],
    isCustom: false
  },

  // CARDIO EXERCISES
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'cardio',
    muscleGroup: ['Full Body'],
    notes: 'Squat down, jump back to plank, push-up, jump feet to hands, jump up with arms overhead.',
    videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU',
    difficulty: 'intermediate',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    category: 'cardio',
    muscleGroup: ['Full Body'],
    notes: 'Jump feet apart while raising arms overhead, jump back to starting position.',
    videoUrl: 'https://www.youtube.com/watch?v=c4DAnQ6DtF8',
    difficulty: 'beginner',
    equipment: ['Bodyweight'],
    isCustom: false
  },
  {
    id: 'high-knees',
    name: 'High Knees',
    category: 'cardio',
    muscleGroup: ['Hip Flexors', 'Quadriceps'],
    notes: 'Run in place bringing knees up to hip level, pump arms, maintain quick tempo.',
    videoUrl: 'https://www.youtube.com/watch?v=8opcQdC-V-U',
    difficulty: 'beginner',
    equipment: ['Bodyweight'],
    isCustom: false
  },

  // STRETCHING EXERCISES
  {
    id: 'hamstring-stretch',
    name: 'Hamstring Stretch',
    category: 'stretching',
    muscleGroup: ['Hamstrings'],
    notes: 'Sit with one leg extended, reach toward toes, hold stretch, feel elongation in back of thigh.',
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
    notes: 'Lunge position, push hips forward, feel stretch in front of rear leg hip, hold position.',
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
    notes: 'Hold resistance band wide, pass band over head and behind back, improve shoulder mobility.',
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
