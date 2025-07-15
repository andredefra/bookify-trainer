
import { TrainingProgramContent } from "@/components/client/training/TrainingProgramContent";
import { currentProgram, previousProgram, incompletePreviousProgram } from "@/data/training";

export function TrainingProgramTab() {
  const previousPrograms = [previousProgram, incompletePreviousProgram];

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6">
      <TrainingProgramContent 
        currentProgram={currentProgram} 
        previousPrograms={previousPrograms}
      />
    </div>
  );
}
