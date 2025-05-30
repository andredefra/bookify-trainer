
import { TrainingProgram } from '../types';

export const previousProgram: TrainingProgram = {
  id: "prog-2",
  title: "Foundation Building",
  week: "May 13 - May 19",
  trainerName: "Sarah Johnson",
  targetFrequency: 3,
  totalSessions: 12,
  duration: 4,
  objective: "Build foundation strength",
  description: "A beginner-friendly 4-week program",
  isPaid: false,
  sessions: [
    {
      id: "session-1-prev",
      sessionNumber: 1,
      title: "Foundation Day 1",
      completed: true,
      completedDate: "2024-05-13T10:00:00Z",
      exercises: [
        {
          id: "ex-1-prev",
          name: "Bodyweight Squats",
          sets: 3,
          reps: "15",
          notes: "Focus on form",
          videoUrl: "https://www.youtube.com/watch?v=YaXPRqUwItQ",
          videoSource: "youtube"
        },
        {
          id: "ex-2-prev",
          name: "Push-ups",
          sets: 3,
          reps: "10-12",
          notes: "Knee push-ups if needed"
        }
      ]
    },
    {
      id: "session-2-prev",
      sessionNumber: 2,
      title: "Cardio Foundation",
      completed: true,
      completedDate: "2024-05-15T14:00:00Z",
      exercises: [
        {
          id: "ex-4-prev",
          name: "Treadmill Walking",
          sets: 1,
          reps: "30 min",
          notes: "Moderate pace"
        }
      ]
    },
    {
      id: "session-3-prev",
      sessionNumber: 3,
      title: "Recovery Session",
      completed: true,
      completedDate: "2024-05-17T09:00:00Z",
      exercises: [
        {
          id: "ex-7-prev",
          name: "Stretching Routine",
          sets: 1,
          reps: "20 min",
          notes: "Focus on flexibility and mobility"
        }
      ]
    },
    // Add more completed sessions to reach 12 total
    ...Array.from({ length: 9 }, (_, i) => ({
      id: `session-${i + 4}-prev`,
      sessionNumber: i + 4,
      title: `Foundation Session ${i + 4}`,
      completed: true,
      completedDate: `2024-05-${18 + i}T10:00:00Z`,
      exercises: [
        {
          id: `ex-${i + 8}-prev`,
          name: "Full Body Workout",
          sets: 3,
          reps: "12",
          notes: "Completed session"
        }
      ]
    }))
  ]
};

// Add a second previous program that's not completed
export const incompletePreviousProgram: TrainingProgram = {
  id: "prog-3",
  title: "Strength Development",
  week: "March 15 - April 12",
  trainerName: "Mike Rodriguez",
  targetFrequency: 4,
  totalSessions: 16,
  duration: 4,
  objective: "Increase overall strength",
  description: "Intermediate strength building program",
  isPaid: true,
  price: 65.99,
  sessions: [
    {
      id: "session-1-incomplete",
      sessionNumber: 1,
      title: "Upper Body Strength",
      completed: true,
      completedDate: "2024-03-15T10:00:00Z",
      exercises: [
        {
          id: "ex-1-incomplete",
          name: "Bench Press",
          sets: 4,
          reps: "8-10",
          weight: 75,
          notes: "Progressive overload"
        }
      ]
    },
    {
      id: "session-2-incomplete",
      sessionNumber: 2,
      title: "Lower Body Power",
      completed: true,
      completedDate: "2024-03-17T14:00:00Z",
      exercises: [
        {
          id: "ex-2-incomplete",
          name: "Squats",
          sets: 4,
          reps: "6-8",
          weight: 90,
          notes: "Focus on depth"
        }
      ]
    },
    {
      id: "session-3-incomplete",
      sessionNumber: 3,
      title: "Pull Day",
      completed: true,
      completedDate: "2024-03-19T11:00:00Z",
      exercises: [
        {
          id: "ex-3-incomplete",
          name: "Deadlifts",
          sets: 3,
          reps: "5",
          weight: 100,
          notes: "Perfect form"
        }
      ]
    },
    // Add 13 more sessions (incomplete)
    ...Array.from({ length: 13 }, (_, i) => ({
      id: `session-${i + 4}-incomplete`,
      sessionNumber: i + 4,
      title: `Session ${i + 4}`,
      completed: false,
      exercises: [
        {
          id: `ex-${i + 4}-incomplete`,
          name: "Planned Exercise",
          sets: 3,
          reps: "10",
          notes: "Not completed yet"
        }
      ]
    }))
  ]
};
