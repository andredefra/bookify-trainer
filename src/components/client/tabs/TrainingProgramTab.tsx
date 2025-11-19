import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { TrainingProgramContent } from "@/components/client/training/TrainingProgramContent";
import { ProgramListView } from "@/components/client/training/ProgramListView";
import { useTrainingPrograms } from "@/hooks/useTrainingPrograms";
import { TrainingProgram } from "@/data/training/types";
import { previousProgram, incompletePreviousProgram } from "@/data/training";

export function TrainingProgramTab() {
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const { activePrograms, previousPrograms: dbPreviousPrograms, loading } = useTrainingPrograms();

  // Combine DB programs with mock data for now
  const allPreviousPrograms = [...dbPreviousPrograms, previousProgram, incompletePreviousProgram];

  const handleBackToList = () => {
    setSelectedProgram(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading programs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6">
      {selectedProgram ? (
        <div className="space-y-4">
          <Button 
            variant="ghost" 
            onClick={handleBackToList}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Programs
          </Button>
          <TrainingProgramContent 
            currentProgram={selectedProgram} 
            previousPrograms={[]}
          />
        </div>
      ) : (
        <ProgramListView
          activePrograms={activePrograms}
          previousPrograms={allPreviousPrograms}
          onSelectProgram={setSelectedProgram}
        />
      )}
    </div>
  );
}
