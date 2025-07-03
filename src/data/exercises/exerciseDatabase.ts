
import { ExerciseData } from './types';

// LEGS EXERCISES (100+ exercises)
const legsExercises: ExerciseData[] = [
  {
    id: 'legs-1',
    name: 'Angled leg press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Glutes'],
    equipment: ['Leg Press Machine'],
    notes: 'Perform leg press at an angled position for optimal muscle activation.',
    alternativeExercises: ['legs-2', 'legs-3', 'legs-4']
  },
  {
    id: 'legs-2',
    name: 'Horizontal Leg Press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Glutes'],
    equipment: ['Leg Press Machine'],
    notes: 'Horizontal leg press machine for full leg development.',
    alternativeExercises: ['legs-1', 'legs-3', 'legs-5']
  },
  {
    id: 'legs-3',
    name: 'Leg Extension',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps'],
    equipment: ['Leg Extension Machine'],
    notes: 'Isolate quadriceps muscles with controlled movement.',
    alternativeExercises: ['legs-1', 'legs-2', 'legs-4']
  },
  {
    id: 'legs-4',
    name: 'Seated Leg Curl',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Seated position for hamstring isolation.',
    alternativeExercises: ['legs-5', 'legs-6', 'legs-3']
  },
  {
    id: 'legs-5',
    name: 'Leg Curl lying down',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Lying position for hamstring development.',
    alternativeExercises: ['legs-4', 'legs-6', 'legs-2']
  },
  {
    id: 'legs-6',
    name: 'Standing Leg Curl',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Standing leg curl for unilateral hamstring work.',
    alternativeExercises: ['legs-4', 'legs-5', 'legs-7']
  },
  {
    id: 'legs-7',
    name: 'Machine Hip Thrust',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Hip Thrust Machine'],
    notes: 'Machine-assisted hip thrust for glute activation.',
    alternativeExercises: ['legs-8', 'legs-9', 'legs-10']
  },
  {
    id: 'legs-8',
    name: 'Standing Abductor Machine',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Abductor Machine'],
    notes: 'Standing hip abduction for outer thigh and glute development.',
    alternativeExercises: ['legs-9', 'legs-10', 'legs-7']
  },
  {
    id: 'legs-9',
    name: 'Abductors Machine',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hip Abductors'],
    equipment: ['Abductor Machine'],
    notes: 'Seated hip abduction machine for outer thigh.',
    alternativeExercises: ['legs-8', 'legs-10', 'legs-11']
  },
  {
    id: 'legs-10',
    name: 'Adductors Machine',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hip Adductors'],
    equipment: ['Adductor Machine'],
    notes: 'Seated hip adduction for inner thigh muscles.',
    alternativeExercises: ['legs-9', 'legs-8', 'legs-11']
  },
  {
    id: 'legs-11',
    name: 'Squat SMITH Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Smith machine squat for controlled movement pattern.',
    alternativeExercises: ['legs-12', 'legs-13', 'legs-14']
  },
  {
    id: 'legs-12',
    name: 'Hack Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Hack Squat Machine'],
    notes: 'Hack squat machine for quad-focused development.',
    alternativeExercises: ['legs-11', 'legs-13', 'legs-15']
  },
  {
    id: 'legs-13',
    name: 'Reverse Hack Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Hack Squat Machine'],
    notes: 'Reverse hack squat for glute and hamstring emphasis.',
    alternativeExercises: ['legs-12', 'legs-14', 'legs-16']
  },
  {
    id: 'legs-14',
    name: 'Barbell squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Glutes'],
    equipment: ['Barbell', 'Squat Rack'],
    notes: 'Classic barbell squat for full leg development.',
    alternativeExercises: ['legs-11', 'legs-12', 'legs-17']
  },
  {
    id: 'legs-15',
    name: 'Calf Machine',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Calves'],
    equipment: ['Calf Raise Machine'],
    notes: 'Machine calf raises for calf muscle development.',
    alternativeExercises: ['legs-16', 'legs-17', 'legs-18']
  },
  {
    id: 'legs-16',
    name: 'Master Gluteus',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Glute Machine'],
    notes: 'Specialized glute machine for targeted development.',
    alternativeExercises: ['legs-7', 'legs-8', 'legs-19']
  },
  {
    id: 'legs-17',
    name: 'Bulgarian squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bench'],
    notes: 'Single-leg squat with rear foot elevated.',
    alternativeExercises: ['legs-18', 'legs-19', 'legs-20']
  },
  {
    id: 'legs-18',
    name: 'Single Leg step up',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bench', 'Step'],
    notes: 'Step up exercise for unilateral leg strength.',
    alternativeExercises: ['legs-17', 'legs-19', 'legs-21']
  },
  {
    id: 'legs-19',
    name: 'Alternating Single Leg step up',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bench', 'Step'],
    notes: 'Alternating step ups for dynamic leg training.',
    alternativeExercises: ['legs-18', 'legs-20', 'legs-22']
  },
  {
    id: 'legs-20',
    name: 'Single Dumbbell Front Lunge',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Forward lunge with single dumbbell.',
    alternativeExercises: ['legs-21', 'legs-22', 'legs-23']
  },
  {
    id: 'legs-21',
    name: 'Alternating Dumbbell Lunge',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Alternating lunges with dumbbells.',
    alternativeExercises: ['legs-20', 'legs-22', 'legs-24']
  },
  {
    id: 'legs-22',
    name: 'Romanian Deadlifts dumbbells',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Romanian deadlift with dumbbells for hamstring development.',
    alternativeExercises: ['legs-23', 'legs-24', 'legs-25']
  },
  {
    id: 'legs-23',
    name: 'Dumbbell Sumo Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Adductors'],
    equipment: ['Dumbbells'],
    notes: 'Wide stance squat with dumbbell.',
    alternativeExercises: ['legs-24', 'legs-25', 'legs-26']
  },
  {
    id: 'legs-24',
    name: 'Romanian Deadlifts barbell',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Lower Back'],
    equipment: ['Barbell'],
    notes: 'Romanian deadlift with barbell for posterior chain.',
    alternativeExercises: ['legs-22', 'legs-25', 'legs-27']
  },
  {
    id: 'legs-25',
    name: 'Barbell deadlift',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Lower Back', 'Quadriceps'],
    equipment: ['Barbell'],
    notes: 'Classic deadlift for full posterior chain development.',
    alternativeExercises: ['legs-24', 'legs-26', 'legs-28']
  },
  {
    id: 'legs-26',
    name: 'In-Place Lunge',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Stationary lunge for leg strength.',
    alternativeExercises: ['legs-20', 'legs-21', 'legs-29']
  },
  {
    id: 'legs-27',
    name: 'Jump Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Calves'],
    equipment: ['Bodyweight'],
    notes: 'Explosive squat jump for power development.',
    alternativeExercises: ['legs-28', 'legs-29', 'legs-30']
  },
  {
    id: 'legs-28',
    name: 'Jumping lunge',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Explosive alternating lunge jumps.',
    alternativeExercises: ['legs-27', 'legs-29', 'legs-31']
  },
  {
    id: 'legs-29',
    name: 'Gluteus Machine',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes'],
    equipment: ['Glute Machine'],
    notes: 'Specialized machine for glute isolation.',
    alternativeExercises: ['legs-16', 'legs-7', 'legs-32']
  },
  {
    id: 'legs-30',
    name: 'Machine Hip Abductors (Forward Leaning)',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Hip Abductor Machine'],
    notes: 'Forward leaning position for enhanced glute activation.',
    alternativeExercises: ['legs-8', 'legs-9', 'legs-31']
  },
  {
    id: 'legs-31',
    name: 'Machine Hip Abductions (Elevated Position)',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Hip Abductor Machine'],
    notes: 'Elevated position for increased range of motion.',
    alternativeExercises: ['legs-30', 'legs-32', 'legs-33']
  },
  {
    id: 'legs-32',
    name: 'Glute Abductions with Elastic Band (Seated on Bench)',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Resistance Band', 'Bench'],
    notes: 'Seated glute abduction with resistance band.',
    alternativeExercises: ['legs-33', 'legs-34', 'legs-35']
  },
  {
    id: 'legs-33',
    name: 'Single Leg Glute Abductions in Quadruped Position',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes', 'Hip Abductors'],
    equipment: ['Bodyweight'],
    notes: 'Quadruped position for glute activation.',
    alternativeExercises: ['legs-32', 'legs-34', 'legs-36']
  },
  {
    id: 'legs-34',
    name: 'Supine Hip Flexed Adductions',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hip Adductors'],
    equipment: ['Bodyweight'],
    notes: 'Supine position for hip adductor engagement.',
    alternativeExercises: ['legs-10', 'legs-33', 'legs-35']
  },
  {
    id: 'legs-35',
    name: 'Seated Ground Glute Abductions with Elastic Band',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes', 'Hip Abductors'],
    equipment: ['Resistance Band'],
    notes: 'Ground seated position with resistance band.',
    alternativeExercises: ['legs-32', 'legs-36', 'legs-37']
  },
  {
    id: 'legs-36',
    name: 'Stationary Single Leg Lunges with Dumbbells',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Single leg stationary lunge with dumbbells.',
    alternativeExercises: ['legs-20', 'legs-21', 'legs-37']
  },
  {
    id: 'legs-37',
    name: 'Walking Lunges',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Dynamic walking lunge pattern.',
    alternativeExercises: ['legs-21', 'legs-38', 'legs-39']
  },
  {
    id: 'legs-38',
    name: 'Single Leg Lunges on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Single leg lunges using Smith machine for stability.',
    alternativeExercises: ['legs-11', 'legs-39', 'legs-40']
  },
  {
    id: 'legs-39',
    name: 'Lunge + Squat on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Combination lunge and squat movement.',
    alternativeExercises: ['legs-38', 'legs-40', 'legs-41']
  },
  {
    id: 'legs-40',
    name: 'Alternating Reverse Lunges',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Alternating reverse lunge pattern.',
    alternativeExercises: ['legs-21', 'legs-41', 'legs-42']
  },
  {
    id: 'legs-41',
    name: 'Single Leg Reverse Lunge',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Single leg reverse lunge for unilateral training.',
    alternativeExercises: ['legs-40', 'legs-42', 'legs-43']
  },
  {
    id: 'legs-42',
    name: 'Alternating Lunges on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Alternating lunges with Smith machine support.',
    alternativeExercises: ['legs-38', 'legs-43', 'legs-44']
  },
  {
    id: 'legs-43',
    name: 'Alternating Step Lunges on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Step lunges with alternating pattern on Smith machine.',
    alternativeExercises: ['legs-42', 'legs-44', 'legs-45']
  },
  {
    id: 'legs-44',
    name: 'Alternating Lunges',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Basic alternating lunge pattern.',
    alternativeExercises: ['legs-21', 'legs-40', 'legs-45']
  },
  {
    id: 'legs-45',
    name: 'Reverse Lunge + Low Cable Row',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Latissimus Dorsi'],
    equipment: ['Cable Machine'],
    notes: 'Combination reverse lunge with cable row.',
    alternativeExercises: ['legs-41', 'legs-46', 'legs-47']
  },
  {
    id: 'legs-46',
    name: 'Single Leg Lateral Lunges with Dumbbells',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Adductors'],
    equipment: ['Dumbbells'],
    notes: 'Lateral lunge with dumbbells for lateral movement.',
    alternativeExercises: ['legs-47', 'legs-48', 'legs-49']
  },
  {
    id: 'legs-47',
    name: 'Single Leg Step Lunges on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Single leg step lunges on Smith machine.',
    alternativeExercises: ['legs-43', 'legs-48', 'legs-50']
  },
  {
    id: 'legs-48',
    name: 'Single Leg Pendulum Squats',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Pendulum Squat Machine'],
    notes: 'Single leg pendulum squat for unilateral strength.',
    alternativeExercises: ['legs-49', 'legs-50', 'legs-51']
  },
  {
    id: 'legs-49',
    name: 'Single Leg Lunges in Place with Wide Stance',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Wide stance lunges in place.',
    alternativeExercises: ['legs-26', 'legs-50', 'legs-51']
  },
  {
    id: 'legs-50',
    name: 'Paused Air Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Air squat with pause at bottom position.',
    alternativeExercises: ['legs-51', 'legs-52', 'legs-53']
  },
  {
    id: 'legs-51',
    name: 'Air Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Basic bodyweight squat.',
    alternativeExercises: ['legs-50', 'legs-52', 'legs-14']
  },
  {
    id: 'legs-52',
    name: 'Air Sumo Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Adductors'],
    equipment: ['Bodyweight'],
    notes: 'Wide stance bodyweight squat.',
    alternativeExercises: ['legs-51', 'legs-23', 'legs-53']
  },
  {
    id: 'legs-53',
    name: 'Machine Belt Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Belt Squat Machine'],
    notes: 'Belt squat machine for spine-friendly squatting.',
    alternativeExercises: ['legs-11', 'legs-12', 'legs-54']
  },
  {
    id: 'legs-54',
    name: 'Box Squat on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine', 'Box'],
    notes: 'Box squat on Smith machine for depth control.',
    alternativeExercises: ['legs-11', 'legs-55', 'legs-56']
  },
  {
    id: 'legs-55',
    name: 'Box Squat Press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Box', 'Barbell'],
    notes: 'Box squat with press movement.',
    alternativeExercises: ['legs-54', 'legs-56', 'legs-57']
  },
  {
    id: 'legs-56',
    name: 'Single Leg Calf Raise on Step with Dumbbell',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Calves'],
    equipment: ['Dumbbells', 'Step'],
    notes: 'Single leg calf raise with dumbbell on step.',
    alternativeExercises: ['legs-57', 'legs-58', 'legs-15']
  },
  {
    id: 'legs-57',
    name: 'Standing Machine Calf Raises',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Calves'],
    equipment: ['Calf Raise Machine'],
    notes: 'Standing calf raises on machine.',
    alternativeExercises: ['legs-15', 'legs-58', 'legs-59']
  },
  {
    id: 'legs-58',
    name: 'Smith Machine Calf Raises',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Calves'],
    equipment: ['Smith Machine'],
    notes: 'Calf raises using Smith machine.',
    alternativeExercises: ['legs-57', 'legs-59', 'legs-60']
  },
  {
    id: 'legs-59',
    name: '45-Degree Leg Press Calf Raises',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Calves'],
    equipment: ['Leg Press Machine'],
    notes: 'Calf raises on 45-degree leg press machine.',
    alternativeExercises: ['legs-58', 'legs-60', 'legs-61']
  },
  {
    id: 'legs-60',
    name: 'Calf Raises',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Calves'],
    equipment: ['Bodyweight'],
    notes: 'Basic bodyweight calf raises.',
    alternativeExercises: ['legs-57', 'legs-61', 'legs-62']
  },
  {
    id: 'legs-61',
    name: 'Walking Calf Raises with Dumbbells',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Calves'],
    equipment: ['Dumbbells'],
    notes: 'Walking calf raises with dumbbells.',
    alternativeExercises: ['legs-60', 'legs-62', 'legs-56']
  },
  {
    id: 'legs-62',
    name: 'Vertical Leg Press on Smith Machine',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Vertical leg press using Smith machine.',
    alternativeExercises: ['legs-1', 'legs-2', 'legs-63']
  },
  {
    id: 'legs-63',
    name: 'Single-Leg Vertical Leg Press on Smith Machine',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Single leg vertical press on Smith machine.',
    alternativeExercises: ['legs-62', 'legs-64', 'legs-65']
  },
  {
    id: 'legs-64',
    name: 'Horizontal Unilateral Leg Press on Leg Press Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Leg Press Machine'],
    notes: 'Unilateral leg press on horizontal machine.',
    alternativeExercises: ['legs-2', 'legs-65', 'legs-66']
  },
  {
    id: 'legs-65',
    name: 'Horizontal Unilateral Leg Press Lying Sideways',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Leg Press Machine'],
    notes: 'Sideways lying unilateral leg press.',
    alternativeExercises: ['legs-64', 'legs-66', 'legs-67']
  },
  {
    id: 'legs-66',
    name: 'Wide Stance Horizontal Leg Press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Adductors'],
    equipment: ['Leg Press Machine'],
    notes: 'Wide stance horizontal leg press.',
    alternativeExercises: ['legs-2', 'legs-67', 'legs-68']
  },
  {
    id: 'legs-67',
    name: '45-Degree Leg Press with Narrow Stance',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps'],
    equipment: ['Leg Press Machine'],
    notes: 'Narrow stance 45-degree leg press.',
    alternativeExercises: ['legs-1', 'legs-68', 'legs-69']
  },
  {
    id: 'legs-68',
    name: '45-Degree Leg Press with Wide Stance',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Adductors'],
    equipment: ['Leg Press Machine'],
    notes: 'Wide stance 45-degree leg press.',
    alternativeExercises: ['legs-1', 'legs-66', 'legs-69']
  },
  {
    id: 'legs-69',
    name: 'Low and Narrow 45-Degree Leg Press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps'],
    equipment: ['Leg Press Machine'],
    notes: 'Low foot position narrow stance leg press.',
    alternativeExercises: ['legs-67', 'legs-70', 'legs-71']
  },
  {
    id: 'legs-70',
    name: 'High and Narrow 45-Degree Leg Press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Leg Press Machine'],
    notes: 'High foot position narrow stance leg press.',
    alternativeExercises: ['legs-69', 'legs-71', 'legs-72']
  },
  {
    id: 'legs-71',
    name: 'Single-Leg 45-Degree Leg Press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Leg Press Machine'],
    notes: 'Single leg 45-degree leg press.',
    alternativeExercises: ['legs-70', 'legs-72', 'legs-73']
  },
  {
    id: 'legs-72',
    name: 'Single-Leg 45-Degree Leg Press (Lying Down)',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Leg Press Machine'],
    notes: 'Single leg press in lying position.',
    alternativeExercises: ['legs-71', 'legs-73', 'legs-74']
  },
  {
    id: 'legs-73',
    name: 'Single-Leg Leg Extension',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps'],
    equipment: ['Leg Extension Machine'],
    notes: 'Single leg extension for unilateral quad development.',
    alternativeExercises: ['legs-3', 'legs-74', 'legs-75']
  },
  {
    id: 'legs-74',
    name: 'Single-Leg Eccentric Leg Extension',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps'],
    equipment: ['Leg Extension Machine'],
    notes: 'Single leg extension with eccentric focus.',
    alternativeExercises: ['legs-73', 'legs-75', 'legs-76']
  },
  {
    id: 'legs-75',
    name: 'Single-Leg Cable Leg Curl',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings'],
    equipment: ['Cable Machine'],
    notes: 'Single leg cable curl for hamstring isolation.',
    alternativeExercises: ['legs-4', 'legs-5', 'legs-76']
  },
  {
    id: 'legs-76',
    name: 'Single-Leg Standing Leg Curl to Leg Extension',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Quadriceps'],
    equipment: ['Cable Machine'],
    notes: 'Combination single leg curl to extension.',
    alternativeExercises: ['legs-75', 'legs-77', 'legs-78']
  },
  {
    id: 'legs-77',
    name: 'Lying Leg Curl with Dumbbell',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Lying leg curl using dumbbell.',
    alternativeExercises: ['legs-5', 'legs-78', 'legs-79']
  },
  {
    id: 'legs-78',
    name: 'Lying Leg Curl with Resistance Band',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings'],
    equipment: ['Resistance Band', 'Bench'],
    notes: 'Lying leg curl with resistance band.',
    alternativeExercises: ['legs-77', 'legs-79', 'legs-80']
  },
  {
    id: 'legs-79',
    name: 'Single-Leg Lying Leg Curl',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Single leg lying curl for unilateral development.',
    alternativeExercises: ['legs-5', 'legs-80', 'legs-81']
  },
  {
    id: 'legs-80',
    name: 'Lying Leg Curl with Narrow Foot Position',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Lying leg curl with narrow foot position.',
    alternativeExercises: ['legs-79', 'legs-81', 'legs-82']
  },
  {
    id: 'legs-81',
    name: 'Seated Leg Curl with Low Toes',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Seated leg curl with toes pointing down.',
    alternativeExercises: ['legs-4', 'legs-82', 'legs-83']
  },
  {
    id: 'legs-82',
    name: 'Frog glute bridge',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Frog position glute bridge for glute activation.',
    alternativeExercises: ['legs-83', 'legs-84', 'legs-85']
  },
  {
    id: 'legs-83',
    name: 'Glute Bridge with Double Range of Motion (ROM) Dumbbells',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Glute bridge with extended range of motion.',
    alternativeExercises: ['legs-82', 'legs-84', 'legs-86']
  },
  {
    id: 'legs-84',
    name: 'Glute Bridge with Dumbbell',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Basic glute bridge with dumbbell.',
    alternativeExercises: ['legs-83', 'legs-85', 'legs-87']
  },
  {
    id: 'legs-85',
    name: 'Single-leg Glute Bridge with Dumbbell',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Single leg glute bridge with dumbbell.',
    alternativeExercises: ['legs-84', 'legs-86', 'legs-88']
  },
  {
    id: 'legs-86',
    name: 'Barbell Hip Thrust',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Hip thrust with barbell for maximum glute activation.',
    alternativeExercises: ['legs-7', 'legs-87', 'legs-89']
  },
  {
    id: 'legs-87',
    name: 'Machine Single-Leg Hip Thrust',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Hip Thrust Machine'],
    notes: 'Single leg hip thrust on machine.',
    alternativeExercises: ['legs-86', 'legs-88', 'legs-90']
  },
  {
    id: 'legs-88',
    name: 'Hip Thrust on Single-leg Multipower',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Single leg hip thrust on multipower.',
    alternativeExercises: ['legs-87', 'legs-89', 'legs-91']
  },
  {
    id: 'legs-89',
    name: 'Hip Thrust on Leg Extension Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Leg Extension Machine'],
    notes: 'Hip thrust using leg extension machine.',
    alternativeExercises: ['legs-88', 'legs-90', 'legs-92']
  },
  {
    id: 'legs-90',
    name: 'Hip Thrust on Multipower',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Smith Machine'],
    notes: 'Hip thrust using multipower/Smith machine.',
    alternativeExercises: ['legs-89', 'legs-91', 'legs-93']
  },
  {
    id: 'legs-91',
    name: 'Hip Thrust',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Basic bodyweight hip thrust.',
    alternativeExercises: ['legs-84', 'legs-92', 'legs-94']
  },
  {
    id: 'legs-92',
    name: 'Hip Thrust with Machine-Assisted Adductions',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hip Adductors'],
    equipment: ['Hip Thrust Machine', 'Adductor Machine'],
    notes: 'Hip thrust with adductor machine assistance.',
    alternativeExercises: ['legs-91', 'legs-93', 'legs-95']
  },
  {
    id: 'legs-93',
    name: 'Hip Thrust with Adductions on Multipower',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hip Adductors'],
    equipment: ['Smith Machine'],
    notes: 'Hip thrust with adduction on multipower.',
    alternativeExercises: ['legs-92', 'legs-94', 'legs-96']
  },
  {
    id: 'legs-94',
    name: 'Good Morning with Barbell',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Lower Back'],
    equipment: ['Barbell'],
    notes: 'Good morning exercise with barbell.',
    alternativeExercises: ['legs-95', 'legs-96', 'legs-97']
  },
  {
    id: 'legs-95',
    name: 'Romanian Deadlift on T-Bar',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['T-Bar'],
    notes: 'Romanian deadlift using T-bar.',
    alternativeExercises: ['legs-94', 'legs-96', 'legs-98']
  },
  {
    id: 'legs-96',
    name: 'Good Morning on Hack Squat Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Hack Squat Machine'],
    notes: 'Good morning on hack squat machine.',
    alternativeExercises: ['legs-95', 'legs-97', 'legs-99']
  },
  {
    id: 'legs-97',
    name: 'Good Morning with Resistance Band',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Resistance Band'],
    notes: 'Good morning with resistance band.',
    alternativeExercises: ['legs-96', 'legs-98', 'legs-100']
  },
  {
    id: 'legs-98',
    name: 'Kneeling Good Morning on Multipower',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Kneeling good morning on multipower.',
    alternativeExercises: ['legs-97', 'legs-99', 'legs-101']
  },
  {
    id: 'legs-99',
    name: 'Close Stance Hack Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps'],
    equipment: ['Hack Squat Machine'],
    notes: 'Close stance hack squat for quad focus.',
    alternativeExercises: ['legs-12', 'legs-100', 'legs-102']
  },
  {
    id: 'legs-100',
    name: 'Narrow Stance Pendulum Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps'],
    equipment: ['Pendulum Squat Machine'],
    notes: 'Narrow stance pendulum squat.',
    alternativeExercises: ['legs-99', 'legs-101', 'legs-103']
  },
  {
    id: 'legs-101',
    name: 'Hack Squat on Toes',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Calves'],
    equipment: ['Hack Squat Machine'],
    notes: 'Hack squat performed on toes.',
    alternativeExercises: ['legs-100', 'legs-102', 'legs-104']
  },
  {
    id: 'legs-102',
    name: 'Sumo Squat on Pendulum Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Adductors'],
    equipment: ['Pendulum Squat Machine'],
    notes: 'Sumo squat on pendulum machine.',
    alternativeExercises: ['legs-101', 'legs-103', 'legs-105']
  },
  {
    id: 'legs-103',
    name: 'Hack Sumo Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Adductors'],
    equipment: ['Hack Squat Machine'],
    notes: 'Sumo squat on hack squat machine.',
    alternativeExercises: ['legs-102', 'legs-104', 'legs-106']
  },
  {
    id: 'legs-104',
    name: 'Pendulum Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Pendulum Squat Machine'],
    notes: 'Standard pendulum squat.',
    alternativeExercises: ['legs-103', 'legs-105', 'legs-107']
  },
  {
    id: 'legs-105',
    name: 'Pulses Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Squat with pulse reps at bottom.',
    alternativeExercises: ['legs-50', 'legs-106', 'legs-108']
  },
  {
    id: 'legs-106',
    name: 'Single Leg Curtsy Step Up',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Quadriceps'],
    equipment: ['Step', 'Bench'],
    notes: 'Curtsy step up for glute activation.',
    alternativeExercises: ['legs-18', 'legs-107', 'legs-109']
  },
  {
    id: 'legs-107',
    name: 'Machine Sissy Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps'],
    equipment: ['Sissy Squat Machine'],
    notes: 'Sissy squat on machine for quad isolation.',
    alternativeExercises: ['legs-108', 'legs-109', 'legs-110']
  },
  {
    id: 'legs-108',
    name: 'Straight Leg Cable Pull-Throughs',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Cable Machine'],
    notes: 'Straight leg cable pull-throughs.',
    alternativeExercises: ['legs-109', 'legs-110', 'legs-111']
  },
  {
    id: 'legs-109',
    name: 'Knee to Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Knee to squat transition movement.',
    alternativeExercises: ['legs-51', 'legs-110', 'legs-112']
  },
  {
    id: 'legs-110',
    name: 'Front Squat with Barbell',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Core'],
    equipment: ['Barbell', 'Squat Rack'],
    notes: 'Front squat with barbell for quad emphasis.',
    alternativeExercises: ['legs-14', 'legs-111', 'legs-113']
  },
  {
    id: 'legs-111',
    name: 'GobletSquat with Dumbbell',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Goblet squat with dumbbell.',
    alternativeExercises: ['legs-110', 'legs-112', 'legs-114']
  },
  {
    id: 'legs-112',
    name: 'Sumo Deadlift with Barbell and Pronated Grip',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Hip Adductors'],
    equipment: ['Barbell'],
    notes: 'Sumo deadlift with pronated grip.',
    alternativeExercises: ['legs-25', 'legs-113', 'legs-115']
  },
  {
    id: 'legs-113',
    name: 'Sumo Deadlift with Barbell and Mixed Grip',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Hip Adductors'],
    equipment: ['Barbell'],
    notes: 'Sumo deadlift with mixed grip.',
    alternativeExercises: ['legs-112', 'legs-114', 'legs-116']
  },
  {
    id: 'legs-114',
    name: 'Romanian Deadlift on Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Deadlift Machine'],
    notes: 'Romanian deadlift on machine.',
    alternativeExercises: ['legs-22', 'legs-115', 'legs-117']
  },
  {
    id: 'legs-115',
    name: 'Romanian Deadlift on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Romanian deadlift on Smith machine.',
    alternativeExercises: ['legs-114', 'legs-116', 'legs-118']
  },
  {
    id: 'legs-116',
    name: 'Romanian Deadlift with Resistance Band',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Resistance Band'],
    notes: 'Romanian deadlift with resistance band.',
    alternativeExercises: ['legs-115', 'legs-117', 'legs-119']
  },
  {
    id: 'legs-117',
    name: 'Single-Leg Romanian Deadlift with Dumbbell',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Single leg Romanian deadlift with dumbbell.',
    alternativeExercises: ['legs-116', 'legs-118', 'legs-120']
  },
  {
    id: 'legs-118',
    name: 'Romanian Deadlift on Step on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Smith Machine', 'Step'],
    notes: 'Romanian deadlift on step using Smith machine.',
    alternativeExercises: ['legs-117', 'legs-119', 'legs-121']
  },
  {
    id: 'legs-119',
    name: 'Straight-Leg Deadlift on Step on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Smith Machine', 'Step'],
    notes: 'Straight leg deadlift on step with Smith machine.',
    alternativeExercises: ['legs-118', 'legs-120', 'legs-122']
  },
  {
    id: 'legs-120',
    name: 'Straight-Leg Deadlift with Barbell',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Lower Back'],
    equipment: ['Barbell'],
    notes: 'Straight leg deadlift with barbell.',
    alternativeExercises: ['legs-119', 'legs-121', 'legs-123']
  },
  {
    id: 'legs-121',
    name: 'Close Stance Squat on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps'],
    equipment: ['Smith Machine'],
    notes: 'Close stance squat on Smith machine.',
    alternativeExercises: ['legs-11', 'legs-122', 'legs-124']
  },
  {
    id: 'legs-122',
    name: 'Machine Deadlift',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Lower Back'],
    equipment: ['Deadlift Machine'],
    notes: 'Deadlift performed on machine.',
    alternativeExercises: ['legs-25', 'legs-123', 'legs-125']
  },
  {
    id: 'legs-123',
    name: 'Straight-Leg Deadlift on Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Deadlift Machine'],
    notes: 'Straight leg deadlift on machine.',
    alternativeExercises: ['legs-122', 'legs-124', 'legs-126']
  },
  {
    id: 'legs-124',
    name: 'Sumo Squat with Barbell',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Adductors'],
    equipment: ['Barbell'],
    notes: 'Sumo squat with barbell.',
    alternativeExercises: ['legs-23', 'legs-125', 'legs-127']
  },
  {
    id: 'legs-125',
    name: 'Romanian Deadlift + Row with Resistance Band',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Latissimus Dorsi'],
    equipment: ['Resistance Band'],
    notes: 'Combination Romanian deadlift and row with band.',
    alternativeExercises: ['legs-45', 'legs-126', 'legs-128']
  },
  {
    id: 'legs-126',
    name: 'Squat Press with Resistance Band',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Resistance Band'],
    notes: 'Squat press with resistance band.',
    alternativeExercises: ['legs-51', 'legs-127', 'legs-129']
  },
  {
    id: 'legs-127',
    name: 'Squat Press with Dumbbells',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Squat press with dumbbells.',
    alternativeExercises: ['legs-126', 'legs-128', 'legs-130']
  },
  {
    id: 'legs-128',
    name: 'Sumo Squat on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Adductors'],
    equipment: ['Smith Machine'],
    notes: 'Sumo squat on Smith machine.',
    alternativeExercises: ['legs-11', 'legs-129', 'legs-131']
  },
  {
    id: 'legs-129',
    name: 'Squat with Resistance Band',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Resistance Band'],
    notes: 'Basic squat with resistance band.',
    alternativeExercises: ['legs-51', 'legs-130', 'legs-132']
  },
  {
    id: 'legs-130',
    name: 'Dumbbell Squat with Heel Raise',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Calves'],
    equipment: ['Dumbbells'],
    notes: 'Dumbbell squat with heel raise.',
    alternativeExercises: ['legs-111', 'legs-131', 'legs-133']
  },
  {
    id: 'legs-131',
    name: 'Single-Leg Bulgarian Split Squat with Dumbbell',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Single leg Bulgarian split squat with dumbbell.',
    alternativeExercises: ['legs-17', 'legs-132', 'legs-134']
  },
  {
    id: 'legs-132',
    name: 'Bulgarian Split Squat with Dumbbells',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Bulgarian split squat with dumbbells.',
    alternativeExercises: ['legs-131', 'legs-133', 'legs-135']
  },
  {
    id: 'legs-133',
    name: 'T-Bar Squat Press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['T-Bar'],
    notes: 'T-bar squat press for leg development.',
    alternativeExercises: ['legs-134', 'legs-135', 'legs-136']
  },
  {
    id: 'legs-134',
    name: 'Barbell Squat Press',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Barbell'],
    notes: 'Barbell squat press combination.',
    alternativeExercises: ['legs-133', 'legs-135', 'legs-137']
  },
  {
    id: 'legs-135',
    name: 'T-Bar Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['T-Bar'],
    notes: 'T-bar squat for leg strength.',
    alternativeExercises: ['legs-133', 'legs-136', 'legs-138']
  },
  {
    id: 'legs-136',
    name: 'Low Cable Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Cable Machine'],
    notes: 'Low cable squat for constant tension.',
    alternativeExercises: ['legs-135', 'legs-137', 'legs-139']
  },
  {
    id: 'legs-137',
    name: 'Low Cable Squat with Pause',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Cable Machine'],
    notes: 'Low cable squat with pause at bottom.',
    alternativeExercises: ['legs-136', 'legs-138', 'legs-140']
  },
  {
    id: 'legs-138',
    name: 'Bulgarian Split Squat on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine', 'Bench'],
    notes: 'Bulgarian split squat on Smith machine.',
    alternativeExercises: ['legs-17', 'legs-139', 'legs-141']
  },
  {
    id: 'legs-139',
    name: 'Machine Bulgarian Split Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bulgarian Split Squat Machine'],
    notes: 'Bulgarian split squat on machine.',
    alternativeExercises: ['legs-138', 'legs-140', 'legs-142']
  },
  {
    id: 'legs-140',
    name: 'Squat + Lateral Leg Lifts with Resistance Band in Abduction',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Abductors'],
    equipment: ['Resistance Band'],
    notes: 'Squat combined with lateral leg lifts.',
    alternativeExercises: ['legs-129', 'legs-141', 'legs-143']
  },
  {
    id: 'legs-141',
    name: 'Squat + Low Cable Row',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Latissimus Dorsi'],
    equipment: ['Cable Machine'],
    notes: 'Squat combined with low cable row.',
    alternativeExercises: ['legs-45', 'legs-142', 'legs-144']
  },
  {
    id: 'legs-142',
    name: 'Smith Machine Hack Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Hack squat performed on Smith machine.',
    alternativeExercises: ['legs-12', 'legs-143', 'legs-145']
  },
  {
    id: 'legs-143',
    name: 'Sumo Deadlift on Step on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Hip Adductors'],
    equipment: ['Smith Machine', 'Step'],
    notes: 'Sumo deadlift on step using Smith machine.',
    alternativeExercises: ['legs-112', 'legs-144', 'legs-146']
  },
  {
    id: 'legs-144',
    name: 'Sumo Deadlift on Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Hip Adductors'],
    equipment: ['Smith Machine'],
    notes: 'Sumo deadlift on Smith machine.',
    alternativeExercises: ['legs-143', 'legs-145', 'legs-147']
  },
  {
    id: 'legs-145',
    name: 'Sumo Deadlift on Multipower with Step and Straight Back',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Hip Adductors'],
    equipment: ['Smith Machine', 'Step'],
    notes: 'Sumo deadlift on multipower with step.',
    alternativeExercises: ['legs-143', 'legs-146', 'legs-148']
  },
  {
    id: 'legs-146',
    name: 'Romanian Deadlift with Low Cable',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Cable Machine'],
    notes: 'Romanian deadlift with low cable.',
    alternativeExercises: ['legs-22', 'legs-147', 'legs-149']
  },
  {
    id: 'legs-147',
    name: 'Hip Thrust on Multipower with Step',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Smith Machine', 'Step'],
    notes: 'Hip thrust on multipower with step.',
    alternativeExercises: ['legs-90', 'legs-148', 'legs-150']
  },
  {
    id: 'legs-148',
    name: 'Single Leg Reverse Hyperextension on the Smith Machine',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Smith Machine'],
    notes: 'Single leg reverse hyperextension on Smith machine.',
    alternativeExercises: ['legs-149', 'legs-150', 'legs-151']
  },
  {
    id: 'legs-149',
    name: 'Frog Kicks on the Smith Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hip Flexors'],
    equipment: ['Smith Machine'],
    notes: 'Frog kicks performed on Smith machine.',
    alternativeExercises: ['legs-148', 'legs-150', 'legs-152']
  },
  {
    id: 'legs-150',
    name: 'Romanian Deadlift + Dumbbell Row',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Latissimus Dorsi'],
    equipment: ['Dumbbells'],
    notes: 'Combination Romanian deadlift and dumbbell row.',
    alternativeExercises: ['legs-22', 'legs-125', 'legs-151']
  }
];

