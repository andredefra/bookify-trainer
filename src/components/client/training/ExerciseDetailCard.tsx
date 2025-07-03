
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  Play, 
  Camera, 
  Target, 
  Dumbbell, 
  Users,
  Info,
  Youtube,
  Video
} from 'lucide-react';
import { ExerciseData } from '@/data/exercises/types';
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExerciseDetailCardProps {
  exerciseName: string;
  exerciseNotes?: string;
  sets?: string;
  reps?: string;
  weight?: number;
  className?: string;
}

export function ExerciseDetailCard({ 
  exerciseName, 
  exerciseNotes, 
  sets, 
  reps, 
  weight,
  className = "" 
}: ExerciseDetailCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const { getExerciseById, getExerciseByName } = useExerciseLibrary();
  
  // Try to find the exercise in the database
  const exerciseData = getExerciseById(exerciseName) || getExerciseByName(exerciseName);

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

  const getAlternativeExercises = (alternativeIds: string[]) => {
    if (!alternativeIds || alternativeIds.length === 0) return [];
    
    return alternativeIds
      .map(id => getExerciseById(id))
      .filter((ex): ex is ExerciseData => ex !== undefined)
      .slice(0, 3); // Show max 3 alternatives
  };

  return (
    <Card className={`${className}`}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base mb-2">{exerciseName}</CardTitle>
                
                {/* Workout Parameters */}
                <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-2 text-sm text-muted-foreground mb-3`}>
                  {sets && <span><strong>Sets:</strong> {sets}</span>}
                  {reps && <span><strong>Reps:</strong> {reps}</span>}
                  {weight && <span><strong>Weight:</strong> {weight}kg</span>}
                </div>

                {/* Exercise Data from Database */}
                {exerciseData && (
                  <div className="space-y-2">
                    {/* Categories and Difficulty */}
                    <div className="flex flex-wrap gap-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs capitalize ${getCategoryColor(exerciseData.category)}`}
                      >
                        {exerciseData.category}
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getDifficultyColor(exerciseData.difficulty)}`}
                      >
                        {exerciseData.difficulty}
                      </Badge>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        <span>{exerciseData.muscleGroup.length} muscles</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Dumbbell className="h-3 w-3" />
                        <span>{exerciseData.equipment.length} equipment</span>
                      </div>
                      {exerciseData.alternativeExercises && exerciseData.alternativeExercises.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{exerciseData.alternativeExercises.length} alternatives</span>
                        </div>
                      )}
                      {exerciseData.videoUrl && (
                        <div className="flex items-center gap-1">
                          <Play className="h-3 w-3" />
                          <span>Video</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 ml-3">
                {exerciseData?.videoUrl && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      previewVideo(exerciseData.videoUrl!);
                    }}
                    className="h-7 w-7 p-0"
                  >
                    {exerciseData.videoUrl.includes('youtube') ? (
                      <Youtube className="h-3 w-3 text-red-500" />
                    ) : (
                      <Video className="h-3 w-3 text-blue-500" />
                    )}
                  </Button>
                )}
                
                <ChevronDown 
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4 border-t bg-muted/20">
            {/* Instructions */}
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Instructions
              </h4>
              <p className="text-sm text-muted-foreground">
                {exerciseData?.notes || exerciseNotes || "No specific instructions provided."}
              </p>
            </div>

            {exerciseData && (
              <>
                {/* Target Muscles */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Target Muscles
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {exerciseData.muscleGroup.map((muscle, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Required Equipment */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Dumbbell className="h-4 w-4" />
                    Required Equipment
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {exerciseData.equipment.map((eq, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {eq}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Alternative Exercises */}
                {exerciseData.alternativeExercises && exerciseData.alternativeExercises.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Alternative Exercises
                    </h4>
                    <div className="space-y-2">
                      {getAlternativeExercises(exerciseData.alternativeExercises).map((altExercise, idx) => (
                        <div key={idx} className="p-2 bg-background rounded border">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">{altExercise.name}</p>
                              <div className="flex gap-1 mt-1">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getCategoryColor(altExercise.category)}`}
                                >
                                  {altExercise.category}
                                </Badge>
                                <Badge 
                                  variant="secondary" 
                                  className={`text-xs ${getDifficultyColor(altExercise.difficulty)}`}
                                >
                                  {altExercise.difficulty}
                                </Badge>
                              </div>
                            </div>
                            {altExercise.videoUrl && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => previewVideo(altExercise.videoUrl!)}
                                className="h-6 w-6 p-0"
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      {exerciseData.alternativeExercises.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{exerciseData.alternativeExercises.length - 3} more alternatives available
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Equipment Images */}
                {exerciseData.equipmentImages && Object.keys(exerciseData.equipmentImages).length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Equipment Images
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {Object.entries(exerciseData.equipmentImages).map(([equipment, imageUrl]) => (
                        <div key={equipment} className="text-center">
                          <img 
                            src={imageUrl as string} 
                            alt={equipment}
                            className="w-full h-16 object-cover rounded-md border"
                          />
                          <p className="text-xs text-muted-foreground mt-1">{equipment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
