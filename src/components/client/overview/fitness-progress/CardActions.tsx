
import { Button } from "@/components/ui/button";
import { Plus, Activity, Ruler } from "lucide-react";

interface CardActionsProps {
  onAddGoal: () => void;
  onLogActivity: () => void;
  onLogMeasurements: () => void;
}

export function CardActions({ onAddGoal, onLogActivity, onLogMeasurements }: CardActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={onAddGoal} size="sm" variant="outline" className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add Goal
      </Button>
      <Button onClick={onLogActivity} size="sm" variant="outline" className="flex items-center gap-2">
        <Activity className="h-4 w-4" />
        Log Activity
      </Button>
      <Button onClick={onLogMeasurements} size="sm" variant="outline" className="flex items-center gap-2">
        <Ruler className="h-4 w-4" />
        Body Measurements
      </Button>
    </div>
  );
}
