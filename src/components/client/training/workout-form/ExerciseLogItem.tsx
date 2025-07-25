
import { Trash2, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ExerciseLog, SetLogData } from "./types";
import { ExerciseSelector } from "./ExerciseSelector";
import { SetTracker } from "../SetTracker";
import { AlternativeExercises } from "../AlternativeExercises";
import { ExerciseVideoPlayer } from "../ExerciseVideoPlayer";
import { ExerciseData } from "@/data/exercises/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";
import { exerciseVideoUrls } from "@/data/exercises/videoUrls";
import { SetData } from "@/data/training/types";

interface ExerciseLogItemProps {
  exercise: ExerciseLog;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof ExerciseLog, value: any) => void;
  isRemoveDisabled: boolean;
}

export function ExerciseLogItem({ exercise, onRemove, onChange, isRemoveDisabled }: ExerciseLogItemProps) {
  const isMobile = useIsMobile();
  const [selectedExerciseData, setSelectedExerciseData] = useState<ExerciseData | null>(null);
  
  const handleExerciseSelect = (selectedExercise: ExerciseData) => {
    onChange(exercise.id, "name", selectedExercise.name);
    onChange(exercise.id, "exerciseDbId", selectedExercise.id);
    onChange(exercise.id, "difficulty", selectedExercise.difficulty);
    onChange(exercise.id, "muscleGroups", selectedExercise.muscleGroup);
    onChange(exercise.id, "equipment", selectedExercise.equipment);
    setSelectedExerciseData(selectedExercise);
    
    // Initialize sets for this exercise (3 sets by default)
    const defaultSets: SetData[] = Array.from({ length: 3 }, (_, index) => ({
      setNumber: index + 1,
      targetReps: (selectedExercise.difficulty === 'beginner' ? '12' : 
                  selectedExercise.difficulty === 'intermediate' ? '10' : '8'),
      weight: 0,
      actualReps: 0,
      completed: false
    }));
    onChange(exercise.id, "setsData", defaultSets);
  };

  const handleSetUpdate = (setNumber: number, data: Partial<SetData>) => {
    const currentSets = exercise.setsData as SetData[] || [];
    const updatedSets = currentSets.map(set => 
      set.setNumber === setNumber ? { ...set, ...data } : set
    );
    onChange(exercise.id, "setsData", updatedSets);
  };

  const getExerciseData = () => {
    if (exercise.exerciseDbId) {
      return completeExerciseDatabase.find(ex => ex.id === exercise.exerciseDbId);
    }
    return selectedExerciseData;
  };

  const getVideoUrl = () => {
    return exercise.exerciseDbId ? exerciseVideoUrls[exercise.exerciseDbId] : null;
  };

  const isExerciseCompleted = () => {
    const sets = exercise.setsData as SetData[] || [];
    return sets.length > 0 && sets.every(set => set.completed);
  };

  const exerciseData = getExerciseData();
  const videoUrl = getVideoUrl();

  
  return (
    <div className="border rounded-lg p-4 space-y-4 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{exercise.name || "Select Exercise"}</h4>
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
          
          {/* Exercise Info */}
          {exerciseData && (
            <div className="mt-2 space-y-2">
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  {exerciseData.difficulty}
                </Badge>
                {exerciseData.muscleGroup.map((muscle, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {muscle}
                  </Badge>
                ))}
              </div>
              
              <div className="text-sm text-muted-foreground">
                <strong>Equipment:</strong> {exerciseData.equipment.join(', ')}
              </div>
              
              <p className="text-sm text-muted-foreground">
                {exerciseData.notes}
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                {videoUrl && (
                  <ExerciseVideoPlayer
                    videoUrl={videoUrl}
                    exerciseName={exerciseData.name}
                    triggerButton={
                      <Button variant="outline" size="sm">
                        <Play className="h-3 w-3 mr-1" />
                        Video
                      </Button>
                    }
                  />
                )}
                
                {exerciseData.alternativeExercises && exerciseData.alternativeExercises.length > 0 && (
                  <AlternativeExercises
                    currentExercise={exerciseData.name}
                    alternativeIds={exerciseData.alternativeExercises}
                    onExerciseChange={(newId, newName) => {
                      const newExercise = completeExerciseDatabase.find(ex => ex.id === newId);
                      if (newExercise) {
                        handleExerciseSelect(newExercise);
                      }
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Set Tracking */}
        {exercise.name && exercise.setsData && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Set Tracking</h4>
              {isExerciseCompleted() && (
                <Badge className="bg-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(exercise.setsData as SetData[])?.map((setData, index) => (
                <SetTracker
                  key={index}
                  setData={setData}
                  suggestedWeight={0} // No suggestions in workout log
                  onUpdate={(data) => handleSetUpdate(setData.setNumber, data)}
                  showProgress={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* General Exercise Notes */}
        {exercise.name && (
          <div>
            <Label htmlFor={`notes-${exercise.id}`}>Exercise Notes</Label>
            <Textarea
              id={`notes-${exercise.id}`}
              value={exercise.notes || ''}
              onChange={(e) => onChange(exercise.id, "notes", e.target.value)}
              placeholder="Add general notes for this exercise..."
              className="h-16"
            />
          </div>
        )}
      </div>
    </div>
  );
}
