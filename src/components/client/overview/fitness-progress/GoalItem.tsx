
import { ProgressItem } from "./types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, User, Award } from "lucide-react";

interface GoalItemProps {
  item: ProgressItem;
  onEdit: (goal: ProgressItem) => void;
  onDelete: (goal: ProgressItem) => void;
}

export function GoalItem({ item, onEdit, onDelete }: GoalItemProps) {
  // Handle delete for this specific goal item only
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onDelete(item);
  };

  const isTrainerGoal = item.source === 'trainer';
  
  return (
    <div className={`space-y-2 p-3 rounded-lg border ${isTrainerGoal ? 'border-purple-200 bg-purple-50/50 dark:border-purple-900/30 dark:bg-purple-950/20' : 'border-border bg-background'}`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{item.goal}</span>
          {isTrainerGoal ? (
            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
              <Award className="h-3 w-3 mr-1" />
              Trainer
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs">
              <User className="h-3 w-3 mr-1" />
              Personal
            </Badge>
          )}
        </div>
        <div className="flex flex-row items-center justify-between sm:justify-end gap-2">
          <span className="text-sm text-muted-foreground">
            {item.current} / {item.target} {item.unit}
          </span>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onEdit(item)}
              className="h-7 w-7"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDelete}
              className="h-7 w-7 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Progress value={item.progress} className="h-2" />
      <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-muted-foreground gap-1">
        <span>{item.progress}% complete</span>
        {item.lastUpdated && (
          <span className="text-right sm:text-left">Last updated: {new Date(item.lastUpdated).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
}
