
import { GoalTemplate, GoalType } from "../types";

export const GOAL_TEMPLATES: Record<GoalType, GoalTemplate> = {
  weight_management: {
    type: 'weight_management',
    name: 'Weight Management',
    description: 'Lose or gain weight within a specific timeframe',
    unit: 'kg',
    defaultTarget: 5,
    examples: [
      'Lose 5kg in 3 months',
      'Gain 3kg of muscle in 6 months',
      'Reach target weight of 70kg'
    ]
  },
  cardiovascular_endurance: {
    type: 'cardiovascular_endurance',
    name: 'Cardiovascular Endurance',
    description: 'Improve running distance, duration, or cardiovascular fitness',
    unit: 'km',
    defaultTarget: 5,
    examples: [
      'Run 10km without stopping',
      'Complete a 5km run under 25 minutes',
      'Run for 30 minutes continuously',
      'Cycle 50km in one session'
    ]
  },
  strength_progress: {
    type: 'strength_progress',
    name: 'Strength Progress',
    description: 'Increase weight lifted in specific exercises',
    unit: 'kg',
    requiresExercise: true,
    examples: [
      'Bench press 80kg',
      'Squat 100kg',
      'Deadlift 120kg',
      'Overhead press 60kg'
    ]
  },
  activity_level: {
    type: 'activity_level',
    name: 'Daily Activity',
    description: 'Maintain consistent daily activity levels',
    unit: 'steps',
    defaultTarget: 10000,
    requiresFrequency: true,
    examples: [
      'Walk 10,000 steps daily for 30 days',
      'Burn 300 calories daily for 4 weeks',
      'Be active for 60 minutes daily',
      'Complete 5 workouts per week'
    ]
  },
  body_composition: {
    type: 'body_composition',
    name: 'Body Composition',
    description: 'Achieve target body fat percentage or muscle mass',
    unit: '%',
    defaultTarget: 15,
    examples: [
      'Reach 15% body fat',
      'Reduce body fat by 5%',
      'Increase muscle mass percentage',
      'Improve waist-to-hip ratio'
    ]
  },
  workout_consistency: {
    type: 'workout_consistency',
    name: 'Workout Consistency',
    description: 'Maintain regular workout schedule',
    unit: 'sessions',
    requiresFrequency: true,
    examples: [
      'Complete 3 workouts per week for 8 weeks',
      'Train 20 sessions in 2 months',
      'Never miss more than 1 workout per week',
      'Maintain 90% workout attendance'
    ]
  },
  flexibility_mobility: {
    type: 'flexibility_mobility',
    name: 'Flexibility & Mobility',
    description: 'Improve flexibility, mobility, and range of motion',
    unit: 'degrees',
    defaultTarget: 30,
    examples: [
      'Improve shoulder mobility by 30 degrees',
      'Touch toes without bending knees',
      'Hold a deep squat for 2 minutes',
      'Complete full overhead reach'
    ]
  }
};

export const getGoalTypeLabel = (type: GoalType): string => {
  return GOAL_TEMPLATES[type]?.name || type;
};

export const getGoalTypeUnit = (type: GoalType): string => {
  return GOAL_TEMPLATES[type]?.unit || '';
};
