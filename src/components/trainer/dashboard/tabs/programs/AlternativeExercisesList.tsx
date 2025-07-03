
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, RotateCcw, Info, Dumbbell } from 'lucide-react';
import { useState } from 'react';
import { ExerciseData } from '@/data/exercises/types';
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (alternativeExercises.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-3 h-auto border border-orange-200 bg-orange-50 hover:bg-orange-100">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-orange-600" />
              <span className="font-medium text-orange-800">
                Alternative Exercises ({alternativeExercises.length})
              </span>
            </div>
            <ChevronDown className={`h-4 w-4 text-orange-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-3">
          <div className="space-y-3">
            {alternativeExercises.map((exercise) => (
              <Card key={exercise.id} className="hover:shadow-sm transition-shadow border-l-4 border-l-orange-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-sm">{exercise.name}</h4>
                        {exercise.isCustom && (
                          <Badge variant="secondary" className="text-xs">Custom</Badge>
                        )}
                        {exercise.isModified && (
                          <Badge variant="outline" className="text-xs">Modified</Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {exercise.category}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}
                        >
                          {exercise.difficulty}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {exercise.muscleGroup.slice(0, 3).map((muscle, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                            {muscle}
                          </Badge>
                        ))}
                        {exercise.muscleGroup.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                            +{exercise.muscleGroup.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
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
                    
                    {onSelectAlternative && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onSelectAlternative(exercise)}
                        className="ml-3 shrink-0"
                      >
                        Use This
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-blue-800 font-medium mb-1">
                  Alternative Exercise Options
                </p>
                <p className="text-xs text-blue-700">
                  These exercises target similar muscle groups and can be used when your preferred equipment is unavailable or you want to add variety to your workout.
                </p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
