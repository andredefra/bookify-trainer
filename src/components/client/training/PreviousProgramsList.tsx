
import { TrainingProgram } from "@/data/trainingPrograms";
import { TrainingProgramCard } from "@/components/client/training/TrainingProgramCard";
import { Button } from "@/components/ui/button";

interface PreviousProgramsListProps {
  programs: TrainingProgram[];
}

export function PreviousProgramsList({ programs }: PreviousProgramsListProps) {
  return (
    <div className="space-y-6">
      {programs.map(program => (
        <TrainingProgramCard key={program.id} program={program} />
      ))}
      <div className="text-center mt-4">
        <Button variant="outline">View All Previous Programs</Button>
      </div>
    </div>
  );
}
