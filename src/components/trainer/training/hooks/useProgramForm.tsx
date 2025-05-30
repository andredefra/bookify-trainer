
import { useState, useEffect } from "react";
import { TrainingProgram, WorkoutSession, Exercise } from "@/data/training/types";

interface InitialProgramData {
  id: string;
  title: string;
  weekStart: string;
  duration: number;
  objective: string;
  description: string;
  isPaid: boolean;
  price: number;
  sessions?: WorkoutSession[];
}

export function useProgramForm(initialData?: InitialProgramData) {
  const defaultSessions: WorkoutSession[] = [
    {
      id: "1",
      sessionNumber: 1,
      title: "Session 1",
      exercises: [],
      completed: false,
    },
    {
      id: "2",
      sessionNumber: 2,
      title: "Session 2",
      exercises: [],
      completed: false,
    },
    {
      id: "3",
      sessionNumber: 3,
      title: "Session 3",
      exercises: [],
      completed: false,
    },
    {
      id: "4",
      sessionNumber: 4,
      title: "Session 4",
      exercises: [],
      completed: false,
    },
  ];

  const [program, setProgram] = useState<TrainingProgram>({
    id: initialData?.id || Math.random().toString(36).substring(2, 9),
    title: initialData?.title || "Weekly Training Program",
    week: "",
    trainerName: "",
    weekStart: initialData?.weekStart || "",
    duration: initialData?.duration || 4,
    objective: initialData?.objective || "Strength & Conditioning",
    description: initialData?.description || "",
    isPaid: initialData?.isPaid || false,
    price: initialData?.price || 0,
    targetFrequency: 4,
    totalSessions: 16,
    sessions: initialData?.sessions || defaultSessions,
  });

  const [activeSession, setActiveSession] = useState<string>("1");

  const handleAddExercise = (sessionId: string) => {
    setProgram((prev) => {
      const updatedSessions = prev.sessions.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            exercises: [
              ...session.exercises,
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
        return session;
      });

      return {
        ...prev,
        sessions: updatedSessions,
      };
    });
  };

  const handleUpdateExercise = (sessionId: string, exerciseId: string, field: string, value: any) => {
    setProgram((prev) => {
      const updatedSessions = prev.sessions.map((session) => {
        if (session.id === sessionId) {
          const updatedExercises = session.exercises.map((exercise) => {
            if (exercise.id === exerciseId) {
              return {
                ...exercise,
                [field]: value,
              };
            }
            return exercise;
          });

          return {
            ...session,
            exercises: updatedExercises,
          };
        }
        return session;
      });

      return {
        ...prev,
        sessions: updatedSessions,
      };
    });
  };

  const handleRemoveExercise = (sessionId: string, exerciseId: string) => {
    setProgram((prev) => {
      const updatedSessions = prev.sessions.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            exercises: session.exercises.filter((exercise) => exercise.id !== exerciseId),
          };
        }
        return session;
      });

      return {
        ...prev,
        sessions: updatedSessions,
      };
    });
  };

  return {
    program,
    setProgram,
    activeSession,
    setActiveSession,
    handleAddExercise,
    handleUpdateExercise,
    handleRemoveExercise,
  };
}
