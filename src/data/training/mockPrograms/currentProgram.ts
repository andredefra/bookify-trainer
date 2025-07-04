
import { TrainingProgram } from "../types";

export const currentProgram: TrainingProgram = {
  id: "prog-1",
  title: "Strength & Conditioning Program",
  week: "Week 1 of 8",
  trainerName: "Sarah Johnson",
  targetFrequency: 4, // 4 sessions per week
  totalSessions: 32, // 8 weeks × 4 sessions per week
  duration: 8,
  objective: "Build strength and improve conditioning",
  description: "A comprehensive 8-week program focusing on compound movements and metabolic conditioning",
  isPaid: true,
  price: 89.99,
  sessions: [
    {
      id: "session-1",
      sessionNumber: 1,
      title: "Upper Body Strength",
      completed: true,
      completedDate: "2024-03-10T10:30:00Z",
      exercises: [
        {
          id: "ex-1",
          name: "Bench Press",
          sets: 3,
          reps: "8-10",
          weight: 70,
          notes: "Focus on controlled movement",
          exerciseType: "strength"
        },
        {
          id: "ex-2",
          name: "Pull-ups",
          sets: 3,
          reps: "6-8",
          notes: "Use assistance if needed",
          exerciseType: "strength"
        },
        {
          id: "ex-3",
          name: "Overhead Press",
          sets: 3,
          reps: "8-10",
          weight: 45,
          notes: "Keep core tight",
          exerciseType: "strength"
        }
      ]
    },
    {
      id: "session-2",
      sessionNumber: 2,
      title: "Lower Body Power",
      completed: true,
      completedDate: "2024-03-12T14:15:00Z",
      exercises: [
        {
          id: "ex-4",
          name: "Squats",
          sets: 4,
          reps: "6-8",
          weight: 80,
          notes: "Go below parallel",
          exerciseType: "strength"
        },
        {
          id: "ex-5",
          name: "Romanian Deadlifts",
          sets: 3,
          reps: "8-10",
          weight: 60,
          notes: "Feel the stretch in hamstrings",
          exerciseType: "strength"
        },
        {
          id: "ex-6",
          name: "Bulgarian Split Squats",
          sets: 3,
          reps: "10 each leg",
          weight: 25,
          notes: "Focus on balance",
          exerciseType: "strength"
        }
      ]
    },
    {
      id: "session-3",
      sessionNumber: 3,
      title: "Push/Pull Circuit",
      completed: false,
      exercises: [
        {
          id: "ex-7",
          name: "Push-ups",
          sets: 3,
          reps: "12-15",
          notes: "Modify on knees if needed",
          exerciseType: "strength"
        },
        {
          id: "ex-8",
          name: "Bent-over Rows",
          sets: 3,
          reps: "10-12",
          weight: 35,
          notes: "Squeeze shoulder blades",
          exerciseType: "strength"
        },
        {
          id: "ex-9",
          name: "Dips",
          sets: 3,
          reps: "8-10",
          notes: "Use assistance if needed",
          exerciseType: "strength"
        }
      ]
    },
    {
      id: "session-4",
      sessionNumber: 4,
      title: "Full Body Conditioning",
      completed: false,
      exercises: [
        {
          id: "ex-10",
          name: "Burpees",
          sets: 3,
          reps: "10",
          notes: "Rest 60 seconds between sets",
          exerciseType: "cardio"
        },
        {
          id: "ex-11",
          name: "Mountain Climbers",
          sets: 3,
          reps: "20 each leg",
          notes: "Keep hips level",
          exerciseType: "cardio"
        },
        {
          id: "ex-12",
          name: "Plank",
          sets: 3,
          reps: "45 seconds",
          notes: "Keep body straight",
          exerciseType: "strength"
        }
      ]
    },
    // Adding more sessions to reach 32 total
    ...Array.from({ length: 28 }, (_, i) => ({
      id: `session-${i + 5}`,
      sessionNumber: i + 5,
      title: `Session ${i + 5}`,
      completed: false,
      exercises: [
        {
          id: `ex-${i + 13}`,
          name: "Placeholder Exercise",
          sets: 3,
          reps: "10",
          notes: "Exercise details to be configured",
          exerciseType: "strength" as const
        }
      ]
    }))
  ]
};
