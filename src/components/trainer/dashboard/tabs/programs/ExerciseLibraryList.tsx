
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  Edit2, 
  Trash2, 
  Play, 
  Camera,
  Dumbbell,
  Users,
  Clock,
  Target
} from 'lucide-react';
import { ExerciseData } from '@/data/exercises/types';
import { AlternativeExercisesList } from './AlternativeExercisesList';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExerciseLibraryListProps {
  exercises: ExerciseData[];
  onEdit: (exercise: ExerciseData) => void;
  onDelete: (id: string) => void;
}

export function ExerciseLibraryList({ exercises, onEdit, onDelete }: ExerciseLibraryListProps) {
  const [expandedExercises, setExpandedExercises] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();

  const toggleExpanded = (exerciseId: string) => {
    const newExpanded = new Set(expandedExercises);
    if (newExpanded.has(exerciseId)) {
      newExpanded.delete(exerciseId);
    } else {
      newExpanded.add(exerciseId);
    }
    setExpandedExercises(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      chest: 'bg-red-50 text-red-700 border-red-200',
      back: 'bg-blue-50 text-blue-700 border-blue-200', 
      legs: 'bg-green-50 text-green-700 border-green-200',
      shoulders: 'bg-orange-50 text-orange-700 border-orange-200',
      arms: 'bg-purple-50 text-purple-700 border-purple-200',
      core: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      cardio: 'bg-pink-50 text-pink-700 border-pink-200',
      functional: 'bg-teal-50 text-teal-700 border-teal-200',
      flexibility: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      plyometric: 'bg-amber-50 text-amber-700 border-amber-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const previewVideo = (videoUrl: string) => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  if (exercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No exercises found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria or filters
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-3 p-1">
        {exercises.map((exercise) => {
          const isExpanded = expandedExercises.has(exercise.id);
          
          return (
            <Card key={exercise.id} className="hover:shadow-md transition-shadow">
              <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(exercise.id)}>
                <CollapsibleTrigger asChild>
                  <CardContent className="p-4 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-sm truncate">{exercise.name}</h3>
                          {exercise.isCustom && (
                            <Badge variant="secondary" className="text-xs">Custom</Badge>
                          )}
                          {exercise.isModified && (
                            <Badge variant="outline" className="text-xs">Modified</Badge>
                          )}
                        </div>

                        {/* Categories and Difficulty */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs capitalize ${getCategoryColor(exercise.category)}`}
                          >
                            {exercise.category}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}
                          >
                            {exercise.difficulty}
                          </Badge>
                        </div>

                        {/* Muscle Groups */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {exercise.muscleGroup.slice(0, isMobile ? 2 : 3).map((muscle, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                              {muscle}
                            </Badge>
                          ))}
                          {exercise.muscleGroup.length > (isMobile ? 2 : 3) && (
                            <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                              +{exercise.muscleGroup.length - (isMobile ? 2 : 3)} more
                            </Badge>
                          )}
                        </div>

                        {/* Equipment */}
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

                        {/* Notes Preview */}
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {exercise.notes}
                        </p>

                        {/* Quick Stats */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            <span>{exercise.muscleGroup.length} muscles</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Dumbbell className="h-3 w-3" />
                            <span>{exercise.equipment.length} equipment</span>
                          </div>
                          {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{exercise.alternativeExercises.length} alternatives</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions and Expand Button */}
                      <div className="flex items-center gap-2 ml-3">
                        <div className="flex gap-1">
                          {exercise.videoUrl && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                previewVideo(exercise.videoUrl!);
                              }}
                              className="h-7 w-7 p-0"
                            >
                              <Play className="h-3 w-3" />
                            </Button>
                          )}
                          
                          {exercise.equipmentImages && Object.keys(exercise.equipmentImages).length > 0 && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                            >
                              <Camera className="h-3 w-3" />
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(exercise);
                            }}
                            className="h-7 w-7 p-0"
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          
                          {exercise.isCustom && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(exercise.id);
                              }}
                              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        
                        <ChevronDown 
                          className={`h-4 w-4 text-muted-foreground transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-4 border-t bg-muted/20">
                    {/* Full Description */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Instructions</h4>
                      <p className="text-sm text-muted-foreground">{exercise.notes}</p>
                    </div>

                    {/* Complete Muscle Groups */}
                    {exercise.muscleGroup.length > (isMobile ? 2 : 3) && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Target Muscles</h4>
                        <div className="flex flex-wrap gap-1">
                          {exercise.muscleGroup.map((muscle, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Complete Equipment List */}
                    {exercise.equipment.length > 2 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Required Equipment</h4>
                        <div className="flex flex-wrap gap-1">
                          {exercise.equipment.map((eq, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {eq}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Alternative Exercises - Using the proper component */}
                    {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
                      <AlternativeExercisesList
                        alternativeExerciseIds={exercise.alternativeExercises}
                        className="mt-4"
                      />
                    )}

                    {/* Video Link */}
                    {exercise.videoUrl && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Video Demonstration</h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => previewVideo(exercise.videoUrl!)}
                          className="flex items-center gap-2"
                        >
                          <Play className="h-3 w-3" />
                          Watch Video
                        </Button>
                      </div>
                    )}

                    {/* Equipment Images */}
                    {exercise.equipmentImages && Object.keys(exercise.equipmentImages).length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Equipment Images</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {Object.entries(exercise.equipmentImages).map(([equipment, imageUrl]) => (
                            <div key={equipment} className="text-center">
                              <img 
                                src={imageUrl} 
                                alt={equipment}
                                className="w-full h-16 object-cover rounded-md border"
                              />
                              <p className="text-xs text-muted-foreground mt-1">{equipment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
}
