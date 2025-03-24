
import { TrainingProgramContent } from "@/components/client/training/TrainingProgramContent";
import { currentProgram, previousProgram } from "@/data/trainingPrograms";

export function TrainingProgramTab() {
  return (
    <div className="space-y-6">
      <TrainingProgramContent 
        currentProgram={currentProgram}
        previousPrograms={[previousProgram]} 
      />
    </div>
  );
}
