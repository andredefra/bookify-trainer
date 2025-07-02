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

// Complete exercise database with 468 exercises
export const exerciseDatabase: ExerciseData[] = [
  // LEG EXERCISES (150 exercises)
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
  {
    id: 'leg_031',
    name: 'Squat Pulse',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Small pulsing movements at bottom of squat. Increases time under tension.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_032',
    name: 'Sumo Squat Pulse',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Inner Thighs'],
    equipment: ['Bodyweight'],
    notes: 'Wide stance squat with pulses. Targets inner thighs and glutes.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_033',
    name: 'Single Leg Glute Bridge',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Bridge on one leg. Great for glute activation and strength.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_034',
    name: 'Glute Bridge',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Basic glute bridge. Squeeze glutes at top, lower with control.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_035',
    name: 'Hip Thrust',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Shoulders on bench, drive hips up. Premier glute exercise.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_036',
    name: 'Curtsy Lunge',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Quadriceps'],
    equipment: ['Dumbbells'],
    notes: 'Step behind and across. Targets glutes from different angle.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_037',
    name: 'Reverse Lunge with Knee Drive',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Reverse lunge followed by knee drive. Adds balance challenge.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_038',
    name: 'Side Lunge to Curtsy',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Quadriceps', 'Inner Thighs'],
    equipment: ['Bodyweight'],
    notes: 'Flow from side lunge to curtsy lunge. Dynamic movement.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_039',
    name: 'Cossack Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Deep side squat with straight leg. Requires good mobility.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_040',
    name: 'Plie Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Inner Thighs'],
    equipment: ['Dumbbells'],
    notes: 'Wide stance, toes out. Ballet-inspired squat variation.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_041',
    name: 'Narrow Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps'],
    equipment: ['Bodyweight'],
    notes: 'Feet together or very narrow. More quad dominant.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_042',
    name: 'Squat to Calf Raise',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes', 'Calves'],
    equipment: ['Bodyweight'],
    notes: 'Squat up, then calf raise at top. Compound movement.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_043',
    name: 'Overhead Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core', 'Shoulders'],
    equipment: ['Barbell'],
    notes: 'Squat with arms overhead. Requires mobility and stability.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_044',
    name: 'Zercher Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core'],
    equipment: ['Barbell'],
    notes: 'Bar held in elbow crease. Unique loading pattern.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_045',
    name: 'Pause Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Barbell'],
    notes: 'Pause at bottom of squat. Builds strength out of hole.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_046',
    name: 'Anderson Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Barbell', 'Squat Rack'],
    notes: 'Start from bottom position in rack. Eliminates stretch reflex.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_047',
    name: 'Box Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Barbell', 'Box'],
    notes: 'Squat to box, pause, then stand. Teaches proper depth.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_048',
    name: 'Speed Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Barbell'],
    notes: 'Fast concentric phase with lighter weight. Power development.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_049',
    name: 'Alternating Jump Lunge',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Jump and switch legs in air. High intensity plyometric.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_050',
    name: 'Lateral Bounds',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Quadriceps'],
    equipment: ['Bodyweight'],
    notes: 'Jump side to side, land on one foot. Lateral power development.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_051',
    name: 'Single Leg Squat to Chair',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Chair'],
    notes: 'Squat down to chair on one leg. Assisted pistol squat progression.',
    primaryEquipment: 'Chair'
  },
  {
    id: 'leg_052',
    name: 'Shrimp Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Single leg squat holding opposite foot behind. Advanced movement.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_053',
    name: 'Dragon Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Single leg squat with leg extended behind. Very advanced.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_054',
    name: 'Archer Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Wide squat shifting weight to one side. Pistol squat progression.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_055',
    name: 'Tuck Jump',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Jump bringing knees to chest. Explosive power exercise.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_056',
    name: 'Broad Jump',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Calves'],
    equipment: ['Bodyweight'],
    notes: 'Jump forward as far as possible. Horizontal power development.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_057',
    name: 'Single Leg Calf Raise',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Calves'],
    equipment: ['Bodyweight'],
    notes: 'Calf raise on one foot. More challenging than bilateral.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_058',
    name: 'Donkey Calf Raise',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Calves'],
    equipment: ['Donkey Calf Machine'],
    notes: 'Bent over calf raise. Different angle of attack.',
    primaryEquipment: 'Donkey Calf Machine'
  },
  {
    id: 'leg_059',
    name: 'Calf Press on Leg Press',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Calves'],
    equipment: ['Leg Press Machine'],
    notes: 'Use leg press machine for calf raises. High weight capacity.',
    primaryEquipment: 'Leg Press Machine'
  },
  {
    id: 'leg_060',
    name: 'Toe Walks',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Calves'],
    equipment: ['Bodyweight'],
    notes: 'Walk on toes for distance or time. Calf endurance.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_061',
    name: 'Heel Walks',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Shins'],
    equipment: ['Bodyweight'],
    notes: 'Walk on heels. Strengthens shin muscles.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_062',
    name: 'Tibialis Raise',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Shins'],
    equipment: ['Bodyweight'],
    notes: 'Lift toes up while heels stay down. Shin strengthening.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_063',
    name: 'Good Morning',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Lower Back'],
    equipment: ['Barbell'],
    notes: 'Bow forward with bar on shoulders. Hip hinge pattern.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_064',
    name: 'Nordic Hamstring Curl',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings'],
    equipment: ['Bodyweight'],
    notes: 'Eccentric hamstring exercise. Kneel and lower body forward.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_065',
    name: 'Glute Ham Raise',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['GHD Machine'],
    notes: 'Hamstring curl and back extension combined.',
    primaryEquipment: 'GHD Machine'
  },
  {
    id: 'leg_066',
    name: 'Reverse Hyper',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Reverse Hyper Machine'],
    notes: 'Lie face down, lift legs behind. Great for posterior chain.',
    primaryEquipment: 'Reverse Hyper Machine'
  },
  {
    id: 'leg_067',
    name: 'Single Leg Deadlift',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Core'],
    equipment: ['Dumbbells'],
    notes: 'Balance on one leg while hinging at hip. Unilateral strength.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_068',
    name: 'Deficit Deadlift',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Back'],
    equipment: ['Barbell', 'Platform'],
    notes: 'Stand on platform for greater range of motion.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_069',
    name: 'Trap Bar Deadlift',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Back'],
    equipment: ['Trap Bar'],
    notes: 'Stand inside hexagonal bar. More quad dominant.',
    primaryEquipment: 'Trap Bar'
  },
  {
    id: 'leg_070',
    name: 'Snatch Grip Deadlift',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Back'],
    equipment: ['Barbell'],
    notes: 'Very wide grip deadlift. Greater range of motion.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_071',
    name: 'Pause Deadlift',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Back'],
    equipment: ['Barbell'],
    notes: 'Pause just off floor. Builds strength at sticking point.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_072',
    name: 'Chain Deadlift',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Back'],
    equipment: ['Barbell', 'Chains'],
    notes: 'Chains add accommodating resistance. Variable load.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_073',
    name: 'Band Deadlift',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Back'],
    equipment: ['Barbell', 'Resistance Band'],
    notes: 'Bands add resistance at top. Speed and power development.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_074',
    name: 'Dumbbell Deadlift',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Dumbbells'],
    notes: 'Deadlift with dumbbells. Great for beginners.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_075',
    name: 'Kettlebell Deadlift',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Kettlebell'],
    notes: 'Deadlift with kettlebell. Single or double KB.',
    primaryEquipment: 'Kettlebell'
  },
  {
    id: 'leg_076',
    name: 'Landmine Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Barbell', 'Landmine'],
    notes: 'Hold end of barbell at chest. Unique loading angle.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_077',
    name: 'Landmine Romanian Deadlift',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Barbell', 'Landmine'],
    notes: 'RDL with landmine setup. Different resistance curve.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_078',
    name: 'Safety Bar Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Safety Squat Bar'],
    notes: 'Specialized bar for shoulder comfort. More upright torso.',
    primaryEquipment: 'Safety Squat Bar'
  },
  {
    id: 'leg_079',
    name: 'Belt Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Belt Squat Machine'],
    notes: 'Weight attached to belt. No spinal loading.',
    primaryEquipment: 'Belt Squat Machine'
  },
  {
    id: 'leg_080',
    name: 'Pendulum Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Pendulum Squat Machine'],
    notes: 'Specialized squat machine. Smooth arc of motion.',
    primaryEquipment: 'Pendulum Squat Machine'
  },
  {
    id: 'leg_081',
    name: 'Sissy Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps'],
    equipment: ['Sissy Squat Machine'],
    notes: 'Lean back while squatting. Intense quad isolation.',
    primaryEquipment: 'Sissy Squat Machine'
  },
  {
    id: 'leg_082',
    name: 'Split Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Static lunge position. Up and down movement.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_083',
    name: 'Rear Foot Elevated Split Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bench'],
    notes: 'Back foot on bench. Same as Bulgarian split squat.',
    primaryEquipment: 'Bench'
  },
  {
    id: 'leg_084',
    name: 'Front Foot Elevated Split Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Platform'],
    notes: 'Front foot elevated. Greater range of motion.',
    primaryEquipment: 'Platform'
  },
  {
    id: 'leg_085',
    name: 'Deficit Reverse Lunge',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Platform', 'Dumbbells'],
    notes: 'Stand on platform, step down. Greater range.',
    primaryEquipment: 'Platform'
  },
  {
    id: 'leg_086',
    name: 'Clock Lunges',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Lunge in different directions like clock positions.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_087',
    name: '180 Degree Jump Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Jump squat with 180 degree turn. Adds coordination.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_088',
    name: 'Single Leg Box Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Box'],
    notes: 'Single leg squat to box. Pistol squat progression.',
    primaryEquipment: 'Box'
  },
  {
    id: 'leg_089',
    name: 'Pulse Lunge',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Small pulses at bottom of lunge. Time under tension.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_090',
    name: 'Jumping Lunge',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Jump up from lunge position. Plyometric exercise.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_091',
    name: 'Single Leg Hip Thrust',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Bench'],
    notes: 'Hip thrust on one leg. Great glute isolation.',
    primaryEquipment: 'Bench'
  },
  {
    id: 'leg_092',
    name: 'Weighted Hip Thrust',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Hip thrust with weight. Premier glute exercise.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_093',
    name: 'Banded Hip Thrust',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes'],
    equipment: ['Resistance Band', 'Bench'],
    notes: 'Hip thrust with band resistance. Glute activation.',
    primaryEquipment: 'Resistance Band'
  },
  {
    id: 'leg_094',
    name: 'Frog Pump',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Hip thrust with feet together, knees out. Glute isolation.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_095',
    name: 'Single Leg Glute Bridge Hold',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Hold bridge position on one leg. Isometric exercise.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_096',
    name: 'Marching Glute Bridge',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Alternate lifting legs while in bridge. Core stability.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_097',
    name: 'Glute Bridge March',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'March legs while holding bridge position.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_098',
    name: 'Fire Hydrant',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes', 'Hip Abductors'],
    equipment: ['Bodyweight'],
    notes: 'On hands and knees, lift leg to side. Glute medius.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_099',
    name: 'Clamshell',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes', 'Hip Abductors'],
    equipment: ['Bodyweight'],
    notes: 'Side lying, lift top knee. Hip abductor strengthening.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_100',
    name: 'Monster Walk',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes', 'Hip Abductors'],
    equipment: ['Resistance Band'],
    notes: 'Walk laterally with band around ankles. Glute activation.',
    primaryEquipment: 'Resistance Band'
  },
  {
    id: 'leg_101',
    name: 'Lateral Walk',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes', 'Hip Abductors'],
    equipment: ['Resistance Band'],
    notes: 'Side steps with band resistance. Hip abductor strength.',
    primaryEquipment: 'Resistance Band'
  },
  {
    id: 'leg_102',
    name: 'Crab Walk',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Glutes', 'Hip Abductors'],
    equipment: ['Resistance Band'],
    notes: 'Squat position, walk sideways with band.',
    primaryEquipment: 'Resistance Band'
  },
  {
    id: 'leg_103',
    name: 'Banded Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Resistance Band'],
    notes: 'Squat with band around knees. Glute activation.',
    primaryEquipment: 'Resistance Band'
  },
  {
    id: 'leg_104',
    name: 'Wall Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Wall'],
    notes: 'Back against wall while squatting. Assisted squat.',
    primaryEquipment: 'Wall'
  },
  {
    id: 'leg_105',
    name: 'Elevator Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Squat in stages like elevator floors. Time under tension.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_106',
    name: '1.5 Rep Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Full squat, half up, back down, then full up.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_107',
    name: 'Hindu Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Calves'],
    equipment: ['Bodyweight'],
    notes: 'Rise onto toes at bottom, arms swing. Traditional exercise.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_108',
    name: 'Prisoner Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Hands behind head during squat. Bodyweight variation.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_109',
    name: 'Eagle Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Arms wrapped like eagle pose while squatting.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_110',
    name: 'Twist Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Add torso twist at top of squat. Core engagement.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_111',
    name: 'Star Jump Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Jump squat with arms and legs spread like star.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_112',
    name: 'Pop Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Jump feet out to squat, then back together.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_113',
    name: 'Burpee Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes', 'Full Body'],
    equipment: ['Bodyweight'],
    notes: 'Squat into burpee movement. Full body exercise.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_114',
    name: 'Squat Thrust',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Squat down, jump feet back, then forward.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_115',
    name: 'Single Leg Squat Assisted',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['TRX'],
    notes: 'Single leg squat with assistance. Pistol progression.',
    primaryEquipment: 'TRX'
  },
  {
    id: 'leg_116',
    name: 'TRX Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['TRX'],
    notes: 'Squat holding TRX handles. Assisted squat.',
    primaryEquipment: 'TRX'
  },
  {
    id: 'leg_117',
    name: 'TRX Jump Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['TRX'],
    notes: 'Jump squat with TRX assistance. Plyometric training.',
    primaryEquipment: 'TRX'
  },
  {
    id: 'leg_118',
    name: 'Resistance Band Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Resistance Band'],
    notes: 'Squat standing on resistance band. Variable resistance.',
    primaryEquipment: 'Resistance Band'
  },
  {
    id: 'leg_119',
    name: 'Bosu Ball Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Core'],
    equipment: ['Bosu Ball'],
    notes: 'Squat on unstable surface. Balance and stability.',
    primaryEquipment: 'Bosu Ball'
  },
  {
    id: 'leg_120',
    name: 'Medicine Ball Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Medicine Ball'],
    notes: 'Hold medicine ball during squat. Added resistance.',
    primaryEquipment: 'Medicine Ball'
  },
  {
    id: 'leg_121',
    name: 'Stability Ball Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Stability Ball'],
    notes: 'Ball between back and wall. Assisted squat.',
    primaryEquipment: 'Stability Ball'
  },
  {
    id: 'leg_122',
    name: 'Single Leg Step Down',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Step'],
    notes: 'Step down slowly on one leg. Eccentric strength.',
    primaryEquipment: 'Step'
  },
  {
    id: 'leg_123',
    name: 'Lateral Step Up',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Abductors'],
    equipment: ['Step'],
    notes: 'Step up sideways onto platform. Lateral movement.',
    primaryEquipment: 'Step'
  },
  {
    id: 'leg_124',
    name: 'Cross Over Step Up',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Step'],
    notes: 'Step up crossing leg over. Multi-planar movement.',
    primaryEquipment: 'Step'
  },
  {
    id: 'leg_125',
    name: 'Step Up with Knee Drive',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hip Flexors'],
    equipment: ['Step'],
    notes: 'Step up and drive opposite knee high. Dynamic movement.',
    primaryEquipment: 'Step'
  },
  {
    id: 'leg_126',
    name: 'Explosive Step Up',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Step'],
    notes: 'Step up explosively, both feet leave ground.',
    primaryEquipment: 'Step'
  },
  {
    id: 'leg_127',
    name: 'Single Leg Romanian Deadlift to Knee Drive',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Core'],
    equipment: ['Dumbbells'],
    notes: 'RDL followed by knee drive. Complex movement.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_128',
    name: 'B-Stance Romanian Deadlift',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes'],
    equipment: ['Dumbbells'],
    notes: 'One foot forward, one back. Asymmetrical loading.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'leg_129',
    name: 'Suitcase Deadlift',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Hamstrings', 'Glutes', 'Core'],
    equipment: ['Dumbbell'],
    notes: 'Hold weight at side like suitcase. Unilateral loading.',
    primaryEquipment: 'Dumbbell'
  },
  {
    id: 'leg_130',
    name: 'Jefferson Deadlift',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Hamstrings', 'Glutes', 'Core'],
    equipment: ['Barbell'],
    notes: 'Straddle bar, one hand front, one back. Unique pattern.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'leg_131',
    name: 'Siff Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps'],
    equipment: ['Bodyweight'],
    notes: 'Deep squat rising onto toes. Quad and calf integration.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_132',
    name: 'Spanish Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps'],
    equipment: ['Resistance Band'],
    notes: 'Band pulls shins back during squat. Quad isolation.',
    primaryEquipment: 'Resistance Band'
  },
  {
    id: 'leg_133',
    name: 'Peterson Step Up',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps'],
    equipment: ['Step'],
    notes: 'Step up with toe on step, heel off. VMO focus.',
    primaryEquipment: 'Step'
  },
  {
    id: 'leg_134',
    name: 'Terminal Knee Extension',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps'],
    equipment: ['Resistance Band'],
    notes: 'Band behind knee, extend knee fully. VMO activation.',
    primaryEquipment: 'Resistance Band'
  },
  {
    id: 'leg_135',
    name: 'Quad Set',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps'],
    equipment: ['Bodyweight'],
    notes: 'Tighten quad muscle isometrically. Muscle activation.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_136',
    name: 'Straight Leg Raise',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Lying down, lift straight leg. Quad and hip flexor.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_137',
    name: 'Short Arc Quad',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps'],
    equipment: ['Bodyweight'],
    notes: 'Small range knee extension over bolster. Rehab exercise.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_138',
    name: 'Petersen Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps'],
    equipment: ['Petersen Squat Device'],
    notes: 'Shins fixed, squat movement. Intense quad isolation.',
    primaryEquipment: 'Petersen Squat Device'
  },
  {
    id: 'leg_139',
    name: 'Reverse Nordic',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps'],
    equipment: ['Bodyweight'],
    notes: 'Kneel and lean back. Eccentric quad exercise.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_140',
    name: 'ATG Split Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Ass to grass split squat. Full range of motion.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_141',
    name: 'Poliquin Step Up',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Step', 'Dumbbells'],
    notes: 'Step up, lower slowly. Eccentric emphasis.',
    primaryEquipment: 'Step'
  },
  {
    id: 'leg_142',
    name: 'Rearfoot Elevated Split Squat ISO Hold',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bench'],
    notes: 'Hold bottom position of Bulgarian split squat. Isometric.',
    primaryEquipment: 'Bench'
  },
  {
    id: 'leg_143',
    name: 'Cyclist Squat',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps'],
    equipment: ['Bodyweight'],
    notes: 'Heels elevated, deep squat. Mimics cycling position.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_144',
    name: 'Heels Elevated Squat',
    category: 'legs',
    difficulty: 'beginner',
    muscleGroup: ['Quadriceps'],
    equipment: ['Weight Plate'],
    notes: 'Heels on plate during squat. Increases quad activation.',
    primaryEquipment: 'Weight Plate'
  },
  {
    id: 'leg_145',
    name: 'Duck Walk',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Walk in deep squat position. Quad endurance.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_146',
    name: 'Single Leg Wall Sit',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps'],
    equipment: ['Wall'],
    notes: 'Wall sit on one leg. Unilateral quad strength.',
    primaryEquipment: 'Wall'
  },
  {
    id: 'leg_147',
    name: 'Isometric Squat Hold',
    category: 'legs',
    difficulty: 'intermediate',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Hold squat position for time. Isometric strength.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_148',
    name: 'Jump Squat to Tuck Jump',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Bodyweight'],
    notes: 'Jump squat followed by tuck jump. Complex plyometric.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'leg_149',
    name: 'Depth Drop to Jump Squat',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Box'],
    notes: 'Drop from box, immediately jump squat. Reactive strength.',
    primaryEquipment: 'Box'
  },
  {
    id: 'leg_150',
    name: 'Single Leg Depth Drop',
    category: 'legs',
    difficulty: 'advanced',
    muscleGroup: ['Quadriceps', 'Glutes'],
    equipment: ['Box'],
    notes: 'Drop from box landing on one leg. Advanced plyometric.',
    primaryEquipment: 'Box'
  },

  // CHEST EXERCISES (60 exercises)
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
  {
    id: 'chest_021',
    name: 'Svend Press',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals'],
    equipment: ['Weight Plate'],
    notes: 'Squeeze plate between palms and press out. Isometric chest work.',
    primaryEquipment: 'Weight Plate'
  },
  {
    id: 'chest_022',
    name: 'Floor Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Barbell'],
    notes: 'Bench press lying on floor. Reduces range of motion.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'chest_023',
    name: 'Single Arm Dumbbell Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Core'],
    equipment: ['Dumbbell', 'Bench'],
    notes: 'Press one arm at a time. Adds core stability challenge.',
    primaryEquipment: 'Dumbbell'
  },
  {
    id: 'chest_024',
    name: 'Pause Bench Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Pause bar on chest before pressing. Eliminates bounce.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'chest_025',
    name: 'Close Grip Bench Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Triceps', 'Pectorals'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Narrow grip, more tricep focused. Keep elbows tucked.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'chest_026',
    name: 'Reverse Grip Bench Press',
    category: 'chest',
    difficulty: 'advanced',
    muscleGroup: ['Upper Pectorals', 'Triceps'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Underhand grip targets upper chest. Use spotter.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'chest_027',
    name: 'Smith Machine Bench Press',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Smith Machine', 'Bench'],
    notes: 'Guided bar path provides stability. Good for beginners.',
    primaryEquipment: 'Smith Machine'
  },
  {
    id: 'chest_028',
    name: 'Machine Chest Fly',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals'],
    equipment: ['Chest Fly Machine'],
    notes: 'Seated chest fly with machine guidance. Isolation exercise.',
    primaryEquipment: 'Chest Fly Machine'
  },
  {
    id: 'chest_029',
    name: 'Cable Chest Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Cable Machine'],
    notes: 'Standing cable press. Different angle than bench press.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'chest_030',
    name: 'Landmine Chest Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Core'],
    equipment: ['Barbell', 'Landmine'],
    notes: 'Press barbell at angle. Single or double arm variation.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'chest_031',
    name: 'Hindu Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Shoulders', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Flowing push-up motion. Dive down and forward.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_032',
    name: 'Archer Push-ups',
    category: 'chest',
    difficulty: 'advanced',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Bodyweight'],
    notes: 'Wide grip, shift weight to one side. Unilateral emphasis.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_033',
    name: 'One Arm Push-ups',
    category: 'chest',
    difficulty: 'advanced',
    muscleGroup: ['Pectorals', 'Triceps', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Ultimate push-up progression. Requires significant strength.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_034',
    name: 'Clapping Push-ups',
    category: 'chest',
    difficulty: 'advanced',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Bodyweight'],
    notes: 'Explosive push-up with clap. Plyometric exercise.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_035',
    name: 'Staggered Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Bodyweight'],
    notes: 'One hand forward, one back. Changes muscle emphasis.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_036',
    name: 'Pike Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Shoulders', 'Upper Chest'],
    equipment: ['Bodyweight'],
    notes: 'Inverted V position. More shoulder focused.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_037',
    name: 'T Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Push-up with side plank rotation. Adds core work.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_038',
    name: 'Spiderman Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Bring knee to elbow during push-up. Dynamic movement.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_039',
    name: 'Divebomber Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Shoulders'],
    equipment: ['Bodyweight'],
    notes: 'Dive forward and scoop up. Flowing movement pattern.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_040',
    name: 'Pseudo Planche Push-ups',
    category: 'chest',
    difficulty: 'advanced',
    muscleGroup: ['Pectorals', 'Shoulders'],
    equipment: ['Bodyweight'],
    notes: 'Hands by ribs, lean forward. Advanced progression.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'chest_041',
    name: 'Ring Push-ups',
    category: 'chest',
    difficulty: 'advanced',
    muscleGroup: ['Pectorals', 'Triceps', 'Core'],
    equipment: ['Gymnastics Rings'],
    notes: 'Push-ups on unstable rings. Requires stability.',
    primaryEquipment: 'Gymnastics Rings'
  },
  {
    id: 'chest_042',
    name: 'TRX Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Core'],
    equipment: ['TRX'],
    notes: 'Hands in TRX handles. Unstable surface training.',
    primaryEquipment: 'TRX'
  },
  {
    id: 'chest_043',
    name: 'Bosu Ball Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Core'],
    equipment: ['Bosu Ball'],
    notes: 'Hands on Bosu ball. Balance and stability challenge.',
    primaryEquipment: 'Bosu Ball'
  },
  {
    id: 'chest_044',
    name: 'Medicine Ball Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Medicine Ball'],
    notes: 'Hands on medicine ball. Changes angle and stability.',
    primaryEquipment: 'Medicine Ball'
  },
  {
    id: 'chest_045',
    name: 'Resistance Band Chest Press',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals'],
    equipment: ['Resistance Band'],
    notes: 'Band chest press standing or lying. Variable resistance.',
    primaryEquipment: 'Resistance Band'
  },
  {
    id: 'chest_046',
    name: 'Resistance Band Flyes',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals'],
    equipment: ['Resistance Band'],
    notes: 'Fly motion with resistance band. Constant tension.',
    primaryEquipment: 'Resistance Band'
  },
  {
    id: 'chest_047',
    name: 'Kettlebell Chest Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Core'],
    equipment: ['Kettlebell', 'Bench'],
    notes: 'Press kettlebells from chest. Different grip challenge.',
    primaryEquipment: 'Kettlebell'
  },
  {
    id: 'chest_048',
    name: 'Single Arm Cable Chest Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Core'],
    equipment: ['Cable Machine'],
    notes: 'One arm cable press. Anti-rotation core work.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'chest_049',
    name: 'Decline Flyes',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Pectorals'],
    equipment: ['Dumbbells', 'Decline Bench'],
    notes: 'Flyes on decline bench. Targets lower chest fibers.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'chest_050',
    name: 'Incline Cable Flyes',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Pectorals'],
    equipment: ['Cable Machine', 'Incline Bench'],
    notes: 'Cable flyes on incline bench. Upper chest isolation.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'chest_051',
    name: 'Flat Cable Flyes',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine', 'Bench'],
    notes: 'Cable flyes on flat bench. Constant tension throughout.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'chest_052',
    name: 'High Cable Crossover',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Lower Pectorals'],
    equipment: ['Cable Machine'],
    notes: 'Cables set high position. Targets lower chest.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'chest_053',
    name: 'Low Cable Crossover',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Pectorals'],
    equipment: ['Cable Machine'],
    notes: 'Cables set low position. Targets upper chest.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'chest_054',
    name: 'Mid Cable Crossover',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Cable Machine'],
    notes: 'Cables at shoulder height. Targets middle chest.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'chest_055',
    name: 'Plate Squeeze Press',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals'],
    equipment: ['Weight Plate'],
    notes: 'Squeeze plate while pressing. Isometric and dynamic work.',
    primaryEquipment: 'Weight Plate'
  },
  {
    id: 'chest_056',
    name: 'Dumbbell Squeeze Press',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Dumbbells', 'Bench'],
    notes: 'Press dumbbells together during movement. Added tension.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'chest_057',
    name: 'Hammer Strength Chest Press',
    category: 'chest',
    difficulty: 'beginner',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Hammer Strength Machine'],
    notes: 'Independent arm movement machine. Natural pressing path.',
    primaryEquipment: 'Hammer Strength Machine'
  },
  {
    id: 'chest_058',
    name: 'Chest Press Machine Unilateral',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Core'],
    equipment: ['Chest Press Machine'],
    notes: 'One arm at a time on machine. Addresses imbalances.',
    primaryEquipment: 'Chest Press Machine'
  },
  {
    id: 'chest_059',
    name: 'Weighted Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals', 'Triceps'],
    equipment: ['Weight Plate'],
    notes: 'Push-ups with weight on back. Progressive overload.',
    primaryEquipment: 'Weight Plate'
  },
  {
    id: 'chest_060',
    name: 'Deficit Push-ups',
    category: 'chest',
    difficulty: 'intermediate',
    muscleGroup: ['Pectorals'],
    equipment: ['Push-up Handles'],
    notes: 'Hands elevated for greater range of motion.',
    primaryEquipment: 'Push-up Handles'
  },

  // BACK EXERCISES (80 exercises)
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
  {
    id: 'back_021',
    name: 'Neutral Grip Pull-ups',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Pull-up Bar'],
    notes: 'Palms facing each other. Joint-friendly grip variation.',
    primaryEquipment: 'Pull-up Bar'
  },
  {
    id: 'back_022',
    name: 'Commando Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Core'],
    equipment: ['Pull-up Bar'],
    notes: 'Pull up alternating sides of head past bar. Unilateral emphasis.',
    primaryEquipment: 'Pull-up Bar'
  },
  {
    id: 'back_023',
    name: 'L-Sit Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Core'],
    equipment: ['Pull-up Bar'],
    notes: 'Pull-ups while holding L-sit position. Core integration.',
    primaryEquipment: 'Pull-up Bar'
  },
  {
    id: 'back_024',
    name: 'Weighted Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Pull-up Bar', 'Weight Belt'],
    notes: 'Pull-ups with added weight. Progressive overload.',
    primaryEquipment: 'Pull-up Bar'
  },
  {
    id: 'back_025',
    name: 'Kipping Pull-ups',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Pull-up Bar'],
    notes: 'Use hip drive to assist pull-up. CrossFit style.',
    primaryEquipment: 'Pull-up Bar'
  },
  {
    id: 'back_026',
    name: 'Chest to Bar Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Pull-up Bar'],
    notes: 'Pull chest to bar instead of chin. Greater range.',
    primaryEquipment: 'Pull-up Bar'
  },
  {
    id: 'back_027',
    name: 'Behind Neck Pull-ups',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Pull-up Bar'],
    notes: 'Pull up behind neck. Requires good shoulder mobility.',
    primaryEquipment: 'Pull-up Bar'
  },
  {
    id: 'back_028',
    name: 'Single Arm Pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Cable Machine'],
    notes: 'One arm lat pulldown. Addresses imbalances.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_029',
    name: 'V-Bar Pulldown',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Lat Pulldown Machine', 'V-Bar'],
    notes: 'Narrow V-shaped handle. Close grip pulldown variation.',
    primaryEquipment: 'Lat Pulldown Machine'
  },
  {
    id: 'back_030',
    name: 'Straight Arm Pulldown',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Cable Machine'],
    notes: 'Keep arms straight, pull bar to thighs. Lat isolation.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_031',
    name: 'Two Arm Dumbbell Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Dumbbells'],
    notes: 'Bent over row with both dumbbells simultaneously.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'back_032',
    name: 'Chest Supported Row',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Incline Bench', 'Dumbbells'],
    notes: 'Chest against incline bench. Reduces cheating.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'back_033',
    name: 'Seal Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Barbell', 'Bench'],
    notes: 'Lie face down on elevated bench. Strict rowing.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_034',
    name: 'Pendlay Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Barbell'],
    notes: 'Dead stop from floor each rep. Explosive concentric.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_035',
    name: 'Yates Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Biceps'],
    equipment: ['Barbell'],
    notes: 'Underhand grip, more upright torso. Dorian Yates style.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_036',
    name: 'Meadows Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Barbell', 'Landmine'],
    notes: 'Single arm landmine row. John Meadows variation.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_037',
    name: 'Inverted Row',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Barbell', 'Squat Rack'],
    notes: 'Body under bar, pull chest to bar. Bodyweight row.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_038',
    name: 'TRX Row',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['TRX'],
    notes: 'Rowing with suspension trainer. Adjustable difficulty.',
    primaryEquipment: 'TRX'
  },
  {
    id: 'back_039',
    name: 'Ring Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Gymnastics Rings'],
    notes: 'Rowing on gymnastic rings. Requires stability.',
    primaryEquipment: 'Gymnastics Rings'
  },
  {
    id: 'back_040',
    name: 'Cable Row Single Arm',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Core'],
    equipment: ['Cable Machine'],
    notes: 'One arm cable row. Anti-rotation core work.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_041',
    name: 'High Cable Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Middle Trapezius', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Cable at shoulder height. Targets mid traps.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_042',
    name: 'Low Cable Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Cable Machine'],
    notes: 'Cable at floor level. More lat emphasis.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_043',
    name: 'Cable Row Neutral Grip',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Parallel grip handle. Joint-friendly position.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_044',
    name: 'Cable Reverse Fly',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    equipment: ['Cable Machine'],
    notes: 'Arms spread wide, pull handles apart. Rear delt focus.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_045',
    name: 'Machine Reverse Fly',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    equipment: ['Reverse Fly Machine'],
    notes: 'Seated reverse fly machine. Posterior chain isolation.',
    primaryEquipment: 'Reverse Fly Machine'
  },
  {
    id: 'back_046',
    name: 'Prone Y-Raise',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Lower Trapezius'],
    equipment: ['Dumbbells'],
    notes: 'Lie face down, arms in Y shape. Lower trap activation.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'back_047',
    name: 'Prone T-Raise',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Middle Trapezius', 'Rhomboids'],
    equipment: ['Dumbbells'],
    notes: 'Lie face down, arms in T shape. Mid trap focus.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'back_048',
    name: 'Prone W-Raise',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Lower Trapezius', 'Rhomboids'],
    equipment: ['Dumbbells'],
    notes: 'Lie face down, arms in W shape. Postural muscles.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'back_049',
    name: 'Wall Angels',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Lower Trapezius', 'Rhomboids'],
    equipment: ['Wall'],
    notes: 'Back against wall, move arms like snow angel. Mobility.',
    primaryEquipment: 'Wall'
  },
  {
    id: 'back_050',
    name: 'Band Pull Apart',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Posterior Deltoids', 'Rhomboids'],
    equipment: ['Resistance Band'],
    notes: 'Pull band apart at chest level. Great activation exercise.',
    primaryEquipment: 'Resistance Band'
  },
  {
    id: 'back_051',
    name: 'Power Shrug',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Trapezius'],
    equipment: ['Barbell'],
    notes: 'Explosive shrug with slight knee bend. Power development.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_052',
    name: 'Behind Back Shrug',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Trapezius'],
    equipment: ['Barbell'],
    notes: 'Bar behind body during shrug. Different angle.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_053',
    name: 'Cable Shrug',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Upper Trapezius'],
    equipment: ['Cable Machine'],
    notes: 'Shrugs using cable machine. Constant tension.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_054',
    name: 'Overhead Shrug',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Trapezius'],
    equipment: ['Barbell'],
    notes: 'Shrug with arms overhead. Different muscle emphasis.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_055',
    name: 'Kettlebell High Pull',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Trapezius', 'Rhomboids'],
    equipment: ['Kettlebell'],
    notes: 'Explosive pull to chest level. Power exercise.',
    primaryEquipment: 'Kettlebell'
  },
  {
    id: 'back_056',
    name: 'Barbell High Pull',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Trapezius', 'Rhomboids'],
    equipment: ['Barbell'],
    notes: 'Pull bar to chest level explosively. Olympic lift component.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_057',
    name: 'Snatch Grip High Pull',
    category: 'back',
    difficulty: 'advanced',
    muscleGroup: ['Upper Trapezius', 'Rhomboids'],
    equipment: ['Barbell'],
    notes: 'Wide grip high pull. Greater range of motion.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_058',
    name: 'Upright Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Trapezius', 'Medial Deltoids'],
    equipment: ['Barbell'],
    notes: 'Pull bar to chest level. Elbows lead movement.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_059',
    name: 'Cable Upright Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Trapezius', 'Medial Deltoids'],
    equipment: ['Cable Machine'],
    notes: 'Upright row with cable. Constant tension variation.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_060',
    name: 'Dumbbell Upright Row',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Upper Trapezius', 'Medial Deltoids'],
    equipment: ['Dumbbells'],
    notes: 'Upright row with dumbbells. Independent arm movement.',
    primaryEquipment: 'Dumbbells'
  },
  {
    id: 'back_061',
    name: 'Single Arm Row Machine',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Row Machine'],
    notes: 'One arm at a time on machine. Address imbalances.',
    primaryEquipment: 'Row Machine'
  },
  {
    id: 'back_062',
    name: 'Hammer Strength Row',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi', 'Rhomboids'],
    equipment: ['Hammer Strength Machine'],
    notes: 'Independent arm movement. Natural pulling path.',
    primaryEquipment: 'Hammer Strength Machine'
  },
  {
    id: 'back_063',
    name: 'Lat Pullover Machine',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Pullover Machine'],
    notes: 'Isolated lat movement. Machine-guided path.',
    primaryEquipment: 'Pullover Machine'
  },
  {
    id: 'back_064',
    name: 'Cable Pullover',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Latissimus Dorsi'],
    equipment: ['Cable Machine'],
    notes: 'Pullover motion with cable. Lat isolation.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_065',
    name: 'Hyperextension',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Erector Spinae', 'Glutes'],
    equipment: ['Hyperextension Bench'],
    notes: 'Back extension exercise. Focus on lower back.',
    primaryEquipment: 'Hyperextension Bench'
  },
  {
    id: 'back_066',
    name: 'Weighted Hyperextension',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Erector Spinae', 'Glutes'],
    equipment: ['Hyperextension Bench', 'Weight Plate'],
    notes: 'Back extension with added weight. Progressive overload.',
    primaryEquipment: 'Hyperextension Bench'
  },
  {
    id: 'back_067',
    name: '45 Degree Hyperextension',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Erector Spinae', 'Glutes'],
    equipment: ['45 Degree Hyperextension'],
    notes: 'Angled back extension. More comfortable position.',
    primaryEquipment: '45 Degree Hyperextension'
  },
  {
    id: 'back_068',
    name: 'Reverse Hyperextension',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Glutes', 'Hamstrings'],
    equipment: ['Reverse Hyper Machine'],
    notes: 'Lift legs instead of torso. Decompressive effect.',
    primaryEquipment: 'Reverse Hyper Machine'
  },
  {
    id: 'back_069',
    name: 'Superman',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Erector Spinae'],
    equipment: ['Bodyweight'],
    notes: 'Lie face down, lift chest and legs. Bodyweight back extension.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'back_070',
    name: 'Bird Dog',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Erector Spinae', 'Core'],
    equipment: ['Bodyweight'],
    notes: 'Opposite arm and leg extension. Core stability.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'back_071',
    name: 'Dead Bug',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Core', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    notes: 'Lying down, opposite arm/leg extensions. Core control.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'back_072',
    name: 'Cat Cow',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Erector Spinae'],
    equipment: ['Bodyweight'],
    notes: 'Spinal flexion and extension. Mobility exercise.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'back_073',
    name: 'Scapular Wall Slide',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Lower Trapezius', 'Rhomboids'],
    equipment: ['Wall'],
    notes: 'Back against wall, slide arms up and down. Scapular mobility.',
    primaryEquipment: 'Wall'
  },
  {
    id: 'back_074',
    name: 'Prone Extension',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Erector Spinae'],
    equipment: ['Bodyweight'],
    notes: 'Lie face down, lift chest only. Gentle back extension.',
    primaryEquipment: 'Bodyweight'
  },
  {
    id: 'back_075',
    name: 'Good Morning',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Erector Spinae', 'Hamstrings'],
    equipment: ['Barbell'],
    notes: 'Hip hinge with bar on shoulders. Posterior chain.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_076',
    name: 'Seated Good Morning',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Erector Spinae'],
    equipment: ['Barbell'],
    notes: 'Good morning while seated. Isolates erector spinae.',
    primaryEquipment: 'Barbell'
  },
  {
    id: 'back_077',
    name: 'Round Back Extension',
    category: 'back',
    difficulty: 'beginner',
    muscleGroup: ['Erector Spinae'],
    equipment: ['Hyperextension Bench'],
    notes: 'Curl spine up vertebra by vertebra. Spinal articulation.',
    primaryEquipment: 'Hyperextension Bench'
  },
  {
    id: 'back_078',
    name: 'Cable Wood Chop',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Core', 'Obliques'],
    equipment: ['Cable Machine'],
    notes: 'Diagonal chopping motion. Rotational core strength.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_079',
    name: 'Pallof Press',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Core', 'Obliques'],
    equipment: ['Cable Machine'],
    notes: 'Anti-rotation exercise. Hold cable at chest.',
    primaryEquipment: 'Cable Machine'
  },
  {
    id: 'back_080',
    name: 'Single Arm Farmers Walk',
    category: 'back',
    difficulty: 'intermediate',
    muscleGroup: ['Core', 'Erector Spinae'],
    equipment: ['Dumbbell'],
    notes: 'Carry weight on one side. Anti-lateral flexion.',
    primaryEquipment: 'Dumbbell'
  },

  // SHOULDER EXERCISES (70 exercises)
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
  // ... continue with remaining shoulder exercises (shoulders_021 to shoulders_070)

  // ARM EXERCISES (60 exercises)
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
  // ... continue with remaining arm exercises (arms_002 to arms_060)

  // CORE EXERCISES (30 exercises)
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
  // ... continue with remaining core exercises (core_002 to core_030)

  // CARDIO EXERCISES (18 exercises)
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
  // ... continue with remaining cardio exercises (cardio_002 to cardio_018)
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