// CHEST EXERCISES (70+ exercises)  
const chestExercises: ExerciseData[] = [
  {
    id: 'chest-1',
    name: 'Cable chest fly',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine'],
    notes: 'Cable chest fly for pectoral isolation.',
    alternativeExercises: ['chest-2', 'chest-3', 'chest-4']
  },
  {
    id: 'chest-2',
    name: 'Dumbbell fly on incline bench',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Incline dumbbell fly for upper chest development.',
    alternativeExercises: ['chest-1', 'chest-3', 'chest-5']
  },
  {
    id: 'chest-3',
    name: 'Dumbbell fly on flat bench',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Flat bench dumbbell fly for chest isolation.',
    alternativeExercises: ['chest-2', 'chest-4', 'chest-6']
  },
  {
    id: 'chest-4',
    name: 'Dumbbell flat bench press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Flat bench dumbbell press for chest development.',
    alternativeExercises: ['chest-5', 'chest-6', 'chest-7']
  },
  {
    id: 'chest-5',
    name: 'Dumbbell inclined bench press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Incline dumbbell press for upper chest.',
    alternativeExercises: ['chest-4', 'chest-6', 'chest-8']
  },
  {
    id: 'chest-6',
    name: 'Barbell flat bench press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Classic barbell bench press for chest development.',
    alternativeExercises: ['chest-4', 'chest-7', 'chest-9']
  },
  {
    id: 'chest-7',
    name: 'Barbell incline bench press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Barbell', 'Incline Bench'],
    notes: 'Incline barbell bench press for upper chest.',
    alternativeExercises: ['chest-5', 'chest-8', 'chest-10']
  },
  {
    id: 'chest-8',
    name: 'SMITH Machine flat bench press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Smith Machine', 'Bench'],
    notes: 'Smith machine flat bench press for controlled movement.',
    alternativeExercises: ['chest-6', 'chest-9', 'chest-11']
  },
  {
    id: 'chest-9',
    name: 'SMITH Machine incline bench press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Smith Machine', 'Incline Bench'],
    notes: 'Smith machine incline bench press.',
    alternativeExercises: ['chest-7', 'chest-10', 'chest-12']
  },
  {
    id: 'chest-10',
    name: 'Chest Press',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Chest Press Machine'],
    notes: 'Machine chest press for beginners.',
    alternativeExercises: ['chest-11', 'chest-12', 'chest-13']
  },
  {
    id: 'chest-11',
    name: 'Chest fly machine',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals'],
    equipment: ['Chest Fly Machine'],
    notes: 'Machine chest fly for pectoral isolation.',
    alternativeExercises: ['chest-1', 'chest-12', 'chest-14']
  },
  {
    id: 'chest-12',
    name: 'Dips',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Dip Bars'],
    notes: 'Dips for chest and tricep development.',
    alternativeExercises: ['chest-13', 'chest-14', 'chest-15']
  },
  {
    id: 'chest-13',
    name: 'Push Up',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Bodyweight'],
    notes: 'Basic push-up for chest development.',
    alternativeExercises: ['chest-14', 'chest-15', 'chest-16']
  },
  {
    id: 'chest-14',
    name: 'Elevated Push Up',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Bench', 'Step'],
    notes: 'Elevated push-up for increased difficulty.',
    alternativeExercises: ['chest-13', 'chest-15', 'chest-17']
  },
  {
    id: 'chest-15',
    name: 'Push Up on Foot-Elevated Surface',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Bench', 'Step'],
    notes: 'Feet elevated push-up for upper chest.',
    alternativeExercises: ['chest-14', 'chest-16', 'chest-18']
  },
  {
    id: 'chest-16',
    name: 'Diamond Push-Up',
    category: 'chest',
    difficulty: 'advanced',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Bodyweight'],
    notes: 'Diamond push-up for tricep emphasis.',
    alternativeExercises: ['chest-13', 'chest-17', 'chest-19']
  },
  {
    id: 'chest-17',
    name: 'Dumbbell Floor Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Dumbbells'],
    notes: 'Floor press with dumbbells for chest development.',
    alternativeExercises: ['chest-4', 'chest-18', 'chest-20']
  },
  {
    id: 'chest-18',
    name: 'Wide Chest Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids'],
    equipment: ['Chest Press Machine'],
    notes: 'Wide grip chest press for outer chest.',
    alternativeExercises: ['chest-10', 'chest-19', 'chest-21']
  },
  {
    id: 'chest-19',
    name: 'Vertical Chest Press (Machine)',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Chest Press Machine'],
    notes: 'Vertical chest press on machine.',
    alternativeExercises: ['chest-18', 'chest-20', 'chest-22']
  },
  {
    id: 'chest-20',
    name: 'Chest Press neutral grip',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Chest Press Machine'],
    notes: 'Neutral grip chest press for different angle.',
    alternativeExercises: ['chest-19', 'chest-21', 'chest-23']
  },
  {
    id: 'chest-21',
    name: 'Incline Forward Cable Crossovers',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids'],
    equipment: ['Cable Machine', 'Incline Bench'],
    notes: 'Incline cable crossovers for upper chest.',
    alternativeExercises: ['chest-1', 'chest-22', 'chest-24']
  },
  {
    id: 'chest-22',
    name: 'Incline Prone Cable Crossovers',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine', 'Incline Bench'],
    notes: 'Prone incline cable crossovers.',
    alternativeExercises: ['chest-21', 'chest-23', 'chest-25']
  },
  {
    id: 'chest-23',
    name: '45° Incline Dumbbell Press with Neutral Grip',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: '45-degree incline press with neutral grip.',
    alternativeExercises: ['chest-5', 'chest-24', 'chest-26']
  },
  {
    id: 'chest-24',
    name: 'Close-Grip Incline Dumbbell Press at 45°',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Close grip incline dumbbell press at 45 degrees.',
    alternativeExercises: ['chest-23', 'chest-25', 'chest-27']
  },
  {
    id: 'chest-25',
    name: 'Close-Grip Dumbbell Bench Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Close grip dumbbell bench press.',
    alternativeExercises: ['chest-24', 'chest-26', 'chest-28']
  },
  {
    id: 'chest-26',
    name: 'Close-Grip Dumbbell Incline Press at 30° with Neutral Grip',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: '30-degree incline close grip with neutral grip.',
    alternativeExercises: ['chest-25', 'chest-27', 'chest-29']
  },
  {
    id: 'chest-27',
    name: 'Dumbbell Bench Press with Neutral Grip',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Dumbbell bench press with neutral grip.',
    alternativeExercises: ['chest-4', 'chest-28', 'chest-30']
  },
  {
    id: 'chest-28',
    name: 'Single-Arm T-Bar Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['T-Bar'],
    notes: 'Single arm T-bar press for unilateral development.',
    alternativeExercises: ['chest-29', 'chest-30', 'chest-31']
  },
  {
    id: 'chest-29',
    name: 'High Cable Press with Rope on Incline Bench',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Cable Machine', 'Incline Bench'],
    notes: 'High cable press with rope on incline bench.',
    alternativeExercises: ['chest-30', 'chest-31', 'chest-32']
  },
  {
    id: 'chest-30',
    name: 'Low Cable Crossovers on Flat Bench',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine', 'Bench'],
    notes: 'Low cable crossovers on flat bench.',
    alternativeExercises: ['chest-31', 'chest-32', 'chest-33']
  },
  {
    id: 'chest-31',
    name: 'Low Cable Crossovers on 30° Incline Bench',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids'],
    equipment: ['Cable Machine', 'Incline Bench'],
    notes: 'Low cable crossovers on 30-degree incline.',
    alternativeExercises: ['chest-30', 'chest-32', 'chest-34']
  },
  {
    id: 'chest-32',
    name: 'Low Cable Crossovers on 45° Incline Bench',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids'],
    equipment: ['Cable Machine', 'Incline Bench'],
    notes: 'Low cable crossovers on 45-degree incline.',
    alternativeExercises: ['chest-31', 'chest-33', 'chest-35']
  },
  {
    id: 'chest-33',
    name: 'Dumbbell Incline 45° Bench Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Dumbbell incline press at 45 degrees.',
    alternativeExercises: ['chest-5', 'chest-34', 'chest-36']
  },
  {
    id: 'chest-34',
    name: 'Standing Low Cable Crossovers',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine'],
    notes: 'Standing low cable crossovers.',
    alternativeExercises: ['chest-1', 'chest-35', 'chest-37']
  },
  {
    id: 'chest-35',
    name: 'Standing Wide-Arm Low Cable Crossovers',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine'],
    notes: 'Standing wide-arm low cable crossovers.',
    alternativeExercises: ['chest-34', 'chest-36', 'chest-38']
  },
  {
    id: 'chest-36',
    name: 'Low Cable Crossovers on Machine',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Crossover Machine'],
    notes: 'Low cable crossovers on machine.',
    alternativeExercises: ['chest-35', 'chest-37', 'chest-39']
  },
  {
    id: 'chest-37',
    name: 'Low Cable Incline Bench Chest Press at 45°',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Cable Machine', 'Incline Bench'],
    notes: 'Low cable chest press on 45-degree incline.',
    alternativeExercises: ['chest-38', 'chest-39', 'chest-40']
  },
  {
    id: 'chest-38',
    name: 'Converging Chest Press Machine',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Anterior Deltoids'],
    equipment: ['Converging Chest Press Machine'],
    notes: 'Converging chest press machine for natural movement.',
    alternativeExercises: ['chest-10', 'chest-39', 'chest-41']
  },
  {
    id: 'chest-39',
    name: 'Chest Pull with Rope',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Serratus Anterior'],
    equipment: ['Cable Machine'],
    notes: 'Chest pull with rope for serratus activation.',
    alternativeExercises: ['chest-40', 'chest-41', 'chest-42']
  },
  {
    id: 'chest-40',
    name: 'Seated High Cable Crossovers',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine', 'Bench'],
    notes: 'Seated high cable crossovers.',
    alternativeExercises: ['chest-41', 'chest-42', 'chest-43']
  },
  {
    id: 'chest-41',
    name: 'Seated Low Cable Crossovers',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine', 'Bench'],
    notes: 'Seated low cable crossovers.',
    alternativeExercises: ['chest-40', 'chest-42', 'chest-44']
  },
  {
    id: 'chest-42',
    name: 'Close Grip Bench Press on Smith Machine',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Smith Machine', 'Bench'],
    notes: 'Close grip bench press on Smith machine.',
    alternativeExercises: ['chest-8', 'chest-43', 'chest-45']
  },
  {
    id: 'chest-43',
    name: 'Incline 30-Degree Neutral Grip Dumbbell Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: '30-degree incline with neutral grip.',
    alternativeExercises: ['chest-26', 'chest-44', 'chest-46']
  },
  {
    id: 'chest-44',
    name: 'Incline 45-Degree Close Grip Bench Press on Multipower',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Smith Machine', 'Incline Bench'],
    notes: '45-degree incline close grip on multipower.',
    alternativeExercises: ['chest-9', 'chest-45', 'chest-47']
  },
  {
    id: 'chest-45',
    name: 'Low Cable Chest Flyes on Incline Bench',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Anterior Deltoids'],
    equipment: ['Cable Machine', 'Incline Bench'],
    notes: 'Low cable chest flyes on incline bench.',
    alternativeExercises: ['chest-2', 'chest-46', 'chest-48']
  },
  {
    id: 'chest-46',
    name: 'Low Cable Chest Flyes on Flat Bench',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine', 'Bench'],
    notes: 'Low cable chest flyes on flat bench.',
    alternativeExercises: ['chest-3', 'chest-47', 'chest-49']
  },
  {
    id: 'chest-47',
    name: 'Seated Cable Chest Flyes on Bench',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine', 'Bench'],
    notes: 'Seated cable chest flyes on bench.',
    alternativeExercises: ['chest-46', 'chest-48', 'chest-50']
  },
  {
    id: 'chest-48',
    name: 'Standing Cable Chest Flyes',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine'],
    notes: 'Standing cable chest flyes.',
    alternativeExercises: ['chest-47', 'chest-49', 'chest-51']
  },
  {
    id: 'chest-49',
    name: 'Chest Flyes on Machine with Independent Handles',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals'],
    equipment: ['Chest Fly Machine'],
    notes: 'Machine chest flyes with independent handles.',
    alternativeExercises: ['chest-11', 'chest-50', 'chest-52']
  },
  {
    id: 'chest-50',
    name: 'Cable Flyes with Handles',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine'],
    notes: 'Cable flyes using handles.',
    alternativeExercises: ['chest-1', 'chest-51', 'chest-53']
  },
  {
    id: 'chest-51',
    name: 'Machine Dips',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Dip Machine'],
    notes: 'Assisted dips on machine.',
    alternativeExercises: ['chest-12', 'chest-52', 'chest-54']
  },
  {
    id: 'chest-52',
    name: 'Bench dip',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Bench'],
    notes: 'Bench dips for chest and triceps.',
    alternativeExercises: ['chest-12', 'chest-53', 'chest-55']
  },
  {
    id: 'chest-53',
    name: 'Single Dumbbell French Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Dumbbells'],
    notes: 'Single dumbbell French press.',
    alternativeExercises: ['chest-54', 'chest-55', 'chest-56']
  },
  {
    id: 'chest-54',
    name: 'Incline Dumbbell French Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Incline dumbbell French press.',
    alternativeExercises: ['chest-53', 'chest-55', 'chest-57']
  }
];

