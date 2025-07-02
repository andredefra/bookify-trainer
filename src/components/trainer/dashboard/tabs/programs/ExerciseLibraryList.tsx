
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Edit, Trash2, Play, Dumbbell, Images, RotateCcw, Camera } from 'lucide-react';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';
import { EquipmentImageGallery } from './EquipmentImageGallery';
import { AlternativeExercisesList } from './AlternativeExercisesList';
import { EditEquipmentImagesDialog } from './EditEquipmentImagesDialog';

interface ExerciseLibraryListProps {
  exercises: ExerciseData[];
  onEdit: ((exercise: ExerciseData) => void) | null;
  onDelete: ((id: string) => void) | null;
}

export function ExerciseLibraryList({ exercises, onEdit, onDelete }: ExerciseLibraryListProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [editingExercise, setEditingExercise] = useState<ExerciseData | null>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      chest: 'bg-red-100 text-red-800',
      back: 'bg-green-100 text-green-800',
      legs: 'bg-blue-100 text-blue-800',
      shoulders: 'bg-yellow-100 text-yellow-800',
      arms: 'bg-purple-100 text-purple-800',
      core: 'bg-orange-100 text-orange-800',
      cardio: 'bg-pink-100 text-pink-800',
      functional: 'bg-teal-100 text-teal-800'
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

  const handleSaveImages = (exerciseId: string, images: { [equipment: string]: string }) => {
    console.log('Saving images for exercise:', exerciseId, images);
    setShowImageDialog(false);
    setEditingExercise(null);
  };

  const handleEditImages = (exercise: ExerciseData, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingExercise(exercise);
    setShowImageDialog(true);
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
    <>
      <ScrollArea className="h-[500px] pr-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader 
                className="pb-3 cursor-pointer"
                onClick={() => setExpandedCard(expandedCard === exercise.id ? null : exercise.id)}
              >
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight">{exercise.name}</CardTitle>
                  <div className="flex items-center gap-2 ml-2 shrink-0">
                    {/* Equipment Images Badge */}
                    {exercise.equipmentImages && Object.keys(exercise.equipmentImages).length > 0 && (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        <Images className="h-3 w-3 mr-1" />
                        {Object.keys(exercise.equipmentImages).length}
                      </Badge>
                    )}
                    
                    {/* Alternatives Badge */}
                    {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
                      <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                        <RotateCcw className="h-3 w-3 mr-1" />
                        {exercise.alternativeExercises.length}
                      </Badge>
                    )}
                    
                    {/* Video Badge */}
                    {exercise.videoUrl && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        <Play className="h-3 w-3 mr-1" />
                        Video
                      </Badge>
                    )}
                    
                    {exercise.isCustom && (
                      <Badge variant="outline">Custom</Badge>
                    )}
                    {(exercise as any).isModified && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
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

                {expandedCard === exercise.id && (
                  <div className="space-y-4 pt-3 border-t">
                    <Tabs defaultValue="details" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger 
                          value="details"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Details
                        </TabsTrigger>
                        <TabsTrigger 
                          value="equipment"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Equipment
                        </TabsTrigger>
                        <TabsTrigger 
                          value="alternatives"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Alternatives
                        </TabsTrigger>
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
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Equipment Images</h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => handleEditImages(exercise, e)}
                          >
                            <Camera className="h-3 w-3 mr-1" />
                            Edit Images
                          </Button>
                        </div>
                        
                        {exercise.equipmentImages && Object.keys(exercise.equipmentImages).length > 0 ? (
                          <EquipmentImageGallery equipmentImages={exercise.equipmentImages} />
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <Images className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No equipment images available</p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2"
                              onClick={(e) => handleEditImages(exercise, e)}
                            >
                              <Camera className="h-3 w-3 mr-1" />
                              Add Images
                            </Button>
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
                          Watch Video
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

      {/* Edit Images Dialog */}
      <EditEquipmentImagesDialog
        open={showImageDialog}
        onOpenChange={setShowImageDialog}
        equipment={editingExercise?.equipment || []}
        currentImages={editingExercise?.equipmentImages || {}}
        onSave={(images) => handleSaveImages(editingExercise?.id || '', images)}
      />
    </>
  );
}
