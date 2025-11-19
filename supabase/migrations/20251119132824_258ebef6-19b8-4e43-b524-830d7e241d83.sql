-- Fix training program data structure for both packages
-- The "sets" field should be a number, not an array
-- Individual set data should go in "setsData" array

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
      "sessionNumber": 1,
      "title": "Session 1: Upper Body Power",
      "completed": true,
      "completedDate": "2024-01-15",
      "exercises": [
        {
          "id": "ex-1-1",
          "name": "Bench Press",
          "sets": 3,
          "reps": "8",
          "weight": 85,
          "notes": "Focus on controlled descent",
          "setsData": [
            {"setNumber": 1, "targetReps": "8", "actualReps": 8, "weight": 80, "completed": true},
            {"setNumber": 2, "targetReps": "8", "actualReps": 8, "weight": 85, "completed": true},
            {"setNumber": 3, "targetReps": "8", "actualReps": 6, "weight": 90, "completed": true}
          ]
        },
        {
          "id": "ex-1-2",
          "name": "Overhead Press",
          "sets": 3,
          "reps": "8-10",
          "weight": 55,
          "setsData": [
            {"setNumber": 1, "targetReps": "10", "actualReps": 10, "weight": 50, "completed": true},
            {"setNumber": 2, "targetReps": "8", "actualReps": 8, "weight": 55, "completed": true},
            {"setNumber": 3, "targetReps": "8", "actualReps": 8, "weight": 55, "completed": true}
          ]
        },
        {
          "id": "ex-1-3",
          "name": "Pull-ups",
          "sets": 3,
          "reps": "8",
          "weight": 0,
          "notes": "Bodyweight only",
          "setsData": [
            {"setNumber": 1, "targetReps": "8", "actualReps": 8, "weight": 0, "completed": true},
            {"setNumber": 2, "targetReps": "8", "actualReps": 7, "weight": 0, "completed": true},
            {"setNumber": 3, "targetReps": "8", "actualReps": 6, "weight": 0, "completed": true}
          ]
        }
      ]
    },
    {
      "id": "session-2",
      "sessionNumber": 2,
      "title": "Session 2: Lower Body Strength",
      "completed": true,
      "completedDate": "2024-01-17",
      "exercises": [
        {
          "id": "ex-2-1",
          "name": "Squats",
          "sets": 3,
          "reps": "8",
          "weight": 110,
          "notes": "Keep chest up, depth to parallel",
          "setsData": [
            {"setNumber": 1, "targetReps": "8", "actualReps": 8, "weight": 100, "completed": true},
            {"setNumber": 2, "targetReps": "8", "actualReps": 8, "weight": 110, "completed": true},
            {"setNumber": 3, "targetReps": "8", "actualReps": 6, "weight": 120, "completed": true}
          ]
        },
        {
          "id": "ex-2-2",
          "name": "Romanian Deadlifts",
          "sets": 3,
          "reps": "10",
          "weight": 90,
          "setsData": [
            {"setNumber": 1, "targetReps": "10", "actualReps": 10, "weight": 80, "completed": true},
            {"setNumber": 2, "targetReps": "10", "actualReps": 10, "weight": 90, "completed": true},
            {"setNumber": 3, "targetReps": "10", "actualReps": 8, "weight": 95, "completed": true}
          ]
        },
        {
          "id": "ex-2-3",
          "name": "Leg Press",
          "sets": 3,
          "reps": "12",
          "weight": 160,
          "setsData": [
            {"setNumber": 1, "targetReps": "12", "actualReps": 12, "weight": 150, "completed": true},
            {"setNumber": 2, "targetReps": "12", "actualReps": 12, "weight": 160, "completed": true},
            {"setNumber": 3, "targetReps": "12", "actualReps": 10, "weight": 170, "completed": true}
          ]
        }
      ]
    },
    {
      "id": "session-3",
      "sessionNumber": 3,
      "title": "Session 3: Push Day",
      "completed": false,
      "exercises": [
        {
          "id": "ex-3-1",
          "name": "Incline Dumbbell Press",
          "sets": 3,
          "reps": "10",
          "weight": 32,
          "notes": "30-45 degree incline"
        },
        {
          "id": "ex-3-2",
          "name": "Dips",
          "sets": 3,
          "reps": "10-12",
          "weight": 0,
          "notes": "Bodyweight, can add weight if needed"
        },
        {
          "id": "ex-3-3",
          "name": "Lateral Raises",
          "sets": 3,
          "reps": "15",
          "weight": 12,
          "notes": "Control the weight, no swinging"
        }
      ]
    },
    {
      "id": "session-4",
      "sessionNumber": 4,
      "title": "Session 4: Pull Day",
      "completed": false,
      "exercises": [
        {
          "id": "ex-4-1",
          "name": "Deadlifts",
          "sets": 3,
          "reps": "5",
          "weight": 150,
          "notes": "Heavy weight, perfect form"
        },
        {
          "id": "ex-4-2",
          "name": "Bent Over Rows",
          "sets": 3,
          "reps": "10",
          "weight": 75
        },
        {
          "id": "ex-4-3",
          "name": "Face Pulls",
          "sets": 3,
          "reps": "15",
          "weight": 30,
          "notes": "Focus on rear delts"
        }
      ]
    },
    {
      "id": "session-5",
      "sessionNumber": 5,
      "title": "Session 5: Legs & Core",
      "completed": false,
      "exercises": [
        {
          "id": "ex-5-1",
          "name": "Front Squats",
          "sets": 3,
          "reps": "8",
          "weight": 85
        },
        {
          "id": "ex-5-2",
          "name": "Walking Lunges",
          "sets": 3,
          "reps": "12",
          "weight": 22
        },
        {
          "id": "ex-5-3",
          "name": "Planks",
          "sets": 3,
          "reps": "60",
          "repsUnit": "sec",
          "weight": 0
        }
      ]
    },
    {
      "id": "session-6",
      "sessionNumber": 6,
      "title": "Session 6: Full Body Power",
      "completed": false,
      "exercises": [
        {
          "id": "ex-6-1",
          "name": "Power Cleans",
          "sets": 3,
          "reps": "5",
          "weight": 65,
          "notes": "Explosive movement"
        },
        {
          "id": "ex-6-2",
          "name": "Push Press",
          "sets": 3,
          "reps": "8",
          "weight": 55
        },
        {
          "id": "ex-6-3",
          "name": "Box Jumps",
          "sets": 3,
          "reps": "10",
          "weight": 0
        }
      ]
    },
    {
      "id": "session-7",
      "sessionNumber": 7,
      "title": "Session 7: Upper Body Hypertrophy",
      "completed": false,
      "exercises": [
        {
          "id": "ex-7-1",
          "name": "Cable Flyes",
          "sets": 3,
          "reps": "12",
          "weight": 25
        },
        {
          "id": "ex-7-2",
          "name": "Hammer Curls",
          "sets": 3,
          "reps": "12",
          "weight": 18
        },
        {
          "id": "ex-7-3",
          "name": "Tricep Extensions",
          "sets": 3,
          "reps": "15",
          "weight": 30
        }
      ]
    },
    {
      "id": "session-8",
      "sessionNumber": 8,
      "title": "Session 8: Lower Body Hypertrophy",
      "completed": false,
      "exercises": [
        {
          "id": "ex-8-1",
          "name": "Leg Extensions",
          "sets": 3,
          "reps": "15",
          "weight": 75
        },
        {
          "id": "ex-8-2",
          "name": "Leg Curls",
          "sets": 3,
          "reps": "15",
          "weight": 65
        },
        {
          "id": "ex-8-3",
          "name": "Calf Raises",
          "sets": 3,
          "reps": "20",
          "weight": 110
        }
      ]
    },
    {
      "id": "session-9",
      "sessionNumber": 9,
      "title": "Session 9: Athletic Performance",
      "completed": false,
      "exercises": [
        {
          "id": "ex-9-1",
          "name": "Hang Cleans",
          "sets": 3,
          "reps": "5",
          "weight": 60
        },
        {
          "id": "ex-9-2",
          "name": "Plyometric Push-ups",
          "sets": 3,
          "reps": "8",
          "weight": 0
        },
        {
          "id": "ex-9-3",
          "name": "Medicine Ball Slams",
          "sets": 3,
          "reps": "12",
          "weight": 10
        }
      ]
    },
    {
      "id": "session-10",
      "sessionNumber": 10,
      "title": "Session 10: Strength Endurance",
      "completed": false,
      "exercises": [
        {
          "id": "ex-10-1",
          "name": "Kettlebell Swings",
          "sets": 3,
          "reps": "20",
          "weight": 24
        },
        {
          "id": "ex-10-2",
          "name": "Burpees",
          "sets": 3,
          "reps": "15",
          "weight": 0
        },
        {
          "id": "ex-10-3",
          "name": "Mountain Climbers",
          "sets": 3,
          "reps": "30",
          "weight": 0
        }
      ]
    },
    {
      "id": "session-11",
      "sessionNumber": 11,
      "title": "Session 11: Core & Stability",
      "completed": false,
      "exercises": [
        {
          "id": "ex-11-1",
          "name": "Ab Wheel Rollouts",
          "sets": 3,
          "reps": "10",
          "weight": 0
        },
        {
          "id": "ex-11-2",
          "name": "Side Planks",
          "sets": 3,
          "reps": "45",
          "repsUnit": "sec",
          "weight": 0
        },
        {
          "id": "ex-11-3",
          "name": "Russian Twists",
          "sets": 3,
          "reps": "20",
          "weight": 15
        }
      ]
    },
    {
      "id": "session-12",
      "sessionNumber": 12,
      "title": "Session 12: Full Body Conditioning",
      "completed": false,
      "exercises": [
        {
          "id": "ex-12-1",
          "name": "Thrusters",
          "sets": 3,
          "reps": "12",
          "weight": 45
        },
        {
          "id": "ex-12-2",
          "name": "Rowing Machine",
          "sets": 3,
          "reps": "500",
          "repsUnit": "m",
          "weight": 0
        },
        {
          "id": "ex-12-3",
          "name": "Battle Ropes",
          "sets": 3,
          "reps": "30",
          "repsUnit": "sec",
          "weight": 0
        }
      ]
    }
  ]
}'::jsonb
WHERE id IN ('aaaa0002-0000-0000-0000-000000000002', 'aaaa0001-0000-0000-0000-000000000001');