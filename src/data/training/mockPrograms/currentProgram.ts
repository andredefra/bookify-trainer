
import { TrainingProgram } from '../types';

export const currentProgram: TrainingProgram = {
  id: "prog-1",
  title: "Strength & Conditioning",
  week: "May 20 - May 26",
  trainerName: "Sarah Johnson",
  days: [
    {
      id: "day-1",
      day: "Monday",
      completed: true,
      exercises: [
        {
          id: "ex-1",
          name: "Barbell Squat",
          sets: 4,
          reps: "8-10",
          weight: 75,
          notes: "Focus on depth and keep your chest up",
          videoUrl: "https://www.youtube.com/watch?v=ultWZbUMPL8",
          videoSource: "youtube"
        },
        {
          id: "ex-2",
          name: "Romanian Deadlift",
          sets: 3,
          reps: "10-12",
          weight: 65,
          notes: "Keep a slight bend in your knees",
          videoUrl: "https://vimeo.com/362756265",
          videoSource: "vimeo"
        },
        {
          id: "ex-3",
          name: "Walking Lunges",
          sets: 3,
          reps: "12 per leg",
          weight: 10
        }
      ]
    },
    {
      id: "day-2",
      day: "Tuesday",
      completed: true,
      exercises: [
        {
          id: "ex-4",
          name: "Bench Press",
          sets: 4,
          reps: "8",
          weight: 60,
          notes: "Keep shoulders retracted"
        },
        {
          id: "ex-5",
          name: "Seated Cable Rows",
          sets: 3,
          reps: "12",
          weight: 50
        },
        {
          id: "ex-6",
          name: "Dumbbell Lateral Raises",
          sets: 3,
          reps: "15",
          weight: 7.5
        }
      ]
    },
    {
      id: "day-3",
      day: "Wednesday",
      completed: false,
      exercises: [
        {
          id: "ex-7",
          name: "Rest Day",
          sets: 0,
          reps: "",
          notes: "Stay active with light walking or stretching"
        }
      ]
    },
    {
      id: "day-4",
      day: "Thursday",
      completed: false,
      exercises: [
        {
          id: "ex-8",
          name: "Pull-ups",
          sets: 4,
          reps: "6-8",
          notes: "Use assistance band if needed"
        },
        {
          id: "ex-9",
          name: "Barbell Overhead Press",
          sets: 3,
          reps: "8-10",
          weight: 40
        },
        {
          id: "ex-10",
          name: "Face Pulls",
          sets: 3,
          reps: "15",
          weight: 25,
          notes: "Focus on external rotation"
        }
      ]
    },
    {
      id: "day-5",
      day: "Friday",
      completed: false,
      exercises: [
        {
          id: "ex-11",
          name: "Deadlift",
          sets: 4,
          reps: "6",
          weight: 85,
          notes: "Focus on form over weight"
        },
        {
          id: "ex-12",
          name: "Leg Press",
          sets: 3,
          reps: "12",
          weight: 120
        },
        {
          id: "ex-13",
          name: "Calf Raises",
          sets: 4,
          reps: "20",
          weight: 40
        }
      ]
    },
    {
      id: "day-6",
      day: "Saturday",
      completed: false,
      exercises: [
        {
          id: "ex-14",
          name: "HIIT Cardio",
          sets: 10,
          reps: "30s work / 30s rest",
          notes: "Choose from: sprints, burpees, mountain climbers, jumping jacks"
        }
      ]
    },
    {
      id: "day-7",
      day: "Sunday",
      completed: false,
      exercises: [
        {
          id: "ex-15",
          name: "Active Recovery",
          sets: 1,
          reps: "30-45 min",
          notes: "Light walking, swimming, or yoga"
        }
      ]
    }
  ]
};
