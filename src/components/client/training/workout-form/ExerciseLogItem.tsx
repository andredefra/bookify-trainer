import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Minus } from "lucide-react";
import { ExerciseLog } from "./types";
import { ExerciseSelector } from "./ExerciseSelector";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";
import { ExerciseData } from "@/data/exercises/types";
import { SetTracker } from "../SetTracker";
import { AlternativeExercises } from "../AlternativeExercises";
import { ExerciseVideoPlayer } from "../ExerciseVideoPlayer";
import { SetData } from "@/data/training/types";

interface ExerciseLogItemProps {
  exercise: ExerciseLog;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof ExerciseLog, value: any) => void;
  isRemoveDisabled: boolean;
}

export function ExerciseLogItem({ exercise, onRemove, onChange, isRemoveDisabled }: ExerciseLogItemProps) {
  const [notes, setNotes] = useState(exercise.notes || "");

  const handleExerciseSelect = (selectedExercise: ExerciseData) => {
    // Aggiorna i dati dell'esercizio
    onChange(exercise.id, "name", selectedExercise.name);
    onChange(exercise.id, "exerciseDbId", selectedExercise.id);
    onChange(exercise.id, "difficulty", selectedExercise.difficulty);
    onChange(exercise.id, "muscleGroups", selectedExercise.muscleGroup);
    onChange(exercise.id, "equipment", selectedExercise.equipment);
    
    // Inizializza i set di default
    const defaultSets: SetData[] = Array.from({ length: 3 }, (_, index) => ({
      setNumber: index + 1,
      targetReps: selectedExercise.difficulty === 'beginner' ? '12-15' : 
                  selectedExercise.difficulty === 'intermediate' ? '8-12' : '6-10',
      actualReps: undefined,
      weight: undefined,
      completed: false,
      notes: "",
    }));
    
    onChange(exercise.id, "setsData", defaultSets);
  };

  const handleSetUpdate = (setNumber: number, updates: Partial<SetData>) => {
    const currentSetsData = exercise.setsData as SetData[] || [];
    const newSetsData = currentSetsData.map(set => 
      set.setNumber === setNumber ? { ...set, ...updates } : set
    );
    onChange(exercise.id, "setsData", newSetsData);
  };

  const addSet = () => {
    const currentSetsData = exercise.setsData as SetData[] || [];
    const newSet: SetData = {
      setNumber: currentSetsData.length + 1,
      targetReps: '8-12',
      actualReps: undefined,
      weight: undefined,
      completed: false,
      notes: "",
    };
    onChange(exercise.id, "setsData", [...currentSetsData, newSet]);
  };

  const removeSet = () => {
    const currentSetsData = exercise.setsData as SetData[] || [];
    if (currentSetsData.length > 1) {
      const updatedSets = currentSetsData.slice(0, -1).map((set, index) => ({
        ...set,
        setNumber: index + 1
      }));
      onChange(exercise.id, "setsData", updatedSets);
    }
  };

  const getExerciseData = () => {
    if (exercise.exerciseDbId) {
      return completeExerciseDatabase.find(ex => ex.id === exercise.exerciseDbId);
    }
    return null;
  };

  const getVideoUrl = () => {
    const exerciseData = getExerciseData();
    return exerciseData?.videoUrl;
  };

  const isExerciseCompleted = () => {
    const sets = exercise.setsData as SetData[] || [];
    return sets.length > 0 && sets.every(set => set.completed);
  };

  const handleExerciseChange = (newExerciseId: string, newExerciseName: string) => {
    const selectedExercise = completeExerciseDatabase.find(ex => ex.id === newExerciseId);
    if (selectedExercise) {
      handleExerciseSelect(selectedExercise);
    }
  };

  const exerciseData = getExerciseData();
  const setsData = exercise.setsData as SetData[] || [];

  return (
    <Card className="border-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h4 className="font-medium">
              {exercise.name || "Seleziona Esercizio"}
            </h4>
            {exercise.difficulty && (
              <Badge variant="outline" className="text-xs">
                {exercise.difficulty}
              </Badge>
            )}
            {isExerciseCompleted() && (
              <Badge className="bg-green-100 text-green-800 text-xs">
                Completato
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
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
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Selezione Esercizio */}
        <div className="space-y-2">
          <ExerciseSelector
            value={exercise.name}
            onSelect={handleExerciseSelect}
            placeholder="Clicca per selezionare un esercizio"
          />
        </div>
        
        {/* Dettagli Esercizio - mostrati solo se è selezionato */}
        {exercise.name && exerciseData && (
          <div className="space-y-4">
            {/* Info esercizio */}
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {exerciseData.difficulty}
              </Badge>
              {exerciseData.muscleGroup.map((muscle, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {muscle}
                </Badge>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground">
              <strong>Attrezzatura:</strong> {exerciseData.equipment.join(', ')}
            </div>
            
            {/* Note dell'esercizio dal database */}
            {exerciseData.notes && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">{exerciseData.notes}</p>
              </div>
            )}

            {/* Bottoni azione */}
            <div className="flex gap-2 flex-wrap">
              <ExerciseVideoPlayer
                videoUrl={getVideoUrl()}
                exerciseName={exercise.name}
              />
              
              <AlternativeExercises
                currentExercise={exercise.exerciseDbId || ""}
                alternativeIds={exerciseData.alternativeExercises}
                onExerciseChange={handleExerciseChange}
              />
            </div>

            {/* Tracking Set */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-medium">Set</h5>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeSet}
                    disabled={setsData.length <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSet}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              {setsData.map((setData) => (
                <SetTracker
                  key={setData.setNumber}
                  setData={setData}
                  suggestedWeight={0}
                  onUpdate={(updates) => handleSetUpdate(setData.setNumber, updates)}
                  showProgress={false}
                />
              ))}
            </div>

            {/* Note */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Note Esercizio</label>
              <Textarea
                placeholder="Aggiungi note per questo esercizio..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={() => onChange(exercise.id, "notes", notes)}
                className="min-h-[60px]"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}