import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface SetGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SetGoalDialog({ open, onOpenChange }: SetGoalDialogProps) {
  const [goalType, setGoalType] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goalType || !targetValue || !deadline) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Goal set successfully!");
    onOpenChange(false);
    setGoalType("");
    setTargetValue("");
    setDeadline("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Set New Goal</DialogTitle>
          <DialogDescription>
            Create a new goal to track your progress.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal-type">Goal Type *</Label>
            <Select value={goalType} onValueChange={setGoalType}>
              <SelectTrigger id="goal-type">
                <SelectValue placeholder="Select goal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-clients">New Clients</SelectItem>
                <SelectItem value="revenue">Monthly Revenue</SelectItem>
                <SelectItem value="sessions">Sessions Completed</SelectItem>
                <SelectItem value="retention">Client Retention</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal-target">Target Value *</Label>
            <Input
              id="goal-target"
              type="number"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              placeholder="e.g., 10, 5000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal-deadline">Deadline *</Label>
            <Input
              id="goal-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Set Goal</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
