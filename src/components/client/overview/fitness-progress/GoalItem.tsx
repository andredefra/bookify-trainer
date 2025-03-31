
import { ProgressItem } from "./types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface GoalItemProps {
  item: ProgressItem;
  onEdit: (goal: ProgressItem) => void;
  onDelete: (goal: ProgressItem) => void;
}

export function GoalItem({ item, onEdit, onDelete }: GoalItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        <span className="font-medium">{item.goal}</span>
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
              onClick={() => onDelete(item)}
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
