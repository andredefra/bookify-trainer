import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Minus, CheckCircle2 } from "lucide-react";
import { WorkoutExercise, WorkoutSet } from "@/data/training/workoutTypes";
import { ExerciseSelector } from "./ExerciseSelector";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";
import { ExerciseData } from "@/data/exercises/types";
import { SetTracker } from "../SetTracker";
import { AlternativeExercises } from "../AlternativeExercises";
import { ExerciseVideoPlayer } from "../ExerciseVideoPlayer";
import { SetData } from "@/data/training/types";
import { exerciseVideoUrls } from "@/data/exercises/videoUrls";

interface ExerciseItemProps {
  exercise: WorkoutExercise;
  onRemove: () => void;
  onUpdate: (updates: Partial<WorkoutExercise>) => void;
  onUpdateSet: (setNumber: number, updates: Partial<WorkoutSet>) => void;
  onAddSet: () => void;
  onRemoveSet: () => void;
  isRemoveDisabled: boolean;
}

export function ExerciseItem({ 
  exercise, 
  onRemove, 
  onUpdate, 
  onUpdateSet, 
  onAddSet, 
  onRemoveSet, 
  isRemoveDisabled 
}: ExerciseItemProps) {
  const [localNotes, setLocalNotes] = useState(exercise.notes || "");

  const handleExerciseSelect = (selectedExercise: ExerciseData) => {
    console.log("Exercise selected:", selectedExercise);
    console.log("Current exercise ID:", exercise.id);
    
    // Update exercise data
    onUpdate({
      name: selectedExercise.name,
      exerciseDbId: selectedExercise.id,
      difficulty: selectedExercise.difficulty,
      muscleGroups: selectedExercise.muscleGroup,
      equipment: selectedExercise.equipment
    });
    
    // Initialize default sets
    const defaultSets: WorkoutSet[] = Array.from({ length: 3 }, (_, index) => ({
      setNumber: index + 1,
      targetReps: selectedExercise.difficulty === 'beginner' ? '12-15' : 
                  selectedExercise.difficulty === 'intermediate' ? '8-12' : '6-10',
      completed: false
    }));
    
    onUpdate({ setsData: defaultSets });
  };

  const handleSetUpdate = (setNumber: number, updates: Partial<SetData>) => {
    onUpdateSet(setNumber, updates as Partial<WorkoutSet>);
  };

  const handleExerciseChange = (newExerciseId: string, newExerciseName: string) => {
    const selectedExercise = completeExerciseDatabase.find(ex => ex.id === newExerciseId);
    if (selectedExercise) {
      handleExerciseSelect(selectedExercise);
    }
  };

  const getExerciseData = () => {
    if (exercise.exerciseDbId) {
      return completeExerciseDatabase.find(ex => ex.id === exercise.exerciseDbId);
    }
    return null;
  };

  const getVideoUrl = () => {
    return exercise.exerciseDbId ? exerciseVideoUrls[exercise.exerciseDbId] : undefined;
  };

  const isExerciseCompleted = () => {
    return exercise.setsData.length > 0 && exercise.setsData.every(set => set.completed);
  };

  // Convert WorkoutSet to SetData for SetTracker compatibility
  const convertToSetData = (workoutSet: WorkoutSet): SetData => ({
    setNumber: workoutSet.setNumber,
    targetReps: workoutSet.targetReps,
    actualReps: workoutSet.actualReps,
    weight: workoutSet.weight,
    completed: workoutSet.completed,
    notes: workoutSet.notes,
  });

  const exerciseData = getExerciseData();
  const videoUrl = getVideoUrl();

  return (
    <Card className="border-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h4 className="font-medium">
              {exercise.name || "Select Exercise"}
            </h4>
            {exercise.difficulty && (
              <Badge variant="outline" className="text-xs">
                {exercise.difficulty}
              </Badge>
            )}
            {isExerciseCompleted() && (
              <Badge className="bg-green-100 text-green-800 text-xs">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            disabled={isRemoveDisabled}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Exercise Selection */}
        <ExerciseSelector
          value={exercise.name}
          onSelect={handleExerciseSelect}
          placeholder="Click to select an exercise"
        />
        
        {/* Exercise Details - shown only when exercise is selected */}
        {exercise.name && exerciseData && (
          <div className="space-y-4">
            {/* Exercise Info */}
            <div className="flex flex-wrap gap-2 text-sm">
              <Badge variant="outline" className="text-xs">
                {exerciseData.difficulty}
              </Badge>
              {exerciseData.muscleGroup.slice(0, 3).map((muscle, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {muscle}
                </Badge>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground">
              <strong>Equipment:</strong> {exerciseData.equipment.join(', ')}
            </div>
            
            {/* Exercise notes from database */}
            {exerciseData.notes && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">{exerciseData.notes}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              <ExerciseVideoPlayer
                videoUrl={videoUrl}
                exerciseName={exercise.name}
              />
              
              <AlternativeExercises
                currentExercise={exercise.exerciseDbId || ""}
                alternativeIds={exerciseData.alternativeExercises}
                onExerciseChange={handleExerciseChange}
              />
            </div>

            {/* Set Tracking */}
            {exercise.setsData.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Sets</h5>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={onRemoveSet}
                      disabled={exercise.setsData.length <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={onAddSet}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {exercise.setsData.map((workoutSet) => (
                    <SetTracker
                      key={workoutSet.setNumber}
                      setData={convertToSetData(workoutSet)}
                      suggestedWeight={0}
                      onUpdate={(updates) => handleSetUpdate(workoutSet.setNumber, updates)}
                      showProgress={false}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Exercise Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Exercise Notes</label>
              <Textarea
                placeholder="Add notes for this exercise..."
                value={localNotes}
                onChange={(e) => setLocalNotes(e.target.value)}
                onBlur={() => onUpdate({ notes: localNotes })}
                className="min-h-[60px]"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}