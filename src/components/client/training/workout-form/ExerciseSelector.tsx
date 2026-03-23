import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Dumbbell, X } from "lucide-react";
import { ExerciseData, Mechanics, ForceType } from "@/data/exercises/types";
import { deriveMechanics, deriveForceType } from "@/data/exercises/biomechanicsMapping";
import { ExerciseVisualCard } from "@/components/trainer/dashboard/tabs/programs/ExerciseVisualCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { useClientExerciseLibrary } from "@/hooks/useClientExerciseLibrary";

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
  const [equipmentFilter, setEquipmentFilter] = useState<string>("all");
  const [mechanicsFilter, setMechanicsFilter] = useState<'all' | Mechanics>('all');
  const [forceTypeFilter, setForceTypeFilter] = useState<'all' | ForceType>('all');
  const isMobile = useIsMobile();

  // Use the merged client + trainer exercise database
  const { exercises: mergedExercises } = useClientExerciseLibrary();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'chest', label: 'Chest' },
    { value: 'back', label: 'Back' },
    { value: 'legs', label: 'Legs' },
    { value: 'shoulders', label: 'Shoulders' },
    { value: 'arms', label: 'Arms' },
    { value: 'core', label: 'Core' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'functional', label: 'Functional' },
    { value: 'flexibility', label: 'Flexibility' },
    { value: 'plyometric', label: 'Plyometric' },
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const equipmentOptions = [
    { value: 'all', label: 'All Equipment' },
    { value: 'bodyweight', label: 'Bodyweight' },
    { value: 'barbell', label: 'Barbell' },
    { value: 'dumbbell', label: 'Dumbbells' },
    { value: 'cable', label: 'Cable Machine' },
    { value: 'machine', label: 'Machine' },
    { value: 'kettlebell', label: 'Kettlebell' },
    { value: 'resistance', label: 'Resistance Band' },
    { value: 'bench', label: 'Bench' },
  ];

  const filteredExercises = useMemo(() => mergedExercises.filter(exercise => {
    const matchesSearch = !searchQuery || 
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || exercise.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "all" || exercise.difficulty === difficultyFilter;
    const matchesEquipment = equipmentFilter === "all" || 
      exercise.equipment.some(eq => eq.toLowerCase().includes(equipmentFilter.toLowerCase()));
    const matchesMechanics = mechanicsFilter === "all" || deriveMechanics(exercise) === mechanicsFilter;
    const matchesForceType = forceTypeFilter === "all" || deriveForceType(exercise) === forceTypeFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesEquipment && matchesMechanics && matchesForceType;
  }), [mergedExercises, searchQuery, categoryFilter, difficultyFilter, equipmentFilter, mechanicsFilter, forceTypeFilter]);

  const myExercises = useMemo(() => filteredExercises.filter(e => e.source === 'client' || !e.source), [filteredExercises]);
  const trainerExercises = useMemo(() => filteredExercises.filter(e => e.source === 'trainer'), [filteredExercises]);

  // continued below in render...
        </div>
      </DialogContent>
    </Dialog>
  );
}
