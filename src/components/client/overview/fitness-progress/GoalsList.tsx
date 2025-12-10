
import { Target, User, Award } from "lucide-react";
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

  // Separate goals by source
  const personalGoals = progressData.filter(g => g.source === 'personal');
  const trainerGoals = progressData.filter(g => g.source === 'trainer');
  
  // Get unique trainer name for section header
  const trainerName = trainerGoals.length > 0 ? trainerGoals[0].trainerName : null;

  return (
    <div className="space-y-6">
      {/* Personal Goals Section */}
      {personalGoals.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              My Personal Goals
            </h4>
          </div>
          <div className="space-y-4 pl-1">
            {personalGoals.map((item) => (
              <GoalItem 
                key={item.id || item.goal} 
                item={item} 
                onEdit={onEditGoal}
                onDelete={onDeletePrompt}
              />
            ))}
          </div>
        </div>
      )}

      {/* Trainer Goals Section */}
      {trainerGoals.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-purple-600" />
            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Trainer Goals
              {trainerName && (
                <span className="text-xs font-normal ml-1 text-purple-600">
                  (Assigned by {trainerName})
                </span>
              )}
            </h4>
          </div>
          <div className="space-y-4 pl-1">
            {trainerGoals.map((item) => (
              <GoalItem 
                key={item.id || item.goal} 
                item={item} 
                onEdit={onEditGoal}
                onDelete={onDeletePrompt}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
