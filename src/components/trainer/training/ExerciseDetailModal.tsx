import { memo, useState, useMemo } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExerciseData } from '@/data/exercises/types';
import { deriveMechanics, deriveForceType, getMechanicsColor, getForceTypeColor, getExerciseGifUrl } from '@/data/exercises/biomechanicsMapping';
import { getExerciseVideoUrl } from '@/data/exercises/videoUrls';
import { completeExerciseDatabase } from '@/data/exercises/exerciseDatabase';
import { 
  Play, 
  ExternalLink, 
  Target, 
  Dumbbell, 
  BarChart3, 
  Zap, 
  Info,
  Plus,
  X,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseDetailModalProps {
  exercise: ExerciseData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (exercise: ExerciseData) => void;
  onExerciseChange?: (exercise: ExerciseData) => void;
  showSelectButton?: boolean;
}

const categoryIcons: Record<string, string> = {
  chest: '💪',
  back: '🔙',
  legs: '🦵',
  shoulders: '🏋️',
  arms: '💪',
  core: '🎯',
  cardio: '❤️',
  functional: '⚡',
  flexibility: '🧘',
  plyometric: '🚀',
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    chest: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    back: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    legs: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    shoulders: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    arms: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    core: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    cardio: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    functional: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    flexibility: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
    plyometric: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  };
  return colors[category] || 'bg-muted text-muted-foreground';
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const ExerciseDetailModal = memo(({
  exercise,
  open,
  onOpenChange,
  onSelect,
  onExerciseChange,
  showSelectButton = false,
}: ExerciseDetailModalProps) => {
  const [currentExercise, setCurrentExercise] = useState<ExerciseData | null>(exercise);
  
  // Sync current exercise with prop when modal opens or exercise changes
  useMemo(() => {
    if (exercise) {
      setCurrentExercise(exercise);
    }
  }, [exercise]);

  // Get alternative exercises with same primary muscle group
  const alternativeExercises = useMemo(() => {
    if (!currentExercise) return [];
    
    const primaryMuscle = currentExercise.muscleGroup[0];
    if (!primaryMuscle) return [];
    
    return completeExerciseDatabase
      .filter(ex => 
        ex.id !== currentExercise.id && 
        ex.muscleGroup.includes(primaryMuscle)
      )
      .slice(0, 4);
  }, [currentExercise]);
  
  if (!currentExercise) return null;
  
  const gifUrl = getExerciseGifUrl(currentExercise);
  const videoUrl = getExerciseVideoUrl(currentExercise.id);
  const mechanics = deriveMechanics(currentExercise);
  const forceType = deriveForceType(currentExercise);
  const categoryIcon = categoryIcons[currentExercise.category] || '🏋️';

  const handleVideoClick = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  const handleSelect = () => {
    if (onSelect && currentExercise) {
      onSelect(currentExercise);
      onOpenChange(false);
    }
  };

  const handleAlternativeClick = (altExercise: ExerciseData) => {
    setCurrentExercise(altExercise);
    if (onExerciseChange) {
      onExerciseChange(altExercise);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-0">
            {/* Hero Image/GIF Section - Constrained height */}
            <div className="relative h-[250px] max-h-[300px] w-full overflow-hidden bg-muted rounded-t-xl">
              <img 
                src={gifUrl}
                alt={currentExercise.name}
                className="w-full h-full object-cover"
              />
              
              {/* Close button overlay */}
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              
              {/* Video button overlay */}
              {videoUrl && (
                <button
                  onClick={handleVideoClick}
                  className="absolute top-3 left-3 flex items-center gap-2 px-3 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">Watch Video</span>
                </button>
              )}
              
              {/* Badges overlay at bottom */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                <Badge className={`${getMechanicsColor(mechanics)} backdrop-blur-sm`} variant="secondary">
                  {mechanics === 'compound' ? 'Compound' : 'Isolation'}
                </Badge>
                <Badge className={`${getForceTypeColor(forceType)} backdrop-blur-sm`} variant="secondary">
                  {forceType.charAt(0).toUpperCase() + forceType.slice(1)}
                </Badge>
                <Badge className={`${getDifficultyColor(currentExercise.difficulty)} backdrop-blur-sm`} variant="secondary">
                  {currentExercise.difficulty.charAt(0).toUpperCase() + currentExercise.difficulty.slice(1)}
                </Badge>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-6 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold leading-tight">{currentExercise.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${getCategoryColor(currentExercise.category)} text-sm`} variant="secondary">
                        {categoryIcon} {currentExercise.category.charAt(0).toUpperCase() + currentExercise.category.slice(1)}
                      </Badge>
                      {currentExercise.isCustom && (
                        <Badge variant="outline">Custom Exercise</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Target Muscles */}
              {currentExercise.muscleGroup && currentExercise.muscleGroup.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Target Muscles</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentExercise.muscleGroup.map((muscle, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className={cn(
                          "text-sm",
                          idx === 0 && "bg-primary/10 border-primary/30"
                        )}
                      >
                        {muscle}
                        {idx === 0 && <span className="ml-1 text-xs opacity-60">(Primary)</span>}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Equipment */}
              {currentExercise.equipment && currentExercise.equipment.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Dumbbell className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Equipment Required</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentExercise.equipment.map((eq, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {eq}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Biomechanics Details */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm">Biomechanics</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50 border">
                    <div className="text-xs text-muted-foreground mb-1">Mechanics Type</div>
                    <div className="font-medium flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5" />
                      {mechanics === 'compound' ? 'Compound Movement' : 'Isolation Movement'}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {mechanics === 'compound' 
                        ? 'Works multiple muscle groups simultaneously' 
                        : 'Focuses on a single muscle group'}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border">
                    <div className="text-xs text-muted-foreground mb-1">Force Vector</div>
                    <div className="font-medium flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5" />
                      {forceType.charAt(0).toUpperCase() + forceType.slice(1)} Movement
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {forceType === 'push' && 'Pushing motion away from body'}
                      {forceType === 'pull' && 'Pulling motion towards body'}
                      {forceType === 'squat' && 'Knee-dominant lower body pattern'}
                      {forceType === 'hinge' && 'Hip-dominant lower body pattern'}
                      {forceType === 'static' && 'Isometric/stabilization hold'}
                      {forceType === 'carry' && 'Loaded locomotion pattern'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Notes/Instructions */}
              {currentExercise.notes && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Instructions & Notes</h3>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 border text-sm leading-relaxed">
                    {currentExercise.notes}
                  </div>
                </div>
              )}

              {/* Alternative Exercises Section */}
              {alternativeExercises.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <RefreshCw className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Alternative Exercises</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {alternativeExercises.map((altExercise) => {
                      const altGifUrl = getExerciseGifUrl(altExercise);
                      return (
                        <button
                          key={altExercise.id}
                          onClick={() => handleAlternativeClick(altExercise)}
                          className="group relative rounded-lg overflow-hidden border bg-card hover:border-primary/50 hover:shadow-md transition-all text-left"
                        >
                          <div className="aspect-square overflow-hidden bg-muted">
                            <img 
                              src={altGifUrl}
                              alt={altExercise.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-2">
                            <p className="text-xs font-medium line-clamp-2 leading-tight">
                              {altExercise.name}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                {videoUrl && (
                  <Button variant="outline" onClick={handleVideoClick} className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Video Tutorial
                  </Button>
                )}
                {showSelectButton && onSelect && (
                  <Button onClick={handleSelect} className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Workout
                  </Button>
                )}
                {!showSelectButton && !videoUrl && (
                  <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
                    Close
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
});

ExerciseDetailModal.displayName = 'ExerciseDetailModal';
