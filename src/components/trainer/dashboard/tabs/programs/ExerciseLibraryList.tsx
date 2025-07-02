
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Play, ChevronDown, Info, Dumbbell, Image, ExternalLink } from 'lucide-react';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';
import { AlternativeExercisesList } from './AlternativeExercisesList';
import { EquipmentImageGallery } from './EquipmentImageGallery';

interface ExerciseLibraryListProps {
  exercises: ExerciseData[];
  onEdit: (exercise: ExerciseData) => void;
  onDelete: ((id: string) => void) | null;
}

export function ExerciseLibraryList({ exercises, onEdit, onDelete }: ExerciseLibraryListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<ExerciseData | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const handleDeleteClick = (exercise: ExerciseData) => {
    setExerciseToDelete(exercise);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (exerciseToDelete && onDelete) {
      onDelete(exerciseToDelete.id);
    }
    setDeleteDialogOpen(false);
    setExerciseToDelete(null);
  };

  const previewVideo = (videoUrl?: string) => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  const toggleCardExpansion = (exerciseId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (exercises.length === 0) {
    return (
      <div className="text-center py-12">
        <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground text-lg font-medium">No exercises found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your search filters or add some custom exercises
        </p>
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="h-[calc(100vh-320px)] min-h-[600px]">
        <div className="space-y-2 pr-2">
          {exercises.map((exercise) => {
            const isExpanded = expandedCards.has(exercise.id);
            const hasVideo = exercise.videoUrl;
            const hasImages = exercise.equipmentImages && Object.keys(exercise.equipmentImages).length > 0;
            const hasAlternatives = exercise.alternativeExercises && exercise.alternativeExercises.length > 0;
            
            return (
              <Card key={exercise.id} className="relative hover:shadow-md transition-shadow">
                <Collapsible 
                  open={isExpanded} 
                  onOpenChange={() => toggleCardExpansion(exercise.id)}
                >
                  <CardHeader className="pb-2">
                    <CollapsibleTrigger asChild>
                      <div className="flex items-start justify-between cursor-pointer">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm hover:text-primary transition-colors truncate">
                              {exercise.name}
                            </h3>
                            <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                            {exercise.isCustom && (
                              <Badge variant="secondary" className="text-xs">Custom</Badge>
                            )}
                            {exercise.isModified && (
                              <Badge variant="outline" className="text-xs">Modified</Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-1">
                            <Badge variant="outline" className="text-xs capitalize font-medium">
                              {exercise.category}
                            </Badge>
                            <Badge variant="secondary" className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                              {exercise.difficulty}
                            </Badge>
                            
                            {/* Media indicators */}
                            <div className="flex gap-1">
                              {hasVideo && (
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                  <Play className="h-2 w-2 mr-1" />
                                  Video
                                </Badge>
                              )}
                              {hasImages && (
                                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                                  <Image className="h-2 w-2 mr-1" />
                                  Images
                                </Badge>
                              )}
                              {hasAlternatives && (
                                <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                                  <ExternalLink className="h-2 w-2 mr-1" />
                                  Alternatives
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-1">
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

                          <div className="flex flex-wrap gap-1">
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
                        </div>

                        <div className="flex items-center gap-1 ml-2 shrink-0">
                          {hasVideo && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                previewVideo(exercise.videoUrl);
                              }}
                              className="h-7 w-7 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              title="Watch video"
                            >
                              <Play className="h-3 w-3" />
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
                            title="Edit exercise"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>

                          {onDelete && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(exercise);
                              }}
                              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                              title="Delete exercise"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                  </CardHeader>

                  <CollapsibleContent>
                    <CardContent className="pt-0 space-y-3">
                      {/* Exercise Instructions */}
                      <div>
                        <h4 className="font-medium text-sm mb-1 flex items-center gap-2">
                          <Info className="h-3 w-3 text-blue-500" />
                          Instructions
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {exercise.notes}
                        </p>
                      </div>

                      {/* Equipment Images Gallery */}
                      {hasImages && (
                        <EquipmentImageGallery 
                          equipmentImages={exercise.equipmentImages!}
                        />
                      )}

                      {/* Video Tutorial */}
                      {hasVideo && (
                        <div>
                          <h4 className="font-medium text-sm mb-1 flex items-center gap-2">
                            <Play className="h-3 w-3 text-blue-500" />
                            Video Tutorial
                          </h4>
                          <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="w-12 h-9 bg-blue-100 rounded flex items-center justify-center shrink-0">
                              <Play className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-blue-900 truncate">
                                Watch {exercise.name} demonstration
                              </p>
                              <p className="text-xs text-blue-700">
                                Learn proper form and technique
                              </p>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => previewVideo(exercise.videoUrl)}
                              className="bg-blue-600 hover:bg-blue-700 h-8 text-xs shrink-0"
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Watch
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Complete Muscle Groups */}
                      {exercise.muscleGroup.length > 2 && (
                        <div>
                          <h4 className="font-medium text-sm mb-1">All Targeted Muscles</h4>
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
                          <h4 className="font-medium text-sm mb-1">Required Equipment</h4>
                          <div className="flex flex-wrap gap-1">
                            {exercise.equipment.map((eq, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {eq}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Alternative Exercises */}
                      {hasAlternatives && (
                        <AlternativeExercisesList
                          alternativeExerciseIds={exercise.alternativeExercises!}
                          className="mt-3"
                        />
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Exercise</AlertDialogTitle>
            <AlertDialogDescription>
              {exerciseToDelete?.isCustom 
                ? "Are you sure you want to permanently delete this custom exercise? This action cannot be undone."
                : "Are you sure you want to remove this exercise from your library? You can restore it later if needed."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {exerciseToDelete?.isCustom ? 'Delete Permanently' : 'Remove from Library'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
