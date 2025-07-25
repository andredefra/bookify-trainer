import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface WorkoutFormButtonsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function WorkoutFormButtons({ onCancel, isSubmitting = false }: WorkoutFormButtonsProps) {
  return (
    <div className="flex justify-end space-x-2 pt-4 border-t">
      <Button type="button" variant="outline" onClick={onCancel}>
        <X className="h-4 w-4 mr-2" />
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        <Save className="h-4 w-4 mr-2" />
        {isSubmitting ? "Saving..." : "Save Workout"}
      </Button>
    </div>
  );
}