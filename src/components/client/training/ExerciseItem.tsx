
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, Weight, StickyNote } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Exercise } from "@/data/training/types";
import { ExerciseDetailCard } from "./ExerciseDetailCard";

interface ExerciseItemProps {
  exercise: Exercise;
  dayId: string;
  onSaveWeight: (exerciseId: string, dayId: string, weight: number) => void;
}

export function ExerciseItem({ exercise, dayId, onSaveWeight }: ExerciseItemProps) {
  const isMobile = useIsMobile();
  const [weight, setWeight] = useState(exercise.weight?.toString() || "");
  const [maxWeight, setMaxWeight] = useState(exercise.maxWeight?.toString() || "");
  const [userNotes, setUserNotes] = useState(exercise.userNotes || "");
  const [showUserNotes, setShowUserNotes] = useState(false);
  const [showMaxWeight, setShowMaxWeight] = useState(false);

  const handleSaveWeight = () => {
    const weightValue = parseFloat(weight);
    if (!isNaN(weightValue)) {
      onSaveWeight(exercise.id, dayId, weightValue);
    }
  };

  const handleSaveMaxWeight = () => {
    const maxWeightValue = parseFloat(maxWeight);
    if (!isNaN(maxWeightValue)) {
      console.log(`Saved max weight ${maxWeightValue} for exercise ${exercise.id}`);
    }
  };

  const handleSaveUserNotes = () => {
    console.log(`Saved user notes for exercise ${exercise.id}: ${userNotes}`);
    setShowUserNotes(false);
  };

  return (
    <div className={`${isMobile ? 'p-3' : 'p-4'} border-b space-y-4`}>
      {/* Enhanced Exercise Display */}
      <ExerciseDetailCard
        exerciseName={exercise.name}
        trainerNotes={exercise.notes}
        sets={exercise.sets?.toString()}
        reps={exercise.reps}
        weight={exercise.weight}
      />

      {/* Exercise Type Badge */}
      {exercise.exerciseType && (
        <div className="flex justify-start">
          <Badge variant={exercise.exerciseType === 'strength' ? 'default' : 'secondary'} className="text-xs">
            {exercise.exerciseType}
          </Badge>
        </div>
      )}

      {/* Weight tracking for current session */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Weight used (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-32"
            step="0.5"
          />
          <Button onClick={handleSaveWeight} size="sm" variant="outline">
            <Save className="mr-1 h-3 w-3" />
            Save
          </Button>
        </div>

        {/* Max weight tracking for strength exercises */}
        {exercise.exerciseType === 'strength' && (
          <div className="space-y-2">
            {!showMaxWeight ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMaxWeight(true)}
                className="text-blue-600 p-0 h-auto"
              >
                <Weight className="mr-1 h-3 w-3" />
                Track Max Weight
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Max weight (kg)"
                  value={maxWeight}
                  onChange={(e) => setMaxWeight(e.target.value)}
                  className="w-32"
                  step="0.5"
                />
                <Button onClick={handleSaveMaxWeight} size="sm" variant="outline">
                  <Save className="mr-1 h-3 w-3" />
                  Save Max
                </Button>
                <Button onClick={() => setShowMaxWeight(false)} size="sm" variant="ghost">
                  Cancel
                </Button>
              </div>
            )}
            {exercise.maxWeight && (
              <p className="text-xs text-muted-foreground">
                Current max: {exercise.maxWeight}kg
              </p>
            )}
          </div>
        )}

        {/* User notes */}
        <div className="space-y-2">
          {!showUserNotes ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserNotes(true)}
              className="text-green-600 p-0 h-auto"
            >
              <StickyNote className="mr-1 h-3 w-3" />
              {exercise.userNotes ? 'Edit My Notes' : 'Add My Notes'}
            </Button>
          ) : (
            <div className="space-y-2">
              <Textarea
                placeholder="Add your personal notes about this exercise..."
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                rows={2}
                className="text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveUserNotes} size="sm" variant="outline">
                  <Save className="mr-1 h-3 w-3" />
                  Save Notes
                </Button>
                <Button onClick={() => setShowUserNotes(false)} size="sm" variant="ghost">
                  Cancel
                </Button>
              </div>
            </div>
          )}
          {exercise.userNotes && !showUserNotes && (
            <p className="text-sm bg-green-50 p-2 rounded border-l-4 border-green-200">
              <strong>My notes:</strong> {exercise.userNotes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
