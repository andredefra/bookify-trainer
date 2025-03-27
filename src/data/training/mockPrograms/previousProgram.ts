
import { TrainingProgram } from '../types';

export const previousProgram: TrainingProgram = {
  id: "prog-2",
  title: "Foundation Building",
  week: "May 13 - May 19",
  trainerName: "Sarah Johnson",
  days: [
    {
      id: "day-1-prev",
      day: "Monday",
      completed: true,
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
      id: "day-2-prev",
      day: "Tuesday",
      completed: true,
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
      id: "day-3-prev",
      day: "Wednesday",
      completed: true,
      exercises: [
        {
          id: "ex-7-prev",
          name: "Rest Day",
          sets: 0,
          reps: "",
          notes: "Stay active with light walking or stretching"
        }
      ]
    },
    {
      id: "day-4-prev",
      day: "Thursday",
      completed: true,
      exercises: []
    },
    {
      id: "day-5-prev",
      day: "Friday",
      completed: true,
      exercises: []
    },
    {
      id: "day-6-prev",
      day: "Saturday",
      completed: true,
      exercises: []
    },
    {
      id: "day-7-prev",
      day: "Sunday",
      completed: true,
      exercises: []
    }
  ]
};
