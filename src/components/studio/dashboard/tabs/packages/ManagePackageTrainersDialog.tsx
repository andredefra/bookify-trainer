import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, 
  UserPlus, 
  Trash2, 
  Crown,
  Users,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

export interface Trainer {
  id: string;
  name: string;
  specialization?: string;
  avatarUrl?: string;
}

interface PackageTrainerAssignment {
  trainerId: string;
  isPrimary: boolean;
  assignedAt: string;
}

interface ManagePackageTrainersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageTitle: string;
  packageId: string | number;
  currentAssignments: PackageTrainerAssignment[];
  availableTrainers: Trainer[];
  onSave: (assignments: PackageTrainerAssignment[]) => void;
}

export function ManagePackageTrainersDialog({
  open,
  onOpenChange,
  packageTitle,
  packageId,
  currentAssignments,
  availableTrainers,
  onSave,
}: ManagePackageTrainersDialogProps) {
  const [assignments, setAssignments] = useState<PackageTrainerAssignment[]>(currentAssignments);
  const [selectedTrainerToAdd, setSelectedTrainerToAdd] = useState<string>("");

  // Get trainers not yet assigned
  const unassignedTrainers = availableTrainers.filter(
    (t) => !assignments.some((a) => a.trainerId === t.id)
  );

  const getTrainerInfo = (trainerId: string): Trainer | undefined => {
    return availableTrainers.find((t) => t.id === trainerId);
  };

  const handleAddTrainer = () => {
    if (!selectedTrainerToAdd) return;

    const newAssignment: PackageTrainerAssignment = {
      trainerId: selectedTrainerToAdd,
      isPrimary: assignments.length === 0, // First trainer is primary by default
      assignedAt: new Date().toISOString(),
    };

    setAssignments([...assignments, newAssignment]);
    setSelectedTrainerToAdd("");
    
    const trainer = getTrainerInfo(selectedTrainerToAdd);
    toast.success(`${trainer?.name} added to trainer pool`);
  };

  const handleRemoveTrainer = (trainerId: string) => {
    const trainer = getTrainerInfo(trainerId);
    const isRemovingPrimary = assignments.find((a) => a.trainerId === trainerId)?.isPrimary;
    
    const newAssignments = assignments.filter((a) => a.trainerId !== trainerId);
    
    // If we removed the primary and there are still trainers, make the first one primary
    if (isRemovingPrimary && newAssignments.length > 0) {
      newAssignments[0].isPrimary = true;
    }
    
    setAssignments(newAssignments);
    toast.success(`${trainer?.name} removed from trainer pool`);
  };

  const handleSetPrimary = (trainerId: string) => {
    setAssignments(
      assignments.map((a) => ({
        ...a,
        isPrimary: a.trainerId === trainerId,
      }))
    );
    
    const trainer = getTrainerInfo(trainerId);
    toast.success(`${trainer?.name} is now the primary trainer`);
  };

  const handleSave = () => {
    if (assignments.length === 0) {
      toast.error("At least one trainer must be assigned");
      return;
    }
    
    onSave(assignments);
    onOpenChange(false);
  };

  const primaryTrainer = assignments.find((a) => a.isPrimary);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Manage Trainers
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Package: <span className="font-medium">{packageTitle}</span>
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Primary Trainer Highlight */}
          {primaryTrainer && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-primary mb-2">
                <Crown className="h-4 w-4" />
                <span className="font-medium">Primary Trainer</span>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={getTrainerInfo(primaryTrainer.trainerId)?.avatarUrl} />
                  <AvatarFallback>
                    {getTrainerInfo(primaryTrainer.trainerId)?.name.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{getTrainerInfo(primaryTrainer.trainerId)?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {getTrainerInfo(primaryTrainer.trainerId)?.specialization}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Add Trainer */}
          <div className="flex gap-2">
            <Select value={selectedTrainerToAdd} onValueChange={setSelectedTrainerToAdd}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Add trainer to pool..." />
              </SelectTrigger>
              <SelectContent>
                {unassignedTrainers.length === 0 ? (
                  <div className="p-2 text-sm text-muted-foreground text-center">
                    All trainers already assigned
                  </div>
                ) : (
                  unassignedTrainers.map((trainer) => (
                    <SelectItem key={trainer.id} value={trainer.id}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{trainer.name}</span>
                        {trainer.specialization && (
                          <span className="text-xs text-muted-foreground">
                            • {trainer.specialization}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button 
              onClick={handleAddTrainer} 
              disabled={!selectedTrainerToAdd}
              size="icon"
            >
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>

          {/* Trainer List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Assigned Trainers ({assignments.length})</span>
              <span className="text-xs">Click crown to set as primary</span>
            </div>
            
            <ScrollArea className="max-h-[300px]">
              <div className="space-y-2">
                {assignments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No trainers assigned yet</p>
                    <p className="text-xs">Add trainers to manage this package</p>
                  </div>
                ) : (
                  assignments.map((assignment) => {
                    const trainer = getTrainerInfo(assignment.trainerId);
                    if (!trainer) return null;

                    return (
                      <div
                        key={assignment.trainerId}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          assignment.isPrimary 
                            ? "bg-primary/5 border-primary/20" 
                            : "bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={trainer.avatarUrl} />
                            <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{trainer.name}</span>
                              {assignment.isPrimary && (
                                <Badge variant="secondary" className="text-xs">
                                  Primary
                                </Badge>
                              )}
                            </div>
                            {trainer.specialization && (
                              <p className="text-xs text-muted-foreground">
                                {trainer.specialization}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 ${
                              assignment.isPrimary 
                                ? "text-primary" 
                                : "text-muted-foreground hover:text-primary"
                            }`}
                            onClick={() => handleSetPrimary(assignment.trainerId)}
                            disabled={assignment.isPrimary}
                          >
                            <Crown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleRemoveTrainer(assignment.trainerId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Info Note */}
          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg text-sm">
            <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="text-muted-foreground">
              <p>Trainers in the pool can be assigned to individual sessions when the primary trainer is unavailable.</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={assignments.length === 0}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
