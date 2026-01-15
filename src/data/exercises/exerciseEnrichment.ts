import { ExerciseData, Mechanics, ForceType, ActivityType } from './types';

/**
 * Default biomechanical mappings based on category
 */
const categoryDefaults: Record<string, { mechanics: Mechanics; forceType: ForceType; activityType: ActivityType }> = {
  chest: { mechanics: 'compound', forceType: 'push', activityType: 'strength' },
  back: { mechanics: 'compound', forceType: 'pull', activityType: 'strength' },
  legs: { mechanics: 'compound', forceType: 'squat', activityType: 'strength' },
  shoulders: { mechanics: 'compound', forceType: 'push', activityType: 'strength' },
  arms: { mechanics: 'isolation', forceType: 'pull', activityType: 'strength' },
  core: { mechanics: 'isolation', forceType: 'static', activityType: 'strength' },
  cardio: { mechanics: 'compound', forceType: 'static', activityType: 'cardio' },
  functional: { mechanics: 'compound', forceType: 'push', activityType: 'strength' },
  flexibility: { mechanics: 'isolation', forceType: 'static', activityType: 'stretching' },
  plyometric: { mechanics: 'compound', forceType: 'squat', activityType: 'plyometric' },
};

/**
 * Exercise-specific force type overrides based on exercise name patterns
 */
const forceTypePatterns: { pattern: RegExp; forceType: ForceType }[] = [
  // Hinge patterns
  { pattern: /deadlift|rdl|romanian|hip hinge|good morning|hyperextension/i, forceType: 'hinge' },
  // Squat patterns
  { pattern: /squat|lunge|leg press|split squat|step up|pistol/i, forceType: 'squat' },
  // Pull patterns
  { pattern: /row|pull|curl|lat|chin|shrug|face pull/i, forceType: 'pull' },
  // Push patterns
  { pattern: /press|push|dip|extension|kickback|fly|flye|raise|tricep/i, forceType: 'push' },
  // Static patterns
  { pattern: /plank|hold|isometric|wall sit|dead hang|hollow/i, forceType: 'static' },
  // Carry patterns
  { pattern: /carry|walk|farmer/i, forceType: 'carry' },
];

/**
 * Mechanics overrides based on exercise name patterns
 */
const mechanicsPatterns: { pattern: RegExp; mechanics: Mechanics }[] = [
  // Isolation exercises
  { pattern: /curl|extension|fly|flye|raise|kickback|pullover|concentration|preacher|isolation/i, mechanics: 'isolation' },
  // Compound exercises
  { pattern: /squat|deadlift|press|row|pull-up|chin-up|dip|lunge|thrust/i, mechanics: 'compound' },
];

/**
 * Enriches a single exercise with default biomechanical values
 */
export function enrichExercise(exercise: ExerciseData): ExerciseData {
  // If already has explicit values, return as is
  if (exercise.mechanics && exercise.forceType && exercise.activityType) {
    return exercise;
  }

  const defaults = categoryDefaults[exercise.category] || {
    mechanics: 'compound' as Mechanics,
    forceType: 'push' as ForceType,
    activityType: 'strength' as ActivityType,
  };

  // Determine mechanics based on muscle groups count if not explicitly set
  let mechanics = exercise.mechanics;
  if (!mechanics) {
    // Check patterns first
    for (const { pattern, mechanics: m } of mechanicsPatterns) {
      if (pattern.test(exercise.name)) {
        mechanics = m;
        break;
      }
    }
    // Fallback to muscle group count
    if (!mechanics) {
      mechanics = exercise.muscleGroup.length > 1 ? 'compound' : 'isolation';
    }
  }

  // Determine force type based on patterns if not explicitly set
  let forceType = exercise.forceType;
  if (!forceType) {
    for (const { pattern, forceType: ft } of forceTypePatterns) {
      if (pattern.test(exercise.name)) {
        forceType = ft;
        break;
      }
    }
    // Fallback to category defaults
    if (!forceType) {
      forceType = defaults.forceType;
    }
  }

  // Activity type from category
  const activityType = exercise.activityType || defaults.activityType;

  return {
    ...exercise,
    mechanics,
    forceType,
    activityType,
  };
}

/**
 * Enriches an array of exercises with default biomechanical values
 */
export function enrichExercises(exercises: ExerciseData[]): ExerciseData[] {
  return exercises.map(enrichExercise);
}

/**
 * Get a category-appropriate placeholder GIF URL
 * These are stylized animated placeholders based on category
 */
export function getCategoryPlaceholderGif(category: string): string {
  // We'll use a gradient animation style placeholder that matches the Dribbble aesthetic
  const placeholders: Record<string, string> = {
    chest: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&auto=format',
    back: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&auto=format',
    legs: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&h=300&fit=crop&auto=format',
    shoulders: 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400&h=300&fit=crop&auto=format',
    arms: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop&auto=format',
    core: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format',
    cardio: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop&auto=format',
    functional: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop&auto=format',
    flexibility: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&auto=format',
    plyometric: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400&h=300&fit=crop&auto=format',
  };
  
  return placeholders[category] || placeholders.functional;
}
