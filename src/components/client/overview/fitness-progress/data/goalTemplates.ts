
import { GoalTemplate, GoalType } from "../types";
import { customGoalTypesService } from "../services/customGoalTypesService";

export const GOAL_TEMPLATES: Record<string, GoalTemplate> = {
  weight_management: {
    type: 'weight_management',
    name: 'Weight Management',
    description: 'Lose or gain weight within a specific timeframe',
    unit: 'kg',
    defaultTarget: 5,
    examplePlaceholder: 'E.g. Lose 5kg in 3 months',
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
    examplePlaceholder: 'E.g. Run 10km without stopping',
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
    examplePlaceholder: 'E.g. Bench press 80kg',
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
    examplePlaceholder: 'E.g. Walk 10,000 steps daily for 30 days',
    examples: [
      'Walk 10,000 steps daily for 30 days',
      'Burn 300 calories daily for 4 weeks',
      'Be active for 60 minutes daily'
    ]
  },
  body_composition: {
    type: 'body_composition',
    name: 'Body Composition',
    description: 'Achieve target body fat percentage or muscle mass',
    unit: '%',
    defaultTarget: 15,
    examplePlaceholder: 'E.g. Reach 15% body fat',
    examples: [
      'Reach 15% body fat',
      'Reduce body fat by 5%',
      'Increase muscle mass percentage',
      'Improve waist-to-hip ratio'
    ]
  }
};

export const getAllGoalTemplates = (): Record<string, GoalTemplate> => {
  const customTypes = customGoalTypesService.getCustomGoalTypes();
  const customTemplates: Record<string, GoalTemplate> = {};
  
  customTypes.forEach(custom => {
    customTemplates[custom.type] = {
      type: custom.type,
      name: custom.title,
      description: custom.guide,
      unit: custom.customUnit || custom.unit,
      defaultTarget: custom.defaultTarget,
      examplePlaceholder: custom.examplePlaceholder,
      examples: custom.examples || [],
      customUnit: custom.customUnit,
      isCustom: true
    };
  });
  
  return { ...GOAL_TEMPLATES, ...customTemplates };
};

export const getGoalTypeLabel = (type: GoalType): string => {
  const allTemplates = getAllGoalTemplates();
  return allTemplates[type]?.name || type;
};

export const getGoalTypeUnit = (type: GoalType): string => {
  const allTemplates = getAllGoalTemplates();
  return allTemplates[type]?.unit || '';
};