// BACK EXERCISES (80+ exercises)
const backExercises: ExerciseData[] = [
  {
    id: 'back-1',
    name: 'Lat machine pulldown',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Biceps', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine'],
    notes: 'Basic lat pulldown for back development.',
    alternativeExercises: ['back-2', 'back-3', 'back-4']
  },
  {
    id: 'back-2',
    name: 'Lat machine reverse grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Lat Pulldown Machine'],
    notes: 'Reverse grip lat pulldown for bicep emphasis.',
    alternativeExercises: ['back-1', 'back-3', 'back-5']
  },
  {
    id: 'back-3',
    name: 'Triangle bar lat pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine', 'Triangle Bar'],
    notes: 'Triangle bar lat pulldown for neutral grip.',
    alternativeExercises: ['back-1', 'back-2', 'back-6']
  },
  {
    id: 'back-4',
    name: 'Seated cable low row with triangle bar',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    equipment: ['Cable Machine', 'Triangle Bar'],
    notes: 'Seated low row with triangle bar.',
    alternativeExercises: ['back-5', 'back-6', 'back-7']
  },
  {
    id: 'back-5',
    name: 'Single arm seated low row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm seated low row for unilateral development.',
    alternativeExercises: ['back-4', 'back-6', 'back-8']
  },
  {
    id: 'back-6',
    name: 'Reverse grip pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Pull-up Bar'],
    notes: 'Reverse grip pull-ups for bicep emphasis.',
    alternativeExercises: ['back-7', 'back-8', 'back-9']
  },
  {
    id: 'back-7',
    name: 'Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Biceps', 'Rhomboids'],
    equipment: ['Pull-up Bar'],
    notes: 'Classic pull-ups for back development.',
    alternativeExercises: ['back-6', 'back-8', 'back-10']
  },
  {
    id: 'back-8',
    name: 'Neutral grip pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Pull-up Bar'],
    notes: 'Neutral grip pull-ups for wrist comfort.',
    alternativeExercises: ['back-7', 'back-9', 'back-11']
  },
  {
    id: 'back-9',
    name: 'Rope pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Posterior Deltoids'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Rope pulldown for lat development.',
    alternativeExercises: ['back-10', 'back-11', 'back-12']
  },
  {
    id: 'back-10',
    name: 'Standing lat pushdown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Cable Machine'],
    notes: 'Standing lat pushdown for lat isolation.',
    alternativeExercises: ['back-9', 'back-11', 'back-13']
  },
  {
    id: 'back-11',
    name: 'Vertical Row neutral grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Vertical row with neutral grip.',
    alternativeExercises: ['back-12', 'back-13', 'back-14']
  },
  {
    id: 'back-12',
    name: 'Single arm Neutral Grip Low Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm neutral grip low row.',
    alternativeExercises: ['back-5', 'back-13', 'back-15']
  },
  {
    id: 'back-13',
    name: 'Low Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    equipment: ['Cable Machine'],
    notes: 'Basic low row for back development.',
    alternativeExercises: ['back-4', 'back-14', 'back-16']
  },
  {
    id: 'back-14',
    name: 'Single arm Vertical Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm vertical row.',
    alternativeExercises: ['back-11', 'back-15', 'back-17']
  },
  {
    id: 'back-15',
    name: 'Lat Machine trazy bar',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine', 'Trazy Bar'],
    notes: 'Lat pulldown with trazy bar.',
    alternativeExercises: ['back-3', 'back-16', 'back-18']
  },
  {
    id: 'back-16',
    name: 'Hyperextension',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Erector Spinae', 'Glutes'],
    equipment: ['Hyperextension Bench'],
    notes: 'Hyperextension for lower back strength.',
    alternativeExercises: ['back-17', 'back-18', 'back-19']
  },
  {
    id: 'back-17',
    name: 'Seated cable low row with Trazy bar',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine', 'Trazy Bar'],
    notes: 'Seated low row with trazy bar.',
    alternativeExercises: ['back-4', 'back-15', 'back-20']
  },
  {
    id: 'back-18',
    name: 'Single arm dumbbell row on bench',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Single arm dumbbell row on bench.',
    alternativeExercises: ['back-19', 'back-20', 'back-21']
  },
  {
    id: 'back-19',
    name: 'Incline Neutral Grip Dumbbell Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Incline neutral grip dumbbell row.',
    alternativeExercises: ['back-18', 'back-20', 'back-22']
  },
  {
    id: 'back-20',
    name: 'Supported incline barbell row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    equipment: ['Barbell', 'Incline Bench'],
    notes: 'Supported incline barbell row.',
    alternativeExercises: ['back-19', 'back-21', 'back-23']
  },
  {
    id: 'back-21',
    name: 'Barbell Row',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    equipment: ['Barbell'],
    notes: 'Classic bent-over barbell row.',
    alternativeExercises: ['back-20', 'back-22', 'back-24']
  },
  {
    id: 'back-22',
    name: 'Neutral Grip Dumbbell Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Dumbbells'],
    notes: 'Neutral grip dumbbell row.',
    alternativeExercises: ['back-19', 'back-23', 'back-25']
  },
  {
    id: 'back-23',
    name: 'T-Bar Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    equipment: ['T-Bar'],
    notes: 'T-bar row for back thickness.',
    alternativeExercises: ['back-24', 'back-25', 'back-26']
  },
  {
    id: 'back-24',
    name: 'Single Arm T-Bar Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['T-Bar'],
    notes: 'Single arm T-bar row for unilateral development.',
    alternativeExercises: ['back-23', 'back-25', 'back-27']
  },
  {
    id: 'back-25',
    name: 'Single Arm Supine Grip High Cable Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Single arm supine grip high cable row.',
    alternativeExercises: ['back-26', 'back-27', 'back-28']
  },
  {
    id: 'back-26',
    name: 'Single Arm Neutral Grip High Cable Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm neutral grip high cable row.',
    alternativeExercises: ['back-25', 'back-27', 'back-29']
  },
  {
    id: 'back-27',
    name: 'Single Arm Low Cable Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm low cable row.',
    alternativeExercises: ['back-5', 'back-28', 'back-30']
  },
  {
    id: 'back-28',
    name: 'Single Arm Low Cable Row with Supine Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Single arm low cable row with supine grip.',
    alternativeExercises: ['back-27', 'back-29', 'back-31']
  },
  {
    id: 'back-29',
    name: 'Dumbbell Bent-Over Row on Incline Bench',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Bent-over dumbbell row on incline bench.',
    alternativeExercises: ['back-19', 'back-30', 'back-32']
  },
  {
    id: 'back-30',
    name: 'Dumbbell Bent-Over Row on Incline Bench with Pronated Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Bent-over row on incline with pronated grip.',
    alternativeExercises: ['back-29', 'back-31', 'back-33']
  },
  {
    id: 'back-31',
    name: 'Barbell Bent-Over Row with Supinated Grip',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Biceps', 'Rhomboids'],
    equipment: ['Barbell'],
    notes: 'Barbell bent-over row with supinated grip.',
    alternativeExercises: ['back-21', 'back-32', 'back-34']
  },
  {
    id: 'back-32',
    name: 'Barbell Bent-Over Row with Neutral Grip',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Barbell'],
    notes: 'Barbell bent-over row with neutral grip.',
    alternativeExercises: ['back-31', 'back-33', 'back-35']
  },
  {
    id: 'back-33',
    name: 'Bent-Over Row on Smith Machine',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Smith Machine'],
    notes: 'Bent-over row on Smith machine.',
    alternativeExercises: ['back-32', 'back-34', 'back-36']
  },
  {
    id: 'back-34',
    name: 'Smith Machine Bent-Over Row with Supinated Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Smith Machine'],
    notes: 'Smith machine bent-over row with supinated grip.',
    alternativeExercises: ['back-33', 'back-35', 'back-37']
  },
  {
    id: 'back-35',
    name: 'T-Bar Machine Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['T-Bar Machine'],
    notes: 'T-bar machine row for back development.',
    alternativeExercises: ['back-23', 'back-36', 'back-38']
  },
  {
    id: 'back-36',
    name: 'T-Bar Machine Row with Neutral Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['T-Bar Machine'],
    notes: 'T-bar machine row with neutral grip.',
    alternativeExercises: ['back-35', 'back-37', 'back-39']
  },
  {
    id: 'back-37',
    name: 'Single Arm Dumbbell Pullover',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Serratus Anterior'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Single arm dumbbell pullover.',
    alternativeExercises: ['back-38', 'back-39', 'back-40']
  },
  {
    id: 'back-38',
    name: 'Dumbbell Pullover',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Serratus Anterior'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Dumbbell pullover for lat expansion.',
    alternativeExercises: ['back-37', 'back-39', 'back-41']
  },
  {
    id: 'back-39',
    name: 'Low Cable Pulley with Triangle Handle',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine', 'Triangle Handle'],
    notes: 'Low cable pulley with triangle handle.',
    alternativeExercises: ['back-4', 'back-40', 'back-42']
  },
  {
    id: 'back-40',
    name: 'Supinated Grip Pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Lat Pulldown Machine'],
    notes: 'Supinated grip lat pulldown.',
    alternativeExercises: ['back-2', 'back-41', 'back-43']
  },
  {
    id: 'back-41',
    name: 'Single Arm Cable Pulley',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Cable Machine'],
    notes: 'Single arm cable pulley.',
    alternativeExercises: ['back-42', 'back-43', 'back-44']
  },
  {
    id: 'back-42',
    name: 'Single Arm Supinated Grip Cable Pulley',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Single arm supinated grip cable pulley.',
    alternativeExercises: ['back-41', 'back-43', 'back-45']
  },
  {
    id: 'back-43',
    name: 'Wide Grip Pulley',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine'],
    notes: 'Wide grip lat pulldown.',
    alternativeExercises: ['back-1', 'back-44', 'back-46']
  },
  {
    id: 'back-44',
    name: 'Cable Pulldown with Rope',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Posterior Deltoids'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Cable pulldown with rope attachment.',
    alternativeExercises: ['back-9', 'back-45', 'back-47']
  },
  {
    id: 'back-45',
    name: 'Wide Grip Cable Pulley',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Wide grip cable pulley.',
    alternativeExercises: ['back-43', 'back-46', 'back-48']
  },
  {
    id: 'back-46',
    name: 'Low Cable Wide Grip Pulley',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Low cable wide grip pulley.',
    alternativeExercises: ['back-45', 'back-47', 'back-49']
  },
  {
    id: 'back-47',
    name: 'Low Cable Wide Grip Pulley with Supinated Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Low cable wide grip with supinated grip.',
    alternativeExercises: ['back-46', 'back-48', 'back-50']
  },
  {
    id: 'back-48',
    name: 'Neutral Grip Pull-up',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Pull-up Bar'],
    notes: 'Neutral grip pull-up variation.',
    alternativeExercises: ['back-8', 'back-49', 'back-51']
  },
  {
    id: 'back-49',
    name: 'Single Arm Cable Pulldown with Handle',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Cable Machine'],
    notes: 'Single arm cable pulldown with handle.',
    alternativeExercises: ['back-41', 'back-50', 'back-52']
  },
  {
    id: 'back-50',
    name: 'Machine Pulldown',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Pulldown Machine'],
    notes: 'Basic machine pulldown.',
    alternativeExercises: ['back-1', 'back-51', 'back-53']
  },
  {
    id: 'back-51',
    name: 'Machine Pulldown with Close Grip',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Pulldown Machine'],
    notes: 'Machine pulldown with close grip.',
    alternativeExercises: ['back-50', 'back-52', 'back-54']
  },
  {
    id: 'back-52',
    name: 'Single Arm Machine Pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Pulldown Machine'],
    notes: 'Single arm machine pulldown.',
    alternativeExercises: ['back-51', 'back-53', 'back-55']
  },
  {
    id: 'back-53',
    name: 'Machine Pull Down with Narrow Grip',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Pulldown Machine'],
    notes: 'Machine pulldown with narrow grip.',
    alternativeExercises: ['back-52', 'back-54', 'back-56']
  },
  {
    id: 'back-54',
    name: 'Machine Pull Down with Bent Elbows',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Pulldown Machine'],
    notes: 'Machine pulldown with bent elbows.',
    alternativeExercises: ['back-53', 'back-55', 'back-57']
  },
  {
    id: 'back-55',
    name: 'Incline Bench Seated Cable Pull Down with Rope',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Posterior Deltoids'],
    equipment: ['Cable Machine', 'Incline Bench', 'Rope'],
    notes: 'Incline bench seated cable pulldown with rope.',
    alternativeExercises: ['back-56', 'back-57', 'back-58']
  },
  {
    id: 'back-56',
    name: 'Seated Cable Pull Down with Rope',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Posterior Deltoids'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Seated cable pulldown with rope.',
    alternativeExercises: ['back-55', 'back-57', 'back-59']
  },
  {
    id: 'back-57',
    name: 'High Cable Bar Pull Down on Incline Bench',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine', 'Incline Bench'],
    notes: 'High cable bar pulldown on incline bench.',
    alternativeExercises: ['back-56', 'back-58', 'back-60']
  },
  {
    id: 'back-58',
    name: 'Single-Arm Incline Bench Lat Pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Cable Machine', 'Incline Bench'],
    notes: 'Single arm lat pulldown on incline bench.',
    alternativeExercises: ['back-59', 'back-60', 'back-61']
  },
  {
    id: 'back-59',
    name: 'Single-Arm Lat Pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Cable Machine'],
    notes: 'Single arm lat pulldown.',
    alternativeExercises: ['back-58', 'back-60', 'back-62']
  },
  {
    id: 'back-60',
    name: 'Reverse Seated Triangle Lat Pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine', 'Triangle Bar'],
    notes: 'Reverse seated triangle lat pulldown.',
    alternativeExercises: ['back-3', 'back-61', 'back-63']
  },
  {
    id: 'back-61',
    name: 'Single-Arm Supine Lat Pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Single arm supine lat pulldown.',
    alternativeExercises: ['back-62', 'back-63', 'back-64']
  },
  {
    id: 'back-62',
    name: 'Single-Arm Vertical Row with Neutral Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm vertical row with neutral grip.',
    alternativeExercises: ['back-14', 'back-63', 'back-65']
  },
  {
    id: 'back-63',
    name: 'Vertical Row Machine',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Vertical Row Machine'],
    notes: 'Vertical row on machine.',
    alternativeExercises: ['back-11', 'back-64', 'back-66']
  },
  {
    id: 'back-64',
    name: 'Single-Arm Pronated Lat Machine',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine'],
    notes: 'Single arm pronated lat pulldown.',
    alternativeExercises: ['back-65', 'back-66', 'back-67']
  },
  {
    id: 'back-65',
    name: 'Neutral-Grip Lat Machine',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine'],
    notes: 'Neutral grip lat pulldown.',
    alternativeExercises: ['back-64', 'back-66', 'back-68']
  },
  {
    id: 'back-66',
    name: 'Lat Machine with Forward-Leaning Torso and Rope',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Posterior Deltoids'],
    equipment: ['Lat Pulldown Machine', 'Rope'],
    notes: 'Lat machine with forward-leaning torso and rope.',
    alternativeExercises: ['back-67', 'back-68', 'back-69']
  },
  {
    id: 'back-67',
    name: 'Lat Machine with Leaning Torso and Triangle Handle',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine', 'Triangle Handle'],
    notes: 'Lat machine with leaning torso and triangle handle.',
    alternativeExercises: ['back-66', 'back-68', 'back-70']
  },
  {
    id: 'back-68',
    name: 'Kneeling Lat Machine with High Pulleys',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Core'],
    equipment: ['Cable Machine'],
    notes: 'Kneeling lat pulldown with high pulleys.',
    alternativeExercises: ['back-69', 'back-70', 'back-71']
  },
  {
    id: 'back-69',
    name: 'Chin-Ups on Smith Machine',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Smith Machine'],
    notes: 'Chin-ups performed on Smith machine.',
    alternativeExercises: ['back-6', 'back-70', 'back-72']
  },
  {
    id: 'back-70',
    name: 'Low Cable Chin-Ups with Rope',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Low cable chin-ups with rope.',
    alternativeExercises: ['back-69', 'back-71', 'back-73']
  },
  {
    id: 'back-71',
    name: 'Low Cable Chin-Ups with Bar',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Cable Machine', 'Bar'],
    notes: 'Low cable chin-ups with bar.',
    alternativeExercises: ['back-70', 'back-72', 'back-74']
  },
  {
    id: 'back-72',
    name: 'Kyphosis Hyperextension',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Erector Spinae', 'Rhomboids'],
    equipment: ['Hyperextension Bench'],
    notes: 'Kyphosis hyperextension for posture.',
    alternativeExercises: ['back-16', 'back-73', 'back-75']
  },
  {
    id: 'back-73',
    name: 'Single-Arm Low Row Supinated Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Single arm low row with supinated grip.',
    alternativeExercises: ['back-28', 'back-74', 'back-76']
  },
  {
    id: 'back-74',
    name: 'Single-Arm Low Row Pronated Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm low row with pronated grip.',
    alternativeExercises: ['back-73', 'back-75', 'back-77']
  },
  {
    id: 'back-75',
    name: 'Low Row Supinated Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Low row with supinated grip.',
    alternativeExercises: ['back-74', 'back-76', 'back-78']
  },
  {
    id: 'back-76',
    name: 'Single-Arm Low Row Neutral Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm low row with neutral grip.',
    alternativeExercises: ['back-12', 'back-77', 'back-79']
  },
  {
    id: 'back-77',
    name: 'Low Row Pronated Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Low row with pronated grip.',
    alternativeExercises: ['back-76', 'back-78', 'back-80']
  },
  {
    id: 'back-78',
    name: 'Low Row Neutral Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Low row with neutral grip.',
    alternativeExercises: ['back-13', 'back-79', 'back-80']
  }
];

