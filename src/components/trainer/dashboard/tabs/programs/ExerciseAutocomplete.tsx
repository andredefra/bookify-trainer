
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Library } from 'lucide-react';
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary';
import { ExerciseLibraryDialog } from './ExerciseLibraryDialog';
import { ExerciseData } from '@/data/exercises/types';

interface ExerciseAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onExerciseSelect?: (exerciseNotes: string) => void;
  onExerciseDataSelect?: (exerciseData: ExerciseData) => void;
  placeholder?: string;
}

export function ExerciseAutocomplete({ 
  value, 
  onChange, 
  onExerciseSelect, 
  onExerciseDataSelect,
  placeholder = "e.g. Bench Press, Squat, etc." 
}: ExerciseAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showLibraryDialog, setShowLibraryDialog] = useState(false);
  const { getExerciseSuggestions, getExerciseByName } = useExerciseLibrary();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length >= 2) {
      const newSuggestions = getExerciseSuggestions(value, 8);
      setSuggestions(newSuggestions);
      setIsOpen(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [value, getExerciseSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (exercise: any) => {
    onChange(exercise.name);
    setIsOpen(false);
    
    // Auto-fill notes if callback provided
    if (onExerciseSelect) {
      onExerciseSelect(exercise.notes);
    }
    
    // Provide full exercise data if callback provided
    if (onExerciseDataSelect) {
      onExerciseDataSelect(exercise);
    }
  };

  const handleLibrarySelection = (exercise: ExerciseData) => {
    onChange(exercise.name);
    setShowLibraryDialog(false);
    
    if (onExerciseSelect) {
      onExerciseSelect(exercise.notes);
    }
    
    if (onExerciseDataSelect) {
      onExerciseDataSelect(exercise);
    }
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
    <>
      <div ref={containerRef} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="pl-10"
              onFocus={() => {
                if (suggestions.length > 0) {
                  setIsOpen(true);
                }
              }}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowLibraryDialog(true)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Library className="h-4 w-4" />
            Browse All
          </Button>
        </div>

        {isOpen && suggestions.length > 0 && (
          <Card className="absolute z-50 w-full mt-1 p-2 max-h-64 overflow-y-auto border shadow-lg">
            <div className="space-y-1">
              {suggestions.map((exercise) => (
                <div
                  key={exercise.id}
                  className="p-3 hover:bg-muted rounded cursor-pointer transition-colors"
                  onClick={() => handleSuggestionClick(exercise)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{exercise.name}</span>
                    <div className="flex gap-1">
                      <Badge className={getCategoryColor(exercise.category)}>
                        {exercise.category}
                      </Badge>
                      {exercise.isCustom && (
                        <Badge variant="outline">Custom</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {exercise.muscleGroup.slice(0, 2).join(', ')}
                    {exercise.muscleGroup.length > 2 && ` +${exercise.muscleGroup.length - 2} more`}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {exercise.notes}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <ExerciseLibraryDialog
        open={showLibraryDialog}
        onOpenChange={setShowLibraryDialog}
        selectionMode={true}
        onExerciseSelect={handleLibrarySelection}
      />
    </>
  );
}
