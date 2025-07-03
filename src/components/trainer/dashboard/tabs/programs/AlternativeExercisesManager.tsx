import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Plus, Search, Dumbbell } from 'lucide-react';
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary';
import { ExerciseData } from '@/data/exercises/types';

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

    // Priority 4: Same difficulty level with shared muscles
    const sameDifficulty = ex.difficulty === currentExercise.difficulty && sharedMuscleGroups;

    // Apply search filter if present
    if (searchQuery) {
      const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.muscleGroup.some(muscle => muscle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ex.equipment.some(eq => eq.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesSearch && (sameCategoryAndMuscles || sharedMuscleGroups || similarEquipment || sameDifficulty);
    }

    return sameCategoryAndMuscles || sharedMuscleGroups || similarEquipment || sameDifficulty;
  })
  .sort((a, b) => {
    // Sort by relevance: same category first, then shared muscle groups, then similar equipment
    const aScore = (a.category === currentExercise.category ? 4 : 0) +
      (a.muscleGroup.filter(m => currentExercise.muscleGroup.includes(m)).length * 2) +
      (a.equipment.filter(eq => currentExercise.equipment.includes(eq)).length) +
      (a.difficulty === currentExercise.difficulty ? 1 : 0);
    
    const bScore = (b.category === currentExercise.category ? 4 : 0) +
      (b.muscleGroup.filter(m => currentExercise.muscleGroup.includes(m)).length * 2) +
      (b.equipment.filter(eq => currentExercise.equipment.includes(eq)).length) +
      (b.difficulty === currentExercise.difficulty ? 1 : 0);
    
    return bScore - aScore;
  })
  .slice(0, 20); // Show top 20 most relevant

  const addAlternative = (exerciseId: string) => {
    if (!alternativeExerciseIds.includes(exerciseId)) {
      onUpdate([...alternativeExerciseIds, exerciseId]);
    }
  };

  const removeAlternative = (exerciseId: string) => {
    onUpdate(alternativeExerciseIds.filter(id => id !== exerciseId));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Current Alternative Exercises</Label>
        {currentAlternatives.length > 0 ? (
          <div className="grid gap-2 mt-2">
            {currentAlternatives.map(exercise => (
              <div key={exercise.id} className="flex items-center justify-between p-2 bg-orange-50 border border-orange-200 rounded-md">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{exercise.name}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {exercise.category}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {exercise.muscleGroup.slice(0, 2).map((muscle, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                        {muscle}
                      </Badge>
                    ))}
                    {exercise.muscleGroup.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                        +{exercise.muscleGroup.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeAlternative(exercise.id)}
                  className="text-destructive hover:text-destructive ml-2"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
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
          Showing exercises with similar muscle groups, equipment, or category (sorted by relevance)
        </p>
      </div>

      <ScrollArea className="h-64 border rounded-md p-2">
        <div className="space-y-2">
          {suggestedExercises.map(exercise => {
            // Calculate relevance indicators
            const sameCategory = exercise.category === currentExercise.category;
            const sharedMuscles = exercise.muscleGroup.filter(m => 
              currentExercise.muscleGroup.includes(m)
            );
            const similarEquipment = exercise.equipment.filter(eq => 
              currentExercise.equipment.includes(eq)
            );
            const sameDifficulty = exercise.difficulty === currentExercise.difficulty;

            return (
              <div key={exercise.id} className="flex items-center justify-between p-3 hover:bg-accent rounded-md border">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{exercise.name}</p>
                    {exercise.isCustom && (
                      <Badge variant="secondary" className="text-xs">Custom</Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge 
                      variant={sameCategory ? "default" : "outline"} 
                      className="text-xs"
                    >
                      {exercise.category}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}
                    >
                      {exercise.difficulty}
                    </Badge>
                    {sharedMuscles.length > 0 && (
                      <Badge variant="secondary" className="text-xs bg-green-50 text-green-700">
                        {sharedMuscles.length} shared muscle{sharedMuscles.length > 1 ? 's' : ''}
                      </Badge>
                    )}
                    {similarEquipment.length > 0 && (
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                        {similarEquipment.length} similar equipment
                      </Badge>
                    )}
                    {sameDifficulty && (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                        Same difficulty
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {exercise.equipment.slice(0, 2).map((eq, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {eq}
                      </Badge>
                    ))}
                    {exercise.equipment.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{exercise.equipment.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {exercise.notes}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addAlternative(exercise.id)}
                  className="ml-3 shrink-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
          {suggestedExercises.length === 0 && (
            <div className="text-center py-8">
              <Dumbbell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'No matching exercises found' : 'No similar exercises available'}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
