
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExerciseData, getExerciseById } from '@/data/exercises/exerciseDatabase';
import { Edit, Trash2, Video, Image, ChevronDown, ChevronUp, ExternalLink, Play } from 'lucide-react';
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
      <ScrollArea className="h-full w-full">
        <div className={`${isMobile ? 'p-1' : 'p-2'} grid grid-cols-1 ${isMobile ? 'gap-1' : 'gap-2'}`}>
          {exercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className={`relative transition-all duration-200 shadow-sm ${
                isMobile ? 'text-xs' : ''
              } ${isExpanded(exercise.id) ? (isMobile ? 'max-h-96 overflow-y-auto' : '') : (isMobile ? 'max-h-24' : '')}`}
              data-exercise-id={exercise.id}
            >
              <CardHeader className={`${isMobile ? 'pb-1 px-2 py-1' : 'pb-2 px-3 py-3'}`}>
                <div className="flex justify-between items-start gap-1">
                  <div className="flex-1 min-w-0">
                    <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium leading-tight`}>
                      {isMobile ? exercise.name.substring(0, 25) + (exercise.name.length > 25 ? '...' : '') : exercise.name}
                      {hasCompleteData(exercise) && (
                        <Badge variant="secondary" className={`ml-1 ${isMobile ? 'text-xs px-0.5 py-0' : 'text-xs px-1 py-0'}`}>
                          ✓
                        </Badge>
                      )}
                    </CardTitle>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(exercise.id)}
                      className={`${isMobile ? 'h-4 w-4 p-0' : 'h-6 w-6 p-0'}`}
                    >
                      {isExpanded(exercise.id) ? 
                        <ChevronUp className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'}`} /> : 
                        <ChevronDown className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'}`} />
                      }
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(exercise)}
                      className={`${isMobile ? 'h-4 w-4 p-0' : 'h-6 w-6 p-0'}`}
                    >
                      <Edit className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(exercise.id)}
                      className={`${isMobile ? 'h-4 w-4 p-0' : 'h-6 w-6 p-0'} text-red-600 hover:text-red-700`}
                    >
                      <Trash2 className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'}`} />
                    </Button>
                  </div>
                </div>

                {!isMobile && (
                  <div className="flex gap-1 flex-wrap mt-1">
                    <Badge className={`${getCategoryColor(exercise.category)} text-xs px-1 py-0`}>
                      {exercise.category}
                    </Badge>
                    <Badge className={`${getDifficultyColor(exercise.difficulty)} text-xs px-1 py-0`}>
                      {exercise.difficulty}
                    </Badge>
                    {exercise.isCustom && (
                      <Badge variant="outline" className="border-purple-200 text-purple-700 text-xs px-1 py-0">
                        Custom
                      </Badge>
                    )}
                  </div>
                )}
              </CardHeader>

              {/* Mobile compact view or desktop/expanded view */}
              {(!isMobile || isExpanded(exercise.id)) && (
                <CardContent className={`${isMobile ? 'px-2 py-1 space-y-1' : 'px-3 py-2 space-y-2'}`}>
                  {/* Mobile badges when expanded */}
                  {isMobile && (
                    <div className="flex gap-1 flex-wrap">
                      <Badge className={`${getCategoryColor(exercise.category)} text-xs px-1 py-0`}>
                        {exercise.category}
                      </Badge>
                      <Badge className={`${getDifficultyColor(exercise.difficulty)} text-xs px-1 py-0`}>
                        {exercise.difficulty}
                      </Badge>
                    </div>
                  )}

                  {/* Muscle Groups */}
                  <div>
                    <p className={`${isMobile ? 'text-xs' : 'text-xs'} font-medium text-gray-700 mb-1`}>
                      {isMobile ? 'Muscles:' : 'Muscles:'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {exercise.muscleGroup.slice(0, isMobile ? (isExpanded(exercise.id) ? undefined : 2) : (isExpanded(exercise.id) ? undefined : 3)).map((muscle, index) => (
                        <Badge key={index} variant="secondary" className={`${isMobile ? 'text-xs px-0.5 py-0' : 'text-xs px-1 py-0'}`}>
                          {muscle}
                        </Badge>
                      ))}
                      {!isExpanded(exercise.id) && exercise.muscleGroup.length > (isMobile ? 2 : 3) && (
                        <Badge variant="secondary" className={`${isMobile ? 'text-xs px-0.5 py-0' : 'text-xs px-1 py-0'}`}>
                          +{exercise.muscleGroup.length - (isMobile ? 2 : 3)}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Equipment */}
                  <div>
                    <p className={`${isMobile ? 'text-xs' : 'text-xs'} font-medium text-gray-700 mb-1`}>Equipment:</p>
                    <div className="flex flex-wrap gap-1">
                      {exercise.equipment.slice(0, isMobile ? (isExpanded(exercise.id) ? undefined : 1) : (isExpanded(exercise.id) ? undefined : 2)).map((equip, index) => (
                        <Badge key={index} variant="outline" className={`${isMobile ? 'text-xs px-0.5 py-0' : 'text-xs px-1 py-0'} flex items-center gap-1`}>
                          {exercise.equipmentImages?.[equip] && (
                            <Image 
                              className={`${isMobile ? 'h-2 w-2' : 'h-2 w-2'} cursor-pointer`} 
                              onClick={() => setImagePreview({ 
                                url: exercise.equipmentImages![equip], 
                                title: equip 
                              })}
                            />
                          )}
                          {isMobile ? equip.substring(0, 8) + (equip.length > 8 ? '...' : '') : equip}
                          {exercise.primaryEquipment === equip && (
                            <span className="text-blue-600">*</span>
                          )}
                        </Badge>
                      ))}
                      {!isExpanded(exercise.id) && exercise.equipment.length > (isMobile ? 1 : 2) && (
                        <Badge variant="outline" className={`${isMobile ? 'text-xs px-0.5 py-0' : 'text-xs px-1 py-0'}`}>
                          +{exercise.equipment.length - (isMobile ? 1 : 2)}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Video */}
                  {exercise.videoUrl && (
                    <div className="flex items-center gap-1">
                      <Video className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'} text-blue-600`} />
                      <span className={`${isMobile ? 'text-xs' : 'text-xs'} font-medium text-gray-700`}>Video</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setVideoPreview(videoPreview === exercise.id ? null : exercise.id)}
                        className={`${isMobile ? 'text-xs h-4 px-1' : 'text-xs h-5 px-2'} ml-auto`}
                      >
                        <Play className={`${isMobile ? 'h-1 w-1 mr-0.5' : 'h-2 w-2 mr-1'}`} />
                        {videoPreview === exercise.id ? 'Hide' : 'Play'}
                      </Button>
                    </div>
                  )}

                  {/* Video Preview */}
                  {videoPreview === exercise.id && getYouTubeEmbedUrl(exercise.videoUrl) && (
                    <div className="w-full">
                      <iframe
                        width="100%"
                        height={isMobile ? "80" : "120"}
                        src={getYouTubeEmbedUrl(exercise.videoUrl)}
                        title={exercise.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-md"
                      />
                    </div>
                  )}

                  {/* Expanded Content */}
                  {isExpanded(exercise.id) && (
                    <>
                      {/* Equipment Images Grid */}
                      {exercise.equipmentImages && Object.keys(exercise.equipmentImages).length > 0 && (
                        <div>
                          <p className={`${isMobile ? 'text-xs' : 'text-xs'} font-medium text-gray-700 mb-1`}>Equipment Images:</p>
                          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-1`}>
                            {Object.entries(exercise.equipmentImages).slice(0, isMobile ? 2 : 6).map(([equip, imageUrl]) => (
                              <div key={equip} className="relative group">
                                <img
                                  src={imageUrl}
                                  alt={equip}
                                  className={`w-full ${isMobile ? 'h-8' : 'h-12'} object-cover rounded cursor-pointer hover:opacity-80 transition-opacity`}
                                  onClick={() => setImagePreview({ url: imageUrl, title: equip })}
                                />
                                <div className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white ${isMobile ? 'text-xs p-0.5' : 'text-xs p-0.5'} rounded-b truncate`}>
                                  {isMobile ? equip.substring(0, 6) : equip}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Alternative Exercises */}
                      {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
                        <div>
                          <p className={`${isMobile ? 'text-xs' : 'text-xs'} font-medium text-gray-700 mb-1`}>
                            Alternatives ({exercise.alternativeExercises.length}):
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {exercise.alternativeExercises.slice(0, isMobile ? 2 : 3).map((altId, index) => (
                              <Badge 
                                key={index}
                                variant="outline" 
                                className={`${isMobile ? 'text-xs px-0.5 py-0' : 'text-xs px-1 py-0'} cursor-pointer hover:bg-blue-50 flex items-center gap-1`}
                                onClick={() => handleAlternativeClick(altId)}
                              >
                                <ExternalLink className={`${isMobile ? 'h-1 w-1' : 'h-2 w-2'}`} />
                                {getAlternativeExerciseName(altId).substring(0, isMobile ? 8 : 12)}...
                              </Badge>
                            ))}
                            {exercise.alternativeExercises.length > (isMobile ? 2 : 3) && (
                              <Badge variant="outline" className={`${isMobile ? 'text-xs px-0.5 py-0' : 'text-xs px-1 py-0'}`}>
                                +{exercise.alternativeExercises.length - (isMobile ? 2 : 3)}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Instructions */}
                  <div>
                    <p className={`${isMobile ? 'text-xs' : 'text-xs'} font-medium text-gray-700 mb-1`}>Instructions:</p>
                    <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-600 ${isExpanded(exercise.id) ? '' : 'line-clamp-1'}`}>
                      {isMobile && !isExpanded(exercise.id) ? 
                        exercise.notes.substring(0, 40) + (exercise.notes.length > 40 ? '...' : '') : 
                        exercise.notes
                      }
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {exercises.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>No exercises found matching your criteria.</p>
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
