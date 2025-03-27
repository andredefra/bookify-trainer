
import { useState } from "react";
import { TrainingProgram, WorkoutDay } from "../types";

export function useProgramForm() {
  const [program, setProgram] = useState<TrainingProgram>({
    title: "Weekly Training Program",
    weekStart: "",
    duration: 4,
    objective: "Strength & Conditioning",
    description: "",
    isPaid: false,
    price: 0,
    days: [
      {
        id: "1",
        day: "Monday",
        exercises: [],
        completed: false,
      },
      {
        id: "2",
        day: "Tuesday",
        exercises: [],
        completed: false,
      },
      {
        id: "3",
        day: "Wednesday",
        exercises: [],
        completed: false,
      },
      {
        id: "4",
        day: "Thursday",
        exercises: [],
        completed: false,
      },
      {
        id: "5",
        day: "Friday",
        exercises: [],
        completed: false,
      },
      {
        id: "6",
        day: "Saturday",
        exercises: [],
        completed: false,
      },
      {
        id: "7",
        day: "Sunday",
        exercises: [],
        completed: false,
      },
    ],
    id: Math.random().toString(36).substring(2, 9),
    week: "",
    trainerName: "",
  });

  const [activeDay, setActiveDay] = useState<string>("1");

  const handleAddExercise = (dayId: string) => {
    const updatedDays = program.days.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          exercises: [
            ...day.exercises,
            {
              id: Math.random().toString(36).substring(2, 9),
              name: "",
              sets: 3,
              reps: "8-12",
            },
          ],
        };
      }
      return day;
    });

    setProgram({ ...program, days: updatedDays });
  };

  const handleUpdateExercise = (dayId: string, exerciseId: string, field: string, value: any) => {
    const updatedDays = program.days.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          exercises: day.exercises.map((ex) => {
            if (ex.id === exerciseId) {
              return {
                ...ex,
                [field]: value,
              };
            }
            return ex;
          }),
        };
      }
      return day;
    });

    setProgram({ ...program, days: updatedDays });
  };

  const handleRemoveExercise = (dayId: string, exerciseId: string) => {
    const updatedDays = program.days.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          exercises: day.exercises.filter((ex) => ex.id !== exerciseId),
        };
      }
      return day;
    });

    setProgram({ ...program, days: updatedDays });
  };

  return {
    program,
    setProgram,
    activeDay,
    setActiveDay,
    handleAddExercise,
    handleUpdateExercise,
    handleRemoveExercise,
  };
}
