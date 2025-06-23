
import { WorkoutSession } from "@/data/training/types";
import { SessionTabs } from "./SessionTabs";
import { SessionNavigator } from "./SessionNavigator";
import { WorkoutSessionPanel } from "./WorkoutSessionPanel";

interface ProgramWorkoutEditorProps {
  sessions: WorkoutSession[];
  activeSession: string;
  setActiveSession: (sessionId: string) => void;
  onAddExercise: (sessionId: string) => void;
  onUpdateExercise: (sessionId: string, exerciseId: string, field: string, value: any) => void;
  onRemoveExercise: (sessionId: string, exerciseId: string) => void;
}

export function ProgramWorkoutEditor({
  sessions,
  activeSession,
  setActiveSession,
  onAddExercise,
  onUpdateExercise,
  onRemoveExercise
}: ProgramWorkoutEditorProps) {
  return (
    <div className="border rounded-md overflow-hidden">
      <SessionTabs 
        sessions={sessions} 
        activeSession={activeSession} 
        setActiveSession={setActiveSession} 
      />

      {sessions.map((session) => (
        <WorkoutSessionPanel
          key={session.id}
          session={session}
          activeSession={activeSession}
          onAddExercise={onAddExercise}
          onUpdateExercise={onUpdateExercise}
          onRemoveExercise={onRemoveExercise}
        />
      ))}

      {sessions.length > 6 && (
        <SessionNavigator
          sessions={sessions}
          activeSession={activeSession}
          setActiveSession={setActiveSession}
        />
      )}
    </div>
  );
}
