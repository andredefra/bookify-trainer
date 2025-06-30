
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, Edit, Trash2, Play, Dumbbell, Settings } from 'lucide-react';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';

interface ExerciseLibraryListProps {
  exercises: ExerciseData[];
  onEdit: ((exercise: ExerciseData) => void) | null;
  onDelete: ((id: string) => void) | null;
}

export function ExerciseLibraryList({ exercises, onEdit, onDelete }: ExerciseLibraryListProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      chest: 'bg-red-100 text-red-800',
      back: 'bg-green-100 text-green-800',
      legs: 'bg-blue-100 text-blue-800',
      shoulders: 'bg-yellow-100 text-yellow-800',
      arms: 'bg-purple-100 text-purple-800',
      core: 'bg-orange-100 text-orange-800',
      cardio: 'bg-pink-100 text-pink-800',
      stretching: 'bg-teal-100 text-teal-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (exercises.length === 0) {
    return (
      <div className="text-center py-12">
        <Dumbbell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No exercises found</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <Card 
            key={exercise.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setExpandedCard(expandedCard === exercise.id ? null : exercise.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">{exercise.name}</CardTitle>
                <div className="flex gap-1 ml-2 shrink-0">
                  {exercise.isCustom && (
                    <Badge variant="outline">Custom</Badge>
                  )}
                  {(exercise as any).isModified && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <Settings className="h-3 w-3 mr-1" />
                      Modified
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge className={getCategoryColor(exercise.category)}>
                  {exercise.category}
                </Badge>
                <Badge className={getDifficultyColor(exercise.difficulty)}>
                  {exercise.difficulty}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Muscle Groups:</p>
                <div className="flex flex-wrap gap-1">
                  {exercise.muscleGroup.map((muscle, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>

              {exercise.equipment.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-1">Equipment:</p>
                  <p className="text-sm text-muted-foreground">
                    {exercise.equipment.join(', ')}
                  </p>
                </div>
              )}

              {expandedCard === exercise.id && (
                <div className="space-y-3 pt-3 border-t">
                  <div>
                    <p className="text-sm font-medium mb-1">Exercise Notes:</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.notes}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exercise.videoUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(exercise.videoUrl, '_blank');
                        }}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Video
                      </Button>
                    )}

                    {onEdit && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(exercise);
                        }}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    )}

                    {exercise.isCustom && onDelete && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to delete this exercise?')) {
                            onDelete(exercise.id);
                          }
                        }}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
