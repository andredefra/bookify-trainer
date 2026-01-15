/**
 * Professional Exercise GIF Mapping
 * Using VERIFIED URLs only - no fabricated or placeholder URLs
 * All unmapped exercises fall back to the Dribbble default
 */

// Default fallback GIF for any exercise without a specific mapping
export const DEFAULT_EXERCISE_GIF = "https://cdn.dribbble.com/userupload/20700734/file/original-1e545aca6678863e33e7f664c97088bf.gif";

// Verified exercise GIF mappings - ONLY real, working URLs
export const exerciseGifMapping: Record<string, string> = {
  // === CORE EXERCISES (Verified Pinterest/Hearst) ===
  'plank': 'https://i.pinimg.com/originals/cf/b5/67/cfb5677a755fe7288b608a4fec6f09a0.gif',
  'plank-standard': 'https://i.pinimg.com/originals/cf/b5/67/cfb5677a755fe7288b608a4fec6f09a0.gif',
  'side-plank': 'https://i.pinimg.com/originals/cf/b5/67/cfb5677a755fe7288b608a4fec6f09a0.gif',
  'forearm-plank': 'https://i.pinimg.com/originals/cf/b5/67/cfb5677a755fe7288b608a4fec6f09a0.gif',
  
  'bicycle-crunch': 'https://i.pinimg.com/originals/1d/17/2d/1d172d7339794eb3e9b2dc2cc60773d2.gif',
  'bicycle-crunches': 'https://i.pinimg.com/originals/1d/17/2d/1d172d7339794eb3e9b2dc2cc60773d2.gif',
  'bicycle-crunch-standard': 'https://i.pinimg.com/originals/1d/17/2d/1d172d7339794eb3e9b2dc2cc60773d2.gif',
  
  'russian-twist': 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/russian-twist-1457047729.gif',
  'russian-twists': 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/russian-twist-1457047729.gif',
  'weighted-russian-twist': 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/russian-twist-1457047729.gif',
  
  // === LEG EXERCISES (Verified Webflow/SquatWolf) ===
  'leg-press': 'https://global-uploads.webflow.com/5d1d0d3f530d9616313de728/5d1d0d3f530d9658253de75f_Leg%20Press.gif',
  'angled-leg-press': 'https://global-uploads.webflow.com/5d1d0d3f530d9616313de728/5d1d0d3f530d9658253de75f_Leg%20Press.gif',
  '45-degree-leg-press': 'https://global-uploads.webflow.com/5d1d0d3f530d9616313de728/5d1d0d3f530d9658253de75f_Leg%20Press.gif',
  'horizontal-leg-press': 'https://global-uploads.webflow.com/5d1d0d3f530d9616313de728/5d1d0d3f530d9658253de75f_Leg%20Press.gif',
  'leg-press-machine': 'https://global-uploads.webflow.com/5d1d0d3f530d9616313de728/5d1d0d3f530d9658253de75f_Leg%20Press.gif',
  
  'abductors-machine': 'https://blog.squatwolf.com/wp-content/uploads/2019/07/seated-abductor.gif',
  'standing-abductor-machine': 'https://blog.squatwolf.com/wp-content/uploads/2019/07/seated-abductor.gif',
  'seated-hip-abduction': 'https://blog.squatwolf.com/wp-content/uploads/2019/07/seated-abductor.gif',
  'adductors-machine': 'https://blog.squatwolf.com/wp-content/uploads/2019/07/seated-abductor.gif',
  'hip-abduction': 'https://blog.squatwolf.com/wp-content/uploads/2019/07/seated-abductor.gif',
  
  // === SQUAT VARIATIONS (Verified Giphy) ===
  'squat': 'https://media.giphy.com/media/1Oaxbu5fs0rv0ScUop/giphy.gif',
  'squats': 'https://media.giphy.com/media/1Oaxbu5fs0rv0ScUop/giphy.gif',
  'barbell-squat': 'https://media.giphy.com/media/1Oaxbu5fs0rv0ScUop/giphy.gif',
  'back-squat': 'https://media.giphy.com/media/1Oaxbu5fs0rv0ScUop/giphy.gif',
  'squat-smith-machine': 'https://media.giphy.com/media/1Oaxbu5fs0rv0ScUop/giphy.gif',
  'goblet-squat': 'https://media.giphy.com/media/1Oaxbu5fs0rv0ScUop/giphy.gif',
  'hack-squat': 'https://media.giphy.com/media/1Oaxbu5fs0rv0ScUop/giphy.gif',
  'front-squat': 'https://media.giphy.com/media/1Oaxbu5fs0rv0ScUop/giphy.gif',
  'sumo-squat': 'https://media.giphy.com/media/1Oaxbu5fs0rv0ScUop/giphy.gif',
  'bodyweight-squat': 'https://media.giphy.com/media/1Oaxbu5fs0rv0ScUop/giphy.gif',
  
  // === PUSH-UP VARIATIONS (Verified Giphy) ===
  'push-up': 'https://media.giphy.com/media/KdsuPdbY11bE5O7fxo/giphy.gif',
  'pushup': 'https://media.giphy.com/media/KdsuPdbY11bE5O7fxo/giphy.gif',
  'push-ups': 'https://media.giphy.com/media/KdsuPdbY11bE5O7fxo/giphy.gif',
  'pushups': 'https://media.giphy.com/media/KdsuPdbY11bE5O7fxo/giphy.gif',
  'diamond-push-up': 'https://media.giphy.com/media/KdsuPdbY11bE5O7fxo/giphy.gif',
  'wide-push-up': 'https://media.giphy.com/media/KdsuPdbY11bE5O7fxo/giphy.gif',
  'incline-push-up': 'https://media.giphy.com/media/KdsuPdbY11bE5O7fxo/giphy.gif',
  'decline-push-up': 'https://media.giphy.com/media/KdsuPdbY11bE5O7fxo/giphy.gif',
  
  // === LUNGE VARIATIONS (Verified Giphy) ===
  'lunge': 'https://media.giphy.com/media/l3q2QXsJ2qaGj9qaY/giphy.gif',
  'lunges': 'https://media.giphy.com/media/l3q2QXsJ2qaGj9qaY/giphy.gif',
  'walking-lunge': 'https://media.giphy.com/media/l3q2QXsJ2qaGj9qaY/giphy.gif',
  'walking-lunges': 'https://media.giphy.com/media/l3q2QXsJ2qaGj9qaY/giphy.gif',
  'reverse-lunge': 'https://media.giphy.com/media/l3q2QXsJ2qaGj9qaY/giphy.gif',
  'forward-lunge': 'https://media.giphy.com/media/l3q2QXsJ2qaGj9qaY/giphy.gif',
  'stationary-lunge': 'https://media.giphy.com/media/l3q2QXsJ2qaGj9qaY/giphy.gif',
  'dumbbell-lunge': 'https://media.giphy.com/media/l3q2QXsJ2qaGj9qaY/giphy.gif',
};

// Category fallbacks - ALL use the Dribbble default as specified
export const categoryFallbackGifs: Record<string, string> = {
  legs: DEFAULT_EXERCISE_GIF,
  chest: DEFAULT_EXERCISE_GIF,
  back: DEFAULT_EXERCISE_GIF,
  shoulders: DEFAULT_EXERCISE_GIF,
  arms: DEFAULT_EXERCISE_GIF,
  core: DEFAULT_EXERCISE_GIF,
  cardio: DEFAULT_EXERCISE_GIF,
  functional: DEFAULT_EXERCISE_GIF,
  flexibility: DEFAULT_EXERCISE_GIF,
  plyometric: DEFAULT_EXERCISE_GIF,
  olympic: DEFAULT_EXERCISE_GIF,
  compound: DEFAULT_EXERCISE_GIF,
};
