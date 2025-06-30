
import { Badge } from "@/components/ui/badge";
import { TrainerData } from "../data/trainerData";

interface TrainerSpecialtiesProps {
  trainer: TrainerData;
}

export function TrainerSpecialties({ trainer }: TrainerSpecialtiesProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">Specializations</h3>
      <div className="flex flex-wrap gap-2">
        {trainer.specialties.map((specialty) => (
          <Badge key={specialty} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {specialty}
          </Badge>
        ))}
      </div>
    </div>
  );
}
