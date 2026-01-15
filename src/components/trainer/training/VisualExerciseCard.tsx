import { memo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExerciseData } from '@/data/exercises/types';
import { 
  deriveMechanics, 
  deriveForceType, 
  getMechanicsColor, 
  getForceTypeColor,
  getExerciseGifUrl 
} from '@/data/exercises/biomechanicsMapping';
import { ExercisePlaceholder } from './ExercisePlaceholder';
import { Play, Plus, Dumbbell } from 'lucide-react';

interface VisualExerciseCardProps {
  exercise: ExerciseData;
  onClick?: () => void;
  showSelectButton?: boolean;
  compact?: boolean;
}

export const VisualExerciseCard = memo(function VisualExerciseCard({ 
  exercise, 
  onClick,
  showSelectButton = true,
  compact = false
}: VisualExerciseCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const gifUrl = getExerciseGifUrl(exercise);
  const mechanics = deriveMechanics(exercise);
  const forceType = deriveForceType(exercise);
  const hasGif = gifUrl && !imageError;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  if (compact) {
    return (
      <div 
        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-all"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Compact Thumbnail */}
        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted">
          {hasGif ? (
            <img 
              src={gifUrl} 
              alt={exercise.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <ExercisePlaceholder category={exercise.category} className="h-full" />
          )}
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{exercise.name}</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            <Badge variant="outline" className={`text-xs py-0 px-1.5 ${getCategoryColor(exercise.category)}`}>
              {exercise.category}
            </Badge>
            <Badge variant="outline" className={`text-xs py-0 px-1.5 ${getMechanicsColor(mechanics)}`}>
              {mechanics}
            </Badge>
          </div>
        </div>
        
        {showSelectButton && (
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 flex-shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div 
      className="group relative rounded-xl overflow-hidden border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* GIF Hero Area - 4:3 Aspect Ratio */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        {hasGif ? (
          <img 
            src={gifUrl} 
            alt={exercise.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <ExercisePlaceholder category={exercise.category} />
        )}
        
        {/* Overlay Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          <Badge className={`text-xs font-medium ${getMechanicsColor(mechanics)}`}>
            {mechanics === 'compound' ? '🔗 Compound' : '🎯 Isolation'}
          </Badge>
          <Badge className={`text-xs font-medium ${getForceTypeColor(forceType)}`}>
            {forceType === 'push' ? '⬆️ Push' : 
             forceType === 'pull' ? '⬇️ Pull' : 
             forceType === 'static' ? '⏸️ Static' :
             forceType === 'hinge' ? '↩️ Hinge' :
             forceType === 'squat' ? '🦵 Squat' :
             '🏋️ Carry'}
          </Badge>
        </div>
        
        {/* Difficulty Badge - Top Right */}
        <div className="absolute top-2 right-2">
          <Badge className={`text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
            {exercise.difficulty}
          </Badge>
        </div>
        
        {/* Play indicator for GIFs */}
        {hasGif && !isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 rounded-full p-2">
              <Play className="h-6 w-6 text-primary" />
            </div>
          </div>
        )}
        
        {/* Select button overlay */}
        {showSelectButton && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" className="h-8 gap-1 shadow-lg">
              <Plus className="h-4 w-4" />
              Select
            </Button>
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-3 space-y-2">
        {/* Exercise Name */}
        <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
          {exercise.name}
        </h3>
        
        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`text-xs ${getCategoryColor(exercise.category)}`}>
            {exercise.category}
          </Badge>
          {exercise.isCustom && (
            <Badge variant="outline" className="text-xs">Custom</Badge>
          )}
        </div>
        
        {/* Muscles & Equipment - Compact */}
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="shrink-0">💪</span>
            <span className="truncate">{exercise.muscleGroup.slice(0, 2).join(', ')}</span>
            {exercise.muscleGroup.length > 2 && (
              <span className="text-muted-foreground">+{exercise.muscleGroup.length - 2}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Dumbbell className="h-3 w-3 shrink-0" />
            <span className="truncate">{exercise.equipment.slice(0, 2).join(', ')}</span>
            {exercise.equipment.length > 2 && (
              <span className="text-muted-foreground">+{exercise.equipment.length - 2}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

VisualExerciseCard.displayName = 'VisualExerciseCard';
