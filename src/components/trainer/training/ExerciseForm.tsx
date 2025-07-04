
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, RotateCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Exercise } from "@/data/training/types";
import { ExerciseSelector } from "./ExerciseSelector";
import { useExerciseManagement } from "./hooks/useExerciseManagement";

interface ExerciseFormProps {
  exercise: Exercise;
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
}

export function ExerciseForm({ exercise, onUpdate, onRemove }: ExerciseFormProps) {
  const { isExerciseSelected, handleExerciseSelect, handleFieldUpdate, resetExercise } = 
    useExerciseManagement(exercise, onUpdate);

  return (
    <div className="border rounded-md p-4 space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel className="text-base font-medium">Exercise Details</FormLabel>
        {isExerciseSelected && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetExercise}
            className="text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Change Exercise
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <FormLabel>Exercise Name *</FormLabel>
          <ExerciseSelector
            value={exercise.name}
            onSelect={handleExerciseSelect}
            placeholder="Click to select an exercise"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <FormLabel>Sets</FormLabel>
            <Input
              type="number"
              min="1"
              max="20"
              value={exercise.sets}
              onChange={(e) => handleFieldUpdate("sets", parseInt(e.target.value) || 1)}
            />
          </div>
          <div>
            <FormLabel>Reps / Time</FormLabel>
            <Input
              value={exercise.reps}
              onChange={(e) => handleFieldUpdate("reps", e.target.value)}
              placeholder="e.g. 10, 8-12, 30s"
            />
          </div>
          <div>
            <FormLabel>Unit</FormLabel>
            <Select
              value={exercise.repsUnit || "reps"}
              onValueChange={(value) => handleFieldUpdate("repsUnit", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reps">Reps</SelectItem>
                <SelectItem value="sec">Seconds</SelectItem>
                <SelectItem value="min">Minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div>
        <FormLabel>Trainer-Specific Notes</FormLabel>
        <Textarea
          value={exercise.notes || ""}
          onChange={(e) => handleFieldUpdate("notes", e.target.value)}
          placeholder="Special instructions for your client: form adjustments, tempo, rest periods, modifications, etc."
          rows={3}
          className="resize-none"
        />
      </div>
      
      <div className="flex justify-end pt-3 border-t">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Remove Exercise
        </Button>
      </div>
    </div>
  );
}
