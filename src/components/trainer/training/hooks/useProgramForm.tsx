
import { useState, useEffect } from "react";
import { TrainingProgram, WorkoutSession, Exercise } from "@/data/training/types";

interface InitialProgramData {
  id: string;
  title: string;
  weekStart: string;
  duration: number;
  targetFrequency: number;
  objective: string;
  description: string;
  isPaid: boolean;
  price: number;
  sessions?: WorkoutSession[];
}

export function useProgramForm(initialData?: InitialProgramData) {
  const [program, setProgram] = useState<TrainingProgram>({
    id: initialData?.id || Math.random().toString(36).substring(2, 9),
    title: initialData?.title || "Weekly Training Program",
    week: "",
    trainerName: "",
    weekStart: initialData?.weekStart || "",
    duration: initialData?.duration || 4,
    targetFrequency: initialData?.targetFrequency || 3,
    objective: initialData?.objective || "Strength & Conditioning",
    description: initialData?.description || "",
    isPaid: initialData?.isPaid || false,
    price: initialData?.price || 0,
    totalSessions: (initialData?.duration || 4) * (initialData?.targetFrequency || 3),
    sessions: [],
  });

  const [activeSession, setActiveSession] = useState<string>("1");

  // Generate sessions based on duration and target frequency
  const generateSessions = (duration: number, targetFrequency: number, existingSessions?: WorkoutSession[]) => {
    const totalSessions = duration * targetFrequency;
    const sessions: WorkoutSession[] = [];
    
    for (let i = 1; i <= totalSessions; i++) {
      // Check if we have an existing session to preserve
      const existingSession = existingSessions?.find(s => s.sessionNumber === i);
      
      sessions.push({
        id: existingSession?.id || String(i),
        sessionNumber: i,
        title: existingSession?.title || `Session ${i}`,
        exercises: existingSession?.exercises || [],
        completed: existingSession?.completed || false,
      });
    }
    
    return sessions;
  };

  // Initialize sessions
  useEffect(() => {
    if (initialData?.sessions) {
      setProgram(prev => ({
        ...prev,
        sessions: initialData.sessions,
      }));
    } else {
      const initialSessions = generateSessions(program.duration, program.targetFrequency);
      setProgram(prev => ({
        ...prev,
        sessions: initialSessions,
      }));
    }
  }, []);

  // Update sessions when duration or frequency changes
  const updateProgramStructure = (duration: number, targetFrequency: number) => {
    const totalSessions = duration * targetFrequency;
    const newSessions = generateSessions(duration, targetFrequency, program.sessions);
    
    setProgram(prev => ({
      ...prev,
      duration,
      targetFrequency,
      totalSessions,
      sessions: newSessions,
    }));
    
    // Reset active session if it's out of range
    if (parseInt(activeSession) > totalSessions) {
      setActiveSession("1");
    }
  };

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
    updateProgramStructure,
  };
}
