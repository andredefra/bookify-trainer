
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Edit, Trash2, Play, Dumbbell, Settings, Images, RotateCcw } from 'lucide-react';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';
import { EquipmentImageGallery } from './EquipmentImageGallery';
import { AlternativeExercisesList } from './AlternativeExercisesList';

interface ExerciseLibraryListProps {
  exercises: ExerciseData[];
  onEdit: ((exercise: ExerciseData) => void) | null;
  onDelete: ((id: string) => void) | null;
}

export function ExerciseLibraryList({ exercises, onEdit, onDelete }: ExerciseLibraryListProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      chest: 'bg-red-100 text-red-800',
      back: 'bg-green-100 text-green-800',
      legs: 'bg-blue-100 text-blue-800',
      shoulders: 'bg-yellow-100 text-yellow-800',
      arms: 'bg-purple-100 text-purple-800',
      core: 'bg-orange-100 text-orange-800',
      cardio: 'bg-pink-100 text-pink-800',
      stretching: 'bg-teal-100 text-teal-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (exercises.length === 0) {
    return (
      <div className="text-center py-12">
        <Dumbbell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No exercises found</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <Card 
            key={exercise.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setExpandedCard(expandedCard === exercise.id ? null : exercise.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">{exercise.name}</CardTitle>
                <div className="flex gap-1 ml-2 shrink-0">
                  {exercise.isCustom && (
                    <Badge variant="outline">Custom</Badge>
                  )}
                  {(exercise as any).isModified && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <Settings className="h-3 w-3 mr-1" />
                      Modified
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge className={getCategoryColor(exercise.category)}>
                  {exercise.category}
                </Badge>
                <Badge className={getDifficultyColor(exercise.difficulty)}>
                  {exercise.difficulty}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Muscle Groups:</p>
                <div className="flex flex-wrap gap-1">
                  {exercise.muscleGroup.map((muscle, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>

              {exercise.equipment.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-1">Equipment:</p>
                  <div className="flex flex-wrap gap-1">
                    {exercise.equipment.map((eq, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {eq}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Equipment Images Preview */}
              {exercise.equipmentImages && Object.keys(exercise.equipmentImages).length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Images className="h-4 w-4 text-blue-500" />
                    <p className="text-sm font-medium">Equipment ({Object.keys(exercise.equipmentImages).length})</p>
                  </div>
                  <EquipmentImageGallery 
                    equipmentImages={exercise.equipmentImages}
                    className="h-32"
                  />
                </div>
              )}

              {/* Alternative Exercises Preview */}
              {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-orange-600">
                  <RotateCcw className="h-4 w-4" />
                  <span>{exercise.alternativeExercises.length} alternatives available</span>
                </div>
              )}

              {expandedCard === exercise.id && (
                <div className="space-y-4 pt-3 border-t">
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="equipment">Equipment</TabsTrigger>
                      <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Exercise Notes:</p>
                        <p className="text-sm text-muted-foreground">
                          {exercise.notes}
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="equipment" className="space-y-3">
                      {exercise.equipmentImages && Object.keys(exercise.equipmentImages).length > 0 ? (
                        <EquipmentImageGallery equipmentImages={exercise.equipmentImages} />
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Images className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No equipment images available</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="alternatives" className="space-y-3">
                      {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 ? (
                        <AlternativeExercisesList alternativeExerciseIds={exercise.alternativeExercises} />
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <RotateCcw className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No alternative exercises available</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  <div className="flex flex-wrap gap-2 pt-2 border-t">
                    {exercise.videoUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(exercise.videoUrl, '_blank');
                        }}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Video
                      </Button>
                    )}

                    {onEdit && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(exercise);
                        }}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    )}

                    {exercise.isCustom && onDelete && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to delete this exercise?')) {
                            onDelete(exercise.id);
                          }
                        }}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
