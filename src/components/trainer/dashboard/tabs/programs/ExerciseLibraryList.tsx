
import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Video, Play } from 'lucide-react';
import { ExerciseData } from '@/data/exercises/types';
import { AlternativeExercisesList } from './AlternativeExercisesList';
import { getExerciseVideoUrl } from '@/data/exercises/videoUrls';

interface ExerciseLibraryListProps {
  exercises: ExerciseData[];
  onEdit: (exercise: ExerciseData) => void;
  onDelete: (id: string) => void;
  selectionMode?: boolean;
  onSelect?: (exercise: ExerciseData) => void;
}

// Simplified exercise item component
const ExerciseItem = memo(({ 
  exercise, 
  onEdit, 
  onDelete, 
  selectionMode, 
  onSelect 
}: {
  exercise: ExerciseData;
  onEdit: (exercise: ExerciseData) => void;
  onDelete: (id: string) => void;
  selectionMode?: boolean;
  onSelect?: (exercise: ExerciseData) => void;
}) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      chest: 'bg-red-100 text-red-800',
      back: 'bg-blue-100 text-blue-800', 
      legs: 'bg-green-100 text-green-800',
      shoulders: 'bg-orange-100 text-orange-800',
      arms: 'bg-purple-100 text-purple-800',
      core: 'bg-indigo-100 text-indigo-800',
      cardio: 'bg-pink-100 text-pink-800',
      functional: 'bg-teal-100 text-teal-800',
      flexibility: 'bg-cyan-100 text-cyan-800',
      plyometric: 'bg-amber-100 text-amber-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClick = () => {
    if (selectionMode && onSelect) {
      onSelect(exercise);
    }
  };

  const videoUrl = getExerciseVideoUrl(exercise.id);
  
  // Debug video URL
  console.log('Exercise:', exercise.name, 'ID:', exercise.id, 'Video URL:', videoUrl);

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    } else {
      console.log('No video URL found for exercise:', exercise.id);
    }
  };

  if (!exercise) return null;

  return (
    <div 
      className={`${selectionMode ? 'cursor-pointer hover:bg-muted/30' : ''} transition-all duration-200 p-3 md:p-4 border-b border-border hover:bg-muted/20`}
      onClick={selectionMode ? handleClick : undefined}
    >
      <div className="flex items-start justify-between gap-3 md:gap-6">
        <div className="flex-1 space-y-2 md:space-y-3">
          {/* Header with title */}
          <div className="flex items-start justify-between">
            <h3 className="text-base md:text-lg font-semibold text-foreground line-clamp-2 flex-1 mr-2">
              {exercise.name || 'Unnamed Exercise'}
            </h3>
            
            {/* Actions - Mobile optimized */}
            <div className="flex gap-1 shrink-0">
              {videoUrl && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleVideoClick}
                  className="h-8 w-8 p-0 text-primary hover:bg-primary/10"
                  title="Video"
                >
                  <Video className="h-4 w-4" />
                </Button>
              )}
              {!selectionMode && (
                <>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(exercise);
                    }}
                    className="h-8 w-8 p-0 hover:bg-blue-100"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(exercise.id);
                    }}
                    className="h-8 w-8 p-0 text-destructive hover:bg-red-100"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </>
              )}
              {selectionMode && (
                <Button size="sm" variant="default" className="h-8 w-8 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Compact badges row */}
          <div className="flex flex-wrap gap-1">
            {exercise.category && (
              <Badge className={`${getCategoryColor(exercise.category)} text-xs py-1 px-2`} variant="secondary">
                {exercise.category}
              </Badge>
            )}
            {exercise.difficulty && (
              <Badge className={`${getDifficultyColor(exercise.difficulty)} text-xs py-1 px-2`} variant="secondary">
                {exercise.difficulty}
              </Badge>
            )}
            {exercise.isCustom && (
              <Badge variant="outline" className="text-xs py-1 px-2">Custom</Badge>
            )}
          </div>

          {/* Compact video section */}
          {videoUrl ? (
            <div className="flex items-center gap-2 p-2 bg-primary/10 rounded border border-primary/20">
              <Video className="h-4 w-4 text-primary shrink-0" />
              <Button 
                variant="link" 
                size="sm" 
                onClick={handleVideoClick}
                className="h-auto p-0 text-xs text-primary font-medium"
              >
                Video disponibile - Guarda
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs text-gray-500">
              <Video className="h-4 w-4 text-gray-400 shrink-0" />
              <span>Video non disponibile</span>
            </div>
          )}

          {/* Compact info sections */}
          <div className="space-y-2">
            {/* Muscle Groups - Compact */}
            {exercise.muscleGroup && exercise.muscleGroup.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-muted-foreground">💪</span>
                  {exercise.muscleGroup.slice(0, 3).map((muscle, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs py-0 px-1 bg-blue-50 text-blue-700">
                      {muscle}
                    </Badge>
                  ))}
                  {exercise.muscleGroup.length > 3 && (
                    <Badge variant="outline" className="text-xs py-0 px-1">
                      +{exercise.muscleGroup.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Equipment - Compact */}
            {exercise.equipment && exercise.equipment.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-xs text-muted-foreground">🏋️</span>
                <span className="text-xs text-foreground">
                  {exercise.equipment.slice(0, 2).join(', ')}
                  {exercise.equipment.length > 2 && ` +${exercise.equipment.length - 2}`}
                </span>
              </div>
            )}
          </div>

          {/* Alternative Exercises - Compact */}
          {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
            <AlternativeExercisesList
              alternativeExerciseIds={exercise.alternativeExercises}
              onSelectAlternative={selectionMode ? onSelect : undefined}
              className="mt-2"
            />
          )}
        </div>
      </div>
    </div>
  );
});

ExerciseItem.displayName = 'ExerciseItem';

export function ExerciseLibraryList({
  exercises,
  onEdit,
  onDelete,
  selectionMode = false,
  onSelect,
}: ExerciseLibraryListProps) {
  console.log('ExerciseLibraryList - Rendering:', {
    exerciseCount: exercises?.length || 0,
    selectionMode
  });

  if (!exercises || exercises.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">No exercises found</p>
          <p className="text-sm text-muted-foreground">
            {selectionMode ? 'Try adjusting your search filters' : 'Create your first exercise to get started'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <div className="divide-y divide-border">
        {exercises.map((exercise) => (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            onEdit={onEdit}
            onDelete={onDelete}
            selectionMode={selectionMode}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
