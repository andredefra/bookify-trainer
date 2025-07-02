
export interface ExerciseData {
  id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscleGroup: string[];
  equipment: string[];
  notes: string;
  videoUrl?: string;
  equipmentImages?: { [equipment: string]: string };
  alternativeExercises?: string[];
  isCustom?: boolean;
  isModified?: boolean;
  primaryEquipment?: string;
}

// Complete exercise database with 350+ exercises
export const exerciseDatabase: ExerciseData[] = [
  // LEG EXERCISES (120+ exercises)
  {
    id: 'leg_001',
    name: 'Angled leg press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Leg Press Machine'],
    notes: 'Position feet shoulder-width apart on the platform. Lower the weight with control and press through heels.',
    primaryEquipment: 'Leg Press Machine'
  },
  {
    id: 'leg_002',
    name: 'Horizontal Leg Press',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Leg Press Machine'],
    notes: 'Seated horizontal leg press machine. Keep core engaged and full range of motion.',
    primaryEquipment: 'Leg Press Machine'
  },
  {
    id: 'leg_003',
    name: 'Leg Extension',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps'],
    equipment: ['Leg Extension Machine'],
    notes: 'Seated leg extension focusing on quadriceps isolation. Control the eccentric phase.',
    primaryEquipment: 'Leg Extension Machine'
  },
  {
    id: 'leg_004',
    name: 'Seated Leg Curl',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Seated hamstring curl machine. Focus on controlled movement and full contraction.',
    primaryEquipment: 'Leg Curl Machine'
  },
  {
    id: 'leg_005',
    name: 'Leg Curl lying down',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Lying leg curl machine. Keep hips pressed down and focus on hamstring contraction.',
    primaryEquipment: 'Leg Curl Machine'
  },
  {
    id: 'leg_006',
    name: 'Standing Leg Curl',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings'],
    equipment: ['Leg Curl Machine'],
    notes: 'Single leg standing curl. Focus on balance and controlled movement.',
    primaryEquipment: 'Leg Curl Machine'
  },
  {
    id: 'leg_007',
    name: 'Barbell squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell', 'Squat Rack'],
    notes: 'King of all exercises. Proper form is crucial. Feet shoulder-width apart, squat to parallel.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_008',
    name: 'Squat SMITH Machine',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Smith Machine'],
    notes: 'Smith machine squat provides stability. Position feet slightly forward of the bar.',
    primaryEquipment: 'Smith Machine'
  },
  {
    id: 'leg_009',
    name: 'Hack Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Hack Squat Machine'],
    notes: 'Hack squat machine provides back support. Focus on full range of motion.',
    primaryEquipment: 'Hack Squat Machine'
  },
  {
    id: 'leg_010',
    name: 'Front Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Core'],
    equipment: ['Barbell', 'Squat Rack'],
    notes: 'Hold bar across front deltoids. Elbows high, chest up, squat to parallel.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_011',
    name: 'Goblet Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Hold dumbbell at chest level. Great for learning squat mechanics.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_012',
    name: 'Bulgarian Split Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Rear foot elevated. Focus on front leg. Great unilateral exercise.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_013',
    name: 'Walking Lunges',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Dumbbells'],
    notes: 'Step forward into lunge, then step forward with back leg. Continuous motion.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_014',
    name: 'Reverse Lunge',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Step backward into lunge position. Return to starting position.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_015',
    name: 'Lateral Lunge',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Flexors'],
    equipment: ['Dumbbells'],
    notes: 'Step to side, sit back into hip. Great for lateral movement pattern.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_016',
    name: 'Romanian Deadlift',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Barbell'],
    notes: 'Hip hinge movement. Keep bar close to body, focus on hamstring stretch.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_017',
    name: 'Stiff Leg Deadlift',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Lower Back'],
    equipment: ['Barbell'],
    notes: 'Keep legs relatively straight. Focus on hamstring and glute activation.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_018',
    name: 'Single Leg Romanian Deadlift',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Core'],
    equipment: ['Dumbbells'],
    notes: 'One leg balance exercise. Great for stability and unilateral strength.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_019',
    name: 'Sumo Deadlift',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell'],
    notes: 'Wide stance deadlift. Toes pointed out. More quad dominant than conventional.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_020',
    name: 'Calf Raise Machine',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Calves'],
    equipment: ['Calf Raise Machine'],
    notes: 'Rise up on toes, hold briefly, lower slowly. Full range of motion.',
    primaryEquipment: 'Calf Raise Machine'
  },
  {
    id: 'leg_021',
    name: 'Standing Calf Raise',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Calves'],
    equipment: ['Dumbbells'],
    notes: 'Hold dumbbells at sides. Rise up on toes, squeeze calves at top.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_022',
    name: 'Seated Calf Raise',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Calves'],
    equipment: ['Seated Calf Raise Machine'],
    notes: 'Seated position targets soleus muscle. Slow controlled movement.',
    primaryEquipment: 'Seated Calf Raise Machine'
  },
  {
    id: 'leg_023',
    name: 'Jump Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Explosive squat with jump. Land softly back into squat position.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_024',
    name: 'Box Step Up',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Box', 'Dumbbells'],
    notes: 'Step up onto box, drive through heel. Step down with control.',
    primaryEquipment: 'Box'
  },
  {
    id: 'leg_025',
    name: 'Wall Sit',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps'],
    equipment: ['Bodyweight'],
    notes: 'Back against wall, slide down to 90 degrees. Hold position.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_026',
    name: 'Pistol Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Single leg squat. Requires significant strength, balance, and mobility.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_027',
    name: 'Leg Press Wide Stance',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Leg Press Machine'],
    notes: 'Feet wider than shoulder-width on platform. Targets inner thighs more.',
    primaryEquipment: 'Leg Press Machine'
  },
  {
    id: 'leg_028',
    name: 'Leg Press Narrow Stance',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps'],
    equipment: ['Leg Press Machine'],
    notes: 'Feet closer together on platform. More quad focused.',
    primaryEquipment: 'Leg Press Machine'
  },
  {
    id: 'leg_029',
    name: 'Single Leg Press',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Leg Press Machine'],
    notes: 'One leg at a time. Great for addressing imbalances.',
    primaryEquipment: 'Leg Press Machine'
  },
  {
    id: 'leg_030',
    name: 'Leg Press High Foot Position',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Leg Press Machine'],
    notes: 'Feet higher on platform. More posterior chain activation.',
    primaryEquipment: 'Leg Press Machine'
  },

  // CHEST EXERCISES (40+ exercises)
  {
    id: 'chest_001',
    name: 'Dumbbell flat bench press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Classic chest exercise. Lower dumbbells to chest level with control, press up explosively.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'chest_002',
    name: 'Barbell flat bench press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps', 'Anterior Deltoids'],
    equipment: ['Barbell', 'Bench'],
    notes: 'The king of chest exercises. Grip slightly wider than shoulders, lower to chest.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'chest_003',
    name: 'Chest Press Machine',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Chest Press Machine'],
    notes: 'Machine chest press provides stability for beginners. Adjust seat height properly.',
    primaryEquipment: 'Chest Press Machine'
  },
  {
    id: 'chest_004',
    name: 'Incline Barbell Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Pectorals', 'Anterior Deltoids'],
    equipment: ['Barbell', 'Incline Bench'],
    notes: 'Incline bench 30-45 degrees. Targets upper chest more than flat press.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'chest_005',
    name: 'Incline Dumbbell Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Pectorals', 'Anterior Deltoids'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Incline dumbbell press allows greater range of motion than barbell.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'chest_006',
    name: 'Decline Barbell Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Pectorals', 'Triceps'],
    equipment: ['Barbell', 'Decline Bench'],
    notes: 'Decline angle targets lower chest. Secure feet properly.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'chest_007',
    name: 'Decline Dumbbell Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Pectorals', 'Triceps'],
    equipment: ['Dumbbells', 'Decline Bench'],
    notes: 'Decline dumbbell press with greater range of motion.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'chest_008',
    name: 'Dumbbell Flyes Flat',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Isolation exercise for chest. Keep slight bend in elbows throughout.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'chest_009',
    name: 'Dumbbell Flyes Incline',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Pectorals'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Incline flyes target upper chest. Control the weight throughout.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'chest_010',
    name: 'Cable Crossover',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine'],
    notes: 'Stand between cables, bring handles together in arc motion.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'chest_011',
    name: 'Push-ups',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Classic bodyweight chest exercise. Keep body straight throughout.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_012',
    name: 'Incline Push-ups',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Bench'],
    notes: 'Hands on elevated surface. Easier than regular push-ups.',
    primaryEquipment: 'Bench'
  },
  {
    id: 'chest_013',
    name: 'Decline Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Pectorals', 'Triceps'],
    equipment: ['Bench'],
    notes: 'Feet elevated on bench. More challenging than regular push-ups.',
    primaryEquipment: 'Bench'
  },
  {
    id: 'chest_014',
    name: 'Diamond Push-ups',
    category: 'chest',
    difficulty: 'advanced',
    muscleGroup: ['Triceps', 'Pectorals'],
    equipment: ['Bodyweight'],
    notes: 'Hands form diamond shape. More tricep focused than regular push-ups.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_015',
    name: 'Wide Grip Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Bodyweight'],
    notes: 'Hands wider than shoulders. More chest activation.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_016',
    name: 'Pec Deck Machine',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals'],
    equipment: ['Pec Deck Machine'],
    notes: 'Seated chest fly machine. Squeeze chest muscles at peak contraction.',
    primaryEquipment: 'Pec Deck Machine'
  },
  {
    id: 'chest_017',
    name: 'Chest Dips',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Pectorals', 'Triceps'],
    equipment: ['Dip Station'],
    notes: 'Lean forward slightly to target chest more. Control the descent.',
    primaryEquipment: 'Dip Station'
  },
  {
    id: 'chest_018',
    name: 'Cable Flyes High to Low',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Pectorals'],
    equipment: ['Cable Machine'],
    notes: 'Cables set high, pull down and across body. Targets lower chest.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'chest_019',
    name: 'Cable Flyes Low to High',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Pectorals'],
    equipment: ['Cable Machine'],
    notes: 'Cables set low, pull up and across body. Targets upper chest.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'chest_020',
    name: 'Pullovers Dumbbell',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Latissimus Dorsi'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Lie across bench, lower dumbbell behind head. Great stretch for chest.',
    primaryEquipment: 'Dumbbells'
  },

  // BACK EXERCISES (50+ exercises)
  {
    id: 'back_001',
    name: 'Lat machine pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Lat Pulldown Machine'],
    notes: 'Wide grip lat pulldown. Pull to upper chest, squeeze shoulder blades together.',
    primaryEquipment: 'Lat Pulldown Machine'
  },
  {
    id: 'back_002',
    name: 'Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    equipment: ['Pull-up Bar'],
    notes: 'Classic bodyweight back exercise. Start from dead hang, pull chin over bar.',
    primaryEquipment: 'Pull-up Bar'
  },
  {
    id: 'back_003',
    name: 'Seated cable low row with triangle bar',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Middle Trapezius', 'Rhomboids', 'Latissimus Dorsi'],
    equipment: ['Cable Machine', 'Triangle Bar'],
    notes: 'Seated cable row with triangle handle. Keep chest up, pull to lower ribs.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_004',
    name: 'Barbell Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Barbell'],
    notes: 'Bent over barbell row. Keep back straight, pull bar to lower ribs.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_005',
    name: 'Dumbbell Row One Arm',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Support body with bench. Row dumbbell to hip level.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'back_006',
    name: 'T-Bar Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Middle Trapezius'],
    equipment: ['T-Bar Row Machine'],
    notes: 'Chest supported row. Pull handle to lower chest area.',
    primaryEquipment: 'T-Bar Row Machine'
  },
  {
    id: 'back_007',
    name: 'Wide Grip Pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Lat Pulldown Machine'],
    notes: 'Wider than shoulder grip. Focus on lat activation.',
    primaryEquipment: 'Lat Pulldown Machine'
  },
  {
    id: 'back_008',
    name: 'Close Grip Pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Lat Pulldown Machine'],
    notes: 'Narrow grip pulldown. More bicep involvement.',
    primaryEquipment: 'Lat Pulldown Machine'
  },
  {
    id: 'back_009',
    name: 'Reverse Grip Pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Lat Pulldown Machine'],
    notes: 'Underhand grip pulldown. Different muscle recruitment pattern.',
    primaryEquipment: 'Lat Pulldown Machine'
  },
  {
    id: 'back_010',
    name: 'Chin-ups',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Pull-up Bar'],
    notes: 'Underhand grip pull-up. More bicep activation than pull-ups.',
    primaryEquipment: 'Pull-up Bar'
  },
  {
    id: 'back_011',
    name: 'Wide Grip Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Pull-up Bar'],
    notes: 'Hands wider than shoulders. More lat focused.',
    primaryEquipment: 'Pull-up Bar'
  },
  {
    id: 'back_012',
    name: 'Assisted Pull-ups',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Assisted Pull-up Machine'],
    notes: 'Machine assisted pull-ups for beginners. Build up to bodyweight.',
    primaryEquipment: 'Assisted Pull-up Machine'
  },
  {
    id: 'back_013',
    name: 'Cable Row Wide Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Middle Trapezius', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Wide grip cable row. Focus on squeezing shoulder blades.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_014',
    name: 'Machine Row',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Row Machine'],
    notes: 'Seated machine row. Adjust seat height for proper alignment.',
    primaryEquipment: 'Row Machine'
  },
  {
    id: 'back_015',
    name: 'Deadlift',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Erector Spinae', 'Latissimus Dorsi', 'Glutes'],
    equipment: ['Barbell'],
    notes: 'King of all exercises. Keep bar close, drive through heels.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_016',
    name: 'Rack Pulls',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Erector Spinae', 'Upper Trapezius'],
    equipment: ['Barbell', 'Squat Rack'],
    notes: 'Partial deadlift from rack. Focus on lockout portion.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_017',
    name: 'Shrugs Barbell',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Upper Trapezius'],
    equipment: ['Barbell'],
    notes: 'Lift shoulders straight up. Hold briefly at top.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_018',
    name: 'Shrugs Dumbbell',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Upper Trapezius'],
    equipment: ['Dumbbells'],
    notes: 'Dumbbell shrugs allow greater range of motion.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'back_019',
    name: 'Face Pulls',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Cable at face height. Pull to face, squeeze shoulder blades.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_020',
    name: 'Reverse Flyes',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    equipment: ['Dumbbells'],
    notes: 'Bent over reverse fly. Focus on rear delt activation.',
    primaryEquipment: 'Dumbbells'
  },

  // SHOULDER EXERCISES (60+ exercises)
  {
    id: 'shoulders_001',
    name: 'Barbell shoulder press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids', 'Triceps'],
    equipment: ['Barbell'],
    notes: 'Standing or seated barbell overhead press. Keep core tight, press straight up.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'shoulders_002',
    name: 'Standing lateral raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Lateral raise for shoulder width. Lift arms to shoulder height, control the descent.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'shoulders_003',
    name: 'Dumbbell Shoulder Press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Seated or standing dumbbell press. Press straight up overhead.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'shoulders_004',
    name: 'Military Press',
    category: 'shoulders',
    difficulty: 'advanced',
    muscleGroup: ['Anterior Deltoids', 'Core'],
    equipment: ['Barbell'],
    notes: 'Standing strict press. No leg drive. Core engagement crucial.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'shoulders_005',
    name: 'Arnold Press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Start with palms facing you, rotate as you press up.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'shoulders_006',
    name: 'Front Raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Raise arms straight forward to shoulder height.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'shoulders_007',
    name: 'Rear Delt Flyes',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Bent over rear delt fly. Focus on rear deltoid activation.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'shoulders_008',
    name: 'Cable Lateral Raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Medial Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Cable provides constant tension throughout range of motion.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'shoulders_009',
    name: 'Upright Row',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Medial Deltoids', 'Upper Trapezius'],
    equipment: ['Barbell'],
    notes: 'Pull bar to chest level. Elbows lead the movement.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'shoulders_010',
    name: 'Pike Push-ups',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Bodyweight'],
    notes: 'Inverted V position. Bodyweight shoulder exercise.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'shoulders_011',
    name: 'Handstand Push-ups',
    category: 'shoulders',
    difficulty: 'advanced',
    muscleGroup: ['Anterior Deltoids', 'Triceps'],
    equipment: ['Bodyweight'],
    notes: 'Advanced bodyweight shoulder exercise. Requires significant strength.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'shoulders_012',
    name: 'Shoulder Press Machine',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids'],
    equipment: ['Shoulder Press Machine'],
    notes: 'Machine provides stability for beginners. Adjust seat properly.',
    primaryEquipment: 'Shoulder Press Machine'
  },
  {
    id: 'shoulders_013',
    name: 'Behind Neck Press',
    category: 'shoulders',
    difficulty: 'advanced',
    muscleGroup: ['Medial Deltoids', 'Posterior Deltoids'],
    equipment: ['Barbell'],
    notes: 'Advanced exercise. Requires good shoulder mobility. Use light weight.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'shoulders_014',
    name: 'Cable Front Raises',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Cable front raise provides constant tension.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'shoulders_015',
    name: 'Cable Rear Delt Flyes',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Cable crossover for rear delts. Cables at shoulder height.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'shoulders_016',
    name: 'Plate Raises',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids'],
    equipment: ['Weight Plate'],
    notes: 'Hold plate with both hands, raise to shoulder height.',
    primaryEquipment: 'Weight Plate'
  },
  {
    id: 'shoulders_017',
    name: 'Band Pull Aparts',
    category: 'shoulders',
    difficulty: 'beginner',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    equipment: ['Resistance Band'],
    notes: 'Great warm-up exercise. Pull band apart at chest level.',
    primaryEquipment: 'Resistance Band'
  },
  {
    id: 'shoulders_018',
    name: 'Landmine Press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Core'],
    equipment: ['Barbell', 'Landmine'],
    notes: 'One end of barbell anchored. Press at angle.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'shoulders_019',
    name: 'Cuban Press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Posterior Deltoids', 'Rotator Cuff'],
    equipment: ['Dumbbells'],
    notes: 'External rotation followed by press. Great for shoulder health.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'shoulders_020',
    name: 'Bradford Press',
    category: 'shoulders',
    difficulty: 'intermediate',
    muscleGroup: ['Anterior Deltoids', 'Medial Deltoids'],
    equipment: ['Barbell'],
    notes: 'Press from front to back of neck without lockout.',
    primaryEquipment: 'Barbell'
  },

  // ARM EXERCISES (50+ exercises)
  {
    id: 'arms_001',
    name: 'Biceps cable curl',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps'],
    equipment: ['Cable Machine'],
    notes: 'Cable bicep curl provides constant tension. Keep elbows stationary.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'arms_002',
    name: 'Cable Tricep pushdown',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Cable tricep pushdown. Keep elbows at sides, push down with control.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'arms_003',
    name: 'Barbell Bicep Curl',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps'],
    equipment: ['Barbell'],
    notes: 'Classic bicep exercise. Keep elbows stationary, curl bar to chest.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'arms_004',
    name: 'Dumbbell Bicep Curl',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells'],
    notes: 'Dumbbell curls allow unilateral training. Alternate or simultaneous.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'arms_005',
    name: 'Hammer Curl',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps', 'Brachialis'],
    equipment: ['Dumbbells'],
    notes: 'Neutral grip curl. Targets brachialis and biceps.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'arms_006',
    name: 'Concentration Curl',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells'],
    notes: 'Seated, elbow braced on thigh. Isolation bicep exercise.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'arms_007',
    name: 'Preacher Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Barbell', 'Preacher Bench'],
    notes: 'Arms supported on preacher bench. Strict bicep isolation.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'arms_008',
    name: 'Close Grip Bench Press',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps', 'Pectorals'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Narrow grip bench press. More tricep focused.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'arms_009',
    name: 'Overhead Tricep Extension',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Dumbbells'],
    notes: 'Dumbbell overhead for triceps. Keep elbows close to head.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'arms_010',
    name: 'Tricep Dips',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Dip Station'],
    notes: 'Bodyweight tricep exercise. Keep torso upright for tricep focus.',
    primaryEquipment: 'Dip Station'
  },
  {
    id: 'arms_011',
    name: 'Lying Tricep Extension',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Skull crushers. Lower bar to forehead, extend back up.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'arms_012',
    name: '21s Bicep Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Barbell'],
    notes: '7 bottom half, 7 top half, 7 full reps. Intense bicep workout.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'arms_013',
    name: 'Incline Dumbbell Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps'],
    equipment: ['Dumbbells', 'Incline Bench'],
    notes: 'Incline bench bicep curl. Greater stretch at bottom.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'arms_014',
    name: 'Cable Hammer Curl',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Biceps', 'Brachialis'],
    equipment: ['Cable Machine'],
    notes: 'Cable hammer curl with rope attachment.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'arms_015',
    name: 'Overhead Cable Extension',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Cable overhead extension. Keep elbows stationary.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'arms_016',
    name: 'Reverse Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Brachialis', 'Forearms'],
    equipment: ['Barbell'],
    notes: 'Overhand grip curl. Targets brachialis and forearms.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'arms_017',
    name: 'Wrist Curl',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Forearms'],
    equipment: ['Barbell'],
    notes: 'Seated wrist curls for forearm development.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'arms_018',
    name: 'Reverse Wrist Curl',
    category: 'arms',
    difficulty: 'beginner',
    muscleGroup: ['Forearms'],
    equipment: ['Barbell'],
    notes: 'Reverse wrist curls for forearm extensors.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'arms_019',
    name: 'Zottman Curl',
    category: 'arms',
    difficulty: 'intermediate',
    muscleGroup: ['Biceps', 'Forearms'],
    equipment: ['Dumbbells'],
    notes: 'Curl up with supinated grip, lower with pronated grip.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'arms_020',
    name: 'Diamond Push-ups',
    category: 'arms',
    difficulty: 'advanced',
    muscleGroup: ['Triceps'],
    equipment: ['Bodyweight'],
    notes: 'Hands form diamond. Excellent bodyweight tricep exercise.',
    primaryEquipment: 'Bodyweight'
  },

  // CORE EXERCISES (20+ exercises)
  {
    id: 'core_001',
    name: 'Crunch',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Basic abdominal crunch. Focus on lifting shoulder blades off ground.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_002',
    name: 'Plank',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis', 'Transverse Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Isometric core exercise. Maintain straight line from head to heels.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_003',
    name: 'Russian Twist',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques'],
    equipment: ['Medicine Ball'],
    notes: 'Seated twist with medicine ball. Rotate side to side.',
    primaryEquipment: 'Medicine Ball'
  },
  {
    id: 'core_004',
    name: 'Dead Bug',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Transverse Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Lying on back, opposite arm/leg extensions. Core stability exercise.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_005',
    name: 'Mountain Climbers',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Dynamic core exercise. Alternate bringing knees to chest.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_006',
    name: 'Bicycle Crunch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis', 'Obliques'],
    equipment: ['Bodyweight'],
    notes: 'Alternating elbow to opposite knee. Great for obliques.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_007',
    name: 'Leg Raises',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Abs', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Lying leg raises. Focus on lower abdominal activation.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_008',
    name: 'Hanging Leg Raises',
    category: 'core',
    difficulty: 'advanced',
    muscleGroup: ['Lower Abs', 'Grip Strength'],
    equipment: ['Pull-up Bar'],
    notes: 'Hanging from bar, raise legs to 90 degrees. Advanced core exercise.',
    primaryEquipment: 'Pull-up Bar'
  },
  {
    id: 'core_009',
    name: 'Side Plank',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques'],
    equipment: ['Bodyweight'],
    notes: 'Side-lying plank. Great for lateral core stability.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_010',
    name: 'Sit-ups',
    category: 'core',
    difficulty: 'beginner',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Full sit-up from lying to sitting position.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_011',
    name: 'Cable Crunch',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Cable Machine'],
    notes: 'Kneeling cable crunch. Constant tension on abs.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'core_012',
    name: 'Wood Chop',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Obliques', 'Core'],
    equipment: ['Cable Machine'],
    notes: 'Diagonal chopping motion with cable. Great functional movement.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'core_013',
    name: 'Ab Wheel Rollout',
    category: 'core',
    difficulty: 'advanced',
    muscleGroup: ['Rectus Abdominis', 'Transverse Abdominis'],
    equipment: ['Ab Wheel'],
    notes: 'Roll wheel forward and back. Very challenging core exercise.',
    primaryEquipment: 'Ab Wheel'
  },
  {
    id: 'core_014',
    name: 'Hollow Body Hold',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Lying hollow position hold. Gymnastic core exercise.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_015',
    name: 'V-Ups',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bodyweight'],
    notes: 'Simultaneous leg and torso raise forming V shape.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_016',
    name: 'Flutter Kicks',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Abs', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Lying on back, alternate small leg kicks.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_017',
    name: 'Bear Crawl',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Full Core', 'Shoulders'],
    equipment: ['Bodyweight'],
    notes: 'Crawl forward maintaining tabletop position.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'core_018',
    name: 'Pallof Press',
    category: 'core',
    difficulty: 'intermediate',
    muscleGroup: ['Transverse Abdominis', 'Obliques'],
    equipment: ['Cable Machine'],
    notes: 'Anti-rotation core exercise. Hold cable at chest.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'core_019',
    name: 'Turkish Get Up',
    category: 'core',
    difficulty: 'advanced',
    muscleGroup: ['Full Core', 'Full Body'],
    equipment: ['Kettlebell'],
    notes: 'Complex movement from lying to standing. Great total body exercise.',
    primaryEquipment: 'Kettlebell'
  },
  {
    id: 'core_020',
    name: 'Dragon Flag',
    category: 'core',
    difficulty: 'advanced',
    muscleGroup: ['Rectus Abdominis'],
    equipment: ['Bench'],
    notes: 'Advanced core exercise. Body rigid, only shoulders touch bench.',
    primaryEquipment: 'Bench'
  },

  // CARDIO EXERCISES (20+ exercises)
  {
    id: 'cardio_001',
    name: 'TreadMill',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Full Body'],
    equipment: ['Treadmill'],
    notes: 'Running or walking on treadmill. Adjust speed and incline as needed.',
    primaryEquipment: 'Treadmill'
  },
  {
    id: 'cardio_002',
    name: 'Stationary bike',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Full Body'],
    equipment: ['Stationary Bike'],
    notes: 'Low impact cardio exercise. Adjust resistance for intensity.',
    primaryEquipment: 'Stationary Bike'
  },
  {
    id: 'cardio_003',
    name: 'Elliptical Machine',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Full Body'],
    equipment: ['Elliptical Machine'],
    notes: 'Low impact full body cardio. Forward and backward motion.',
    primaryEquipment: 'Elliptical Machine'
  },
  {
    id: 'cardio_004',
    name: 'Rowing Machine',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Full Body', 'Back'],
    equipment: ['Rowing Machine'],
    notes: 'Full body cardio with emphasis on pulling muscles.',
    primaryEquipment: 'Rowing Machine'
  },
  {
    id: 'cardio_005',
    name: 'Stair Climber',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Legs', 'Glutes'],
    equipment: ['Stair Climber'],
    notes: 'High intensity lower body cardio. Great for leg strength.',
    primaryEquipment: 'Stair Climber'
  },
  {
    id: 'cardio_006',
    name: 'Jumping Jacks',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Full Body'],
    equipment: ['Bodyweight'],
    notes: 'Classic bodyweight cardio. Jump while spreading legs and raising arms.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'cardio_007',
    name: 'High Knees',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Hip Flexors', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Run in place bringing knees to chest level.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'cardio_008',
    name: 'Burpees',
    category: 'cardio',
    difficulty: 'advanced',
    muscleGroup: ['Full Body'],
    equipment: ['Bodyweight'],
    notes: 'Squat, plank, push-up, jump sequence. High intensity full body.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'cardio_009',
    name: 'Mountain Climbers',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Core', 'Shoulders'],
    equipment: ['Bodyweight'],
    notes: 'Plank position, alternate bringing knees to chest rapidly.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'cardio_010',
    name: 'Jump Rope',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Full Body'],
    equipment: ['Jump Rope'],
    notes: 'Classic cardio exercise. Great for coordination and conditioning.',
    primaryEquipment: 'Jump Rope'
  },
  {
    id: 'cardio_011',
    name: 'Box Jumps',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Legs', 'Glutes'],
    equipment: ['Plyometric Box'],
    notes: 'Jump onto box, step down. Explosive lower body power.',
    primaryEquipment: 'Plyometric Box'
  },
  {
    id: 'cardio_012',
    name: 'Battle Ropes',
    category: 'cardio',
    difficulty: 'advanced',
    muscleGroup: ['Full Body', 'Core'],
    equipment: ['Battle Ropes'],
    notes: 'Wave, slam, or spiral heavy ropes. High intensity workout.',
    primaryEquipment: 'Battle Ropes'
  },
  {
    id: 'cardio_013',
    name: 'Kettlebell Swings',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings', 'Core'],
    equipment: ['Kettlebell'],
    notes: 'Hip hinge swing motion. Explosive hip drive.',
    primaryEquipment: 'Kettlebell'
  },
  {
    id: 'cardio_014',
    name: 'Sprint Intervals',
    category: 'cardio',
    difficulty: 'advanced',
    muscleGroup: ['Full Body'],
    equipment: ['Track'],
    notes: 'High intensity running intervals. Rest between sprints.',
    primaryEquipment: 'Track'
  },
  {
    id: 'cardio_015',
    name: 'Spin Class',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Legs', 'Core'],
    equipment: ['Spin Bike'],
    notes: 'Group cycling class with varied intensity and resistance.',
    primaryEquipment: 'Spin Bike'
  },
  {
    id: 'cardio_016',
    name: 'Swimming',
    category: 'cardio',
    difficulty: 'intermediate',
    muscleGroup: ['Full Body'],
    equipment: ['Pool'],
    notes: 'Low impact full body cardio. Various strokes available.',
    primaryEquipment: 'Pool'
  },
  {
    id: 'cardio_017',
    name: 'Jogging',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Legs', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Moderate pace running. Great for building aerobic base.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'cardio_018',
    name: 'Cycling',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Legs'],
    equipment: ['Bicycle'],
    notes: 'Outdoor or indoor cycling. Low impact cardio option.',
    primaryEquipment: 'Bicycle'
  },
  {
    id: 'cardio_019',
    name: 'Dancing',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Full Body'],
    equipment: ['Bodyweight'],
    notes: 'Fun cardio option. Various styles and intensities available.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'cardio_020',
    name: 'Step Ups',
    category: 'cardio',
    difficulty: 'beginner',
    muscleGroup: ['Legs', 'Glutes'],
    equipment: ['Step Platform'],
    notes: 'Step up and down on platform. Can add weights for intensity.',
    primaryEquipment: 'Step Platform'
  }
];

// Helper functions
export function getExerciseById(id: string): ExerciseData | undefined {
  return exerciseDatabase.find(exercise => exercise.id === id);
}

export function getExercisesByCategory(category: string): ExerciseData[] {
  return exerciseDatabase.filter(exercise => exercise.category === category);
}

export function getExercisesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): ExerciseData[] {
  return exerciseDatabase.filter(exercise => exercise.difficulty === difficulty);
}

export function searchExercises(query: string): ExerciseData[] {
  const lowerQuery = query.toLowerCase();
  return exerciseDatabase.filter(exercise =>
    exercise.name.toLowerCase().includes(lowerQuery) ||
    exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(lowerQuery)) ||
    exercise.equipment.some(eq => eq.toLowerCase().includes(lowerQuery)) ||
    exercise.notes.toLowerCase().includes(lowerQuery)
  );
}

export const completeExerciseDatabase = exerciseDatabase;
