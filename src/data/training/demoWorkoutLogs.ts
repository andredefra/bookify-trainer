import { WorkoutLog } from './workoutTypes';

export const demoWorkoutLogs: WorkoutLog[] = [
  {
    id: "demo-1",
    date: new Date().toISOString(),
    name: "Upper Body Strength",
    duration: "45 min",
    exercises: [
      {
        id: "ex-1",
        name: "Bench Press",
        exerciseDbId: "dumbbell-flat-press",
        difficulty: "intermediate",
        muscleGroups: ["Pectorals", "Triceps", "Anterior Deltoids"],
        equipment: ["Dumbbells", "Bench"],
        setsData: [
          { setNumber: 1, targetReps: "8-10", actualReps: 8, weight: 60, completed: true },
          { setNumber: 2, targetReps: "8-10", actualReps: 9, weight: 60, completed: true },
          { setNumber: 3, targetReps: "8-10", actualReps: 8, weight: 65, completed: true },
          { setNumber: 4, targetReps: "8-10", actualReps: 7, weight: 65, completed: true }
        ]
      },
      {
        id: "ex-2", 
        name: "Lat Pulldown",
        exerciseDbId: "lat-pulldown",
        difficulty: "beginner",
        muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Middle Trapezius"],
        equipment: ["Cable Machine", "Lat Pulldown"],
        setsData: [
          { setNumber: 1, targetReps: "10-12", actualReps: 12, weight: 50, completed: true },
          { setNumber: 2, targetReps: "10-12", actualReps: 11, weight: 55, completed: true },
          { setNumber: 3, targetReps: "10-12", actualReps: 10, weight: 55, completed: true }
        ]
      },
      {
        id: "ex-3",
        name: "Shoulder Press",
        exerciseDbId: "dumbbell-shoulder-press", 
        difficulty: "intermediate",
        muscleGroups: ["Anterior Deltoids", "Medial Deltoids", "Triceps"],
        equipment: ["Dumbbells"],
        setsData: [
          { setNumber: 1, targetReps: "8-12", actualReps: 10, weight: 15, completed: true },
          { setNumber: 2, targetReps: "8-12", actualReps: 9, weight: 15, completed: true },
          { setNumber: 3, targetReps: "8-12", actualReps: 8, weight: 17.5, completed: true }
        ]
      }
    ]
  },
  {
    id: "demo-2", 
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    name: "Leg Day",
    duration: "50 min",
    exercises: [
      {
        id: "ex-4",
        name: "Squats",
        exerciseDbId: "barbell-squat",
        difficulty: "intermediate", 
        muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
        equipment: ["Barbell"],
        setsData: [
          { setNumber: 1, targetReps: "8-10", actualReps: 10, weight: 70, completed: true },
          { setNumber: 2, targetReps: "8-10", actualReps: 9, weight: 75, completed: true },
          { setNumber: 3, targetReps: "8-10", actualReps: 8, weight: 80, completed: true },
          { setNumber: 4, targetReps: "8-10", actualReps: 8, weight: 80, completed: true }
        ]
      },
      {
        id: "ex-5",
        name: "Romanian Deadlift",
        exerciseDbId: "romanian-deadlift-dumbbell",
        difficulty: "advanced",
        muscleGroups: ["Hamstrings", "Glutes"],
        equipment: ["Dumbbells"],
        setsData: [
          { setNumber: 1, targetReps: "6-8", actualReps: 8, weight: 25, completed: true },
          { setNumber: 2, targetReps: "6-8", actualReps: 7, weight: 27.5, completed: true },
          { setNumber: 3, targetReps: "6-8", actualReps: 6, weight: 30, completed: true }
        ]
      },
      {
        id: "ex-6",
        name: "Leg Press",
        exerciseDbId: "45-degree-leg-press",
        difficulty: "beginner",
        muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
        equipment: ["45 Degree Leg Press Machine"],
        setsData: [
          { setNumber: 1, targetReps: "12-15", actualReps: 15, weight: 100, completed: true },
          { setNumber: 2, targetReps: "12-15", actualReps: 14, weight: 110, completed: true },
          { setNumber: 3, targetReps: "12-15", actualReps: 12, weight: 120, completed: true }
        ]
      }
    ]
  },
  {
    id: "demo-3",
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    name: "Full Body Circuit",
    duration: "60 min", 
    exercises: [
      {
        id: "ex-7",
        name: "Push-ups",
        exerciseDbId: "push-up",
        difficulty: "beginner",
        muscleGroups: ["Pectorals", "Triceps", "Core"],
        equipment: ["Bodyweight"],
        setsData: [
          { setNumber: 1, targetReps: "12-15", actualReps: 15, weight: 0, completed: true },
          { setNumber: 2, targetReps: "12-15", actualReps: 12, weight: 0, completed: true },
          { setNumber: 3, targetReps: "12-15", actualReps: 10, weight: 0, completed: true }
        ]
      },
      {
        id: "ex-8",
        name: "Cable Row",
        exerciseDbId: "seated-cable-row",
        difficulty: "intermediate",
        muscleGroups: ["Rhomboids", "Middle Trapezius", "Latissimus Dorsi"],
        equipment: ["Cable Machine", "Row Handle"],
        setsData: [
          { setNumber: 1, targetReps: "8-12", actualReps: 12, weight: 40, completed: true },
          { setNumber: 2, targetReps: "8-12", actualReps: 10, weight: 45, completed: true },
          { setNumber: 3, targetReps: "8-12", actualReps: 9, weight: 45, completed: true }
        ]
      }
    ]
  },
  // ===== Historical sessions (for progression comparison) =====
  {
    id: "demo-4",
    date: new Date(Date.now() - 7 * 86400000).toISOString(), // 7 days ago
    name: "Upper Body Strength",
    duration: "42 min",
    exercises: [
      {
        id: "ex-1b",
        name: "Bench Press",
        exerciseDbId: "dumbbell-flat-press",
        difficulty: "intermediate",
        muscleGroups: ["Pectorals", "Triceps", "Anterior Deltoids"],
        equipment: ["Dumbbells", "Bench"],
        setsData: [
          { setNumber: 1, targetReps: "8-10", actualReps: 8, weight: 57.5, completed: true },
          { setNumber: 2, targetReps: "8-10", actualReps: 8, weight: 57.5, completed: true },
          { setNumber: 3, targetReps: "8-10", actualReps: 7, weight: 62.5, completed: true },
          { setNumber: 4, targetReps: "8-10", actualReps: 6, weight: 62.5, completed: true }
        ]
      },
      {
        id: "ex-2b",
        name: "Lat Pulldown",
        exerciseDbId: "lat-pulldown",
        difficulty: "beginner",
        muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Middle Trapezius"],
        equipment: ["Cable Machine", "Lat Pulldown"],
        setsData: [
          { setNumber: 1, targetReps: "10-12", actualReps: 11, weight: 47.5, completed: true },
          { setNumber: 2, targetReps: "10-12", actualReps: 10, weight: 52.5, completed: true },
          { setNumber: 3, targetReps: "10-12", actualReps: 9, weight: 52.5, completed: true }
        ]
      },
      {
        id: "ex-3b",
        name: "Shoulder Press",
        exerciseDbId: "dumbbell-shoulder-press",
        difficulty: "intermediate",
        muscleGroups: ["Anterior Deltoids", "Medial Deltoids", "Triceps"],
        equipment: ["Dumbbells"],
        setsData: [
          { setNumber: 1, targetReps: "8-12", actualReps: 9, weight: 14, completed: true },
          { setNumber: 2, targetReps: "8-12", actualReps: 8, weight: 14, completed: true },
          { setNumber: 3, targetReps: "8-12", actualReps: 7, weight: 16, completed: true }
        ]
      }
    ]
  },
  {
    id: "demo-5",
    date: new Date(Date.now() - 8 * 86400000).toISOString(), // 8 days ago
    name: "Leg Day",
    duration: "48 min",
    exercises: [
      {
        id: "ex-4b",
        name: "Squats",
        exerciseDbId: "barbell-squat",
        difficulty: "intermediate",
        muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
        equipment: ["Barbell"],
        setsData: [
          { setNumber: 1, targetReps: "8-10", actualReps: 9, weight: 67.5, completed: true },
          { setNumber: 2, targetReps: "8-10", actualReps: 8, weight: 72.5, completed: true },
          { setNumber: 3, targetReps: "8-10", actualReps: 8, weight: 77.5, completed: true },
          { setNumber: 4, targetReps: "8-10", actualReps: 7, weight: 77.5, completed: true }
        ]
      },
      {
        id: "ex-5b",
        name: "Romanian Deadlift",
        exerciseDbId: "romanian-deadlift-dumbbell",
        difficulty: "advanced",
        muscleGroups: ["Hamstrings", "Glutes"],
        equipment: ["Dumbbells"],
        setsData: [
          { setNumber: 1, targetReps: "6-8", actualReps: 7, weight: 22.5, completed: true },
          { setNumber: 2, targetReps: "6-8", actualReps: 6, weight: 25, completed: true },
          { setNumber: 3, targetReps: "6-8", actualReps: 6, weight: 27.5, completed: true }
        ]
      },
      {
        id: "ex-6b",
        name: "Leg Press",
        exerciseDbId: "45-degree-leg-press",
        difficulty: "beginner",
        muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
        equipment: ["45 Degree Leg Press Machine"],
        setsData: [
          { setNumber: 1, targetReps: "12-15", actualReps: 14, weight: 95, completed: true },
          { setNumber: 2, targetReps: "12-15", actualReps: 13, weight: 105, completed: true },
          { setNumber: 3, targetReps: "12-15", actualReps: 12, weight: 115, completed: true }
        ]
      }
    ]
  },
  {
    id: "demo-6",
    date: new Date(Date.now() - 14 * 86400000).toISOString(), // 14 days ago
    name: "Upper Body Strength",
    duration: "40 min",
    exercises: [
      {
        id: "ex-1c",
        name: "Bench Press",
        exerciseDbId: "dumbbell-flat-press",
        difficulty: "intermediate",
        muscleGroups: ["Pectorals", "Triceps", "Anterior Deltoids"],
        equipment: ["Dumbbells", "Bench"],
        setsData: [
          { setNumber: 1, targetReps: "8-10", actualReps: 7, weight: 55, completed: true },
          { setNumber: 2, targetReps: "8-10", actualReps: 7, weight: 55, completed: true },
          { setNumber: 3, targetReps: "8-10", actualReps: 6, weight: 60, completed: true },
          { setNumber: 4, targetReps: "8-10", actualReps: 6, weight: 60, completed: true }
        ]
      },
      {
        id: "ex-2c",
        name: "Lat Pulldown",
        exerciseDbId: "lat-pulldown",
        difficulty: "beginner",
        muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Middle Trapezius"],
        equipment: ["Cable Machine", "Lat Pulldown"],
        setsData: [
          { setNumber: 1, targetReps: "10-12", actualReps: 10, weight: 45, completed: true },
          { setNumber: 2, targetReps: "10-12", actualReps: 10, weight: 50, completed: true },
          { setNumber: 3, targetReps: "10-12", actualReps: 8, weight: 50, completed: true }
        ]
      }
    ]
  },
  // ===== Extended history spanning several months (auto-generated patterns) =====
  ...([21, 24, 28, 31, 35, 42, 49, 56, 63, 70, 80, 95, 110, 130, 150, 175, 200].flatMap((daysAgo, idx) => {
    const base = Date.now() - daysAgo * 86400000;
    const variant = idx % 2;
    if (variant === 0) {
      return [{
        id: `demo-hist-u-${daysAgo}`,
        date: new Date(base).toISOString(),
        name: "Upper Body Strength",
        duration: `${38 + (idx % 6)} min`,
        exercises: [
          {
            id: `ex-h1-${daysAgo}`,
            name: "Bench Press",
            exerciseDbId: "dumbbell-flat-press",
            difficulty: "intermediate",
            muscleGroups: ["Pectorals", "Triceps", "Anterior Deltoids"],
            equipment: ["Dumbbells", "Bench"],
            setsData: [
              { setNumber: 1, targetReps: "8-10", actualReps: 7, weight: Math.max(40, 55 - Math.floor(daysAgo / 14)), completed: true },
              { setNumber: 2, targetReps: "8-10", actualReps: 7, weight: Math.max(40, 55 - Math.floor(daysAgo / 14)), completed: true },
              { setNumber: 3, targetReps: "8-10", actualReps: 6, weight: Math.max(45, 60 - Math.floor(daysAgo / 14)), completed: true },
            ],
          },
          {
            id: `ex-h2-${daysAgo}`,
            name: "Lat Pulldown",
            exerciseDbId: "lat-pulldown",
            difficulty: "beginner",
            muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Middle Trapezius"],
            equipment: ["Cable Machine", "Lat Pulldown"],
            setsData: [
              { setNumber: 1, targetReps: "10-12", actualReps: 10, weight: Math.max(35, 45 - Math.floor(daysAgo / 18)), completed: true },
              { setNumber: 2, targetReps: "10-12", actualReps: 9, weight: Math.max(40, 50 - Math.floor(daysAgo / 18)), completed: true },
              { setNumber: 3, targetReps: "10-12", actualReps: 8, weight: Math.max(40, 50 - Math.floor(daysAgo / 18)), completed: true },
            ],
          },
        ],
      }];
    }
    return [{
      id: `demo-hist-l-${daysAgo}`,
      date: new Date(base).toISOString(),
      name: "Leg Day",
      duration: `${44 + (idx % 5)} min`,
      exercises: [
        {
          id: `ex-h3-${daysAgo}`,
          name: "Squats",
          exerciseDbId: "barbell-squat",
          difficulty: "intermediate",
          muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
          equipment: ["Barbell"],
          setsData: [
            { setNumber: 1, targetReps: "8-10", actualReps: 9, weight: Math.max(50, 65 - Math.floor(daysAgo / 14)), completed: true },
            { setNumber: 2, targetReps: "8-10", actualReps: 8, weight: Math.max(55, 70 - Math.floor(daysAgo / 14)), completed: true },
            { setNumber: 3, targetReps: "8-10", actualReps: 8, weight: Math.max(60, 75 - Math.floor(daysAgo / 14)), completed: true },
          ],
        },
        {
          id: `ex-h4-${daysAgo}`,
          name: "Leg Press",
          exerciseDbId: "45-degree-leg-press",
          difficulty: "beginner",
          muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
          equipment: ["45 Degree Leg Press Machine"],
          setsData: [
            { setNumber: 1, targetReps: "12-15", actualReps: 14, weight: Math.max(70, 90 - Math.floor(daysAgo / 12)), completed: true },
            { setNumber: 2, targetReps: "12-15", actualReps: 12, weight: Math.max(80, 100 - Math.floor(daysAgo / 12)), completed: true },
          ],
        },
      ],
    }];
  }) as WorkoutLog[])
];
