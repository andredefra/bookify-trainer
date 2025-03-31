
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface WorkoutFormButtonsProps {
  onCancel: () => void;
}

export function WorkoutFormButtons({ onCancel }: WorkoutFormButtonsProps) {
  return (
    <div className="flex justify-end space-x-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        <X className="h-4 w-4 mr-1" />
        Cancel
      </Button>
      <Button type="submit">
        <Save className="h-4 w-4 mr-1" />
        Save Workout
      </Button>
    </div>
  );
}
