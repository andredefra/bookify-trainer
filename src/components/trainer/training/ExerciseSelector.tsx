import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Dumbbell } from "lucide-react";
import { useExerciseLibrary } from "@/hooks/useExerciseLibrary";
import { ExerciseData } from "@/data/exercises/types";

interface ExerciseSelectorProps {
  value: string;
  onSelect: (exercise: ExerciseData) => void;
  placeholder?: string;
}

export function ExerciseSelector({ value, onSelect, placeholder = "Select an exercise" }: ExerciseSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getExerciseSuggestions } = useExerciseLibrary();

  const suggestions = searchQuery.length >= 2 ? getExerciseSuggestions(searchQuery, 20) : [];

  const handleSelectExercise = (exercise: ExerciseData) => {
    onSelect(exercise);
    setOpen(false);
    setSearchQuery("");
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      chest: 'bg-red-100 text-red-800',
      back: 'bg-green-100 text-green-800',
      legs: 'bg-blue-100 text-blue-800',
      shoulders: 'bg-yellow-100 text-yellow-800',
      arms: 'bg-purple-100 text-purple-800',
      core: 'bg-orange-100 text-orange-800',
      cardio: 'bg-pink-100 text-pink-800',
      functional: 'bg-teal-100 text-teal-800',
      flexibility: 'bg-cyan-100 text-cyan-800',
      plyometric: 'bg-amber-100 text-amber-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
          onClick={() => setOpen(true)}
        >
          {value ? (
            <span>{value}</span>
          ) : (
            <span className="text-muted-foreground flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              {placeholder}
            </span>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Exercise</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercises..."
              className="pl-10"
              autoFocus
            />
          </div>
          
          {searchQuery.length < 2 && (
            <div className="text-center py-8 text-muted-foreground">
              <Dumbbell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Type at least 2 characters to search exercises</p>
            </div>
          )}
          
          {searchQuery.length >= 2 && suggestions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No exercises found for "{searchQuery}"</p>
            </div>
          )}
          
          {suggestions.length > 0 && (
            <div className="flex-1 overflow-y-auto">
              <div className="grid gap-3">
                {suggestions.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="p-4 border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleSelectExercise(exercise)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{exercise.name}</h3>
                      <div className="flex gap-1 flex-shrink-0 ml-2">
                        <Badge className={getCategoryColor(exercise.category)}>
                          {exercise.category}
                        </Badge>
                        {exercise.isCustom && (
                          <Badge variant="outline">Custom</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-2">
                      <strong>Muscles:</strong> {exercise.muscleGroup.slice(0, 3).join(", ")}
                      {exercise.muscleGroup.length > 3 && ` +${exercise.muscleGroup.length - 3} more`}
                    </div>
                    
                    {exercise.equipment.length > 0 && (
                      <div className="text-sm text-muted-foreground mb-2">
                        <strong>Equipment:</strong> {exercise.equipment.slice(0, 2).join(", ")}
                        {exercise.equipment.length > 2 && ` +${exercise.equipment.length - 2} more`}
                      </div>
                    )}
                    
                    {exercise.notes && (
                      <div className="text-xs text-muted-foreground line-clamp-2">
                        {exercise.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}