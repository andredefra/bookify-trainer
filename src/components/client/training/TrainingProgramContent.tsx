
import { TrainingProgramCard } from "./TrainingProgramCard";
import { PreviousProgramsList } from "./PreviousProgramsList";
import { TrainingProgram } from "@/data/training/types";

interface TrainingProgramContentProps {
  currentProgram: TrainingProgram;
  previousPrograms: TrainingProgram[];
}

export function TrainingProgramContent({ currentProgram, previousPrograms }: TrainingProgramContentProps) {
  // Convert old day-based structure to session-based if needed
  const normalizeProgram = (program: TrainingProgram): TrainingProgram => {
    // If already has sessions, return as is
    if (program.sessions && program.sessions.length > 0) {
      return program;
    }
    
    // Convert old days structure to sessions (for backward compatibility)
    const legacyProgram = program as any;
    if (legacyProgram.days && Array.isArray(legacyProgram.days)) {
      const sessions = legacyProgram.days.map((day: any, index: number) => ({
        id: day.id,
        sessionNumber: index + 1,
        title: `${day.day} Workout`,
        exercises: day.exercises,
        completed: day.completed,
        completedDate: day.completed ? new Date().toISOString() : undefined
      }));
      
      return {
        ...program,
        sessions,
        targetFrequency: program.targetFrequency || 4,
        totalSessions: program.totalSessions || sessions.length
      } as TrainingProgram;
    }
    
    return program;
  };

  const normalizedCurrentProgram = normalizeProgram(currentProgram);
  const normalizedPreviousPrograms = previousPrograms.map(normalizeProgram);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 px-1">Current Training Program</h2>
        <TrainingProgramCard program={normalizedCurrentProgram} />
      </div>
      
      {normalizedPreviousPrograms.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 px-1">Previous Programs</h2>
          <PreviousProgramsList programs={normalizedPreviousPrograms} />
        </div>
      )}
    </div>
  );
}
