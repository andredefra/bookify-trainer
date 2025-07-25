
import { Trash2, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ExerciseLog, SetLogData } from "./types";
import { ExerciseSelector } from "./ExerciseSelector";
import { ExerciseData } from "@/data/exercises/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface ExerciseLogItemProps {
  exercise: ExerciseLog;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof ExerciseLog, value: any) => void;
  isRemoveDisabled: boolean;
}

export function ExerciseLogItem({ exercise, onRemove, onChange, isRemoveDisabled }: ExerciseLogItemProps) {
  const isMobile = useIsMobile();
  const [showDetails, setShowDetails] = useState(false);
  
  const handleExerciseSelect = (selectedExercise: ExerciseData) => {
    onChange(exercise.id, "name", selectedExercise.name);
    onChange(exercise.id, "exerciseDbId", selectedExercise.id);
    onChange(exercise.id, "difficulty", selectedExercise.difficulty);
    onChange(exercise.id, "muscleGroups", selectedExercise.muscleGroup);
    onChange(exercise.id, "equipment", selectedExercise.equipment);
  };

  const initializeSets = () => {
    const setsData: SetLogData[] = Array.from({ length: exercise.sets }, (_, index) => ({
      setNumber: index + 1,
      targetReps: exercise.reps,
      weight: exercise.weight,
      completed: false
    }));
    onChange(exercise.id, "setsData", setsData);
  };

  const updateSetData = (setIndex: number, field: keyof SetLogData, value: any) => {
    const currentSets = exercise.setsData || [];
    const updatedSets = [...currentSets];
    if (updatedSets[setIndex]) {
      updatedSets[setIndex] = { ...updatedSets[setIndex], [field]: value };
      onChange(exercise.id, "setsData", updatedSets);
    }
  };
  
  return (
    <div className="border rounded-lg p-4 space-y-4 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">Exercise {exercise.id}</h4>
          {exercise.difficulty && (
            <Badge variant="outline" className="text-xs">
              {exercise.difficulty}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(exercise.id)}
          disabled={isRemoveDisabled}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        <div>
          <Label htmlFor={`exercise-name-${exercise.id}`}>Exercise Name</Label>
          <ExerciseSelector
            value={exercise.name}
            onSelect={handleExerciseSelect}
            placeholder="Click to select an exercise"
          />
          {exercise.muscleGroups && exercise.muscleGroups.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {exercise.muscleGroups.map((muscle, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {muscle}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label htmlFor={`sets-${exercise.id}`}>Sets</Label>
            <Input
              id={`sets-${exercise.id}`}
              type="number"
              min="1"
              value={exercise.sets}
              onChange={(e) => {
                onChange(exercise.id, "sets", parseInt(e.target.value) || 0);
                // Re-initialize sets when count changes
                if (exercise.setsData) {
                  initializeSets();
                }
              }}
            />
          </div>
          <div>
            <Label htmlFor={`reps-${exercise.id}`}>Target Reps</Label>
            <Input
              id={`reps-${exercise.id}`}
              type="number"
              min="1"
              value={exercise.reps}
              onChange={(e) => onChange(exercise.id, "reps", parseInt(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label htmlFor={`weight-${exercise.id}`}>
              {isMobile ? "Kg" : "Weight (kg)"}
            </Label>
            <Input
              id={`weight-${exercise.id}`}
              type="number"
              min="0"
              step="0.5"
              value={exercise.weight}
              onChange={(e) => onChange(exercise.id, "weight", parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Advanced tracking toggle */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (!exercise.setsData) {
                initializeSets();
              }
              setShowDetails(!showDetails);
            }}
            className="text-xs"
          >
            {showDetails ? "Hide Details" : "Track Sets"}
          </Button>
          {exercise.restTime && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Timer className="h-3 w-3" />
              {exercise.restTime}s rest
            </div>
          )}
        </div>

        {/* Advanced set tracking */}
        {showDetails && (
          <div className="space-y-3 border-t pt-3">
            {exercise.setsData?.map((set, index) => (
              <div key={set.setNumber} className="grid grid-cols-5 gap-2 items-center text-sm">
                <div className="font-medium">Set {set.setNumber}</div>
                <Input
                  type="number"
                  placeholder="Reps"
                  value={set.actualReps || ''}
                  onChange={(e) => updateSetData(index, "actualReps", parseInt(e.target.value) || 0)}
                  className="h-8"
                />
                <Input
                  type="number"
                  placeholder="Weight"
                  value={set.weight || ''}
                  onChange={(e) => updateSetData(index, "weight", parseFloat(e.target.value) || 0)}
                  step="0.5"
                  className="h-8"
                />
                <Button
                  type="button"
                  variant={set.completed ? "default" : "outline"}
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => updateSetData(index, "completed", !set.completed)}
                >
                  {set.completed ? "✓" : "○"}
                </Button>
                <Input
                  type="number"
                  placeholder="Rest (s)"
                  value={set.restTime || ''}
                  onChange={(e) => updateSetData(index, "restTime", parseInt(e.target.value) || 0)}
                  className="h-8"
                />
              </div>
            ))}
            
            <div>
              <Label htmlFor={`notes-${exercise.id}`}>Notes</Label>
              <Textarea
                id={`notes-${exercise.id}`}
                value={exercise.notes || ''}
                onChange={(e) => onChange(exercise.id, "notes", e.target.value)}
                placeholder="Exercise notes..."
                className="h-16"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
