// MET (Metabolic Equivalent of Task) values for cardio exercises
// Based on Compendium of Physical Activities
// Formula: Calories = MET × weight(kg) × duration(hours)

export interface CardioMETMapping {
  exerciseId: string;
  exerciseName: string;
  environment: 'indoor' | 'outdoor';
  metValues: {
    light: number;
    moderate: number;
    vigorous: number;
  };
}

export const CARDIO_MET_VALUES: CardioMETMapping[] = [
  // Running variations
  {
    exerciseId: "treadmill-running",
    exerciseName: "Treadmill Running",
    environment: 'indoor',
    metValues: {
      light: 6.0,      // Jogging, slow pace (4-5 mph)
      moderate: 9.0,   // Running (6-7 mph)
      vigorous: 12.5   // Fast running (8+ mph)
    }
  },
  {
    exerciseId: "outdoor-running",
    exerciseName: "Outdoor Running",
    environment: 'outdoor',
    metValues: {
      light: 6.5,
      moderate: 9.5,
      vigorous: 13.0
    }
  },
  
  // Cycling variations
  {
    exerciseId: "stationary-bike",
    exerciseName: "Stationary Bike",
    environment: 'indoor',
    metValues: {
      light: 3.5,      // Light effort (<10 mph)
      moderate: 6.8,   // Moderate effort (10-14 mph)
      vigorous: 10.0   // Vigorous effort (14-16 mph)
    }
  },
  {
    exerciseId: "spinning-bike",
    exerciseName: "Spinning Bike",
    environment: 'indoor',
    metValues: {
      light: 5.0,
      moderate: 8.5,
      vigorous: 12.0
    }
  },
  {
    exerciseId: "outdoor-cycling",
    exerciseName: "Outdoor Cycling",
    environment: 'outdoor',
    metValues: {
      light: 4.0,
      moderate: 8.0,
      vigorous: 12.0
    }
  },
  
  // Walking variations
  {
    exerciseId: "treadmill-walking",
    exerciseName: "Treadmill Walking",
    environment: 'indoor',
    metValues: {
      light: 2.5,      // Slow walking (2 mph)
      moderate: 3.5,   // Normal pace (3-4 mph)
      vigorous: 5.0    // Brisk walking (4.5+ mph)
    }
  },
  {
    exerciseId: "outdoor-walking",
    exerciseName: "Outdoor Walking",
    environment: 'outdoor',
    metValues: {
      light: 2.8,
      moderate: 4.0,
      vigorous: 5.5
    }
  },
  {
    exerciseId: "incline-walking",
    exerciseName: "Incline Walking",
    environment: 'indoor',
    metValues: {
      light: 4.5,
      moderate: 6.0,
      vigorous: 8.0
    }
  },
  
  // Stairs and steppers
  {
    exerciseId: "stair-climber",
    exerciseName: "Stair Climber Machine",
    environment: 'indoor',
    metValues: {
      light: 5.0,
      moderate: 8.0,
      vigorous: 11.0
    }
  },
  {
    exerciseId: "stair-stepper",
    exerciseName: "Stair Stepper",
    environment: 'indoor',
    metValues: {
      light: 4.5,
      moderate: 7.0,
      vigorous: 9.5
    }
  },
  {
    exerciseId: "climbing-stairs",
    exerciseName: "Climbing Stairs",
    environment: 'outdoor',
    metValues: {
      light: 4.0,
      moderate: 8.0,
      vigorous: 12.0
    }
  },
  
  // Elliptical and cross-trainers
  {
    exerciseId: "elliptical",
    exerciseName: "Elliptical Machine",
    environment: 'indoor',
    metValues: {
      light: 4.0,
      moderate: 5.0,
      vigorous: 7.0
    }
  },
  {
    exerciseId: "cross-trainer",
    exerciseName: "Cross Trainer",
    environment: 'indoor',
    metValues: {
      light: 4.5,
      moderate: 6.0,
      vigorous: 8.0
    }
  },
  
  // Rowing
  {
    exerciseId: "rowing-machine",
    exerciseName: "Rowing Machine",
    environment: 'indoor',
    metValues: {
      light: 4.8,
      moderate: 7.0,
      vigorous: 12.0
    }
  },
  
  // Swimming
  {
    exerciseId: "swimming-freestyle",
    exerciseName: "Swimming Freestyle",
    environment: 'indoor',
    metValues: {
      light: 5.8,
      moderate: 8.0,
      vigorous: 11.0
    }
  },
  {
    exerciseId: "swimming-backstroke",
    exerciseName: "Swimming Backstroke",
    environment: 'indoor',
    metValues: {
      light: 4.8,
      moderate: 7.0,
      vigorous: 9.5
    }
  },
  
  // Jump rope
  {
    exerciseId: "jump-rope",
    exerciseName: "Jump Rope",
    environment: 'indoor',
    metValues: {
      light: 8.0,
      moderate: 11.0,
      vigorous: 12.3
    }
  },
  
  // Outdoor running
  {
    exerciseId: "jogging-outdoor",
    exerciseName: "Jogging Outdoor",
    environment: 'outdoor',
    metValues: {
      light: 5.0,      // Flat terrain
      moderate: 6.5,   // Rolling hills
      vigorous: 8.0    // Steep inclines
    }
  },
  {
    exerciseId: "sprint-intervals",
    exerciseName: "Sprint Intervals",
    environment: 'outdoor',
    metValues: {
      light: 8.0,      // Recovery jog between sprints
      moderate: 10.0,  // Medium intensity sprints
      vigorous: 15.0   // All-out sprints
    }
  },
  {
    exerciseId: "trail-running",
    exerciseName: "Trail Running",
    environment: 'outdoor',
    metValues: {
      light: 6.5,      // Flat trails
      moderate: 9.0,   // Rolling hills
      vigorous: 12.5   // Steep mountain trails
    }
  },
  
  // Outdoor cycling
  {
    exerciseId: "road-cycling",
    exerciseName: "Road Cycling",
    environment: 'outdoor',
    metValues: {
      light: 5.0,      // <15 km/h
      moderate: 8.0,   // 15-25 km/h
      vigorous: 11.0   // >25 km/h
    }
  },
  {
    exerciseId: "mountain-biking",
    exerciseName: "Mountain Biking",
    environment: 'outdoor',
    metValues: {
      light: 6.0,      // Flat trails
      moderate: 9.0,   // Rolling hills
      vigorous: 14.0   // Steep climbs
    }
  },
  
  // Other outdoor activities
  {
    exerciseId: "hiking",
    exerciseName: "Hiking",
    environment: 'outdoor',
    metValues: {
      light: 4.0,      // Flat terrain
      moderate: 6.0,   // Hills with backpack
      vigorous: 8.5    // Steep mountain hiking
    }
  },
  {
    exerciseId: "outdoor-stairs",
    exerciseName: "Outdoor Stairs Running",
    environment: 'outdoor',
    metValues: {
      light: 6.0,
      moderate: 10.0,
      vigorous: 15.0
    }
  },
  
  // HIIT and intervals
  {
    exerciseId: "hiit-training",
    exerciseName: "HIIT Training",
    environment: 'indoor',
    metValues: {
      light: 8.0,
      moderate: 10.0,
      vigorous: 12.5
    }
  },
  {
    exerciseId: "burpees",
    exerciseName: "Burpees",
    environment: 'indoor',
    metValues: {
      light: 6.0,
      moderate: 8.0,
      vigorous: 10.0
    }
  }
];

// Helper function to get MET value for a specific exercise and intensity
export const getCardioMETValue = (
  exerciseId: string,
  intensity: 'light' | 'moderate' | 'vigorous' = 'moderate'
): number => {
  const exercise = CARDIO_MET_VALUES.find(e => e.exerciseId === exerciseId);
  
  if (exercise) {
    return exercise.metValues[intensity];
  }
  
  // Default moderate cardio MET if exercise not found
  return 6.0;
};

// Helper function to get all cardio exercise IDs
export const getAllCardioExerciseIds = (): string[] => {
  return CARDIO_MET_VALUES.map(e => e.exerciseId);
};

// Helper function to check if an exercise is a cardio exercise
export const isCardioExercise = (exerciseId: string): boolean => {
  return CARDIO_MET_VALUES.some(e => e.exerciseId === exerciseId);
};
