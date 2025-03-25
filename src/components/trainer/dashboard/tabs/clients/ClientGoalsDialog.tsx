
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ClientGoalsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedClient: string | null;
}

export function ClientGoalsDialog({ open, onOpenChange, selectedClient }: ClientGoalsDialogProps) {
  const goalTypes = [
    "Weight Loss", "Muscle Gain", "Endurance", "Flexibility", "Strength", "Recovery"
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedClient ? `Set Goals for ${selectedClient}` : "Set Client Goals"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="goal-type">Goal Type</Label>
            <Select>
              <SelectTrigger id="goal-type">
                <SelectValue placeholder="Select goal type" />
              </SelectTrigger>
              <SelectContent>
                {goalTypes.map(type => (
                  <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="target">Target Value</Label>
            <Input id="target" placeholder="e.g. 5kg, 10km, etc." />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline">Target Date</Label>
            <Input type="date" id="deadline" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" placeholder="Additional details about this goal" />
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Current Goals</h4>
            
            {selectedClient === "Sarah Johnson" && (
              <div className="space-y-2">
                <div className="p-2 bg-blue-50 rounded flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium">Lose 5kg</span>
                    <span className="text-xs text-muted-foreground ml-2">by Aug 30, 2023</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-red-500">
                    Remove
                  </Button>
                </div>
              </div>
            )}
            
            {selectedClient === "Mike Peterson" && (
              <div className="space-y-2">
                <div className="p-2 bg-green-50 rounded flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium">Run 10K</span>
                    <span className="text-xs text-muted-foreground ml-2">by Sep 15, 2023</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-red-500">
                    Remove
                  </Button>
                </div>
              </div>
            )}
            
            {(selectedClient !== "Sarah Johnson" && selectedClient !== "Mike Peterson") && (
              <div className="text-sm text-muted-foreground">
                No goals set yet.
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Save Goals</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
