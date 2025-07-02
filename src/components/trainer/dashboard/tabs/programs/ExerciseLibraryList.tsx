
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Play, RotateCcw } from 'lucide-react';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';

interface ExerciseLibraryListProps {
  exercises: ExerciseData[];
  onEdit: (exercise: ExerciseData) => void;
  onDelete: ((id: string) => void) | null;
}

export function ExerciseLibraryList({ exercises, onEdit, onDelete }: ExerciseLibraryListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<ExerciseData | null>(null);

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

  if (exercises.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No exercises found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your search filters
        </p>
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="h-[500px]">
        <div className="space-y-3">
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-sm">{exercise.name}</h3>
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
                      <Badge variant="outline" className="text-xs capitalize">
                        {exercise.difficulty}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {exercise.muscleGroup.slice(0, 3).map((muscle, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                      {exercise.muscleGroup.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{exercise.muscleGroup.length - 3} more
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

                  <div className="flex items-center gap-1 ml-4">
                    {exercise.videoUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => previewVideo(exercise.videoUrl)}
                        className="h-8 w-8 p-0"
                      >
                        <Play className="h-3 w-3" />
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => onEdit(exercise)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>

                    {onDelete && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDeleteClick(exercise)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {exercise.notes}
                </p>
              </CardContent>
            </Card>
          ))}
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
