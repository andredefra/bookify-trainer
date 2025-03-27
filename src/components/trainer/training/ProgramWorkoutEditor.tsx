
import { WorkoutDay } from "@/data/training/types";
import { DayTabs } from "./DayTabs";
import { WorkoutDayPanel } from "./WorkoutDayPanel";

interface ProgramWorkoutEditorProps {
  days: WorkoutDay[];
  activeDay: string;
  setActiveDay: (dayId: string) => void;
  onAddExercise: (dayId: string) => void;
  onUpdateExercise: (dayId: string, exerciseId: string, field: string, value: any) => void;
  onRemoveExercise: (dayId: string, exerciseId: string) => void;
}

export function ProgramWorkoutEditor({
  days,
  activeDay,
  setActiveDay,
  onAddExercise,
  onUpdateExercise,
  onRemoveExercise
}: ProgramWorkoutEditorProps) {
  return (
    <div className="border rounded-md">
      <DayTabs 
        days={days} 
        activeDay={activeDay} 
        setActiveDay={setActiveDay} 
      />

      {days.map((day) => (
        <WorkoutDayPanel
          key={day.id}
          day={day}
          activeDay={activeDay}
          onAddExercise={onAddExercise}
          onUpdateExercise={onUpdateExercise}
          onRemoveExercise={onRemoveExercise}
        />
      ))}
    </div>
  );
}
