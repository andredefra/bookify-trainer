
import { useState, useEffect } from "react";
import { TrainingProgram, WorkoutDay, Exercise } from "@/data/training/types";

interface InitialProgramData {
  id: string;
  title: string;
  weekStart: string;
  duration: number;
  objective: string;
  description: string;
  isPaid: boolean;
  price: number;
}

export function useProgramForm(initialData?: InitialProgramData) {
  const [program, setProgram] = useState<TrainingProgram>({
    id: initialData?.id || Math.random().toString(36).substring(2, 9),
    title: initialData?.title || "Weekly Training Program",
    week: "",
    trainerName: "",
    // Add the additional properties
    weekStart: initialData?.weekStart || "",
    duration: initialData?.duration || 4,
    objective: initialData?.objective || "Strength & Conditioning",
    description: initialData?.description || "",
    isPaid: initialData?.isPaid || false,
    price: initialData?.price || 0,
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
  });

  const [activeDay, setActiveDay] = useState<string>("1");

  const handleAddExercise = (dayId: string) => {
    setProgram((prev) => {
      const updatedDays = prev.days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: [
              ...day.exercises,
              {
                id: Math.random().toString(36).substring(2, 9),
                name: "",
                sets: 3,
                reps: "10",
                weight: 0,
                notes: "",
              },
            ],
          };
        }
        return day;
      });

      return {
        ...prev,
        days: updatedDays,
      };
    });
  };

  const handleUpdateExercise = (dayId: string, exerciseId: string, field: string, value: any) => {
    setProgram((prev) => {
      const updatedDays = prev.days.map((day) => {
        if (day.id === dayId) {
          const updatedExercises = day.exercises.map((exercise) => {
            if (exercise.id === exerciseId) {
              return {
                ...exercise,
                [field]: value,
              };
            }
            return exercise;
          });

          return {
            ...day,
            exercises: updatedExercises,
          };
        }
        return day;
      });

      return {
        ...prev,
        days: updatedDays,
      };
    });
  };

  const handleRemoveExercise = (dayId: string, exerciseId: string) => {
    setProgram((prev) => {
      const updatedDays = prev.days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.filter((exercise) => exercise.id !== exerciseId),
          };
        }
        return day;
      });

      return {
        ...prev,
        days: updatedDays,
      };
    });
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
