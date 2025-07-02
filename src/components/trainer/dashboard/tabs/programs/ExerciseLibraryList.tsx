
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExerciseData, getExerciseById } from '@/data/exercises/exerciseDatabase';
import { Edit, Trash2, Video, Image, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
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
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [imagePreview, setImagePreview] = useState<{ url: string; title: string } | null>(null);

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

  const hasCompleteData = (exercise: ExerciseData) => {
    return exercise.videoUrl || exercise.equipmentImages || exercise.alternativeExercises?.length;
  };

  const toggleExpanded = (exerciseId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const isExpanded = (exerciseId: string) => expandedCards.has(exerciseId);

  const getAlternativeExerciseName = (exerciseId: string) => {
    const exercise = getExerciseById(exerciseId);
    return exercise ? exercise.name : exerciseId;
  };

  const handleAlternativeClick = (exerciseId: string) => {
    const exercise = getExerciseById(exerciseId);
    if (exercise) {
      const element = document.querySelector(`[data-exercise-id="${exerciseId}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
        }, 2000);
      }
    }
  };

  return (
    <>
      <ScrollArea className={isMobile ? "h-[70vh] w-full" : "h-[600px] w-full"}>
        <div className={`grid gap-3 p-3 ${
          isMobile 
            ? 'grid-cols-1' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'
        }`}>
          {exercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className={`relative transition-all duration-200 ${
                hasCompleteData(exercise) ? 'ring-1 ring-blue-200' : ''
              } ${isMobile ? 'shadow-sm' : ''}`}
              data-exercise-id={exercise.id}
            >
              <CardHeader className={isMobile ? "pb-2 px-3 py-2" : "pb-3"}>
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <CardTitle className={`${
                      isMobile ? 'text-sm' : 'text-lg'
                    } font-semibold line-clamp-2`}>
                      {exercise.name}
                      {hasCompleteData(exercise) && (
                        <Badge variant="secondary" className={`ml-1 ${
                          isMobile ? 'text-xs px-1 py-0' : 'text-xs ml-2'
                        }`}>
                          Enhanced
                        </Badge>
                      )}
                    </CardTitle>
                  </div>
                  <div className={`flex ${isMobile ? 'gap-0.5 ml-1' : 'gap-1 ml-2'}`}>
                    <Button
                      variant="ghost"
                      size={isMobile ? "sm" : "sm"}
                      onClick={() => toggleExpanded(exercise.id)}
                      className={isMobile ? "h-7 w-7 p-0" : "h-8 w-8 p-0"}
                    >
                      {isExpanded(exercise.id) ? 
                        <ChevronUp className="h-3 w-3" /> : 
                        <ChevronDown className="h-3 w-3" />
                      }
                    </Button>
                    <Button
                      variant="ghost"
                      size={isMobile ? "sm" : "sm"}
                      onClick={() => onEdit(exercise)}
                      className={isMobile ? "h-7 w-7 p-0" : "h-8 w-8 p-0"}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size={isMobile ? "sm" : "sm"}
                      onClick={() => onDelete(exercise.id)}
                      className={`${
                        isMobile ? "h-7 w-7 p-0" : "h-8 w-8 p-0"
                      } text-red-600 hover:text-red-700`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className={`flex gap-1 flex-wrap ${isMobile ? 'mt-1' : 'gap-2'}`}>
                  <Badge className={`${getCategoryColor(exercise.category)} ${
                    isMobile ? 'text-xs px-1.5 py-0' : ''
                  }`}>
                    {exercise.category}
                  </Badge>
                  <Badge className={`${getDifficultyColor(exercise.difficulty)} ${
                    isMobile ? 'text-xs px-1.5 py-0' : ''
                  }`}>
                    {exercise.difficulty}
                  </Badge>
                  {exercise.isCustom && (
                    <Badge variant="outline" className={`border-purple-200 text-purple-700 ${
                      isMobile ? 'text-xs px-1.5 py-0' : ''
                    }`}>
                      Custom
                    </Badge>
                  )}
                  {exercise.isModified && (
                    <Badge variant="outline" className={`border-orange-200 text-orange-700 ${
                      isMobile ? 'text-xs px-1.5 py-0' : ''
                    }`}>
                      Modified
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className={`space-y-2 ${isMobile ? 'px-3 py-2' : 'space-y-3'}`}>
                {/* Muscle Groups - Always visible */}
                <div>
                  <p className={`${
                    isMobile ? 'text-xs' : 'text-sm'
                  } font-medium text-gray-700 mb-1`}>
                    Muscle Groups:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {exercise.muscleGroup.slice(0, isMobile && !isExpanded(exercise.id) ? 2 : undefined).map((muscle, index) => (
                      <Badge key={index} variant="secondary" className={
                        isMobile ? 'text-xs px-1 py-0' : 'text-xs'
                      }>
                        {muscle}
                      </Badge>
                    ))}
                    {isMobile && !isExpanded(exercise.id) && exercise.muscleGroup.length > 2 && (
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        +{exercise.muscleGroup.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Equipment - Always visible */}
                <div>
                  <p className={`${
                    isMobile ? 'text-xs' : 'text-sm'
                  } font-medium text-gray-700 mb-1`}>
                    Equipment:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {exercise.equipment.slice(0, isExpanded(exercise.id) ? undefined : (isMobile ? 1 : 2)).map((equip, index) => (
                      <Badge key={index} variant="outline" className={`${
                        isMobile ? 'text-xs px-1 py-0' : 'text-xs'
                      } flex items-center gap-1`}>
                        {exercise.equipmentImages?.[equip] && (
                          <Image 
                            className="h-2.5 w-2.5 cursor-pointer" 
                            onClick={() => setImagePreview({ 
                              url: exercise.equipmentImages![equip], 
                              title: equip 
                            })}
                          />
                        )}
                        {equip}
                        {exercise.primaryEquipment === equip && (
                          <span className="text-blue-600">*</span>
                        )}
                      </Badge>
                    ))}
                    {!isExpanded(exercise.id) && exercise.equipment.length > (isMobile ? 1 : 2) && (
                      <Badge variant="outline" className={isMobile ? 'text-xs px-1 py-0' : 'text-xs'}>
                        +{exercise.equipment.length - (isMobile ? 1 : 2)}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded(exercise.id) && (
                  <>
                    {/* Equipment Images Grid */}
                    {exercise.equipmentImages && Object.keys(exercise.equipmentImages).length > 0 && (
                      <div>
                        <p className={`${
                          isMobile ? 'text-xs' : 'text-sm'
                        } font-medium text-gray-700 mb-2`}>
                          Equipment Images:
                        </p>
                        <div className={`grid gap-2 ${
                          isMobile ? 'grid-cols-1' : 'grid-cols-2'
                        }`}>
                          {Object.entries(exercise.equipmentImages).map(([equip, imageUrl]) => (
                            <div key={equip} className="relative group">
                              <img
                                src={imageUrl}
                                alt={equip}
                                className={`w-full object-cover rounded cursor-pointer hover:opacity-80 transition-opacity ${
                                  isMobile ? 'h-16' : 'h-20'
                                }`}
                                onClick={() => setImagePreview({ url: imageUrl, title: equip })}
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b">
                                {equip}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Video Preview */}
                    {exercise.videoUrl && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-blue-600" />
                          <span className={`${
                            isMobile ? 'text-xs' : 'text-sm'
                          } font-medium text-gray-700`}>
                            Video Available
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setVideoPreview(videoPreview === exercise.id ? null : exercise.id)}
                            className="text-xs h-6 px-2"
                          >
                            {videoPreview === exercise.id ? 'Hide' : 'Preview'}
                          </Button>
                        </div>
                        
                        {videoPreview === exercise.id && getYouTubeEmbedUrl(exercise.videoUrl) && (
                          <div className="w-full">
                            <iframe
                              width="100%"
                              height={isMobile ? "120" : "150"}
                              src={getYouTubeEmbedUrl(exercise.videoUrl)}
                              title={exercise.name}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Alternative Exercises */}
                    {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
                      <div>
                        <p className={`${
                          isMobile ? 'text-xs' : 'text-sm'
                        } font-medium text-gray-700 mb-2`}>
                          Alternative Exercises ({exercise.alternativeExercises.length}):
                        </p>
                        <div className={isMobile ? 'flex flex-wrap gap-1' : 'space-y-1'}>
                          {exercise.alternativeExercises.map((altId, index) => (
                            <Badge 
                              key={index}
                              variant="outline" 
                              className={`${
                                isMobile ? 'text-xs px-1.5 py-0' : 'text-xs'
                              } cursor-pointer hover:bg-blue-50 flex items-center gap-1`}
                              onClick={() => handleAlternativeClick(altId)}
                            >
                              <ExternalLink className="h-2.5 w-2.5" />
                              {isMobile ? 
                                getAlternativeExerciseName(altId).substring(0, 15) + '...' :
                                getAlternativeExerciseName(altId)
                              }
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Full Notes */}
                    <div>
                      <p className={`${
                        isMobile ? 'text-xs' : 'text-sm'
                      } font-medium text-gray-700 mb-1`}>
                        Instructions:
                      </p>
                      <p className={`${
                        isMobile ? 'text-xs' : 'text-sm'
                      } text-gray-600`}>
                        {exercise.notes}
                      </p>
                    </div>
                  </>
                )}

                {/* Collapsed Notes Preview */}
                {!isExpanded(exercise.id) && (
                  <div>
                    <p className={`${
                      isMobile ? 'text-xs' : 'text-sm'
                    } font-medium text-gray-700 mb-1`}>
                      Instructions:
                    </p>
                    <p className={`${
                      isMobile ? 'text-xs' : 'text-sm'
                    } text-gray-600 line-clamp-2`}>
                      {exercise.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {exercises.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No exercises found matching your criteria.</p>
          </div>
        )}
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
