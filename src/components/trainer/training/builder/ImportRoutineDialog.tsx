import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Routine } from "@/data/training/types";
import { Dumbbell, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ImportRoutineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  routines: Routine[];
  onImport: (routine: Routine) => void;
}

export function ImportRoutineDialog({
  open,
  onOpenChange,
  routines,
  onImport,
}: ImportRoutineDialogProps) {
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);

  const selectedRoutine = routines.find((r) => r.id === selectedRoutineId);

  const handleImport = () => {
    if (selectedRoutine) {
      onImport(selectedRoutine);
      setSelectedRoutineId(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Routine</DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <p className="text-sm text-muted-foreground mb-4">
            Select a routine to import. All exercises will be copied into your current day.
          </p>

          {routines.length > 0 ? (
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {routines.map((routine) => (
                  <div
                    key={routine.id}
                    onClick={() => setSelectedRoutineId(routine.id)}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all",
                      selectedRoutineId === routine.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-md">
                          <Dumbbell className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{routine.title}</h4>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {routine.exercises.length} exercises
                          </Badge>
                          {routine.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {routine.description}
                            </p>
                          )}
                        </div>
                      </div>
                      {selectedRoutineId === routine.id && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>

                    {selectedRoutineId === routine.id && (
                      <div className="mt-3 pt-3 border-t space-y-1">
                        {routine.exercises.slice(0, 4).map((ex) => (
                          <div
                            key={ex.id}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <span className="w-1 h-1 rounded-full bg-primary/60" />
                            <span>{ex.name}</span>
                            <span className="ml-auto">
                              {ex.sets}×{ex.reps}
                            </span>
                          </div>
                        ))}
                        {routine.exercises.length > 4 && (
                          <p className="text-xs text-muted-foreground pl-3">
                            +{routine.exercises.length - 4} more
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Dumbbell className="h-10 w-10 mx-auto mb-3 opacity-50" />
              <p>No routines available</p>
              <p className="text-sm">Create routines in the "My Routines" tab first</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!selectedRoutineId}>
            Import Routine
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
