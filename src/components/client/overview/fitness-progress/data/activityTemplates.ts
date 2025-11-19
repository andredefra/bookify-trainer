import { ActivityType } from "../types";

export const PREDEFINED_ACTIVITY_TYPES: ActivityType[] = [
  {
    id: "general",
    title: "General Activity",
    description: "Track general fitness activities like steps, active minutes, or calories",
    icon: "Activity",
    isCustom: false,
    fields: [
      {
        name: "steps",
        label: "Steps",
        type: "number",
        unit: "steps",
        required: false,
        placeholder: "10000",
        min: 0
      },
      {
        name: "minutes",
        label: "Active Minutes",
        type: "number",
        unit: "mins",
        required: false,
        placeholder: "30",
        min: 0
      },
      {
        name: "calories",
        label: "Calories Burned",
        type: "number",
        unit: "kcal",
        required: false,
        placeholder: "200",
        min: 0
      }
    ],
    calorieCalculation: {
      method: "fixed",
      value: 0
    },
    goalImpacts: [
      {
        goalType: "activity_level",
        unitMapping: "steps",
        calculation: "add",
        sourceField: "steps"
      },
      {
        goalType: "activity_level",
        unitMapping: "mins",
        calculation: "add",
        sourceField: "minutes"
      },
      {
        goalType: "activity_level",
        unitMapping: "kcal",
        calculation: "add",
        sourceField: "calories"
      }
    ]
  },
  {
    id: "cardio",
    title: "Cardio Exercise",
    description: "Track cardiovascular activities like running, cycling, or swimming",
    icon: "Heart",
    isCustom: false,
    fields: [
      {
        name: "distance",
        label: "Distance (km)",
        type: "number",
        unit: "km",
        required: false,
        placeholder: "5.0",
        min: 0,
        step: 0.1
      },
      {
        name: "cardioMinutes",
        label: "Duration (minutes)",
        type: "number",
        unit: "mins",
        required: false,
        placeholder: "30",
        min: 0
      }
    ],
    calorieCalculation: {
      method: "per-minute",
      value: 8
    },
    goalImpacts: [
      {
        goalType: "cardiovascular_endurance",
        unitMapping: "km",
        calculation: "add",
        sourceField: "distance"
      },
      {
        goalType: "cardiovascular_endurance",
        unitMapping: "mins",
        calculation: "add",
        sourceField: "cardioMinutes"
      }
    ]
  },
  {
    id: "strength",
    title: "Strength Training",
    description: "Track strength exercises with weight, sets, and reps",
    icon: "Dumbbell",
    isCustom: false,
    fields: [
      {
        name: "exerciseName",
        label: "Exercise Name",
        type: "text",
        required: false,
        placeholder: "Bench Press"
      },
      {
        name: "strengthWeight",
        label: "Weight (kg)",
        type: "number",
        unit: "kg",
        required: false,
        placeholder: "80",
        min: 0,
        step: 0.5
      },
      {
        name: "sets",
        label: "Sets",
        type: "number",
        required: false,
        placeholder: "3",
        min: 1
      },
      {
        name: "reps",
        label: "Reps",
        type: "number",
        required: false,
        placeholder: "10",
        min: 1
      }
    ],
    calorieCalculation: {
      method: "per-minute",
      value: 6
    },
    goalImpacts: [
      {
        goalType: "strength_progress",
        unitMapping: "kg",
        calculation: "max",
        sourceField: "strengthWeight"
      }
    ]
  },
  {
    id: "yoga",
    title: "Yoga",
    description: "Track yoga sessions with duration and intensity",
    icon: "Sparkles",
    isCustom: false,
    fields: [
      {
        name: "duration",
        label: "Duration (minutes)",
        type: "number",
        unit: "mins",
        required: true,
        placeholder: "60",
        min: 5
      },
      {
        name: "intensity",
        label: "Intensity Level",
        type: "select",
        required: true,
        options: ["Light", "Moderate", "Vigorous"]
      }
    ],
    calorieCalculation: {
      method: "met",
      metValue: 3.0
    },
    goalImpacts: [
      {
        goalType: "activity_level",
        unitMapping: "mins",
        calculation: "add",
        sourceField: "duration"
      }
    ]
  },
  {
    id: "swimming",
    title: "Swimming",
    description: "Track swimming sessions with distance and duration",
    icon: "Waves",
    isCustom: false,
    fields: [
      {
        name: "distance",
        label: "Distance (km)",
        type: "number",
        unit: "km",
        required: false,
        placeholder: "1.5",
        min: 0,
        step: 0.1
      },
      {
        name: "duration",
        label: "Duration (minutes)",
        type: "number",
        unit: "mins",
        required: true,
        placeholder: "45",
        min: 5
      }
    ],
    calorieCalculation: {
      method: "met",
      metValue: 8.0
    },
    goalImpacts: [
      {
        goalType: "cardiovascular_endurance",
        unitMapping: "km",
        calculation: "add",
        sourceField: "distance"
      },
      {
        goalType: "cardiovascular_endurance",
        unitMapping: "mins",
        calculation: "add",
        sourceField: "duration"
      }
    ]
  },
  {
    id: "hiit",
    title: "HIIT Workout",
    description: "High-Intensity Interval Training sessions",
    icon: "Zap",
    isCustom: false,
    fields: [
      {
        name: "duration",
        label: "Duration (minutes)",
        type: "number",
        unit: "mins",
        required: true,
        placeholder: "30",
        min: 5
      }
    ],
    calorieCalculation: {
      method: "met",
      metValue: 12.0
    },
    goalImpacts: [
      {
        goalType: "activity_level",
        unitMapping: "mins",
        calculation: "add",
        sourceField: "duration"
      }
    ]
  }
];

export const getAllActivityTypes = (): ActivityType[] => {
  // Load custom activity types from localStorage
  const customTypesJson = localStorage.getItem('fitness_custom_activity_types');
  const customTypes: ActivityType[] = customTypesJson ? JSON.parse(customTypesJson) : [];
  
  return [...PREDEFINED_ACTIVITY_TYPES, ...customTypes];
};

export const getActivityTypeById = (id: string): ActivityType | undefined => {
  return getAllActivityTypes().find(type => type.id === id);
};
