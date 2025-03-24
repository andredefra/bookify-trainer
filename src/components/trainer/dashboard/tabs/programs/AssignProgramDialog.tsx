
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AssignProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeClient: string | null;
  clients: { id: number; name: string; email: string }[];
  programs: { id: number; title: string; type: string; clientCount: number; lastUpdated: string }[];
}

export function AssignProgramDialog({ 
  open, 
  onOpenChange, 
  activeClient, 
  clients, 
  programs 
}: AssignProgramDialogProps) {
  const handleAssign = () => {
    onOpenChange(false);
    toast.success("Program assigned successfully");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {activeClient ? `Assign Program to ${activeClient}` : "Assign Program to Client"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {!activeClient && (
            <div className="space-y-2">
              <Label htmlFor="client">Select Client</Label>
              <Select>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="program">Select Program</Label>
            <Select>
              <SelectTrigger id="program">
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map(program => (
                  <SelectItem key={program.id} value={program.id.toString()}>
                    {program.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input type="date" id="startDate" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" placeholder="Add any specific instructions" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAssign}>Assign Program</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
