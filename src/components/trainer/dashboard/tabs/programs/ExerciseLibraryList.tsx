
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
      className={`${selectionMode ? 'cursor-pointer hover:bg-muted/30' : ''} transition-all duration-200 p-6 border-b border-border hover:bg-muted/20`}
      onClick={selectionMode ? handleClick : undefined}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 space-y-4">
          {/* Header with title */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                {exercise.name || 'Unnamed Exercise'}
              </h3>
              
              {/* Category and Difficulty Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {exercise.category && (
                  <Badge className={`${getCategoryColor(exercise.category)} text-sm py-1 px-3 font-medium`} variant="secondary">
                    {exercise.category}
                  </Badge>
                )}
                {exercise.difficulty && (
                  <Badge className={`${getDifficultyColor(exercise.difficulty)} text-sm py-1 px-3 font-medium`} variant="secondary">
                    {exercise.difficulty}
                  </Badge>
                )}
                {exercise.isCustom && (
                  <Badge variant="outline" className="text-sm py-1 px-3 font-medium border-orange-300 text-orange-700 bg-orange-50">Custom</Badge>
                )}
                {exercise.isModified && (
                  <Badge variant="secondary" className="text-sm py-1 px-3 font-medium bg-blue-100 text-blue-700">Modified</Badge>
                )}
              </div>

              {/* Video section - Make it more prominent */}
              {videoUrl ? (
                <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary">Video Tutorial Disponibile</p>
                    <p className="text-xs text-primary/70">Guarda la dimostrazione completa</p>
                  </div>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleVideoClick}
                    className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Guarda
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Video className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">Video non disponibile</p>
                    <p className="text-xs text-gray-500">Sarà aggiunto presto</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              {videoUrl && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleVideoClick}
                  className="h-10 w-10 p-0 text-primary hover:text-primary/80 hover:bg-primary/10"
                  title="Guarda video dimostrativo"
                >
                  <Video className="h-5 w-5" />
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
                    className="h-10 w-10 p-0 hover:bg-blue-100 hover:text-blue-600"
                  >
                    <Edit className="h-5 w-5" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(exercise.id);
                    }}
                    className="h-10 w-10 p-0 text-destructive hover:text-destructive hover:bg-red-100"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </>
              )}
              {selectionMode && (
                <Button size="sm" variant="default" className="h-10 w-10 p-0">
                  <Plus className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Muscle Groups */}
          {exercise.muscleGroup && exercise.muscleGroup.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">🎯 Muscoli target:</p>
              <div className="flex flex-wrap gap-2">
                {exercise.muscleGroup.map((muscle, idx) => (
                  <Badge key={idx} variant="outline" className="text-sm py-1 px-3 bg-blue-50 text-blue-700 border-blue-200 font-medium">
                    {muscle}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Equipment */}
          {exercise.equipment && exercise.equipment.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">🏋️ Attrezzatura necessaria:</p>
              <div className="flex flex-wrap gap-2">
                {exercise.equipment.map((eq, idx) => (
                  <Badge key={idx} variant="outline" className="text-sm py-1 px-3 bg-green-50 text-green-700 border-green-200 font-medium">
                    {eq}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Description if available */}
          {exercise.notes && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">📋 Descrizione:</p>
              <p className="text-sm text-foreground leading-relaxed bg-muted/30 p-3 rounded-md">
                {exercise.notes}
              </p>
            </div>
          )}

          {/* Metadata row */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground bg-muted/20 p-3 rounded-md">
            {exercise.muscleGroup && exercise.muscleGroup.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-blue-600">💪</span>
                <span className="font-medium">{exercise.muscleGroup.length} gruppi muscolari</span>
              </div>
            )}
            {exercise.equipment && exercise.equipment.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-green-600">🏋️</span>
                <span className="font-medium">{exercise.equipment.length} attrezzi</span>
              </div>
            )}
            {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-orange-600">🔄</span>
                <span className="font-medium">{exercise.alternativeExercises.length} alternative</span>
              </div>
            )}
          </div>

          {/* Alternative Exercises */}
          {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
            <div>
              <AlternativeExercisesList
                alternativeExerciseIds={exercise.alternativeExercises}
                onSelectAlternative={selectionMode ? onSelect : undefined}
                className="mt-4"
              />
            </div>
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
