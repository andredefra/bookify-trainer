import { ExerciseData, Mechanics, ForceType, ActivityType } from './types';
import { exerciseGifMapping, categoryFallbackGifs } from './exerciseGifMapping';

/**
 * Derives the mechanics type (compound vs isolation) based on the number of muscle groups
 */
export function deriveMechanics(exercise: ExerciseData): Mechanics {
  // If explicitly set, use that value
  if (exercise.mechanics) return exercise.mechanics;
  
  // Compound = works multiple muscle groups
  return exercise.muscleGroup.length > 1 ? 'compound' : 'isolation';
}

/**
 * Derives the force type based on category and exercise characteristics
 */
export function deriveForceType(exercise: ExerciseData): ForceType {
  // If explicitly set, use that value
  if (exercise.forceType) return exercise.forceType;
  
  const name = exercise.name.toLowerCase();
  const category = exercise.category;
  
  // Push movements
  const pushKeywords = ['press', 'push', 'dip', 'extension', 'kickback', 'fly', 'flye', 'raise'];
  const pushCategories = ['chest', 'shoulders'];
  
  // Pull movements
  const pullKeywords = ['row', 'pull', 'curl', 'lat', 'cable', 'face pull', 'shrug'];
  const pullCategories = ['back'];
  
  // Hinge movements
  const hingeKeywords = ['deadlift', 'rdl', 'romanian', 'hip hinge', 'good morning', 'hyperextension'];
  
  // Squat movements
  const squatKeywords = ['squat', 'lunge', 'leg press', 'split squat', 'step up'];
  
  // Static/Isometric movements
  const staticKeywords = ['plank', 'hold', 'isometric', 'wall sit', 'dead hang'];
  
  // Carry movements
  const carryKeywords = ['carry', 'walk', 'farmer'];
  
  // Check keywords
  if (staticKeywords.some(k => name.includes(k))) return 'static';
  if (carryKeywords.some(k => name.includes(k))) return 'carry';
  if (hingeKeywords.some(k => name.includes(k))) return 'hinge';
  if (squatKeywords.some(k => name.includes(k))) return 'squat';
  if (pullKeywords.some(k => name.includes(k)) || pullCategories.includes(category)) return 'pull';
  if (pushKeywords.some(k => name.includes(k)) || pushCategories.includes(category)) return 'push';
  
  // Arms category needs special handling
  if (category === 'arms') {
    if (name.includes('curl') || name.includes('bicep')) return 'pull';
    if (name.includes('tricep') || name.includes('extension') || name.includes('pushdown')) return 'push';
  }
  
  // Default based on category
  if (category === 'legs') {
    if (name.includes('curl') || name.includes('hamstring')) return 'pull';
    return 'squat';
  }
  
  if (category === 'core') return 'static';
  
  return 'push'; // Default fallback
}

/**
 * Derives the activity type based on category
 */
export function deriveActivityType(exercise: ExerciseData): ActivityType {
  // If explicitly set, use that value
  if (exercise.activityType) return exercise.activityType;
  
  const category = exercise.category;
  const name = exercise.name.toLowerCase();
  
  if (category === 'cardio') return 'cardio';
  if (category === 'plyometric') return 'plyometric';
  if (category === 'flexibility') return 'stretching';
  
  // Check for mobility/stretching keywords
  const mobilityKeywords = ['stretch', 'mobility', 'flexibility', 'foam roll'];
  if (mobilityKeywords.some(k => name.includes(k))) return 'mobility';
  
  // Default to strength
  return 'strength';
}

/**
 * Gets the display color for mechanics type
 */
export function getMechanicsColor(mechanics: Mechanics): string {
  switch (mechanics) {
    case 'compound': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    case 'isolation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    default: return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Gets the display color for force type
 */
export function getForceTypeColor(forceType: ForceType): string {
  switch (forceType) {
    case 'push': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    case 'pull': return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300';
    case 'static': return 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300';
    case 'hinge': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'squat': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'carry': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
    default: return 'bg-gray-100 text-gray-800';
  }
}

// Default exercise GIF from Dribbble
const DEFAULT_EXERCISE_GIF = "https://cdn.dribbble.com/userupload/20700734/file/original-1e545aca6678863e33e7f664c97088bf.gif";

/**
 * Gets exercise display GIF URL with intelligent fallback logic
 * Priority: custom > demonstration > keyword match > category fallback > default
 */
export function getExerciseGifUrl(exercise: ExerciseData): string {
  // Priority 1: Custom GIF from exercise data
  if (exercise.customGifUrl) return exercise.customGifUrl;
  if (exercise.demonstrationGif) return exercise.demonstrationGif;
  
  // Priority 2: Direct ID match in mapping
  if (exerciseGifMapping[exercise.id]) {
    return exerciseGifMapping[exercise.id];
  }
  
  // Priority 3: Keyword matching in exercise name
  const nameLower = exercise.name.toLowerCase();
  for (const [keyword, gifUrl] of Object.entries(exerciseGifMapping)) {
    // Convert keyword like 'push-up' to 'push up' and 'pushup' for matching
    const keywordVariants = [
      keyword,
      keyword.replace(/-/g, ' '),
      keyword.replace(/-/g, ''),
    ];
    
    if (keywordVariants.some(variant => nameLower.includes(variant))) {
      return gifUrl;
    }
  }
  
  // Priority 4: Category fallback
  if (categoryFallbackGifs[exercise.category]) {
    return categoryFallbackGifs[exercise.category];
  }
  
  // Priority 5: Default GIF
  return DEFAULT_EXERCISE_GIF;
}
