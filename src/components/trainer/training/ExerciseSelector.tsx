import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Dumbbell, Grid3X3, Filter } from "lucide-react";
import { useExerciseLibrary } from "@/hooks/useExerciseLibrary";
import { ExerciseData } from "@/data/exercises/types";

interface ExerciseSelectorProps {
  value: string;
  onSelect: (exercise: ExerciseData) => void;
  placeholder?: string;
}

export function ExerciseSelector({ value, onSelect, placeholder = "Select an exercise" }: ExerciseSelectorProps) {
  const [open, setOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  
  const { 
    getExerciseSuggestions, 
    filteredExercises, 
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory 
  } = useExerciseLibrary();

  const searchSuggestions = localSearchQuery.length >= 2 ? getExerciseSuggestions(localSearchQuery, 20) : [];
  
  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All Categories', count: null },
    { value: 'chest', label: 'Chest' },
    { value: 'back', label: 'Back' },
    { value: 'legs', label: 'Legs' },
    { value: 'shoulders', label: 'Shoulders' },
    { value: 'arms', label: 'Arms' },
    { value: 'core', label: 'Core' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'functional', label: 'Functional' },
    { value: 'flexibility', label: 'Flexibility' },
    { value: 'plyometric', label: 'Plyometric' }
  ];

  const handleSelectExercise = (exercise: ExerciseData) => {
    onSelect(exercise);
    setOpen(false);
    setLocalSearchQuery("");
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
      
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Exercise</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Browse
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder="Search exercises..."
                className="pl-10"
                autoFocus
              />
            </div>
            
            {localSearchQuery.length < 2 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">Search for exercises</p>
                <p className="text-sm">Type at least 2 characters to find exercises</p>
              </div>
            )}
            
            {localSearchQuery.length >= 2 && searchSuggestions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No exercises found</p>
                <p className="text-sm">Try a different search term or browse categories</p>
              </div>
            )}
            
            {searchSuggestions.length > 0 && (
              <div className="flex-1 overflow-y-auto">
                <div className="grid gap-3">
                  {searchSuggestions.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onClick={() => handleSelectExercise(exercise)}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="browse" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by category:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className="text-xs"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredExercises.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Grid3X3 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium mb-2">No exercises in this category</p>
                  <p className="text-sm">Try selecting a different category</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {filteredExercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onClick={() => handleSelectExercise(exercise)}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Separate component for exercise cards to keep things clean
function ExerciseCard({ exercise, onClick }: { exercise: ExerciseData; onClick: () => void }) {
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
    <div
      className="p-4 border rounded-lg hover:bg-muted cursor-pointer transition-colors group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium group-hover:text-primary transition-colors">{exercise.name}</h3>
        <div className="flex gap-1 flex-shrink-0 ml-2">
          <Badge className={getCategoryColor(exercise.category)} variant="secondary">
            {exercise.category}
          </Badge>
          {exercise.isCustom && (
            <Badge variant="outline">Custom</Badge>
          )}
          {exercise.isModified && (
            <Badge variant="outline">Modified</Badge>
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
  );
}