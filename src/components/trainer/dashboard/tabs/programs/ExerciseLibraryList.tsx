
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

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  if (!exercise) return null;

  return (
    <Card 
      className={`${selectionMode ? 'cursor-pointer hover:bg-muted/50' : ''} transition-colors h-full flex flex-col`}
      onClick={selectionMode ? handleClick : undefined}
    >
      <CardHeader className="pb-2 px-3 pt-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-semibold line-clamp-2 flex-1">
            {exercise.name || 'Unnamed Exercise'}
          </CardTitle>
          <div className="flex gap-1 shrink-0">
            {videoUrl && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleVideoClick}
                className="h-6 w-6 p-0 text-primary hover:text-primary/80"
                title="Guarda video dimostrativo"
              >
                <Video className="h-3 w-3" />
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
                  className="h-6 w-6 p-0"
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
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </>
            )}
            {selectionMode && (
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 pt-0 pb-3 space-y-3 flex-1 flex flex-col">
        {/* Video Demo Section */}
        {videoUrl && (
          <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
            <Play className="h-3 w-3 text-primary" />
            <span className="text-xs text-muted-foreground">Video disponibile</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleVideoClick}
              className="h-5 px-2 text-xs ml-auto"
            >
              Guarda
            </Button>
          </div>
        )}

        {/* Category and Difficulty Badges */}
        <div className="flex flex-wrap gap-1">
          {exercise.category && (
            <Badge className={`${getCategoryColor(exercise.category)} text-xs py-0 px-1.5`} variant="secondary">
              {exercise.category}
            </Badge>
          )}
          {exercise.difficulty && (
            <Badge className={`${getDifficultyColor(exercise.difficulty)} text-xs py-0 px-1.5`} variant="secondary">
              {exercise.difficulty}
            </Badge>
          )}
          {exercise.isCustom && (
            <Badge variant="outline" className="text-xs py-0 px-1.5">Custom</Badge>
          )}
          {exercise.isModified && (
            <Badge variant="secondary" className="text-xs py-0 px-1.5">Modified</Badge>
          )}
        </div>

        {/* Muscle Groups */}
        {exercise.muscleGroup && exercise.muscleGroup.length > 0 && (
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground mb-1">Muscoli:</p>
            <div className="flex flex-wrap gap-1">
              {exercise.muscleGroup.slice(0, 3).map((muscle, idx) => (
                <Badge key={idx} variant="outline" className="text-xs py-0 px-1 bg-blue-50 text-blue-700 border-blue-200">
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

        {/* Equipment (compact) */}
        {exercise.equipment && exercise.equipment.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground">
              {exercise.equipment.slice(0, 2).join(', ')}
              {exercise.equipment.length > 2 && ` +${exercise.equipment.length - 2}`}
            </p>
          </div>
        )}

        {/* Alternative Exercises (mobile compact) */}
        {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
          <div className="mt-auto">
            <AlternativeExercisesList
              alternativeExerciseIds={exercise.alternativeExercises}
              onSelectAlternative={selectionMode ? onSelect : undefined}
              className="mt-2"
            />
          </div>
        )}
      </CardContent>
    </Card>
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
      <div className="grid gap-2 p-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
