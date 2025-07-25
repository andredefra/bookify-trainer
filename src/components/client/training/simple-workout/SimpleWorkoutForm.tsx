import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Minus, CheckCircle2, Play } from "lucide-react";
import { ExerciseSelector } from "../workout-form/ExerciseSelector";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";
import { ExerciseData } from "@/data/exercises/types";
import { SetTracker } from "../SetTracker";
import { AlternativeExercises } from "../AlternativeExercises";
import { ExerciseVideoPlayer } from "../ExerciseVideoPlayer";
import { exerciseVideoUrls } from "@/data/exercises/videoUrls";
import { useToast } from "@/hooks/use-toast";

interface SimpleSet {
  setNumber: number;
  targetReps: string;
  actualReps?: number;
  weight?: number;
  completed: boolean;
  notes?: string;
}

interface SimpleExercise {
  id: string;
  name: string;
  exerciseDbId?: string;
  difficulty?: string;
  muscleGroups?: string[];
  equipment?: string[];
  notes?: string;
  setsData: SimpleSet[];
}

interface SimpleWorkoutFormProps {
  onComplete: () => void;
}

export function SimpleWorkoutForm({ onComplete }: SimpleWorkoutFormProps) {
  const { toast } = useToast();
  const [workoutName, setWorkoutName] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [exercises, setExercises] = useState<SimpleExercise[]>([
    { id: "1", name: "", setsData: [] }
  ]);

  const handleExerciseSelect = (exerciseId: string, selectedExercise: ExerciseData) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const defaultSets: SimpleSet[] = Array.from({ length: 3 }, (_, index) => ({
          setNumber: index + 1,
          targetReps: selectedExercise.difficulty === 'beginner' ? '12-15' : 
                      selectedExercise.difficulty === 'intermediate' ? '8-12' : '6-10',
          completed: false
        }));
        
        return {
          ...ex,
          name: selectedExercise.name,
          exerciseDbId: selectedExercise.id,
          difficulty: selectedExercise.difficulty,
          muscleGroups: selectedExercise.muscleGroup,
          equipment: selectedExercise.equipment,
          setsData: defaultSets
        };
      }
      return ex;
    }));
  };

  const updateSet = (exerciseId: string, setNumber: number, updates: Partial<SimpleSet>) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const updatedSets = ex.setsData.map(set => 
          set.setNumber === setNumber ? { ...set, ...updates } : set
        );
        return { ...ex, setsData: updatedSets };
      }
      return ex;
    }));
  };

  const addExercise = () => {
    const newExercise: SimpleExercise = {
      id: Math.random().toString(36).substring(7),
      name: "",
      setsData: []
    };
    setExercises([...exercises, newExercise]);
  };

  const removeExercise = (id: string) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter(ex => ex.id !== id));
    }
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const newSet: SimpleSet = {
          setNumber: ex.setsData.length + 1,
          targetReps: "8-12",
          completed: false
        };
        return { ...ex, setsData: [...ex.setsData, newSet] };
      }
      return ex;
    }));
  };

  const removeSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId && ex.setsData.length > 1) {
        const updatedSets = ex.setsData.slice(0, -1);
        return { ...ex, setsData: updatedSets };
      }
      return ex;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validExercises = exercises.filter(ex => ex.name.trim() !== "");
    if (validExercises.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one exercise",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage
    const workoutLogs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
    const newWorkout = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      name: workoutName || "Workout",
      exercises: validExercises,
      duration: duration || undefined,
      notes: notes || undefined
    };
    
    workoutLogs.unshift(newWorkout); // Add to beginning
    localStorage.setItem("workoutLogs", JSON.stringify(workoutLogs));
    
    toast({
      title: "Workout logged successfully",
      description: `Your ${workoutName || "workout"} has been saved`
    });
    
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Workout Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="workout-name">Workout Name</Label>
          <Input
            id="workout-name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="Enter workout name"
          />
        </div>
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 45 min"
          />
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Exercises</h3>
          <Button type="button" variant="outline" size="sm" onClick={addExercise}>
            <Plus className="h-4 w-4 mr-1" /> Add Exercise
          </Button>
        </div>
        
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onSelect={(selectedExercise) => handleExerciseSelect(exercise.id, selectedExercise)}
            onUpdateSet={(setNumber, updates) => updateSet(exercise.id, setNumber, updates)}
            onAddSet={() => addSet(exercise.id)}
            onRemoveSet={() => removeSet(exercise.id)}
            onRemove={() => removeExercise(exercise.id)}
            isRemoveDisabled={exercises.length === 1}
          />
        ))}
      </div>

      {/* Workout Notes */}
      <div>
        <Label htmlFor="workout-notes">Workout Notes</Label>
        <Textarea
          id="workout-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add general notes about this workout..."
          className="min-h-[80px]"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onComplete}>
          Cancel
        </Button>
        <Button type="submit">
          Save Workout
        </Button>
      </div>
    </form>
  );
}

interface ExerciseCardProps {
  exercise: SimpleExercise;
  onSelect: (exercise: ExerciseData) => void;
  onUpdateSet: (setNumber: number, updates: Partial<SimpleSet>) => void;
  onAddSet: () => void;
  onRemoveSet: () => void;
  onRemove: () => void;
  isRemoveDisabled: boolean;
}

function ExerciseCard({ exercise, onSelect, onUpdateSet, onAddSet, onRemoveSet, onRemove, isRemoveDisabled }: ExerciseCardProps) {
  const [localNotes, setLocalNotes] = useState(exercise.notes || "");

  const getExerciseData = () => {
    if (exercise.exerciseDbId) {
      return completeExerciseDatabase.find(ex => ex.id === exercise.exerciseDbId);
    }
    return null;
  };

  const getVideoUrl = () => {
    return exercise.exerciseDbId ? exerciseVideoUrls[exercise.exerciseDbId] : undefined;
  };

  const isCompleted = () => {
    return exercise.setsData.length > 0 && exercise.setsData.every(set => set.completed);
  };

  const handleExerciseChange = (newExerciseId: string, newExerciseName: string) => {
    const selectedExercise = completeExerciseDatabase.find(ex => ex.id === newExerciseId);
    if (selectedExercise) {
      onSelect(selectedExercise);
    }
  };

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
            {isCompleted() && (
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
          onSelect={onSelect}
          placeholder="Click to select an exercise"
        />
        
        {/* Exercise Details */}
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
                  {exercise.setsData.map((set) => (
                    <SetTracker
                      key={set.setNumber}
                      setData={{
                        setNumber: set.setNumber,
                        targetReps: set.targetReps,
                        actualReps: set.actualReps,
                        weight: set.weight,
                        completed: set.completed,
                        notes: set.notes,
                      }}
                      suggestedWeight={0}
                      onUpdate={(updates) => onUpdateSet(set.setNumber, updates)}
                      showProgress={false}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Exercise Notes */}
            <div className="space-y-2">
              <Label>Exercise Notes</Label>
              <Textarea
                placeholder="Add notes for this exercise..."
                value={localNotes}
                onChange={(e) => setLocalNotes(e.target.value)}
                className="min-h-[60px]"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}