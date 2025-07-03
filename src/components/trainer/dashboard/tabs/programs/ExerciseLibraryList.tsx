
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';
import { Edit, Trash2, ChevronDown, ChevronUp, Play, Image, ArrowRightLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExerciseLibraryListProps {
  exercises: ExerciseData[];
  onEdit: (exercise: ExerciseData) => void;
  onDelete: (id: string) => void;
}

export function ExerciseLibraryList({ exercises, onEdit, onDelete }: ExerciseLibraryListProps) {
  const isMobile = useIsMobile();
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<{ url: string; title: string } | null>(null);

  console.log('ExerciseLibraryList - Rendering:', exercises.length, 'exercises, mobile:', isMobile);

  const toggleExpanded = (exerciseId: string) => {
    console.log('Toggling expansion for exercise:', exerciseId);
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
        console.log('Collapsed exercise:', exerciseId);
      } else {
        newSet.add(exerciseId);
        console.log('Expanded exercise:', exerciseId);
      }
      return newSet;
    });
  };

  const isExpanded = (exerciseId: string) => expandedCards.has(exerciseId);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      chest: 'bg-blue-100 text-blue-800',
      back: 'bg-purple-100 text-purple-800',
      legs: 'bg-orange-100 text-orange-800',
      shoulders: 'bg-cyan-100 text-cyan-800',
      arms: 'bg-pink-100 text-pink-800',
      core: 'bg-emerald-100 text-emerald-800',
      cardio: 'bg-red-100 text-red-800',
      functional: 'bg-indigo-100 text-indigo-800',
      flexibility: 'bg-teal-100 text-teal-800',
      plyometric: 'bg-amber-100 text-amber-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  if (exercises.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-500 text-sm">No exercises found matching your criteria.</p>
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="h-full w-full">
        <div className="p-1 space-y-1">
          {exercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className={`transition-all duration-200 shadow-sm
                ${isMobile ? 'min-h-[50px]' : 'min-h-[60px]'}
              `}
              data-exercise-id={exercise.id}
            >
              {/* Compact Header - Only Essential Info */}
              <CardHeader className={`${isMobile ? 'p-2' : 'p-3'} pb-2`}>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex-1 min-w-0">
                    {/* Exercise Name */}
                    <h3 className={`font-medium leading-tight ${isMobile ? 'text-sm' : 'text-base'} mb-1`}>
                      {exercise.name}
                    </h3>
                    
                    {/* Essential Info: Difficulty + Category */}
                    <div className="flex gap-1">
                      <Badge className={`${getDifficultyColor(exercise.difficulty)} text-xs px-1 py-0`}>
                        {exercise.difficulty}
                      </Badge>
                      <Badge className={`${getCategoryColor(exercise.category)} text-xs px-1 py-0`}>
                        {exercise.category}
                      </Badge>
                      {exercise.isCustom && (
                        <Badge variant="outline" className="border-purple-200 text-purple-700 text-xs px-1 py-0">
                          Custom
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleExpanded(exercise.id);
                      }}
                      className={isMobile ? 'h-7 w-7 p-0' : 'h-8 w-8 p-0'}
                    >
                      {isExpanded(exercise.id) ? 
                        <ChevronUp className={isMobile ? 'h-3 w-3' : 'h-4 w-4'} /> : 
                        <ChevronDown className={isMobile ? 'h-3 w-3' : 'h-4 w-4'} />
                      }
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onEdit(exercise);
                      }}
                      className={isMobile ? 'h-7 w-7 p-0' : 'h-8 w-8 p-0'}
                    >
                      <Edit className={isMobile ? 'h-3 w-3' : 'h-4 w-4'} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete(exercise.id);
                      }}
                      className={`${isMobile ? 'h-7 w-7 p-0' : 'h-8 w-8 p-0'} text-red-600 hover:text-red-700`}
                    >
                      <Trash2 className={isMobile ? 'h-3 w-3' : 'h-4 w-4'} />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Expanded Content - Only show when expanded */}
              {isExpanded(exercise.id) && (
                <CardContent className={`${isMobile ? 'p-2' : 'p-3'} pt-0 space-y-2`}>
                  {/* Muscle Groups */}
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Muscles:</p>
                    <div className="flex flex-wrap gap-1">
                      {exercise.muscleGroup.slice(0, isMobile ? 3 : 4).map((muscle, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                          {muscle}
                        </Badge>
                      ))}
                      {exercise.muscleGroup.length > (isMobile ? 3 : 4) && (
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          +{exercise.muscleGroup.length - (isMobile ? 3 : 4)}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Equipment */}
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Equipment:</p>
                    <div className="flex flex-wrap gap-1">
                      {exercise.equipment.slice(0, isMobile ? 2 : 3).map((equip, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-1 py-0 flex items-center gap-1">
                          {exercise.equipmentImages?.[equip] && (
                            <Image 
                              className="h-2 w-2 cursor-pointer" 
                              onClick={() => setImagePreview({ 
                                url: exercise.equipmentImages![equip], 
                                title: equip 
                              })}
                            />
                          )}
                          {isMobile && equip.length > 8 ? equip.substring(0, 8) + '...' : equip}
                        </Badge>
                      ))}
                      {exercise.equipment.length > (isMobile ? 2 : 3) && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          +{exercise.equipment.length - (isMobile ? 2 : 3)}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Alternative Exercises */}
                  {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <ArrowRightLeft className="h-3 w-3 text-blue-600" />
                        Alternatives:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {exercise.alternativeExercises.slice(0, isMobile ? 2 : 3).map((alt, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-1 py-0 border-blue-200 text-blue-700">
                            {isMobile && alt.length > 12 ? alt.substring(0, 12) + '...' : alt}
                          </Badge>
                        ))}
                        {exercise.alternativeExercises.length > (isMobile ? 2 : 3) && (
                          <Badge variant="outline" className="text-xs px-1 py-0 border-blue-200 text-blue-700">
                            +{exercise.alternativeExercises.length - (isMobile ? 2 : 3)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Video */}
                  {exercise.videoUrl && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700 flex items-center gap-1">
                        <Play className="h-3 w-3 text-blue-600" />
                        Video Available
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setVideoPreview(videoPreview === exercise.id ? null : exercise.id)}
                        className="text-xs h-6 px-2"
                      >
                        {videoPreview === exercise.id ? 'Hide' : 'Play'}
                      </Button>
                    </div>
                  )}

                  {/* Video Preview */}
                  {videoPreview === exercise.id && getYouTubeEmbedUrl(exercise.videoUrl) && (
                    <div className="w-full">
                      <iframe
                        width="100%"
                        height={isMobile ? "120" : "160"}
                        src={getYouTubeEmbedUrl(exercise.videoUrl)}
                        title={exercise.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-md"
                      />
                    </div>
                  )}

                  {/* Instructions */}
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Instructions:</p>
                    <p className="text-xs text-gray-600">
                      {exercise.notes}
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Image Preview Dialog */}
      {imagePreview && (
        <Dialog open={!!imagePreview} onOpenChange={() => setImagePreview(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{imagePreview.title}</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <img
                src={imagePreview.url}
                alt={imagePreview.title}
                className="max-w-full max-h-[70vh] object-contain rounded"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
