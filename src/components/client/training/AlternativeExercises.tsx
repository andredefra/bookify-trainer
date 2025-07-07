import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shuffle, Play, ArrowRight } from 'lucide-react';
import { ExerciseVideoPlayer } from './ExerciseVideoPlayer';
import { completeExerciseDatabase } from '@/data/exercises/exerciseDatabase';
import { exerciseVideoUrls } from '@/data/exercises/videoUrls';

interface AlternativeExercisesProps {
  currentExercise: string;
  alternativeIds?: string[];
  onExerciseChange?: (newExerciseId: string, newExerciseName: string) => void;
}

export function AlternativeExercises({ 
  currentExercise, 
  alternativeIds = [], 
  onExerciseChange 
}: AlternativeExercisesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getExerciseDetails = (exerciseId: string) => {
    return completeExerciseDatabase.find(ex => ex.id === exerciseId);
  };

  const getVideoUrl = (exerciseId: string) => {
    return exerciseVideoUrls[exerciseId];
  };

  const handleExerciseChange = (exerciseId: string, exerciseName: string) => {
    onExerciseChange?.(exerciseId, exerciseName);
    setIsOpen(false);
  };

  if (alternativeIds.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Shuffle className="h-3 w-3 mr-1" />
          Alternatives ({alternativeIds.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Alternative Exercises</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Choose an alternative exercise if the equipment is not available or you prefer a different movement.
          </div>
          
          <div className="grid gap-4">
            {alternativeIds.map((exerciseId) => {
              const exercise = getExerciseDetails(exerciseId);
              const videoUrl = getVideoUrl(exerciseId);
              
              if (!exercise) return null;

              return (
                <div key={exerciseId} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{exercise.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {exercise.notes}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {exercise.difficulty}
                        </Badge>
                        {exercise.muscleGroup.map((muscle, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                      
                      {exercise.equipment.length > 0 && (
                        <div className="mt-2">
                          <span className="text-xs text-muted-foreground">Equipment: </span>
                          <span className="text-xs">{exercise.equipment.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {videoUrl && (
                      <ExerciseVideoPlayer
                        videoUrl={videoUrl}
                        exerciseName={exercise.name}
                        triggerButton={
                          <Button variant="ghost" size="sm" className="h-8">
                            <Play className="h-3 w-3 mr-1" />
                            Video
                          </Button>
                        }
                      />
                    )}
                    
                    {onExerciseChange && (
                      <Button
                        onClick={() => handleExerciseChange(exerciseId, exercise.name)}
                        size="sm"
                        className="h-8"
                      >
                        <ArrowRight className="h-3 w-3 mr-1" />
                        Switch to this
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}