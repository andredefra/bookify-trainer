
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
    description: 'Improve running distance or duration',
    unit: 'km',
    defaultTarget: 5,
    examples: [
      'Run 10km without stopping',
      'Complete a 5km run under 25 minutes',
      'Run for 30 minutes continuously'
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
      'Deadlift 120kg'
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
      'Be active for 60 minutes daily'
    ]
  },
  body_composition: {
    type: 'body_composition',
    name: 'Body Composition',
    description: 'Achieve target body fat percentage',
    unit: '%',
    defaultTarget: 15,
    examples: [
      'Reach 15% body fat',
      'Reduce body fat by 5%',
      'Increase muscle mass percentage'
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
      'Never miss more than 1 workout per week'
    ]
  }
};

export const getGoalTypeLabel = (type: GoalType): string => {
  return GOAL_TEMPLATES[type]?.name || type;
};

export const getGoalTypeUnit = (type: GoalType): string => {
  return GOAL_TEMPLATES[type]?.unit || '';
};