// SHOULDERS EXERCISES (60+ exercises)
const shouldersExercises: ExerciseData[] = [
  {
    id: 'shoulders-1',
    name: 'Barbell shoulder press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Barbell'],
    notes: 'Barbell shoulder press for overall shoulder development.',
    alternativeExercises: ['shoulders-2', 'shoulders-3', 'shoulders-4']
  },
  {
    id: 'shoulders-2',
    name: 'Shoulder press machine',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Shoulder Press Machine'],
    notes: 'Machine shoulder press for controlled movement.',
    alternativeExercises: ['shoulders-1', 'shoulders-3', 'shoulders-5']
  },
  {
    id: 'shoulders-3',
    name: 'Single arm cable lateral raise',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm cable lateral raise for side delt isolation.',
    alternativeExercises: ['shoulders-4', 'shoulders-5', 'shoulders-6']
  },
  {
    id: 'shoulders-4',
    name: 'Single arm cable rear delt fly',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm cable rear delt fly for posterior development.',
    alternativeExercises: ['shoulders-3', 'shoulders-5', 'shoulders-7']
  },
  {
    id: 'shoulders-5',
    name: 'Cable rope upright row',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Medial Deltoids', 'Trapezius'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Cable rope upright row for shoulder and trap development.',
    alternativeExercises: ['shoulders-6', 'shoulders-7', 'shoulders-8']
  },
  {
    id: 'shoulders-6',
    name: 'Standing cable rope front raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Standing cable rope front raises for front delts.',
    alternativeExercises: ['shoulders-7', 'shoulders-8', 'shoulders-9']
  },
  {
    id: 'shoulders-7',
    name: 'Standing cable front raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Standing cable front raises for anterior development.',
    alternativeExercises: ['shoulders-6', 'shoulders-8', 'shoulders-10']
  },
  {
    id: 'shoulders-8',
    name: 'Standing lateral raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Standing lateral raises with dumbbells.',
    alternativeExercises: ['shoulders-9', 'shoulders-10', 'shoulders-11']
  },
  {
    id: 'shoulders-9',
    name: 'Single arm lateral raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Single arm lateral raises for unilateral development.',
    alternativeExercises: ['shoulders-8', 'shoulders-10', 'shoulders-12']
  },
  {
    id: 'shoulders-10',
    name: 'Alternating lateral raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Alternating lateral raises for variety.',
    alternativeExercises: ['shoulders-9', 'shoulders-11', 'shoulders-13']
  },
  {
    id: 'shoulders-11',
    name: 'Standing dumbell front raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Standing dumbbell front raises.',
    alternativeExercises: ['shoulders-12', 'shoulders-13', 'shoulders-14']
  },
  {
    id: 'shoulders-12',
    name: 'Standing dumbbell hammer grip front raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Standing front raises with hammer grip.',
    alternativeExercises: ['shoulders-11', 'shoulders-13', 'shoulders-15']
  },
  {
    id: 'shoulders-13',
    name: 'Standing alternating dumbbell front raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Standing alternating dumbbell front raises.',
    alternativeExercises: ['shoulders-12', 'shoulders-14', 'shoulders-16']
  },
  {
    id: 'shoulders-14',
    name: 'Standing alternating dumbbell hammer grip front raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Standing alternating front raises with hammer grip.',
    alternativeExercises: ['shoulders-13', 'shoulders-15', 'shoulders-17']
  },
  {
    id: 'shoulders-15',
    name: 'Standing barbell front raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Barbell'],
    notes: 'Standing barbell front raises.',
    alternativeExercises: ['shoulders-16', 'shoulders-17', 'shoulders-18']
  },
  {
    id: 'shoulders-16',
    name: 'Barbell front raises reverse grip',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Barbell'],
    notes: 'Barbell front raises with reverse grip.',
    alternativeExercises: ['shoulders-15', 'shoulders-17', 'shoulders-19']
  },
  {
    id: 'shoulders-17',
    name: 'Upright Barbell Rows',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Medial Deltoids', 'Trapezius'],
    equipment: ['Barbell'],
    notes: 'Upright barbell rows for shoulder and trap development.',
    alternativeExercises: ['shoulders-18', 'shoulders-19', 'shoulders-20']
  },
  {
    id: 'shoulders-18',
    name: 'Dumbbell upright row',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Medial Deltoids', 'Trapezius'],
    equipment: ['Dumbbells'],
    notes: 'Dumbbell upright row for shoulder development.',
    alternativeExercises: ['shoulders-17', 'shoulders-19', 'shoulders-21']
  },
  {
    id: 'shoulders-19',
    name: 'Bent over rear delt flys',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Bent over rear delt flys for posterior development.',
    alternativeExercises: ['shoulders-20', 'shoulders-21', 'shoulders-22']
  },
  {
    id: 'shoulders-20',
    name: 'Standing dumbbell shoulder press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Dumbbells'],
    notes: 'Standing dumbbell shoulder press.',
    alternativeExercises: ['shoulders-21', 'shoulders-22', 'shoulders-23']
  },
  {
    id: 'shoulders-21',
    name: 'Standing Arnold Press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Posterior Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Standing Arnold press for complete shoulder development.',
    alternativeExercises: ['shoulders-20', 'shoulders-22', 'shoulders-24']
  },
  {
    id: 'shoulders-22',
    name: 'Standing military press',
    category: 'shoulders',
    difficulty: 'advanced',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Barbell'],
    notes: 'Standing military press with barbell.',
    alternativeExercises: ['shoulders-1', 'shoulders-23', 'shoulders-25']
  },
  {
    id: 'shoulders-23',
    name: 'Rear delt barbell row',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    equipment: ['Barbell'],
    notes: 'Rear delt barbell row for posterior development.',
    alternativeExercises: ['shoulders-24', 'shoulders-25', 'shoulders-26']
  },
  {
    id: 'shoulders-24',
    name: 'Seated Dumbbell Shoulder Press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Seated dumbbell shoulder press.',
    alternativeExercises: ['shoulders-25', 'shoulders-26', 'shoulders-27']
  },
  {
    id: 'shoulders-25',
    name: 'Seated lateral raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Seated lateral raises with dumbbells.',
    alternativeExercises: ['shoulders-8', 'shoulders-26', 'shoulders-28']
  },
  {
    id: 'shoulders-26',
    name: 'Seated rear delt fly',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Seated rear delt fly for posterior development.',
    alternativeExercises: ['shoulders-19', 'shoulders-27', 'shoulders-29']
  },
  {
    id: 'shoulders-27',
    name: 'Seated rear delt machine',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Rear Delt Machine'],
    notes: 'Seated rear delt machine for isolation.',
    alternativeExercises: ['shoulders-26', 'shoulders-28', 'shoulders-30']
  },
  {
    id: 'shoulders-28',
    name: 'Hammer Lateral Raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Lateral raises with hammer grip.',
    alternativeExercises: ['shoulders-8', 'shoulders-29', 'shoulders-31']
  },
  {
    id: 'shoulders-29',
    name: 'Front Raises with Low Cable Bar',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Cable Machine', 'Straight Bar'],
    notes: 'Front raises with low cable bar.',
    alternativeExercises: ['shoulders-7', 'shoulders-30', 'shoulders-32']
  },
  {
    id: 'shoulders-30',
    name: 'Supine Low Cable Front Raises with Rope',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Supine low cable front raises with rope.',
    alternativeExercises: ['shoulders-29', 'shoulders-31', 'shoulders-33']
  },
  {
    id: 'shoulders-31',
    name: 'Low Cable Front Raises with Rope on Incline Bench',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Cable Machine', 'Rope', 'Incline Bench'],
    notes: 'Low cable front raises with rope on incline bench.',
    alternativeExercises: ['shoulders-30', 'shoulders-32', 'shoulders-34']
  },
  {
    id: 'shoulders-32',
    name: 'Supine Low Cable Front Raises with Bar',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Cable Machine', 'Straight Bar'],
    notes: 'Supine low cable front raises with bar.',
    alternativeExercises: ['shoulders-31', 'shoulders-33', 'shoulders-35']
  },
  {
    id: 'shoulders-33',
    name: 'Single Arm Low Cable Front Raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm low cable front raises.',
    alternativeExercises: ['shoulders-32', 'shoulders-34', 'shoulders-36']
  },
  {
    id: 'shoulders-34',
    name: 'Front Plate Raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Weight Plate'],
    notes: 'Front raises with weight plate.',
    alternativeExercises: ['shoulders-35', 'shoulders-36', 'shoulders-37']
  },
  {
    id: 'shoulders-35',
    name: 'Single Arm Hammer Front Raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Single arm hammer front raises.',
    alternativeExercises: ['shoulders-34', 'shoulders-36', 'shoulders-38']
  },
  {
    id: 'shoulders-36',
    name: 'Single Arm Front Raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Single arm front raises with dumbbells.',
    alternativeExercises: ['shoulders-35', 'shoulders-37', 'shoulders-39']
  },
  {
    id: 'shoulders-37',
    name: 'Incline Bench Dumbbell Front Raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Front raises on incline bench.',
    alternativeExercises: ['shoulders-36', 'shoulders-38', 'shoulders-40']
  },
  {
    id: 'shoulders-38',
    name: 'Machine Lateral Raises with Extended Arms',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Lateral Raise Machine'],
    notes: 'Machine lateral raises with extended arms.',
    alternativeExercises: ['shoulders-39', 'shoulders-40', 'shoulders-41']
  },
  {
    id: 'shoulders-39',
    name: 'Machine Lateral Raises with Bent Arms',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Lateral Raise Machine'],
    notes: 'Machine lateral raises with bent arms.',
    alternativeExercises: ['shoulders-38', 'shoulders-40', 'shoulders-42']
  },
  {
    id: 'shoulders-40',
    name: 'Incline Bench Lateral Raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Lateral raises on incline bench.',
    alternativeExercises: ['shoulders-39', 'shoulders-41', 'shoulders-43']
  },
  {
    id: 'shoulders-41',
    name: 'Low Single Cable Rear Raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Low single cable rear raises.',
    alternativeExercises: ['shoulders-4', 'shoulders-42', 'shoulders-44']
  },
  {
    id: 'shoulders-42',
    name: 'Single Arm Rear Raises with Dumbbell',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Single arm rear raises with dumbbell.',
    alternativeExercises: ['shoulders-41', 'shoulders-43', 'shoulders-45']
  },
  {
    id: 'shoulders-43',
    name: 'Seated Arnold Press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Posterior Deltoids'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Seated Arnold press for complete shoulder development.',
    alternativeExercises: ['shoulders-21', 'shoulders-44', 'shoulders-46']
  },
  {
    id: 'shoulders-44',
    name: 'Neutral Grip Shoulder Press (Machine)',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Shoulder Press Machine'],
    notes: 'Neutral grip shoulder press on machine.',
    alternativeExercises: ['shoulders-2', 'shoulders-45', 'shoulders-47']
  },
  {
    id: 'shoulders-45',
    name: 'Shoulder Touch',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Shoulder touch exercise for stability.',
    alternativeExercises: ['shoulders-46', 'shoulders-47', 'shoulders-48']
  },
  {
    id: 'shoulders-46',
    name: 'Dumbbell Shrugs',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Trapezius'],
    equipment: ['Dumbbells'],
    notes: 'Dumbbell shrugs for trap development.',
    alternativeExercises: ['shoulders-47', 'shoulders-48', 'shoulders-49']
  },
  {
    id: 'shoulders-47',
    name: 'Barbell Shrugs',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Trapezius'],
    equipment: ['Barbell'],
    notes: 'Barbell shrugs for trap development.',
    alternativeExercises: ['shoulders-46', 'shoulders-48', 'shoulders-50']
  },
  {
    id: 'shoulders-48',
    name: 'Low Cable Shrugs',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Trapezius'],
    equipment: ['Cable Machine'],
    notes: 'Low cable shrugs for trap development.',
    alternativeExercises: ['shoulders-47', 'shoulders-49', 'shoulders-51']
  },
  {
    id: 'shoulders-49',
    name: 'High Cable Rear Delt Flyes',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'High cable rear delt flyes.',
    alternativeExercises: ['shoulders-4', 'shoulders-50', 'shoulders-52']
  },
  {
    id: 'shoulders-50',
    name: 'Overhead High Cable Rear Delt Flyes',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Overhead high cable rear delt flyes.',
    alternativeExercises: ['shoulders-49', 'shoulders-51', 'shoulders-53']
  },
  {
    id: 'shoulders-51',
    name: 'Standing Low Cable Lateral Raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Standing low cable lateral raises.',
    alternativeExercises: ['shoulders-3', 'shoulders-52', 'shoulders-54']
  },
  {
    id: 'shoulders-52',
    name: 'Standing Low Cable Rear Delt Flyes',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Standing low cable rear delt flyes.',
    alternativeExercises: ['shoulders-51', 'shoulders-53', 'shoulders-55']
  },
  {
    id: 'shoulders-53',
    name: 'Single Arm Low Cable Rear Delt Fly',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm low cable rear delt fly.',
    alternativeExercises: ['shoulders-4', 'shoulders-54', 'shoulders-56']
  },
  {
    id: 'shoulders-54',
    name: 'Single-Arm Cable Front Raise',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Single arm cable front raise.',
    alternativeExercises: ['shoulders-33', 'shoulders-55', 'shoulders-57']
  },
  {
    id: 'shoulders-55',
    name: 'Barbell Front Raise on Smith Machine',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Smith Machine'],
    notes: 'Barbell front raise on Smith machine.',
    alternativeExercises: ['shoulders-15', 'shoulders-56', 'shoulders-58']
  },
  {
    id: 'shoulders-56',
    name: 'Wide Grip Dumbbell Upright Rows',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Medial Deltoids', 'Trapezius'],
    equipment: ['Dumbbells'],
    notes: 'Wide grip dumbbell upright rows.',
    alternativeExercises: ['shoulders-18', 'shoulders-57', 'shoulders-59']
  },
  {
    id: 'shoulders-57',
    name: 'Single-arm Cable External Shoulder Rotations',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids', 'Rotator Cuff'],
    equipment: ['Cable Machine'],
    notes: 'Single arm cable external shoulder rotations.',
    alternativeExercises: ['shoulders-58', 'shoulders-59', 'shoulders-60']
  }
];

