import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Routine } from "@/data/training/types";
import { Edit2, Trash2, Dumbbell } from "lucide-react";

interface RoutineCardProps {
  routine: Routine;
  onEdit: (routine: Routine) => void;
  onDelete: (routineId: string) => void;
}

export function RoutineCard({ routine, onEdit, onDelete }: RoutineCardProps) {
  const displayedExercises = routine.exercises.slice(0, 4);
  const remainingCount = routine.exercises.length - displayedExercises.length;

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-md">
              <Dumbbell className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">{routine.title}</CardTitle>
              <Badge variant="secondary" className="mt-1">
                {routine.exercises.length} exercises
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {routine.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {routine.description}
          </p>
        )}
        
        <div className="space-y-1">
          {displayedExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span className="truncate">{exercise.name}</span>
              <span className="text-xs ml-auto">
                {exercise.sets}×{exercise.reps}
              </span>
            </div>
          ))}
          {remainingCount > 0 && (
            <p className="text-xs text-muted-foreground pl-3.5">
              +{remainingCount} more exercises
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(routine)}
          >
            <Edit2 className="h-3.5 w-3.5 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => onDelete(routine.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
