
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Exercise } from "./types";

interface ExerciseFormProps {
  exercise: Exercise;
  dayId: string;
  onUpdate: (dayId: string, exerciseId: string, field: string, value: any) => void;
  onRemove: (dayId: string, exerciseId: string) => void;
}

export function ExerciseForm({ exercise, dayId, onUpdate, onRemove }: ExerciseFormProps) {
  return (
    <div className="border rounded-md p-4">
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <FormLabel>Exercise Name</FormLabel>
          <Input
            value={exercise.name}
            onChange={(e) =>
              onUpdate(dayId, exercise.id, "name", e.target.value)
            }
            placeholder="e.g. Squat, Bench Press, etc."
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <FormLabel>Sets</FormLabel>
            <Input
              type="number"
              value={exercise.sets}
              onChange={(e) =>
                onUpdate(
                  dayId,
                  exercise.id,
                  "sets",
                  parseInt(e.target.value)
                )
              }
            />
          </div>
          <div>
            <FormLabel>Reps</FormLabel>
            <Input
              value={exercise.reps}
              onChange={(e) =>
                onUpdate(
                  dayId,
                  exercise.id,
                  "reps",
                  e.target.value
                )
              }
              placeholder="e.g. 10, 8-12, etc."
            />
          </div>
        </div>
      </div>
      <div>
        <FormLabel>Notes</FormLabel>
        <Textarea
          value={exercise.notes || ""}
          onChange={(e) =>
            onUpdate(
              dayId,
              exercise.id,
              "notes",
              e.target.value
            )
          }
          placeholder="Instructions, tempo, rest periods, etc."
          rows={2}
        />
      </div>
      <div className="flex justify-end mt-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive"
          onClick={() => onRemove(dayId, exercise.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
}
