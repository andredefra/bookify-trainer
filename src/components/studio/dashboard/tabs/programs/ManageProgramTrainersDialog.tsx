import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserCircle, Star, Plus, X, History, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Trainer {
  id: string;
  name: string;
}

interface ManageProgramTrainersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programName: string;
  clientName: string;
  currentPrimaryTrainerId: string;
  currentAssignedTrainerIds: string[];
  availableTrainers: Trainer[];
  onSave: (primaryTrainerId: string, assignedTrainerIds: string[]) => void;
}

// Mock assignment history
const mockHistory = [
  { date: "2024-03-15", action: "Primary changed", from: "Laura Bianchi", to: "Marco Rossi", by: "Studio Admin" },
  { date: "2024-02-20", action: "Trainer added", trainer: "Giuseppe Verde", by: "Studio Admin" },
  { date: "2024-01-15", action: "Program assigned", trainer: "Laura Bianchi", by: "Studio Admin" },
];

export function ManageProgramTrainersDialog({
  open,
  onOpenChange,
  programName,
  clientName,
  currentPrimaryTrainerId,
  currentAssignedTrainerIds,
  availableTrainers,
  onSave,
}: ManageProgramTrainersDialogProps) {
  const { toast } = useToast();
  const [primaryTrainerId, setPrimaryTrainerId] = useState(currentPrimaryTrainerId);
  const [assignedTrainerIds, setAssignedTrainerIds] = useState<string[]>(currentAssignedTrainerIds);
  const [trainerToAdd, setTrainerToAdd] = useState<string>("");

  useEffect(() => {
    setPrimaryTrainerId(currentPrimaryTrainerId);
    setAssignedTrainerIds(currentAssignedTrainerIds);
  }, [currentPrimaryTrainerId, currentAssignedTrainerIds, open]);

  const assignedTrainers = availableTrainers.filter((t) => assignedTrainerIds.includes(t.id));
  const unassignedTrainers = availableTrainers.filter((t) => !assignedTrainerIds.includes(t.id));

  const handleAddTrainer = () => {
    if (trainerToAdd && !assignedTrainerIds.includes(trainerToAdd)) {
      setAssignedTrainerIds([...assignedTrainerIds, trainerToAdd]);
      setTrainerToAdd("");
    }
  };

  const handleRemoveTrainer = (trainerId: string) => {
    if (trainerId === primaryTrainerId) {
      toast({
        title: "Cannot remove primary trainer",
        description: "Change the primary trainer first before removing.",
        variant: "destructive",
      });
      return;
    }
    setAssignedTrainerIds(assignedTrainerIds.filter((id) => id !== trainerId));
  };

  const handleSetPrimary = (trainerId: string) => {
    if (!assignedTrainerIds.includes(trainerId)) {
      setAssignedTrainerIds([...assignedTrainerIds, trainerId]);
    }
    setPrimaryTrainerId(trainerId);
  };

  const handleSave = () => {
    if (!primaryTrainerId || assignedTrainerIds.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one trainer must be assigned.",
        variant: "destructive",
      });
      return;
    }
    onSave(primaryTrainerId, assignedTrainerIds);
    toast({
      title: "Trainers Updated",
      description: "The trainer assignment has been updated successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-primary" />
            Manage Trainers
          </DialogTitle>
          <DialogDescription>
            {programName} • {clientName}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[500px] pr-4">
          <div className="space-y-6">
            {/* Current Assigned Trainers */}
            <div>
              <h4 className="font-medium text-sm mb-3">Assigned Trainers</h4>
              <div className="space-y-2">
                {assignedTrainers.map((trainer) => (
                  <div
                    key={trainer.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserCircle className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{trainer.name}</span>
                      {trainer.id === primaryTrainerId && (
                        <Badge className="bg-amber-100 text-amber-800 text-xs">
                          <Star className="h-3 w-3 mr-1 fill-amber-500" />
                          Primary
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {trainer.id !== primaryTrainerId && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSetPrimary(trainer.id)}
                          >
                            Set Primary
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTrainer(trainer.id)}
                          >
                            <X className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Trainer */}
            {unassignedTrainers.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-3">Add Trainer</h4>
                <div className="flex gap-2">
                  <Select value={trainerToAdd} onValueChange={setTrainerToAdd}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a trainer to add..." />
                    </SelectTrigger>
                    <SelectContent>
                      {unassignedTrainers.map((trainer) => (
                        <SelectItem key={trainer.id} value={trainer.id}>
                          {trainer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddTrainer} disabled={!trainerToAdd}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <Separator />

            {/* Assignment History */}
            <div>
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <History className="h-4 w-4" />
                Assignment History
              </h4>
              <div className="space-y-2">
                {mockHistory.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-2 text-sm border-l-2 border-muted pl-4"
                  >
                    <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{entry.action}</p>
                      <p className="text-muted-foreground text-xs">
                        {entry.from && entry.to
                          ? `${entry.from} → ${entry.to}`
                          : entry.trainer}
                        {" • "}
                        {entry.date} by {entry.by}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
