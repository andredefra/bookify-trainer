
import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import { ExerciseData } from '@/data/exercises/types';

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

  if (!exercise) return null;

  return (
    <Card 
      className={`${selectionMode ? 'cursor-pointer hover:bg-muted/50' : ''} transition-colors`}
      onClick={selectionMode ? handleClick : undefined}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">
            {exercise.name || 'Unnamed Exercise'}
          </CardTitle>
          <div className="flex gap-1">
            {!selectionMode && (
              <>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(exercise);
                  }}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(exercise.id);
                  }}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
            {selectionMode && (
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category and Difficulty Badges */}
        <div className="flex flex-wrap gap-2">
          {exercise.category && (
            <Badge className={getCategoryColor(exercise.category)} variant="secondary">
              {exercise.category}
            </Badge>
          )}
          {exercise.difficulty && (
            <Badge className={getDifficultyColor(exercise.difficulty)} variant="secondary">
              {exercise.difficulty}
            </Badge>
          )}
          {exercise.isCustom && (
            <Badge variant="outline">Custom</Badge>
          )}
          {exercise.isModified && (
            <Badge variant="secondary">Modified</Badge>
          )}
        </div>

        {/* Muscle Groups */}
        {exercise.muscleGroup && exercise.muscleGroup.length > 0 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Target Muscles:</p>
            <div className="flex flex-wrap gap-1">
              {exercise.muscleGroup.map((muscle, idx) => (
                <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Equipment */}
        {exercise.equipment && exercise.equipment.length > 0 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Equipment:</p>
            <p className="text-sm text-muted-foreground">
              {exercise.equipment.join(', ')}
            </p>
          </div>
        )}

        {/* Notes */}
        {exercise.notes && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Notes:</p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {exercise.notes}
            </p>
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
      <div className="grid gap-4 p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
