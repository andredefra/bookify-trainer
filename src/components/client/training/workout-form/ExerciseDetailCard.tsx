import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Info, Video, Shuffle, Calendar } from "lucide-react";
import { ExerciseData } from "@/data/exercises/types";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";

interface ExerciseDetailCardProps {
  exercise: ExerciseData;
  trainerNotes?: string;
  onTrainerNotesChange?: (notes: string) => void;
}

export function ExerciseDetailCard({ exercise, trainerNotes, onTrainerNotesChange }: ExerciseDetailCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState(trainerNotes || "");

  const getAlternativeExercises = () => {
    if (!exercise.alternativeExercises) return [];
    return completeExerciseDatabase.filter(ex => 
      exercise.alternativeExercises?.includes(ex.id)
    );
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      chest: "bg-red-100 text-red-800",
      back: "bg-blue-100 text-blue-800", 
      legs: "bg-green-100 text-green-800",
      shoulders: "bg-yellow-100 text-yellow-800",
      arms: "bg-purple-100 text-purple-800",
      core: "bg-orange-100 text-orange-800",
      cardio: "bg-pink-100 text-pink-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800", 
      advanced: "bg-red-100 text-red-800"
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800";
  };

  const saveNotes = () => {
    onTrainerNotesChange?.(tempNotes);
    setIsEditingNotes(false);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{exercise.name}</CardTitle>
            <Badge className={`text-xs ${getCategoryColor(exercise.category)}`}>
              {exercise.category}
            </Badge>
            <Badge className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}>
              {exercise.difficulty}
            </Badge>
          </div>
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4 mr-1" />
                Details
                {isExpanded ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </CardHeader>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* Trainer Notes Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-900 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Trainer Notes:
                  </h4>
                  {!isEditingNotes && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsEditingNotes(true);
                        setTempNotes(trainerNotes || "");
                      }}
                      className="text-blue-700 hover:text-blue-900"
                    >
                      {trainerNotes ? "Edit" : "Add notes"}
                    </Button>
                  )}
                </div>
                
                {isEditingNotes ? (
                  <div className="space-y-2">
                    <Textarea
                      value={tempNotes}
                      onChange={(e) => setTempNotes(e.target.value)}
                      placeholder="Add trainer notes for this exercise..."
                      className="bg-white"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={saveNotes}>Save</Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setIsEditingNotes(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-blue-800 text-sm">
                    {trainerNotes || "Use assistance if needed"}
                  </p>
                )}
              </div>

              {/* Exercise Details */}
              <div className="space-y-3">
                <h4 className="font-medium">Exercise Details</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Muscles: </span>
                    <span>{exercise.muscleGroup.join(", ")}</span>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Equipment: </span>
                    <span>{exercise.equipment.join(", ")}</span>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-muted-foreground">Description: </span>
                  <p className="text-sm mt-1">{exercise.notes}</p>
                </div>

                {/* Video Link */}
                {exercise.videoUrl && (
                  <div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Watch Video
                    </Button>
                  </div>
                )}

                {/* Alternative Exercises */}
                {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shuffle className="h-4 w-4" />
                      <span className="font-medium text-sm">Alternatives ({getAlternativeExercises().length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {getAlternativeExercises().slice(0, 4).map((altExercise) => (
                        <Badge key={altExercise.id} variant="outline" className="text-xs">
                          {altExercise.name}
                        </Badge>
                      ))}
                      {getAlternativeExercises().length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{getAlternativeExercises().length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}