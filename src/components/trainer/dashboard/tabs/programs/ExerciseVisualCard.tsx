import { memo, useState } from 'react';
import { ExerciseData } from '@/data/exercises/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Plus, Edit, Trash2, Video, Dumbbell, Eye } from 'lucide-react';
import { deriveMechanics, deriveForceType, getMechanicsColor, getForceTypeColor, getExerciseGifUrl } from '@/data/exercises/biomechanicsMapping';
import { getExerciseVideoUrl } from '@/data/exercises/videoUrls';
import { ExercisePlaceholderAnimated } from '@/components/trainer/training/ExercisePlaceholderAnimated';
import { cn } from '@/lib/utils';

interface ExerciseVisualCardProps {
  exercise: ExerciseData;
  onSelect?: (exercise: ExerciseData) => void;
  onEdit?: (exercise: ExerciseData) => void;
  onDelete?: (id: string) => void;
  onViewDetails?: (exercise: ExerciseData) => void;
  selectionMode?: boolean;
  compact?: boolean;
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

const categoryGradients: Record<string, string> = {
  chest: 'from-red-500/20 to-orange-500/20',
  back: 'from-blue-500/20 to-cyan-500/20',
  legs: 'from-green-500/20 to-emerald-500/20',
  shoulders: 'from-orange-500/20 to-amber-500/20',
  arms: 'from-purple-500/20 to-pink-500/20',
  core: 'from-indigo-500/20 to-violet-500/20',
  cardio: 'from-pink-500/20 to-rose-500/20',
  functional: 'from-teal-500/20 to-cyan-500/20',
  flexibility: 'from-cyan-500/20 to-sky-500/20',
  plyometric: 'from-amber-500/20 to-yellow-500/20',
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
  return colors[category] || 'bg-gray-100 text-gray-800';
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const ExerciseVisualCard = memo(({
  exercise,
  onSelect,
  onEdit,
  onDelete,
  onViewDetails,
  selectionMode = false,
  compact = false,
}: ExerciseVisualCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const gifUrl = getExerciseGifUrl(exercise);
  const hasGif = gifUrl && !imageError;
  const videoUrl = getExerciseVideoUrl(exercise.id);
  
  const mechanics = deriveMechanics(exercise);
  const forceType = deriveForceType(exercise);
  const categoryIcon = categoryIcons[exercise.category] || '🏋️';
  const gradient = categoryGradients[exercise.category] || 'from-gray-500/20 to-slate-500/20';

  const handleClick = () => {
    if (selectionMode && onSelect) {
      onSelect(exercise);
    } else if (onViewDetails) {
      onViewDetails(exercise);
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(exercise);
    }
  };

  if (compact) {
    return (
      <div 
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg border bg-card transition-all duration-200",
          (selectionMode || onViewDetails) && "cursor-pointer hover:bg-accent/50 hover:border-primary/50",
          isHovered && "shadow-md"
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Compact thumbnail with animated placeholder */}
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          {hasGif ? (
            <img 
              src={gifUrl} 
              alt={exercise.name}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <ExercisePlaceholderAnimated 
              category={exercise.category}
              exerciseName={exercise.name}
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{exercise.name}</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            <Badge className={`${getCategoryColor(exercise.category)} text-[10px] py-0 px-1.5`} variant="secondary">
              {exercise.category}
            </Badge>
            <Badge className={`${getMechanicsColor(mechanics)} text-[10px] py-0 px-1.5`} variant="secondary">
              {mechanics === 'compound' ? 'Compound' : 'Isolation'}
            </Badge>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {onViewDetails && (
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 shrink-0" onClick={handleViewDetails}>
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {selectionMode && (
            <Button size="sm" variant="default" className="h-8 w-8 p-0 shrink-0">
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "group relative rounded-xl overflow-hidden bg-card border transition-all duration-300",
        (selectionMode || onViewDetails) && "cursor-pointer",
        isHovered && "shadow-xl border-primary/30 scale-[1.02]"
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* GIF/Image Container - Dribbble style 4:3 aspect ratio */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Animated placeholder or GIF */}
        {hasGif ? (
          <img 
            src={gifUrl}
            alt={exercise.name}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-500",
              isHovered && "scale-110",
              !imageLoaded && "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <ExercisePlaceholderAnimated 
            category={exercise.category}
            exerciseName={exercise.name}
            className={cn(
              "transition-all duration-500",
              isHovered && "scale-110"
            )}
          />
        )}

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top badges - overlay style */}
        <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-1">
          <Badge className={`${getMechanicsColor(mechanics)} text-[10px] py-0.5 px-2 backdrop-blur-sm`} variant="secondary">
            {mechanics === 'compound' ? 'Compound' : 'Isolation'}
          </Badge>
          <Badge className={`${getForceTypeColor(forceType)} text-[10px] py-0.5 px-2 backdrop-blur-sm`} variant="secondary">
            {forceType.charAt(0).toUpperCase() + forceType.slice(1)}
          </Badge>
          <Badge className={`${getDifficultyColor(exercise.difficulty)} text-[10px] py-0.5 px-2 backdrop-blur-sm`} variant="secondary">
            {exercise.difficulty}
          </Badge>
        </div>

        {/* Video indicator */}
        {videoUrl && (
          <button
            onClick={handleVideoClick}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm hover:bg-primary transition-colors"
          >
            <Play className="h-3 w-3 fill-current" />
          </button>
        )}

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 drop-shadow-lg">
            {exercise.name}
          </h3>
        </div>

        {/* Hover overlay with action buttons */}
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-200",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          {onViewDetails && (
            <Button size="sm" variant="secondary" className="gap-1 shadow-lg" onClick={handleViewDetails}>
              <Eye className="h-4 w-4" />
              Details
            </Button>
          )}
          {selectionMode && (
            <Button size="sm" variant="default" className="gap-1 shadow-lg">
              <Plus className="h-4 w-4" />
              Select
            </Button>
          )}
        </div>
      </div>

      {/* Card content */}
      <div className="p-3 space-y-2">
        {/* Category badge */}
        <div className="flex items-center gap-2">
          <Badge className={`${getCategoryColor(exercise.category)} text-xs`} variant="secondary">
            {categoryIcon} {exercise.category}
          </Badge>
          {exercise.isCustom && (
            <Badge variant="outline" className="text-xs">Custom</Badge>
          )}
        </div>

        {/* Muscle groups */}
        {exercise.muscleGroup && exercise.muscleGroup.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {exercise.muscleGroup.slice(0, 3).map((muscle, idx) => (
              <span key={idx} className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                {muscle}
              </span>
            ))}
            {exercise.muscleGroup.length > 3 && (
              <span className="text-[10px] text-muted-foreground">
                +{exercise.muscleGroup.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Equipment */}
        {exercise.equipment && exercise.equipment.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Dumbbell className="h-3 w-3" />
            <span className="truncate">
              {exercise.equipment.slice(0, 2).join(', ')}
              {exercise.equipment.length > 2 && ` +${exercise.equipment.length - 2}`}
            </span>
          </div>
        )}

        {/* Action buttons - only in edit mode */}
        {!selectionMode && (onEdit || onDelete) && (
          <div className="flex gap-1 pt-1 border-t">
            {onViewDetails && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleViewDetails}
                className="h-7 px-2 text-xs flex-1"
              >
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
            )}
            {videoUrl && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleVideoClick}
                className="h-7 px-2 text-xs flex-1"
              >
                <Video className="h-3 w-3 mr-1" />
                Video
              </Button>
            )}
            {onEdit && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(exercise);
                }}
                className="h-7 px-2 text-xs"
              >
                <Edit className="h-3 w-3" />
              </Button>
            )}
            {onDelete && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(exercise.id);
                }}
                className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

ExerciseVisualCard.displayName = 'ExerciseVisualCard';
