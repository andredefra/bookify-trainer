import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Dumbbell, Filter } from "lucide-react";
import { ExerciseData } from "@/data/exercises/types";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";

interface ExerciseSelectorProps {
  value: string;
  onSelect: (exercise: ExerciseData) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ExerciseSelector({ value, onSelect, placeholder = "Select an exercise", disabled }: ExerciseSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const categories = ["all", "chest", "back", "legs", "shoulders", "arms", "core", "cardio"];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];

  const filteredExercises = completeExerciseDatabase.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || exercise.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "all" || exercise.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleExerciseSelect = (exercise: ExerciseData) => {
    onSelect(exercise);
    setOpen(false);
    setSearchQuery("");
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-start text-left font-normal"
          disabled={disabled}
        >
          <Dumbbell className="mr-2 h-4 w-4" />
          {value || placeholder}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Select Exercise</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff === "all" ? "All Levels" : diff.charAt(0).toUpperCase() + diff.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Exercise List */}
          <div className="max-h-[50vh] overflow-y-auto">
            <div className="grid gap-2">
              {filteredExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleExerciseSelect(exercise)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{exercise.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getCategoryColor(exercise.category)}`}>
                          {exercise.category}
                        </Badge>
                        <Badge className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {exercise.muscleGroup.join(", ")}
                      </p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{exercise.equipment.join(", ")}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}