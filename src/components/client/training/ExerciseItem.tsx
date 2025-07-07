
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Play, Shuffle, TrendingUp, Info } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Exercise } from "@/data/training/types";
import { SetTracker } from "./SetTracker";
import { ExerciseVideoPlayer } from "./ExerciseVideoPlayer";
import { AlternativeExercises } from "./AlternativeExercises";
import { useExerciseTracking } from "@/hooks/useExerciseTracking";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";
import { exerciseVideoUrls } from "@/data/exercises/videoUrls";
interface ExerciseItemProps {
  exercise: Exercise;
  dayId: string;
  onSaveWeight: (exerciseId: string, dayId: string, weight: number) => void;
}

export function ExerciseItem({ exercise, dayId, onSaveWeight }: ExerciseItemProps) {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const { trackingData, initializeExercise, updateSet, completeExercise, getExerciseProgress } = useExerciseTracking();

  const exerciseTrackingId = `${exercise.id}-${dayId}`;
  
  // Get exercise details from database with flexible matching
  const findExerciseDetails = (exerciseName: string) => {
    const normalizedName = exerciseName.toLowerCase().replace(/[-\s]/g, '');
    return completeExerciseDatabase.find(ex => {
      const dbName = ex.name.toLowerCase().replace(/[-\s]/g, '');
      return dbName === normalizedName || 
             dbName.includes(normalizedName) || 
             normalizedName.includes(dbName);
    });
  };
  
  const exerciseDetails = findExerciseDetails(exercise.name);
  const videoUrl = exerciseDetails ? exerciseVideoUrls[exerciseDetails.id] : undefined;
  
  // Initialize exercise tracking
  useEffect(() => {
    initializeExercise(exercise, dayId);
  }, [exercise.id, dayId]);

  const currentTracking = trackingData[exerciseTrackingId];
  const progress = getExerciseProgress(exercise.id);

  const handleSetUpdate = (setNumber: number, data: any) => {
    updateSet(exerciseTrackingId, setNumber, data);
  };

  const handleCompleteExercise = () => {
    completeExercise(exerciseTrackingId, dayId);
    
    // Calculate average weight from completed sets for backward compatibility
    const completedSets = currentTracking?.currentSets.filter(set => set.completed && set.weight) || [];
    if (completedSets.length > 0) {
      const avgWeight = completedSets.reduce((sum, set) => sum + (set.weight || 0), 0) / completedSets.length;
      onSaveWeight(exercise.id, dayId, avgWeight);
    }
  };

  const getPreviousPerformance = (setNumber: number) => {
    const history = trackingData[exercise.id]?.history;
    if (!history || history.length === 0) return null;
    
    const lastSession = history[history.length - 1];
    const previousSet = lastSession.sets.find(set => set.setNumber === setNumber);
    
    return previousSet ? { weight: previousSet.weight || 0, reps: previousSet.actualReps || 0 } : null;
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">{exercise.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {exercise.sets} sets × {exercise.reps}
              </Badge>
              {exercise.weight && (
                <Badge variant="secondary" className="text-xs">
                  Suggested: {exercise.weight}kg
                </Badge>
              )}
              {exerciseDetails && (
                <Badge variant={exerciseDetails.difficulty === 'advanced' ? 'destructive' : exerciseDetails.difficulty === 'intermediate' ? 'default' : 'secondary'} className="text-xs">
                  {exerciseDetails.difficulty}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Video button - always show with fallback */}
            {videoUrl ? (
              <ExerciseVideoPlayer
                videoUrl={videoUrl}
                exerciseName={exercise.name}
                triggerButton={
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Play className="h-4 w-4" />
                  </Button>
                }
              />
            ) : (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
                <Play className="h-4 w-4 opacity-50" />
              </Button>
            )}
            
            {/* Alternatives button - always show with fallback */}
            {exerciseDetails?.alternativeExercises && exerciseDetails.alternativeExercises.length > 0 ? (
              <AlternativeExercises
                currentExercise={exercise.name}
                alternativeIds={exerciseDetails.alternativeExercises}
              />
            ) : (
              <Button variant="outline" size="sm" className="h-8" disabled>
                <Shuffle className="h-3 w-3 mr-1 opacity-50" />
                No alternatives
              </Button>
            )}
          </div>
        </div>

        {/* Progress indicator */}
        {progress && (
          <div className="flex items-center gap-2 mt-2 text-sm">
            <TrendingUp className={`h-4 w-4 ${progress.weightProgress > 0 ? 'text-green-600' : 'text-red-500'}`} />
            <span className={progress.weightProgress > 0 ? 'text-green-600' : 'text-red-500'}>
              {progress.weightProgress > 0 ? '+' : ''}{progress.weightProgress.toFixed(1)}kg
              {progress.improvementPercentage !== 0 && (
                <span className="text-muted-foreground">
                  ({progress.improvementPercentage > 0 ? '+' : ''}{progress.improvementPercentage.toFixed(1)}%)
                </span>
              )}
            </span>
          </div>
        )}
      </CardHeader>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-3 h-auto">
            <span className="text-sm font-medium">
              {isExpanded ? 'Hide Details' : 'Show Set Tracking'}
            </span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {/* Trainer notes */}
            {exercise.notes && (
              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-200">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Trainer Notes:</p>
                    <p className="text-sm text-blue-700">{exercise.notes}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Exercise details from database */}
            {exerciseDetails && (
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Muscles:</strong> {exerciseDetails.muscleGroup.join(', ')}
                </p>
                {exerciseDetails.equipment.length > 0 && (
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Equipment:</strong> {exerciseDetails.equipment.join(', ')}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  {exerciseDetails.notes}
                </p>
              </div>
            )}

            {/* Set tracking */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Set Tracking</h4>
                <Button
                  onClick={handleCompleteExercise}
                  size="sm"
                  variant="default"
                  disabled={!currentTracking?.currentSets.some(set => set.completed)}
                >
                  Complete Exercise
                </Button>
              </div>
              
              {currentTracking?.currentSets.map((setData, index) => (
                <SetTracker
                  key={index}
                  setData={setData}
                  suggestedWeight={currentTracking.suggestedWeight}
                  onUpdate={(data) => handleSetUpdate(setData.setNumber, data)}
                  previousPerformance={getPreviousPerformance(setData.setNumber)}
                  showProgress={true}
                />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
