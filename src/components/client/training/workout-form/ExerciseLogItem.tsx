
import { Trash2, Timer, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ExerciseLog, SetLogData } from "./types";
import { ExerciseSelector } from "./ExerciseSelector";
import { ExerciseDetailCard } from "./ExerciseDetailCard";
import { SetTrackingInterface } from "./SetTrackingInterface";
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
  const [selectedExerciseData, setSelectedExerciseData] = useState<ExerciseData | null>(null);
  const [trainerNotes, setTrainerNotes] = useState("");
  
  const handleExerciseSelect = (selectedExercise: ExerciseData) => {
    onChange(exercise.id, "name", selectedExercise.name);
    onChange(exercise.id, "exerciseDbId", selectedExercise.id);
    onChange(exercise.id, "difficulty", selectedExercise.difficulty);
    onChange(exercise.id, "muscleGroups", selectedExercise.muscleGroup);
    onChange(exercise.id, "equipment", selectedExercise.equipment);
    setSelectedExerciseData(selectedExercise);
    
    // Initialize sets if not already present
    if (!exercise.setsData) {
      initializeSets();
    }
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

  const handleSetsChange = (newSets: SetLogData[]) => {
    onChange(exercise.id, "setsData", newSets);
    // Update sets count to match
    onChange(exercise.id, "sets", newSets.length);
  };

  const isExerciseCompleted = () => {
    if (!exercise.setsData || exercise.setsData.length === 0) return false;
    return exercise.setsData.every(set => set.completed);
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
          {isExerciseCompleted() && (
            <Badge variant="default" className="text-xs bg-green-600">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {exercise.name && exercise.setsData && (
            <Button
              type="button"
              variant={isExerciseCompleted() ? "default" : "outline"}
              size="sm"
              className={isExerciseCompleted() ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Complete Exercise
            </Button>
          )}
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
                const newSets = parseInt(e.target.value) || 0;
                onChange(exercise.id, "sets", newSets);
                // Re-initialize sets when count changes
                if (exercise.setsData || newSets > 0) {
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

        {/* Exercise Details Card */}
        {selectedExerciseData && (
          <ExerciseDetailCard 
            exercise={selectedExerciseData}
            trainerNotes={trainerNotes}
            onTrainerNotesChange={setTrainerNotes}
          />
        )}

        {/* Set Tracking Interface */}
        {exercise.name && exercise.setsData && (
          <SetTrackingInterface
            sets={exercise.setsData}
            onSetsChange={handleSetsChange}
            targetSets={exercise.sets}
            targetReps={exercise.reps}
            targetWeight={exercise.weight}
          />
        )}

        {/* General Exercise Notes */}
        <div>
          <Label htmlFor={`notes-${exercise.id}`}>General Notes</Label>
          <Textarea
            id={`notes-${exercise.id}`}
            value={exercise.notes || ''}
            onChange={(e) => onChange(exercise.id, "notes", e.target.value)}
            placeholder="Add general notes for this exercise..."
            className="h-16"
          />
        </div>
      </div>
    </div>
  );
}
