
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

  // Get suggested exercises (same muscle groups, different equipment)
  const suggestedExercises = allExercises.filter(ex => 
    ex.id !== currentExercise.id &&
    !alternativeExerciseIds.includes(ex.id) &&
    ex.muscleGroup.some(muscle => currentExercise.muscleGroup.includes(muscle)) &&
    (searchQuery === '' || ex.name.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 10);

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
      </div>

      <ScrollArea className="h-48 border rounded-md p-2">
        <div className="space-y-2">
          {suggestedExercises.map(exercise => (
            <div key={exercise.id} className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
              <div className="flex-1">
                <p className="font-medium text-sm">{exercise.name}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {exercise.category}
                  </Badge>
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
          ))}
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
