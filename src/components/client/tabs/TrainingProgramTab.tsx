
import { TrainingProgramContent } from "@/components/client/training/TrainingProgramContent";
import { currentProgram, previousProgram, incompletePreviousProgram } from "@/data/training";

export function TrainingProgramTab() {
  const previousPrograms = [previousProgram, incompletePreviousProgram];

  return (
    <div className="space-y-6 p-6">
      <TrainingProgramContent 
        currentProgram={currentProgram} 
        previousPrograms={previousPrograms}
      />
    </div>
  );
}
