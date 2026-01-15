import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ExerciseData } from "@/data/exercises/types";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";
import { Plus, X } from "lucide-react";

interface QuickCreateExerciseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialName: string;
  onExerciseCreated: (exercise: ExerciseData) => void;
}

const categories = ["chest", "back", "legs", "shoulders", "arms", "core", "cardio"] as const;
const difficulties = ["beginner", "intermediate", "advanced"] as const;
const commonEquipment = [
  "Barbell",
  "Dumbbells",
  "Cable Machine",
  "Machine",
  "Bodyweight",
  "Resistance Bands",
  "Kettlebell",
  "Pull-up Bar",
  "Bench",
];

export function QuickCreateExerciseModal({
  open,
  onOpenChange,
  initialName,
  onExerciseCreated,
}: QuickCreateExerciseModalProps) {
  const [name, setName] = useState(initialName);
  const [category, setCategory] = useState<typeof categories[number]>("chest");
  const [difficulty, setDifficulty] = useState<typeof difficulties[number]>("intermediate");
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [muscleInput, setMuscleInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Reset form when modal opens with new name
  useState(() => {
    if (open) {
      setName(initialName);
      setCategory("chest");
      setDifficulty("intermediate");
      setMuscleGroups([]);
      setEquipment([]);
    }
  });

  const handleAddMuscle = () => {
    if (muscleInput.trim() && !muscleGroups.includes(muscleInput.trim())) {
      setMuscleGroups([...muscleGroups, muscleInput.trim()]);
      setMuscleInput("");
    }
  };

  const handleRemoveMuscle = (muscle: string) => {
    setMuscleGroups(muscleGroups.filter((m) => m !== muscle));
  };

  const handleToggleEquipment = (eq: string) => {
    if (equipment.includes(eq)) {
      setEquipment(equipment.filter((e) => e !== eq));
    } else {
      setEquipment([...equipment, eq]);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) return;

    setIsSaving(true);

    // Create new exercise
    const newExercise: ExerciseData = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      category: category,
      difficulty: difficulty,
      muscleGroup: muscleGroups.length > 0 ? muscleGroups : [category.charAt(0).toUpperCase() + category.slice(1)],
      equipment: equipment.length > 0 ? equipment : ["Bodyweight"],
      notes: "Custom exercise created by trainer",
      isCustom: true,
      isDeletable: true,
    };

    // Add to the database (runtime addition)
    completeExerciseDatabase.push(newExercise);

    // Notify parent
    onExerciseCreated(newExercise);
    
    setIsSaving(false);
    onOpenChange(false);

    // Reset form
    setName("");
    setCategory("chest");
    setDifficulty("intermediate");
    setMuscleGroups([]);
    setEquipment([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Exercise</DialogTitle>
          <DialogDescription>
            Add a new exercise to your library. It will be available for all future programs.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="exercise-name">Exercise Name *</Label>
            <Input
              id="exercise-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Single Arm Cable Row"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category *</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <Label>Difficulty *</Label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => (
                <Badge
                  key={diff}
                  variant={difficulty === diff ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() => setDifficulty(diff)}
                >
                  {diff}
                </Badge>
              ))}
            </div>
          </div>

          {/* Muscle Groups */}
          <div className="space-y-2">
            <Label>Muscle Groups</Label>
            <div className="flex gap-2">
              <Input
                value={muscleInput}
                onChange={(e) => setMuscleInput(e.target.value)}
                placeholder="e.g., Latissimus Dorsi"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddMuscle();
                  }
                }}
              />
              <Button type="button" variant="outline" size="icon" onClick={handleAddMuscle}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {muscleGroups.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {muscleGroups.map((muscle) => (
                  <Badge key={muscle} variant="secondary" className="gap-1">
                    {muscle}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => handleRemoveMuscle(muscle)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Equipment */}
          <div className="space-y-2">
            <Label>Equipment</Label>
            <div className="flex flex-wrap gap-2">
              {commonEquipment.map((eq) => (
                <Badge
                  key={eq}
                  variant={equipment.includes(eq) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleToggleEquipment(eq)}
                >
                  {eq}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim() || isSaving}>
            {isSaving ? "Creating..." : "Create Exercise"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
