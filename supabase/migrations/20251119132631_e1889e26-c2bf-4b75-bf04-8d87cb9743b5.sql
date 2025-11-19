-- Update Nutrition + Training Combo package with training program data
UPDATE client_packages
SET training_program_data = '{
  "title": "Strength & Conditioning Program",
  "week": "Week 1-4",
  "trainerName": "Alex Thompson",
  "targetFrequency": 4,
  "totalSessions": 12,
  "sessions": [
    {
      "id": "session-1",
      "title": "Session 1: Upper Body Power",
      "completed": true,
      "date": "2024-01-15",
      "exercises": [
        {
          "name": "Bench Press",
          "sets": [
            {"reps": 8, "weight": 80, "completed": true},
            {"reps": 8, "weight": 85, "completed": true},
            {"reps": 6, "weight": 90, "completed": true}
          ]
        },
        {
          "name": "Overhead Press",
          "sets": [
            {"reps": 10, "weight": 50, "completed": true},
            {"reps": 8, "weight": 55, "completed": true},
            {"reps": 8, "weight": 55, "completed": true}
          ]
        },
        {
          "name": "Pull-ups",
          "sets": [
            {"reps": 8, "weight": 0, "completed": true},
            {"reps": 7, "weight": 0, "completed": true},
            {"reps": 6, "weight": 0, "completed": true}
          ]
        }
      ]
    },
    {
      "id": "session-2",
      "title": "Session 2: Lower Body Strength",
      "completed": true,
      "date": "2024-01-17",
      "exercises": [
        {
          "name": "Squats",
          "sets": [
            {"reps": 8, "weight": 100, "completed": true},
            {"reps": 8, "weight": 110, "completed": true},
            {"reps": 6, "weight": 120, "completed": true}
          ]
        },
        {
          "name": "Romanian Deadlifts",
          "sets": [
            {"reps": 10, "weight": 80, "completed": true},
            {"reps": 10, "weight": 90, "completed": true},
            {"reps": 8, "weight": 95, "completed": true}
          ]
        },
        {
          "name": "Leg Press",
          "sets": [
            {"reps": 12, "weight": 150, "completed": true},
            {"reps": 12, "weight": 160, "completed": true},
            {"reps": 10, "weight": 170, "completed": true}
          ]
        }
      ]
    },
    {
      "id": "session-3",
      "title": "Session 3: Push Day",
      "completed": false,
      "exercises": [
        {
          "name": "Incline Dumbbell Press",
          "sets": [
            {"reps": 10, "weight": 30},
            {"reps": 10, "weight": 32},
            {"reps": 8, "weight": 35}
          ]
        },
        {
          "name": "Dips",
          "sets": [
            {"reps": 12, "weight": 0},
            {"reps": 10, "weight": 0},
            {"reps": 8, "weight": 0}
          ]
        },
        {
          "name": "Lateral Raises",
          "sets": [
            {"reps": 15, "weight": 12},
            {"reps": 15, "weight": 12},
            {"reps": 12, "weight": 14}
          ]
        }
      ]
    },
    {
      "id": "session-4",
      "title": "Session 4: Pull Day",
      "completed": false,
      "exercises": [
        {
          "name": "Deadlifts",
          "sets": [
            {"reps": 5, "weight": 140},
            {"reps": 5, "weight": 150},
            {"reps": 3, "weight": 160}
          ]
        },
        {
          "name": "Bent Over Rows",
          "sets": [
            {"reps": 10, "weight": 70},
            {"reps": 10, "weight": 75},
            {"reps": 8, "weight": 80}
          ]
        },
        {
          "name": "Face Pulls",
          "sets": [
            {"reps": 15, "weight": 30},
            {"reps": 15, "weight": 30},
            {"reps": 15, "weight": 30}
          ]
        }
      ]
    },
    {
      "id": "session-5",
      "title": "Session 5: Legs & Core",
      "completed": false,
      "exercises": [
        {
          "name": "Front Squats",
          "sets": [
            {"reps": 8, "weight": 80},
            {"reps": 8, "weight": 85},
            {"reps": 6, "weight": 90}
          ]
        },
        {
          "name": "Walking Lunges",
          "sets": [
            {"reps": 12, "weight": 20},
            {"reps": 12, "weight": 22},
            {"reps": 10, "weight": 24}
          ]
        },
        {
          "name": "Planks",
          "sets": [
            {"reps": 60, "weight": 0},
            {"reps": 60, "weight": 0},
            {"reps": 45, "weight": 0}
          ]
        }
      ]
    },
    {
      "id": "session-6",
      "title": "Session 6: Full Body Power",
      "completed": false,
      "exercises": [
        {
          "name": "Power Cleans",
          "sets": [
            {"reps": 5, "weight": 60},
            {"reps": 5, "weight": 65},
            {"reps": 3, "weight": 70}
          ]
        },
        {
          "name": "Push Press",
          "sets": [
            {"reps": 8, "weight": 50},
            {"reps": 8, "weight": 55},
            {"reps": 6, "weight": 60}
          ]
        },
        {
          "name": "Box Jumps",
          "sets": [
            {"reps": 10, "weight": 0},
            {"reps": 10, "weight": 0},
            {"reps": 8, "weight": 0}
          ]
        }
      ]
    },
    {
      "id": "session-7",
      "title": "Session 7: Upper Body Hypertrophy",
      "completed": false,
      "exercises": [
        {
          "name": "Cable Flyes",
          "sets": [
            {"reps": 12, "weight": 25},
            {"reps": 12, "weight": 25},
            {"reps": 10, "weight": 27}
          ]
        },
        {
          "name": "Hammer Curls",
          "sets": [
            {"reps": 12, "weight": 18},
            {"reps": 12, "weight": 18},
            {"reps": 10, "weight": 20}
          ]
        },
        {
          "name": "Tricep Extensions",
          "sets": [
            {"reps": 15, "weight": 30},
            {"reps": 15, "weight": 30},
            {"reps": 12, "weight": 32}
          ]
        }
      ]
    },
    {
      "id": "session-8",
      "title": "Session 8: Lower Body Hypertrophy",
      "completed": false,
      "exercises": [
        {
          "name": "Leg Extensions",
          "sets": [
            {"reps": 15, "weight": 70},
            {"reps": 15, "weight": 75},
            {"reps": 12, "weight": 80}
          ]
        },
        {
          "name": "Leg Curls",
          "sets": [
            {"reps": 15, "weight": 60},
            {"reps": 15, "weight": 65},
            {"reps": 12, "weight": 70}
          ]
        },
        {
          "name": "Calf Raises",
          "sets": [
            {"reps": 20, "weight": 100},
            {"reps": 20, "weight": 110},
            {"reps": 15, "weight": 120}
          ]
        }
      ]
    },
    {
      "id": "session-9",
      "title": "Session 9: Athletic Performance",
      "completed": false,
      "exercises": [
        {
          "name": "Hang Cleans",
          "sets": [
            {"reps": 5, "weight": 55},
            {"reps": 5, "weight": 60},
            {"reps": 3, "weight": 65}
          ]
        },
        {
          "name": "Plyometric Push-ups",
          "sets": [
            {"reps": 8, "weight": 0},
            {"reps": 8, "weight": 0},
            {"reps": 6, "weight": 0}
          ]
        },
        {
          "name": "Medicine Ball Slams",
          "sets": [
            {"reps": 12, "weight": 10},
            {"reps": 12, "weight": 10},
            {"reps": 10, "weight": 12}
          ]
        }
      ]
    },
    {
      "id": "session-10",
      "title": "Session 10: Strength Endurance",
      "completed": false,
      "exercises": [
        {
          "name": "Kettlebell Swings",
          "sets": [
            {"reps": 20, "weight": 24},
            {"reps": 20, "weight": 24},
            {"reps": 15, "weight": 28}
          ]
        },
        {
          "name": "Burpees",
          "sets": [
            {"reps": 15, "weight": 0},
            {"reps": 15, "weight": 0},
            {"reps": 12, "weight": 0}
          ]
        },
        {
          "name": "Mountain Climbers",
          "sets": [
            {"reps": 30, "weight": 0},
            {"reps": 30, "weight": 0},
            {"reps": 25, "weight": 0}
          ]
        }
      ]
    },
    {
      "id": "session-11",
      "title": "Session 11: Core & Stability",
      "completed": false,
      "exercises": [
        {
          "name": "Ab Wheel Rollouts",
          "sets": [
            {"reps": 10, "weight": 0},
            {"reps": 10, "weight": 0},
            {"reps": 8, "weight": 0}
          ]
        },
        {
          "name": "Side Planks",
          "sets": [
            {"reps": 45, "weight": 0},
            {"reps": 45, "weight": 0},
            {"reps": 30, "weight": 0}
          ]
        },
        {
          "name": "Russian Twists",
          "sets": [
            {"reps": 20, "weight": 15},
            {"reps": 20, "weight": 15},
            {"reps": 15, "weight": 20}
          ]
        }
      ]
    },
    {
      "id": "session-12",
      "title": "Session 12: Full Body Conditioning",
      "completed": false,
      "exercises": [
        {
          "name": "Thrusters",
          "sets": [
            {"reps": 12, "weight": 40},
            {"reps": 12, "weight": 45},
            {"reps": 10, "weight": 50}
          ]
        },
        {
          "name": "Rowing Machine",
          "sets": [
            {"reps": 500, "weight": 0},
            {"reps": 500, "weight": 0},
            {"reps": 400, "weight": 0}
          ]
        },
        {
          "name": "Battle Ropes",
          "sets": [
            {"reps": 30, "weight": 0},
            {"reps": 30, "weight": 0},
            {"reps": 20, "weight": 0}
          ]
        }
      ]
    }
  ]
}'::jsonb
WHERE id = 'aaaa0002-0000-0000-0000-000000000002';