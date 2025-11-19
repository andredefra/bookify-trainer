// MET values for strength training categories
// Based on muscle groups and exercise complexity

export interface StrengthMETCategory {
  category: string;
  muscleGroups: string[];
  metValues: {
    compound: number;  // Multi-joint exercises
    isolation: number; // Single-joint exercises
  };
}

export const STRENGTH_MET_CATEGORIES: StrengthMETCategory[] = [
  {
    category: "legs",
    muscleGroups: ["Quadriceps", "Glutes", "Hamstrings", "Calves", "Hip Abductors", "Hip Adductors"],
    metValues: {
      compound: 6.0,   // Squats, Deadlifts, Leg Press
      isolation: 4.0   // Leg Extensions, Leg Curls
    }
  },
  {
    category: "back",
    muscleGroups: ["Lats", "Rhomboids", "Trapezius", "Erector Spinae", "Lower Back"],
    metValues: {
      compound: 5.5,   // Rows, Pull-ups, Deadlifts
      isolation: 4.0   // Lat Pulldowns, Face Pulls
    }
  },
  {
    category: "chest",
    muscleGroups: ["Pectoralis Major", "Pectoralis Minor", "Chest"],
    metValues: {
      compound: 5.0,   // Bench Press, Push-ups
      isolation: 3.5   // Cable Flies, Pec Deck
    }
  },
  {
    category: "shoulders",
    muscleGroups: ["Deltoids", "Anterior Deltoid", "Lateral Deltoid", "Posterior Deltoid", "Rotator Cuff"],
    metValues: {
      compound: 4.5,   // Overhead Press, Arnold Press
      isolation: 3.5   // Lateral Raises, Front Raises
    }
  },
  {
    category: "arms",
    muscleGroups: ["Biceps", "Triceps", "Forearms", "Brachialis"],
    metValues: {
      compound: 4.0,   // Close-Grip Bench, Chin-ups
      isolation: 3.5   // Bicep Curls, Tricep Extensions
    }
  },
  {
    category: "core",
    muscleGroups: ["Rectus Abdominis", "Obliques", "Transverse Abdominis", "Core", "Abs"],
    metValues: {
      compound: 4.0,   // Planks, Dead Bugs
      isolation: 3.5   // Crunches, Leg Raises
    }
  }
];

// Helper function to determine if an exercise is compound or isolation
export const isCompoundExercise = (muscleGroups: string[]): boolean => {
  // Compound exercises typically work 2+ muscle groups
  return muscleGroups.length >= 2;
};

// Helper function to get MET value based on muscle groups
export const getStrengthMETValue = (muscleGroups: string[]): number => {
  const isCompound = isCompoundExercise(muscleGroups);
  
  // Find the category with the most matching muscle groups
  let bestMatch: StrengthMETCategory | null = null;
  let maxMatches = 0;
  
  for (const category of STRENGTH_MET_CATEGORIES) {
    const matches = muscleGroups.filter(mg => 
      category.muscleGroups.some(cmg => 
        cmg.toLowerCase().includes(mg.toLowerCase()) || 
        mg.toLowerCase().includes(cmg.toLowerCase())
      )
    ).length;
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = category;
    }
  }
  
  if (bestMatch) {
    return isCompound ? bestMatch.metValues.compound : bestMatch.metValues.isolation;
  }
  
  // Default to moderate strength training MET
  return 5.0;
};

// Helper function to get muscle group size multiplier
export const getMuscleGroupMultiplier = (muscleGroups: string[]): number => {
  // Large muscle groups burn more calories
  const largeGroups = [
    'Quadriceps', 'Glutes', 'Hamstrings', 'Back', 'Lats', 
    'Trapezius', 'Erector Spinae', 'Chest', 'Pectoralis Major'
  ];
  
  const hasLargeGroup = muscleGroups.some(mg =>
    largeGroups.some(lg => 
      mg.toLowerCase().includes(lg.toLowerCase()) || 
      lg.toLowerCase().includes(mg.toLowerCase())
    )
  );
  
  return hasLargeGroup ? 1.15 : 1.0;
};
