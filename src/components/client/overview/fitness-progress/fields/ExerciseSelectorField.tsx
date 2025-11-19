import { useState, useMemo } from "react";
import { Search, Dumbbell, Activity, Sun, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";
import { ExerciseData } from "@/data/exercises/types";
import { isCardioExercise, CARDIO_MET_VALUES } from "../data/cardioMetValues";

// Helper function to get exercise environment
const getExerciseEnvironment = (exerciseId: string): 'indoor' | 'outdoor' | null => {
  const cardioExercise = CARDIO_MET_VALUES.find(e => e.exerciseId === exerciseId);
  return cardioExercise?.environment || null;
};

interface ExerciseSelectorFieldProps {
  value: string | null;
  onChange: (exerciseId: string, exercise: ExerciseData) => void;
  filterCategory?: string[] | "cardio";
  label: string;
  required?: boolean;
}

export function ExerciseSelectorField({
  value,
  onChange,
  filterCategory,
  label,
  required = false
}: ExerciseSelectorFieldProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter exercises based on category
  const filteredExercises = useMemo(() => {
    let exercises = completeExerciseDatabase;

    // Filter by category
    if (filterCategory === "cardio") {
      // Filter to cardio exercises only (those in cardioMetValues)
      exercises = exercises.filter(ex => isCardioExercise(ex.id));
    } else if (Array.isArray(filterCategory)) {
      // Filter by specific categories (for strength training)
      exercises = exercises.filter(ex => filterCategory.includes(ex.category));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      exercises = exercises.filter(ex =>
        ex.name.toLowerCase().includes(query) ||
        ex.category.toLowerCase().includes(query) ||
        ex.muscleGroup.some(mg => mg.toLowerCase().includes(query))
      );
    }

    return exercises;
  }, [filterCategory, searchQuery]);

  const selectedExercise = useMemo(() => {
    return completeExerciseDatabase.find(ex => ex.id === value);
  }, [value]);

  return (
    <div className="space-y-3">
      <Label>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      {/* Selected Exercise Display */}
      {selectedExercise && (
        <Card className="p-3 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {filterCategory === "cardio" ? (
                getExerciseEnvironment(selectedExercise.id) === 'outdoor' ? (
                  <Sun className="h-5 w-5 text-primary" />
                ) : getExerciseEnvironment(selectedExercise.id) === 'indoor' ? (
                  <Home className="h-5 w-5 text-primary" />
                ) : (
                  <Activity className="h-5 w-5 text-primary" />
                )
              ) : (
                <Dumbbell className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{selectedExercise.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedExercise.notes}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {selectedExercise.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {selectedExercise.difficulty}
                </Badge>
                {selectedExercise.muscleGroup.slice(0, 2).map(mg => (
                  <Badge key={mg} variant="outline" className="text-xs">
                    {mg}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Exercise List */}
      <ScrollArea className="h-[300px] rounded-lg border">
        <div className="p-2 space-y-1">
          {filteredExercises.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No exercises found
            </div>
          ) : (
            filteredExercises.map((exercise) => (
              <button
                type="button"
                key={exercise.id}
                onClick={() => onChange(exercise.id, exercise)}
                className={`
                  w-full text-left p-3 rounded-lg transition-colors
                  hover:bg-accent
                  ${value === exercise.id ? 'bg-primary/10 border border-primary/20' : 'border border-transparent'}
                `}
              >
                <div className="flex items-start gap-2">
                  <div className={`p-1.5 rounded ${value === exercise.id ? 'bg-primary/20' : 'bg-muted'}`}>
                    {filterCategory === "cardio" ? (
                      getExerciseEnvironment(exercise.id) === 'outdoor' ? (
                        <Sun className="h-3.5 w-3.5" />
                      ) : getExerciseEnvironment(exercise.id) === 'indoor' ? (
                        <Home className="h-3.5 w-3.5" />
                      ) : (
                        <Activity className="h-3.5 w-3.5" />
                      )
                    ) : (
                      <Dumbbell className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{exercise.name}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="secondary" className="text-xs h-5">
                        {exercise.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs h-5">
                        {exercise.difficulty}
                      </Badge>
                      {filterCategory === "cardio" && getExerciseEnvironment(exercise.id) && (
                        <Badge variant="outline" className="text-xs h-5">
                          {getExerciseEnvironment(exercise.id) === 'outdoor' ? '☀️ Outdoor' : '🏠 Indoor'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground">
        {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''} available
      </p>
    </div>
  );
}
