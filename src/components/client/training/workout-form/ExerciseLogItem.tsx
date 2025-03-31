
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExerciseLog } from "./types";

interface ExerciseLogItemProps {
  exercise: ExerciseLog;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof ExerciseLog, value: string | number) => void;
  isRemoveDisabled: boolean;
}

export function ExerciseLogItem({ 
  exercise, 
  onRemove, 
  onChange, 
  isRemoveDisabled 
}: ExerciseLogItemProps) {
  return (
    <div className="p-3 border rounded-md space-y-3">
      <div className="w-full">
        <Input
          value={exercise.name}
          onChange={(e) => onChange(exercise.id, "name", e.target.value)}
          placeholder="Exercise name"
          className="w-full"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Sets</label>
          <Input
            type="number"
            value={exercise.sets}
            onChange={(e) => onChange(exercise.id, "sets", parseInt(e.target.value))}
            placeholder="Sets"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Reps</label>
          <Input
            type="number"
            value={exercise.reps}
            onChange={(e) => onChange(exercise.id, "reps", parseInt(e.target.value))}
            placeholder="Reps"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Weight (kg)</label>
          <Input
            type="number"
            value={exercise.weight}
            onChange={(e) => onChange(exercise.id, "weight", parseFloat(e.target.value))}
            placeholder="Weight"
            className="w-full"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemove(exercise.id)}
          disabled={isRemoveDisabled}
        >
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
