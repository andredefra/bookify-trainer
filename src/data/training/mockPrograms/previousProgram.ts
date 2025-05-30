
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
    }
  ]
};
