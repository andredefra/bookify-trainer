
import { Button } from "@/components/ui/button";

interface WorkoutFormButtonsProps {
  onCancel: () => void;
}

export function WorkoutFormButtons({ onCancel }: WorkoutFormButtonsProps) {
  return (
    <div className="flex justify-end space-x-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">
        Save Workout
      </Button>
    </div>
  );
}
