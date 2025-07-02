
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, RotateCcw, Info } from 'lucide-react';
import { useState } from 'react';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary';

interface AlternativeExercisesListProps {
  alternativeExerciseIds: string[];
  onSelectAlternative?: (exercise: ExerciseData) => void;
  className?: string;
}

export function AlternativeExercisesList({ 
  alternativeExerciseIds, 
  onSelectAlternative,
  className 
}: AlternativeExercisesListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { allExercises } = useExerciseLibrary();
  
  // Get alternative exercises from IDs
  const alternativeExercises = alternativeExerciseIds
    ?.map(id => allExercises.find(ex => ex.id === id))
    .filter(Boolean) as ExerciseData[] || [];

  if (alternativeExercises.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-2 h-auto">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Alternative Exercises ({alternativeExercises.length})</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-2">
          <div className="space-y-2">
            {alternativeExercises.map((exercise) => (
              <Card key={exercise.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{exercise.name}</h4>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {exercise.equipment.map((eq, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {eq}
                          </Badge>
                        ))}
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                            exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {exercise.notes}
                      </p>
                    </div>
                    
                    {onSelectAlternative && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onSelectAlternative(exercise)}
                        className="ml-2 shrink-0"
                      >
                        Use This
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-3 p-2 bg-blue-50 rounded-md">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-700">
                These exercises target similar muscle groups and can be used when your preferred equipment is unavailable.
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
