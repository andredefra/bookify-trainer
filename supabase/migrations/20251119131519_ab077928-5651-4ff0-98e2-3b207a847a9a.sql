-- Populate mock training program data for existing packages

-- Update "Complete Transformation" (hybrid) with Strength & Conditioning program
UPDATE client_packages 
SET training_program_data = '{
  "id": "prog-strength-conditioning",
  "title": "Strength & Conditioning Program",
  "week": "Week 1 of 8",
  "trainerName": "John Doe - Personal Trainer",
  "targetFrequency": 4,
  "totalSessions": 32,
  "duration": 8,
  "objective": "Build strength and improve conditioning",
  "description": "8-week program focusing on compound movements and metabolic conditioning",
  "isPaid": true,
  "price": 89.99,
  "sessions": [
    {
      "id": "session-1",
      "sessionNumber": 1,
      "title": "Upper Body Strength",
      "completed": false,
      "exercises": [
        {"id": "ex-1", "name": "Bench Press", "sets": 3, "reps": "8-10", "weight": 70, "notes": "Focus on controlled movement", "exerciseType": "strength"},
        {"id": "ex-2", "name": "Pull-ups", "sets": 3, "reps": "6-8", "notes": "Use assistance if needed", "exerciseType": "strength"},
        {"id": "ex-3", "name": "Overhead Press", "sets": 3, "reps": "8-10", "weight": 45, "notes": "Keep core tight", "exerciseType": "strength"}
      ]
    },
    {
      "id": "session-2",
      "sessionNumber": 2,
      "title": "Lower Body Power",
      "completed": false,
      "exercises": [
        {"id": "ex-4", "name": "Squats", "sets": 4, "reps": "6-8", "weight": 80, "notes": "Go below parallel", "exerciseType": "strength"},
        {"id": "ex-5", "name": "Romanian Deadlifts", "sets": 3, "reps": "8-10", "weight": 60, "notes": "Feel the stretch", "exerciseType": "strength"}
      ]
    },
    {
      "id": "session-3",
      "sessionNumber": 3,
      "title": "Push/Pull Circuit",
      "completed": false,
      "exercises": [
        {"id": "ex-6", "name": "Push-ups", "sets": 3, "reps": "12-15", "notes": "Modify if needed", "exerciseType": "strength"}
      ]
    },
    {
      "id": "session-4",
      "sessionNumber": 4,
      "title": "Full Body Conditioning",
      "completed": false,
      "exercises": [
        {"id": "ex-7", "name": "Burpees", "sets": 3, "reps": "10", "notes": "Rest 60 seconds", "exerciseType": "cardio"}
      ]
    }
  ]
}'::jsonb
WHERE title = 'Complete Transformation' AND package_type = 'hybrid';

-- Update "Beginner Fitness Program" (program_only) with Foundation Building program
UPDATE client_packages 
SET training_program_data = '{
  "id": "prog-beginner",
  "title": "Foundation Building",
  "week": "Week 1 of 12",
  "trainerName": "John Doe - Personal Trainer",
  "targetFrequency": 3,
  "totalSessions": 36,
  "duration": 12,
  "objective": "Build foundational strength and learn proper form",
  "description": "12-week beginner program focusing on movement patterns and building a solid base",
  "isPaid": true,
  "price": 69.99,
  "sessions": [
    {
      "id": "session-1",
      "sessionNumber": 1,
      "title": "Full Body Intro",
      "completed": false,
      "exercises": [
        {"id": "ex-1", "name": "Bodyweight Squats", "sets": 3, "reps": "10-12", "notes": "Focus on form", "exerciseType": "strength"},
        {"id": "ex-2", "name": "Push-ups", "sets": 3, "reps": "8-10", "notes": "Modify on knees if needed", "exerciseType": "strength"},
        {"id": "ex-3", "name": "Assisted Pull-ups", "sets": 3, "reps": "6-8", "notes": "Use band", "exerciseType": "strength"}
      ]
    },
    {
      "id": "session-2",
      "sessionNumber": 2,
      "title": "Core Stability",
      "completed": false,
      "exercises": [
        {"id": "ex-4", "name": "Plank", "sets": 3, "reps": "30 seconds", "notes": "Keep body straight", "exerciseType": "strength"},
        {"id": "ex-5", "name": "Dead Bug", "sets": 3, "reps": "10 each side", "notes": "Control movement", "exerciseType": "strength"}
      ]
    },
    {
      "id": "session-3",
      "sessionNumber": 3,
      "title": "Lower Body Basics",
      "completed": false,
      "exercises": [
        {"id": "ex-6", "name": "Goblet Squats", "sets": 3, "reps": "10-12", "weight": 15, "notes": "Chest up", "exerciseType": "strength"}
      ]
    }
  ]
}'::jsonb
WHERE title = 'Beginner Fitness Program' AND package_type = 'program_only';