// ARMS EXERCISES (60+ exercises)
const armsExercises: ExerciseData[] = [
  {
    id: 'arms-1',
    name: 'Biceps cable curl',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Basic biceps cable curl for arm development.',
    alternativeExercises: ['arms-2', 'arms-3', 'arms-4']
  },
  {
    id: 'arms-2',
    name: 'Cable Tricep pushdown',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Cable tricep pushdown for tricep development.',
    alternativeExercises: ['arms-1', 'arms-3', 'arms-5']
  },
  {
    id: 'arms-3',
    name: 'Reverse grip cable pushdown',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Reverse grip cable pushdown for tricep variation.',
    alternativeExercises: ['arms-2', 'arms-4', 'arms-6']
  },
  {
    id: 'arms-4',
    name: 'High Cable french press',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'High cable French press for tricep development.',
    alternativeExercises: ['arms-3', 'arms-5', 'arms-7']
  },
  {
    id: 'arms-5',
    name: 'Cable rope pushdown',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Cable rope pushdown for tricep isolation.',
    alternativeExercises: ['arms-2', 'arms-6', 'arms-8']
  },
  {
    id: 'arms-6',
    name: 'High Rope Cable French press',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'High rope cable French press.',
    alternativeExercises: ['arms-4', 'arms-7', 'arms-9']
  },
  {
    id: 'arms-7',
    name: 'Low Cable rope curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Low cable rope curl for bicep development.',
    alternativeExercises: ['arms-8', 'arms-9', 'arms-10']
  },
  {
    id: 'arms-8',
    name: 'Low Cable Kick Back',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Low cable kick back for tricep isolation.',
    alternativeExercises: ['arms-7', 'arms-9', 'arms-11']
  },
  {
    id: 'arms-9',
    name: 'Reverse Grip Single handle tricep pushdown',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Reverse grip single handle tricep pushdown.',
    alternativeExercises: ['arms-3', 'arms-10', 'arms-12']
  },
  {
    id: 'arms-10',
    name: 'Single handle tricep pushdown',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Single handle tricep pushdown for unilateral development.',
    alternativeExercises: ['arms-9', 'arms-11', 'arms-13']
  },
  {
    id: 'arms-11',
    name: 'Curl single low cable',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Single arm low cable curl.',
    alternativeExercises: ['arms-1', 'arms-12', 'arms-14']
  },
  {
    id: 'arms-12',
    name: 'Barbell preacher curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Barbell', 'Preacher Bench'],
    notes: 'Barbell preacher curl for bicep isolation.',
    alternativeExercises: ['arms-13', 'arms-14', 'arms-15']
  },
  {
    id: 'arms-13',
    name: 'Dumbbell preacher curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells', 'Preacher Bench'],
    notes: 'Dumbbell preacher curl for bicep development.',
    alternativeExercises: ['arms-12', 'arms-14', 'arms-16']
  },
  {
    id: 'arms-14',
    name: 'Dumbbell twist curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells'],
    notes: 'Dumbbell twist curl for bicep development.',
    alternativeExercises: ['arms-15', 'arms-16', 'arms-17']
  },
  {
    id: 'arms-15',
    name: 'Standing dumbbell curl hammer grip',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps', 'Brachialis'],
    equipment: ['Dumbbells'],
    notes: 'Standing hammer grip dumbbell curls.',
    alternativeExercises: ['arms-14', 'arms-16', 'arms-18']
  },
  {
    id: 'arms-16',
    name: 'Alternating Dumbbell twisting curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells'],
    notes: 'Alternating dumbbell twisting curls.',
    alternativeExercises: ['arms-14', 'arms-17', 'arms-19']
  },
  {
    id: 'arms-17',
    name: 'Alternating Dumbbell curls neutral grip',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps', 'Brachialis'],
    equipment: ['Dumbbells'],
    notes: 'Alternating dumbbell curls with neutral grip.',
    alternativeExercises: ['arms-15', 'arms-18', 'arms-20']
  },
  {
    id: 'arms-18',
    name: 'Single arm twisted dumbbell curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells'],
    notes: 'Single arm twisted dumbbell curl.',
    alternativeExercises: ['arms-14', 'arms-19', 'arms-21']
  },
  {
    id: 'arms-19',
    name: 'Wide grip barbell curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Barbell'],
    notes: 'Wide grip barbell curl for bicep development.',
    alternativeExercises: ['arms-20', 'arms-21', 'arms-22']
  },
  {
    id: 'arms-20',
    name: 'Seated incline dumbbell curls',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Seated incline dumbbell curls for bicep stretch.',
    alternativeExercises: ['arms-19', 'arms-21', 'arms-23']
  },
  {
    id: 'arms-21',
    name: 'Hammer grip Dumbbell French Press',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Dumbbells'],
    notes: 'Hammer grip dumbbell French press.',
    alternativeExercises: ['arms-22', 'arms-23', 'arms-24']
  },
  {
    id: 'arms-22',
    name: 'Dumbbell French Press',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Dumbbells'],
    notes: 'Dumbbell French press for tricep development.',
    alternativeExercises: ['arms-21', 'arms-23', 'arms-25']
  },
  {
    id: 'arms-23',
    name: 'Overhead dumbbell tricep extension',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Dumbbells'],
    notes: 'Overhead dumbbell tricep extension.',
    alternativeExercises: ['arms-22', 'arms-24', 'arms-26']
  },
  {
    id: 'arms-24',
    name: 'Single arm dumbbell tricep extension',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Dumbbells'],
    notes: 'Single arm dumbbell tricep extension.',
    alternativeExercises: ['arms-23', 'arms-25', 'arms-27']
  },
  {
    id: 'arms-25',
    name: 'Flat bench French Press with barbell',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Flat bench French press with barbell.',
    alternativeExercises: ['arms-26', 'arms-27', 'arms-28']
  },
  {
    id: 'arms-26',
    name: 'Close Grip Barbell Bench Press',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps', 'Pectorals'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Close grip barbell bench press for triceps.',
    alternativeExercises: ['arms-25', 'arms-27', 'arms-29']
  },
  {
    id: 'arms-27',
    name: 'Single arm dumbbell kickback',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Single arm dumbbell kickback for tricep isolation.',
    alternativeExercises: ['arms-8', 'arms-28', 'arms-30']
  },
  {
    id: 'arms-28',
    name: 'High Cable Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine'],
    notes: 'High cable curl for bicep development.',
    alternativeExercises: ['arms-1', 'arms-29', 'arms-31']
  },
  {
    id: 'arms-29',
    name: 'Bicep Curl on Machine',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps'],
    equipment: ['Bicep Curl Machine'],
    notes: 'Machine bicep curl for isolation.',
    alternativeExercises: ['arms-30', 'arms-31', 'arms-32']
  },
  {
    id: 'arms-30',
    name: 'EZ Bar Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['EZ Bar'],
    notes: 'EZ bar curl for bicep development.',
    alternativeExercises: ['arms-31', 'arms-32', 'arms-33']
  },
  {
    id: 'arms-31',
    name: 'Close-Grip EZ Bar Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['EZ Bar'],
    notes: 'Close grip EZ bar curl.',
    alternativeExercises: ['arms-30', 'arms-32', 'arms-34']
  },
  {
    id: 'arms-32',
    name: 'Reverse-Grip EZ Bar Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps', 'Forearms'],
    equipment: ['EZ Bar'],
    notes: 'Reverse grip EZ bar curl for forearms.',
    alternativeExercises: ['arms-31', 'arms-33', 'arms-35']
  },
  {
    id: 'arms-33',
    name: 'Straight Barbell Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Barbell'],
    notes: 'Straight barbell curl for bicep development.',
    alternativeExercises: ['arms-19', 'arms-34', 'arms-36']
  },
  {
    id: 'arms-34',
    name: 'Alternating Incline Bench Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Alternating incline bench curl.',
    alternativeExercises: ['arms-20', 'arms-35', 'arms-37']
  },
  {
    id: 'arms-35',
    name: 'Single-Arm Concentration Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Single arm concentration curl for bicep isolation.',
    alternativeExercises: ['arms-36', 'arms-37', 'arms-38']
  },
  {
    id: 'arms-36',
    name: 'Single-Arm Incline Hammer Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps', 'Brachialis'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Single arm incline hammer curl.',
    alternativeExercises: ['arms-15', 'arms-37', 'arms-39']
  },
  {
    id: 'arms-37',
    name: 'Single-Arm Incline Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Single arm incline curl for bicep development.',
    alternativeExercises: ['arms-20', 'arms-38', 'arms-40']
  },
  {
    id: 'arms-38',
    name: 'Single Arm Rope Push Down',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Single arm rope push down for tricep isolation.',
    alternativeExercises: ['arms-5', 'arms-39', 'arms-41']
  },
  {
    id: 'arms-39',
    name: 'Single Arm Rope Push Down with Shoulder Internal Rotation',
    category: 'arms',
    difficulty: 'advanced',
    muscleGroup: ['Triceps', 'Posterior Deltoids'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Single arm rope push down with shoulder internal rotation.',
    alternativeExercises: ['arms-38', 'arms-40', 'arms-42']
  },
  {
    id: 'arms-40',
    name: 'Rope Push Down on Incline Bench',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Rope', 'Incline Bench'],
    notes: 'Rope push down on incline bench.',
    alternativeExercises: ['arms-5', 'arms-41', 'arms-43']
  },
  {
    id: 'arms-41',
    name: 'Dumbbell Kick Back',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Dumbbells'],
    notes: 'Dumbbell kick back for tricep isolation.',
    alternativeExercises: ['arms-27', 'arms-42', 'arms-44']
  },
  {
    id: 'arms-42',
    name: 'Seated Pulley Curl with Bar at Shoulder Flexion',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine', 'Straight Bar'],
    notes: 'Seated pulley curl with bar at shoulder flexion.',
    alternativeExercises: ['arms-28', 'arms-43', 'arms-45']
  },
  {
    id: 'arms-43',
    name: 'Cable High Pulley Shoulder Flexed Curl with Bar',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine', 'Straight Bar'],
    notes: 'High pulley shoulder flexed curl with bar.',
    alternativeExercises: ['arms-42', 'arms-44', 'arms-46']
  },
  {
    id: 'arms-44',
    name: 'Supine Pulley Curl with Bar',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine', 'Straight Bar'],
    notes: 'Supine pulley curl with bar.',
    alternativeExercises: ['arms-43', 'arms-45', 'arms-47']
  },
  {
    id: 'arms-45',
    name: 'Supine Cable Curl with Rope Attachment',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Supine cable curl with rope attachment.',
    alternativeExercises: ['arms-7', 'arms-46', 'arms-48']
  },
  {
    id: 'arms-46',
    name: 'Single Dumbbell Tricep Extensions Behind the Head Seated',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Single dumbbell tricep extensions behind the head seated.',
    alternativeExercises: ['arms-24', 'arms-47', 'arms-49']
  },
  {
    id: 'arms-47',
    name: 'Single Arm Tricep Pushdown at High Cable',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Single arm tricep pushdown at high cable.',
    alternativeExercises: ['arms-10', 'arms-48', 'arms-50']
  },
  {
    id: 'arms-48',
    name: 'Single Arm Tricep Extension at High Cable with Rope',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Rope'],
    notes: 'Single arm tricep extension at high cable with rope.',
    alternativeExercises: ['arms-38', 'arms-49', 'arms-51']
  },
  {
    id: 'arms-49',
    name: 'Overhead Tricep Extensions with EZ Bar',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['EZ Bar'],
    notes: 'Overhead tricep extensions with EZ bar.',
    alternativeExercises: ['arms-50', 'arms-51', 'arms-52']
  },
  {
    id: 'arms-50',
    name: 'Dumbbell Tricep Extensions Behind the Head',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Dumbbells'],
    notes: 'Dumbbell tricep extensions behind the head.',
    alternativeExercises: ['arms-23', 'arms-51', 'arms-53']
  },
  {
    id: 'arms-51',
    name: 'Single Arm Tricep Extensions at Low Cable',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Single arm tricep extensions at low cable.',
    alternativeExercises: ['arms-8', 'arms-52', 'arms-54']
  },
  {
    id: 'arms-52',
    name: 'Overhead Tricep Extensions at Low Cable',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Overhead tricep extensions at low cable.',
    alternativeExercises: ['arms-51', 'arms-53', 'arms-55']
  },
  {
    id: 'arms-53',
    name: 'Tricep Rope Extensions Behind the Head Seated',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine', 'Rope', 'Bench'],
    notes: 'Tricep rope extensions behind the head seated.',
    alternativeExercises: ['arms-6', 'arms-54', 'arms-56']
  },
  {
    id: 'arms-54',
    name: 'Alternating Hammer Curl with Shoulder Internal Rotation',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps', 'Brachialis'],
    equipment: ['Dumbbells'],
    notes: 'Alternating hammer curl with shoulder internal rotation.',
    alternativeExercises: ['arms-15', 'arms-55', 'arms-57']
  },
  {
    id: 'arms-55',
    name: 'Single Arm Hammer Curl with Shoulder Internal Rotation',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps', 'Brachialis'],
    equipment: ['Dumbbells'],
    notes: 'Single arm hammer curl with shoulder internal rotation.',
    alternativeExercises: ['arms-54', 'arms-56', 'arms-58']
  },
  {
    id: 'arms-56',
    name: 'Single Arm Hammer Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps', 'Brachialis'],
    equipment: ['Dumbbells'],
    notes: 'Single arm hammer curl for bicep development.',
    alternativeExercises: ['arms-15', 'arms-57', 'arms-59']
  },
  {
    id: 'arms-57',
    name: 'Hammer Curl with Shoulder Internal Rotation',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps', 'Brachialis'],
    equipment: ['Dumbbells'],
    notes: 'Hammer curl with shoulder internal rotation.',
    alternativeExercises: ['arms-54', 'arms-58', 'arms-60']
  },
  {
    id: 'arms-58',
    name: 'Low Cable Bicep Curl with Handles',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Low cable bicep curl with handles.',
    alternativeExercises: ['arms-11', 'arms-59', 'arms-61']
  },
  {
    id: 'arms-59',
    name: 'Low Cable Bicep Curl with Barbell, Seated on Incline Bench',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine', 'Barbell', 'Incline Bench'],
    notes: 'Low cable bicep curl with barbell, seated on incline bench.',
    alternativeExercises: ['arms-58', 'arms-60', 'arms-62']
  },
  {
    id: 'arms-60',
    name: 'Low Cable Bicep Curl with Rope, Seated on Incline Bench',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine', 'Rope', 'Incline Bench'],
    notes: 'Low cable bicep curl with rope, seated on incline bench.',
    alternativeExercises: ['arms-7', 'arms-61', 'arms-63']
  },
  {
    id: 'arms-61',
    name: 'Single-Arm High Cable Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Single arm high cable curl.',
    alternativeExercises: ['arms-28', 'arms-62', 'arms-64']
  },
  {
    id: 'arms-62',
    name: 'Incline Dumbbell Spider Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Incline dumbbell spider curl.',
    alternativeExercises: ['arms-13', 'arms-63', 'arms-65']
  },
  {
    id: 'arms-63',
    name: 'Alternating Incline Dumbbell Spider Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Alternating incline dumbbell spider curl.',
    alternativeExercises: ['arms-62', 'arms-64', 'arms-66']
  },
  {
    id: 'arms-64',
    name: 'Machine Neutral Grip Scott Bench Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Preacher Curl Machine'],
    notes: 'Machine neutral grip Scott bench curl.',
    alternativeExercises: ['arms-12', 'arms-65', 'arms-67']
  }
];

