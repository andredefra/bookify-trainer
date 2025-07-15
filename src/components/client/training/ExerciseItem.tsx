
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
    <div className="border-b last:border-b-0">
      <div className="p-3 sm:p-4">
        {/* Exercise Header - Mobile Optimized */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-base sm:text-lg mb-2 truncate">{exercise.name}</h3>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <Badge variant="outline" className="text-xs">
                  {exercise.sets} sets × {exercise.reps}
                </Badge>
                {exercise.weight && (
                  <Badge variant="secondary" className="text-xs">
                    {exercise.weight}kg suggested
                  </Badge>
                )}
                {exerciseDetails && (
                  <Badge variant={exerciseDetails.difficulty === 'advanced' ? 'destructive' : exerciseDetails.difficulty === 'intermediate' ? 'default' : 'secondary'} className="text-xs">
                    {exerciseDetails.difficulty}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Exercise Actions - Mobile Stacked */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-1">
              {videoUrl ? (
                <ExerciseVideoPlayer
                  videoUrl={videoUrl}
                  exerciseName={exercise.name}
                  triggerButton={
                    <Button variant="outline" size="sm" className="text-xs min-h-[44px] sm:min-h-[32px] sm:h-8 sm:w-8 sm:p-0">
                      <Play className="h-4 w-4 sm:mr-0 mr-1" />
                      <span className="sm:hidden">Video</span>
                    </Button>
                  }
                />
              ) : (
                <Button variant="outline" size="sm" className="text-xs min-h-[44px] sm:min-h-[32px] sm:h-8 sm:w-8 sm:p-0" disabled>
                  <Play className="h-4 w-4 sm:mr-0 mr-1 opacity-50" />
                  <span className="sm:hidden opacity-50">No Video</span>
                </Button>
              )}
              
              {exerciseDetails?.alternativeExercises && exerciseDetails.alternativeExercises.length > 0 ? (
                <AlternativeExercises
                  currentExercise={exercise.name}
                  alternativeIds={exerciseDetails.alternativeExercises}
                />
              ) : (
                <Button variant="outline" size="sm" className="text-xs min-h-[44px] sm:min-h-[32px]" disabled>
                  <Shuffle className="h-3 w-3 mr-1 opacity-50" />
                  <span className="opacity-50">No alternatives</span>
                </Button>
              )}
            </div>
          </div>

          {/* Progress indicator - More prominent on mobile */}
          {progress && (
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <TrendingUp className={`h-4 w-4 ${progress.weightProgress > 0 ? 'text-green-600' : 'text-red-500'}`} />
              <span className={`text-sm font-medium ${progress.weightProgress > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {progress.weightProgress > 0 ? '+' : ''}{progress.weightProgress.toFixed(1)}kg
                {progress.improvementPercentage !== 0 && (
                  <span className="text-muted-foreground ml-1">
                    ({progress.improvementPercentage > 0 ? '+' : ''}{progress.improvementPercentage.toFixed(1)}%)
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Collapsible Content */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-3 h-auto min-h-[44px] bg-gray-50 hover:bg-gray-100">
              <span className="text-sm font-medium">
                {isExpanded ? 'Hide Set Tracking' : 'Track Sets'}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 mt-4">
            {/* Trainer notes */}
            {exercise.notes && (
              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-200">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Trainer Notes:</p>
                    <p className="text-sm text-blue-700 mt-1">{exercise.notes}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Exercise details from database */}
            {exerciseDetails && (
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-sm mb-2">Exercise Details</h4>
                <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <p><strong>Muscles:</strong> {exerciseDetails.muscleGroup.join(', ')}</p>
                  {exerciseDetails.equipment.length > 0 && (
                    <p><strong>Equipment:</strong> {exerciseDetails.equipment.join(', ')}</p>
                  )}
                  <p>{exerciseDetails.notes}</p>
                </div>
              </div>
            )}

            {/* Set tracking - Mobile optimized */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h4 className="font-medium text-sm sm:text-base">Set Tracking</h4>
                <Button
                  onClick={handleCompleteExercise}
                  size="sm"
                  variant="default"
                  disabled={!currentTracking?.currentSets.some(set => set.completed)}
                  className="w-full sm:w-auto min-h-[44px] sm:min-h-[36px]"
                >
                  Complete Exercise
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
