
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Plus, Search } from 'lucide-react';
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';

interface AlternativeExercisesManagerProps {
  currentExercise: ExerciseData;
  alternativeExerciseIds: string[];
  onUpdate: (alternativeIds: string[]) => void;
}

export function AlternativeExercisesManager({ 
  currentExercise, 
  alternativeExerciseIds, 
  onUpdate 
}: AlternativeExercisesManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { allExercises } = useExerciseLibrary();

  // Get current alternatives
  const currentAlternatives = allExercises.filter(ex => 
    alternativeExerciseIds.includes(ex.id)
  );

  // Get suggested exercises with improved filtering logic
  const suggestedExercises = allExercises.filter(ex => {
    // Exclude current exercise and already selected alternatives
    if (ex.id === currentExercise.id || alternativeExerciseIds.includes(ex.id)) {
      return false;
    }

    // Priority 1: Same category AND overlapping muscle groups
    const sameCategoryAndMuscles = ex.category === currentExercise.category &&
      ex.muscleGroup.some(muscle => currentExercise.muscleGroup.includes(muscle));

    // Priority 2: Same muscle groups (even if different category)
    const sharedMuscleGroups = ex.muscleGroup.some(muscle => 
      currentExercise.muscleGroup.includes(muscle)
    );

    // Priority 3: Similar equipment but targeting same muscles
    const similarEquipment = ex.equipment.some(equipment => 
      currentExercise.equipment.includes(equipment)
    ) && sharedMuscleGroups;

    // Apply search filter if present
    if (searchQuery) {
      const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.muscleGroup.some(muscle => muscle.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesSearch && (sameCategoryAndMuscles || sharedMuscleGroups || similarEquipment);
    }

    return sameCategoryAndMuscles || sharedMuscleGroups || similarEquipment;
  })
  .sort((a, b) => {
    // Sort by relevance: same category first, then shared muscle groups
    const aScore = (a.category === currentExercise.category ? 2 : 0) +
      (a.muscleGroup.filter(m => currentExercise.muscleGroup.includes(m)).length);
    const bScore = (b.category === currentExercise.category ? 2 : 0) +
      (b.muscleGroup.filter(m => currentExercise.muscleGroup.includes(m)).length);
    
    return bScore - aScore;
  })
  .slice(0, 15); // Show top 15 most relevant

  const addAlternative = (exerciseId: string) => {
    if (!alternativeExerciseIds.includes(exerciseId)) {
      onUpdate([...alternativeExerciseIds, exerciseId]);
    }
  };

  const removeAlternative = (exerciseId: string) => {
    onUpdate(alternativeExerciseIds.filter(id => id !== exerciseId));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Current Alternative Exercises</Label>
        {currentAlternatives.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {currentAlternatives.map(exercise => (
              <Badge key={exercise.id} variant="secondary" className="flex items-center gap-1">
                {exercise.name}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeAlternative(exercise.id)}
                />
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mt-1">No alternative exercises set</p>
        )}
      </div>

      <div>
        <Label>Add Alternative Exercises</Label>
        <div className="relative mt-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Showing exercises from same category or with overlapping muscle groups
        </p>
      </div>

      <ScrollArea className="h-48 border rounded-md p-2">
        <div className="space-y-2">
          {suggestedExercises.map(exercise => {
            // Calculate relevance indicators
            const sameCategory = exercise.category === currentExercise.category;
            const sharedMuscles = exercise.muscleGroup.filter(m => 
              currentExercise.muscleGroup.includes(m)
            );
            const similarEquipment = exercise.equipment.some(eq => 
              currentExercise.equipment.includes(eq)
            );

            return (
              <div key={exercise.id} className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
                <div className="flex-1">
                  <p className="font-medium text-sm">{exercise.name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge 
                      variant={sameCategory ? "default" : "outline"} 
                      className="text-xs"
                    >
                      {exercise.category}
                    </Badge>
                    {sharedMuscles.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {sharedMuscles.length} shared muscle{sharedMuscles.length > 1 ? 's' : ''}
                      </Badge>
                    )}
                    {similarEquipment && (
                      <Badge variant="outline" className="text-xs">
                        Similar equipment
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {exercise.equipment.slice(0, 2).map((eq, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {eq}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addAlternative(exercise.id)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
          {suggestedExercises.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              {searchQuery ? 'No exercises found' : 'No alternative exercises available'}
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