// CORE EXERCISES (40+ exercises)
const coreExercises: ExerciseData[] = [
  {
    id: 'core-1',
    name: 'Kneeling cable crunch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Cable Machine'],
    notes: 'Kneeling cable crunch for core development.',
    alternativeExercises: ['core-2', 'core-3', 'core-4']
  },
  {
    id: 'core-2',
    name: 'Fit Ball Crunch',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Exercise Ball'],
    notes: 'Fit ball crunch for core stability.',
    alternativeExercises: ['core-1', 'core-3', 'core-5']
  },
  {
    id: 'core-3',
    name: 'Crunch',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Basic crunch for abdominal development.',
    alternativeExercises: ['core-2', 'core-4', 'core-6']
  },
  {
    id: 'core-4',
    name: 'Reverse Crunch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Reverse crunch for lower abdominals.',
    alternativeExercises: ['core-3', 'core-5', 'core-7']
  },
  {
    id: 'core-5',
    name: 'V up',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'V up for full abdominal engagement.',
    alternativeExercises: ['core-4', 'core-6', 'core-8']
  },
  {
    id: 'core-6',
    name: 'Total Crunch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Total crunch for complete abdominal workout.',
    alternativeExercises: ['core-5', 'core-7', 'core-9']
  },
  {
    id: 'core-7',
    name: 'Toe Touch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Toe touch for upper abdominal focus.',
    alternativeExercises: ['core-6', 'core-8', 'core-10']
  },
  {
    id: 'core-8',
    name: 'Cross leg oblique crunch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques'],
    equipment: ['Bodyweight'],
    notes: 'Cross leg oblique crunch for side abdominals.',
    alternativeExercises: ['core-9', 'core-10', 'core-11']
  },
  {
    id: 'core-9',
    name: 'Side Lying Oblique Crunch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques'],
    equipment: ['Bodyweight'],
    notes: 'Side lying oblique crunch for lateral core.',
    alternativeExercises: ['core-8', 'core-10', 'core-12']
  },
  {
    id: 'core-10',
    name: 'Plank',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis', 'Transverse Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Plank for core stability and strength.',
    alternativeExercises: ['core-11', 'core-12', 'core-13']
  },
  {
    id: 'core-11',
    name: 'Hanging Leg Raise',
    category: 'core',
    difficulty: 'advanced',
    muscleGroup: ['Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Pull-up Bar'],
    notes: 'Hanging leg raise for advanced core development.',
    alternativeExercises: ['core-12', 'core-13', 'core-14']
  },
  {
    id: 'core-12',
    name: 'Parallel bar leg raises',
    category: 'core',
    difficulty: 'advanced',
    muscleGroup: ['Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Parallel Bars'],
    notes: 'Parallel bar leg raises for core strength.',
    alternativeExercises: ['core-11', 'core-13', 'core-15']
  },
  {
    id: 'core-13',
    name: 'Supine Lateral Toe Touch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques'],
    equipment: ['Bodyweight'],
    notes: 'Supine lateral toe touch for oblique development.',
    alternativeExercises: ['core-8', 'core-14', 'core-16']
  },
  {
    id: 'core-14',
    name: 'Clam Shell Side Plank',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Clam shell side plank for lateral stability.',
    alternativeExercises: ['core-13', 'core-15', 'core-17']
  },
  {
    id: 'core-15',
    name: 'Clam Shell with Disk',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques', 'Glutes'],
    equipment: ['Weight Plate'],
    notes: 'Clam shell with disk for added resistance.',
    alternativeExercises: ['core-14', 'core-16', 'core-18']
  },
  {
    id: 'core-16',
    name: 'Alternating Side Crunch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques'],
    equipment: ['Bodyweight'],
    notes: 'Alternating side crunch for oblique development.',
    alternativeExercises: ['core-8', 'core-17', 'core-19']
  },
  {
    id: 'core-17',
    name: 'Crunch with Hands Forward',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Crunch with hands forward for core engagement.',
    alternativeExercises: ['core-3', 'core-18', 'core-20']
  },
  {
    id: 'core-18',
    name: 'Single-Side Crunch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques'],
    equipment: ['Bodyweight'],
    notes: 'Single side crunch for unilateral core work.',
    alternativeExercises: ['core-16', 'core-19', 'core-21']
  },
  {
    id: 'core-19',
    name: 'Raised Leg Crunch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Raised leg crunch for increased difficulty.',
    alternativeExercises: ['core-3', 'core-20', 'core-22']
  },
  {
    id: 'core-20',
    name: 'Dead Bug',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis', 'Transverse Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Dead bug for core stability and control.',
    alternativeExercises: ['core-10', 'core-21', 'core-23']
  },
  {
    id: 'core-21',
    name: 'Mountain Climber',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Mountain climber for dynamic core work.',
    alternativeExercises: ['core-22', 'core-23', 'core-24']
  },
  {
    id: 'core-22',
    name: 'Floor Leg Raises',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Floor leg raises for lower abdominal development.',
    alternativeExercises: ['core-4', 'core-23', 'core-25']
  },
  {
    id: 'core-23',
    name: 'Knee Raises on the Pull-Up Bar',
    category: 'core',
    difficulty: 'advanced',
    muscleGroup: ['Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Pull-up Bar'],
    notes: 'Knee raises on pull-up bar for core strength.',
    alternativeExercises: ['core-11', 'core-24', 'core-26']
  }
];

