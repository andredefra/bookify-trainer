
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { CheckCircle, Edit, Video, Youtube, Play } from "lucide-react";
import { useForm } from "react-hook-form";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  notes?: string;
  videoUrl?: string;
  videoSource?: 'youtube' | 'vimeo';
}

interface ExerciseItemProps {
  exercise: Exercise;
  dayId: string;
  onSaveWeight: (exerciseId: string, dayId: string, weight: number) => void;
}

export function ExerciseItem({ exercise, dayId, onSaveWeight }: ExerciseItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const form = useForm();
  
  const handleSave = () => {
    onSaveWeight(
      exercise.id, 
      dayId, 
      parseFloat(form.getValues(`weight-${exercise.id}`) || "0")
    );
    setIsEditing(false);
  };
  
  const getEmbedUrl = (url: string, source: 'youtube' | 'vimeo') => {
    if (!url) return null;
    
    if (source === 'youtube') {
      // Extract YouTube video ID
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(youtubeRegex);
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    }
    
    if (source === 'vimeo') {
      // Extract Vimeo video ID
      const vimeoRegex = /(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)([0-9]+)/;
      const match = url.match(vimeoRegex);
      return match ? `https://player.vimeo.com/video/${match[1]}` : null;
    }
    
    return null;
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{exercise.name}</h4>
          <p className="text-sm text-muted-foreground">
            {exercise.sets} sets × {exercise.reps}
          </p>
        </div>
        
        <div className="flex items-center">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Form {...form}>
                <FormField
                  control={form.control}
                  name={`weight-${exercise.id}`}
                  defaultValue={exercise.weight || ""}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-20 h-8"
                          placeholder="kg"
                        />
                      </FormControl>
                      <FormLabel className="text-xs font-normal mt-0">kg</FormLabel>
                    </FormItem>
                  )}
                />
              </Form>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0"
                onClick={handleSave}
              >
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center">
              {exercise.weight ? (
                <Badge variant="outline" className="mr-2">
                  {exercise.weight} kg
                </Badge>
              ) : null}
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {exercise.notes && (
        <div className="bg-muted/30 p-2 rounded text-sm mt-2">
          {exercise.notes}
        </div>
      )}
      
      {exercise.videoUrl && exercise.videoSource && (
        <div className="mt-3">
          {!showVideo ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowVideo(true)}
              className="w-full flex items-center justify-center bg-muted/20"
            >
              {exercise.videoSource === 'youtube' ? (
                <Youtube className="mr-2 h-4 w-4 text-red-500" />
              ) : (
                <Video className="mr-2 h-4 w-4 text-blue-500" />
              )}
              <Play className="mr-2 h-4 w-4" />
              Watch {exercise.videoSource === 'youtube' ? 'YouTube' : 'Vimeo'} demonstration
            </Button>
          ) : (
            <div className="border rounded overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={getEmbedUrl(exercise.videoUrl, exercise.videoSource)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${exercise.name} demonstration`}
                ></iframe>
              </AspectRatio>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowVideo(false)}
                className="w-full text-muted-foreground"
              >
                Hide video
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
