
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, Youtube, Video } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Exercise } from "@/data/training/types";
import { ExerciseAutocomplete } from "@/components/trainer/dashboard/tabs/programs/ExerciseAutocomplete";

interface ExerciseFormProps {
  exercise: Exercise;
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
}

export function ExerciseForm({ exercise, onUpdate, onRemove }: ExerciseFormProps) {
  const handleExerciseSelect = (notes: string) => {
    // Auto-fill notes when an exercise is selected from the library
    if (!exercise.notes || exercise.notes.trim() === '') {
      onUpdate("notes", notes);
    }
  };

  return (
    <div className="border rounded-md p-4">
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <FormLabel>Exercise Name</FormLabel>
          <ExerciseAutocomplete
            value={exercise.name}
            onChange={(value) => onUpdate("name", value)}
            onExerciseSelect={handleExerciseSelect}
            placeholder="es. Bench Press, Squat, etc."
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <FormLabel>Sets</FormLabel>
            <Input
              type="number"
              value={exercise.sets}
              onChange={(e) => onUpdate("sets", parseInt(e.target.value))}
            />
          </div>
          <div>
            <FormLabel>Reps / Time</FormLabel>
            <div className="flex gap-1">
              <Input
                value={exercise.reps}
                onChange={(e) => onUpdate("reps", e.target.value)}
                placeholder="e.g. 10, 8-12, 30"
                className="flex-1"
              />
              <Select
                value={exercise.repsUnit || "reps"}
                onValueChange={(value) => onUpdate("repsUnit", value)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reps">Reps</SelectItem>
                  <SelectItem value="sec">Sec</SelectItem>
                  <SelectItem value="min">Min</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <FormLabel>Notes</FormLabel>
        <Textarea
          value={exercise.notes || ""}
          onChange={(e) => onUpdate("notes", e.target.value)}
          placeholder="Instructions, tempo, rest periods, etc."
          rows={2}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
        <div className="md:col-span-1">
          <FormLabel>Video Source</FormLabel>
          <Select
            value={exercise.videoSource || "none"}
            onValueChange={(value) => onUpdate("videoSource", value === "none" ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="vimeo">Vimeo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {exercise.videoSource && (
          <div className="md:col-span-2">
            <FormLabel>Video URL</FormLabel>
            <div className="flex items-center space-x-2">
              {exercise.videoSource === "youtube" && <Youtube className="h-4 w-4 text-red-500" />}
              {exercise.videoSource === "vimeo" && <Video className="h-4 w-4 text-blue-500" />}
              <Input
                value={exercise.videoUrl || ""}
                onChange={(e) => onUpdate("videoUrl", e.target.value)}
                placeholder={`Enter ${exercise.videoSource} video URL`}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end mt-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
}