// CARDIO EXERCISES (20+ exercises)
const cardioExercises: ExerciseData[] = [
  {
    id: 'cardio-1',
    name: 'TreadMill',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Calves'],
    equipment: ['Treadmill'],
    notes: 'Treadmill running for cardiovascular fitness.',
    alternativeExercises: ['cardio-2', 'cardio-3', 'cardio-4']
  },
  {
    id: 'cardio-2',
    name: 'Stationary bike',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Calves'],
    equipment: ['Stationary Bike'],
    notes: 'Stationary bike for low-impact cardio.',
    alternativeExercises: ['cardio-1', 'cardio-3', 'cardio-5']
  },
  {
    id: 'cardio-3',
    name: 'Rowing machine',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Full Body'],
    equipment: ['Rowing Machine'],
    notes: 'Rowing machine for full-body cardio workout.',
    alternativeExercises: ['cardio-2', 'cardio-4', 'cardio-6']
  },
  {
    id: 'cardio-4',
    name: 'Elliptical',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Full Body'],
    equipment: ['Elliptical Machine'],
    notes: 'Elliptical machine for low-impact full-body cardio.',
    alternativeExercises: ['cardio-1', 'cardio-5', 'cardio-7']
  },
  {
    id: 'cardio-5',
    name: 'Jumping rope',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Calves', 'Shoulders'],
    equipment: ['Jump Rope'],
    notes: 'Jumping rope for coordination and cardio.',
    alternativeExercises: ['cardio-6', 'cardio-7', 'cardio-8']
  },
  {
    id: 'cardio-6',
    name: 'Running',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Calves'],
    equipment: ['None'],
    notes: 'Running for cardiovascular endurance.',
    alternativeExercises: ['cardio-1', 'cardio-7', 'cardio-9']
  },
  {
    id: 'cardio-7',
    name: 'Climbmill',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Calves'],
    equipment: ['Stair Climber'],
    notes: 'Stair climber for lower body cardio.',
    alternativeExercises: ['cardio-4', 'cardio-8', 'cardio-10']
  },
  {
    id: 'cardio-8',
    name: 'Warm up',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Full Body'],
    equipment: ['Bodyweight'],
    notes: 'General warm-up for exercise preparation.',
    alternativeExercises: ['cardio-1', 'cardio-9', 'cardio-11']
  }
];

