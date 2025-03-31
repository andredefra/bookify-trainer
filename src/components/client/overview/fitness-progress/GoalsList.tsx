
import { Target } from "lucide-react";
import { ProgressItem } from "./types";
import { GoalItem } from "./GoalItem";

interface GoalsListProps {
  progressData: ProgressItem[];
  onEditGoal: (goal: ProgressItem) => void;
  onDeletePrompt: (goal: ProgressItem) => void;
}

export function GoalsList({ progressData, onEditGoal, onDeletePrompt }: GoalsListProps) {
  if (progressData.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <Target className="mx-auto h-12 w-12 opacity-50 mb-2" />
        <p>No goals added yet. Click 'Add Goal' to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {progressData.map((item) => (
        <GoalItem 
          key={item.id || item.goal} 
          item={item} 
          onEdit={onEditGoal}
          onDelete={onDeletePrompt}
        />
      ))}
    </div>
  );
}
