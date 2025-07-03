
import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import { ExerciseData } from '@/data/exercises/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExerciseLibraryListProps {
  exercises: ExerciseData[];
  onEdit: (exercise: ExerciseData) => void;
  onDelete: (id: string) => void;
  selectionMode?: boolean;
  onSelect?: (exercise: ExerciseData) => void;
}

// Memoized exercise item component for better performance
const ExerciseItem = memo(({ 
  exercise, 
  onEdit, 
  onDelete, 
  selectionMode, 
  onSelect,
  isMobile 
}: {
  exercise: ExerciseData;
  onEdit: (exercise: ExerciseData) => void;
  onDelete: (id: string) => void;
  selectionMode?: boolean;
  onSelect?: (exercise: ExerciseData) => void;
  isMobile: boolean;
}) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      chest: 'bg-red-100 text-red-800 border-red-200',
      back: 'bg-blue-100 text-blue-800 border-blue-200', 
      legs: 'bg-green-100 text-green-800 border-green-200',
      shoulders: 'bg-orange-100 text-orange-800 border-orange-200',
      arms: 'bg-purple-100 text-purple-800 border-purple-200',
      core: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      cardio: 'bg-pink-100 text-pink-800 border-pink-200',
      functional: 'bg-teal-100 text-teal-800 border-teal-200',
      flexibility: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      plyometric: 'bg-amber-100 text-amber-800 border-amber-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
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
    } else {
      onEdit(exercise);
    }
  };

  if (!exercise) return null;

  return (
    <Card 
      className={`${selectionMode ? 'cursor-pointer hover:bg-muted/50' : ''} transition-colors`}
      onClick={selectionMode ? handleClick : undefined}
    >
      <CardHeader className={`${isMobile ? 'p-3' : 'p-4'} pb-2`}>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} leading-tight`}>
            {exercise.name || 'Unnamed Exercise'}
          </CardTitle>
          {!selectionMode && (
            <div className="flex gap-1 flex-shrink-0">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(exercise);
                }}
                className={`${isMobile ? 'h-7 w-7 p-0' : 'h-8 w-8 p-0'}`}
              >
                <Edit className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(exercise.id);
                }}
                className={`${isMobile ? 'h-7 w-7 p-0' : 'h-8 w-8 p-0'} text-destructive hover:text-destructive`}
              >
                <Trash2 className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
              </Button>
            </div>
          )}
          {selectionMode && (
            <Button size="sm" variant="ghost" className={`${isMobile ? 'h-7 w-7 p-0' : 'h-8 w-8 p-0'}`}>
              <Plus className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className={`${isMobile ? 'p-3' : 'p-4'} pt-0 space-y-3`}>
        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          {exercise.category && (
            <Badge className={`${getCategoryColor(exercise.category)} ${isMobile ? 'text-xs' : 'text-xs'}`}>
              {exercise.category}
            </Badge>
          )}
          {exercise.difficulty && (
            <Badge className={`${getDifficultyColor(exercise.difficulty)} ${isMobile ? 'text-xs' : 'text-xs'}`}>
              {exercise.difficulty}
            </Badge>
          )}
          {exercise.isCustom && (
            <Badge variant="outline" className={isMobile ? 'text-xs' : 'text-xs'}>
              Custom
            </Badge>
          )}
          {exercise.isModified && (
            <Badge variant="secondary" className={isMobile ? 'text-xs' : 'text-xs'}>
              Modified
            </Badge>
          )}
        </div>

        {/* Muscle Groups */}
        {exercise.muscleGroup && exercise.muscleGroup.length > 0 && (
          <div>
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground mb-1`}>
              Target Muscles:
            </p>
            <div className="flex flex-wrap gap-1">
              {exercise.muscleGroup.slice(0, 3).map((muscle, idx) => (
                <Badge key={idx} variant="secondary" className={`${isMobile ? 'text-xs' : 'text-xs'} bg-blue-50 text-blue-700`}>
                  {muscle}
                </Badge>
              ))}
              {exercise.muscleGroup.length > 3 && (
                <Badge variant="secondary" className={`${isMobile ? 'text-xs' : 'text-xs'}`}>
                  +{exercise.muscleGroup.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Equipment */}
        {exercise.equipment && exercise.equipment.length > 0 && (
          <div>
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground mb-1`}>
              Equipment:
            </p>
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
              {exercise.equipment.slice(0, 2).join(', ')}
              {exercise.equipment.length > 2 && ` +${exercise.equipment.length - 2} more`}
            </p>
          </div>
        )}

        {/* Notes Preview */}
        {exercise.notes && (
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground line-clamp-2`}>
            {exercise.notes}
          </p>
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
  const isMobile = useIsMobile();

  console.log('ExerciseLibraryList - Rendering:', {
    exerciseCount: exercises?.length || 0,
    selectionMode,
    isMobile
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
      <div className={`grid gap-3 p-4 ${
        isMobile 
          ? 'grid-cols-1' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {exercises.map((exercise) => (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            onEdit={onEdit}
            onDelete={onDelete}
            selectionMode={selectionMode}
            onSelect={onSelect}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}