// FUNCTIONAL EXERCISES (30+ exercises)
const functionalExercises: ExerciseData[] = [
  {
    id: 'functional-1',
    name: 'Kettlebell Swing',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Shoulders'],
    equipment: ['Kettlebell'],
    notes: 'Kettlebell swing for power and conditioning.',
    alternativeExercises: ['functional-2', 'functional-3', 'functional-4']
  },
  {
    id: 'functional-2',
    name: 'Single-Leg Step Up on Smith Machine',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine', 'Step'],
    notes: 'Single leg step up on Smith machine.',
    alternativeExercises: ['functional-1', 'functional-3', 'functional-5']
  },
  {
    id: 'functional-3',
    name: 'Step Up on Smith Machine',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine', 'Step'],
    notes: 'Step up on Smith machine for leg development.',
    alternativeExercises: ['functional-2', 'functional-4', 'functional-6']
  },
  {
    id: 'functional-4',
    name: 'Standing Steering Wheel with Plate',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Shoulders', 'Core'],
    equipment: ['Weight Plate'],
    notes: 'Standing steering wheel with plate for core and shoulders.',
    alternativeExercises: ['functional-5', 'functional-6', 'functional-7']
  },
  {
    id: 'functional-5',
    name: 'Standing Crab Walk with Resistance Band',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hip Abductors'],
    equipment: ['Resistance Band'],
    notes: 'Standing crab walk with resistance band.',
    alternativeExercises: ['functional-6', 'functional-7', 'functional-8']
  },
  {
    id: 'functional-6',
    name: 'Alternating Squat Crab Walks',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hip Abductors', 'Quadriceps'],
    equipment: ['Resistance Band'],
    notes: 'Alternating squat crab walks for functional movement.',
    alternativeExercises: ['functional-5', 'functional-7', 'functional-9']
  },
  {
    id: 'functional-7',
    name: 'Squat Crab Walks',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hip Abductors', 'Quadriceps'],
    equipment: ['Resistance Band'],
    notes: 'Squat crab walks for lateral movement.',
    alternativeExercises: ['functional-6', 'functional-8', 'functional-10']
  },
  {
    id: 'functional-8',
    name: 'Glute Lateral Raises with Resistance Band',
    category: 'functional',
    difficulty: 'beginner',
    muscleGroup: ['Glutes', 'Hip Abductors'],
    equipment: ['Resistance Band'],
    notes: 'Glute lateral raises with resistance band.',
    alternativeExercises: ['functional-9', 'functional-10', 'functional-11']
  },
  {
    id: 'functional-9',
    name: 'Glute Lateral Raises with Disc',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hip Abductors'],
    equipment: ['Weight Plate'],
    notes: 'Glute lateral raises with disc for added resistance.',
    alternativeExercises: ['functional-8', 'functional-10', 'functional-12']
  },
  {
    id: 'functional-10',
    name: 'Lateral Leg Raises on One Side with Disc',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Weight Plate'],
    notes: 'Lateral leg raises on one side with disc.',
    alternativeExercises: ['functional-9', 'functional-11', 'functional-13']
  },
  {
    id: 'functional-11',
    name: 'Side Leg Raises',
    category: 'functional',
    difficulty: 'beginner',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Side leg raises for hip abductor strength.',
    alternativeExercises: ['functional-10', 'functional-12', 'functional-14']
  },
  {
    id: 'functional-12',
    name: 'Low Cable Rear Leg Raises with Cross-Behind',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Cable Machine'],
    notes: 'Low cable rear leg raises with cross-behind movement.',
    alternativeExercises: ['functional-13', 'functional-14', 'functional-15']
  },
  {
    id: 'functional-13',
    name: 'Low Cable Side Leg Raises',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Cable Machine'],
    notes: 'Low cable side leg raises for hip abductors.',
    alternativeExercises: ['functional-12', 'functional-14', 'functional-16']
  },
  {
    id: 'functional-14',
    name: 'Low Cable Side Leg Raises with Cross-Behind',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Hip Abductors', 'Glutes'],
    equipment: ['Cable Machine'],
    notes: 'Low cable side leg raises with cross-behind movement.',
    alternativeExercises: ['functional-13', 'functional-15', 'functional-17']
  },
  {
    id: 'functional-15',
    name: 'Quadruped Leg Raises',
    category: 'functional',
    difficulty: 'beginner',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Quadruped leg raises for glute activation.',
    alternativeExercises: ['functional-16', 'functional-17', 'functional-18']
  },
  {
    id: 'functional-16',
    name: 'Quadruped Leg Raises with Dumbbell',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Dumbbells'],
    notes: 'Quadruped leg raises with dumbbell for added resistance.',
    alternativeExercises: ['functional-15', 'functional-17', 'functional-19']
  },
  {
    id: 'functional-17',
    name: 'Straight Leg Quadruped Leg Raises',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Straight leg quadruped leg raises for glute isolation.',
    alternativeExercises: ['functional-16', 'functional-18', 'functional-20']
  },
  {
    id: 'functional-18',
    name: 'Cable Kickbacks on Bench with Support',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Cable Machine', 'Bench'],
    notes: 'Cable kickbacks on bench with support.',
    alternativeExercises: ['functional-19', 'functional-20', 'functional-21']
  },
  {
    id: 'functional-19',
    name: 'Band Frogs Kicks',
    category: 'functional',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hip Flexors'],
    equipment: ['Resistance Band'],
    notes: 'Band frog kicks for glute activation.',
    alternativeExercises: ['functional-20', 'functional-21', 'functional-22']
  }
];

// FLEXIBILITY EXERCISES (20+ exercises)
const flexibilityExercises: ExerciseData[] = [
  {
    id: 'flexibility-1',
    name: 'Hamstring Stretch',
    category: 'flexibility',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings'],
    equipment: ['None'],
    notes: 'Basic hamstring stretch for flexibility.',
    alternativeExercises: ['flexibility-2', 'flexibility-3', 'flexibility-4']
  },
  {
    id: 'flexibility-2',
    name: 'Quadriceps Stretch',
    category: 'flexibility',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps'],
    equipment: ['None'],
    notes: 'Quadriceps stretch for front thigh flexibility.',
    alternativeExercises: ['flexibility-1', 'flexibility-3', 'flexibility-5']
  },
  {
    id: 'flexibility-3',
    name: 'Shoulder Stretch',
    category: 'flexibility',
    difficulty: 'beginner',
    muscleGroup: ['Shoulders'],
    equipment: ['None'],
    notes: 'Shoulder stretch for upper body flexibility.',
    alternativeExercises: ['flexibility-2', 'flexibility-4', 'flexibility-6']
  },
  {
    id: 'flexibility-4',
    name: 'Tricep Stretch',
    category: 'flexibility',
    difficulty: 'beginner',
    muscleGroup: ['Triceps'],
    equipment: ['None'],
    notes: 'Tricep stretch for arm flexibility.',
    alternativeExercises: ['flexibility-3', 'flexibility-5', 'flexibility-7']
  },
  {
    id: 'flexibility-5',
    name: 'Calf Stretch',
    category: 'flexibility',
    difficulty: 'beginner',
    muscleGroup: ['Calves'],
    equipment: ['None'],
    notes: 'Calf stretch for lower leg flexibility.',
    alternativeExercises: ['flexibility-4', 'flexibility-6', 'flexibility-8']
  }
];

// PLYOMETRIC EXERCISES (20+ exercises)
const plyometricExercises: ExerciseData[] = [
  {
    id: 'plyometric-1',
    name: 'Jump Squat',
    category: 'plyometric',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Jump squat for explosive power development.',
    alternativeExercises: ['plyometric-2', 'plyometric-3', 'plyometric-4']
  },
  {
    id: 'plyometric-2',
    name: 'Jumping lunge',
    category: 'plyometric',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Jumping lunge for explosive leg power.',
    alternativeExercises: ['plyometric-1', 'plyometric-3', 'plyometric-5']
  },
  {
    id: 'plyometric-3',
    name: 'Box Jumps',
    category: 'plyometric',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Calves'],
    equipment: ['Box'],
    notes: 'Box jumps for explosive power.',
    alternativeExercises: ['plyometric-2', 'plyometric-4', 'plyometric-6']
  },
  {
    id: 'plyometric-4',
    name: 'Plyometric Push-ups',
    category: 'plyometric',
    difficulty: 'advanced',
    muscleGroup: ['Pectorals', 'Triceps', 'Shoulders'],
    equipment: ['Bodyweight'],
    notes: 'Plyometric push-ups for explosive upper body power.',
    alternativeExercises: ['plyometric-3', 'plyometric-5', 'plyometric-7']
  },
  {
    id: 'plyometric-5',
    name: 'Lunge Jumps',
    category: 'plyometric',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Lunge jumps for explosive leg power.',
    alternativeExercises: ['plyometric-2', 'plyometric-4', 'plyometric-8']
  },
  {
    id: 'plyometric-6',
    name: 'Tuck Jumps',
    category: 'plyometric',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Calves'],
    equipment: ['Bodyweight'],
    notes: 'Tuck jumps for explosive power and coordination.',
    alternativeExercises: ['plyometric-1', 'plyometric-5', 'plyometric-9']
  }
];

export type { ExerciseData };

export const completeExerciseDatabase: ExerciseData[] = [
  ...legsExercises,
  ...chestExercises,
  ...backExercises,
  ...shouldersExercises,
  ...armsExercises,
  ...coreExercises,
  ...cardioExercises,
  ...functionalExercises,
  ...flexibilityExercises,
  ...plyometricExercises,
];

// Legacy export for backward compatibility
export const exerciseDatabase = completeExerciseDatabase;

export const getExerciseById = (id: string): ExerciseData | undefined => {
  return completeExerciseDatabase.find(exercise => exercise.id === id);
};

// Log the database info
console.log('Complete Exercise Database loaded with', completeExerciseDatabase.length, 'exercises');
console.log('Breakdown: Legs(' + legsExercises.length + '), Chest(' + chestExercises.length + '), Back(' + backExercises.length + '), Shoulders(' + shouldersExercises.length + '), Arms(' + armsExercises.length + '), Core(' + coreExercises.length + '), Cardio(' + cardioExercises.length + '), Functional(' + functionalExercises.length + '), Flexibility(' + flexibilityExercises.length + '), Plyometric(' + plyometricExercises.length + ')');
console.log('Sample exercise with alternatives:', completeExerciseDatabase[0].name, 'has', completeExerciseDatabase[0].alternativeExercises?.length || 0, 'alternatives');
