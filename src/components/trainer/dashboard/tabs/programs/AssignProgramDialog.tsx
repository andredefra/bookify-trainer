
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
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
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState("");

  const handleAssign = () => {
    const message = isPaid 
      ? `Program assigned successfully with a price of €${price}`
      : "Program assigned successfully for free";
    
    onOpenChange(false);
    toast.success(message);
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
            <div className="flex items-center justify-between">
              <Label htmlFor="isPaid">Paid Program</Label>
              <Switch 
                id="isPaid" 
                checked={isPaid} 
                onCheckedChange={setIsPaid} 
              />
            </div>
            {isPaid && (
              <div className="pt-2">
                <Label htmlFor="price">Price (€)</Label>
                <Input 
                  id="price" 
                  placeholder="29.99" 
                  type="number" 
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            )}
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
